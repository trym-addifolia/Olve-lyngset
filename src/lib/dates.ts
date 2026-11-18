const MONTHS = [
  'januar',
  'februar',
  'mars',
  'april',
  'mai',
  'juni',
  'juli',
  'august',
  'september',
  'oktober',
  'november',
  'desember',
] as const

/**
 * «17. november 2026» from an ISO date (YYYY-MM-DD). Written out by hand: the
 * date is a plain calendar day, so no time zone and no Intl locale data (which
 * differs between Node and the Workers runtime) may touch it.
 */
export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  const month = m ? MONTHS[Number(m[2]) - 1] : undefined
  if (!m || !month) throw new Error(`not an ISO date: ${iso}`)
  return `${Number(m[3])}. ${month} ${m[1]}`
}
