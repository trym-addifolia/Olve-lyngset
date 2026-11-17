import type { FaqPageContent } from '@content/types'
import CtaBand from '@/components/CtaBand'
import FaqAccordion from '@/components/FaqAccordion'
import PageHero from '@/components/PageHero'
import RelatedLinks from '@/components/RelatedLinks'
import SafetyBox from '@/components/SafetyBox'
import SectionHeading from '@/components/SectionHeading'
import JsonLd from '@/components/seo/JsonLd'
import { faqSchema, medicalWebPageSchema } from '@/lib/schema'
import { HOME, type Route, pathOf } from '@/routes'

/** FAQ page: grouped answer-first questions; one FAQPage schema for all groups. */
export default function FaqTemplate({ route, content }: { route: Route; content: FaqPageContent }) {
  const path = pathOf(route)
  const all = content.groups.flatMap((g) => g.faqs)
  return (
    <>
      <JsonLd
        data={medicalWebPageSchema({
          path,
          title: route.title,
          description: route.description,
          hasFaq: true,
        })}
      />
      <JsonLd data={faqSchema(all, path)} />
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
        figure="buegangene-ute"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-20">
          <div className="space-y-16">
            {content.groups.map((g, i) => (
              <section key={g.heading} id={`gruppe-${i + 1}`} className="scroll-mt-28">
                <SectionHeading eyebrow="Spørsmål og svar" title={g.heading} />
                <div className="mt-8">
                  <FaqAccordion faqs={g.faqs} schema={false} />
                </div>
              </section>
            ))}
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <SafetyBox variant="compact" />
          </aside>
        </div>
      </div>
      <RelatedLinks slugs={content.related} />
      <CtaBand
        title={content.closing.heading}
        lede={content.closing.lede}
        source={`cta:${route.slug}`}
      />
    </>
  )
}
