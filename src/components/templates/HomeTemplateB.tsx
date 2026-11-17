import type { HomeContent } from '@content/types'
import Link from 'next/link'
import CtaBand from '@/components/CtaBand'
import PortraitSlot from '@/components/PortraitSlot'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { HOME_B } from '@/routes'

/**
 * Home, direction B «Det er hjelp å få» (ochre accent), served at /retning-b
 * (noindex, outside menus and sitemap). Shares HomeContent with direction A.
 *
 * STUB from the foundation task: the quote, H1, lede, booking button,
 * portrait and closing band. Task 3 designs the page (portrait to the edge,
 * the quote as the centrepiece, Gråsonen as the dark band early, doorways as
 * a typographic list, then the lower sections).
 */
export default function HomeTemplateB({ content }: { content: HomeContent }) {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-10 px-4 pb-14 pt-8 sm:px-6 md:pt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:px-8 lg:pb-20">
          <PortraitSlot priority className="mx-auto lg:mx-0" />
          <div>
            {/* arbeidsdokument §1: the core message, Olve's own words */}
            <p className="font-serif text-display-lg text-ochre-700 md:text-display-xl">
              Det er hjelp å få.
            </p>
            <h1 className="mt-6 text-display-sm text-foreground md:text-display-md">{HOME_B.h1}</h1>
            <div className="mt-6 max-w-prose space-y-4 text-lg leading-relaxed text-foreground/85">
              {content.hero.lede.map((p) => (
                <p key={p.text}>
                  <RichText text={p.text} />
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="h-14 px-7 text-[1.0625rem]">
                <a href={bookingHref('hero:retning-b')} data-hero-cta="">
                  Bestill time
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-7 text-[1.0625rem]">
                <Link href={content.hero.secondary.href}>{content.hero.secondary.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title={content.closing.heading} lede={content.closing.lede} source="cta:retning-b" />
    </>
  )
}
