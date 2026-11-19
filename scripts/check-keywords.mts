/*
 * Keyword gate: the head keyword appears in the title, H1 or kicker, and in the first
 * lede paragraph or the meta description; every long-tail appears in an H2/H3, a list
 * item or an FAQ question on its page. Match by phrase, joined form, or every token by
 * a five-letter stem (Norwegian inflections). Facts are resolved before matching.
 *   npx tsx scripts/check-keywords.mts
 */
import facts from '../content/facts.json'
import { KEYWORDS } from '../content/keywords.generated'
import { PAGES } from '../content/pages'
import type { Block, Page } from '../content/types'

const F = facts as Record<string, { value: string }>
const fill = (s: string) =>
  s.replace(/\{\{(fakta|bekreft):([a-z0-9_]+)\}\}/g, (_m, k, key) =>
    k === 'fakta' ? (F[key]?.value ?? '') : '',
  )
const norm = (s: string) =>
  fill(s)
    .toLowerCase()
    .replace(/[^a-z0-9æøåéè\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
const tokens = (s: string) =>
  norm(s)
    .split(/[\s-]+/)
    .filter((t) => t.length >= 3)
const stems = (s: string) => new Set(tokens(s).map((t) => t.slice(0, 5)))
function matches(kw: string, text: string) {
  const n = norm(text)
  const k = norm(kw)
  if (n.includes(k) || n.replace(/\s/g, '').includes(k.replace(/\s/g, ''))) return true
  const have = stems(text)
  const need = tokens(kw).map((t) => t.slice(0, 5))
  return need.length > 0 && need.every((t) => have.has(t))
}
function headings(p: Page): string[] {
  const out: string[] = [p.h1]
  const add = (b: Block) => {
    if ('heading' in b && typeof b.heading === 'string') out.push(b.heading)
    if (b.kind === 'entries') for (const it of b.items) out.push(it.heading)
    if (b.kind === 'conditions') for (const it of b.items) out.push(it.name)
    if (b.kind === 'text' && b.list) out.push(...b.list)
  }
  p.blocks.forEach(add)
  for (const f of p.faqs ?? []) out.push(f.question)
  return out
}

let fails = 0
for (const [path, kw] of Object.entries(KEYWORDS)) {
  const slug = path === '/' ? '' : path.replace(/^\/|\/$/g, '')
  const p = PAGES.find((x) => x.slug === slug)
  if (!p) {
    console.log(`  ${path}: page missing`)
    fails++
    continue
  }
  const top = [p.title, p.h1, p.kicker ?? ''].join(' | ')
  if (!matches(kw.head, top)) {
    console.log(`  ${path}: head «${kw.head}» not in title/H1/kicker`)
    fails++
  }
  if (!matches(kw.head, p.lede[0] ?? '') && !matches(kw.head, p.description)) {
    console.log(`  ${path}: head «${kw.head}» not in first paragraph or description`)
    fails++
  }
  const hs = headings(p)
  for (const t of kw.tails)
    if (!hs.some((h) => matches(t, h))) {
      console.log(`  ${path}: long-tail «${t}» not in a heading, list item or FAQ`)
      fails++
    }
}
const titles = PAGES.map((p) => p.title)
const dup = titles.filter((t, i) => titles.indexOf(t) !== i)
if (dup.length) {
  console.log(`  duplicate titles: ${dup.join(', ')}`)
  fails++
}
console.log(
  fails
    ? `keywords: FAIL (${fails})`
    : `keywords: OK (${Object.keys(KEYWORDS).length} pages, unique titles)`,
)
process.exit(fails ? 1 : 0)
