import Link from 'next/link'
import Breadcrumbs, { type Crumb } from '@/components/Breadcrumbs'
import Photo from '@/components/Photo'
import RichText from '@/components/RichText'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import type { Route } from '@/routes'
import { cn } from '@/lib/utils'
import type { PhotoName } from '@/photos'

/**
 * Hero for every non-home page: breadcrumbs, kicker, H1, intro (the first
 * paragraph carries the head keyword), and the dual CTA. `children` is an
 * optional right-hand block (the booking card on landing pages).
 * `cta` (route.heroCta) can hide the booking button or add a second link.
 * `notice` sits between the intro and the buttons: the compact 113 box on the
 * pages that carry it, so nobody reaches «Bestill time» past the warning
 * signs, on a phone or on a wide screen.
 */
export default function PageHero({
  crumbs,
  eyebrow,
  h1,
  intro,
  source,
  showCtas = true,
  cta,
  tone = 'light',
  photo,
  notice,
  children,
}: {
  crumbs: Crumb[]
  eyebrow: string
  h1: string
  intro: string
  source: string
  showCtas?: boolean
  cta?: Route['heroCta']
  tone?: 'light' | 'mist'
  /** one of the clinic's photos in the right-hand column when there is no `children` block */
  photo?: PhotoName
  /** a block between the intro and the buttons (the compact 113 box) */
  notice?: React.ReactNode
  children?: React.ReactNode
}) {
  const booking = cta?.booking ?? true
  const secondary = cta?.secondary
  const hasCtas = showCtas && (booking || secondary)
  return (
    <section
      className={cn('border-b border-border', tone === 'mist' ? 'bg-background' : 'bg-card')}
    >
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 md:pb-16 md:pt-8 lg:px-8">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
          <div>
            <SectionHeading as="h1" eyebrow={eyebrow} title={h1} />
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-foreground/85 md:text-xl md:leading-relaxed">
              <RichText text={intro} />
            </p>
            {notice && (
              // data-sticky-after: the mobile booking bar waits until this has been on screen
              <div className="mt-8 max-w-prose" data-sticky-after="">
                {notice}
              </div>
            )}
            {hasCtas && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                {booking && (
                  <Button asChild size="lg">
                    <a href={bookingHref(`hero:${source}`)} data-hero-cta="">
                      Bestill time
                    </a>
                  </Button>
                )}
                {secondary && (
                  <Button asChild size="lg" variant="outline">
                    <Link href={secondary.href}>{secondary.label}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
          {children && <div>{children}</div>}
          {!children && photo && (
            // the wrapper sets the width: Photo caps itself at its display size inline
            <div className="mx-auto w-full max-w-[15rem] sm:max-w-xs lg:mx-0 lg:max-w-sm lg:justify-self-end">
              <Photo name={photo} priority />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
