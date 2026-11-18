'use client'

import { useEffect, useState } from 'react'
import { ACCENT } from '@/components/home/accent'
import { cn } from '@/lib/utils'
import { openStatus } from '@/components/home/openStatus'
import { site } from '@/site.config'

/**
 * The one live line on the home page: whether Limbra Storgata is open right
 * now (Oslo time), from the same weekly hours as the table below it. Rendered
 * after mount only, so a cached page never shows a stale status; without
 * script the hours table says the same thing.
 */
export default function OpenNow({ className }: { className?: string }) {
  const [status, setStatus] = useState<ReturnType<typeof openStatus>>(null)

  useEffect(() => {
    if (!site.hours.verified) return
    const tick = () => setStatus(openStatus(new Date()))
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [])

  if (!status) return null
  return (
    <p
      className={cn(
        'flex items-center gap-2.5 text-lg font-semibold text-foreground',
        className,
      )}
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-2.5 w-2.5 shrink-0 rotate-45',
          status.open ? ACCENT.mark : 'bg-ink-500',
        )}
      />
      {status.text}
    </p>
  )
}
