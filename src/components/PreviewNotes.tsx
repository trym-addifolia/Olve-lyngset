'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useSyncExternalStore } from 'react'

/*
 * Preview-only overview of unconfirmed facts. RichText renders each
 * {{OLVE_BEKREFT}} as a quiet raised marker; after mount PreviewNotes numbers
 * them in document order, gives each an anchor, and lists the labels in a
 * calm section after the footer. PreviewBar (a thin line above the header)
 * reads the same count from a tiny module store. Both render nothing in
 * production (layout passes `enabled={!ALLOW_INDEX}`) or when there are none.
 */

let labels: string[] = []
const listeners = new Set<() => void>()
const EMPTY: string[] = []

function setLabels(next: string[]) {
  if (next.length === labels.length && next.every((l, i) => l === labels[i])) return
  labels = next
  for (const l of listeners) l()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function useLabels(): string[] {
  return useSyncExternalStore(
    subscribe,
    () => labels,
    () => EMPTY,
  )
}

function scan() {
  const main = document.body
  if (!main) return setLabels([])
  const nodes = main.querySelectorAll<HTMLElement>('[data-placeholder="OLVE_BEKREFT"]')
  // the same open question gets the same number wherever it appears
  const next: string[] = []
  for (const el of nodes) {
    const label = el.dataset.label ?? ''
    let index = next.indexOf(label)
    const first = index === -1
    if (first) index = next.push(label) - 1
    const n = String(index + 1)
    const id = first ? `avklaring-ref-${n}` : ''
    if (!first) el.removeAttribute('id')
    else if (el.id !== id) el.id = id
    const marker = el.querySelector<HTMLElement>('[data-placeholder-marker]')
    if (marker && marker.textContent !== n) marker.textContent = n
  }
  setLabels(next)
}

export default function PreviewNotes({ enabled }: { enabled: boolean }) {
  const pathname = usePathname()
  const items = useLabels()

  useEffect(() => {
    if (!enabled) return
    void pathname
    scan()
    const main = document.body
    if (!main) return
    // streamed or client-rendered content (accordions, Suspense) arrives late
    let frame = 0
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(scan)
    })
    observer.observe(main, { childList: true, subtree: true })
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [enabled, pathname])

  if (!enabled || items.length === 0) return null

  return (
    <section
      id="avklaringer"
      aria-labelledby="avklaringer-heading"
      className="scroll-mt-24 border-t border-border bg-card"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 text-[15px] leading-relaxed sm:px-6 lg:px-8">
        <h2 id="avklaringer-heading" className="font-serif text-xl font-medium text-foreground">
          Til avklaring med Olve ({items.length})
        </h2>
        <p className="mt-2 text-muted-foreground">
          Disse punktene er ikke bekreftet ennå. De er markert med tall i teksten.
        </p>
        <ol className="mt-5 grid list-decimal gap-x-10 gap-y-1.5 pl-6 text-foreground/85 md:grid-cols-2">
          {items.map((label, i) => (
            <li key={i}>
              <a
                href={`#avklaring-ref-${i + 1}`}
                className="underline decoration-border underline-offset-4 hover:decoration-foreground/60"
              >
                {label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function PreviewBar({ enabled }: { enabled: boolean }) {
  const items = useLabels()
  if (!enabled || items.length === 0) return null
  return (
    <div className="bg-ink-900 px-4 py-1.5 text-center text-[14px] text-white/90">
      Forhåndsvisning. {items.length} punkter venter på Olve.{' '}
      <a href="#avklaringer" className="font-medium text-white underline underline-offset-2">
        Se listen
      </a>
    </div>
  )
}
