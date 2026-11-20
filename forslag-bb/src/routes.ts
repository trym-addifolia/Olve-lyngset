/*
 * Route registry, derived from content/pages.ts so a page can never exist in one
 * place and be missing in another. Feeds the sitemap, the QA scripts and the gates.
 */
import { PAGES } from '@content/pages'
import { pathOf } from './lib/site-url'

export type Route = {
  slug: string
  path: string
  title: string
  h1: string
  kicker?: string
  description: string
}

export const ROUTES: Route[] = PAGES.map((p) => ({
  slug: p.slug,
  path: pathOf(p.slug),
  title: p.title,
  h1: p.h1,
  kicker: p.kicker,
  description: p.description,
}))

export { pathOf }
