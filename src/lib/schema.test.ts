import { CONTENT } from '@content/index'
import { describe, expect, it } from 'vitest'
import { HOME, PRACTITIONER_ROUTE, ROUTES } from '@/routes'
import { site } from '@/site.config'
import { formatDate } from './dates'
import { PERSON_ID, personSchema, webPageSchema } from './schema'

describe('formatDate', () => {
  it('writes an ISO date as a Norwegian calendar day', () => {
    expect(formatDate('2026-11-17')).toBe('17. november 2026')
    expect(formatDate('2027-03-01')).toBe('1. mars 2027')
  })

  it('rejects anything that is not YYYY-MM-DD', () => {
    expect(() => formatDate('17.11.2026')).toThrow()
    expect(() => formatDate('2026-13-01')).toThrow()
  })
})

describe('page dates', () => {
  it.each(ROUTES.map((r) => [r.slug || '(home)', r.slug] as const))(
    '%s has a real ISO date that is not in the future',
    (_, slug) => {
      const { updated } = CONTENT[slug]
      expect(updated).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(new Date(updated).toISOString().slice(0, 10)).toBe(updated)
      expect(new Date(updated).getTime()).toBeLessThanOrEqual(Date.now())
    },
  )
})

describe('personSchema', () => {
  const person = personSchema()

  it('names the topics and where he practises', () => {
    expect(person.knowsAbout).toEqual(site.practitioner.topics)
    expect(person.hasOccupation.occupationLocation.name).toBe('Lillestrøm')
    expect(person.workLocation.geo.latitude).toBeCloseTo(59.957, 3)
    expect(person.workLocation.geo.longitude).toBeCloseTo(11.049, 3)
  })

  it('keeps unconfirmed facts and banned words out of the graph', () => {
    const json = JSON.stringify(person).toLowerCase()
    expect(json).not.toContain('{{')
    for (const word of site.compliance.bannedWords) expect(json).not.toContain(word)
  })

  it('never claims a preview address as his own', () => {
    expect(JSON.stringify(person)).not.toContain('workers.dev')
  })
})

describe('webPageSchema', () => {
  it('carries the author and the date of the text', () => {
    const page = webPageSchema(HOME, '2026-11-17')
    expect(page['@type']).toBe('WebPage')
    expect(page.author).toEqual({ '@id': PERSON_ID })
    expect(page.dateModified).toBe('2026-11-17')
    expect(page.mainEntity).toEqual({ '@id': PERSON_ID })
  })

  it('makes the page about Olve a ProfilePage', () => {
    const page = webPageSchema(PRACTITIONER_ROUTE, '2026-11-17')
    expect(page['@type']).toBe('ProfilePage')
    expect(page.mainEntity).toEqual({ '@id': PERSON_ID })
  })

  it('gives an article page no main entity', () => {
    const svimmelhet = ROUTES.find((r) => r.slug === 'svimmelhet')
    if (!svimmelhet) throw new Error('missing route')
    expect(webPageSchema(svimmelhet, '2026-11-17')).not.toHaveProperty('mainEntity')
  })
})
