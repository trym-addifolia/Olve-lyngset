/** @type {import('next').NextConfig} */

// Indexing is off unless SITE_INDEX=1 is set at build time. That flag is only for
// the launch, which is not part of this build (no DNS, no production domain).
const indexable = process.env.SITE_INDEX === '1'

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'production' ? '' : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ')

const headers = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  ...(indexable
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' }]
    : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]),
]

export default {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  // metadata in <head> for every client, not streamed into <body> (crawlers and audits read the head)
  htmlLimitedBots: /.*/,
  eslint: { ignoreDuringBuilds: true },
  images: { formats: ['image/avif', 'image/webp'] },
  // the sister site owns this topic; an old shared link lands there, not on a 404
  async redirects() {
    return [{ source: '/svimmelhet/krystallsyke/', destination: 'https://www.krystallsyken.no/', permanent: true }]
  },
  async headers() {
    return [{ source: '/:path*', headers }]
  },
}
