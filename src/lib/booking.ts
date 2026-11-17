/*
 * One bookingHref() for every CTA on the site.
 *
 * In deeplink mode the href points at the local outbound route
 * (/go/bestill, alias /api/booking-klikk) which logs the click server-side and 302s to the
 * provider calendar. Native mode is reserved for a proven provider API
 * (none for Solvit yet).
 */
import { IS_PRODUCTION_HOST } from '@/lib/siteUrl'
import { BOOKING_ROUTE, ROUTES, pathOf } from '@/routes'
import { site } from '@/site.config'

/** The outbound click route (ADS-PLAN §3.1). /api/booking-klikk is an alias of the same handler. */
export const OUTBOUND_BOOKING_PATH = '/go/bestill'

/*
 * Every `fra` value the site's own CTAs send. The click route stores only
 * these; anything else is counted as «annet», so nobody can fill the tally
 * with made-up sources. Keep in step with the bookingHref() call sites:
 * fixed labels, and «prefix:slug» for the per-page CTAs.
 */
const FIXED_SOURCES = [
  'cta',
  'hero:forside',
  'cta:forside',
  'slik-foregar-timen',
  'sticky-mobil',
  'kontakt:intent',
  'side:bestill-time',
] as const
const PAGE_PREFIXES = ['hero', 'cta', 'kort', 'side', 'advarsel'] as const

export const BOOKING_SOURCES: ReadonlySet<string> = new Set<string>([
  ...FIXED_SOURCES,
  ...ROUTES.filter((r) => r.slug).flatMap((r) => PAGE_PREFIXES.map((p) => `${p}:${r.slug}`)),
])

/** The `fra` value to store: a known source, or «annet». */
export function bookingSource(raw: string | null): string {
  return raw !== null && BOOKING_SOURCES.has(raw) ? raw : 'annet'
}

/**
 * Whether a `test_run` query value marks the hit as a test. Off production
 * (previews, localhost) «1» is enough; on the production host only the
 * secret in TEST_RUN_SECRET counts, so visitors cannot hide real hits.
 */
export function isTestRun(
  value: string | null,
  production: boolean = IS_PRODUCTION_HOST,
  secret: string | undefined = process.env.TEST_RUN_SECRET,
): boolean {
  if (value === null) return false
  if (!production) return value === '1'
  return Boolean(secret) && value === secret
}

export function bookingHref(source = 'cta'): string {
  switch (site.booking.mode) {
    case 'deeplink':
      return `${OUTBOUND_BOOKING_PATH}?fra=${encodeURIComponent(source)}`
    case 'native':
      return pathOf(BOOKING_ROUTE)
  }
}

/** The booking information page (price, what happens, henvisning). */
export const bookingPagePath = pathOf(BOOKING_ROUTE)

export function bookingProviderUrl(): string | null {
  return site.booking.mode === 'deeplink' ? site.booking.deeplinkUrl : null
}

export const bookingIsExternal = site.booking.mode === 'deeplink'
