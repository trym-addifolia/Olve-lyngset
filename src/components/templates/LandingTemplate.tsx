import { Figure } from '@content/illustrations'
import type { LandingContent } from '@content/types'
import { ArticleSection } from '@/components/ArticleBody'
import CtaBand from '@/components/CtaBand'
import EquipmentList from '@/components/EquipmentList'
import FaqAccordion from '@/components/FaqAccordion'
import PageHero from '@/components/PageHero'
import Photo from '@/components/Photo'
import PriceTable from '@/components/PriceTable'
import RichText from '@/components/RichText'
import ProcessTimeline from '@/components/ProcessTimeline'
import RelatedLinks from '@/components/RelatedLinks'
import SafetyBox from '@/components/SafetyBox'
import SectionHeading from '@/components/SectionHeading'
import JsonLd from '@/components/seo/JsonLd'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { medicalWebPageSchema } from '@/lib/schema'
import { HOME, type Route, pathOf } from '@/routes'
import { site } from '@/site.config'
import { topicOf } from './InfoTemplate'

/**
 * Ad landing page, considered intent:
 * H1 = head keyword, process as timeline, price, equipment, "når jeg
 * henviser videre", FAQ, booking above the fold on mobile.
 */
export default function LandingTemplate({
  route,
  content,
}: { route: Route; content: LandingContent }) {
  const path = pathOf(route)
  return (
    <>
      <JsonLd
        data={medicalWebPageSchema({
          path,
          title: route.title,
          description: route.description,
          hasFaq: content.faqs.length > 0,
        })}
      />
      <PageHero
        crumbs={[
          { name: HOME.navLabel, path: '/' },
          { name: route.navLabel, path },
        ]}
        eyebrow={route.eyebrow}
        h1={route.h1}
        intro={content.intro.text}
        source={route.slug}
        cta={route.heroCta}
        tone="mist"
      >
        <div className="rounded-lg border border-border bg-card p-6 md:p-7">
          <h2 className="text-display-sm">Velg en tid i kalenderen min</h2>
          <p className="mt-3 text-base leading-relaxed text-foreground/80">
            <RichText text="Du velger tid selv, uten henvisning, og betaler etter timen." />
          </p>
          <Button asChild size="lg" className="mt-5 w-full">
            <a href={bookingHref(`kort:${route.slug}`)}>Book en time</a>
          </Button>
        </div>
      </PageHero>

      {/* The 113 box right under the hero: nobody books past a warning sign */}
      <section id="ring-113" className="scroll-mt-28 bg-mist py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SafetyBox variant="compact" />
        </div>
      </section>

      <section id="timen" className="scroll-mt-28 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16 lg:px-8">
          <div>
            <SectionHeading
              title="Slik foregår timen"
              lede="Først finner jeg hvor. Så behandler jeg. Er det noe annet enn krystaller, sier jeg fra."
            />
            {content.photo && (
              <Photo
                name={content.photo.name}
                caption={content.photo.caption}
                className="mx-auto mt-10 lg:mx-0"
              />
            )}
            <Figure
              name="buegangene-ute"
              labels
              className="mx-auto mt-10 w-full max-w-xs lg:max-w-none"
              caption="Balanseorganet med de tre buegangene. Øyebevegelsen viser hvilken buegang krystallene ligger i."
            />
          </div>
          <ProcessTimeline steps={content.timeline} />
        </div>
      </section>

      {content.showPrice && site.compliance.showPrices && (
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-8">
            <SectionHeading title="Hva koster det?" />
            <PriceTable />
          </div>
        </section>
      )}

      {content.showEquipment && (
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16 lg:px-8">
            <Figure name="brillene" className="mx-auto w-full max-w-xs lg:max-w-none" />
            <div>
              <SectionHeading title="Hva jeg undersøker deg med" />
              <div className="mt-8">
                <EquipmentList columns={1} />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-card py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="max-w-prose">
              <ArticleSection section={content.referral} />
            </div>
            <div className="max-w-prose space-y-12">
              {content.sections.map((s) => (
                <ArticleSection key={s.id} section={s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section
            id="faq"
            className="grid scroll-mt-28 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16"
          >
            <SectionHeading title={`Vanlige spørsmål om ${topicOf(route)}`} />
            <FaqAccordion faqs={content.faqs} path={path} />
          </section>
        </div>
      </section>

      <RelatedLinks slugs={content.related} />
      <CtaBand
        title={content.closing.heading}
        lede={content.closing.lede}
        source={`cta:${route.slug}`}
        figure={{
          name: 'buegangene-pa-plass',
          caption: 'Krystallene tilbake der de hører hjemme.',
        }}
      />
    </>
  )
}
