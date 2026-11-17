/*
 * Structured-data builders. One place for every schema.org object so the
 * clinic entity (@id) and the practitioner (@id) stay consistent and can
 * never drift from site.config.ts.
 *
 * Compliance (helsepersonelloven § 13):
 * - no "spesialist" wording anywhere, including jobTitle and credentials
 * - Person, not Physician, for a chiropractor
 * - no AggregateRating from curated statements
 * - prices only through the visible price table, never priceRange here
 */
import { PRACTITIONER_ROUTE, pathOf } from '@/routes'
import { site } from '@/site.config'
import { openingHoursSpecification } from './hours'
import { BASE_URL, absUrl } from './siteUrl'

export const CLINIC_ID = `${BASE_URL}/#clinic`
export const PERSON_ID = `${BASE_URL}/#practitioner`
export const WEBSITE_ID = `${BASE_URL}/#website`

/** Strip {{PLACEHOLDER}} tokens so unconfirmed facts never reach the graph. */
function clean(text: string): string | undefined {
  const t = text.replace(/\{\{[A-Z_]+:[^}]*\}\}/g, '').trim()
  return t.length ? t : undefined
}

export function clinicSchema() {
  const hours = openingHoursSpecification()
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': CLINIC_ID,
    // the practitioner's practice at the host clinic, not the host clinic itself
    name: `${site.practitioner.name}, ${site.practitioner.title.toLowerCase()}`,
    alternateName: site.brand.name,
    parentOrganization: { '@type': 'Organization', name: site.brand.clinicName },
    description: site.brand.description,
    url: BASE_URL,
    telephone: site.contact.phone.e164,
    medicalSpecialty: 'Chiropractic',
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
    ...(hours ? { openingHoursSpecification: hours } : {}),
    areaServed: site.location.areaServed.map((name) => ({ '@type': 'City', name })),
    employee: { '@id': PERSON_ID },
    ...(site.practitioner.portrait.src ? { image: absUrl(site.practitioner.portrait.src) } : {}),
  }
}

export function personSchema() {
  const credential = clean(site.practitioner.hprNumber)
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.practitioner.name,
    jobTitle: site.practitioner.title,
    description: site.practitioner.titleLong,
    url: absUrl(pathOf(PRACTITIONER_ROUTE)),
    worksFor: { '@id': CLINIC_ID },
    ...(credential
      ? {
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Autorisasjon (HPR)',
            identifier: credential,
          },
        }
      : {}),
    ...(site.practitioner.portrait.src ? { image: absUrl(site.practitioner.portrait.src) } : {}),
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
    publisher: { '@id': CLINIC_ID },
  }
}

export const BPPV_CONDITION = {
  name: 'Krystallsyke',
  alternateName: ['BPPV', 'Benign paroksysmal posisjonsvertigo'],
}

/** MedicalWebPage about a MedicalCondition, anchored to clinic and practitioner. */
export function medicalWebPageSchema(input: {
  path: string
  title: string
  description: string
  condition?: { name: string; alternateName?: string[] }
  hasFaq?: boolean
}) {
  const url = absUrl(input.path)
  const condition = input.condition ?? BPPV_CONDITION
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${url}#webpage`,
        url,
        name: input.title,
        description: input.description,
        inLanguage: 'nb-NO',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': `${url}#about` },
        reviewedBy: { '@id': PERSON_ID },
        ...(input.hasFaq ? { mainEntity: { '@id': `${url}#faq` } } : {}),
      },
      {
        '@type': 'MedicalCondition',
        '@id': `${url}#about`,
        name: condition.name,
        ...(condition.alternateName ? { alternateName: condition.alternateName } : {}),
      },
    ],
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

export function contactPageSchema(path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: absUrl(path),
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': CLINIC_ID },
  }
}
