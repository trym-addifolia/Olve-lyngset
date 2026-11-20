/**
 * All page copy. Source: Olves arbeidsdokument v0.9 (docs/olve/olvelyngset_nettside_arbeidsdokument.md).
 * Section numbers in the comments point at the document. Wording is his, tightened, not rewritten.
 * Short labels, steps and hints added by the design (DESIGN.md §12) restate the document.
 * Deviations from the document are listed in HANDOFF.md («Avvik fra dokumentet»).
 * Numbers, names that need consent and every claim Olve must confirm go through content/facts.json.
 */
import { BOOK_HREF, SITE } from './site'
import type { Block, EmergencyLine, Faq, Page, Pane } from './types'

const book = { label: 'Bestill time', href: BOOK_HREF }
const G = '{{bekreft:diagnosetekster_gjennomgatt}}'

/* §5 «Når svimmelhet må vurderes raskt», with helsenorge.no for the 113 line */
const emergencyDizziness: Block = {
  kind: 'emergency',
  heading: 'Når svimmelhet må vurderes raskt',
  body: [
    'Ring {{fakta:akutt_boks}} med en gang hvis du tror det er farlig eller lett kan bli det, eller ved tegn på hjerneslag: problemer med å snakke, smile eller løfte begge armene.',
    'Plutselig oppstått kraftig svimmelhet, særlig sammen med nye nevrologiske symptomer som talevansker, lammelser, nummenhet eller andre akutte faresignaler, må vurderes raskt av lege eller akutt helsetjeneste.',
  ],
  callLabel: 'Ring {{fakta:akutt_boks}}',
  source: { label: 'Kilde: helsenorge.no, Svimmelhet', href: '{{fakta:kilde_svimmelhet}}' },
  extraSources: [{ label: 'helsenorge.no, Hjerneslag', href: '{{fakta:kilde_hjerneslag}}' }],
}

/* helsenorge.no «Hjernerystelse», symptomer som krever rask handling */
const emergencyConcussion: Block = {
  kind: 'emergency',
  heading: 'Nylig slått hodet?',
  body: [
    'Har du eller noen andre nylig slått hodet: ring {{fakta:akutt_boks}} med en gang hvis den skadde {{fakta:hode_113}}, eller hvis du tror det er farlig eller lett kan bli det.',
    'Ved {{fakta:rode_flagg_hjernerystelse}}, kontakt lege eller legevakt ({{fakta:legevakt}}) med en gang. Denne siden handler om plager som varer lenge.',
  ],
  callLabel: 'Ring {{fakta:akutt_boks}}',
  source: { label: 'Kilde: helsenorge.no, Hjernerystelse', href: '{{fakta:kilde_hjernerystelse}}' },
}

/* compact lines in the hero, shortened from the two boxes above (DESIGN §12, line 3 and the head injury gap) */
const lineDizziness: EmergencyLine = {
  variant: 'dizziness',
  text: 'Tror du det er farlig, eller ser du tegn på hjerneslag?',
  callLabel: 'Ring {{fakta:akutt_boks}}',
}
const lineHeadInjury: EmergencyLine = {
  variant: 'headInjury',
  text: 'Nylig slått hodet, og tror du det kan være farlig?',
  callLabel: 'Ring {{fakta:akutt_boks}}',
}

/* §8 the four windows */
const panes: Pane[] = [
  {
    drawing: 'briller',
    name: 'Videobriller (VOG/VNG)',
    hint: 'Øyebevegelser, blant annet nystagmus',
    anchor: 'videobriller',
  },
  {
    drawing: 'sakkade',
    name: 'Sakkadometer',
    hint: 'Reaksjonstid, hastighet og presisjon',
    anchor: 'sakkadometer',
  },
  { drawing: 'balanse', name: 'Balanse', hint: 'På ulike underlag', anchor: 'balanse' },
  {
    drawing: 'horisont',
    name: 'Koordinasjon og blikk',
    hint: 'Å følge et mål med blikket',
    anchor: 'balanse',
  },
]

/* the person with the goggles on, the screen set into the corner (method band, VOG section) */
const gogglesWorn = {
  type: 'photo',
  name: 'vogPasient',
  inset: 'videobriller',
  caption: 'Videobriller over øynene. Innfelt: et øye på skjermen, filmet med videobrillene.',
} as const
const neck = {
  type: 'photo',
  name: 'nakken',
  caption: '{{fakta:behandler_navn}} viser nakken på en modell av ryggsøylen.',
} as const

/* §5 and §4: the method band on the dizziness pages */
const methodDizziness: Block = {
  kind: 'windows',
  id: 'undersokelsen',
  heading: 'Undersøkelsen begynner med historien din',
  body: [
    'Ved mer sammensatte plager kan jeg blant annet undersøke øyebevegelser med videobriller (VOG/VNG), balanse, koordinasjon og samspillet mellom hode- og øyebevegelser.',
    'Jeg vurderer funnene samlet. Et avvik kan gi nyttig informasjon, men er ikke i seg selv bevis for én bestemt årsak til symptomene.',
  ],
  photo: gogglesWorn,
  panes,
  link: { label: 'Slik undersøker jeg', href: '/undersokelse/' },
}

/* §8 «Undersøk, prøv, undersøk på nytt» as three steps */
const roundSteps = [
  { name: 'Undersøk.', text: 'Funnene gir grunnlag for en foreløpig arbeidshypotese.' },
  { name: 'Prøv.', text: 'Vi prøver ut målrettede øvelser eller andre tiltak.' },
  {
    name: 'Undersøk på nytt.',
    text: 'Hvis resultatene ikke stemmer med det jeg forventet, må hypotesen revurderes.',
  },
]

/* §5 rehabilitation, his goals sentence as a list */
const roundDizziness: Block = {
  kind: 'round',
  heading: 'Rehabilitering tilpasset din reaksjon',
  body: [
    'Hvis undersøkelsen peker mot funksjoner det kan være aktuelt å trene, velger jeg øvelser og stimuli med utgangspunkt i funnene og symptomene dine.',
  ],
  steps: roundSteps,
  goalsHeading: 'Målet kan for eksempel være å',
  goals: [
    'gå tryggere',
    'orke mer i butikker',
    'lese lenger',
    'kjøre bil med mindre ubehag',
    'få større tillit til egen balanse',
  ],
  closing:
    'Jeg følger med på både testresultater og hvordan du faktisk fungerer mellom besøkene. Dersom belastningen blir for stor, justerer vi planen.',
}

/* §5, §11: what happens at the first appointment */
const firstVisit = (duration: string): Block => ({
  kind: 'rows',
  id: 'forste-time',
  heading: 'Hva skjer i første time?',
  rows: [
    {
      label: 'Historien din først',
      value:
        'Jeg vil vite hvordan plagene oppleves, når de startet, hva som utløser eller forverrer dem, og hva du ikke lenger får gjort i hverdagen.',
    },
    {
      label: 'Så undersøkelsen',
      value: 'Deretter velger jeg undersøkelser ut fra det du forteller.',
    },
    { label: 'Varighet', value: `Første konsultasjon varer ${duration}.` },
    { label: 'Henvisning', value: '{{fakta:uten_henvisning}}' },
    { label: 'Bestilling', value: 'Du bestiller gjennom timebestillingen hos Limbra.' },
    {
      label: 'Før du kommer',
      value:
        'Tenk gjerne gjennom når plagene startet, hva som gjør dem verre, og hva du ikke lenger får gjort i hverdagen.',
    },
  ],
  visual: neck,
})

