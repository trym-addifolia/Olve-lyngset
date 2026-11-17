'use client'

import { useCallback, useEffect, useState } from 'react'
import { type Kommentar, STATUS_TEKST, type Status } from '@/lib/kommentar/typer'
import { finnElement } from './finnTekst'

export const STATUS_FARGE: Record<Status, string> = {
  venter: 'bg-ember-500 text-white',
  godkjent: 'bg-fjord-600 text-white',
  endret: 'bg-fjord-800 text-white',
  avvist: 'bg-ink-600 text-white',
  lukket: 'bg-ink-500 text-white',
}

type Merke = { k: Kommentar; nr: number; top: number; left: number }

/** Numbered pins at the top right of each commented block, in document coordinates. */
export default function KommentarMerker({ kommentarer }: { kommentarer: Kommentar[] }) {
  const [merker, setMerker] = useState<Merke[]>([])
  const [apen, setApen] = useState<number | null>(null)

  const plasser = useCallback(() => {
    const bredde = document.documentElement.clientWidth
    const nye: Merke[] = []
    kommentarer.forEach((k, i) => {
      const el = finnElement(k.plassering)
      if (!el) return
      const r = el.getBoundingClientRect()
      nye.push({
        k,
        nr: i + 1,
        top: r.top + window.scrollY - 10,
        left: Math.min(r.right + window.scrollX - 6, bredde - 34),
      })
    })
    setMerker(nye)
  }, [kommentarer])

  useEffect(() => {
    plasser()
    let frame = 0
    const planlegg = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(plasser)
    }
    window.addEventListener('resize', planlegg)
    const observer = new ResizeObserver(planlegg)
    observer.observe(document.body)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', planlegg)
      observer.disconnect()
    }
  }, [plasser])

  useEffect(() => {
    if (apen === null) return
    const tast = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setApen(null)
    }
    document.addEventListener('keydown', tast)
    return () => document.removeEventListener('keydown', tast)
  }, [apen])

  const valgt = merker.find((m) => m.k.nummer === apen)
  const bredde = typeof document === 'undefined' ? 1024 : document.documentElement.clientWidth

  return (
    <div data-kommentar-ui="" className="pointer-events-none absolute left-0 top-0 z-40 w-full">
      {merker.map((m) => (
        <button
          key={m.k.nummer}
          type="button"
          onClick={() => setApen(apen === m.k.nummer ? null : m.k.nummer)}
          aria-label={`Kommentar ${m.nr}: ${STATUS_TEKST[m.k.status]}`}
          aria-expanded={apen === m.k.nummer}
          className={`pointer-events-auto absolute grid h-7 w-7 place-items-center rounded-full text-xs font-semibold shadow-md ring-2 ring-white ${STATUS_FARGE[m.k.status]}`}
          style={{ top: m.top, left: m.left }}
        >
          {m.nr}
        </button>
      ))}
      {valgt && (
        <dialog
          open
          aria-label={`Kommentar ${valgt.nr}`}
          className="pointer-events-auto absolute right-auto m-0 w-80 max-w-[calc(100vw-1rem)] rounded-lg border border-border bg-card p-4 text-[0.9375rem] leading-relaxed text-foreground shadow-xl"
          style={{
            top: valgt.top + 34,
            left: Math.max(8, Math.min(valgt.left - 280, bredde - 328)),
          }}
        >
          <p className="eyebrow">
            Kommentar {valgt.nr} · {STATUS_TEKST[valgt.k.status]}
          </p>
          <p className="mt-2 whitespace-pre-line">{valgt.k.kommentar}</p>
          {valgt.k.forslag && (
            <>
              <p className="mt-3 font-semibold">Forslag</p>
              <p className="whitespace-pre-line">{valgt.k.forslag}</p>
            </>
          )}
          {valgt.k.svar && (
            <>
              <p className="mt-3 font-semibold">Svar</p>
              <p className="whitespace-pre-line">{valgt.k.svar}</p>
            </>
          )}
          <button
            type="button"
            onClick={() => setApen(null)}
            className="mt-3 text-sm font-medium text-fjord-700 underline underline-offset-4"
          >
            Lukk
          </button>
        </dialog>
      )}
    </div>
  )
}
