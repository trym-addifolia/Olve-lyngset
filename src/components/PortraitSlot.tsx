import { UserRound } from 'lucide-react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import { cn } from '@/lib/utils'
import { site } from '@/site.config'

/**
 * The practitioner portrait. A real photo only (rights confirmed); until it
 * is delivered the slot renders a labelled frame. Never stock, never a
 * generated person.
 *
 * The whole photo always shows (Olve, 2026-11-10): the box keeps the image's
 * own aspect ratio, nothing is cropped, nothing bleeds off an edge. `figure`
 * mounts it like a print, on a white mat with a caption. `mini` is the same
 * whole photo small, for the first screen on a phone. Neither is ever shown
 * wider than the file itself.
 */
export default function PortraitSlot({
  priority = false,
  className,
  variant = 'figure',
  sizes,
}: {
  priority?: boolean
  className?: string
  variant?: 'figure' | 'mini'
  sizes?: string
}) {
  const { portrait, name, title } = site.practitioner
  const mini = variant === 'mini'
  const ratio = { aspectRatio: `${portrait.width} / ${portrait.height}` }

  if (mini) {
    return (
      <div
        className={cn('relative w-16 shrink-0 overflow-hidden rounded-sm bg-mist', className)}
        style={ratio}
      >
        {portrait.src ? (
          <Image
            src={portrait.src}
            alt={portrait.alt}
            fill
            priority={priority}
            sizes="72px"
            className="object-contain"
          />
        ) : (
          <UserRound
            className="absolute inset-0 m-auto h-8 w-8 text-fjord-300"
            aria-hidden="true"
            strokeWidth={1.25}
          />
        )}
      </div>
    )
  }

  return (
    <figure
      className={cn('w-full', className)}
      style={{ maxWidth: `min(100%, ${portrait.width + 24}px)` }}
    >
      <div className="border border-border bg-card p-3">
        <div className="relative overflow-hidden bg-mist" style={ratio}>
          {portrait.src ? (
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              priority={priority}
              sizes={sizes ?? `(min-width: 640px) ${portrait.width}px, 100vw`}
              className="object-contain"
            />
          ) : (
            <div
              role="img"
              aria-label={`Portrett av ${name} kommer`}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center"
            >
              <UserRound
                className="h-16 w-16 text-fjord-300"
                aria-hidden="true"
                strokeWidth={1.25}
              />
              <span className="text-sm text-muted-foreground">
                Portrett kommer
                <RichText text="{{OLVE_BEKREFT: ekte portrett (bilderettigheter)}}" />
              </span>
            </div>
          )}
        </div>
      </div>
      <figcaption className="mt-3 text-[0.9375rem] leading-snug">
        <span className="font-serif text-lg text-foreground">{name}</span>
        <span className="text-muted-foreground">, {title.toLowerCase()}</span>
        {portrait.src && portrait.credit && (
          <span className="mt-0.5 block text-sm text-muted-foreground">
            Foto: {portrait.credit}
          </span>
        )}
      </figcaption>
    </figure>
  )
}
