import { CONTENT } from '@content/index'
import { describe, expect, it } from 'vitest'
import {
  HOME_B,
  KNOWN_SLUGS,
  PUBLIC_ROUTES,
  ROUTES,
  crumbsOf,
  encodePath,
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
