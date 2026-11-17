'use client'

import { useEffect, useRef, useState } from 'react'

/*
 * The raised marker on an unconfirmed fact (preview only). A tap opens a
 * small note in place («Avklares med Olve: ...»); it never jumps to the list
 * at the bottom of the page (only the preview strip at the top links
 * there). The button has its own padded tap area, so a tap meant for a
 * nearby link or button does not land here, and the reverse.
 */
export default function UnconfirmedMarker({ label }: { label: string }) {
  const [open, setOpen] = useState(false)
  // placed in the viewport, clamped to the edges, so it never runs off a phone screen
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)
  const root = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape') return
      if (e instanceof PointerEvent && root.current?.contains(e.target as Node)) return
      setOpen(false)
    }
    const shut = () => setOpen(false)
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', close)
    window.addEventListener('scroll', shut, { passive: true })
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', close)
      window.removeEventListener('scroll', shut)
    }
  }, [open])

  return (
    <span ref={root} className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => {
          const r = root.current?.getBoundingClientRect()
          if (r) {
            const width = Math.min(256, window.innerWidth - 32)
            const left = Math.max(16, Math.min(r.left - 8, window.innerWidth - 16 - width))
            setPos({ top: r.bottom + 6, left, width })
          }
          setOpen((v) => !v)
        }}
        className="-my-1 ml-0.5 inline-block rounded px-1 py-1 align-super font-sans text-[max(0.7em,0.6875rem)] font-semibold leading-none text-current hover:bg-foreground/5"
      >
        <span aria-hidden="true" data-placeholder-marker="">
          *
        </span>
        <span className="sr-only"> (avklares: {label})</span>
      </button>
      {open && pos && (
        <span
          role="note"
          style={{ top: pos.top, left: pos.left, maxWidth: pos.width }}
          className={
            'fixed z-40 block w-max rounded-md bg-ink-900 px-3 py-2 font-sans text-sm font-normal not-italic leading-snug text-white shadow-lg'
          }
        >
          Avklares med Olve: {label}
        </span>
      )}
    </span>
  )
}
