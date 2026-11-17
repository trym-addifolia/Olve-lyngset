/*
 * site.config.ts: the ONLY file that knows who the client is.
 *
 * Everything client-specific (brand, NAP, hours, practitioner, booking
 * provider, compliance switches, theme) lives here or in content/. The rest
 * of src/ stays generic, so a change of facts is a change in this
 * file.
 *
 * Facts that the client has not confirmed are written as
 * {{OLVE_BEKREFT: ...}} placeholders. They render visibly (see RichText) and
 * block production until replaced.
 */

export type WeeklyHours = {
  /** ISO weekday, 1 = Monday ... 7 = Sunday */
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7
  opens: string
  closes: string
}

export type BookingConfig =
  | { mode: 'deeplink'; deeplinkUrl: string; verified: boolean; note?: string }
  | { mode: 'native'; adapter: string }

export const site = {
  brand: {
    name: 'Krystallsyken.no',
    shortName: 'Krystallsyken',
    /** one line under the name in header and footer */
    tagline: 'Kiropraktor i Lillestrøm',
    legalName: 'LOL AS',
    /** Brønnøysundregistrene: LOL AS, styreleder Leif Olve Lyngset (checked 2026-11-12) */
    orgNumber: '928 308 979',
    domain: 'www.krystallsyken.no',
    /** per-site cookie prefix so two template sites never collide */
    cookiePrefix: 'ks',
    /** the clinic the practitioner works from (appears on the door sign) */
    clinicName: 'Limbra Lillestrøm',
    description:
      'Undersøkelse og behandling av krystallsyke (BPPV) hos kiropraktor Olve Lyngset i Lillestrøm.',
  },

  contact: {
    phone: {
      display: '906 66 485',
      /** digits only, national */
      tel: '90666485',
      href: 'tel:+4790666485',
      e164: '+4790666485',
      source: 'gammel krystallsyken.no',
    },
    /** public email is optional; empty string = not shown anywhere */
    email: '',
    address: {
      street: 'Storgata 25B',
      postalCode: '2000',
      city: 'Lillestrøm',
      full: 'Storgata 25B, 2000 Lillestrøm',
      googleMapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Storgata+25B+2000+Lillestr%C3%B8m',
      /** practical line shown on contact and home */
      directions:
        'Inngang på gateplan, Limbra står på skiltet. Klinikken har ingen egen parkering. Du kan parkere i parkeringshuset på Lillestrøm Torv.',
    },
  },

  /**
   * Structured opening hours in Europe/Oslo. Feed footer, contact table,
   * JSON-LD openingHoursSpecification and the open-now logic from here only.
   * `verified: false` renders the placeholder note instead of the table and
   * keeps the hours out of JSON-LD.
   */
  hours: {
    timezone: 'Europe/Oslo',
    /** Olve 2026-11-11 (resultater/olve/2026-11-11-olve-svar-nettsiden.md). Weekend closed (assumed). */
    verified: true,
    note: 'Åpent mandag til fredag.',
    weekly: [
      { day: 1, opens: '07:30', closes: '15:00' },
      { day: 2, opens: '07:30', closes: '18:00' },
      { day: 3, opens: '07:30', closes: '15:00' },
      { day: 4, opens: '07:30', closes: '18:00' },
      { day: 5, opens: '07:30', closes: '12:00' },
    ] as WeeklyHours[],
  },

  practitioner: {
    name: 'Olve Lyngset',
    firstName: 'Olve',
    /** never "spesialist", never "nevrokiropraktor" as a title (hpl § 13) */
    title: 'Kiropraktor',
    titleLong: 'Kiropraktor med videreutdanning i nevrologi (DACNB)',
    hprNumber:
      'Kiropraktor, autorisert helsepersonell. HPR-nummer 8056501',
    education: 'Palmer College of Chiropractic, USA, 1993',
    yearsInPractice: 'Kiropraktor siden 1993, med fokus på svimmelhet de siste 25 årene',
    /** real portrait only; no stock, no generated people. Empty = placeholder slot. */
    portrait: {
      /**
       * Clinic's own photo, taken 2026-11-10 (iPhone, IMG_0907), supplied by
       * Trym 2026-11-16 to replace the old site's portrait (Greger Flak), whose
       * rights were never cleared. Exported without EXIF (the original has GPS).
       */
      src: '/bilder/olve-lyngset.jpg',
      /**
       * Display size; the file is 960x1280 (2x, same 3:4 ratio) for sharp
       * screens. The slot keeps this ratio so the whole photo shows, never cropped.
       */
      width: 480,
      height: 640,
      alt: 'Kiropraktor Olve Lyngset med en modell av ryggsøylen',
      /** photographer shown under the photo; empty = no credit line */
      credit: '',
      /**
       * INTERNAL, never shown on the page: Olve has not seen this exact photo
       * on the site yet; he can comment on it in comment mode.
       */
      approvedByOlve: false,
      /** the clinic's own photo; confirm who took it before launch if a credit is wanted */
      rightsConfirmed: true,
    },
    video: {
      youtubeId: '7avfb-lI4Bs',
      title: 'Olve Lyngset forklarer krystallsyke',
      source: 'gammel krystallsyken.no',
    },
    /** Concrete equipment. No TRV chair: Olve refers out for it (old /behandling). */
    equipment: [
      {
        name: 'Infrarøde videobriller (VOG)',
        description:
          'Jeg ser øynene dine i mørket. Det er slik jeg ser etter om det er krystaller, og hvilken buegang de ligger i.',
        source: 'gammel krystallsyken.no /diagnosering og /behandling; limbra.no (VOG)',
      },
      {
        name: 'Videonystagmografi (VNG)',
        description:
          'Måler øyebevegelsene dine med kamera og datamaskin, så jeg ser hvor nøyaktige de er.',
        source: 'gammel krystallsyken.no /trening og /øvelser; limbra.no (VNG)',
      },
      {
        name: 'Datastyrt balansetest (CAPS)',
        description:
          'Måler hvor stødig du står under ulike forhold, og brukes når svimmelheten har stått lenge. Den gir ikke diagnosen alene, men er en del av puslespillet. {{OLVE_BEKREFT: CAPS i bruk}}',
        source:
          'gammel krystallsyken.no /trening og /øvelser (CAPS); video «Generell svimmelhet» jpzmI2ajvZM 02:00, balanseapparatet i videoen antatt CAPS, bekreftes av Olve («gir meg ikke den fulle diagnosen på noen måte. Men det er en del av puslespillet»)',
      },
    ],
  },

  location: {
    city: 'Lillestrøm',
    area: 'Romerike',
    region: 'Akershus',
    areaServed: ['Lillestrøm', 'Romerike', 'Lørenskog', 'Rælingen', 'Skedsmo', 'Oslo'],
    geo: { latitude: 59.9559, longitude: 11.0495, source: 'omtrentlig, bekreftes mot Kartverket' },
  },

  booking: {
    mode: 'deeplink',
    /** treatmentType=0 opens on «Første gang»; Solvit fills in the current week itself */
    deeplinkUrl:
      'https://onlinebooking.solvitjournal.no/limbra_lillestrom_eureka/2907/book-available?treatmentType=0',
    verified: true,
  } as BookingConfig,

  compliance: {
    /** Decision 2026-11-11: no prices anywhere on the site for now. */
    showPrices: false,
    allowTestimonials: false,
    /**
     * Words that must never appear in the page text
     * (helsepersonelloven § 13).
     */
    bannedWords: [
      'spesialist',
      'spesialkompetanse',
      'nevro-kiropraktor',
      'nevrokiropraktor',
      'garanti',
      'smertefri',
      'kurere',
      'helt frisk',
      'mirakel',
    ],
  },

  /**
   * Price table, rendered only when compliance.showPrices is true. Empty:
   * the clinic does not publish prices (decision 2026-11-11).
   */
  prices: [] as { name: string; price: string; note: string; source: string }[],

  /**
   * Theme tokens. tailwind.config.ts reads the hex scales from here, and
   * src/app/globals.css mirrors them as HSL semantic tokens. Change both.
   */
  theme: {
    fonts: { display: 'Newsreader', body: 'Source Sans 3' },
    /** primary: the petrol from the practitioner's old site and logo; buttons, links */
    fjord: {
      DEFAULT: '#12515F',
      50: '#EEF5F5',
      100: '#D9EAEC',
      200: '#B3D4D9',
      300: '#84B8C1',
      400: '#4E94A1',
      500: '#257585',
      600: '#12515F',
      700: '#0E434F',
      800: '#0B3640',
      900: '#082A32',
    },
    /**
     * krystall: the orange of the old crystal logo. It means one thing: the
     * crystals (illustrations, list marks, step marks). Never buttons, never text blocks.
     */
    krystall: {
      DEFAULT: '#E2632B',
      50: '#FDF1EA',
      100: '#FADFD0',
      300: '#F0A27C',
      500: '#E2632B',
      700: '#A8431A',
      900: '#5E260F',
    },
    /** amber: exercise warnings only */
    ember: {
      DEFAULT: '#C2703E',
      50: '#FBF3EC',
      100: '#F6E2D2',
      200: '#EDC4A6',
      300: '#E2A277',
      400: '#D4864F',
      500: '#C2703E',
      600: '#A35A30',
      700: '#824726',
      800: '#62361E',
      900: '#472716',
    },
    /** ink: deep petrol night for the one dark band, the footer and text */
    ink: {
      DEFAULT: '#0A2D37',
      950: '#061E25',
      900: '#0A2D37',
      800: '#0F404C',
      700: '#2A4F59',
      600: '#44626B',
      500: '#5C7780',
    },
    /** ground: warm linen, neither cream nor clinic white; the petrol lives in type and dark grounds */
    paper: '#F5F3EE',
    /** haze: the alternate section ground and the mat behind illustrations */
    mist: '#E3EBEA',
  },
} as const

export type SiteConfig = typeof site

/** Convenience: is any OLVE_BEKREFT placeholder still present in a string? */
export function hasPlaceholder(text: string): boolean {
  return /\{\{[A-Z_]+:[^}]*\}\}/.test(text)
}
