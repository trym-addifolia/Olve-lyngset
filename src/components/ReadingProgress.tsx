'use client'

import { useEffect, useRef } from 'react'

/**
 * A thin bar along the bottom edge of the sticky header that fills as the
 * reader moves through the page. Written straight to the DOM on scroll, so
 * React does not re-render per frame.
 */
export default function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const share = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${share})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-px h-[3px]">
      <div
        ref={bar}
        className="h-full origin-left bg-fjord-500"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