const next = (heading: string, extra: Partial<Extract<Block, { kind: 'next' }>> = {}): Block => ({
  kind: 'next',
  heading,
  steps: [...SITE.steps],
  body: [...SITE.nextBody],
  primary: book,
  phone: true,
  note: SITE.nextNote,
  ...extra,
})

const closing = (body: string[]): Block => ({
  kind: 'closing',
  heading: 'Det er hjelp å få',
  body,
  primary: book,
  phone: true,
  link: { label: 'Les om intensivt opphold', href: '/intensivt-opphold/' },
  visual: {
    type: 'drawing',
    name: 'dagen',
    caption: 'Et intensivt opphold veksler mellom økter og hvile.',
  },
})

/* §12 siblings on the subpages */
const diagnoses = [
  {
    slug: 'svimmelhet/pppd',
    name: 'PPPD',
    hint: 'Vedvarende svimmelhet og ustøhet',
    drawing: 'butikk' as const,
  },
  {
    slug: 'svimmelhet/mdds',
    name: 'MdDS',
    hint: 'Når det føles som om underlaget gynger',
    drawing: 'gynge' as const,
  },
  {
    slug: 'svimmelhet/vestibularisnevritt',
    name: 'Vestibularisnevritt',
    hint: 'Svimmelhet og vestibulær rehabilitering',
    drawing: 'balanse' as const,
  },
  {
    slug: 'svimmelhet/menieres-sykdom',
    name: 'Ménières sykdom',
    hint: 'Informasjon, undersøkelse og rolleavklaring',
    drawing: 'horisont' as const,
  },
]
const siblings = (self: string): Block => ({
  kind: 'siblings',
  heading: SITE.siblingsHeading,
  items: [
    ...diagnoses.filter((d) => d.slug !== self).map((d) => ({ ...d, href: `/${d.slug}/` })),
    SITE.siblingsBack,
  ],
})

/* §5: the shared answer on the four subpages, the diagnosis named first */
const sharedAnswer = (first: string, others: string) =>
  `Jeg møter mange som har vært svimle lenge og som savner en forståelig forklaring. Noen har fått diagnoser som ${first}, ${others}. Andre vet fortsatt ikke hva plagene skyldes. Undersøkelsen begynner med historien din, og jeg velger undersøkelser ut fra det du forteller.`

const urgentFaq: Faq = {
  question: 'Når må svimmelhet vurderes raskt?',
  answer: [
    'Ring {{fakta:akutt_boks}} med en gang hvis du tror det er farlig, eller ved tegn på hjerneslag: problemer med å snakke, smile eller løfte begge armene. Plutselig oppstått kraftig svimmelhet med andre nye nevrologiske symptomer må vurderes raskt av lege eller akutt helsetjeneste.',
  ],
}

const subpage = (p: {
  slug: string
  navLabel: string
  title: string
  description: string
  h1: string
  guarded: string
  answer: string
  drawing: 'butikk' | 'gynge' | 'balanse' | 'horisont'
  caption: string
  condition: { name: string; alternateName?: string }
  text: Block[]
  faqs: Faq[]
}): Page => ({
  slug: p.slug,
  parent: 'svimmelhet',
  navLabel: p.navLabel,
  title: p.title,
  description: p.description,
  h1: p.h1,
  lede: [p.guarded, p.answer],
  emergencyLine: lineDizziness,
  heroCtas: { primary: book, phone: true },
  chips: true,
  heroVisual: { type: 'drawing', name: p.drawing, caption: p.caption },
  schema: 'condition',
  conditions: [p.condition],
  blocks: [
    ...p.text,
    methodDizziness,
    emergencyDizziness,
    roundDizziness,
    firstVisit('{{fakta:varighet_forste_svimmelhet}}'),
    next('Bestill time for svimmelhetsundersøkelse'),
    { kind: 'faq' },
    siblings(p.slug),
  ],
  faqs: p.faqs,
})

