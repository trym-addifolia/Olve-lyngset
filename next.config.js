/** @type {import('next').NextConfig} */

// Permanent redirects live in src/routes.ts (REDIRECTS); mirrored here because
// next.config.js cannot import TypeScript. Keep the two in sync. Empty: a new
// site has no old URLs (the krystallsyken.no map is out of scope).
const REDIRECTS = []

const isProd = process.env.NODE_ENV === 'production'

// Security headers. CSP allows: own scripts/styles (Next inlines JSON-LD and
// font CSS), the click-to-load youtube-nocookie frame and its thumbnails,
// and form posts to the booking provider. Dev needs unsafe-eval for HMR.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://i.ytimg.com",
  'font-src \'self\' data:',
  "frame-src https://www.youtube-nocookie.com",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  // Cloudflare Workers has no free Next image optimizer; the photos are exported
  // small enough (public/bilder/, long side 1600) to be served as is
  images: { unoptimized: true },
  async redirects() {
    return REDIRECTS
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

module.exports = nextConfig

// `next dev` gets the Cloudflare bindings (local D1) from wrangler.jsonc
require('@opennextjs/cloudflare').initOpenNextCloudflareForDev()
