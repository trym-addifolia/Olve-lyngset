import { t } from '../helpers'
import { SRC } from '../sources'
import type { InfoContent } from '../types'

/**
 * /hjernerystelse (arbeidsdokument §6). «Vedvarende plager etter
 * hjernerystelse» in running text; «postcommotio» once, as the technical term,
 * without presenting one explanation as the cause of all lasting symptoms
 * (§6, redaksjonell merknad; §18). The 113 box lists the acute head injury
 * signs (legevakt and 113), not the dizziness ones.
 */
export const HJERNERYSTELSE_CONTENT: InfoContent = {
  kind: 'info',
  updated: '2026-11-17',
  safety: true,
  safetyTopic: 'hjernerystelse',
  intro: t(
    'De fleste kommer seg etter en hjernerystelse, men noen får plager som varer lenge. Det kan dreie seg om svimmelhet, hodepine, ubehag ved skjermbruk, vansker med konsentrasjon, redusert toleranse for aktivitet eller en følelse av at kroppen ikke fungerer som før.',
    SRC.doc(6),
  ),
  sections: [
    {
      id: 'tatt-pa-alvor',
      heading: 'At en undersøkelse er normal, betyr ikke at symptomene er innbilte',
      body: [
        t(
          'Mange jeg møter, forteller at de savner en forklaringsmodell. Noen føler også at de ikke blir trodd, fordi vanlige undersøkelser ikke har vist noe tydelig galt.',
          SRC.doc(6),
        ),
        t(
          'Vedvarende plager etter hjernerystelse kalles også postcommotio. Plagene kan ha ulike forklaringer, og de er ikke de samme for alle.',
          `${SRC.doc(6)} (redaksjonell merknad); ${SRC.doc(18)}`,
        ),
      ],
    },
    {
      id: 'funksjon',
      heading: 'Jeg ser etter funksjon, ikke bare diagnoser',
      body: [
        t(
          'Jeg undersøker blant annet øyebevegelser, balanse, koordinasjon og hvordan nervesystemet reagerer på ulike oppgaver. Enkelte tester gir målbare resultater som kan sammenlignes over tid. Andre krever mer klinisk tolkning.',
          SRC.doc(6),
        ),
        t(
          'Hvis jeg finner avvik som kan ha sammenheng med plagene dine, viser og forklarer jeg hva jeg har funnet. Jeg er samtidig tydelig på at et testavvik ikke automatisk forklarer alle symptomene.',
          SRC.doc(6),
        ),
      ],
      link: { href: '/undersokelse', label: 'Slik undersøker jeg' },
    },
    {
      id: 'plan',
      heading: 'En plan som tåler hverdagen',
      body: [
        t(
          'Rehabiliteringen tilpasses det du tåler og det vi observerer underveis. Målet er å finne et nivå der du kan gjennomføre øvelsene med god margin, før vi eventuelt øker belastningen. Vi tar hensyn til hvordan du reagerer både under og etter aktivitet.',
          SRC.doc(6),
        ),
        t(
          'Jeg følger utviklingen gjennom nye undersøkelser og, viktigst, gjennom det du forteller om funksjonen din i hverdagen. Kan du lese lenger, være mer sammen med familien eller gjøre mer uten å bli utslått etterpå?',
          SRC.doc(6),
        ),
      ],
    },
    {
      id: 'prove-meg',
      heading: '«Jeg har ikke fått prøve meg ennå»',
      body: [
        t(
          'Når noen har forsøkt mye uten å få tilstrekkelig hjelp, forstår jeg at det kan være vanskelig å bevare håpet. Jeg kan ikke love et bestemt resultat. Men jeg kan tilby en grundig vurdering og se om min tilnærming kan gi oss en nyttig vei videre.',
          SRC.doc(6),
        ),
      ],
    },
    {
      id: 'langt-unna',
      heading: 'For deg som bor langt unna',
      body: [
        t(
          'For enkelte med langvarige plager kan et intensivt rehabiliteringsopphold i Lillestrøm være aktuelt. Dette planlegges individuelt og avtales direkte med meg.',
          SRC.doc(6),
        ),
      ],
      link: { href: '/intensivt-opphold', label: 'Les om intensivt rehabiliteringsopphold' },
    },
  ],
  faqs: [
    {
      question: 'Kan plagene være reelle selv om undersøkelsene er normale?',
      answer:
        'Ja. At en undersøkelse er normal, betyr ikke at symptomene er innbilte. Jeg ser etter funksjon, for eksempel øyebevegelser, balanse og koordinasjon, og forklarer hva undersøkelsene viser og hva de ikke kan vise.',
      source: `${SRC.doc(6)}; ${SRC.doc(4)}`,
    },
    {
      question: 'Hva undersøker du ved plager etter hjernerystelse?',
      answer:
        'Blant annet øyebevegelser, balanse, koordinasjon og hvordan nervesystemet reagerer på ulike oppgaver. Enkelte tester gir målbare resultater som kan sammenlignes over tid. Andre krever mer klinisk tolkning.',
      source: SRC.doc(6),
    },
    {
      question: 'Kan du love at jeg blir bedre?',
      answer:
        'Nei. Jeg kan ikke love et bestemt resultat. Jeg kan tilby en grundig vurdering, en plan som er tilpasset det du tåler, og en ærlig vurdering av om min tilnærming kan gi oss en nyttig vei videre.',
      source: SRC.doc(6),
    },
    {
      question: 'Hva om jeg bor langt fra Lillestrøm?',
      answer:
        'For enkelte med langvarige plager kan et intensivt rehabiliteringsopphold i Lillestrøm være aktuelt. Det planlegges individuelt og avtales direkte med meg på e-post, ikke i den vanlige timebestillingen.',
      source: `${SRC.doc(6)}; ${SRC.doc(7)}`,
    },
  ],
  related: ['intensivt-opphold', 'undersokelse', 'svimmelhet'],
  closing: {
    heading: 'Vil du ha en grundig vurdering?',
    lede: 'Du bestiller en vurdering i timebestillingen hos Limbra. Bor du langt unna, kan du heller spørre meg om et intensivt opphold.',
  },
}
