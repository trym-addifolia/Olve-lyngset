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
    name: 'Olve Lyngset',
    shortName: 'Olve Lyngset',
    /** one line under the name in header and footer */
    tagline: 'Kiropraktor, DACNB · Lillestrøm',
    legalName: 'LOL AS',
    /** Brønnøysundregistrene: LOL AS, styreleder Leif Olve Lyngset (checked 2026-11-12) */
    orgNumber: '928 308 979',
    domain: 'www.olvelyngset.no',
    /** per-site cookie prefix so two template sites never collide */
    cookiePrefix: 'ol',
    /**
     * Where Olve works. This is his personal professional site, not Limbra's
     * (arbeidsdokument §2 and §10), so the clinic is a work location only and
     * never the publisher of the site.
     */
    clinicName: 'Limbra Storgata',
    /** arbeidsdokument §4, metabeskrivelse */
    description:
      'Olve Lyngset er kiropraktor, DACNB, i Lillestrøm. Grundig undersøkelse og individuelt tilpasset oppfølging ved svimmelhet, hjernerystelse og muskel- og skjelettplager.',
  },

  contact: {
    phone: {
      /**
       * How the number is shown. arbeidsdokument §11: the number to publish
       * is still to be confirmed, so it is marked like `email`. Every place
       * that shows the number renders this through RichText; tel/href stay
       * clean digits.
       */
      display: '{{OLVE_BEKREFT: telefonnummer på siden | 906 66 485}}',
      /** digits only, national */
      tel: '90666485',
      href: 'tel:+4790666485',
      e164: '+4790666485',
      source: 'krystallsyken site.config (gammel krystallsyken.no)',
    },
    /**
     * Not created yet (arbeidsdokument §7 and §11): shown marked until the
     * mailbox exists and is tested. The intensive stay is enquired about here.
     */
    email: '{{OLVE_BEKREFT: e-postadresse (opprettes før lansering) | kontakt@olvelyngset.no}}',
    /** mailto with the subject from arbeidsdokument §15 */
    emailHref:
      'mailto:kontakt@olvelyngset.no?subject=Foresp%C3%B8rsel%20om%20intensivt%20rehabiliteringsopphold',
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
   * Structured opening hours in Europe/Oslo. Feed footer, contact table and the
   * open-now logic from here only. `verified: false` renders the placeholder
   * note instead of the table.
   */
  hours: {
    timezone: 'Europe/Oslo',
    /** Olve 2026-11-11, via krystallsyken site.config. Weekend closed (assumed). */
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
    /** the plain title only, never a banned title word (compliance.bannedWords, hpl § 13) */
    title: 'Kiropraktor',
    /** how the title is shown next to the name (arbeidsdokument §1) */
    titleLong: 'Kiropraktor, DACNB',
    /** DACNB is always explained where it is shown at length (Om Olve) */
    dacnb: {
      short: 'DACNB',
      long: 'Diplomate of the American Chiropractic Neurology Board',
    },
    /** the HPR number alone, for the Person schema credential */
    hprId: '8056501',
    hprNumber: 'Kiropraktor, autorisert helsepersonell. HPR-nummer 8056501',
    /** Palmer is in Davenport, Iowa (arbeidsdokument §10); the year is on the fact-check list */
    education:
      'Palmer College of Chiropractic, Davenport, Iowa, USA, {{OLVE_BEKREFT: utdanningsår | 1993}}',
    yearsInPractice: 'Mer enn 30 års klinisk erfaring',
    memberships: ['{{OLVE_BEKREFT: NKF-medlemskap | Medlem av Norsk Kiropraktorforening}}'],
    /** arbeidsdokument §2 and §10; the exact wording is on the fact-check list */
    furtherEducation: [
      '{{OLVE_BEKREFT: Carrick Institute, ordlyd | Videreutdanning i funksjonell nevrologi, blant annet gjennom Carrick Institute}}',
      '{{OLVE_BEKREFT: vestibulær rehabilitering, ordlyd | Videreutdanning i vestibulær rehabilitering}}',
    ],
    /**
     * First consultation lengths (arbeidsdokument §11). To be checked against
     * the booking setup, hence marked.
     */
    consultations: [
      {
        name: 'Første konsultasjon ved svimmelhet',
        duration:
          '{{OLVE_BEKREFT: varighet første konsultasjon, svimmelhet | omtrent 40 til 50 minutter}}',
      },
      {
        name: 'Første konsultasjon ved plager etter hjernerystelse',
        duration:
          '{{OLVE_BEKREFT: varighet første konsultasjon, hjernerystelse | omtrent 50 til 60 minutter}}',
      },
    ],
    /** real portrait only; no stock, no generated people. Empty = placeholder slot. */
    portrait: {
      /**
       * Clinic's own photo, taken 2026-11-10 (iPhone, IMG_0907), supplied by
       * Trym 2026-11-16. Exported without EXIF (the original has GPS).
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
    /** Off on every page until Olve has reviewed it (arbeidsdokument §14). */
    video: {
      youtubeId: '7avfb-lI4Bs',
      title: 'Olve Lyngset forklarer krystallsyke',
      source: 'arbeidsdokument §14',
    },
    /** Concrete equipment and tests (arbeidsdokument §8). */
    equipment: [
      {
        name: 'Videobriller (VOG/VNG)',
        description:
          'Med videobriller kan jeg se øynene dine i mørket og ved behov gjøre opptak av øyebevegelsene, blant annet nystagmus.',
        source: 'arbeidsdokument §8',
      },
      {
        name: 'Sakkadometer',
        description:
          'Måler raske øyebevegelser, for eksempel reaksjonstid, hastighet og presisjon. Resultatene vurderes sammen med øvrige funn og symptomene dine.',
        source: 'arbeidsdokument §8',
      },
      {
        name: 'Balanse og koordinasjon',
        description:
          'Balanse på ulike underlag, koordinasjon, evnen til å følge et mål med blikket og samspillet mellom hode- og øyebevegelser.',
        source: 'arbeidsdokument §8',
      },
    ],
  },

  /**
   * Sister sites, linked from the matching page. krystallsyken.no stays the
   * deep site on krystallsyke (design decision 1); /svimmelhet/krystallsyke
   * links out to it.
   */
  sister: {
    krystallsyken: {
      // the preview Worker until launch; becomes https://www.krystallsyken.no when that site goes live
      url: 'https://krystallsyken.hei-0de.workers.dev',
      label: 'krystallsyken.no',
    },
  },

  /**
   * Limbra Storgata. The coordinates are approximate, so they stay out of the
   * Person schema (src/lib/schema.ts) until checked against Kartverket.
   */
  location: {
    city: 'Lillestrøm',
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
    /**
     * Decision 2026-11-11: no prices anywhere on the site. Nothing renders
     * prices (the price table was removed); a component that ever shows one
     * must check this switch first.
     */
    showPrices: false,
    allowTestimonials: false,
    /**
     * Words that must never appear in the page text (helsepersonelloven § 13,
     * plus the deliberate boundaries of arbeidsdokument §18).
     * src/lib/compliance.test.ts checks src/ and content/ against them; only
     * this array itself is exempt, so name the words nowhere else.
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
      'covid',
    ],
  },

  /**
   * Theme tokens. tailwind.config.ts reads the hex scales from here, and
   * src/app/globals.css mirrors them as HSL semantic tokens. Change both.
   */
  theme: {
    fonts: { display: 'Newsreader', body: 'Source Sans 3' },
    /** primary: the petrol shared with krystallsyken.no; buttons, links */
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
     * ochre: the accent of the home page («Det er hjelp å få»). Warm, never
     * orange; 700 and darker pass as text on paper.
     */
    ochre: {
      DEFAULT: '#B98325',
      50: '#FBF5E9',
      100: '#F5E6C6',
      200: '#EBCD8D',
      300: '#DFB25A',
      400: '#D19A37',
      500: '#B98325',
      600: '#99691C',
      700: '#7A5319',
      800: '#5F4118',
      900: '#493215',
    },
    /**
     * krystall: the orange of krystallsyken.no. Used ONLY on
     * /svimmelhet/krystallsyke, as the link to the sister site.
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
    /** amber: the visible marker for unconfirmed facts (.placeholder) and the OG card rule */
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
    /** haze: the alternate section ground and the mat behind photos */
    mist: '#E3EBEA',
  },
} as const

export type SiteConfig = typeof site
