'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { cn } from '@/lib/utils'

/*
 * Fixed bottom bar on mobile (hidden from md): Bestill time. Hidden while an element marked `data-hero-cta` is in the viewport, so
 * it never doubles the hero's own buttons; with no such element it always
 * shows. The spacer sits in normal flow after the footer and stays, so
 * nothing hides behind the bar. Safe-area padding for the iPhone home
 * indicator (viewport-fit=cover set in layout.tsx).
 */
export default function StickyMobileCta() {
  const pathname = usePathname()
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    void pathname
    const targets = document.querySelectorAll('[data-hero-cta]')
    if (targets.length === 0) {
      setHeroVisible(false)
      return
    }
    const visible = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target)
        else visible.delete(e.target)
      }
      setHeroVisible(visible.size > 0)
    })
    for (const t of targets) observer.observe(t)
    return () => observer.disconnect()
  }, [pathname])

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
          heroVisible && 'hidden',
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
