import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/siteUrl'
import { PUBLIC_ROUTES, encodePath } from '@/routes'

// Bump when a round touches every route.
const ROUND_DATE = new Date('2026-11-17')

/** Every public route from the registry, nested paths encoded per segment. */
export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((r) => ({
    url: `${BASE_URL}${encodePath(r)}`,
    lastModified: ROUND_DATE,
    priority: r.priority,
    changeFrequency: r.changeFrequency,
  }))
}
