import type { HomeContent } from '@content/types'
import Link from 'next/link'
import LocationCard from '@/components/LocationCard'
import RichText from '@/components/RichText'
import { ACCENT } from '@/components/home/accent'
import OpenNow from '@/components/home/OpenNow'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { cn } from '@/lib/utils'
import { site } from '@/site.config'

/**
 * «Klar for å ta kontakt?» and where to find him, side by side: the
 * invitation with both buttons (booking, the intensive stay) on the left, the
 * location card with the live open-now line and the practical notes on the
 * right.
 */
export default function HomeContact({
  content,
  source,
}: {
  content: HomeContent
  /** booking click source, «cta:forside» */
  source: string
}) {
  const { closing, practical } = content

  return (
    <section aria-labelledby="kontakt-heading" className="bg-mist py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="reveal lg:col-span-5">
          <span aria-hidden="true" className={cn('block h-[3px] w-14', ACCENT.mark)} />
          <h2
            id="kontakt-heading"
            className="mt-6 text-display-md text-foreground md:text-display-lg"
          >
            <RichText text={closing.heading} />
          </h2>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-foreground md:text-xl">
            <RichText text={closing.lede} />
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild size="lg" className="h-14 px-7 text-lg">
              <a href={bookingHref(source)}>Bestill time</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-7 text-lg">
              <Link href={closing.secondary.href}>{closing.secondary.label}</Link>
            </Button>
          </div>
          <p className="mt-6 text-base text-muted-foreground">
            {site.practitioner.name},{' '}
            {site.practitioner.titleLong.toLowerCase().replace('dacnb', 'DACNB')}.{' '}
            {site.brand.clinicName}, {site.contact.address.city}.
          </p>
        </div>

        <div className="reveal reveal-late bg-card p-6 sm:p-10 lg:col-span-6 lg:col-start-7">
          <h2 className="text-display-sm text-foreground md:text-display-md">
            {practical.heading}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-foreground">{practical.lede}</p>
          <OpenNow className="mt-4" />
          <LocationCard practical={practical.items} className="mt-8" />
        </div>
      </div>
    </section>
  )
}
