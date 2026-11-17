'use client'

import { useEffect } from 'react'

/*
 * Drives the crystal rail beside the Epley steps (ProcessTimeline `rail`).
 * Marks each step as passed (`forbi`), current (`aktiv`) or ahead, against
 * the middle of the screen, and the whole list as done (`data-ferdig`) when
 * the last step has passed. The motion is CSS; this only sets attributes.
 * Without JavaScript none are set, and the rail stands at rest: no crystals
 * on the line, three in the pocket at the end.
 */
export default function RailObserver({ id }: { id: string }) {
  useEffect(() => {
    const list = document.getElementById(id)
    if (!list) return
    const steps = Array.from(list.querySelectorAll<HTMLElement>(':scope > li'))
    let frame = 0
    const update = () => {
      frame = 0
      const mid = window.innerHeight / 2
      // before step 1 reaches the middle the rail stands at rest (pocket full)
      const started = steps.length > 0 && steps[0].getBoundingClientRect().top <= mid
      let current = -1
      steps.forEach((li, i) => {
        const r = li.getBoundingClientRect()
        const passed = started && r.bottom < mid
        if (started && !passed && current === -1) current = i
        li.setAttribute('data-steg', passed ? 'forbi' : i === current ? 'aktiv' : 'senere')
      })
      if (!started || current === -1) list.setAttribute('data-ferdig', '')
      else list.removeAttribute('data-ferdig')
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    // set the states first, so the pocket does not blink empty on load
    update()
    list.setAttribute('data-skinne-aktiv', '')
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [id])
  return null
}
