import type { Block, Page } from '@content/types'
import { resolve } from './facts'

/** a stable anchor id from a heading */
export const slugId = (s: string) =>
  s
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .replace(/[éè]/g, 'e')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const shows = (texts: string[], draft: boolean) =>
  texts.some((t) => draft || resolve(t).open.length === 0)

/** the id a block renders with, or null when it has no heading of its own */
export function blockId(b: Block): string | null {
  if ('id' in b && b.id) return b.id
  if (b.kind === 'faq') return 'sporsmal'
  if (b.kind === 'emergency') return 'akutt'
  if ('heading' in b && typeof b.heading === 'string') return slugId(b.heading)
  return null
}

/** the H2 sections a reader can jump to (rail index), in page order */
export function sections(page: Page, draft: boolean, faqHeading: string) {
  const out: { id: string; heading: string }[] = []
  for (const b of page.blocks) {
    if (b.kind === 'faq') {
      if (page.faqs?.some((f) => shows(f.answer, draft)))
        out.push({ id: 'sporsmal', heading: faqHeading })
      continue
    }
    if (b.kind === 'emergency' || b.kind === 'entries') continue
    if (b.kind === 'text' && !shows([...b.body, ...(b.list ?? [])], draft)) continue
    if (
      b.kind === 'rows' &&
      !shows(
        b.rows.map((r) => r.value),
        draft,
      )
    )
      continue
    const id = blockId(b)
    if (id && 'heading' in b) out.push({ id, heading: b.heading })
  }
  return out
}
