import type { MetadataRoute } from 'next'
import { ALLOW_INDEX, BASE_URL } from '@/lib/siteUrl'

/*
 * Preview-safe by default: disallow everything unless the build resolves to
 * the production host (siteUrl.ts). Production disallows the API routes.
 */
export default function robots(): MetadataRoute.Robots {
  return ALLOW_INDEX
    ? {
        rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
        sitemap: `${BASE_URL}/sitemap.xml`,
      }
    : { rules: { userAgent: '*', disallow: '/' } }
}
