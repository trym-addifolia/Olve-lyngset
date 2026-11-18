import type { PractitionerContent } from '@content/types'
import ArticleBody from '@/components/ArticleBody'
import Breadcrumbs from '@/components/Breadcrumbs'
import Byline from '@/components/Byline'
import CtaBand from '@/components/CtaBand'
import EquipmentList from '@/components/EquipmentList'
import FaqAccordion from '@/components/FaqAccordion'
import PortraitSlot from '@/components/PortraitSlot'
import RelatedLinks from '@/components/RelatedLinks'
import RichText from '@/components/RichText'
import SectionHeading from '@/components/SectionHeading'
import VideoEmbed from '@/components/VideoEmbed'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { type Route, crumbsOf, pathOf } from '@/routes'
import { site } from '@/site.config'

/** Single practitioner profile: portrait, facts (title, HPR, education), story, video.
 *  The Person JSON-LD is emitted once, in the root layout. */
export default function PractitionerTemplate({
  route,
  content,
}: { route: Route; content: PractitionerContent }) {
  const path = pathOf(route)
  const p = site.practitioner
  return (
    <>
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6 md:pb-20 md:pt-8 lg:px-8">
          <Breadcrumbs items={crumbsOf(route)} />
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
            <PortraitSlot priority className="mx-auto lg:mx-0" />
            <div>
              <SectionHeading as="h1" title={route.h1} />
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-foreground md:text-xl md:leading-relaxed">
                <RichText text={content.intro.text} />
              </p>
              <dl className="mt-8 grid gap-x-10 gap-y-4 border-t border-border pt-5 sm:grid-cols-2">
                {content.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-[0.9375rem] text-muted-foreground">{f.label}</dt>
                    <dd className="mt-1 text-base font-medium leading-snug">
                      <RichText text={f.value.text} />
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <Button asChild size="lg" className="h-14 px-7 text-lg">
                  <a href={bookingHref(`hero:${route.slug}`)} data-hero-cta="">
                    Bestill time
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
            <div className="max-w-prose">
              <ArticleBody sections={content.sections} />
            </div>
            <div className="space-y-10">
              {content.showVideo && (
                <VideoEmbed youtubeId={p.video.youtubeId} title={p.video.title} />
              )}
              <div>
                <h2 className="mb-5 text-display-sm">Utstyr og tester</h2>
                <EquipmentList columns={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {content.faqs.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <SectionHeading
                title={`Vanlige spørsmål om ${p.firstName}`}
              />
              <FaqAccordion faqs={content.faqs} path={path} />
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Byline updated={content.updated} author={false} />
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
