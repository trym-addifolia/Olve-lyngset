'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/*
 * Starts the explaining animations when a figure reaches the middle band of
 * the screen. It only sets `data-sett` on `.anim-rot`; the motion itself is
 * CSS (globals.css) and runs once. A figure already scrolled past on load
 * is marked at once, so it stands finished. Nothing is ever hidden while
 * waiting: the first frame of every animation is a complete drawing.
 */
export default function AnimObserver() {
  const pathname = usePathname()
  useEffect(() => {
    // re-scan when the route changes; the layout (and this component) stays mounted
    void pathname
    const figures = Array.from(document.querySelectorAll<HTMLElement | SVGElement>('.anim-rot'))
    if (!('IntersectionObserver' in window)) {
      for (const f of figures) f.setAttribute('data-sett', '')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute('data-sett', '')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '-20% 0px -20% 0px', threshold: 0 },
    )
    for (const f of figures) {
      if (f.hasAttribute('data-sett')) continue
      if (f.getBoundingClientRect().bottom < 0) f.setAttribute('data-sett', '')
      else io.observe(f)
    }
    return () => io.disconnect()
  }, [pathname])
  return null
}
