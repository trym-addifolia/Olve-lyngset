import { PHOTOS, SITE } from '@content/site'
import type { Page } from '@content/types'
import type { Metadata } from 'next'
import { plain } from '@/lib/facts'
import { graph } from '@/lib/schema'
import { INDEXABLE, pathOf } from '@/lib/site-url'
import { Blocks, Faqs } from './Blocks'
import { Hero } from './Hero'
import { JsonLd } from './JsonLd'

export function pageMetadata(page: Page, draft = false): Metadata {
  const description = plain(page.description)
  return {
    // a draft view is never indexable, whatever the build flag says
    ...(draft || !INDEXABLE ? { robots: { index: false, follow: false, nocache: true } } : {}),
    title: { absolute: page.title },
    description,
    alternates: { canonical: pathOf(page.slug) },
    openGraph: {
      title: page.title,
      description,
      url: pathOf(page.slug),
      locale: 'nb_NO',
      type: 'website',
      images: [PHOTOS.portrett.src],
    },
  }
}

/* One column. The hero carries the portrait; opening hours live in the footer. */
export function PageView({ page, draft }: { page: Page; draft: boolean }) {
  return (
    <main id="innhold">
      {draft && <p className="banner">{SITE.draft.banner}</p>}
      <div className="wrap page">
        <div className="col">
          <Hero page={page} draft={draft} />
          <Blocks page={page} draft={draft} />
          {page.faqs && page.faqs.length > 0 && !page.blocks.some((b) => b.kind === 'faq') && (
            <Faqs faqs={page.faqs} draft={draft} />
          )}
        </div>
      </div>
      <JsonLd data={graph(page)} />
    </main>
  )
}

export type SearchProps = { searchParams: Promise<Record<string, string | string[] | undefined>> }
/** Draft view (?utkast=1) exists only on non-indexable builds (previews). On the launch build it is off. */
export const draftAllowed = () => !INDEXABLE
export const isDraft = async (sp: SearchProps['searchParams']) =>
  draftAllowed() && (await sp).utkast === '1'
