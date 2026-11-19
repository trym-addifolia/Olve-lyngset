import type { MetadataRoute } from 'next'
import { INDEXABLE, SITE_URL } from '@/lib/site-url'

export default function robots(): MetadataRoute.Robots {
  return INDEXABLE
    ? {
        rules: { userAgent: '*', allow: '/', disallow: ['/go/'] },
        sitemap: `${SITE_URL}/sitemap.xml`,
      }
    : { rules: { userAgent: '*', disallow: '/' } }
}
