import { CONTENT } from '@content/index'
import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/siteUrl'
import { PUBLIC_ROUTES, encodePath } from '@/routes'

/** Every public route from the registry, nested paths encoded per segment, dated by its content file. */
export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((r) => ({
    url: `${BASE_URL}${encodePath(r)}`,
    lastModified: new Date(CONTENT[r.slug].updated),
    priority: r.priority,
    changeFrequency: r.changeFrequency,
  }))
}
