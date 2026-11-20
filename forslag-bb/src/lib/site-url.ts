/** Base URL for canonical links and the sitemap. On a preview this is the preview alias. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3141')
).replace(/\/$/, '')

/** Indexing is off unless SITE_INDEX=1 at build time (launch only). */
export const INDEXABLE = process.env.SITE_INDEX === '1'

/* Launch guard: an indexable build must have its canonical base on the production host. */
const PRODUCTION_HOST = process.env.PRODUCTION_HOST ?? ''
if (INDEXABLE && (!PRODUCTION_HOST || !SITE_URL.includes(PRODUCTION_HOST))) {
  throw new Error('SITE_INDEX=1 needs PRODUCTION_HOST and NEXT_PUBLIC_SITE_URL on that host')
}

export const pathOf = (slug: string) => (slug === '' ? '/' : `/${slug}/`)
