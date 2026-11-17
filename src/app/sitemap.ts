import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/siteUrl'
import { ROUTES, encodePath } from '@/routes'

// Bump when a round touches every route.
const ROUND_DATE = new Date('2026-11-09')

/** Every public route from the registry, non-ASCII slugs percent-encoded. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: `${BASE_URL}${encodePath(r)}`,
    lastModified: ROUND_DATE,
    priority: r.priority,
    changeFrequency: r.changeFrequency,
  }))
}
