import type { ExerciseContent } from '@content/types'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import ArticleBody, { ArticleSection } from '@/components/ArticleBody'
import CtaBand from '@/components/CtaBand'
import FaqAccordion from '@/components/FaqAccordion'
import PageHero from '@/components/PageHero'
import ProcessTimeline from '@/components/ProcessTimeline'
import RelatedLinks from '@/components/RelatedLinks'
import RichText from '@/components/RichText'
import SafetyBox from '@/components/SafetyBox'
import SectionHeading from '@/components/SectionHeading'
import VideoEmbed from '@/components/VideoEmbed'
import JsonLd from '@/components/seo/JsonLd'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { medicalWebPageSchema } from '@/lib/schema'
import { HOME, type Route, pathOf } from '@/routes'
import { site } from '@/site.config'
import { topicOf } from './InfoTemplate'

/**
 * Exercise guide: warning first ("which canal?"), numbered steps with
 * illustrations, the practitioner's video, extra sections, FAQ, dual CTA.
 */
export default function ExerciseTemplate({
  route,
  content,
}: { route: Route; content: ExerciseContent }) {
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
        figure="buegangene-ute"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-20">
          <article className="min-w-0 max-w-prose">
            <aside
              className="rounded-r-lg border-l-4 border-ember-500 bg-ember-50 p-5 md:p-6"
              aria-label="Viktig før du begynner"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className="mt-0.5 h-5 w-5 shrink-0 text-ember-700"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="font-serif text-xl font-medium leading-snug text-ember-900">
                    {content.warningHeading}
                  </h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ember-900/85 md:text-base">
                    <RichText text={content.warning.text} />
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem] font-semibold">
                    {content.why ? (
                      <a
                        href={`#${content.why.id}`}
                        className="text-fjord-700 underline underline-offset-4"
                      >
                        Hvorfor jeg fraråder det
                      </a>
                    ) : (
                      <Link
                        href="/buegangene"
                        className="text-fjord-700 underline underline-offset-4"
                      >
                        Les om buegangene
                      </Link>
                    )}
                    <a
                      href={bookingHref(`advarsel:${route.slug}`)}
                      className="text-fjord-700 underline underline-offset-4"
                    >
                      Book en time
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {content.why && (
              <div className="mt-14">
                <ArticleSection section={content.why} />
              </div>
            )}

            <section id="steg" className="mt-14 scroll-mt-28">
              <SectionHeading
                eyebrow="Steg for steg"
                title={content.stepsHeading}
                lede={content.stepsLede}
              />
              <div className="mt-8">
                <ProcessTimeline steps={content.steps} rail={content.rail} />
              </div>
            </section>

            {content.showVideo && (
              <section id="video" className="mt-16 scroll-mt-28">
                <SectionHeading
                  eyebrow="Video"
                  title={`${site.practitioner.firstName} viser hvordan`}
                />
                <div className="mt-6">
                  <VideoEmbed
                    youtubeId={site.practitioner.video.youtubeId}
                    title={site.practitioner.video.title}
                  />
                </div>
              </section>
            )}

            <div className="mt-14">
              <ArticleBody sections={content.sections} />
            </div>

            <div id="ring-113" className="mt-14 scroll-mt-28">
              <SafetyBox />
            </div>

            <section id="faq" className="mt-16 scroll-mt-28 border-t border-border pt-14">
              <SectionHeading
                eyebrow="Spørsmål og svar"
                title={`Vanlige spørsmål om ${topicOf(route)}`}
              />
              <div className="mt-6">
                <FaqAccordion faqs={content.faqs} path={path} />
              </div>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-lg border border-border bg-card p-6">
              <p className="eyebrow">Usikker?</p>
              <h2 className="mt-2 text-display-sm">Usikker på hvilken side det er?</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                Med infrarøde videobriller ser jeg etter om det er krystaller, og hvilken buegang de
                ligger i. Da blir øvelsen den som passer.
              </p>
              <Button asChild className="mt-5 w-full">
                <a href={bookingHref(`side:${route.slug}`)}>Book en time</a>
              </Button>
            </div>
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
