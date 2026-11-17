import type { PrivacyContent } from '@content/types'
import ArticleBody from '@/components/ArticleBody'
import PageHero from '@/components/PageHero'
import Toc from '@/components/Toc'
import { type Route, crumbsOf } from '@/routes'

/** Privacy (GDPR art. 13), sections generated from the real data flows. */
export default function PrivacyTemplate({
  route,
  content,
}: { route: Route; content: PrivacyContent }) {
  return (
    <>
      <PageHero
        crumbs={crumbsOf(route)}
        eyebrow={route.eyebrow}
        h1={route.h1}
        intro={content.intro.text}
        source={route.slug}
        showCtas={false}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-20">
          <article className="max-w-prose">
            <p className="text-sm text-muted-foreground">Sist oppdatert {content.updated}</p>
            <div className="mt-8">
              <ArticleBody sections={content.sections} />
            </div>
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <Toc items={content.sections.map((s) => ({ id: s.id, label: s.heading }))} />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
