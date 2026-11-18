import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { isTestRun } from '@/lib/booking'
import { kommentarMiljo } from '@/lib/kommentar/miljo'
import {
  KOMMENTAR_COOKIE,
  KOMMENTAR_MAKS_ALDER,
  KOMMENTAR_PARAM,
  KOMMENTAR_UI_COOKIE,
  cookieVerdi,
  likeStrenger,
} from '@/lib/kommentar/tilgang'
import { ALLOW_INDEX } from '@/lib/siteUrl'
import { BOT, deviceOf, tally } from '@/lib/tally'
import { HIDDEN_PATHS, KNOWN_SLUGS } from '@/routes'

/*
 * Middleware: anonymous page tally (D1 site_hits, lib/tally.ts).
 * Counts, never follows: path collapsed to a known slug (nested paths keep
 * their «/», e.g. svimmelhet/krystallsyke), channel word,
 * mobil/desktop. No IP, no user-agent string, no cookie, no query string.
 */

function normalisePath(pathname: string): string {
  let decoded = pathname
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    // keep raw
  }
  const trimmed = decoded.replace(/^\/+|\/+$/g, '').toLowerCase()
  if (trimmed === '') return 'forside'
  return KNOWN_SLUGS.has(trimmed) ? trimmed : 'annet'
}

function channel(referer: string | null, host: string): string {
  if (!referer) return 'direkte'
  try {
    const h = new URL(referer).hostname.toLowerCase()
    if (h === host) return 'intern'
    if (h.includes('google.')) return 'google'
    if (h.includes('bing.')) return 'bing'
    if (h.includes('facebook.') || h.includes('instagram.')) return 'facebook'
    return 'annet'
  } catch {
    return 'annet'
  }
}

/** ?kommenter=<secret>: the right secret sets the comment cookies; any value is stripped from the URL. */
async function aktiverKommentarer(request: NextRequest, kode: string): Promise<NextResponse> {
  const url = request.nextUrl.clone()
  url.searchParams.delete(KOMMENTAR_PARAM)
  const response = NextResponse.redirect(url, 302)
  response.headers.set('Cache-Control', 'no-store')
  const miljo = kommentarMiljo()
  if (miljo && likeStrenger(kode, miljo.nokkel)) {
    const felles = {
      secure: true,
      sameSite: 'lax' as const,
      maxAge: KOMMENTAR_MAKS_ALDER,
      path: '/',
    }
    response.cookies.set(KOMMENTAR_COOKIE, await cookieVerdi(miljo.nokkel), {
      ...felles,
      httpOnly: true,
    })
    response.cookies.set(KOMMENTAR_UI_COOKIE, '1', { ...felles, httpOnly: false })
  }
  return response
}

export async function middleware(request: NextRequest) {
  const kode = request.nextUrl.searchParams.get(KOMMENTAR_PARAM)
  if (kode !== null) return aktiverKommentarer(request, kode)
  const ua = request.headers.get('user-agent') ?? ''
  if (ua && !BOT.test(ua)) {
    tally('site_hits', {
      sti: normalisePath(request.nextUrl.pathname),
      kilde: channel(request.headers.get('referer'), request.nextUrl.hostname),
      enhet: deviceOf(ua),
      annonseklikk: request.nextUrl.searchParams.has('gclid'),
      test_run: isTestRun(request.nextUrl.searchParams.get('test_run')),
    })
  }
  const response = NextResponse.next()
  // noindex in the HTTP header too (meta and robots.txt already key off the same
  // switch); hidden pages carry it on the production host as well
  if (!ALLOW_INDEX || HIDDEN_PATHS.has(request.nextUrl.pathname.replace(/\/+$/, ''))) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
  return response
}

export const config = {
  matcher: ['/((?!_next/|api/|go/|favicon|.*\\.[a-zA-Z0-9]+$).*)'],
}
