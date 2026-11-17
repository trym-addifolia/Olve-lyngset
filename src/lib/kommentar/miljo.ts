import { getCloudflareContext } from '@opennextjs/cloudflare'
import { ALLOW_INDEX } from '@/lib/siteUrl'

export type KommentarMiljo = { nokkel: string; token: string; repo: string }

type Hemmeligheter = Partial<
  Record<'KOMMENTAR_NOKKEL' | 'GITHUB_KOMMENTAR_TOKEN' | 'GITHUB_KOMMENTAR_REPO', string>
>

/** Null means comment mode is off: production host, or no secret on this Worker. */
export function kommentarMiljo(): KommentarMiljo | null {
  if (ALLOW_INDEX) return null
  try {
    const env = getCloudflareContext().env as CloudflareEnv & Hemmeligheter
    if (!env.KOMMENTAR_NOKKEL) return null
    return {
      nokkel: env.KOMMENTAR_NOKKEL,
      token: env.GITHUB_KOMMENTAR_TOKEN ?? '',
      repo: env.GITHUB_KOMMENTAR_REPO ?? '',
    }
  } catch {
    return null
  }
}
