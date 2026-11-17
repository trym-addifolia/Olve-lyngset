import type { HomeContent } from '@content/types'
import Link from 'next/link'
import CtaBand from '@/components/CtaBand'
import PortraitSlot from '@/components/PortraitSlot'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { HOME } from '@/routes'

/**
 * Home, direction A «To dører» (moss accent), served at /.
 *
 * STUB from the foundation task: eyebrow, H1, lede, the two buttons, the
 * portrait and the closing band. Task 3 designs the page (doorways,
 * undersøkelse, Gråsonen as the dark band, Om meg, contact, location, FAQ).
 */
export default function HomeTemplate({ content }: { content: HomeContent }) {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-10 px-4 pb-14 pt-8 sm:px-6 md:pt-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:px-8 lg:pb-20">
          <div>
            <p className="eyebrow text-moss-700">{HOME.eyebrow}</p>
            <h1 className="mt-4 text-[2.375rem] leading-[1.08] tracking-[-0.01em] text-foreground sm:text-display-lg md:text-display-xl">
              {HOME.h1}
            </h1>
            <div className="mt-6 max-w-prose space-y-4 text-lg leading-relaxed text-foreground/85 md:text-[1.25rem] md:leading-[1.6]">
              {content.hero.lede.map((p) => (
                <p key={p.text}>
                  <RichText text={p.text} />
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="h-14 px-7 text-[1.0625rem]">
                <a href={bookingHref('hero:forside')} data-hero-cta="">
                  Bestill time
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-7 text-[1.0625rem]">
                <Link href={content.hero.secondary.href}>{content.hero.secondary.label}</Link>
              </Button>
            </div>
          </div>
          <PortraitSlot priority className="mx-auto lg:mx-0 lg:justify-self-end" />
        </div>
      </section>

      <CtaBand title={content.closing.heading} lede={content.closing.lede} source="cta:forside" />
    </>
  )
}
