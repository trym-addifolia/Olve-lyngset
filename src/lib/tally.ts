import { getCloudflareContext } from '@opennextjs/cloudflare'

/*
 * Anonymous tallies in D1 (binding DB, migrations/). Counts, never follows:
 * no IP, no user agent string, no cookie, no identifier. The insert runs
 * after the response (waitUntil), and a lost tally mark never costs a visitor
 * anything.
 */

export const BOT =
  /bot|crawl|spider|slurp|preview|monitor|headless|curl|wget|lighthouse|python-requests|axios|node-fetch|uptime/i

export function deviceOf(ua: string): 'mobil' | 'desktop' {
  return /mobi|android|iphone|ipad/i.test(ua) ? 'mobil' : 'desktop'
}

type Tables = {
  site_hits: { sti: string; kilde: string; enhet: string; annonseklikk: boolean; test_run: boolean }
  booking_clicks: { kilde: string; enhet: string; test_run: boolean }
}

export function tally<T extends keyof Tables>(table: T, row: Tables[T]): void {
  try {
    const { env, ctx } = getCloudflareContext()
    const cols = Object.keys(row) as (keyof Tables[T] & string)[]
    const values = cols.map((c) => {
      const v = row[c]
      return typeof v === 'boolean' ? Number(v) : v
    })
    const sql = `INSERT INTO ${table} (${cols.join(', ')}) VALUES (${cols.map(() => '?').join(', ')})`
    ctx.waitUntil(
      env.DB.prepare(sql)
        .bind(...values)
        .run()
        .catch(() => undefined),
    )
  } catch {
    // no Cloudflare context (plain `next start`): nothing to count into
  }
}