export const PAGES: Page[] = [
  /* §4 Forside */
  {
    slug: '',
    navLabel: 'Forside',
    title: 'Olve Lyngset | Kiropraktor i Lillestrøm: svimmelhet og hjernerystelse',
    description:
      'Olve Lyngset er kiropraktor i Lillestrøm. Grundig undersøkelse og individuelt tilpasset oppfølging ved svimmelhet, hjernerystelse og muskel- og skjelettplager.',
    kicker: 'Kiropraktor i {{fakta:by}}',
    h1: 'Svimmelhet, hjernerystelse eller plager som ikke slipper taket?',
    support:
      'Jeg heter {{fakta:behandler_navn}} og er kiropraktor med mer enn {{fakta:erfaring_ar}} års erfaring.',
    lede: [
      'Når symptomene varer lenge, og du fortsatt mangler en forklaring, kan det være vanskelig å vite hvor du skal søke hjelp. Jeg heter {{fakta:behandler_navn}} og er kiropraktor med mer enn {{fakta:erfaring_ar}} års erfaring. Jeg arbeider særlig med svimmelhet, balanseproblemer og langvarige plager etter hjernerystelse, i tillegg til vanlige muskel- og skjelettplager.',
    ],
    picker: {
      heading: 'Finn plagen din',
      ask: 'Har du fått en diagnose?',
      items: [
        {
          label: 'Svimmelhet og balanse',
          short: 'Svimmelhet',
          hint: 'Rotasjon, gynging, ustøhet',
          href: '/svimmelhet/',
          major: true,
        },
        {
          label: 'Plager etter hjernerystelse',
          short: 'Hjernerystelse',
          hint: 'Svimmelhet, hodepine, utmattelse',
          href: '/hjernerystelse/',
          major: true,
        },
        {
          label: 'Intensivt opphold',
          short: 'Intensivt opphold',
          hint: 'Tett oppfølging over flere dager',
          href: '/intensivt-opphold/',
          major: true,
        },
        {
          label: 'Rygg, nakke og andre plager',
          short: 'Rygg og nakke',
          hint: 'Vanlig kiropraktikk',
          href: '/andre-plager/',
          major: true,
        },
        { label: 'PPPD', short: 'PPPD', href: '/svimmelhet/pppd/' },
        { label: 'MdDS', short: 'MdDS', href: '/svimmelhet/mdds/' },
        {
          label: 'Ménières sykdom',
          short: 'Ménières',
          href: '/svimmelhet/menieres-sykdom/',
        },
        {
          label: 'Vestibularisnevritt',
          short: 'Vestibularisnevritt',
          href: '/svimmelhet/vestibularisnevritt/',
        },
        {
          label: 'Krystallsyke',
          short: 'Krystallsyke',
          href: '{{fakta:krystallsyken_url}}',
          external: true,
        },
      ],
    },
    heroCtas: { primary: book, phone: true },
    chips: true,
    schema: 'home',
    faqs: [
      {
        question: 'Tar du også imot vanlige rygg- og nakkeplager?',
        answer: [
          'Ja. I tillegg til svimmelhet og plager etter hjernerystelse undersøker og behandler jeg blant annet plager fra rygg, nakke, skuldre, kjeve, hofter og andre deler av bevegelsesapparatet.',
        ],
      },
      {
        question: 'Trenger jeg henvisning?',
        answer: ['{{fakta:uten_henvisning}}'],
      },
      {
        question: 'Hvordan bestiller jeg time?',
        answer: [
          'Vanlige konsultasjoner bestiller du i timebestillingen hos Limbra. Spørsmål om intensivt rehabiliteringsopphold sender du direkte til meg.',
        ],
      },
      {
        question: 'Hvor ligger klinikken?',
        answer: ['Jeg arbeider ved {{fakta:klinikk_navn}}, {{fakta:adresse}}.'],
      },
    ],
    blocks: [
      {
        kind: 'entries',
        heading: 'To hovedområder',
        items: [
          {
            heading: 'Svimmelhet og balanse',
            body: [
              'Svimmelhet kan oppleves som rotasjon, gynging, ustøhet eller en følelse av at omgivelsene ikke stemmer. Noen har fått en diagnose, mens andre har vært gjennom flere undersøkelser uten å forstå hvorfor plagene fortsetter.',
              'Jeg bruker blant annet øyebevegelsesregistrering, balanseprøver og nevrologiske undersøkelser for å vurdere hvilke funksjoner som kan være påvirket, og hvordan videre oppfølging bør tilpasses.',
            ],
            link: { label: 'Les om svimmelhet og balanse', href: '/svimmelhet/' },
            visual: {
              type: 'drawing',
              name: 'gynge',
              caption: 'For noen snurrer rommet rundt. Andre føler seg ustø eller gynger.',
            },
          },
          {
            heading: 'Langvarige plager etter hjernerystelse',
            body: [
              'Etter en hjernerystelse kan noen oppleve vedvarende svimmelhet, hodepine, konsentrasjonsvansker, synsrelatert ubehag eller utmattelse. Det kan være frustrerende når vanlige undersøkelser ikke gir et tydelig svar.',
              'Jeg ser etter mulige funksjonsavvik, forklarer hva undersøkelsene viser, og hva de ikke kan vise, og vurderer en individuelt tilpasset rehabiliteringsplan.',
            ],
            link: { label: 'Les om plager etter hjernerystelse', href: '/hjernerystelse/' },
            visual: {
              type: 'drawing',
              name: 'sakkade',
              caption: 'Raske øyebevegelser kan måles og sammenlignes over tid.',
            },
          },
        ],
      },
      {
        kind: 'windows',
        statement:
          'At plagene ikke vises på vanlige undersøkelser, betyr ikke at de ikke er reelle.',
        heading: 'En grundig undersøkelse, flere vinduer inn i nervesystemet',
        body: [
          'Jeg bruker ulike tester som gir informasjon om øyebevegelser, balanse, koordinasjon og samspillet mellom sanseinntrykk og bevegelse. Ingen enkelt test forteller hele historien.',
          'Derfor vurderer jeg funnene samlet, prøver ut relevante tiltak og undersøker på nytt hvordan kroppen reagerer.',
        ],
        photo: gogglesWorn,
        panes,
        link: { label: 'Se hvordan en undersøkelse foregår', href: '/undersokelse/' },
      },
      emergencyDizziness,
      {
        kind: 'text',
        heading: 'Gråsonen mellom syk og frisk',
        body: [
          'Noen opplever store begrensninger i hverdagen uten å oppfylle kriteriene for en bestemt diagnose. De er kanskje ikke svimle nok, ustø nok eller utmattet på en måte som passer inn i en tydelig kategori. Likevel kan plagene være svært reelle.',
          'Jeg er opptatt av å undersøke funksjon, også når et resultat ikke regnes som unormalt etter en enkelt testgrense. Et mål kan være at du kjenner deg mer stabil, stoler mer på balansen din og kan gjøre mer av det som er viktig for deg.',
        ],
        visual: {
          type: 'drawing',
          name: 'grasone',
          caption: 'Mellom syk og frisk finnes et stort grått felt.',
        },
      },
      {
        kind: 'profile',
        heading: 'Om meg',
        body: [
          'Jeg arbeider ved {{fakta:klinikk_navn}} i {{fakta:by}}. Jeg ble selv interessert i kiropraktikk etter å ha fått hjelp for ryggplager som ung ishockeyspiller. Siden har nysgjerrigheten på hvordan kroppen og nervesystemet fungerer, drevet meg til videreutdanning og mange år med klinisk arbeid.',
          'Jeg legger vekt på å lytte til historien din, undersøke grundig og forsøke å finne en fornuftig vei videre. Målet er ikke bare bedre testresultater, men at du skal fungere bedre i hverdagen.',
          'Jeg kan ikke love at jeg finner løsningen for alle. Men jeg lover å ta plagene dine på alvor, gjøre en grundig vurdering og være ærlig om hva jeg tror kan hjelpe.',
        ],
        link: { label: 'Bli bedre kjent med Olve', href: '/om-olve/' },
      },
      {
        kind: 'text',
        heading: 'Også vanlig kiropraktikk',
        body: [
          'Jeg undersøker og behandler blant annet plager fra rygg, nakke, skuldre, kjeve, hofter og andre deler av bevegelsesapparatet. Undersøkelse, forventninger og tiltak tilpasses problemet og det du ønsker å oppnå.',
        ],
        visual: neck,
        link: { label: 'Se andre plager jeg arbeider med', href: '/andre-plager/' },
      },
      { kind: 'faq' },
      next('Klar for å ta kontakt?', {
        body: [
          'Du kan bestille en vanlig konsultasjon gjennom timebestillingen hos Limbra. Ved spørsmål om et intensivt rehabiliteringsopphold ber jeg deg kontakte meg direkte, slik at vi kan vurdere behov og praktisk gjennomføring.',
          '{{fakta:uten_henvisning}}',
        ],
        secondary: { label: 'Les om intensivt opphold', href: '/intensivt-opphold/' },
      }),
    ],
  },

  /* §5 Svimmelhet, the hub */
  {
    slug: 'svimmelhet',
    navLabel: 'Svimmelhet',
    title: 'Svimmelhet og balanseproblemer | Olve Lyngset, Lillestrøm',
    description:
      'Langvarig svimmelhet, ustøhet eller balanseproblemer? Les hvordan Olve Lyngset undersøker øyebevegelser, balanse og vestibulær funksjon i Lillestrøm.',
    kicker: 'Langvarig svimmelhet',
    h1: 'Svimmelhet og balanseproblemer',
    lede: [
      'Svimmelhet er ikke én enkelt tilstand. For noen snurrer rommet rundt. Andre føler seg ustø, gynger, blir slitne av å handle i store butikker eller synes det er vanskelig å lese, bruke skjerm eller bevege seg i travle omgivelser. Jeg møter mange som har vært svimle lenge og som savner en forståelig forklaring.',
    ],
    emergencyLine: lineDizziness,
    heroCtas: { primary: book, phone: true },
    chips: true,
    schema: 'condition',
    conditions: [
      { name: 'Svimmelhet' },
      { name: 'PPPD' },
      { name: 'MdDS', alternateName: 'Mal de debarquement syndrome' },
      { name: 'Vestibularisnevritt', alternateName: 'Virus på balansenerven' },
      { name: 'Ménières sykdom' },
    ],
    blocks: [
      {
        kind: 'conditions',
        heading: 'Diagnoser jeg møter',
        intro: [
          'Noen har fått diagnoser som krystallsyke, PPPD, MdDS, vestibularisnevritt eller Ménières sykdom. Andre vet fortsatt ikke hva plagene skyldes.',
        ],
        visual: {
          type: 'drawing',
          name: 'gynge',
          caption: 'For noen snurrer rommet rundt. Andre føler seg ustø eller gynger.',
        },
        items: [
          ...diagnoses.map((d) => ({ name: d.name, hint: d.hint, href: `/${d.slug}/` })),
          {
            name: 'Krystallsyke',
            hint: 'Har sin egen nettside: krystallsyken.no',
            href: '{{fakta:krystallsyken_url}}',
            external: true,
          },
          {
            name: 'Ingen diagnose ennå',
            hint: 'Andre vet fortsatt ikke hva plagene skyldes',
            href: '#undersokelsen',
          },
        ],
      },
      methodDizziness,
      emergencyDizziness,
      {
        kind: 'text',
        heading: 'Ikke all nystagmus er krystallsyke',
        body: [
          'Ufrivillige øyebevegelser, kalt nystagmus, kan forekomme ved flere ulike tilstander. Videobriller gjør det mulig å observere øyebevegelser også uten at pasienten fikserer blikket. Ved mistanke om krystallsyke undersøker jeg dette særskilt, samtidig som jeg vurderer om andre forhold kan være relevante.',
        ],
        visual: {
          type: 'drawing',
          name: 'briller',
          caption: 'Videobriller filmer øynene mens du sitter i mørke.',
        },
      },
      roundDizziness,
      firstVisit('{{fakta:varighet_forste_svimmelhet}}'),
      next('Bestill time for svimmelhetsundersøkelse'),
      { kind: 'faq' },
      closing([
        'Bor du langt unna, eller har du sammensatte plager, kan et intensivt rehabiliteringsopphold være aktuelt.',
      ]),
    ],
    faqs: [
      {
        question: 'Hvordan foregår en undersøkelse av svimmelhet?',
        answer: [
          'Den begynner med historien din: hvordan svimmelheten oppleves, når den startet og hva som utløser den. Deretter velger jeg undersøkelser ut fra det du forteller, for eksempel øyebevegelser med videobriller, balanse og koordinasjon.',
        ],
      },
      {
        question: 'Hvordan finner man ut om det er PPPD?',
        answer: [
          `Ingen enkelt test viser PPPD. Vurderingen bygger på historien din og undersøkelsen samlet.${G}`,
        ],
      },
      urgentFaq,
    ],
  },

  /* §12 PPPD: H1 and angle from §12, shared text from §5; every PPPD sentence waits for Olve */
  subpage({
    slug: 'svimmelhet/pppd',
    navLabel: 'PPPD',
    title: 'PPPD: vedvarende svimmelhet og ustøhet | Olve Lyngset',
    description:
      'PPPD, vedvarende svimmelhet og ustøhet: hvordan kiropraktor Olve Lyngset undersøker svimmelhet, fra historien din til videobriller og balanseprøver.',
    h1: 'PPPD: vedvarende svimmelhet og ustøhet',
    guarded: `PPPD gir svimmelhet og ustøhet som vedvarer, ofte med ubehag i visuelt travle miljøer som store butikker. Ingen enkelt test viser PPPD. Jeg ser historien din og undersøkelsen samlet, og tilpasser rehabiliteringen etter det.${G}`,
    answer: sharedAnswer('PPPD', 'MdDS, vestibularisnevritt eller Ménières sykdom'),
    drawing: 'butikk',
    caption: 'Store butikker og travle omgivelser.',
    condition: { name: 'PPPD', alternateName: 'Vedvarende svimmelhet og ustøhet' },
    text: [
      {
        kind: 'text',
        heading: 'PPPD og diagnose: historien og undersøkelsen samlet',
        body: [
          `Ingen enkelt test viser PPPD. Jeg ser historien din, undersøkelsen og hvordan du reagerer på rehabiliteringen samlet.${G}`,
        ],
      },
    ],
    faqs: [
      {
        question: 'Hva er symptomene på PPPD?',
        answer: [
          `Svimmelhet og ustøhet som vedvarer, ofte med ubehag i visuelt travle miljøer som store butikker.${G}`,
        ],
      },
      {
        question: 'Hvordan finner man ut om det er PPPD?',
        answer: [
          `Ingen enkelt test viser PPPD. Vurderingen bygger på historien din og undersøkelsen samlet.${G}`,
        ],
      },
      urgentFaq,
    ],
  }),

  /* §12 MdDS */
  subpage({
    slug: 'svimmelhet/mdds',
    navLabel: 'MdDS',
    title: 'MdDS: når det føles som om underlaget gynger | Olve Lyngset',
    description:
      'Føles det som om underlaget gynger? Om MdDS, og om hvordan kiropraktor Olve Lyngset undersøker langvarig svimmelhet.',
    h1: 'MdDS: når det føles som om underlaget gynger',
    guarded: `MdDS gir en følelse av at underlaget gynger eller beveger seg. Plagene kan ha sammenheng med reise eller bevegelse. Jeg gjør en grundig vurdering og legger opp oppfølgingen individuelt.${G}`,
    answer: sharedAnswer('MdDS', 'PPPD, vestibularisnevritt eller Ménières sykdom'),
    drawing: 'gynge',
    caption: 'En følelse av at underlaget gynger.',
    condition: { name: 'MdDS', alternateName: 'Mal de debarquement syndrome' },
    text: [
      {
        kind: 'text',
        heading: 'Mal de debarquement syndrome (MdDS)',
        body: [
          `Plagene kan ha sammenheng med reise eller bevegelse. Jeg kan ikke love et bestemt resultat, men jeg gjør en grundig vurdering og legger opp oppfølgingen individuelt.${G}`,
        ],
      },
    ],
    faqs: [
      {
        question: 'Hva er MdDS?',
        answer: [
          `MdDS gir en følelse av at underlaget gynger eller beveger seg. Plagene kan ha sammenheng med reise eller bevegelse.${G}`,
        ],
      },
      urgentFaq,
    ],
  }),

  /* §12 Vestibularisnevritt, helsenorge.no for the medical lines */
  subpage({
    slug: 'svimmelhet/vestibularisnevritt',
    navLabel: 'Vestibularisnevritt',
    title: 'Vestibularisnevritt: svimmelhet og vestibulær rehabilitering | Olve Lyngset',
    description:
      'Vestibularisnevritt og svimmelhet: først nødvendig medisinsk vurdering. Om undersøkelsen av svimmelhet og balanse hos kiropraktor Olve Lyngset.',
    h1: 'Vestibularisnevritt: svimmelhet og vestibulær rehabilitering',
    guarded: `Vestibularisnevritt kalles også virus på balansenerven. Etter nødvendig medisinsk vurdering kan jeg undersøke balansefunksjonen og hvordan kroppen har tilpasset seg, og tilpasse øvelser.${G}`,
    answer: sharedAnswer('vestibularisnevritt', 'PPPD, MdDS eller Ménières sykdom'),
    drawing: 'balanse',
    caption: 'Balanse kan prøves på ulike underlag.',
    condition: { name: 'Vestibularisnevritt', alternateName: 'Virus på balansenerven' },
    text: [
      {
        kind: 'text',
        heading: 'Virus på balansenerven: først medisinsk vurdering',
        body: [
          `Helsenorge anbefaler rask legeundersøkelse, fordi symptomene også kan komme av mer alvorlig sykdom. Etter medisinsk vurdering kan jeg undersøke balansefunksjonen og tilpasse øvelser.${G}`,
        ],
        link: {
          label: 'Kilde: helsenorge.no, Virus på balansenerven',
          href: '{{fakta:kilde_vestibularisnevritt}}',
        },
      },
    ],
    faqs: [
      {
        question: 'Hva bør jeg gjøre først ved virus på balansenerven?',
        answer: [
          `Gå til lege. Helsenorge anbefaler rask legeundersøkelse, fordi symptomene også kan komme av mer alvorlig sykdom. Etter medisinsk vurdering kan jeg undersøke balansefunksjonen.${G}`,
        ],
      },
      urgentFaq,
    ],
  }),

  /* §12 Ménières sykdom, helsenorge.no for the medical lines */
  subpage({
    slug: 'svimmelhet/menieres-sykdom',
    navLabel: 'Ménières sykdom',
    title: 'Ménières sykdom og svimmelhet | Olve Lyngset, Lillestrøm',
    description:
      'Ménières sykdom og svimmelhet: om undersøkelsen av svimmelhet og balanse hos kiropraktor Olve Lyngset, med videobriller og balanseprøver.',
    h1: 'Ménières sykdom og svimmelhet',
    guarded: `Ménières sykdom gir anfall av kraftig svimmelhet, ofte sammen med hørselstap, øresus og trykk i øret. Diagnosen stilles av lege, ofte etter henvisning til øre-nese-hals-lege. Min rolle kan være å vurdere balansefunksjonen og følge opp, ikke å behandle selve sykdomsårsaken.${G}`,
    answer: sharedAnswer('Ménières sykdom', 'PPPD, MdDS eller vestibularisnevritt'),
    drawing: 'horisont',
    caption: 'Øyebevegelsene sier mye om balansen.',
    condition: { name: 'Ménières sykdom' },
    text: [
      {
        kind: 'text',
        heading: 'Symptomer ved Ménières sykdom',
        body: [
          `Ménières sykdom gir anfall av kraftig svimmelhet, ofte sammen med hørselstap, øresus og trykk i øret. Diagnosen stilles av lege, ofte etter henvisning til øre-nese-hals-lege.${G}`,
        ],
        link: {
          label: 'Kilde: helsenorge.no, Ménières sykdom',
          href: 'https://www.helsenorge.no/sykdom/svimmelhet-og-balanseforstyrrelser/menieres-sykdom/',
        },
      },
    ],
    faqs: [
      {
        question: 'Hvordan stilles diagnosen Ménières sykdom?',
        answer: [
          `Diagnosen stilles av lege, ofte etter henvisning til øre-nese-hals-lege. Min rolle kan være å vurdere balansefunksjonen og følge opp.${G}`,
        ],
      },
      urgentFaq,
    ],
  }),

  /* §6 Langvarige plager etter hjernerystelse */
  {
    slug: 'hjernerystelse',
    navLabel: 'Hjernerystelse',
    title: 'Langvarige plager etter hjernerystelse og postcommotio | Olve Lyngset',
    description:
      'Langvarige plager etter hjernerystelse, som svimmelhet, hodepine eller utmattelse? Olve Lyngset i Lillestrøm tilbyr grundig funksjonsundersøkelse og tilpasset oppfølging.',
    kicker: 'Langvarige plager etter hjernerystelse',
    h1: 'Når plagene etter hjernerystelsen ikke går over',
    lede: [
      'De fleste kommer seg etter en hjernerystelse, men noen får plager som varer lenge. Det kan dreie seg om svimmelhet, hodepine, ubehag ved skjermbruk, vansker med konsentrasjon, redusert toleranse for aktivitet eller en følelse av at kroppen ikke fungerer som før.',
    ],
    emergencyLine: lineHeadInjury,
    heroCtas: { primary: book, phone: true },
    chips: true,
    heroVisual: {
      type: 'drawing',
      name: 'sakkade',
      caption: 'Raske øyebevegelser kan måles og sammenlignes over tid.',
    },
    schema: 'condition',
    conditions: [
      { name: 'Langvarige plager etter hjernerystelse', alternateName: 'Postcommotio syndrom' },
    ],
    blocks: [
      emergencyConcussion,
      {
        kind: 'windows',
        statement: 'At en undersøkelse er normal, betyr ikke at symptomene er innbilte.',
        heading: 'Jeg ser etter funksjon, ikke bare diagnoser',
        body: [
          'Mange jeg møter, forteller at de savner en forklaringsmodell. Noen føler også at de ikke blir trodd, fordi vanlige undersøkelser ikke har vist noe tydelig galt.',
          'Jeg undersøker blant annet øyebevegelser, balanse, koordinasjon og hvordan nervesystemet reagerer på ulike oppgaver. Enkelte tester gir målbare resultater som kan sammenlignes over tid. Andre krever mer klinisk tolkning.',
        ],
        photo: {
          type: 'photo',
          name: 'vogPasient',
          inset: 'videobriller',
          caption: 'Videobriller over øynene. Innfelt: øyebevegelser filmet med videobriller.',
        },
        panes,
        link: { label: 'Slik undersøker jeg', href: '/undersokelse/' },
      },
      {
        kind: 'text',
        heading: 'Rehabilitering etter hjernerystelse: en plan som tåler hverdagen',
        body: [
          'Hvis jeg finner avvik som kan ha sammenheng med plagene dine, viser og forklarer jeg hva jeg har funnet. Jeg er samtidig tydelig på at et testavvik ikke automatisk forklarer alle symptomene.',
          'Rehabiliteringen tilpasses det du tåler og det vi observerer underveis. Målet er å finne et nivå der du kan gjennomføre øvelsene med god margin, før vi eventuelt øker belastningen. Vi tar hensyn til hvordan du reagerer både under og etter aktivitet.',
          'Jeg følger utviklingen gjennom nye undersøkelser og, viktigst, gjennom det du forteller om funksjonen din i hverdagen. Kan du lese lenger, være mer sammen med familien eller gjøre mer uten å bli utslått etterpå?',
        ],
        visual: {
          type: 'drawing',
          name: 'syklus',
          caption: 'Undersøk, prøv, og undersøk på nytt.',
        },
      },
      {
        kind: 'text',
        heading: '«Jeg har ikke fått prøve meg ennå»',
        body: [
          'Når noen har forsøkt mye uten å få tilstrekkelig hjelp, forstår jeg at det kan være vanskelig å bevare håpet. Jeg kan ikke love et bestemt resultat. Men jeg kan tilby en grundig vurdering og se om min tilnærming kan gi oss en nyttig vei videre.',
        ],
      },
      firstVisit('{{fakta:varighet_forste_hjernerystelse}}'),
      next('Bestill vurdering'),
      { kind: 'faq' },
      {
        kind: 'closing',
        heading: 'Langvarig hjernerystelse og lang reisevei',
        body: [
          'For enkelte med langvarige plager kan et intensivt rehabiliteringsopphold i {{fakta:by}} være aktuelt. Dette planlegges individuelt og avtales direkte med meg.',
        ],
        primary: book,
        phone: true,
        link: { label: 'Les om intensivt rehabiliteringsopphold', href: '/intensivt-opphold/' },
        visual: {
          type: 'drawing',
          name: 'dagen',
          caption: 'Et intensivt opphold veksler mellom økter og hvile.',
        },
      },
    ],
    faqs: [
      {
        question: 'Hva er postcommotio syndrom?',
        answer: [
          'Postcommotio og postcommotiosyndrom er faguttrykk for plager som varer etter en hjernerystelse, for eksempel svimmelhet, hodepine, konsentrasjonsvansker eller utmattelse. Plagene kan ha ulike forklaringer, og jeg legger ikke én forklaringsmodell til grunn for alle.',
        ],
      },
      {
        question:
          'Hvordan foregår behandling og oppfølging av plager etter hjernerystelse hos deg?',
        answer: [
          'Jeg undersøker funksjon, forklarer funnene og vurderer en individuelt tilpasset rehabiliteringsplan. Belastningen tilpasses det du tåler, og jeg følger med på hvordan du fungerer i hverdagen. Jeg kan ikke love et bestemt resultat.',
        ],
      },
    ],
  },

  /* §8 Undersøkelse og metoder: the method hub */
  {
    slug: 'undersokelse',
    navLabel: 'Undersøkelsen',
    title: 'Grundig undersøkelse av svimmelhet og balanse | Olve Lyngset',
    description:
      'VNG-undersøkelse med videobriller, sakkadometer og balanseprøver: slik undersøker Olve Lyngset svimmelhet og plager etter hjernerystelse i Lillestrøm.',
    kicker: 'VNG-undersøkelse, sakkadometer og balanse',
    heroVisual: {
      type: 'drawing',
      name: 'briller',
      caption: 'Videobriller filmer øynene i mørke.',
    },
    h1: 'Flere vinduer inn i nervesystemet',
    lede: [
      'Når jeg undersøker langvarig svimmelhet eller plager etter hjernerystelse, prøver jeg å få informasjon fra flere ulike funksjoner. Ingen enkelt test gir hele svaret.',
    ],
    heroCtas: { primary: book, phone: true },
    chips: true,
    schema: 'page',
    faqs: [
      {
        question: 'Hva er en VNG-undersøkelse?',
        answer: [
          'Jeg setter på deg et par briller slik at jeg kan se på øynene dine i mørket. Med videobrillene kan jeg observere og ved behov gjøre opptak av øyebevegelser, blant annet nystagmus. Funnene vurderes sammen med historien din og de andre testene.',
        ],
      },
      {
        question: 'Hva måler et sakkadometer?',
        answer: [
          'Egenskaper ved raske øyebevegelser, for eksempel reaksjonstid, hastighet og presisjon. Resultatene vurderes sammen med øvrige funn og symptomene dine.',
        ],
      },
      {
        question: 'Hvorfor brukes flere ulike tester?',
        answer: [
          'Ingen enkelt test forteller hele historien. Derfor vurderer jeg funnene samlet, prøver ut relevante tiltak og undersøker på nytt hvordan kroppen reagerer.',
        ],
      },
    ],
    blocks: [
      {
        kind: 'windows',
        heading: 'Dette undersøker jeg',
        body: [
          'Jeg vurderer funnene samlet, prøver ut relevante tiltak og undersøker på nytt hvordan kroppen reagerer.',
        ],
        panes,
        closing:
          'Testresultater er nyttige, men bedre funksjon i hverdagen er det viktigste målet.',
      },
      {
        kind: 'text',
        id: 'videobriller',
        heading: 'Videobriller ved svimmelhet: VOG/VNG',
        quote: '«Jeg skal sette på deg et par briller slik at jeg kan se på øynene dine i mørket.»',
        body: [
          'Med videobriller kan jeg observere og ved behov gjøre opptak av øyebevegelser, blant annet nystagmus. Det kan være nyttig når jeg skal skille mellom ulike mønstre av svimmelhet eller følge endringer over tid.',
        ],
        visual: gogglesWorn,
      },
      {
        kind: 'text',
        id: 'sakkadometer',
        heading: 'Måling av raske øyebevegelser med sakkadometer',
        body: [
          'Med et sakkadometer kan jeg undersøke egenskaper ved raske øyebevegelser, for eksempel reaksjonstid, hastighet og presisjon. Resultatene vurderes sammen med øvrige funn og pasientens symptomer.',
        ],
        visual: {
          type: 'drawing',
          name: 'sakkade',
          caption: 'En rask øyebevegelse: reaksjonstid, hastighet og presisjon.',
        },
      },
      {
        kind: 'text',
        id: 'balanse',
        heading: 'Balanse, koordinasjon og blikkstabilisering',
        body: [
          'Avhengig av problemstillingen kan jeg undersøke balanse på ulike underlag, koordinasjon, evnen til å følge et mål med blikket og samspillet mellom hode- og øyebevegelser.',
        ],
        visual: {
          type: 'drawing',
          name: 'balanse',
          caption: 'Balanse kan prøves på ulike underlag.',
        },
      },
      emergencyDizziness,
      {
        kind: 'round',
        heading: 'Undersøk, prøv, undersøk på nytt',
        body: [],
        steps: roundSteps,
      },
      {
        kind: 'rows',
        id: 'hvorfor',
        heading: 'Hvorfor jeg undersøker slik',
        rows: [
          {
            label: 'Flere målinger',
            value:
              'Ingen enkelt test forteller hele historien. Derfor vurderer jeg funnene samlet.',
          },
          {
            label: 'Ny test underveis',
            value: 'Jeg prøver ut relevante tiltak og undersøker på nytt hvordan kroppen reagerer.',
          },
          {
            label: 'Tid til historien',
            value:
              'Jeg legger vekt på å lytte til historien din, undersøke grundig og forsøke å finne en fornuftig vei videre.',
          },
          {
            label: 'Hverdagen er målet',
            value:
              'Målet er ikke bare bedre testresultater, men at du skal fungere bedre i hverdagen.',
          },
          {
            label: 'Bakgrunn',
            value:
              'Mer enn {{fakta:erfaring_ar}} års klinisk erfaring, videreutdanning i funksjonell nevrologi, blant annet gjennom Carrick Institute, og fordypning i vestibulær rehabilitering.',
          },
          {
            label: 'DACNB',
            value:
              'Jeg har bestått eksamen til DACNB (Diplomate of the American Chiropractic Neurology Board).{{bekreft:dacnb}}',
          },
        ],
        visual: neck,
      },
      { kind: 'faq' },
      next('Svimmelhet: undersøkelse hos meg', {
        secondary: { label: 'Les om svimmelhet', href: '/svimmelhet/' },
      }),
    ],
  },

  /* §7 Intensivt rehabiliteringsopphold */
  {
    slug: 'intensivt-opphold',
    navLabel: 'Intensivt opphold',
    title: 'Intensivt rehabiliteringsopphold ved svimmelhet og hjernerystelse',
    description:
      'Tilpasset intensivt rehabiliteringsopphold i Lillestrøm for utvalgte pasienter med langvarig svimmelhet eller plager etter hjernerystelse. Kontakt Olve Lyngset.',
    h1: 'Intensivt rehabiliteringsopphold i Lillestrøm',
    lede: [
      'Bor du langt unna, eller har du sammensatte plager som krever tett oppfølging over flere dager? For enkelte pasienter tilbyr jeg et individuelt planlagt rehabiliteringsopphold i {{fakta:by}}.',
      'Dette kan være aktuelt ved langvarig svimmelhet, blant annet PPPD og MdDS, eller ved vedvarende plager etter hjernerystelse. Om et slikt opplegg passer for deg, må vurderes individuelt.',
    ],
    heroCtas: { phone: true },
    heroVisual: { type: 'drawing', name: 'dagen', caption: 'Økter med hvile mellom.' },
    schema: 'service',
    faqs: [
      {
        question: 'Hvor lenge varer et rehabiliteringsopphold hos deg?',
        answer: ['Et opphold varer ofte {{fakta:opphold_varighet}}. Det planlegges individuelt.'],
      },
      {
        question: 'Hvordan får jeg et rehabiliteringsopphold?',
        answer: [
          'Ta kontakt med meg direkte, slik at vi kan vurdere behov og praktisk gjennomføring. Opplegget kan ikke bestilles som en vanlig nett-time.',
        ],
      },
      {
        question: 'Hvem kan et intensivt opphold passe for?',
        answer: [
          'Det kan være aktuelt ved langvarig svimmelhet, blant annet PPPD og MdDS, eller ved vedvarende plager etter hjernerystelse. Om et slikt opplegg passer for deg, må vurderes individuelt.',
        ],
      },
    ],
    blocks: [
      {
        kind: 'rows',
        heading: 'Slik kan et intensivt opphold foregå',
        rows: [
          { label: 'Varighet', value: 'Et opphold varer ofte {{fakta:opphold_varighet}}.' },
          {
            label: 'Økter',
            value:
              'I løpet av dagen kan vi gjennomføre {{fakta:opphold_okter}}, med hvile mellom øktene.',
          },
          {
            label: 'Innhold',
            value:
              'Innholdet justeres etter undersøkelsesfunn, symptomer og reaksjon på belastningen.',
          },
          {
            label: 'Målet',
            value:
              'Målet er ikke at alle plagene skal være borte etter oppholdet. Målet er å komme nærmere en nyttig forståelse av funksjonen din, finne øvelser som ser ut til å passe og lage en plan du kan arbeide videre med hjemme.',
          },
          {
            label: 'Etterpå',
            value: 'Ved avslutning får du skriftlige øvelser. Videre kontakt kan foregå på e-post.',
          },
          {
            label: 'Nytt besøk',
            value: 'For noen er det aktuelt med et nytt besøk etter {{fakta:opphold_nytt_besok}}.',
          },
        ],
        visual: {
          type: 'drawing',
          name: 'syklus',
          caption: 'Undersøk, prøv, og undersøk på nytt.',
        },
      },
      {
        kind: 'text',
        heading: 'Praktisk',
        body: [
          'Du må selv ordne overnatting, for eksempel hos familie eller venner, eller på hotell i nærheten av klinikken.',
          'Opplegget krever særskilt planlegging og kan ikke bestilles som en vanlig nett-time.',
          '{{fakta:nedslagsfelt}}.',
        ],
      },
      { kind: 'faq' },
      {
        kind: 'next',
        id: 'foresporsel',
        heading: 'Send forespørsel om intensivt opphold',
        steps: [
          'Ta kontakt med meg direkte.',
          'Vi vurderer behov og praktisk gjennomføring.',
          'Oppholdet planlegges individuelt.',
        ],
        body: [
          'Fortell kort hva slags plager du ønsker vurdert, hvor du bor og om du ønsker et intensivt opphold. Ikke send følsomme helseopplysninger eller journaler i vanlig e-post. Vi avtaler en tryggere måte å utveksle nødvendig informasjon på dersom det blir aktuelt.',
          'Skriv til {{fakta:epost}} med emnet «{{fakta:epost_emne}}».',
        ],
        phone: true,
        note: SITE.nextNote,
      },
    ],
  },

  /* §9 Andre plager */
  {
    slug: 'andre-plager',
    navLabel: 'Andre plager',
    title: 'Kiropraktor i Lillestrøm: rygg, nakke og hodepine | Olve Lyngset',
    description:
      'Kiropraktor i Lillestrøm for rygg, nakke, hodepine, skulder, kjeve og andre muskel- og skjelettplager. Olve Lyngset ved Limbra Storgata.',
    kicker: 'Kiropraktor i {{fakta:by}}',
    h1: 'Kiropraktikk for rygg, nakke og andre muskel- og skjelettplager',
    lede: [
      'Selv om jeg har fordypet meg i svimmelhet og funksjonell nevrologi, arbeider jeg også med det mange forbinder med vanlig kiropraktikk: smerter og funksjonsproblemer i rygg, nakke, skuldre, kjeve, hofter og andre ledd.',
    ],
    heroCtas: { primary: book, phone: true },
    chips: true,
    schema: 'service',
    faqs: [
      {
        question: 'Kan jeg gå til kiropraktor uten henvisning?',
        answer: ['{{fakta:uten_henvisning}}'],
      },
      {
        question: 'Hvilke behandlingsformer bruker du?',
        answer: [
          'Når det er hensiktsmessig, kan behandlingen omfatte justeringer eller korrigeringer, øvelser og råd om aktivitet. Jeg undersøker gjerne funksjonen på nytt for å vurdere responsen.',
        ],
      },
      {
        question: 'Hva gjør du hvis utviklingen uteblir?',
        answer: [
          'Da vurderer jeg behov for videre undersøkelser eller henvisning til annen behandler.',
        ],
      },
    ],
    blocks: [
      {
        kind: 'text',
        heading: 'Slik undersøker og behandler jeg',
        body: [
          'Jeg begynner med å høre hvordan plagene oppsto, hva som provoserer dem, og hvordan de påvirker deg. Deretter undersøker jeg blant annet bevegelighet, leddfunksjon og relevante ortopediske og nevrologiske forhold.',
          'Når det er hensiktsmessig, kan behandlingen omfatte justeringer eller korrigeringer, øvelser og råd om aktivitet. Jeg undersøker gjerne funksjonen på nytt for å vurdere responsen.',
          'Ved langvarige eller sammensatte problemer er jeg tydelig på forventninger. Hvis utviklingen uteblir, vurderer jeg behov for videre undersøkelser eller henvisning til annen behandler.',
        ],
        visual: neck,
      },
      {
        kind: 'text',
        heading: 'Eksempler på plager',
        body: [],
        list: [
          'Ryggsmerter og stivhet',
          'Nakkeplager og nakkesmerter',
          'Hodepine, blant annet mulig nakkerelatert hodepine',
          'Skulderplager og skuldersmerter',
          'Kjeveplager',
          'Hofte-, kne- og ankelplager',
        ],
      },
      { kind: 'faq' },
      next('Lillestrøm kiropraktor: bestill time', {
        primary: book,
        body: [
          'Jeg tar imot pasienter ved {{fakta:klinikk_navn}} i {{fakta:by}}. Du bestiller gjennom timebestillingen hos Limbra. {{fakta:uten_henvisning}}',
        ],
      }),
    ],
  },

  /* §10 Om Olve */
  {
    slug: 'om-olve',
    navLabel: 'Om Olve',
    title: 'Om Olve Lyngset, kiropraktor i Lillestrøm',
    description:
      'Olve Lyngset er kiropraktor i Lillestrøm med mer enn {{fakta:erfaring_ar}} års klinisk erfaring og videreutdanning i funksjonell nevrologi og vestibulær rehabilitering.',
    h1: 'Om Olve Lyngset',
    lede: [
      'Jeg hadde egentlig sett for meg en annen yrkesvei. Som ung spilte jeg ishockey, og etter en takling fikk jeg ryggplager. Hjelpen jeg fikk hos en kiropraktor, gjorde så sterkt inntrykk at jeg bestemte meg for å bli kiropraktor selv.',
    ],
    heroVisual: {
      type: 'photo',
      name: 'portrett',
      caption: '{{fakta:behandler_navn}} ved {{fakta:klinikk_navn}}',
    },
    heroCtas: { primary: book, phone: true },
    schema: 'about',
    faqs: [
      {
        question: 'Hvor mye erfaring har du?',
        answer: ['Jeg har arbeidet klinisk i mer enn {{fakta:erfaring_ar}} år.'],
      },
      {
        question: 'Er du medlem av Norsk Kiropraktorforening?',
        answer: ['Ja. {{fakta:nkf_medlem}}.'],
      },
      {
        question: 'Hva er DACNB?',
        answer: [
          'DACNB står for Diplomate of the American Chiropractic Neurology Board. Jeg har bestått eksamen til DACNB.{{bekreft:dacnb}}',
        ],
      },
    ],
    blocks: [
      {
        kind: 'rows',
        heading: 'Utdanning og erfaring',
        rows: [
          {
            label: 'Starten',
            value:
              'Det var moren min som tok meg med til kiropraktor Gunn Austlid i {{fakta:by}}.{{bekreft:navngitte_personer}}',
          },
          {
            label: 'Utdanning',
            value:
              'Jeg utdannet meg i {{fakta:utdanning_sted}}, og hadde praksis hos Finn Morten Halle ved Stabekk kiropraktiske klinikk.{{bekreft:navngitte_personer}}',
          },
          {
            label: 'Erfaring',
            value: 'Jeg har arbeidet klinisk i mer enn {{fakta:erfaring_ar}} år.',
          },
          { label: 'Medlem', value: '{{fakta:nkf_medlem}}.' },
          {
            label: 'Videreutdanning',
            value:
              'Nysgjerrigheten på nervesystemet førte meg videre til etterutdanning, blant annet gjennom Carrick Institute, og til fordypning i vestibulær rehabilitering.',
          },
          {
            label: 'DACNB',
            value:
              'Jeg har bestått eksamen til DACNB (Diplomate of the American Chiropractic Neurology Board).{{bekreft:dacnb}}',
          },
          {
            label: 'Kurs og opphold',
            value:
              'Mye av undervisningen hos Carrick Institute foregikk i Amsterdam, og jeg har deltatt på kliniske opphold i Atlanta i USA.{{bekreft:videreutdanning_detaljer}}',
          },
          {
            label: 'Undervisning',
            value:
              'Jeg har undervist og holdt foredrag for kolleger og andre om blant annet svimmelhet og funksjonell nevrologi.',
          },
        ],
      },
      {
        kind: 'text',
        heading: 'Hva som driver meg',
        body: [
          'Det som betyr mest for meg, er når en pasient føler seg sett, får en forståelig forklaring og opplever at hverdagen blir lettere. Jeg liker å lete etter sammenhenger, undersøke grundig og finne en plan vi kan arbeide med sammen.',
          'Jeg er ikke den rette behandleren for alle. Noen ganger må vi endre kurs, og noen ganger er det best å henvise videre. Men jeg ønsker at du skal oppleve at plagene dine blir tatt på alvor.',
          'Jeg arbeider ved {{fakta:klinikk_navn}} i {{fakta:by}}. Denne nettsiden er min personlige faglige nettside.',
        ],
        visual: neck,
      },
      { kind: 'faq' },
      next('Bestill time eller kontakt meg', {
        body: [
          'Vanlige konsultasjoner bestilles gjennom Limbra. Spørsmål om intensivt opphold sender du direkte til meg.',
        ],
        secondary: { label: 'Les om intensivt opphold', href: '/intensivt-opphold/' },
      }),
    ],
  },

  /* §11 Praktisk og kontakt (and §15 booking flow) */
  {
    slug: 'kontakt',
    navLabel: 'Kontakt',
    title: 'Kontakt og timebestilling | Olve Lyngset, Lillestrøm',
    description:
      'Bestill time hos kiropraktor Olve Lyngset ved Limbra Storgata i Lillestrøm, eller send forespørsel om intensivt rehabiliteringsopphold.',
    h1: 'Bestill time hos Olve Lyngset',
    lede: ['Jeg tar imot pasienter ved {{fakta:klinikk_navn}} i {{fakta:by}}.'],
    heroCtas: { primary: book, phone: true },
    schema: 'contact',
    faqs: [
      {
        question: 'Hvor lang er første konsultasjon?',
        answer: [
          'Ved svimmelhetsundersøkelse varer den {{fakta:varighet_forste_svimmelhet}}. Ved langvarige plager etter hjernerystelse varer den {{fakta:varighet_forste_hjernerystelse}}.',
        ],
      },
      {
        question: 'Kan jeg sende journaler på e-post?',
        answer: [
          'Nei. Ikke send fødselsnummer, journaler eller detaljerte helseopplysninger i vanlig e-post. Dersom det blir aktuelt, avtaler vi en tryggere måte å utveksle nødvendig informasjon på.',
        ],
      },
      {
        question: 'Trenger jeg henvisning?',
        answer: ['{{fakta:uten_henvisning}}'],
      },
    ],
    blocks: [
      next('Slik bestiller du', {
        body: [
          'Vanlig konsultasjon bestilles fortrinnsvis via timebestillingen hos Limbra. {{fakta:uten_henvisning}}',
        ],
      }),
      {
        kind: 'rows',
        heading: 'Adresse, telefon og åpningstider',
        link: { label: 'Vis i kart', href: '{{fakta:kart_lenke}}' },
        rows: [
          { label: 'Adresse', value: '{{fakta:klinikk_navn}}, {{fakta:adresse}}' },
          { label: 'Telefon', value: '{{fakta:telefon}}' },
          { label: 'Åpningstider', value: '{{fakta:apningstider}}' },
          { label: 'Inngang og parkering', value: '{{fakta:parkering_inngang}}' },
          { label: 'Henvisning', value: '{{fakta:uten_henvisning}}' },
          {
            label: 'Intensivt rehabiliteringsopphold',
            value: 'Kontakt meg direkte på {{fakta:epost}}.',
          },
          {
            label: 'Første konsultasjon, svimmelhet',
            value: '{{fakta:varighet_forste_svimmelhet}}',
          },
          {
            label: 'Første konsultasjon, hjernerystelse',
            value: '{{fakta:varighet_forste_hjernerystelse}}',
          },
        ],
        note: [
          'Ikke send fødselsnummer, journaler eller detaljerte helseopplysninger i vanlig e-post.',
        ],
      },
      {
        kind: 'text',
        heading: 'Før du kommer',
        body: [
          'Ved svimmelhet eller plager etter hjernerystelse begynner jeg med historien din. Tenk gjerne gjennom når plagene startet, hva som gjør dem verre, og hva du ikke lenger får gjort i hverdagen.',
        ],
        visual: {
          type: 'drawing',
          name: 'horisont',
          caption: 'Øyebevegelsene sier mye om balansen.',
        },
        link: { label: 'Slik undersøker jeg', href: '/undersokelse/' },
      },
      { kind: 'faq' },
    ],
  },

  /* Personvern: what the site itself does (no forms, no cookies, no analytics), plus §11 advice */
  {
    slug: 'personvern',
    navLabel: 'Personvern',
    title: 'Personvern | Olve Lyngset',
    description:
      'Hvilke opplysninger nettsiden til Olve Lyngset samler inn, og hvordan du bør sende helseopplysninger.',
    h1: 'Personvern',
    lede: [
      'Denne nettsiden har ingen skjema, ingen informasjonskapsler og ingen besøksstatistikk. Den teller bare klikk på «Bestill time».',
    ],
    schema: 'page',
    blocks: [
      {
        kind: 'text',
        heading: 'Når du tar kontakt',
        body: [
          'Ikke send fødselsnummer, journaler eller detaljerte helseopplysninger i vanlig e-post. Dersom det blir aktuelt, avtaler vi en tryggere måte å utveksle nødvendig informasjon på.',
          'Timebestilling skjer hos Limbra, som har egne regler for personvern.',
        ],
      },
      {
        kind: 'text',
        heading: 'Når du trykker «Bestill time»',
        body: [
          'Knappen går via en side på denne nettsiden som teller klikket og sender deg videre til timebestillingen hos Limbra. Telleren skriver ned hvilken side klikket kom fra, og når. Vercel, som driver nettsiden, fører i tillegg vanlige tekniske logger over forespørsler.',
        ],
      },
      {
        kind: 'text',
        heading: 'Behandlingsansvarlig',
        body: ['Behandlingsansvarlig for nettsiden er {{fakta:behandlingsansvarlig}}.'],
      },
    ],
  },
]

export const pageBySlug = (slug: string) => PAGES.find((p) => p.slug === slug)
