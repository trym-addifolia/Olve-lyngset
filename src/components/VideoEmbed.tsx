'use client'

import { Play } from 'lucide-react'
import { useState } from 'react'

/**
 * Click-to-load YouTube embed via youtube-nocookie.com. Nothing is requested
 * from Google until the visitor presses play (thumbnail comes from i.ytimg.com
 * only after the first interaction too, so the initial page is third-party
 * free). No consent banner needed for this.
 */
export default function VideoEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [state, setState] = useState<'idle' | 'armed' | 'playing'>('idle')

  if (state === 'playing') {
    return (
      <div className="relative aspect-video overflow-hidden rounded-lg bg-ink-950">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setState(state === 'idle' ? 'armed' : 'playing')}
      onMouseEnter={() => state === 'idle' && setState('armed')}
      className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-ink-900 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`Spill av video: ${title}`}
    >
      {state === 'armed' && (
        <img
          src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
      )}
      <span className="relative z-10 flex flex-col items-center gap-3 px-6 text-center text-white">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-ink-900 transition-colors group-hover:bg-fjord-100">
          <Play className="h-7 w-7 translate-x-0.5" aria-hidden="true" />
        </span>
        <span className="font-serif text-xl">{title}</span>
        <span className="text-xs text-white/70">
          {state === 'idle'
            ? 'Trykk for å laste videoen fra YouTube'
            : 'Trykk igjen for å spille av'}
        </span>
      </span>
    </button>
  )
}
