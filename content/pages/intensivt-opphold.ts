import { site } from '@/site.config'
import { t } from '../helpers'
import { SRC } from '../sources'
import type { LandingContent } from '../types'

/**
 * /intensivt-opphold (arbeidsdokument §7). Enquiry by email, never online
 * booking (§7, §15). Only the patient groups §7 names; the other limits in
 * §7 «Viktig avgrensning» and §18 are respected by leaving them out entirely.
 */
export const INTENSIVT_OPPHOLD_CONTENT: LandingContent = {
  kind: 'landing',
  updated: '2026-11-17',
  contact: 'email',
  safety: false,
  intro: t(
    'Bor du langt unna, eller har du sammensatte plager som krever tett oppfølging over flere dager? For enkelte pasienter tilbyr jeg et individuelt planlagt rehabiliteringsopphold i Lillestrøm.',
    SRC.doc(7),
  ),
  timelineHeading: 'Slik kan et opphold foregå',
  timelineLede:
    'Målet er ikke at alle plagene skal være borte etter én uke. Målet er å komme nærmere en nyttig forståelse av funksjonen din, finne øvelser som ser ut til å passe og lage en plan du kan arbeide videre med hjemme.',
  photo: { name: 'vog-pasient-oreplansje' },
  timeline: [
    {
      title: 'Forespørsel og vurdering',
      body: t(
        'Du sender meg en kort forespørsel på e-post. Om et slikt opplegg passer for deg, må vurderes individuelt, og vi avtaler det praktiske direkte.',
        `${SRC.doc(7)}; ${SRC.doc(15)}`,
      ),
    },
    {
      title: 'Omkring én uke',
      body: t(
        'Et opphold varer ofte omkring én uke. I løpet av dagen kan vi gjennomføre tre til fem økter, med hvile mellom øktene.',
        SRC.doc(7),
      ),
    },
    {
      title: 'Tilpasset underveis',
      body: t(
        'Innholdet justeres etter undersøkelsesfunn, symptomer og reaksjon på belastningen.',
        SRC.doc(7),
      ),
    },
    {
      title: 'Skriftlige øvelser',
      body: t(
        'Ved avslutning får du skriftlige øvelser og en plan du kan arbeide videre med hjemme.',
        SRC.doc(7),
      ),
    },
    {
      title: 'Videre kontakt',
      body: t(
        'Videre kontakt kan foregå på e-post, og for noen er det aktuelt med et nytt besøk etter omtrent to til tre måneder.',
        SRC.doc(7),
      ),
    },
  ],
  showEquipment: false,
  sections: [
    {
      id: 'hvem',
      heading: 'Hvem det kan passe for',
      body: [
        t(
          'Dette kan være aktuelt ved langvarig svimmelhet, blant annet PPPD og MdDS, eller ved vedvarende plager etter hjernerystelse. Om et slikt opplegg passer for deg, må vurderes individuelt.',
          SRC.doc(7),
        ),
      ],
    },
    {
      id: 'praktisk',
      heading: 'Praktisk',
      body: [
        t(
          'Du må selv ordne overnatting, for eksempel hos familie eller venner, eller på hotell i nærheten av klinikken.',
          SRC.doc(7),
          'Overnatting',
        ),
        t(
          `Opplegget krever særskilt planlegging og kan ikke bestilles som en vanlig nett-time. Send meg en forespørsel på ${site.contact.email}.`,
          `${SRC.doc(7)}; ${SRC.config}`,
          'Ingen nettbestilling',
        ),
      ],
    },
  ],
  faqs: [
    {
      question: 'Hvor lenge varer et intensivt opphold?',
      answer:
        'Et opphold varer ofte omkring én uke. I løpet av dagen kan vi gjennomføre tre til fem økter, med hvile mellom øktene. Innholdet justeres etter undersøkelsesfunn, symptomer og hvordan du reagerer på belastningen.',
      source: SRC.doc(7),
    },
    {
      question: 'Kan jeg bestille oppholdet på nett?',
      answer:
        'Nei. Opplegget krever særskilt planlegging og kan ikke bestilles som en vanlig nett-time. Send meg en forespørsel på e-post, uten følsomme helseopplysninger eller journaler.',
      source: SRC.doc(7),
    },
    {
      question: 'Er plagene borte etter en uke?',
      answer:
        'Det er ikke målet. Målet er å komme nærmere en nyttig forståelse av funksjonen din, finne øvelser som ser ut til å passe og lage en plan du kan arbeide videre med hjemme.',
      source: SRC.doc(7),
    },
    {
      question: 'Hvem ordner overnatting?',
      answer:
        'Det gjør du selv, for eksempel hos familie eller venner, eller på hotell i nærheten av klinikken.',
      source: SRC.doc(7),
    },
  ],
  related: ['hjernerystelse', 'svimmelhet', 'undersokelse'],
  closing: {
    heading: 'Vil du spørre om et intensivt opphold?',
    lede: 'Fortell kort hva slags plager du ønsker vurdert, hvor du bor og om du ønsker et intensivt opphold. Ikke send følsomme helseopplysninger eller journaler i vanlig e-post. Vi avtaler en tryggere måte å utveksle nødvendig informasjon på dersom det blir aktuelt.',
  },
}
