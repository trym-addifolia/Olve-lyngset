import Image from 'next/image'
import { cn } from '@/lib/utils'
import { PHOTOS, type PhotoName } from '@/photos'

/**
 * One of the clinic's own photos on the home page, hung like a print: the
 * whole photo in its own ratio, never cropped (Olve, 2026-11-10), never wider
 * than its display size. `width` sets how wide it hangs (CSS length, default
 * the display width); `mat` mounts it on white like the inner pages, without
 * it the photo sits straight on the ground.
 */
export default function Print({
  name,
  caption,
  width,
  mat = false,
  priority = false,
  sizes,
  className,
  captionClassName,
}: {
  name: PhotoName
  caption?: string
  width?: string
  mat?: boolean
  priority?: boolean
  sizes?: string
  className?: string
  captionClassName?: string
}) {
  const p = PHOTOS[name]
  const max = `${p.width + (mat ? 24 : 0)}px`
  return (
    <figure
      className={cn('w-full', className)}
      style={{ maxWidth: width ? `min(100%, ${width}, ${max})` : `min(100%, ${max})` }}
    >
      <div className={cn(mat && 'border border-border bg-card p-3')}>
        <div
          className="relative overflow-hidden bg-mist"
          style={{ aspectRatio: `${p.width} / ${p.height}` }}
        >
          <Image
            src={p.src}
            alt={p.alt}
            fill
            priority={priority}
            sizes={sizes ?? `(min-width: 640px) ${p.width}px, 100vw`}
            className="object-contain"
          />
        </div>
      </div>
      {caption && (
        <figcaption
          className={cn(
            'mt-3 text-[0.9375rem] leading-snug text-muted-foreground',
            captionClassName,
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
