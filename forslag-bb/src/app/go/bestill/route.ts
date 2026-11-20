import { PAGES } from '@content/pages'
import { fact } from '@/lib/facts'

/*
 * Booking click counter: logs one line per click (page it came from, no personal data, no cookie)
 * and redirects to the confirmed booking link. Count with the host's request logs:
 *   vercel logs <deployment> | grep booking_click
 * Unknown sources are stored as «annet», so the tally cannot be filled with made-up values.
 */
export const dynamic = 'force-dynamic'

const SOURCES = new Set(['meny', 'bunnlinje', ...PAGES.map((p) => p.slug || 'forside')])

export function GET(req: Request) {
  const target = fact('booking_lenke')
  if (!target) return new Response(null, { status: 307, headers: { location: '/kontakt/' } })
  const raw = new URL(req.url).searchParams.get('fra') ?? ''
  const fra = SOURCES.has(raw) ? raw : 'annet'
  // crawlers, link previews and monitors are not clicks
  const ua = req.headers.get('user-agent') ?? ''
  if (ua && !/bot|crawl|spider|slurp|preview|monitor|lighthouse/i.test(ua))
    console.log(JSON.stringify({ event: 'booking_click', fra, t: new Date().toISOString() }))
  return new Response(null, {
    status: 302,
    headers: { location: target, 'cache-control': 'no-store', 'x-robots-tag': 'noindex' },
  })
}
