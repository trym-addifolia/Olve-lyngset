import type { HubContent, InfoContent } from '@content/types'
import ArticleBody from '@/components/ArticleBody'
import CtaBand from '@/components/CtaBand'
import FaqAccordion from '@/components/FaqAccordion'
import PageHero from '@/components/PageHero'
import RelatedLinks from '@/components/RelatedLinks'
import SafetyBox from '@/components/SafetyBox'
import SectionHeading from '@/components/SectionHeading'
import Toc from '@/components/Toc'
import { type Route, SAFETY_HREF, crumbsOf, pathOf } from '@/routes'

/** The id the 113 box carries; SAFETY_HREF points at it on /svimmelhet. */
const SAFETY_ID = 'akutt'

/**
 * Info page and the /svimmelhet hub (same anatomy, broader topic): article
 * with table of contents, the 113 box when the content asks for it
 * (`safety`), FAQ, related links and the closing band.
 */
export default function InfoTemplate({
  route,
  content,
}: { route: Route; content: InfoContent | HubContent }) {
  const path = pathOf(route)
  const hasFaq = content.faqs.length > 0
  const toc = [
    ...content.sections.map((s) => ({ id: s.id, label: s.heading })),
    ...(content.safety ? [{ id: SAFETY_ID, label: 'Når du skal ringe 113' }] : []),
    ...(hasFaq ? [{ id: 'faq', label: 'Vanlige spørsmål' }] : []),
  ]
  // a stub page with only an intro skips the empty article grid
  const hasBody = content.sections.length > 0 || content.safety || hasFaq
  // the box is the full advice on /svimmelhet, so it does not link to itself there
  const holdsSafetyAdvice = SAFETY_HREF.startsWith(`${path}#`)

  return (
    <>
      <PageHero
        crumbs={crumbsOf(route)}
        eyebrow={route.eyebrow}
        h1={route.h1}
        intro={content.intro.text}
        source={route.slug}
        cta={route.heroCta}
        photo={content.heroPhoto}
      />

      {hasBody && (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-20">
            <article className="min-w-0 max-w-prose">
              <div className="lg:hidden">
                <Toc items={toc} />
              </div>
              {content.sections.length > 0 && (
                <div className="mt-10 lg:mt-0">
                  <ArticleBody sections={content.sections} />
                </div>
              )}
              {content.safety && (
                <div id={SAFETY_ID} className="mt-14 scroll-mt-28">
                  <SafetyBox moreLink={!holdsSafetyAdvice} />
                </div>
              )}
              {hasFaq && (
                <section
                  id="faq"
                  className="mt-16 scroll-mt-28 border-t border-border pt-14 md:mt-20"
                >
                  <SectionHeading
                    eyebrow="Spørsmål og svar"
                    title={`Vanlige spørsmål om ${topicOf(route)}`}
                  />
                  <div className="mt-6">
                    <FaqAccordion faqs={content.faqs} path={path} />
                  </div>
                </section>
              )}
            </article>
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-10">
                <Toc items={toc} />
              </div>
            </aside>
          </div>
        </div>
      )}

      <RelatedLinks slugs={content.related} />
      <CtaBand
        title={content.closing.heading}
        lede={content.closing.lede}
        source={`cta:${route.slug}`}
      />
    </>
  )
}

/** "Vanlige spørsmål om <tema>": the topic in lower case from the nav label. */
export function topicOf(route: Route): string {
  if (route.faqTopic) return route.faqTopic
  const label = route.navLabel.replace(/\?$/, '')
  return label.charAt(0).toLowerCase() + label.slice(1)
}
