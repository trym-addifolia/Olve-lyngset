import type { HomeContent } from '@content/types'
import Link from 'next/link'
import LocationCard from '@/components/LocationCard'
import RichText from '@/components/RichText'
import { type AccentName, ACCENTS } from '@/components/home/accent'
import OpenNow from '@/components/home/OpenNow'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { cn } from '@/lib/utils'
import { site } from '@/site.config'

/**
 * «Klar for å ta kontakt?» and where to find him, one section in two parts:
 * the invitation with both buttons (booking, the intensive stay), then the
 * location card with the live open-now line and the practical notes. Shared
 * by both directions; `layout` sets the composition so the two pages differ.
 */
export default function HomeContact({
  content,
  accent,
  source,
  layout = 'split',
}: {
  content: HomeContent
  accent: AccentName
  /** booking click source, «cta:forside» or «cta:retning-b» */
  source: string
  layout?: 'split' | 'stacked'
}) {
  const a = ACCENTS[accent]
  const { closing, practical } = content

  const invitation = (
    <div>
      <h2 id="kontakt-heading" className="text-display-md text-foreground md:text-display-lg">
        <RichText text={closing.heading} />
      </h2>
      <p className="mt-5 max-w-prose text-lg leading-relaxed text-foreground md:text-[1.1875rem]">
        <RichText text={closing.lede} />
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button asChild size="lg" className="h-14 px-7 text-[1.0625rem]">
          <a href={bookingHref(source)}>Bestill time</a>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-14 px-7 text-[1.0625rem]">
          <Link href={closing.secondary.href}>{closing.secondary.label}</Link>
        </Button>
      </div>
      <p className="mt-6 text-[0.9375rem] text-muted-foreground">
        {site.practitioner.name},{' '}
        {site.practitioner.titleLong.toLowerCase().replace('dacnb', 'DACNB')}.{' '}
        {site.brand.clinicName}, {site.contact.address.city}.
      </p>
    </div>
  )

  const location = (
    <div>
      <h2 className="text-display-sm text-foreground md:text-[2rem]">{practical.heading}</h2>
      <p className="mt-3 text-lg leading-relaxed text-foreground">{practical.lede}</p>
      <OpenNow accent={accent} className="mt-4" />
      <LocationCard practical={practical.items} className="mt-8" />
    </div>
  )

  return (
    <section aria-labelledby="kontakt-heading" className="bg-mist py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {layout === 'split' ? (
          <div className="grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div className={cn('border-t-[3px] pt-8', a.rule)}>{invitation}</div>
            <div className="border-t-[3px] border-transparent pt-8">{location}</div>
          </div>
        ) : (
          <div className="space-y-20">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
              <div className={cn('max-w-3xl border-t-[3px] pt-8', a.rule)}>{invitation}</div>
            </div>
            {location}
          </div>
        )}
      </div>
    </section>
  )
}
