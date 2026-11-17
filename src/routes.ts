/*
 * Routes registry: the single list of public URLs. It feeds the header and
 * footer navigation, the sitemap, llms.txt, the middleware slug set, the route
 * checks and the per-page title/H1 pairs, so a page can
 * never exist in one place and be missing in another.
 *
 * Titles, H1s, eyebrows and CTAs are set here; ad groups follow
 * resultater/plan/ADS-PLAN.md.
 * Slugs are ASCII since 2026-11-11 (old æøå slugs 301 here); encodePath() stays for safety when a
 * percent-encoded form is required (sitemap, llms.txt).
 */

export type Template =
  | 'home'
  | 'info'
  | 'hub'
  | 'exercise'
  | 'landing'
  | 'local'
  | 'practitioner'
  | 'booking'
  | 'faq'
  | 'contact'
  | 'privacy'

export type NavGroup = 'main' | 'fag' | 'footer'

export type Route = {
  /** URL segment without leading slash; '' for the home page */
  slug: string
  /** title tag (the template adds the brand suffix except on home) */
  title: string
  h1: string
  eyebrow: string
  description: string
  template: Template
  /** Google Ads group (ADS-PLAN.md); undefined = organic only */
  adGroup?: string
  /** pages that must never receive ads (safety intent) */
  noAds?: boolean
  nav: NavGroup[]
  /** short label for menus and cards */
  navLabel: string
  /**
   * Hero buttons. Undefined = «Book en time» only. booking:false hides the
   * booking button; secondary adds a second link. Both false/undefined = no
   * buttons in the hero.
   */
  heroCta?: { booking: boolean; secondary?: { label: string; href: string } }
  /** topic for «Vanlige spørsmål om ...» when navLabel is not good bokmål there */
  faqTopic?: string
  /** head keywords from resultater/sokeord/keyword-map.csv target_url */
  keywords: string[]
  priority: number
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
  /** slug existed on the old site and ranks; keep forever */
  legacy: boolean
}

