import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { cn } from '@/lib/utils'
import { site } from '@/site.config'

/**
 * Closing band: one invitation, one button, left aligned. The H2 is an
 * inviting question without a cure promise (content decides).
 *
 * A finished composition without a photo: the question on the left, the lede
 * and the button on the right on wide screens, under a short petrol rule,
 * with who and where in small type so the button never floats on its own.
 *
 * `action` replaces the booking button, e.g. the email enquiry for the
 * intensive stay, which is not booked online.
 */
export default function CtaBand({
  title,
  lede,
  source = 'cta',
  action,
}: {
  title: string
  lede?: string
  source?: string
  action?: { label: string; href: string }
}) {
  return (
    <section className="border-y border-border bg-card py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'grid gap-8 border-t-2 border-fjord-600 pt-8 md:pt-10',
            'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16',
          )}
        >
          <h2 className="max-w-2xl text-display-md text-foreground md:text-display-lg">
            <RichText text={title} />
          </h2>
          <div>
            {lede && (
              <p className="max-w-prose text-lg leading-relaxed text-foreground/80">
                <RichText text={lede} />
              </p>
            )}
            <div className="mt-8">
              <Button asChild size="lg" className="h-14 px-7 text-[1.0625rem]">
                <a href={action?.href ?? bookingHref(source)}>{action?.label ?? 'Bestill time'}</a>
              </Button>
            </div>
            <p className="mt-5 text-[0.9375rem] text-muted-foreground">
              {site.practitioner.name}, {site.practitioner.titleLong}. {site.brand.clinicName},{' '}
              {site.contact.address.city}.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
