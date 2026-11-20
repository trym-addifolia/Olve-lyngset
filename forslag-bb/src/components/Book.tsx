'use client'

import { SITE } from '@content/site'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { bookHref } from '@/lib/book'

/*
 * The one booking element outside <main>, last in <body> (DESIGN §6.12).
 * From 1024 CSS places it in the header. Below 1024, with script, it is a slim fixed bar (one compact button, the phone as a text link) that shows
 * only after 200 px of scroll and while no [data-nobar] element (113 line or box, hero buttons,
 * lit panel, closing) is on screen, so it never covers a 113 box or doubles a visible button.
 * Without script it is a plain block at the end of the page.
 */
export function Book({ phone, telLabel }: { phone: string | null; telLabel: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const path = usePathname()
  const slug = path.replace(/^\/|\/$/g, '')
  const stayOnly = slug === 'intensivt-opphold'
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-run after every navigation
  useEffect(() => {
    document.documentElement.classList.add('js')
    const bar = ref.current
    if (!bar) return
    const seen = new Set<Element>()
    const update = () => bar.classList.toggle('on', window.scrollY > 200 && seen.size === 0)
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)
      update()
    })
    for (const el of document.querySelectorAll('[data-nobar]')) io.observe(el)
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', update)
    }
  }, [path])
  return (
    <div ref={ref} className="book" data-sticky-cta>
      {!stayOnly && (
        <a className="btn" href={bookHref(SITE.book.href, slug)}>
          {SITE.book.label}
        </a>
      )}
      {phone && (
        <a className="tel" href={`tel:${phone.replace(/\s/g, '')}`}>
          {telLabel}
        </a>
      )}
    </div>
  )
}
