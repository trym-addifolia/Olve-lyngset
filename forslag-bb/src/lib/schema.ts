import { PAGES } from '@content/pages'
import { CONTENT_UPDATED, PHOTOS, SCHEMA_TEXT, SITE } from '@content/site'
import type { Page } from '@content/types'
import { fact, plain, plainOrNull, resolve } from './facts'
import { SITE_URL, pathOf } from './site-url'

type Json = Record<string, unknown>
const id = (frag: string) => `${SITE_URL}/#${frag}`

function address(): Json | undefined {
  const street = fact('gateadresse')
  if (!street) return undefined
  return {
    '@type': 'PostalAddress',
    streetAddress: street,
    postalCode: fact('postnummer') ?? undefined,
    addressLocality: fact('by') ?? undefined,
    addressCountry: SCHEMA_TEXT.country,
  }
}

/**
 * Site-wide graph: the site, the practitioner, and the clinic he works at (workLocation, not his own
 * business). No Physician or own-practice node: the source document says not to claim one.
 */
export function siteGraph(): Json[] {
  const name = plain(SITE.brand)
  const nodes: Json[] = [
    {
      '@type': 'WebSite',
      '@id': id('website'),
      url: `${SITE_URL}/`,
      name,
      inLanguage: SITE.lang,
      publisher: { '@id': id('person') },
      about: { '@id': id('person') },
    },
    {
      '@type': 'Person',
      '@id': id('person'),
      name,
      jobTitle: fact('tittel_linje') ?? fact('profesjon') ?? undefined,
      url: `${SITE_URL}${pathOf(PAGES.find((p) => p.schema === 'about')?.slug ?? '')}`,
      image: `${SITE_URL}${PHOTOS.portrett.src}`,
      workLocation: { '@id': id('klinikk') },
      knowsLanguage: SITE.lang,
      knowsAbout: [...SCHEMA_TEXT.knowsAbout],
      hasOccupation: {
        '@type': 'Occupation',
        name: fact('profesjon') ?? undefined,
        occupationLocation: { '@type': 'City', name: fact('by') ?? undefined },
      },
      ...(fact('hpr_nummer')
        ? {
            hasCredential: {
              '@type': 'EducationalOccupationalCredential',
              credentialCategory: SCHEMA_TEXT.hprCategory,
              recognizedBy: { '@type': 'GovernmentOrganization', name: SCHEMA_TEXT.hprIssuer },
              identifier: fact('hpr_nummer'),
            },
          }
        : {}),
      ...(fact('nkf_medlem')
        ? { memberOf: { '@type': 'Organization', name: SCHEMA_TEXT.memberOf } }
        : {}),
    },
    {
      '@type': 'MedicalClinic',
      '@id': id('klinikk'),
      name: fact('klinikk_navn') ?? undefined,
      address: address(),
    },
  ]
  return nodes
}

export function pageGraph(page: Page): Json[] {
  const url = `${SITE_URL}${pathOf(page.slug)}`
  const nodes: Json[] = []
  const crumbs: { name: string; url: string }[] = [
    { name: SITE.breadcrumbHome, url: `${SITE_URL}/` },
  ]
  // every ancestor that is a page of its own (a/b gives a, then a/b)
  const parts = page.slug ? page.slug.split('/') : []
  parts.forEach((_, i) => {
    const slug = parts.slice(0, i + 1).join('/')
    const p = PAGES.find((x) => x.slug === slug)
    if (p) crumbs.push({ name: p.navLabel, url: `${SITE_URL}${pathOf(slug)}` })
  })
  nodes.push({
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  })
  const base: Json = {
    '@id': `${url}#side`,
    url,
    name: page.title,
    description: plain(page.description),
    inLanguage: SITE.lang,
    isPartOf: { '@id': id('website') },
    author: { '@id': id('person') },
    dateModified: CONTENT_UPDATED,
  }
  if (page.schema === 'condition') {
    nodes.push({
      '@type': 'MedicalWebPage',
      ...base,
      about: (page.conditions ?? []).map((c) => ({
        '@type': 'MedicalCondition',
        name: c.name,
        ...(c.alternateName ? { alternateName: c.alternateName } : {}),
        ...(c.anchor ? { url: `${url}#${c.anchor}` } : {}),
      })),
    })
  } else {
    const type =
      page.schema === 'about'
        ? 'ProfilePage'
        : page.schema === 'contact'
          ? 'ContactPage'
          : 'WebPage'
    nodes.push({
      '@type': type,
      ...base,
      ...(page.schema === 'about' ? { mainEntity: { '@id': id('person') } } : {}),
    })
  }
  const faqs = (page.faqs ?? [])
    .map((f) => ({
      q: f.question,
      a: f.answer
        .map((t) => resolve(t))
        .filter((r) => !r.open.length)
        .map((r) => r.text)
        .join(' '),
    }))
    .filter((f) => f.a)
  if (faqs.length) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#sporsmal`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }
  return nodes
}

export function graph(page: Page) {
  return { '@context': 'https://schema.org', '@graph': [...siteGraph(), ...pageGraph(page)] }
}

export const allPages = PAGES
export { plainOrNull }
