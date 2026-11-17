/*
 * Structured-data builders: Person + WebSite on every page, BreadcrumbList on
 * every inner page, FAQPage where a page shows FAQs. One place for every
 * schema.org object so the @ids stay consistent and never drift from
 * site.config.ts.
 *
 * This is Olve's personal professional site (arbeidsdokument §13): no
 * LocalBusiness or MedicalClinic of his own. Limbra Storgata is his
 * workLocation, not a business he runs or a publisher of the site.
 *
 * Compliance (helsepersonelloven § 13):
 * - no "spesialist" wording anywhere, including jobTitle and credentials
 * - Person, not Physician, for a chiropractor
 * - no AggregateRating, no reviews
 * - unconfirmed facts ({{OLVE_BEKREFT}}) never reach the graph
 */
import { PRACTITIONER_ROUTE, pathOf } from '@/routes'
import { site } from '@/site.config'
import { BASE_URL, absUrl } from './siteUrl'

export const PERSON_ID = `${BASE_URL}/#person`
export const WEBSITE_ID = `${BASE_URL}/#website`

/** Strip {{PLACEHOLDER}} tokens so unconfirmed facts never reach the graph. */
function clean(text: string): string | undefined {
  const t = text.replace(/\{\{[A-Z_]+:[^}]*\}\}/g, '').trim()
  return t.length ? t : undefined
}

export function personSchema() {
  const p = site.practitioner
  const credential = clean(p.hprNumber)
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
      geo: {
        '@type': 'GeoCoordinates',
        latitude: site.location.geo.latitude,
        longitude: site.location.geo.longitude,
      },
    },
    ...(credential
      ? {
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Autorisasjon (HPR)',
            identifier: credential,
          },
        }
      : {}),
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
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}
