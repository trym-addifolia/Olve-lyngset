import Image from 'next/image'
import { cn } from '@/lib/utils'
import { PHOTOS, type PhotoName } from '@/photos'

/**
 * One of the clinic's own photos, mounted like the portrait: a white mat,
 * the whole photo in its own ratio (never cropped by CSS), a short caption.
 * Never shown wider than its display size.
 */
export default function Photo({
  name,
  caption,
  className,
}: {
  name: PhotoName
  caption?: string
  className?: string
}) {
  const p = PHOTOS[name]
  return (
    <figure
      className={cn('w-full', className)}
      style={{ maxWidth: `min(100%, ${p.width + 24}px)` }}
    >
      <div className="border border-border bg-card p-3">
        <div
          className="relative overflow-hidden bg-mist"
          style={{ aspectRatio: `${p.width} / ${p.height}` }}
        >
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes={`(min-width: 640px) ${p.width}px, 100vw`}
            className="object-contain"
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-[0.9375rem] leading-snug text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
