/*
 * Structured-data builders: Person + WebSite + WebPage on every page,
 * BreadcrumbList on every inner page, FAQPage where a page shows FAQs. One place for every
 * schema.org object so the @ids stay consistent and never drift from
 * site.config.ts.
 *
 * This is Olve's personal professional site (arbeidsdokument §13): no
 * LocalBusiness or MedicalClinic of his own. Limbra Storgata is his
 * workLocation, not a business he runs or a publisher of the site.
 *
 * Compliance (helsepersonelloven § 13):
 * - no banned title wording (site.compliance.bannedWords), including jobTitle
 *   and credentials
 * - Person, not Physician, for a chiropractor
 * - no AggregateRating, no reviews
 * - unconfirmed facts ({{OLVE_BEKREFT}}) never reach the graph
 */
import { PRACTITIONER_ROUTE, type Route, pathOf } from '@/routes'
import { site } from '@/site.config'
import { BASE_URL, absUrl } from './siteUrl'

export const PERSON_ID = `${BASE_URL}/#person`
export const WEBSITE_ID = `${BASE_URL}/#website`

/** Strip {{PLACEHOLDER}} tokens so unconfirmed facts never reach the graph. */
function clean(text: string): string | undefined {
  const t = text.replace(/\{\{[A-Z_]+:[^}]*\}\}/g, '').trim()
  return t.length ? t : undefined
}

/**
 * Other pages about the same person: the addresses Olve has given
 * (practitioner.profiles) and krystallsyken.no once it is live. The preview
 * Worker of the sister site is never claimed as his.
 */
function sameAs(): string[] {
  const sister = site.sister.krystallsyken.url
  const live = !new URL(sister).host.endsWith('.workers.dev')
  return [...site.practitioner.profiles, ...(live ? [sister] : [])]
}

export function personSchema() {
  const p = site.practitioner
  const { latitude, longitude } = site.location.geo
  const links = sameAs()
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: p.name,
    jobTitle: p.title,
    description: p.titleLong,
    url: absUrl(pathOf(PRACTITIONER_ROUTE)),
    workLocation: {
      '@type': 'Place',
      name: `${site.brand.clinicName}, ${site.contact.address.city}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.contact.address.street,
        addressLocality: site.contact.address.city,
        postalCode: site.contact.address.postalCode,
        addressCountry: 'NO',
      },
      geo: { '@type': 'GeoCoordinates', latitude, longitude },
    },
    // where he practises. Person has no areaServed, and the site claims no
    // wider area until Olve has worded it (travel from Oslo and Romerike)
    hasOccupation: {
      '@type': 'Occupation',
      name: p.title,
      occupationLocation: {
        '@type': 'City',
        name: site.location.city,
        containedInPlace: { '@type': 'Country', name: 'Norge' },
      },
    },
    knowsAbout: p.topics,
    knowsLanguage: 'nb',
    ...(links.length ? { sameAs: links } : {}),
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Autorisasjon (HPR)',
      identifier: p.hprId,
    },
    ...(p.portrait.src ? { image: absUrl(p.portrait.src) } : {}),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: site.brand.name,
    url: BASE_URL,
    inLanguage: 'nb-NO',
    // a personal site: the person is the publisher, not a clinic
    publisher: { '@id': PERSON_ID },
    about: { '@id': PERSON_ID },
  }
}

/**
 * The page itself: what it is, who wrote it and when its text last changed.
 * The page about Olve is a ProfilePage with him as its main entity. Plain
 * WebPage elsewhere, not MedicalWebPage: that type carries reviewedBy and
 * lastReviewed, and no scheduled professional review exists yet.
 */
export function webPageSchema(route: Route, updated: string) {
  const path = pathOf(route)
  const isProfile = route.slug === PRACTITIONER_ROUTE.slug
  return {
    '@context': 'https://schema.org',
    '@type': isProfile ? 'ProfilePage' : 'WebPage',
    '@id': `${absUrl(path)}#webpage`,
    url: absUrl(path),
    name: route.title,
    description: route.description,
    inLanguage: 'nb-NO',
    isPartOf: { '@id': WEBSITE_ID },
    author: { '@id': PERSON_ID },
    dateModified: updated,
    ...(isProfile || route.slug === '' ? { mainEntity: { '@id': PERSON_ID } } : {}),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  }
}

/** FAQPage built from the SAME array the visible accordion renders. */
export function faqSchema(faqs: { question: string; answer: string }[], path?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(path ? { '@id': `${absUrl(path)}#faq` } : {}),
    // an answer that still carries an unconfirmed fact stays out of the graph whole:
    // cleaning the token out would leave a broken sentence
    mainEntity: faqs
      .filter((faq) => clean(faq.question) === faq.question && clean(faq.answer) === faq.answer)
      .map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
  }
}