export const ROUTES: readonly Route[] = [
  {
    slug: '',
    title: 'Krystallsyke (BPPV) i Lillestrøm | Kiropraktor Olve Lyngset',
    h1: 'Er det krystaller, og på hvilken side? Det finner jeg ut.',
    eyebrow: 'Krystallsyke i Lillestrøm · Olve Lyngset, kiropraktor',
    description:
      'Krystallsyke (BPPV) undersøkes og behandles av kiropraktor Olve Lyngset i Lillestrøm. Nettbooking, videobriller og en tydelig plan for første time.',
    template: 'home',
    adGroup: 'AG1',
    nav: ['main'],
    navLabel: 'Hjem',
    keywords: ['krystallsyke', 'krystallsyken', 'bppv'],
    priority: 1.0,
    changeFrequency: 'monthly',
    legacy: true,
  },
  {
    slug: 'hva-er-krystallsyken',
    title: 'Hva er krystallsyke? Krystaller i øret, forklart enkelt',
    h1: 'Hva er krystallsyken?',
    eyebrow: 'Krystaller i øret',
    heroCta: { booking: true, secondary: { label: 'Les om symptomene', href: '/symptomer' } },
    description:
      'Krystallsyke (BPPV) er løse kalkkrystaller i det indre øret som gir svimmelhet når du snur hodet. Slik henger det sammen.',
    template: 'info',
    nav: ['fag'],
    navLabel: 'Hva er krystallsyken?',
    faqTopic: 'krystallsyken',
    keywords: ['hva er krystallsyke', 'krystaller i øret'],
    priority: 0.8,
    changeFrequency: 'monthly',
    legacy: true,
  },
  {
    slug: 'symptomer',
    title: 'Krystallsyke symptomer: svimmel når du snur deg i sengen',
    h1: 'Krystallsyke: symptomer når alt går rundt',
    eyebrow: 'Slik kjennes det',
    heroCta: {
      booking: true,
      secondary: { label: 'Er det farlig? Se tegnene', href: '/er-det-farlig' },
    },
    description:
      'Svimmel når du legger deg ned, snur deg i sengen eller ser opp? Dette er de vanlige symptomene på krystallsyke, og slik skiller de seg fra annen svimmelhet.',
    template: 'info',
    adGroup: 'AG5',
    nav: ['fag'],
    navLabel: 'Symptomer',
    keywords: [
      'krystallsyke symptomer',
      'svimmel når jeg legger meg ned',
      'krystallsyke og tretthet',
    ],
    priority: 0.8,
    changeFrequency: 'monthly',
    legacy: true,
  },
  {
    slug: 'arsaker',
    title: 'Krystallsyke årsak: hvorfor krystallene løsner',
    h1: 'Hvorfor får man krystallsyke?',
    eyebrow: 'Årsaker',
    description:
      'Hvorfor løsner krystallene i det indre øret? Ofte uten klar grunn; alder, slag mot hodet og sengeleie er kjente årsaker, og mange opplever at det kom i en stressperiode.',
    template: 'info',
    nav: ['fag'],
    navLabel: 'Årsaker',
    keywords: ['krystallsyke årsak', 'hvorfor får man krystallsyke', 'krystallsyke stress'],
    priority: 0.8,
    changeFrequency: 'monthly',
    legacy: true,
  },
  {
    slug: 'diagnosering',
    title: 'Nystagmus og Dix-Hallpike: slik undersøkes krystallsyke',
    h1: 'Slik finner jeg ut om det er krystallsyke',
    eyebrow: 'Nystagmus og videobriller',
    description:
      'Dix-Hallpike-testen og videobriller viser øyebevegelsene (nystagmus) som viser om det er krystallsyke, og hvilken buegang det gjelder.',
    template: 'info',
    nav: ['fag'],
    navLabel: 'Diagnosering',
    keywords: ['nystagmus', 'dix hallpikes'],
    priority: 0.8,
    changeFrequency: 'monthly',
    legacy: true,
  },
  {
    slug: 'buegangene',
    title: 'Buegang: bakre, horisontal og fremre ved krystallsyke',
    h1: 'Hvilken buegang gjelder det?',
    eyebrow: 'Buegangene',
    description:
      'Krystallene kan ligge i bakre, horisontal eller fremre buegang. Det avgjør hvilken manøver som hjelper, og hvorfor øvelser hjemme ikke alltid virker.',
    template: 'info',
    nav: ['fag'],
    navLabel: 'Buegangene',
    keywords: ['buegang', 'horisontal buegang'],
    priority: 0.7,
    changeFrequency: 'monthly',
    legacy: false,
  },
  {
    slug: 'behandling',
    title: 'Krystallsyke behandling i Lillestrøm | Olve Lyngset',
    h1: 'Krystallsyke: behandling i Lillestrøm',
    eyebrow: 'Behandling',
    description:
      'Behandling av krystallsyke etter undersøkelse med infrarøde videobriller. Først ser jeg om det er krystaller, på hvilken side og i hvilken buegang. Så velger jeg manøveren som passer. Kiropraktor Olve Lyngset, Lillestrøm.',
    template: 'landing',
    adGroup: 'AG2',
    nav: ['main'],
    navLabel: 'Behandling',
    keywords: ['krystallsyke behandling', 'trv stol', 'kiropraktor krystallsyke'],
    priority: 0.9,
    changeFrequency: 'monthly',
    legacy: true,
  },
  {
    slug: 'kommer-tilbake',
    title: 'Langvarig krystallsyke: når det ikke går over',
    h1: 'Langvarig krystallsyke som ikke går over?',
    eyebrow: 'Når det ikke går over',
    description:
      'Har du prøvd øvelser uten at svimmelheten gir seg, eller kommer den tilbake? Ofte handler det om hvilken buegang krystallene ligger i.',
    template: 'landing',
    adGroup: 'AG3',
    nav: ['fag'],
    navLabel: 'Kommer tilbake',
    faqTopic: 'langvarig krystallsyke',
    keywords: ['langvarig krystallsyke', 'kronisk krystallsyke'],
    priority: 0.9,
    changeFrequency: 'monthly',
    legacy: false,
  },
  {
    slug: 'ovelser',
    title: 'Krystallsyke øvelser: Epley, Semont og rullemanøver',
    h1: 'Øvelser for krystallsyke',
    eyebrow: 'Øvelser hjemme',
    heroCta: { booking: false },
    description:
      'Epley, Semont og rullemanøver steg for steg, og hvorfor det er lurt å vite hvilken buegang det gjelder før du begynner.',
    template: 'exercise',
    nav: ['fag'],
    navLabel: 'Øvelser',
    keywords: ['krystallsyke øvelser', 'epley', 'kjerringråd krystallsyke'],
    priority: 0.9,
    changeFrequency: 'monthly',
    legacy: true,
  },
  {
    slug: 'trening',
    title: 'Brandt-Daroff: trening etter krystallsyke',
    h1: 'Trening etter krystallsyke',
    eyebrow: 'Brandt-Daroff',
    description: 'Brandt-Daroff-øvelsene og hvordan balansen trenes opp igjen etter krystallsyke.',
    template: 'exercise',
    nav: ['fag'],
    navLabel: 'Trening',
    keywords: ['brandt daroff', 'krystallsyke trening'],
    priority: 0.8,
    changeFrequency: 'monthly',
    legacy: true,
  },
  {
    slug: 'varighet',
    title: 'Krystallsyke varighet: hvor lenge varer det?',
    h1: 'Hvor lenge varer krystallsyke?',
    eyebrow: 'Varighet',
    description:
      'Hvor lenge varer et anfall, hvor lenge varer sykdommen, og når bør du få det undersøkt? Om varighet og sykemelding ved krystallsyke.',
    template: 'info',
    nav: ['fag'],
    navLabel: 'Varighet',
    keywords: [
      'krystallsyke varighet',
      'hvor lenge varer krystallsyke',
      'krystallsyke sykemelding',
    ],
    priority: 0.8,
    changeFrequency: 'monthly',
    legacy: false,
  },
  {
    slug: 'er-det-farlig',
    title: 'Plutselig svimmel: når er det farlig?',
    h1: 'Er svimmelheten farlig?',
    eyebrow: 'Plutselig svimmelhet',
    heroCta: {
      booking: false,
      secondary: { label: 'Les om krystallsyke', href: '/hva-er-krystallsyken' },
    },
    description:
      'Plutselig svimmelhet er sjelden farlig, men noen tegn skal du ringe 113 for. Her er listen, og hva som peker mot krystallsyke.',
    template: 'info',
    noAds: true,
    nav: ['fag'],
    navLabel: 'Er det farlig?',
    faqTopic: 'plutselig svimmelhet',
    keywords: ['plutselig svimmelhet', 'akutt svimmelhet'],
    priority: 0.8,
    changeFrequency: 'monthly',
    legacy: false,
  },
  {
    slug: 'svimmelhet',
    title: 'Svimmelhet og vertigo: vanlige årsaker, og når du ringer 113',
    h1: 'Svimmelhet, og hva det kan være',
    eyebrow: 'Svimmelhet',
    heroCta: {
      booking: true,
      secondary: { label: 'Er det farlig? Se tegnene', href: '/er-det-farlig' },
    },
    description:
      'Svimmelhet kan komme fra det indre øret, nakken, blodtrykket eller noe annet. En oversikt over de vanlige årsakene, og når du skal ringe 113.',
    template: 'hub',
    nav: ['fag'],
    navLabel: 'Svimmelhet',
    keywords: ['svimmelhet', 'vertigo', 'svimmel'],
    priority: 0.8,
    changeFrequency: 'monthly',
    legacy: true,
  },
  {
    slug: 'nakkesvimmelhet',
    title: 'Cervikogen svimmelhet: svimmel og stiv nakke',
    h1: 'Kan nakken gjøre deg svimmel?',
    eyebrow: 'Cervikogen svimmelhet',
    description:
      'Stiv nakke og svimmelhet henger ofte sammen. Om cervikogen svimmelhet, og hvordan den skilles fra krystallsyke.',
    template: 'info',
    nav: ['fag'],
    navLabel: 'Nakkesvimmelhet',
    keywords: ['cervikogen svimmelhet', 'stiv nakke svimmel'],
    priority: 0.7,
    changeFrequency: 'monthly',
    legacy: false,
  },
  {
    slug: 'andre-arsaker',
    title: 'Menières sykdom, vestibularisnevritt og PPPD',
    h1: 'Når det ikke er krystallsyke',
    eyebrow: 'Når det ikke er krystallsyke',
    heroCta: {
      booking: false,
      secondary: { label: 'Hvem bør jeg gå til?', href: '#hvem-gaa-til' },
    },
    description:
      'Menières sykdom, vestibularisnevritt og PPPD kan ligne på krystallsyke. Slik skilles de, og når jeg henviser videre.',
    template: 'info',
    nav: ['fag'],
    navLabel: 'Andre årsaker',
    faqTopic: 'andre årsaker til svimmelhet',
    keywords: ['menières sykdom', 'vestibularisnevritt', 'pppd'],
    priority: 0.7,
    changeFrequency: 'monthly',
    legacy: false,
  },
  {
    slug: 'lillestrom',
    title: 'Krystallsyke i Lillestrøm og på Romerike | Olve Lyngset',
    h1: 'Krystallsyke i Lillestrøm og på Romerike',
    eyebrow: 'Lillestrøm og Romerike',
    description:
      'Undersøkelse og behandling av krystallsyke i Storgata 25B i Lillestrøm, for deg som bor på Romerike eller i Oslo-området.',
    template: 'local',
    adGroup: 'AG4',
    nav: ['footer'],
    navLabel: 'Lillestrøm',
    keywords: ['krystallsyke lillestrøm', 'krystallsyke behandling oslo'],
    priority: 0.8,
    changeFrequency: 'monthly',
    legacy: false,
  },
  {
    slug: 'om-meg',
    title: 'Olve Lyngset, kiropraktor i Lillestrøm',
    h1: 'Olve Lyngset, kiropraktor i Lillestrøm',
    eyebrow: 'Om meg',
    description:
      'Kiropraktor Olve Lyngset har arbeidet med svimmelhet og krystallsyke i mange år. Bakgrunn, utdanning og utstyr.',
    template: 'practitioner',
    adGroup: 'AG6',
    nav: ['main'],
    navLabel: 'Om meg',
    keywords: ['olve lyngset'],
    priority: 0.8,
    changeFrequency: 'yearly',
    legacy: true,
  },
  {
    slug: 'bestill-time',
    title: 'Bestill time hos kiropraktor i Lillestrøm, uten henvisning',
    h1: 'Bestill time for krystallsyke i Lillestrøm',
    eyebrow: 'Bestilling',
    description:
      'Bestill time på nett hos kiropraktor Olve Lyngset i Lillestrøm. Uten henvisning, og hva som skjer på første time.',
    template: 'booking',
    nav: ['main'],
    navLabel: 'Bestill time',
    keywords: ['kiropraktor henvisning', 'kiropraktor pris', 'kiropraktor helfo'],
    priority: 0.9,
    changeFrequency: 'monthly',
    legacy: true,
  },
  {
    slug: 'sporsmal-og-svar',
    title: 'Spørsmål og svar om krystallsyke: alkohol, medisin, fly',
    h1: 'Spørsmål og svar om krystallsyke',
    eyebrow: 'Spørsmål og svar',
    heroCta: {
      booking: true,
      secondary: { label: 'Les om krystallsyke', href: '/hva-er-krystallsyken' },
    },
    description:
      'Korte svar på de vanlige spørsmålene om krystallsyke, som alkohol, medisin, bilkjøring, fly og hva du kan gjøre selv.',
    template: 'faq',
    // in the main menu from xl (no room at lg); in «Alt om krystallsyke» below that
    nav: ['main', 'fag', 'footer'],
    navLabel: 'Spørsmål og svar',
    keywords: ['krystallsyke og alkohol', 'medisin mot svimmelhet'],
    priority: 0.7,
    changeFrequency: 'monthly',
    legacy: false,
  },
  {
    slug: 'kontakt',
    title: 'Kontakt Olve Lyngset, kiropraktor i Lillestrøm',
    h1: 'Hva kan jeg hjelpe deg med?',
    eyebrow: 'Kontakt',
    description:
      'Book time på nett, finn telefonnummeret, eller finn veien til Storgata 25B i Lillestrøm.',
    template: 'contact',
    nav: ['main'],
    navLabel: 'Kontakt',
    keywords: [],
    priority: 0.7,
    changeFrequency: 'yearly',
    legacy: true,
  },
  {
    slug: 'personvern',
    title: 'Personvernerklæring',
    h1: 'Personvernerklæring',
    eyebrow: 'Personvern',
    description:
      'Hvilke opplysninger krystallsyken.no behandler, hvorfor, og hvilke rettigheter du har.',
    template: 'privacy',
    nav: ['footer'],
    navLabel: 'Personvern',
    keywords: [],
    priority: 0.3,
    changeFrequency: 'yearly',
    legacy: true,
  },
]

