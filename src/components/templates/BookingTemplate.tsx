import type { BookingContent } from '@content/types'
import { ExternalLink } from 'lucide-react'
import CtaBand from '@/components/CtaBand'
import FaqAccordion from '@/components/FaqAccordion'
import PageHero from '@/components/PageHero'
import PriceTable from '@/components/PriceTable'
import ProcessTimeline from '@/components/ProcessTimeline'
import RelatedLinks from '@/components/RelatedLinks'
import RichText from '@/components/RichText'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { bookingHref, bookingProviderUrl } from '@/lib/booking'
import { HOME, type Route, pathOf } from '@/routes'
import { site } from '@/site.config'

/**
 * Booking page in deeplink mode: the big button to the provider calendar
 * (via the server-logged outbound route), price table, what happens on the
 * first visit, and FAQ for "pris / henvisning".
 */
export default function BookingTemplate({
  route,
  content,
}: { route: Route; content: BookingContent }) {
  const path = pathOf(route)
  const provider = bookingProviderUrl()
  return (
    <>
      <PageHero
        crumbs={[
          { name: HOME.navLabel, path: '/' },
          { name: route.navLabel, path },
        ]}
        eyebrow={route.eyebrow}
        h1={route.h1}
        intro={content.intro.text}
        source={route.slug}
        showCtas={false}
        tone="mist"
      >
        <div className="rounded-lg border border-border bg-card p-6 md:p-8">
          <p className="eyebrow">Nettbooking</p>
          <h2 className="mt-2 text-display-sm md:text-display-md">Velg en tid som passer deg</h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
            <RichText
              text={`Du sendes til kalenderen hos ${site.brand.clinicName}. Ingen henvisning, ingen betaling nå.`}
            />
          </p>
          <Button asChild size="lg" className="mt-5 w-full">
            <a href={bookingHref('side:bestill-time')}>
              Book en time
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          {provider && (
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Åpner {new URL(provider).host}
            </p>
          )}
        </div>
      </PageHero>

      {site.compliance.showPrices && (
        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-8">
            <SectionHeading
              eyebrow="Pris"
              title="Hva koster en time?"
              lede="Du betaler etter timen."
            />
            <PriceTable />
          </div>
        </section>
      )}

      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-8">
          <div>
            <SectionHeading eyebrow="Første time" title="Hva skjer på første time?" />
            <ul className="mt-6 max-w-prose space-y-3 text-[0.9375rem] leading-relaxed text-foreground/85">
              {content.beforeVisit.map((b) => (
                <li key={b.text} className="border-t border-border pt-3">
                  <RichText text={b.text} />
                </li>
              ))}
            </ul>
          </div>
          <ProcessTimeline steps={content.whatHappens} />
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section
            id="faq"
            className="grid scroll-mt-28 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16"
          >
            <SectionHeading
              eyebrow="Spørsmål og svar"
              title="Vanlige spørsmål om bestilling og henvisning"
            />
            <FaqAccordion faqs={content.faqs} path={path} />
          </section>
        </div>
      </section>

      <RelatedLinks slugs={content.related} />
      <CtaBand
        title={content.closing.heading}
        lede={content.closing.lede}
        source={`cta:${route.slug}`}
      />
    </>
  )
}
