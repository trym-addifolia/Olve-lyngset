/*
 * Routes registry: the single list of URLs. It feeds the header and footer
 * navigation, the sitemap, llms.txt, the middleware slug set, the breadcrumbs
 * and the per-page title/H1 pairs, so a page can never exist in one place and
 * be missing in another.
 *
 * Slugs, templates, nav and H1s are locked by the plan
 * (docs/superpowers/plans/2026-11-17-olvelyngset.md, «Route registry»). H1s,
 * titles and descriptions come from Olve's working document
 * (docs/olve/olvelyngset_nettside_arbeidsdokument.md, cited «§N»), dashes
 * rewritten. Slugs are ASCII and may be nested («svimmelhet/krystallsyke»);
 * the catch-all route joins the segments with «/».
 */

export type Template =
  | 'home'
  | 'info'
  | 'hub'
  | 'landing'
  | 'practitioner'
  | 'contact'
  | 'privacy'

export type NavGroup = 'main' | 'footer'

export type Route = {
  /** path without leading slash; '' for the home page; nested with «/» */
  slug: string
  /**
   * title tag. The template adds « | Olve Lyngset» unless the title already
   * names him or carries its own «|».
   */
  title: string
  h1: string
  eyebrow: string
  description: string
  template: Template
  nav: NavGroup[]
  /** short label for menus, breadcrumbs and cards */
  navLabel: string
  /**
   * Hero buttons. Undefined = «Bestill time» only. booking:false hides the
   * booking button; secondary adds a second link.
   */
  heroCta?: { booking: boolean; secondary?: { label: string; href: string } }
  /** topic for «Vanlige spørsmål om ...» when the nav label is not good bokmål there */
  faqTopic?: string
  /**
   * Preview-only page: noindex, never in the sitemap,
   * llms.txt or menus, and its title is marked «[Forhåndsvisning B]».
   */
  hidden?: boolean
  priority: number
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
}

const HOME_TITLE = 'Olve Lyngset | Kiropraktor i Lillestrøm, svimmelhet og hjernerystelse'
const HOME_H1 = 'Svimmelhet, hjernerystelse eller plager som ikke slipper taket?'
const HOME_EYEBROW = 'Olve Lyngset, kiropraktor · Limbra Storgata, Lillestrøm'
const HOME_DESCRIPTION =
  'Olve Lyngset er kiropraktor, DACNB, i Lillestrøm. Grundig undersøkelse og individuelt tilpasset oppfølging ved svimmelhet, hjernerystelse og muskel- og skjelettplager.'

