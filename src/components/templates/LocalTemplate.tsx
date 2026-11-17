import type { LocalContent } from '@content/types'
import { MapPin } from 'lucide-react'
import ArticleBody from '@/components/ArticleBody'
import CtaBand from '@/components/CtaBand'
import FaqAccordion from '@/components/FaqAccordion'
import LocationCard from '@/components/LocationCard'
import PageHero from '@/components/PageHero'
import RelatedLinks from '@/components/RelatedLinks'
import RichText from '@/components/RichText'
import SectionHeading from '@/components/SectionHeading'
import JsonLd from '@/components/seo/JsonLd'
import { medicalWebPageSchema } from '@/lib/schema'
import { HOME, type Route, pathOf } from '@/routes'
import { site } from '@/site.config'

/** Local landing: place in every view, NAP, areas served, travel, FAQ. */
export default function LocalTemplate({ route, content }: { route: Route; content: LocalContent }) {
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
        figure="buegangene-ute"
      />

      <section id="finn-frem" className="scroll-mt-28 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Finn frem"
            title="Slik finner du frem"
            lede={`${site.contact.address.full}. Tog, buss og parkering.`}
          />
          <LocationCard className="mt-10" practical={content.practical} />
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Områder"
            title="Hvor kommer pasientene fra?"
            lede="Fra Lillestrøm, nabokommunene på Romerike og Oslo. {{OLVE_BEKREFT: hvor pasientene faktisk kommer fra}}"
          />
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {content.areas.map((a) => (
              <li
                key={a.text}
                className="inline-flex items-center gap-2 rounded-full border border-fjord-200 bg-card px-4 py-2 text-[0.9375rem] font-medium"
              >
                <MapPin className="h-4 w-4 text-fjord-700" aria-hidden="true" />
                <RichText text={a.text} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-card py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="max-w-prose">
              <ArticleBody sections={content.sections} />
            </div>
            <section id="faq" className="scroll-mt-28">
              <SectionHeading
                eyebrow="Spørsmål og svar"
                title={`Vanlige spørsmål om time i ${site.location.city}`}
              />
              <div className="mt-8">
                <FaqAccordion faqs={content.faqs} path={path} />
              </div>
            </section>
          </div>
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
