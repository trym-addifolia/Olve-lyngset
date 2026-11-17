import { site } from '@/site.config'
import { t } from '../helpers'
import { SRC } from '../sources'
import type { HomeContent } from '../types'

/**
 * The home page, both directions (arbeidsdokument §4 in full, dashes rewritten
 * with commas and colons). The practical lines come from the facts already
 * confirmed for krystallsyken.no and §11; the FAQ answers only what this page
 * itself says.
 */
export const HOME_CONTENT: HomeContent = {
  kind: 'home',
  hero: {
    lede: [
      t(
        'Når symptomene varer lenge, og du fortsatt mangler en forklaring, kan det være vanskelig å vite hvor du skal søke hjelp. Jeg heter Olve Lyngset og er kiropraktor med mer enn 30 års erfaring. Jeg arbeider særlig med svimmelhet, balanseproblemer og langvarige plager etter hjernerystelse, i tillegg til vanlige muskel- og skjelettplager.',
        SRC.doc(4),
      ),
      t(
        'Jeg legger vekt på å lytte til historien din, undersøke grundig og forsøke å finne en fornuftig vei videre. Målet er ikke bare bedre testresultater, men at du skal fungere bedre i hverdagen.',
        SRC.doc(4),
      ),
    ],
    secondary: { label: 'Slik undersøker jeg', href: '/undersokelse' },
  },

  motto: t('Det er hjelp å få.', SRC.doc(2)),

  doors: [
    {
      id: 'svimmelhet-og-balanse',
      heading: 'Svimmelhet og balanse',
      lede: t(
        'Svimmelhet kan oppleves som rotasjon, gynging, ustøhet eller en følelse av at omgivelsene ikke stemmer. Noen har fått en diagnose, mens andre har vært gjennom flere undersøkelser uten å forstå hvorfor plagene fortsetter.',
        SRC.doc(4),
      ),
      body: [
        t(
          'Jeg bruker blant annet øyebevegelsesregistrering, balanseprøver og nevrologiske undersøkelser for å vurdere hvilke funksjoner som kan være påvirket, og hvordan videre oppfølging bør tilpasses.',
          SRC.doc(4),
        ),
      ],
      link: { href: '/svimmelhet', label: 'Les om svimmelhet og balanse' },
    },
    {
      id: 'plager-etter-hjernerystelse',
      heading: 'Langvarige plager etter hjernerystelse',
      lede: t(
        'Etter en hjernerystelse kan noen oppleve vedvarende svimmelhet, hodepine, konsentrasjonsvansker, synsrelatert ubehag eller utmattelse. Det kan være frustrerende når vanlige undersøkelser ikke gir et tydelig svar.',
        SRC.doc(4),
      ),
      quote: t(
        'At plagene ikke vises på vanlige undersøkelser, betyr ikke at de ikke er reelle.',
        SRC.doc(4),
      ),
      body: [
        t(
          'Jeg ser etter mulige funksjonsavvik, forklarer hva undersøkelsene viser, og hva de ikke kan vise, og vurderer en individuelt tilpasset rehabiliteringsplan.',
          SRC.doc(4),
        ),
      ],
      link: { href: '/hjernerystelse', label: 'Les om plager etter hjernerystelse' },
    },
  ],

  general: {
    id: 'vanlig-kiropraktikk',
    heading: 'Også vanlig kiropraktikk',
    body: [
      t(
        'Jeg undersøker og behandler blant annet plager fra rygg, nakke, skuldre, kjeve, hofter og andre deler av bevegelsesapparatet. Undersøkelse, forventninger og tiltak tilpasses problemet og det du ønsker å oppnå.',
        SRC.doc(4),
      ),
    ],
    link: { href: '/andre-plager', label: 'Se andre plager jeg arbeider med' },
  },

  examination: {
    id: 'undersokelse',
    heading: 'En grundig undersøkelse',
    subheading: 'Flere vinduer inn i nervesystemet',
    body: [
      t(
        'Jeg bruker ulike tester som gir informasjon om øyebevegelser, balanse, koordinasjon og samspillet mellom sanseinntrykk og bevegelse. Ingen enkelt test forteller hele historien. Derfor vurderer jeg funnene samlet, prøver ut relevante tiltak og undersøker på nytt hvordan kroppen reagerer.',
        SRC.doc(4),
      ),
    ],
    link: { href: '/undersokelse', label: 'Se hvordan en undersøkelse foregår' },
  },

  greyZone: {
    id: 'graasonen',
    heading: 'Gråsonen mellom syk og frisk',
    body: [
      t(
        'Noen opplever store begrensninger i hverdagen uten å oppfylle kriteriene for en bestemt diagnose. De er kanskje ikke svimle nok, ustø nok eller utmattet på en måte som passer inn i en tydelig kategori. Likevel kan plagene være svært reelle.',
        SRC.doc(4),
      ),
      t(
        'Jeg er opptatt av å undersøke funksjon, også når et resultat ikke regnes som unormalt etter en enkelt testgrense. Et mål kan være at du kjenner deg mer stabil, stoler mer på balansen din og kan gjøre mer av det som er viktig for deg.',
        SRC.doc(4),
      ),
    ],
  },

  about: {
    id: 'om-meg',
    heading: 'Om meg',
    body: [
      t(
        'Jeg heter Olve Lyngset, er kiropraktor og DACNB, og arbeider ved Limbra Storgata i Lillestrøm. Jeg ble selv interessert i kiropraktikk etter å ha fått hjelp for ryggplager som ung ishockeyspiller. Siden har nysgjerrigheten på hvordan kroppen og nervesystemet fungerer, drevet meg til videreutdanning og mange år med klinisk arbeid.',
        SRC.doc(4),
      ),
    ],
    promise: t(
      'Jeg kan ikke love at jeg finner løsningen for alle. Men jeg lover å ta plagene dine på alvor, gjøre en grundig vurdering og være ærlig om hva jeg tror kan hjelpe.',
      SRC.doc(4),
    ),
    link: { href: '/om-olve', label: 'Bli bedre kjent med Olve' },
  },

  closing: {
    heading: 'Klar for å ta kontakt?',
    lede: 'Du kan bestille en vanlig konsultasjon gjennom timebestillingen hos Limbra. Ved spørsmål om et intensivt rehabiliteringsopphold ber jeg deg kontakte meg direkte, slik at vi kan vurdere behov og praktisk gjennomføring.',
    secondary: { label: 'Spør om intensivt opphold', href: '/intensivt-opphold' },
  },

  practical: {
    heading: 'Her finner du meg',
    lede: 'Jeg tar imot pasienter ved Limbra Storgata i Lillestrøm.',
    items: [
      ...site.practitioner.consultations.map((c) => t(c.duration, SRC.doc(11), c.name)),
      t(
        'Klinikken har ingen egen parkering. Du kan parkere i parkeringshuset på Lillestrøm Torv.',
        SRC.krystallsyken,
        'Parkering',
      ),
      t(
        'Inngangen er på gateplan, og det er Limbra som står på skiltet.',
        SRC.krystallsyken,
        'Inngang',
      ),
    ],
  },

  faqs: [
    {
      question: 'Arbeider du bare med svimmelhet og hjernerystelse?',
      answer:
        'Nei. Svimmelhet, balanseproblemer og langvarige plager etter hjernerystelse er en stor del av arbeidet mitt, men jeg undersøker og behandler også vanlige plager fra rygg, nakke, skuldre, kjeve, hofter og andre deler av bevegelsesapparatet.',
      source: SRC.doc(4),
    },
    {
      question: 'Hva om undersøkelsene mine har vært normale?',
      answer:
        'At plagene ikke vises på vanlige undersøkelser, betyr ikke at de ikke er reelle. Jeg undersøker funksjon, også når et resultat ikke regnes som unormalt etter en enkelt testgrense, og forklarer hva undersøkelsene viser, og hva de ikke kan vise.',
      source: SRC.doc(4),
    },
    {
      question: 'Hvordan bestiller jeg time?',
      answer:
        'En vanlig konsultasjon bestiller du i timebestillingen hos Limbra, via knappen «Bestill time». Et intensivt rehabiliteringsopphold kan ikke bestilles som en vanlig nett-time. Ta kontakt med meg direkte, så vurderer vi behov og praktisk gjennomføring sammen.',
      source: SRC.doc(7),
    },
    {
      question: 'Hvor holder du til?',
      answer:
        'Jeg arbeider ved Limbra Storgata, Storgata 25B i Lillestrøm. Inngangen er på gateplan. Klinikken har ingen egen parkering, men du kan parkere i parkeringshuset på Lillestrøm Torv.',
      source: SRC.krystallsyken,
    },
  ],

  captions: {
    'vog-profil': 'Videobriller foran plansjen over øret, der balanseorganet sitter.',
    videobriller: 'Med videobriller ser jeg øyebevegelsene i mørket, forstørret på skjermen.',
    'vog-naerbilde': 'Kameraet i brillene filmer det ene øyet. Det andre er dekket.',
    'vog-pasient-oreplansje': 'Undersøkelse med videobriller ved Limbra Storgata.',
  },
}
