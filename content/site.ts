/**
 * Site-wide copy: navigation, footer, buttons, image texts and draft labels.
 * Source for wording: Olves arbeidsdokument v0.9 (§3 sidekart, §15 CTA-tekster, §14 bilder).
 */
import type { DrawingName, Link, PhotoName } from './types'

export const BOOK_HREF = '/go/bestill/'

export const SITE = {
  lang: 'nb',
  brand: '{{fakta:behandler_navn}}',
  /** second line of the brand in the header (from 1024) */
  brandLine: 'Kiropraktor i {{fakta:by}}',
  /**
   * The hero portrait: 'utklipp' = the cutout on a soft arched ground, 'ramme' = the same portrait
   * in a thin frame. Both use the photographer's portrait (rights open, see PHOTOS.fotograf).
   */
  heroPhoto: 'utklipp' as 'utklipp' | 'ramme',
  skipLink: 'Hopp til innholdet',
  menuOpen: 'Meny',
  mainNavLabel: 'Hovedmeny',
  book: { label: 'Bestill time', href: BOOK_HREF } satisfies Link,
  callLabel: 'Ring {{fakta:telefon}}',
  /** «Plager» group: two panes in the desktop dropdown; the phone sheet lists the same links flat */
  plagerLabel: 'Plager',
  plager: [
    [
      { label: 'Svimmelhet og balanse', href: '/svimmelhet/', lead: true },
      { label: 'PPPD', href: '/svimmelhet/pppd/', sub: true },
      { label: 'MdDS', href: '/svimmelhet/mdds/', sub: true },
      { label: 'Vestibularisnevritt', href: '/svimmelhet/vestibularisnevritt/', sub: true },
      { label: 'Ménières sykdom', href: '/svimmelhet/menieres-sykdom/', sub: true },
    ],
    [
      { label: 'Plager etter hjernerystelse', href: '/hjernerystelse/', lead: true },
      { label: 'Rygg, nakke og andre plager', href: '/andre-plager/', lead: true },
      {
        label: 'Krystallsyke: krystallsyken.no',
        href: '{{fakta:krystallsyken_url}}',
        external: true,
      },
    ],
  ] as { label: string; href: string; lead?: boolean; sub?: boolean; external?: boolean }[][],
  nav: [
    { label: 'Undersøkelsen', href: '/undersokelse/' },
    { label: 'Intensivt opphold', href: '/intensivt-opphold/' },
    { label: 'Om Olve', href: '/om-olve/' },
    { label: 'Kontakt', href: '/kontakt/' },
  ] satisfies Link[],
  /** phone sheet: the rest after the condition list (Kontakt reads longer there) */
  sheetRest: [
    { label: 'Undersøkelsen', href: '/undersokelse/' },
    { label: 'Intensivt opphold', href: '/intensivt-opphold/' },
    { label: 'Om Olve', href: '/om-olve/' },
    { label: 'Kontakt og timebestilling', href: '/kontakt/' },
  ] satisfies Link[],
  breadcrumbHome: 'Forside',
  youAreHere: 'Du er her',
  /** trust chips under the hero buttons; each depends on one fact, unconfirmed ones drop out */
  chips: [
    { text: '{{fakta:adresse_kort}}', wide: true },
    { text: 'Du trenger ikke henvisning{{bekreft:uten_henvisning}}', wide: true },
    { text: 'Mer enn {{fakta:erfaring_ar}} års erfaring', wide: true },
    { text: '{{fakta:apningstider_kort}}', wide: false },
  ],
  rail: {
    caption: '{{fakta:behandler_navn}}, kiropraktor',
    place: '{{fakta:klinikk_navn}}, {{fakta:by}}',
    hoursLabel: 'Åpningstider',
    /** split into lines at «, » by the rail */
    hours: '{{fakta:apningstider}}',
    tocLabel: 'På denne siden',
  },
  /** thumbnail row second line */
  whoLine: '{{fakta:behandler_navn}}, kiropraktor',
  whoLineHome: 'Mer enn {{fakta:erfaring_ar}} års erfaring',
  /** «what happens next» steps near the booking buttons */
  steps: [
    'Bestill på nett hos Limbra.',
    'Første time: historien din, så undersøkelsen.',
    'En plan du kan arbeide med.',
  ],
  nextBody: [
    'Du bestiller en vanlig konsultasjon gjennom timebestillingen hos Limbra. {{fakta:uten_henvisning}}',
  ],
  nextNote: '{{fakta:klinikk_navn}}, {{fakta:adresse}}. {{fakta:parkering_inngang}}',
  siblingsHeading: 'Andre diagnoser jeg møter',
  siblingsBack: {
    name: 'Tilbake til oversikten',
    hint: 'Svimmelhet og balanse',
    href: '/svimmelhet/',
  },
  footer: {
    personal:
      'Dette er Olve Lyngsets personlige faglige nettside. Han arbeider ved {{fakta:klinikk_navn}} i {{fakta:by}}. Nettsiden er ikke Limbras.',
    address: '{{fakta:klinikk_navn}}, {{fakta:adresse}}',
    phone: 'Telefon {{fakta:telefon}}',
    org: '{{fakta:behandler_navn}} er autorisert kiropraktor, HPR-nummer {{fakta:hpr_nummer}}.',
    sister: {
      label: 'Krystallsyke: les mer på krystallsyken.no',
      href: '{{fakta:krystallsyken_url}}',
    },
    notAdvice: 'Nettsiden erstatter ikke medisinsk vurdering. Ved akutt sykdom, ring 113.',
    links: [
      { label: 'Kontakt og timebestilling', href: '/kontakt/' },
      { label: 'Personvern', href: '/personvern/' },
    ] satisfies Link[],
    preview: 'Forhåndsvisning. Ikke publisert, ikke godkjent av Olve.',
  },
  draft: {
    mark: 'Bekreftes av Olve',
    banner:
      'Utkastvisning. Avsnitt med merket «Bekreftes av Olve» bygger på opplysninger som ikke er bekreftet, og vises ikke i vanlig visning.',
  },
  illustration: 'Illustrasjon',
  faqHeading: 'Spørsmål og svar',
  notFound: {
    title: 'Siden finnes ikke',
    body: 'Adressen kan være skrevet feil, eller siden er flyttet.',
    link: { label: 'Gå til forsiden', href: '/' } satisfies Link,
  },
} as const

