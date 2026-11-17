import { CONTENT } from '@content/index'
import type { HomeContent } from '@content/types'
import type { Metadata } from 'next'
import HomeTemplateB from '@/components/templates/HomeTemplateB'
import { HOME_B } from '@/routes'

/*
 * Home direction B, for Trym's choice between the two directions. Never
 * indexed (also on the production host, whatever the layout says), never in
 * the sitemap, llms.txt or menus (HOME_B.hidden). The title carries
 * «[Forhåndsvisning B]» from the registry. No canonical: the page is not
 * meant to be found.
 */
export const metadata: Metadata = {
  title: { absolute: HOME_B.title },
  description: HOME_B.description,
  robots: { index: false, follow: false },
}

export default function RetningBPage() {
  return <HomeTemplateB content={CONTENT[HOME_B.slug] as HomeContent} />
}
