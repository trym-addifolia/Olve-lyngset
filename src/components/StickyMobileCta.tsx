'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { cn } from '@/lib/utils'
import { routeBySlug } from '@/routes'

/*
 * Fixed bottom bar on mobile (hidden from md): Bestill time.
 *
 * - Not rendered on a route whose hero says it cannot be booked online
 *   (heroCta.booking === false, the intensive stay).
 * - Hidden while an element marked `data-hero-cta` is in the viewport, so it
 *   never doubles the hero's own buttons; with no such element it shows.
 * - Hidden while an element marked `data-sticky-after` (the 113 box in the
 *   hero) is still below the screen, so the bar never offers booking before
 *   the warning signs have been on screen.
 *
 * The spacer sits in normal flow after the footer and stays, so nothing hides
 * behind the bar. Safe-area padding for the iPhone home indicator
 * (viewport-fit=cover set in layout.tsx).
 */
export default function StickyMobileCta() {
  const pathname = usePathname()
  const [heroVisible, setHeroVisible] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const bookable = routeBySlug(pathname.replace(/^\/+|\/+$/g, ''))?.heroCta?.booking !== false

  useEffect(() => {
    void pathname
    const heroCtas = document.querySelectorAll('[data-hero-cta]')
    const before = document.querySelectorAll('[data-sticky-after]')
    const visible = new Set<Element>()
    const below = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target.hasAttribute('data-hero-cta')) {
          if (e.isIntersecting) visible.add(e.target)
          else visible.delete(e.target)
        } else {
          // not reached yet: out of view and its top still under the bottom edge
          const notReached = !e.isIntersecting && e.boundingClientRect.top > 0
          if (notReached) below.add(e.target)
          else below.delete(e.target)
        }
      }
      setHeroVisible(visible.size > 0)
      setWaiting(below.size > 0)
    })
    setHeroVisible(false)
    setWaiting(false)
    for (const t of heroCtas) observer.observe(t)
    for (const t of before) observer.observe(t)
    return () => observer.disconnect()
  }, [pathname])

  if (!bookable) return null

  return (
    <>
      <div
        aria-hidden="true"
        className="md:hidden"
        style={{ height: 'calc(72px + env(safe-area-inset-bottom))' }}
      />
      <nav
        aria-label="Bestill time"
        className={cn(
          'fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card md:hidden',
          (heroVisible || waiting) && 'hidden',
        )}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="px-4 py-3">
          <Button asChild className="min-h-[48px] w-full text-base">
            <a href={bookingHref('sticky-mobil')}>Bestill time</a>
          </Button>
        </div>
      </nav>
    </>
  )
}
