import type { MetadataRoute } from 'next'
import { CONTENT_UPDATED } from '@content/site'
import { ROUTES } from '@/routes'
import { SITE_URL } from '@/lib/site-url'

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({ url: `${SITE_URL}${r.path}`, lastModified: CONTENT_UPDATED }))
}
