import { Figure, type FigureName } from '@content/illustrations'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'

/**
 * Closing band: one booking CTA, left aligned, an optional drawing beside it.
 * The H2 is always an inviting question without a cure promise (content decides).
 */
export default function CtaBand({
  title,
  lede,
  source = 'cta-band',
  figure = { name: 'buegangene-pa-plass' },
}: {
  title: string
  lede?: string
  source?: string
  /** optional drawing beside the invitation (home: the crystals back in place) */
  figure?: { name: FigureName; caption?: string } | null
}) {
  return (
    <section className="border-y border-border bg-card py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={
            figure
              ? 'grid items-center gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20'
              : ''
          }
        >
          {figure && (
            <Figure
              name={figure.name}
              ground="card"
              caption={figure.caption}
              className="mx-auto w-full max-w-[17rem] lg:max-w-none"
            />
          )}
          <div>
            <h2 className="text-display-md text-foreground md:text-display-lg">
              <RichText text={title} />
            </h2>
            {lede && (
              <p className="mt-4 max-w-prose text-lg leading-relaxed text-foreground/80">
                <RichText text={lede} />
              </p>
            )}
            <div className="mt-8">
              <Button asChild size="lg" className="h-14 px-7 text-[1.0625rem]">
                <a href={bookingHref(source)}>Book en time</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
