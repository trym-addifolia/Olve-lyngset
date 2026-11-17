'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MAKS_TEKST, type Plassering } from '@/lib/kommentar/typer'

export default function KommentarPanel({
  plassering,
  sender,
  onSend,
  onAvbryt,
}: {
  plassering: Plassering
  sender: boolean
  onSend: (kommentar: string, forslag: string) => void
  onAvbryt: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const [kommentar, setKommentar] = useState('')
  const [forslag, setForslag] = useState('')

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog
      ref={ref}
      data-kommentar-ui=""
      onClose={onAvbryt}
      aria-labelledby="kommentar-tittel"
      className="w-[min(36rem,calc(100vw-2rem))] rounded-lg border border-border bg-card p-0 text-foreground shadow-xl backdrop:bg-ink-950/40"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (kommentar.trim()) onSend(kommentar, forslag)
        }}
        className="space-y-5 p-6"
      >
        <h2 id="kommentar-tittel" className="font-serif text-2xl text-foreground">
          Kommentar
        </h2>
        {plassering.tekst ? (
          <blockquote className="max-h-40 overflow-auto border-l-4 border-fjord-500 bg-mist px-4 py-3 text-[0.9375rem] leading-relaxed">
            {plassering.tekst}
          </blockquote>
        ) : (
          <p className="text-[0.9375rem] text-muted-foreground">Gjelder hele siden.</p>
        )}
        <div className="space-y-2">
          <Label htmlFor="kommentar-tekst">Kommentar</Label>
          <Textarea
            id="kommentar-tekst"
            required
            autoFocus
            maxLength={MAKS_TEKST}
            rows={4}
            value={kommentar}
            onChange={(e) => setKommentar(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="kommentar-forslag">
            Forslag til ny tekst <span className="font-normal text-muted-foreground">(valgfritt)</span>
          </Label>
          <Textarea
            id="kommentar-forslag"
            maxLength={MAKS_TEKST}
            rows={4}
            value={forslag}
            onChange={(e) => setForslag(e.target.value)}
          />
        </div>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onAvbryt}>
            Avbryt
          </Button>
          <Button type="submit" disabled={sender || !kommentar.trim()}>
            {sender ? 'Sender ...' : 'Send'}
          </Button>
        </div>
      </form>
    </dialog>
  )
}
