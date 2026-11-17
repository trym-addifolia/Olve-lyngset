import { site } from '@/site.config'

// per-site prefix (site.brand.cookiePrefix) so krystallsyken.no and this site never collide
export const KOMMENTAR_COOKIE = `${site.brand.cookiePrefix}_kommentar`
/** Readable by the browser only to show the toolbar; grants nothing on its own. */
export const KOMMENTAR_UI_COOKIE = `${site.brand.cookiePrefix}_kommentar_ui`
export const KOMMENTAR_PARAM = 'kommenter'
export const KOMMENTAR_MAKS_ALDER = 90 * 24 * 60 * 60

export function likeStrenger(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let forskjell = 0
  for (let i = 0; i < a.length; i++) forskjell |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return forskjell === 0
}

export async function cookieVerdi(nokkel: string): Promise<string> {
  const data = new TextEncoder().encode(`olvelyngset-kommentar:${nokkel}`)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, '0')).join('')
}

export async function harTilgang(
  cookie: string | undefined,
  nokkel: string | undefined,
): Promise<boolean> {
  if (!cookie || !nokkel) return false
  return likeStrenger(cookie, await cookieVerdi(nokkel))
}
