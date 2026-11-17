import { CONTENT } from '@content/index'
import { describe, expect, it } from 'vitest'
import {
  HOME_B,
  KNOWN_SLUGS,
  PUBLIC_ROUTES,
  ROUTES,
  SAFETY_HREF,
  crumbsOf,
  encodePath,
  pathOf,
  routeBySlug,
} from '@/routes'

/** The content kind each template renders (src/app/[...slug]/page.tsx). */
const KIND_OF_TEMPLATE = {
  home: 'home',
  'home-b': 'home',
  info: 'info',
  hub: 'hub',
  landing: 'landing',
  practitioner: 'practitioner',
  contact: 'contact',
  privacy: 'privacy',
} as const

describe('route registry', () => {
  it.each(ROUTES.map((r) => [r.slug || '(home)', r] as const))(
    '%s has content of the kind its template renders',
    (_, route) => {
      expect(CONTENT[route.slug]?.kind).toBe(KIND_OF_TEMPLATE[route.template])
    },
  )

  it('has no content without a route', () => {
    const slugs = new Set(ROUTES.map((r) => r.slug))
    expect(Object.keys(CONTENT).filter((s) => !slugs.has(s))).toEqual([])
  })

  it('keeps direction B out of everything public', () => {
    expect(HOME_B.hidden).toBe(true)
    expect(HOME_B.nav).toEqual([])
    expect(PUBLIC_ROUTES).not.toContain(HOME_B)
    expect(HOME_B.title.startsWith('[Forhåndsvisning B]')).toBe(true)
  })

  it('resolves nested slugs, encoded or not', () => {
    expect(routeBySlug('svimmelhet/krystallsyke')?.navLabel).toBe('Krystallsyke')
    expect(routeBySlug('undersokelse')?.slug).toBe('undersokelse')
    expect(routeBySlug('symptomer')).toBeUndefined()
    expect(KNOWN_SLUGS.has('svimmelhet/krystallsyke')).toBe(true)
  })

  it('builds the breadcrumb trail through the parent page', () => {
    const krystallsyke = routeBySlug('svimmelhet/krystallsyke')
    if (!krystallsyke) throw new Error('missing route')
    expect(crumbsOf(krystallsyke).map((c) => c.path)).toEqual([
      '/',
      '/svimmelhet',
      '/svimmelhet/krystallsyke',
    ])
    expect(encodePath(krystallsyke)).toBe('/svimmelhet/krystallsyke')
  })
})

/** Every internal link target in a content tree: each `href` value and each `related` slug. */
function linksIn(value: unknown, path: string): { at: string; href: string }[] {
  if (Array.isArray(value)) return value.flatMap((v, i) => linksIn(v, `${path}[${i}]`))
  if (!value || typeof value !== 'object') return []
  return Object.entries(value).flatMap(([k, v]) => {
    const at = `${path}.${k}`
    if (k === 'href' && typeof v === 'string') return [{ at, href: v }]
    if (k === 'related' && Array.isArray(v)) {
      return v.map((slug, i) => ({ at: `${at}[${i}]`, href: `/${slug}` }))
    }
    return linksIn(v, at)
  })
}

/** The anchors a page renders: its section ids, #akutt on a safety page, #faq with FAQs. */
function anchorsOf(slug: string): Set<string> {
  const c = CONTENT[slug] as Record<string, unknown> | undefined
  const ids = new Set<string>()
  if (!c) return ids
  for (const s of (c.sections as { id: string }[] | undefined) ?? []) ids.add(s.id)
  if (c.safety) ids.add('akutt')
  if (Array.isArray(c.faqs) && c.faqs.length > 0) ids.add('faq')
  return ids
}

const PATHS = new Set(ROUTES.map(pathOf))

describe('internal links', () => {
  const links = [
    ...Object.entries(CONTENT).flatMap(([slug, c]) => linksIn(c, slug || '(home)')),
    ...ROUTES.flatMap((r) =>
      r.heroCta?.secondary ? [{ at: `route ${r.slug}`, href: r.heroCta.secondary.href }] : [],
    ),
    { at: 'SAFETY_HREF', href: SAFETY_HREF },
  ].filter((l) => l.href.startsWith('/'))

  it('finds the links in content, home included', () => {
    expect(links.some((l) => l.at.startsWith('(home).doors'))).toBe(true)
    expect(links.some((l) => l.at.includes('.entries'))).toBe(true)
    expect(links.some((l) => l.at.includes('.related'))).toBe(true)
  })

  it.each(links.map((l) => [l.at, l.href] as const))('%s -> %s resolves', (_, href) => {
    const [pathPart, anchor] = href.split('#')
    const path = pathPart.split('?')[0]
    expect(PATHS.has(path), `no route for ${path}`).toBe(true)
    if (anchor !== undefined) {
      const slug = path.replace(/^\//, '')
      expect(anchorsOf(slug).has(anchor), `no #${anchor} on ${path}`).toBe(true)
    }
  })
})
