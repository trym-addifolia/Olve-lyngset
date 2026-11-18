import RichText from '@/components/RichText'
import { ACCENT } from '@/components/home/accent'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { cn } from '@/lib/utils'
import { site } from '@/site.config'

/**
 * Closing band: one invitation, one button, left aligned. The H2 is an
 * inviting question without a cure promise (content decides).
 *
 * Same composition as the home page's contact section: on the mist ground,
 * the ochre bar and the question on the left, the lede and the button on a
 * white plate on the right, with who and where in small type so the button
 * never floats on its own.
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
    <section className="bg-mist py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="reveal lg:col-span-6">
          <span aria-hidden="true" className={cn('block h-[3px] w-14', ACCENT.mark)} />
          <h2 className="mt-6 max-w-[20ch] hyphens-auto text-display-lg tracking-[-0.02em] text-foreground xl:text-display-xl">
            <RichText text={title} />
          </h2>
        </div>
        <div className="reveal reveal-late bg-card p-6 sm:p-10 lg:col-span-5 lg:col-start-8">
          {lede && (
            <p className="max-w-prose text-lg leading-relaxed text-foreground">
              <RichText text={lede} />
            </p>
          )}
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="h-auto min-h-14 whitespace-normal px-7 py-3 text-center text-lg"
            >
              <a href={action?.href ?? bookingHref(source)}>{action?.label ?? 'Bestill time'}</a>
            </Button>
          </div>
          <p className="mt-5 text-base text-muted-foreground">
            {site.practitioner.name}, {site.practitioner.titleLong}. {site.brand.clinicName},{' '}
            {site.contact.address.city}.
          </p>
        </div>
      </div>
    </section>
  )
}
