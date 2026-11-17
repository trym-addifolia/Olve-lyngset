import type { HubContent, InfoContent } from '@content/types'
import ArticleBody from '@/components/ArticleBody'
import CtaBand from '@/components/CtaBand'
import FaqAccordion from '@/components/FaqAccordion'
import PageHero from '@/components/PageHero'
import RelatedLinks from '@/components/RelatedLinks'
import SafetyBox from '@/components/SafetyBox'
import SectionHeading from '@/components/SectionHeading'
import Toc from '@/components/Toc'
import JsonLd from '@/components/seo/JsonLd'
import { medicalWebPageSchema } from '@/lib/schema'
import { HOME, type Route, pathOf } from '@/routes'

/**
 * Info / condition page: article with table of contents, the 113 box,
 * answer-first FAQ, related links and the dual CTA. MedicalWebPage about
 * MedicalCondition (BPPV) + FAQPage from the same array. Also used for the
 * /svimmelhet hub (same anatomy, broader topic).
 */
/** Pages about the examination, or about what is not crystals: the goggles, not crystals astray. */
const NOT_CRYSTALS = ['diagnosering', 'andre-arsaker', 'nakkesvimmelhet', 'er-det-farlig']

export default function InfoTemplate({
  route,
  content,
}: { route: Route; content: InfoContent | HubContent }) {
  const path = pathOf(route)
  const toc = [
    ...content.sections.map((s) => ({ id: s.id, label: s.heading })),
    { id: 'ring-113', label: 'Når du skal ringe 113' },
    { id: 'faq', label: 'Vanlige spørsmål' },
  ].filter((t, i, arr) => arr.findIndex((x) => x.id === t.id) === i)

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
        figure={NOT_CRYSTALS.includes(route.slug) ? 'brillene' : 'buegangene-ute'}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-20">
          <article className="min-w-0 max-w-prose">
            <div className="lg:hidden">
              <Toc items={toc} />
            </div>
            <div className="mt-10 lg:mt-0">
              <ArticleBody sections={content.sections} />
            </div>
            {content.sections.some((s) => s.id === 'ring-113') ? (
              /* the box sits in the sidebar on desktop; below it, it closes the article once */
              <div className="mt-14 lg:hidden">
                <SafetyBox />
              </div>
            ) : (
              <div id="ring-113" className="mt-14 scroll-mt-28">
                <SafetyBox />
              </div>
            )}
            <section id="faq" className="mt-16 scroll-mt-28 border-t border-border pt-14 md:mt-20">
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
            <div className="sticky top-28 space-y-10">
              <Toc items={toc} />
              {content.sections.some((s) => s.id === 'ring-113') && (
                <SafetyBox variant="compact" headingId="ring-113-heading-side" />
              )}
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

/** "Vanlige spørsmål om <tema>": the topic in lower case from the nav label. */
export function topicOf(route: Route): string {
  if (route.faqTopic) return route.faqTopic
  const label = route.navLabel.replace(/\?$/, '')
  return label.charAt(0).toLowerCase() + label.slice(1)
}
