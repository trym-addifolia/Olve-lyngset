import { type NextRequest, NextResponse } from 'next/server'
import { bookingInfoPath, bookingProviderUrl, bookingSource, isTestRun } from '@/lib/booking'
import { BOT, deviceOf, tally } from '@/lib/tally'

export const dynamic = 'force-dynamic'

/*
 * Outbound booking click. Every «Bestill time» button points here so the click
 * is counted on the server (not only in the browser), then 302s to the
 * provider calendar. The tally row (D1 booking_clicks) carries: source label
 * (only the site's own labels, else «annet»), device class, test_run flag.
 * No IP, no user agent string, no cookie, no identifier.
 */
export async function GET(request: NextRequest) {
  const target = bookingProviderUrl()
  if (!target) return NextResponse.redirect(new URL(bookingInfoPath, request.url), 302)

  const ua = request.headers.get('user-agent') ?? ''
  if (ua && !BOT.test(ua)) {
    tally('booking_clicks', {
      kilde: bookingSource(request.nextUrl.searchParams.get('fra')),
      enhet: deviceOf(ua),
      test_run: isTestRun(request.nextUrl.searchParams.get('test_run')),
    })
  }

  return NextResponse.redirect(target, { status: 302, headers: { 'Cache-Control': 'no-store' } })
}
