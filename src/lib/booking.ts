/*
 * One bookingHref() for every «Bestill time» on the site.
 *
 * In deeplink mode the href points at the local outbound route
 * (/go/bestill, alias /api/booking-klikk) which logs the click server-side and
 * 302s to the Limbra calendar (Solvit). Native mode is reserved for a proven
 * provider API (none for Solvit yet).
 */
import { IS_PRODUCTION_HOST } from '@/lib/siteUrl'
import { CONTACT_ROUTE, ROUTES, pathOf } from '@/routes'
import { site } from '@/site.config'

/** The outbound click route. /api/booking-klikk is an alias of the same handler. */
export const OUTBOUND_BOOKING_PATH = '/go/bestill'

/*
 * Every `fra` value the site's own buttons send. The click route stores only
 * these; anything else is counted as «annet», so nobody can fill the tally
 * with made-up sources. Keep in step with the bookingHref() call sites:
 * fixed labels, and «prefix:slug» for the per-page buttons (nested slugs
 * keep their «/»).
 */
const FIXED_SOURCES = ['cta', 'meny', 'sticky-mobil', 'kontakt:intent'] as const
const PAGE_PREFIXES = ['hero', 'cta', 'kort'] as const

export const BOOKING_SOURCES: ReadonlySet<string> = new Set<string>([
  ...FIXED_SOURCES,
  ...ROUTES.flatMap((r) => PAGE_PREFIXES.map((p) => `${p}:${r.slug || 'forside'}`)),
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
      return bookingInfoPath
  }
}

/** Where booking is explained (the contact page): the fallback when there is no calendar link. */
export const bookingInfoPath = pathOf(CONTACT_ROUTE)

export function bookingProviderUrl(): string | null {
  return site.booking.mode === 'deeplink' ? site.booking.deeplinkUrl : null
}