export const ROUTES: readonly Route[] = [
  {
    slug: '',
    title: HOME_TITLE,
    h1: HOME_H1,
    eyebrow: HOME_EYEBROW,
    description: HOME_DESCRIPTION,
    template: 'home',
    nav: ['main'],
    navLabel: 'Hjem',
    priority: 1.0,
    changeFrequency: 'monthly',
  },
  {
    slug: 'svimmelhet',
    title: 'Svimmelhet og balanseproblemer | Olve Lyngset, Lillestrøm',
    h1: 'Svimmelhet og balanseproblemer',
    eyebrow: 'Svimmelhet og balanse',
    description:
      'Langvarig svimmelhet, ustøhet eller balanseproblemer? Les hvordan Olve Lyngset undersøker øyebevegelser, balanse og vestibulær funksjon i Lillestrøm.',
    template: 'hub',
    nav: ['main'],
    navLabel: 'Svimmelhet',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  {
    // §12 gives only the angle; title and description written for this site
    slug: 'svimmelhet/krystallsyke',
    title: 'Krystallsyke (BPPV) i Lillestrøm | Olve Lyngset',
    h1: 'Krystallsyke (BPPV): undersøkelse og behandling',
    eyebrow: 'Svimmelhet · Krystallsyke',
    description:
      'Krystallsyke (BPPV) gir korte anfall av svimmelhet når du snur hodet. Slik undersøker og behandler Olve Lyngset det i Lillestrøm, og hvor du kan lese mer.',
    template: 'info',
    nav: [],
    navLabel: 'Krystallsyke',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    slug: 'hjernerystelse',
    title: 'Langvarige plager etter hjernerystelse | Olve Lyngset',
    h1: 'Når plagene etter hjernerystelsen ikke går over',
    eyebrow: 'Plager etter hjernerystelse',
    description:
      'Vedvarende svimmelhet, hodepine eller utmattelse etter hjernerystelse? Olve Lyngset i Lillestrøm tilbyr grundig funksjonsundersøkelse og tilpasset oppfølging.',
    template: 'info',
    heroCta: {
      booking: true,
      secondary: { label: 'Les om intensivt opphold', href: '/intensivt-opphold' },
    },
    nav: ['main'],
    navLabel: 'Hjernerystelse',
    faqTopic: 'plager etter hjernerystelse',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  {
    slug: 'intensivt-opphold',
    title: 'Intensivt rehabiliteringsopphold ved svimmelhet og hjernerystelse',
    h1: 'Intensivt rehabiliteringsopphold i Lillestrøm',
    eyebrow: 'Intensivt opphold',
    description:
      'Tilpasset intensivt rehabiliteringsopphold i Lillestrøm for utvalgte pasienter med langvarig svimmelhet eller plager etter hjernerystelse. Kontakt Olve Lyngset.',
    template: 'landing',
    // §7: the stay cannot be booked as an ordinary online appointment
    heroCta: { booking: false },
    nav: ['main'],
    navLabel: 'Intensivt opphold',
    faqTopic: 'intensivt rehabiliteringsopphold',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    slug: 'andre-plager',
    title: 'Kiropraktor i Lillestrøm: rygg, nakke, hodepine og leddplager',
    h1: 'Kiropraktikk for rygg, nakke og andre muskel- og skjelettplager',
    eyebrow: 'Vanlig kiropraktikk',
    description:
      'Kiropraktor Olve Lyngset undersøker og behandler rygg, nakke, hodepine, skuldre, kjeve, hofter og andre muskel- og skjelettplager ved Limbra Storgata i Lillestrøm.',
    template: 'info',
    nav: ['main'],
    navLabel: 'Andre plager',
    faqTopic: 'vanlig kiropraktikk',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    slug: 'undersokelse',
    title: 'Grundig undersøkelse av svimmelhet og balanse | Olve Lyngset',
    h1: 'Flere vinduer inn i nervesystemet',
    eyebrow: 'Undersøkelse og metoder',
    description:
      'Videobriller (VOG/VNG), sakkadometer og tester av balanse og koordinasjon. Slik undersøker Olve Lyngset langvarig svimmelhet og plager etter hjernerystelse.',
    template: 'info',
    nav: ['main'],
    navLabel: 'Undersøkelse',
    faqTopic: 'undersøkelsen',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    slug: 'om-olve',
    title: 'Om Olve Lyngset, kiropraktor, DACNB, i Lillestrøm',
    h1: 'Om Olve Lyngset',
    eyebrow: 'Om Olve',
    description:
      'Olve Lyngset er kiropraktor, DACNB, med mer enn 30 års klinisk erfaring. Bakgrunn, utdanning og hva som driver ham. Limbra Storgata, Lillestrøm.',
    template: 'practitioner',
    nav: ['main'],
    navLabel: 'Om Olve',
    priority: 0.8,
    changeFrequency: 'yearly',
  },
  {
    slug: 'kontakt',
    title: 'Kontakt og timebestilling | Olve Lyngset, Lillestrøm',
    h1: 'Bestill time hos Olve Lyngset',
    eyebrow: 'Kontakt',
    description:
      'Bestill time hos kiropraktor Olve Lyngset ved Limbra Storgata i Lillestrøm, eller spør om intensivt rehabiliteringsopphold. Adresse, åpningstider og veibeskrivelse.',
    template: 'contact',
    nav: ['main', 'footer'],
    navLabel: 'Kontakt',
    priority: 0.8,
    changeFrequency: 'yearly',
  },
  {
    slug: 'personvern',
    title: 'Personvern',
    h1: 'Personvern',
    eyebrow: 'Personvern',
    description:
      'Hvilke opplysninger olvelyngset.no behandler, hvorfor, og hvilke rettigheter du har.',
    template: 'privacy',
    nav: ['footer'],
    navLabel: 'Personvern',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
]

export function pathOf(route: Pick<Route, 'slug'>): string {
  return route.slug === '' ? '/' : `/${route.slug}`
}

/** Percent-encoded path for sitemap and llms.txt output, segment by segment. */
export function encodePath(route: Pick<Route, 'slug'>): string {
  return route.slug === '' ? '/' : `/${route.slug.split('/').map(encodeURIComponent).join('/')}`
}

/** The route for a joined path («svimmelhet/krystallsyke»), raw or percent-encoded. */
export function routeBySlug(slug: string): Route | undefined {
  let decoded = slug
  try {
    decoded = decodeURIComponent(slug)
  } catch {
    // malformed escape, fall through with raw slug
  }
  return ROUTES.find((r) => r.slug === decoded)
}

/**
 * Breadcrumb trail: home, every registered parent path, the page itself.
 * /svimmelhet/krystallsyke gives Hjem / Svimmelhet / Krystallsyke.
 */
export function crumbsOf(route: Route): { name: string; path: string }[] {
  const parts = route.slug.split('/')
  const parents = parts
    .slice(0, -1)
    .map((_, i) => routeBySlug(parts.slice(0, i + 1).join('/')))
    .filter((r) => r !== undefined)
  return [HOME, ...parents, route].map((r) => ({ name: r.navLabel, path: pathOf(r) }))
}

export const HOME = ROUTES[0]
/** Everything a search engine, a menu or llms.txt may see. */
export const PUBLIC_ROUTES = ROUTES.filter((r) => !r.hidden)
/** Pages rendered by the catch-all route (src/app/[...slug]). */
export const CONTENT_ROUTES = PUBLIC_ROUTES.filter((r) => r.slug !== '')
export const NAV_MAIN = PUBLIC_ROUTES.filter((r) => r.nav.includes('main') && r.slug !== '')
export const NAV_FOOTER = PUBLIC_ROUTES.filter((r) => r.nav.includes('footer'))

/** Slug set for the edge middleware tally (raw, not encoded; nested paths joined with «/»). */
export const KNOWN_SLUGS: ReadonlySet<string> = new Set(
  ROUTES.map((r) => (r.slug === '' ? 'forside' : r.slug)),
)

/** Paths that must carry noindex even on the production host. */
export const HIDDEN_PATHS: ReadonlySet<string> = new Set(ROUTES.filter((r) => r.hidden).map(pathOf))

export const CONTACT_ROUTE = ROUTES.find((r) => r.template === 'contact') as Route
export const PRACTITIONER_ROUTE = ROUTES.find((r) => r.template === 'practitioner') as Route
/** The 113 advice in full: the box on the dizziness page (id «akutt»). */
export const SAFETY_HREF = '/svimmelhet#akutt'