/** Legacy URLs with their permanent redirect targets (next.config.js reads this). */
export const REDIRECTS: { source: string; destination: string }[] = [
  { source: '/hjem', destination: '/' },
  { source: '/sitemap.axd', destination: '/sitemap.xml' },
  // cleaner slugs (2026-11-11): first person, ASCII, the keyword kept
  { source: '/om-oss', destination: '/om-meg' },
  { source: '/kontakt-oss', destination: '/kontakt' },
  { source: '/sporsmal', destination: '/sporsmal-og-svar' },
  { source: '/årsaker', destination: '/arsaker' },
  { source: '/%C3%A5rsaker', destination: '/arsaker' },
  { source: '/øvelser', destination: '/ovelser' },
  { source: '/%C3%B8velser', destination: '/ovelser' },
]

export function pathOf(route: Pick<Route, 'slug'>): string {
  return route.slug === '' ? '/' : `/${route.slug}`
}

/** Percent-encoded path for sitemap and llms.txt output. */
export function encodePath(route: Pick<Route, 'slug'>): string {
  return route.slug === '' ? '/' : `/${encodeURIComponent(route.slug)}`
}

export function routeBySlug(slug: string): Route | undefined {
  let decoded = slug
  try {
    decoded = decodeURIComponent(slug)
  } catch {
    // malformed escape, fall through with raw slug
  }
  return ROUTES.find((r) => r.slug === decoded)
}

export const HOME = ROUTES[0]
export const CONTENT_ROUTES = ROUTES.filter((r) => r.slug !== '')
export const NAV_MAIN = ROUTES.filter((r) => r.nav.includes('main') && r.slug !== '')
export const NAV_FAG = ROUTES.filter((r) => r.nav.includes('fag'))
export const NAV_FOOTER = ROUTES.filter((r) => r.nav.includes('footer'))
export const AD_LANDING_ROUTES = ROUTES.filter((r) => r.adGroup)

/** Slug set for the edge middleware and QA scripts (raw, not encoded). */
export const KNOWN_SLUGS: ReadonlySet<string> = new Set(
  ROUTES.map((r) => (r.slug === '' ? 'forside' : r.slug)),
)

export const BOOKING_ROUTE = ROUTES.find((r) => r.template === 'booking') as Route
export const CONTACT_ROUTE = ROUTES.find((r) => r.template === 'contact') as Route
export const SAFETY_ROUTE = ROUTES.find((r) => r.slug === 'er-det-farlig') as Route
export const PRACTITIONER_ROUTE = ROUTES.find((r) => r.template === 'practitioner') as Route