export const PHOTOS: Record<
  PhotoName,
  { src: string; width: number; height: number; alt: string }
> = {
  portrett: {
    src: '/foto/olve-lyngset.jpg',
    width: 960,
    height: 1280,
    alt: 'Kiropraktor Olve Lyngset i hvit poloskjorte, med en modell av ryggsøylen',
  },
  /* Main portrait (round 3). Rights are NOT cleared: the token keeps the launch gate closed. */
  fotograf: {
    src: '/foto/portrett-fotograf.jpg',
    width: 481,
    height: 645,
    alt: 'Kiropraktor Olve Lyngset, portrett{{bekreft:bilderett_fotograf}}',
  },
  utklipp: {
    src: '/foto/portrett-fotograf-utklipp.png',
    width: 481,
    height: 645,
    alt: 'Kiropraktor Olve Lyngset, portrett{{bekreft:bilderett_fotograf}}',
  },
  nakken: {
    src: '/foto/olve-nakken.jpg',
    width: 960,
    height: 1280,
    alt: 'Kiropraktor Olve Lyngset peker på nakken på en modell av ryggsøylen',
  },
  videobriller: {
    src: '/foto/videobriller-skjerm.jpg',
    width: 1200,
    height: 1235,
    alt: 'Et øye på skjermen, filmet med videobriller mens pasienten sitter foran skjermen',
  },
  /* The person is identifiable and consent is NOT confirmed: the token keeps the launch gate closed. */
  vogPasient: {
    src: '/foto/vog-pasient.jpg',
    width: 1000,
    height: 1122,
    alt: 'En pasient med videobriller over øynene, i profil foran en plansje av øret{{bekreft:samtykke_vog}}',
  },
  vogProfil: {
    src: '/foto/vog-profil.jpg',
    width: 900,
    height: 1200,
    alt: 'En pasient i profil med videobriller over øynene, med en plansje av øret på veggen bak{{bekreft:samtykke_vog}}',
  },
}

