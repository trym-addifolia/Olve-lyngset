'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/* Close open menus (native details) on Escape, on a click outside, and after navigation. */
export function Dropdowns() {
  const path = usePathname()
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-run after every navigation
  useEffect(() => {
    const all = () => document.querySelectorAll<HTMLDetailsElement>('details[data-dropdown][open]')
    for (const d of all()) d.open = false
    const key = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      for (const d of all()) {
        d.open = false
        d.querySelector('summary')?.focus()
      }
    }
    const click = (e: MouseEvent) => {
      for (const d of all()) {
        const t = e.target as Node
        if (!d.contains(t) || (t instanceof Element && t.closest('a'))) d.open = false
      }
    }
    document.addEventListener('keydown', key)
    document.addEventListener('click', click)
    return () => {
      document.removeEventListener('keydown', key)
      document.removeEventListener('click', click)
    }
  }, [path])
  return null
}
