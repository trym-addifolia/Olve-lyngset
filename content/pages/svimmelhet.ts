import { t } from '../helpers'
import { SRC } from '../sources'
import type { HubContent } from '../types'

/**
 * /svimmelhet (arbeidsdokument §5), the hub for the dizziness conditions.
 * «Tilstander jeg ofte møter» takes one careful line per condition from the
 * §12 angles; only krystallsyke links on, the other pages are not built yet.
 * «Når svimmelhet må vurderes raskt» (§5) is the 113 box, id «akutt».
 */
export const SVIMMELHET_CONTENT: HubContent = {
  kind: 'hub',
  updated: '2026-11-17',
  safety: true,
  heroPhoto: 'vog-profil',
  intro: t(
    'Svimmelhet er ikke én enkelt tilstand. For noen snurrer rommet rundt. Andre føler seg ustø, gynger, blir slitne av å handle i store butikker eller synes det er vanskelig å lese, bruke skjerm eller bevege seg i travle omgivelser.',
    SRC.doc(5),
  ),
  sections: [
    {
      id: 'tilstander',
      heading: 'Tilstander jeg ofte møter',
      body: [
        t(
          'Jeg møter mange som har vært svimle lenge og som savner en forståelig forklaring. Noen har fått diagnoser som krystallsyke, PPPD, MdDS, vestibularisnevritt eller Ménières sykdom. Andre vet fortsatt ikke hva plagene skyldes.',
          SRC.doc(5),
        ),
      ],
      entries: [
        {
          term: 'Krystallsyke (BPPV)',
          href: '/svimmelhet/krystallsyke',
          body: t(
            'Korte episoder med svimmelhet som utløses av stillingsendringer, for eksempel når du snur deg i sengen. Jeg undersøker buegangene særskilt.',
            `${SRC.doc(12)} (krystallsyke)`,
          ),
        },
        {
          term: 'PPPD',
          body: t(
            'Vedvarende svimmelhet og ustøhet, ofte med ubehag i visuelt travle omgivelser som butikker. Ingen enkelt test avgjør om det er PPPD, så jeg ser historien din og undersøkelsen i sammenheng.',
            `${SRC.doc(12)} (PPPD)`,
          ),
        },
        {
          term: 'MdDS',
          body: t(
            'En vedvarende følelse av at underlaget gynger, noen ganger etter en reise eller annen bevegelse, for eksempel en båttur. Her gjør jeg en grundig vurdering og følger deg opp individuelt.',
            `${SRC.doc(12)} (MdDS)`,
          ),
        },
        {
          term: 'Vestibularisnevritt',
          body: t(
            'Plutselig kraftig svimmelhet skal først vurderes av lege. Etter det kan jeg undersøke balansefunksjonen og hvordan kroppen har kompensert, og tilpasse øvelser.',
            `${SRC.doc(12)} (vestibularisnevritt)`,
          ),
        },
        {
          term: 'Ménières sykdom',
          body: t(
            'Anfall av svimmelhet, ofte sammen med endret hørsel, øresus eller trykk i øret, skal vurderes av lege og øre-nese-hals-lege. Jeg kan vurdere balansefunksjonen og følge deg opp, men jeg behandler ikke selve sykdomsårsaken.',
            `${SRC.doc(12)} (Ménières sykdom)`,
          ),
        },
      ],
    },
    {
      id: 'historien',
      heading: 'Undersøkelsen begynner med historien din',
      body: [
        t(
          'Jeg vil vite hvordan svimmelheten oppleves, når den startet, hva som utløser eller forverrer den, og hva du ikke lenger får gjort i hverdagen. Deretter velger jeg undersøkelser ut fra det du forteller.',
          SRC.doc(5),
        ),
        t(
          'Ved mer sammensatte plager kan jeg blant annet undersøke øyebevegelser med videobriller (VOG/VNG), balanse, koordinasjon og samspillet mellom hode- og øyebevegelser. Jeg vurderer funnene samlet. Et avvik kan gi nyttig informasjon, men er ikke i seg selv bevis for én bestemt årsak til symptomene.',
          SRC.doc(5),
        ),
      ],
      link: { href: '/undersokelse', label: 'Slik undersøker jeg' },
    },
    {
      id: 'nystagmus',
      heading: 'Ikke all nystagmus er krystallsyke',
      photo: {
        name: 'videobriller',
        caption: 'Med videobriller ser jeg øyet på skjermen, også når du ikke kan feste blikket.',
      },
      body: [
        t(
          'Ufrivillige øyebevegelser, kalt nystagmus, kan forekomme ved flere ulike tilstander. Videobriller gjør det mulig å observere øyebevegelser også uten at pasienten fikserer blikket. Ved mistanke om krystallsyke undersøker jeg dette særskilt, samtidig som jeg vurderer om andre forhold kan være relevante.',
          SRC.doc(5),
        ),
      ],
      link: { href: '/svimmelhet/krystallsyke', label: 'Les om krystallsyke' },
    },
    {
      id: 'rehabilitering',
      heading: 'Rehabilitering tilpasset din reaksjon',
      body: [
        t(
          'Hvis undersøkelsen peker mot funksjoner det kan være aktuelt å trene, velger jeg øvelser og stimuli med utgangspunkt i funnene og symptomene dine. Jeg følger med på både testresultater og hvordan du faktisk fungerer mellom besøkene. Dersom belastningen blir for stor, justerer vi planen.',
          SRC.doc(5),
        ),
        t(
          'Målet kan for eksempel være å gå tryggere, orke mer i butikker, lese lenger, kjøre bil med mindre ubehag eller få større tillit til egen balanse.',
          SRC.doc(5),
        ),
      ],
      link: { href: '/intensivt-opphold', label: 'Bor du langt unna? Les om intensivt opphold' },
    },
  ],
  faqs: [
    {
      question: 'Hva skjer på den første timen ved svimmelhet?',
      answer:
        'Jeg begynner med historien din: hvordan svimmelheten oppleves, når den startet, hva som utløser eller forverrer den, og hva du ikke lenger får gjort. Deretter velger jeg undersøkelser ut fra det du forteller, for eksempel øyebevegelser med videobriller, balanse og koordinasjon.',
      source: SRC.doc(5),
    },
    {
      question: 'Betyr nystagmus at jeg har krystallsyke?',
      answer:
        'Ikke nødvendigvis. Ufrivillige øyebevegelser, kalt nystagmus, kan forekomme ved flere ulike tilstander. Ved mistanke om krystallsyke undersøker jeg dette særskilt, samtidig som jeg vurderer om andre forhold kan være relevante.',
      source: SRC.doc(5),
    },
    {
      question: 'Hva er målet med rehabiliteringen?',
      answer:
        'Målet er bedre funksjon i hverdagen, for eksempel å gå tryggere, orke mer i butikker, lese lenger eller få større tillit til egen balanse. Jeg følger både testresultatene og hvordan du fungerer mellom besøkene, og justerer planen hvis belastningen blir for stor.',
      source: SRC.doc(5),
    },
    {
      question: 'Når må svimmelhet vurderes raskt?',
      answer:
        'Plutselig kraftig svimmelhet, særlig sammen med talevansker, lammelser, nummenhet eller andre nye nevrologiske symptomer, må vurderes raskt av akutt helsetjeneste. Ring 113. Nettsiden erstatter ikke medisinsk vurdering.',
      source: SRC.doc(5),
    },
  ],
  // §5 «Interne lenker»; PPPD, MdDS, vestibularisnevritt and Ménière come later
  related: ['svimmelhet/krystallsyke', 'undersokelse', 'intensivt-opphold'],
  closing: {
    heading: 'Vil du få svimmelheten undersøkt?',
    lede: 'Du bestiller time til svimmelhetsundersøkelse i timebestillingen hos Limbra. Jeg begynner med å lytte til historien din.',
  },
}
