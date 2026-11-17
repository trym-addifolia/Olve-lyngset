'use client'

import { List, MessageSquarePlus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  type Kommentar,
  type NyKommentar,
  type Plassering,
  STATUS_TEKST,
} from '@/lib/kommentar/typer'
import KommentarMerker, { STATUS_FARGE } from './KommentarMerker'
import KommentarPanel from './KommentarPanel'
import { blokkFra, finnElement, helSide, plasseringFra } from './finnTekst'

const API = '/api/kommentarer'
const HOVER = 'kommentar-hover'

function feilmelding(status: number): string {
  if (status === 401) return 'Lenken din er utløpt. Be Trym om en ny.'
  if (status === 503) return 'Kommentarene er ikke koblet til ennå. Prøv igjen senere.'
  return 'Noe gikk galt. Prøv igjen om litt.'
}

function kort(tekst: string): string {
  return tekst.length > 90 ? `${tekst.slice(0, 90)}…` : tekst
}

export default function KommentarModus() {
  const side = usePathname()
  const [velger, setVelger] = useState(false)
  const [utkast, setUtkast] = useState<Plassering | null>(null)
  const [sender, setSender] = useState(false)
  const [kommentarer, setKommentarer] = useState<Kommentar[]>([])
  const [liste, setListe] = useState(false)

  const hent = useCallback(async () => {
    try {
      const res = await fetch(`${API}?side=${encodeURIComponent(side)}`, { cache: 'no-store' })
      if (!res.ok) {
        if (res.status === 401 || res.status === 503) toast.error(feilmelding(res.status))
        return
      }
      const data = (await res.json()) as { kommentarer: Kommentar[] }
      setKommentarer(data.kommentarer)
    } catch {
      // offline: the pins come back on the next page view
    }
  }, [side])

  useEffect(() => {
    setKommentarer([])
    setListe(false)
    void hent()
  }, [hent])

  useEffect(() => {
    if (!velger) return
    let markert: HTMLElement | null = null
    const over = (e: MouseEvent) => {
      const blokk = blokkFra(e.target)
      if (blokk === markert) return
      markert?.classList.remove(HOVER)
      markert = blokk
      blokk?.classList.add(HOVER)
    }
    const klikk = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('[data-kommentar-ui]')) return
      // links and buttons must not act while Olve is marking
      e.preventDefault()
      e.stopPropagation()
      const blokk = blokkFra(e.target)
      if (!blokk) return
      setUtkast(plasseringFra(blokk, side))
      setVelger(false)
    }
    const tast = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVelger(false)
    }
    document.addEventListener('mouseover', over, true)
    document.addEventListener('click', klikk, true)
    document.addEventListener('keydown', tast)
    return () => {
      markert?.classList.remove(HOVER)
      document.removeEventListener('mouseover', over, true)
      document.removeEventListener('click', klikk, true)
      document.removeEventListener('keydown', tast)
    }
  }, [velger, side])

  const send = async (kommentar: string, forslag: string) => {
    if (!utkast) return
    setSender(true)
    try {
      const ny: NyKommentar = {
        plassering: utkast,
        kommentar: kommentar.trim(),
        forslag: forslag.trim(),
      }
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ny),
      })
      if (!res.ok) {
        toast.error(feilmelding(res.status))
        return
      }
      const { nummer } = (await res.json()) as { nummer: number }
      toast.success('Takk! Kommentaren er sendt.')
      setUtkast(null)
      // GitHub's issue list lags a moment behind a new issue, so add it here instead of re-fetching
      setKommentarer((alle) => [
        ...alle,
        { ...ny, nummer, status: 'venter', svar: null, opprettet: new Date().toISOString() },
      ])
    } catch {
      toast.error(feilmelding(0))
    } finally {
      setSender(false)
    }
  }

  return (
    <>
      <KommentarMerker kommentarer={kommentarer} />

      <div
        data-kommentar-ui=""
        className="fixed bottom-[calc(84px+env(safe-area-inset-bottom))] left-4 z-50 flex max-w-[calc(100vw-2rem)] flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-2 shadow-lg md:bottom-4"
      >
        {velger ? (
          <>
            <output className="px-2 text-sm text-foreground">
              Trykk på teksten du vil kommentere.
            </output>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setVelger(false)
                setUtkast(helSide(side))
              }}
            >
              Kommentar til hele siden
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setVelger(false)}>
              Avslutt
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" onClick={() => setVelger(true)}>
              <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
              Kommenter
            </Button>
            {kommentarer.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                aria-expanded={liste}
                onClick={() => setListe((v) => !v)}
              >
                <List className="h-4 w-4" aria-hidden="true" />
                {kommentarer.length} på denne siden
              </Button>
            )}
          </>
        )}
      </div>

      {liste && (
        <section
          data-kommentar-ui=""
          aria-label="Kommentarer på denne siden"
          className="fixed bottom-[calc(140px+env(safe-area-inset-bottom))] left-4 z-50 max-h-[60vh] w-[min(24rem,calc(100vw-2rem))] overflow-auto rounded-lg border border-border bg-card p-4 text-[0.9375rem] shadow-xl md:bottom-20"
        >
          <h2 className="font-serif text-xl text-foreground">Kommentarer på denne siden</h2>
          <ol className="mt-3">
            {kommentarer.map((k, i) => (
              <li key={k.nummer} className="border-t border-border py-3">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full text-xs font-semibold ${STATUS_FARGE[k.status]}`}
                  >
                    {i + 1}
                  </span>
                  {STATUS_TEKST[k.status]}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {k.plassering.tekst ? `«${kort(k.plassering.tekst)}»` : 'Hele siden'}
                </p>
                <p className="mt-1 whitespace-pre-line">{k.kommentar}</p>
                {k.svar && <p className="mt-1 whitespace-pre-line">Svar: {k.svar}</p>}
                {k.plassering.tekst && !finnElement(k.plassering) && (
                  <p className="mt-1 text-sm text-muted-foreground">Teksten er endret siden.</p>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {utkast && (
        <KommentarPanel
          plassering={utkast}
          sender={sender}
          onSend={send}
          onAvbryt={() => setUtkast(null)}
        />
      )}
    </>
  )
}