/** accessible names for the drawings; what each shows is described in the caption */
export const DRAWINGS: Record<DrawingName, string> = {
  horisont: 'Tegning av et øye som følger et mål langs en linje',
  briller: 'Tegning av et hode sett fra siden med videobriller over øynene',
  balanse: 'Tegning av en person som står på en myk pute',
  butikk: 'Tegning av hyller fulle av varer, et visuelt travelt miljø',
  gynge: 'Tegning av en person som står på et underlag som gynger',
  syklus: 'Tegning av en sirkel med tre ledd: undersøk, prøv, undersøk på nytt',
  sakkade: 'Tegning av en kurve for en rask øyebevegelse, med reaksjonstid og presisjon',
  grasone: 'Tegning av en skala fra syk til frisk, med et grått felt i midten',
  dagen: 'Tegning av en dag med økter og hvile annenhver gang',
}

/** words inside the drawings (kept here so src/ holds no copy) */
export const DRAWING_LABELS = {
  syklus: ['Undersøk', 'Prøv', 'Undersøk på nytt'],
  grasone: ['Syk', 'Frisk'],
  sakkade: ['Mål', 'Reaksjonstid', 'Presisjon'],
  dagen: ['Økt', 'Hvile'],
} as const

/** names used only in structured data (JSON-LD) */
export const SCHEMA_TEXT = {
  memberOf: 'Norsk Kiropraktorforening',
  country: 'NO',
  /** topics from the document §1 and §5 (no krystallsyke: krystallsyken.no owns it) */
  knowsAbout: [
    'Svimmelhet',
    'Balanseproblemer',
    'PPPD',
    'MdDS',
    'Vestibularisnevritt',
    'Ménières sykdom',
    'Plager etter hjernerystelse',
    'Vestibulær rehabilitering',
    'Kiropraktikk',
  ],
  hprCategory: 'Autorisasjon som kiropraktor',
  hprIssuer: 'Helsedirektoratet',
} as const

/** last content change; sitemap lastModified and dateModified in structured data */
export const CONTENT_UPDATED = '2026-11-18'

/** llms.txt: intro, page groups (by slug) and the safety line */
export const LLMS = {
  intro:
    '{{fakta:behandler_navn}} er kiropraktor ved {{fakta:klinikk_navn}} i {{fakta:by}}. Dette er hans personlige faglige nettside. Han arbeider særlig med langvarig svimmelhet, balanseproblemer og plager etter hjernerystelse, og med vanlige muskel- og skjelettplager. Språk: norsk bokmål.',
  groups: [
    {
      heading: 'Svimmelhet',
      slugs: [
        'svimmelhet',
        'svimmelhet/pppd',
        'svimmelhet/mdds',
        'svimmelhet/vestibularisnevritt',
        'svimmelhet/menieres-sykdom',
      ],
    },
    { heading: 'Hjernerystelse', slugs: ['hjernerystelse'] },
    {
      heading: 'Undersøkelse og opphold',
      slugs: ['undersokelse', 'intensivt-opphold', 'andre-plager'],
    },
    { heading: 'Om og kontakt', slugs: ['', 'om-olve', 'kontakt', 'personvern'] },
  ],
  importantHeading: 'Viktig',
  important: [
    'Ved tegn på hjerneslag, eller hvis du tror det er farlig: ring 113.',
    'Timebestilling og praktisk informasjon: ',
  ],
} as const
