import { PHOTOS, SITE } from '@content/site'
import type { Visual as V } from '@content/types'
import Image from 'next/image'
import { resolve } from '@/lib/facts'
import { Drawing } from './Drawing'

type Props = {
  visual: V
  draft: boolean
  className?: string
  priority?: boolean
  sizes?: string
  /** marks the practitioner portrait for the layout gate (shown whole, never cropped) */
  portrait?: boolean
}

/* A photo, or a line drawing on a plate, with its caption under it. */
export function Visual({ visual, draft, className = '', priority, sizes, portrait }: Props) {
  const cap = resolve(visual.caption)
  const caption = cap.open.length && !draft ? '' : cap.text
  if (visual.type === 'photo') {
    const p = PHOTOS[visual.name]
    const main = (
      <Image
        src={p.src}
        width={p.width}
        height={p.height}
        alt={resolve(p.alt).text}
        priority={priority}
        sizes={sizes ?? '(min-width: 1024px) 380px, (min-width: 768px) 250px, 100vw'}
        {...(portrait ? { 'data-portrait': true } : {})}
      />
    )
    const q = visual.inset ? PHOTOS[visual.inset] : null
    return (
      <figure className={`photo ${className}`}>
        {q ? (
          <div className="duo">
            {main}
            <Image
              className="inset"
              src={q.src}
              width={q.width}
              height={q.height}
              alt={resolve(q.alt).text}
              sizes="(min-width: 768px) 170px, 45vw"
            />
          </div>
        ) : (
          main
        )}
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    )
  }
  return (
    <figure className={`plate ${className}`}>
      <div>
        <Drawing name={visual.name} />
      </div>
      <figcaption>
        {SITE.illustration}
        {caption ? `: ${caption}` : ''}
      </figcaption>
    </figure>
  )
}
