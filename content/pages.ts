import { confirmLine } from './helpers'
import { SRC } from './sources'
import type {
  BookingContent,
  ContactContent,
  ExerciseContent,
  FaqPageContent,
  LandingContent,
  LocalContent,
  PractitionerContent,
  PrivacyContent,
  Section,
  Sourced,
  Step,
} from './types'

const t = (text: string, source: string, label?: string): Sourced =>
  label ? { text, source, label } : { text, source }

const OLVE_SPM = 'Olve på e-post 2026-11-11 (resultater/olve/2026-11-11-olve-svar-sporsmal.md)'
const OLVE_SVAR = 'Olve 2026-11-11 (resultater/olve/2026-11-11-olve-svar-nettsiden.md)'

/* ------------------------------------------------------------------ */
/* Exercise guides                        */
/* ------------------------------------------------------------------ */

export const EXERCISE_CONTENT: Record<string, ExerciseContent> = {
  ovelser: {
    kind: 'exercise',
    intro: t(
      'Øvelser for krystallsyke må passe øret og buegangen krystallene ligger i, og det vet du først etter en undersøkelse. Gjør du dem i blinde, kan feil øvelse gjøre deg mer svimmel. Her forklarer jeg Epley, Semont og rullemanøveren steg for steg, hvem de passer for, og når de hører hjemme.',
      `${SRC.orig('øvelser')} («Det florerer av hjemmeøvelser på nettet for behandling av krystallsyke. Dette er på godt og vondt»)`,
    ),
    warningHeading: 'Gjør ikke dette hjemme før du er undersøkt',
    stepsHeading: 'Slik gjør jeg Epleys manøver på klinikken',
    stepsLede:
      'Det oransje merket i margen viser hvor manøveren er ment å føre krystallene, steg for steg: fra bakre buegang og tilbake dit de hører hjemme.',
    rail: true,
    why: {
      id: 'vent-med-ovelser',
      eyebrow: 'Før du prøver selv',
      heading: 'Hvorfor jeg fraråder øvelser før du er undersøkt',
      body: [
        t(
          'Jeg fraråder øvelser hjemme før du er undersøkt. Det handler ikke bare om at en øvelse kan treffe feil buegang.',
          `${OLVE_SPM} (spørsmål 5)`,
        ),
        t(
          'Gjør du øvelser igjen og igjen mens krystallene ligger feil, kan hjernen begynne å kompensere for feilsignalene fra buegangen. Det klarer den en stund, men det koster krefter. Over tid kan kompensasjonen svikte. Da kan svimmelheten bli mer varig, og det tar lengre tid å trene den bort.',
          `${OLVE_SPM} (spørsmål 5, Olves faglige vurdering, nøkternt gjengitt)`,
        ),
        t(
          'Det er min faglige vurdering, og grunnen til at jeg vil se øynene dine med brillene før du får en øvelse å gjøre hjemme.',
          `${OLVE_SPM} (spørsmål 5)`,
        ),
      ],
    },
    warning: t(
      'Manøveren under er laget for krystaller i bakre buegang, på én bestemt side. Ligger krystallene i horisontal buegang, eller på motsatt side, kan feil øvelse gjøre deg mer svimmel og flytte krystallene lenger inn. Derfor anbefaler jeg ikke å starte med øvelser før undersøkelsen har vist hvilken side og hvilken buegang det gjelder, og Brandt-Daroff først når undersøkelsen ikke lenger viser krystaller. {{OLVE_BEKREFT: om pasienten skal gjøre Epley eller rullemanøveren hjemme etter undersøkelsen, eller bare Brandt-Daroff}} Pasienter som har prøvd seg frem hjemme, kommer ofte inn med et mer komplisert bilde.',
      `${SRC.orig('øvelser')} («Pasienter som har satt i gang med øvelser ... kommer ofte inn med et mer komplisert symptombilde»); ${SRC.olve2026} («Øvelser skal ikke tas før en er sikker på at alle krystallen er reposisjonert»)`,
    ),
    steps: [
      {
        title: 'Du sitter med hodet vridd mot den syke siden',
        meta: 'Epleys manøver, bakre buegang',
        body: t(
          'Du sitter på benken med beina rett frem. Jeg vrir hodet ditt 45 grader mot den siden som gir svimmelhet.',
          `${SRC.orig('øvelser')}; ${SRC.sml} (Epleys manøver)`,
        ),
      },
      {
        title: 'Bakover, med hodet hengende',
        body: t(
          'Jeg legger deg raskt bakover med hodet fortsatt vridd, slik at hodet henger litt lavere enn kroppen. Nå kommer svimmelheten. Du blir liggende til den har gitt seg helt, og så 30 sekunder til.',
          `${SRC.orig('øvelser')}; ${SRC.sml}`,
        ),
      },
      {
        title: 'Hodet 90 grader til den andre siden',
        body: t(
          'Uten å løfte hodet vrir jeg det rolig 90 grader til motsatt side, slik at det nå er vridd 45 grader mot den friske siden. Du ligger slik i 30 til 60 sekunder.',
          `${SRC.orig('øvelser')}; ${SRC.sml}`,
        ),
      },
      {
        title: 'Over på siden, med blikket mot gulvet',
        body: t(
          'Du ruller over på den friske siden, og hodet følger med slik at nesen peker ned mot gulvet. Du ligger slik i 30 til 60 sekunder. Så setter du deg rolig opp, med hodet bøyd litt fremover. Som regel er det nok med én gang i samme time.',
          `${SRC.orig('øvelser')}; ${SRC.sml}; ${SRC.orig('index')} («som regel er det nok med en»)`,
        ),
      },
    ],
    showVideo: false,
    sections: [
      {
        id: 'semont',
        eyebrow: 'Alternativ for bakre buegang',
        heading: 'Semont-manøveren',
        body: [
          t(
            'Semont ligner på Brandt-Daroff, men er en behandling, ikke en opptreningsøvelse. Si at krystallene ligger i høyre bakre buegang. Du sitter på sengen med nesen vridd 45 grader mot venstre, og legger deg raskt ned på høyre side. Svimmelheten kommer. Ligg i ett minutt.',
            `${SRC.orig('øvelser')} («Semont utføres som følger»)`,
          ),
          t(
            'Så setter du deg fort opp og legger deg raskt ned på venstre side, fortsatt med hodet vridd mot venstre. Farten er poenget. Tregheten i væsken gjør at krystallene ikke rekker å skli tilbake, og de finner veien tilbake til der de hører hjemme. NHI skriver at Semont trolig virker like godt som Epley.',
            `${SRC.orig('øvelser')} («Viktigheten av hastighet fra den ene siden til den andre må stresses»); ${SRC.nhi}`,
          ),
        ],
      },
      {
        id: 'rullemanover',
        eyebrow: 'Horisontal buegang',
        heading: 'Når Epley ikke passer: rullemanøveren for horisontal buegang',
        body: [
          t(
            'Ligger krystallene i horisontal buegang, virker ikke Epley. Da bruker jeg rullemanøveren. For høyre side gjør du slik. Legg deg på høyre side og ligg i ett minutt. Snu deg på ryggen med nesen opp og hodet løftet 20 til 30 grader. Etter ett minutt over på venstre side, og etter nok et minutt over på magen.',
            `${SRC.orig('øvelser')} («For krystaller i høyre horisontale buegang utføres rullemanøver (BQR) som følgende»)`,
          ),
          t(
            'Noe forskning sier du kan stoppe der og sette deg rolig opp. Jeg velger å fullføre rullen over på høyre side, ett minutt, før jeg lar pasienten sette seg. Har undersøkelsen vist horisontal buegang, kan du gjøre den hjemme etter at jeg har vist deg den.',
            `${SRC.orig('øvelser')} («Jeg velger å fullføre rullen»)`,
          ),
        ],
      },
      {
        id: 'halv-saltomortale',
        eyebrow: 'For deg som ikke kan ligge flatt',
        heading: 'Halv saltomortale',
        body: [
          t(
            'En manøver jeg bruker av og til for bakre buegang. Sitt på knærne og se opp i taket i ett minutt. Bøy deg raskt frem med toppen av hodet i gulvet og haken inn mot brystet, ett minutt. Vri nesen 45 grader mot den syke siden, ett minutt. Kom opp på alle fire med hodet vridd, ett minutt. Sett deg opp på knærne.',
            `${SRC.orig('øvelser')} («Halv saltomortale-øvelsen fungerer som følgende»)`,
          ),
          t(
            'Blir du ikke tydelig mindre svimmel andre gang du gjør den, er det to mulige grunner. Enten lå krystallene ikke i den buegangen du behandlet for, eller så kommer svimmelheten av noe annet. Da er det tid for en undersøkelse.',
            `${SRC.orig('øvelser')} («Er ikke svimmelheten betydelig redusert, kan en av to ting være årsaken»)`,
          ),
        ],
      },
      {
        id: 'kjerringrad',
        eyebrow: 'Det folk spør om',
        heading: 'Kjerringråd mot krystallsyke: hva vet vi?',
        body: [
          t(
            'Det folk kaller kjerringråd er som regel varianter av de samme manøvrene, som å legge seg på den «gale» siden, sove med hodet høyt eller riste på hodet. Sove med hodet høyt de første nettene etter behandling anbefaler jeg selv. Resten har ingen dokumentasjon, og å riste på hodet kan flytte krystallene feil vei.',
            `${SRC.orig('behandling')} («anbefales det at de første dagene etter behandling ... ligger med hodet høyt»); ${SRC.kw('kjerringråd krystallsyke')}`,
          ),
          t(
            'Det som er dokumentert, er manøvrene (reposisjonering), altså Epley, Semont og rullemanøveren, gjort for riktig buegang. Resten av kjerringrådene er i beste fall uskadelige.',
            `${SRC.sml} («raskest bedring oppnås vanligvis ved å utføre bestemte hodemanøvre»)`,
          ),
        ],
      },
    ],
    faqs: [
      {
        question: 'Kan jeg gjøre Epleys manøver hjemme?',
        answer:
          'Først etter at undersøkelsen har vist at krystallene ligger i bakre buegang, og på hvilken side. Da kan jeg vise deg hvordan du gjør den. Uten det er sjansen stor for at du gjør den på feil side eller for feil buegang. Da hjelper den ikke, og den kan gjøre deg mer svimmel.',
        source: `${SRC.kw('epleys manøver hjemme, epley')}; ${SRC.orig('øvelser')}; Olve, kommentar #8 og 9 (side, ikke øre) 2026-11-16`,
      },
      {
        question: 'Hvilke øvelser for krystallsyke finnes?',
        answer:
          'Behandlingsmanøvrene er Epley, Semont og halv saltomortale for bakre buegang, og rullemanøveren for horisontal buegang. Opptreningsøvelsen etterpå er Brandt-Daroff. Vestibulær rehabilitering med øye- og balansetrening brukes når svimmelheten har stått lenge. Hvilken du skal bruke, avhenger av buegangen.',
        source: `${SRC.kw('krystallsyke øvelser, øvelser for krystallsyke')}; ${SRC.orig('øvelser')}`,
      },
      {
        question: 'Hvordan kan jeg behandle krystallsyke hjemme?',
        answer:
          'Først må en undersøkelse vise hvilken buegang og hvilken side det gjelder. Så kan manøveren som passer brukes hjemme, Epley for bakre buegang, rullemanøveren for horisontal. Sov med hodet høyt de første nettene. Blir du ikke bedre etter to til tre forsøk over noen dager, bestill en ny undersøkelse i stedet for å fortsette.',
        source: `${SRC.marked}; ${SRC.kw('krystallsyke øvelser hjemme')}; ${SRC.orig('øvelser')}`,
      },
      {
        question: 'Hva skal man ikke gjøre når man har krystallsyke?',
        answer:
          'Ikke gjør øvelser før undersøkelsen har vist hvilken side og hvilken buegang det gjelder. Ikke rist på hodet. Ikke kjør bil så lenge du får anfall ved hodebevegelser. Og ikke slutt helt å bevege hodet. Det gir stiv nakke og holder ustøheten ved like. Reis deg rolig, så du ikke faller under et anfall.',
        source: `${SRC.marked}; ${SRC.orig('øvelser')}; ${SRC.orig('svimmelhet')}; Olve, kommentar #8 og 9 (side, ikke øre) 2026-11-16`,
      },
      {
        question: 'Hva hjelper mot svimmelhet?',
        answer:
          'Det kommer an på årsaken. Ved krystallsyke hjelper manøveren som passer øret og buegangen. Ved svimmelhet fra nakken hjelper behandling og bevegelse av nakken. Etter virus på balansenerven hjelper gradvis balansetrening. Ved blodtrykksfall må legen se på medisiner. Første steg er alltid å finne ut hva det er.',
        source: `${SRC.kw('hva hjelper mot svimmelhet')}; ${SRC.orig('svimmelhet')}`,
      },
      {
        question: 'Hvor ofte skal jeg gjøre øvelsene?',
        answer:
          'På klinikken gjør jeg den som regel én gang per time, noen ganger to hvis det er klinisk grunn til det. Hjemme: én til to ganger om dagen i noen få dager, ikke flere. Blir du ikke bedre, er det mer sannsynlig at det er feil buegang eller feil side enn at du trenger flere repetisjoner.',
        source: `${SRC.orig('index')} («kan om klinisk indikert, gjøres to ganger på samme konsultasjon, men som regel er det nok med en»)`,
      },
    ],
    related: ['buegangene', 'trening', 'kommer-tilbake'],
    closing: {
      heading: 'Usikker på hvilken side?',
      lede: 'Book en time, så finner jeg ut hvilken side og hvilken buegang det gjelder, og viser deg Brandt-Daroff når krystallene er på plass.',
    },
  },

  trening: {
    kind: 'exercise',
    intro: t(
      'Brandt-Daroff er en øvelse du gjør selv, for eksempel når du fortsatt er litt ustø etter behandling av krystallsyke. Pasientene mine får den for å trene opp balansen igjen, først når undersøkelsen ikke lenger viser krystaller. Den er enkel. Du sitter i sengen, snur hodet 45 grader vekk fra den siden du skal legge deg ned på, legger deg ned sidelengs, ligger der noen sekunder og setter deg opp igjen. Så tilsvarende andre veien. Krystaller på avveie gir hjernen feil signaler, og det kan gi kvalme, trøtthet og ustøhet som henger igjen selv etter at krystallene er borte. Treningen er for den perioden.',
      `${SRC.orig('trening')} («Etter endt behandling av krystallsyke får alle pasienter øvelser for å rekalibrere balanseorganet»); ${SRC.video(181, 'Øvelsen som du skal gjøre hjemme er at du sitter i sengen, snur hodet ditt 45 grader vekk fra den siden du skal legge deg ned og så legger du deg bare ned sidelengs. Ligger der i noen sekunder og så går du opp igjen. Tilsvarende andre veien')}`,
    ),
    warningHeading: 'Blir du svimmel av øvelsen?',
    stepsHeading: 'Slik gjør du Brandt-Daroff',
    why: {
      id: 'vent-med-ovelser',
      eyebrow: 'Før du starter',
      heading: 'Hvorfor jeg fraråder øvelser før du er undersøkt',
      body: [
        t(
          'Jeg fraråder øvelser hjemme før du er undersøkt. Det handler ikke bare om at en øvelse kan treffe feil buegang.',
          `${OLVE_SPM} (spørsmål 5)`,
        ),
        t(
          'Gjør du øvelser igjen og igjen mens krystallene ligger feil, kan hjernen begynne å kompensere for feilsignalene fra buegangen. Det klarer den en stund, men det koster krefter. Over tid kan kompensasjonen svikte. Da kan svimmelheten bli mer varig, og det tar lengre tid å trene den bort.',
          `${OLVE_SPM} (spørsmål 5, Olves faglige vurdering, nøkternt gjengitt)`,
        ),
        t(
          'Det er min faglige vurdering, og grunnen til at jeg vil se øynene dine med brillene før du får en øvelse å gjøre hjemme.',
          `${OLVE_SPM} (spørsmål 5)`,
        ),
      ],
    },
    warning: t(
      'Brandt-Daroff er opptrening, ikke behandling av selve krystallsyken, og du skal ikke starte med den før undersøkelsen har vist at alle krystallene er på plass. Blir du svimmel på samme måte som under et anfall mens du gjør den, skal du ikke fortsette, men ta kontakt. Da har krystaller kommet på avveie igjen og må flyttes først. Litt ørhet er normalt, kraftig snurring er det ikke.',
      `${SRC.orig('trening')} («Om man blir svimmel, som under krystallanfallet, skal en ikke fortsette øvelsen, men kontakte oss på nytt»)`,
    ),
    steps: [
      {
        title: 'Sitt på sengen med føttene på gulvet',
        meta: 'Brandt-Daroff',
        body: t(
          'Sitt på sengekanten. Snu hodet (nesen) 45 grader bort fra den siden du skal legge deg ned på.',
          SRC.orig('trening'),
        ),
      },
      {
        title: 'Legg deg ned på siden og ligg i 10 sekunder',
        body: t(
          'Legg deg rett ned på siden med hodet fortsatt vridd, slik at du ser opp mot taket. Ligg i omtrent 10 sekunder, eller til eventuell ørhet har gitt seg.',
          `${SRC.orig('trening')} («Legg deg ned på siden, og ligg der i 10 sek»)`,
        ),
      },
      {
        title: 'Sett deg opp og snu hodet til den andre siden',
        body: t(
          'Sett deg rolig opp. Snu hodet 45 grader til motsatt side, og legg deg ned på den andre siden på samme måte. Ligg i 10 sekunder.',
          SRC.orig('trening'),
        ),
      },
      {
        title: 'Gjenta fem ganger til hver side, morgen og kveld',
        body: t(
          'Fem runder til hver side om morgenen og fem om kvelden. Jeg gir egne instruksjoner avhengig av hvilken buegang som hadde krystallene, for å øke aktiviteten til akkurat den.',
          `${SRC.orig('trening')} («Øvelsen gjentas 5 ganger til hver side, morgen og kveld»); ${SRC.orig('øvelser')}`,
        ),
      },
    ],
    showVideo: false,
    sections: [
      {
        id: 'hvorfor',
        eyebrow: 'Hvorfor',
        heading: 'Fortsatt ustø etter behandlingen?',
        body: [
          t(
            'Mens krystallene lå på avveie, har hjernen vent seg til feilinformasjonen. Når jeg fjerner dem, føler noen at de «mangler noe», og ustøheten kan faktisk øke en kort stund. Treningen gir hjernen riktig, sidelik informasjon fra balansesystemet, så den kan kalibrere seg på nytt.',
            `${SRC.orig('behandling')} («Når jeg fjerner krystallene vil noen pasienter føle at de mangler noe»)`,
          ),
          t(
            'Øvelsen gjør tre ting. Den gir riktig informasjon inn til hjernen. Den lar deg bruke balansesystemet i et trygt miljø, så du tør stole på deg selv igjen. Og den «skyller» gjennom buegangene, så eventuelle krystallrester som ikke viste seg på klinikken, kommer frem.',
            `${SRC.orig('index')} («Det er 3 hovedgrunner til at Brandt-Daroff gis»)`,
          ),
        ],
      },
      {
        id: 'hvor-lenge',
        eyebrow: 'Hvor lenge',
        heading: 'Hvor lenge skal jeg trene?',
        body: [
          t(
            'Gjør øvelsen til du har hatt en uke med trening uten svimmelhet. Da ber jeg deg ta én uke til, helt symptomfritt. Deretter anbefaler jeg Brandt-Daroff én gang i uken, som en sjekk: én til to ganger til hver side. Ingen svimmelhet betyr grønt lys.',
            `${SRC.orig('øvelser')} («Etter denne uken anbefales det å ta Brand Daroff-øvelsen en gang i uken»)`,
          ),
          t(
            'Har du gått i måneder eller år med krystaller, eller har du et følsomt balansesystem fra før (lett bil- og sjøsyk), tar opptreningen lenger tid. Da gjør jeg en ny undersøkelse etter at krystallene er borte, og legger opp treningen etter funnene. Hvor lang opptreningen blir, kommer an på hva svimmelheten skyldes, og hvor lenge du har hatt den.',
            `${SRC.orig('trening')} («Om krystallene har stått over tid eller pasienten har et følsomt balansesystem»); ${SRC.video2(218, 'om opptrening av svimmelhet generelt: Noen blir bra i løpet av noen få dager. Andre bruker vi noe lengre tid. Det hele kommer an på hva slags diagnose som de har. Og hvor lenge de har slitt med problemet')}`,
          ),
        ],
      },
      {
        id: 'balansetrening',
        eyebrow: 'Etterpå',
        heading: 'Hvordan trener jeg opp balansen igjen?',
        body: [
          t(
            'For deg som har gått lenge med svimmelhet, måler jeg øyebevegelsene med VNG (videonystagmografi) og balansen med en datastyrt test (CAPS). {{OLVE_BEKREFT: CAPS i bruk}} Funnene forteller hvilke deler av systemet som trenger trening. Øvelsene som brukes, er:',
            `${SRC.orig('trening')} («En databasert undersøkelse av balansen (CAPS) og en spesifikk evaluering av øyefunksjon (VNG)»)`,
          ),
        ],
        bullets: [
          t(
            'Du ser på et punkt i midten og holder blikket der, mens du beveger hodet forsiktig fra side til side, en «nei-nei»-øvelse.',
            `${SRC.orig('trening')}; ${SRC.video(170, 'Du ser på punktet i midten og fokuserer på det. Og så er det å ta hodet forsiktig fram og tilbake [mistranskribert term «eppelismanøver» utelatt] En nei-nei øvelse')}`,
            'Blikkfiksering',
          ),
          t(
            'Du følger et punkt som flytter seg.',
            SRC.orig('trening'),
            'Følgebevegelser (pursuit)',
          ),
          t('Raske blikkskift mellom to punkter.', SRC.orig('trening'), 'Sakkader'),
          t('Øye- og balansetrening sammen.', SRC.orig('trening'), 'VOR'),
          t('Øvelser på ulikt underlag.', SRC.orig('trening'), 'Balanseøvelser'),
        ],
      },
      {
        id: 'trene-som-for',
        eyebrow: 'Aktivitet',
        heading: 'Kan jeg trene som før?',
        body: [
          t(
            'Ja, vanlig fysisk aktivitet er bra, også ifølge helsenorge. De første dagene etter behandling bør du bevege hodet rolig og sove med hodet høyt. Unngå raske hodebevegelser, hodestående og trening der et anfall kan gjøre at du faller, som sykling i trafikk eller klatring. Går du tur, svømmer eller trener rolig styrke, er det som regel greit.',
            `${SRC.helsenorge} («normal fysisk aktivitet»); ${SRC.orig('behandling')} («Det anbefales å gå som om en har en bok på hodet»)`,
          ),
        ],
      },
      {
        id: 'paminnelse',
        eyebrow: 'Hver uke',
        heading: 'Vil du ha en påminnelse hver uke?',
        body: [
          t(
            'Etter endt rehabilitering anbefaler jeg Brandt-Daroff som en fast sjekk på om krystallene har løsnet igjen. Det gjelder deg som har hatt krystallsyke, fordi risikoen for å få det igjen er høy. Legg inn en fast påminnelse i kalenderen, for eksempel mandag morgen. Kjenner du symptomene på krystallsyke igjen under øvelsen, ta kontakt med en gang for en ny undersøkelse. Jo før krystallene kommer på plass, jo kortere tid må hjernen kompensere for feil signaler fra øret.',
            `Olve via Trym 2026-11-12 (Brandt-Daroff som ukentlig screening etter endt rehabilitering); ${SRC.orig('behandling')} («jeg anbefaler 1x/uke»); ${SRC.helsenorge}`,
          ),
        ],
      },
    ],
    faqs: [
      {
        question: 'Hva er Brandt-Daroff-øvelsen?',
        answer:
          'En opptreningsøvelse etter krystallsyke. Du sitter på sengen, vrir hodet 45 grader, legger deg ned på motsatt side i 10 sekunder, setter deg opp og gjentar til den andre siden. Fem ganger hver side, morgen og kveld. Den trener balansesystemet og avslører om krystaller er på avveie igjen.',
        source: `${SRC.kw('brandt daroff')}; ${SRC.orig('trening')}; Olve, kommentar #8 og 9 (side, ikke øre) 2026-11-16`,
      },
      {
        question: 'Krystallsyke og trening: kan jeg trene?',
        answer:
          'Ja, vanlig fysisk aktivitet er bra, også ifølge helsenorge. Unngå raske hodebevegelser, hodestående, og trening der et anfall kan gjøre at du faller, som sykling i trafikk eller klatring. Går du tur, svømmer eller trener rolig styrke, er det som regel greit. Lytt til kroppen de første dagene etter behandling.',
        source: `${SRC.kw('krystallsyke og trening')}; ${SRC.helsenorge} («normal fysisk aktivitet»)`,
      },
      {
        question: 'Skal man ta det med ro ved krystallsyke?',
        answer:
          'De første dagene etter behandling, ja. Beveg hodet rolig, som om du har en bok på hodet, og sov med hodet høyt. Men ikke slutt å bevege deg. Å holde hodet helt stille over tid gir stiv nakke og holder ustøheten ved like. Etter noen dager skal du tilbake til normal aktivitet.',
        source: `${SRC.marked}; ${SRC.orig('behandling')} («Det anbefales å gå som om en har en bok på hodet»)`,
      },
      {
        question: 'Hvor lenge skal jeg gjøre Brandt-Daroff?',
        answer:
          'Til du har hatt en uke uten svimmelhet under øvelsen, og så én uke til for sikkerhets skyld. Deretter én gang i uken som sjekk, så lenge du vil. Har du gått lenge med krystallene, kan opptreningen ta flere uker. Blir du kraftig svimmel av øvelsen, stopp og ta kontakt.',
        source: `${SRC.orig('øvelser')} («Når kan jeg slutte med øvelsene for krystallsyke?»)`,
      },
    ],
    related: ['ovelser', 'varighet', 'behandling'],
    closing: {
      heading: 'Henger ustøheten igjen etter krystallsyken?',
      lede: 'Book en time, så måler vi hva som trenger trening.',
    },
  },
}

/* ------------------------------------------------------------------ */
/* Ad landing pages, considered intent */
/* ------------------------------------------------------------------ */

const TIMELINE: Step[] = [
  {
    title: 'Samtale og nevrologisk undersøkelse',
    figure: { name: 'samtale' },
    body: t(
      'Jeg spør når svimmelheten kom, hva som utløser den og hvor lenge anfallene varer, og om hodeskader, sykeleie og medisiner. Så gjør jeg en nevrologisk undersøkelse, for å vurdere om du skal behandles hos meg eller henvises videre.',
      `${SRC.olve2026}; ${SRC.orig('diagnosering')}`,
    ),
  },
  {
    title: 'Balanse og stabilitet',
    body: t(
      'Jeg undersøker balanseorganet spesielt, med tester av stabilitet og generell balanse.',
      SRC.olve2026,
    ),
  },
  {
    title: 'Infrarøde videobriller og Dix-Hallpike',
    figure: {
      name: 'dix-hallpike',
      caption: 'Dix-Hallpike-testen. Du har videobrillene på hele tiden.',
    },
    body: t(
      'Du får på deg infrarøde videobriller (VOG), slik at jeg kan se øynene dine i mørket. Jeg tester de forskjellige buegangene, blant annet med Dix-Hallpike-testen. Da legger jeg deg ned på ryggen med hodet i forskjellige posisjoner, og ser etter den typiske øyebevegelsen (nystagmus), som viser om det er krystaller, og i hvilken buegang. Testen kan gjøre deg svimmel. Det går vanligvis over i løpet av 10 til 15 sekunder, og jeg følger med på deg hele tiden.',
      SRC.olve2026,
    ),
  },
  {
    title: 'Behandling',
    body: t(
      'Er det krystallsyke, leder jeg krystallene tilbake på plass ved å føre hodet og kroppen din gjennom noen faste stillinger (Epleys manøver eller rullemanøveren). Jeg tester først at nakken din tåler stillingene.',
      `${SRC.olve2026}; ${SRC.orig('behandling')} («Jeg tester alltid om pasienten klarer manøveren før den utføres»)`,
    ),
  },
  {
    title: 'Etterpå',
    body: t(
      'Du kan bli litt sliten, og noen kjenner seg litt ør resten av dagen. Du får råd om hvordan du skal ligge og bevege hodet de første dagene. Hvor mange timer som trengs, varierer. Når undersøkelsen ikke lenger viser krystaller, får du hjemmeøvelsen Brandt-Daroff. Hjemmeøvelser skal ikke startes før jeg er sikker på at det ikke er krystaller på avveie.',
      SRC.olve2026,
    ),
  },
]

const referral = (heading: string): Section => ({
  id: 'henviser',
  eyebrow: 'Når jeg henviser videre',
  heading,
  body: [
    t(
      'Jeg behandler ikke alt. Finner jeg tegn på hjerneslag, Menières sykdom, vestibularisnevritt i akuttfasen, eller svimmelhet som kommer av medisiner eller blodtrykk, sier jeg hva det kan være og hvem du bør gå til, som regel fastlegen. Jeg gir ingen råd om medisiner, det er legens område.',
      `${SRC.orig('svimmelhet')} («henviser jeg disse pasienter til fastlegen»)`,
    ),
    t(
      'Blir du ikke bedre etter behandling som forventet, anbefaler jeg videre utredning med bildediagnostikk, for eksempel MR av hodet, via fastlegen. Og kan du ikke vri hodet 45 grader eller tåle å ligge med hodet under benkens nivå, henviser jeg til en klinikk med TRV-stol.',
      `${SRC.orig('diagnosering')} («vil videre undersøkelse med billeddiagnostikk ... være påkrevd»); ${SRC.orig('behandling')} («henviser jeg til en klinikk hvor slikt utstyr finnes»)`,
    ),
  ],
})

export const LANDING_CONTENT: Record<string, LandingContent> = {
  behandling: {
    kind: 'landing',
    intro: t(
      'Først ser jeg med infrarøde videobriller om det er krystaller, hvilken side og hvilken buegang. Så velger jeg manøveren som passer. Behandling av krystallsyke kalles reposisjonering. Jeg flytter hodet ditt på en bestemt måte, i noen faste stillinger, slik at krystallene finner veien tilbake til der de skal være. Om du får behandling samme dag, avhenger av hva undersøkelsen viser, men ofte gjør du det. Det skjer i Storgata 25B i Lillestrøm.',
      `${SRC.orig('behandling')} («Behandlingen for BPPV (krystallsyken) kalles reposisjonering»); ${SRC.video(134, 'vi flytter pasientens hode på spesiell måte slik at krystallene finner veien tilbake til der hvor de skal være')}`,
    ),
    timeline: TIMELINE,
    photo: { name: 'nakken', caption: 'Jeg tester alltid først at nakken din tåler bevegelsene.' },
    showEquipment: true,
    showPrice: true,
    referral: referral('Når sender du meg videre?'),
    sections: [
      {
        id: 'krystallene',
        eyebrow: 'Manøveren',
        heading: 'Hva gjør du med krystallene?',
        body: [
          t(
            'Jeg leder krystallene tilbake på plass ved å føre hodet og kroppen din gjennom noen faste stillinger. Hvilken manøver jeg bruker, avhenger av hva brillene viste. Epleys manøver brukes for bakre buegang, rullemanøveren for horisontal. Jeg tester alltid først at nakken din tåler stillingene.',
            `${SRC.orig('behandling')} («Jeg tester alltid om pasienten klarer manøveren før den utføres»); ${SRC.video(134, 'vi flytter pasientens hode på spesiell måte slik at krystallene finner veien tilbake til der hvor de skal være')}`,
          ),
          t(
            'Har du fått kvalmestillende, er det ikke feil. Det kan dempe kvalmen i en akutt fase. Men ingen medisin flytter krystallene. Det er det manøveren gjør.',
            `${SRC.orig('index')} («Det er for tiden ingen medisiner som kan få krystallene til å flytte seg tilbake»), omskrevet uten kritikk; ${SRC.nhi}`,
          ),
        ],
      },
      {
        id: 'kiropraktor',
        eyebrow: 'Kiropraktor og krystallsyke',
        heading: 'Kan en kiropraktor behandle krystallsyke?',
        body: [
          t(
            'Ja. Kiropraktor er autorisert helsepersonell, og fastleger, fysioterapeuter, kiropraktorer og øre-nese-hals-leger undersøker og behandler krystallsyke. Ved krystallsyke behandler jeg øret. Jeg beveger hodet ditt i bestemte retninger så krystallene kan flytte seg tilbake. Er det tegn på noe annet, sier jeg fra og forklarer hvem du bør gå til. Du trenger ikke henvisning.',
            `${SRC.trym}; ${SRC.limbra}; ${SRC.sml} («Krystallsyke kan oftest diagnostiseres og behandles enkelt i primærhelsetjenesten»)`,
          ),
        ],
      },
      {
        id: 'hvor-mange-timer',
        eyebrow: 'Antall timer',
        heading: 'Hvor mange timer trenger jeg?',
        body: [
          t(
            'Et fullt forløp er vanligvis 4 til 6 behandlinger. Det gjelder hele løpet, med undersøkelse, behandlinger og rehabilitering. Selve krystallene bruker jeg normalt 3 til 4 behandlinger på, for at de skal bli værende der de hører hjemme. Hvor lang rehabiliteringen blir, avhenger av hvor lenge du har gått med plagene, og av hvordan du svarer på den.',
            `${OLVE_SPM} (spørsmål 3)`,
          ),
          t(
            'Etter første time sier jeg hva jeg tror. Når undersøkelsen ikke lenger viser krystaller, lærer du Brandt-Daroff som opptrening. Etter endt rehabilitering bruker du den samme øvelsen som en ukentlig sjekk på om krystallene har løsnet igjen. Øvelser skal ikke tas før jeg er sikker på at alle krystallene er på plass. Risikoen for å få krystallsyke igjen er høy, så det er verdt å ha en test du kan gjøre selv.',
            `${SRC.olve2026} («Øvelser skal ikke tas før en er sikker på at alle krystallen er reposisjonert»); Olve via Trym 2026-11-12 (ukentlig screening etter endt rehabilitering); ${SRC.helsenorge}`,
          ),
        ],
      },
    ],
    faqs: [
      {
        question: 'Hva er behandling av krystallsyke?',
        answer:
          'Behandlingen kalles reposisjonering. Det er hodemanøvrer som flytter krystallene ut av buegangen. Epleys manøver for bakre buegang, rullemanøveren for horisontal. Det tar noen minutter. Forutsetningen er at man vet hvilken side og hvilken buegang det gjelder, og det ser jeg etter med videobriller.',
        source: `${SRC.kw('krystallsyke behandling, behandling av krystallsyke, bppv behandling')}; ${SRC.orig('behandling')}; ${SRC.sml}; Olve, kommentar #8 og 9 (side, ikke øre) 2026-11-16; Olve, kommentar #8 og 9 (side, ikke øre) 2026-11-16`,
      },
      {
        question: 'Må jeg i TRV-stol (krystallsykestol)?',
        answer:
          'Nei, som regel ikke. Det viktigste verktøyet mitt er videobrillene, ikke stolen. De aller fleste kan behandles på benken. TRV-stolen trengs bare når nakken er så stiv at du ikke kan vri hodet 45 grader, eller ved lammelser. Da henviser jeg til en klinikk som har stol. {{OLVE_BEKREFT: at du fortsatt henviser til TRV-stol og ikke har egen stol}}',
        source: `${SRC.kw('trv stol')}; ${SRC.orig('behandling')} («Må en i Krystallsyke-stolen (TRV-stol) ...?»), uten tallet`,
      },
      {
        question: 'Kan en kiropraktor behandle krystallsyke?',
        answer:
          'Ja. Fastleger, fysioterapeuter, kiropraktorer og øre-nese-hals-leger undersøker og behandler krystallsyke. Jeg er kiropraktor med videreutdanning i nevrologi (DACNB), og svimmelhet er det jeg har arbeidet mest med. Du trenger ikke henvisning for å komme til meg. Finner jeg noe som skal til lege, sier jeg fra.',
        source: `${SRC.kw('kiropraktor krystallsyke')}; ${SRC.trym}; ${SRC.limbra}`,
      },
      {
        question: 'Hvor mange behandlinger trenger jeg?',
        answer:
          'Et fullt forløp, med undersøkelse, behandlinger og rehabilitering, er vanligvis 4 til 6 behandlinger. For at krystallene skal bli værende på plass, bruker jeg normalt 3 til 4 behandlinger. Hvor lang rehabiliteringen blir, avhenger av hvor lenge du har gått med plagene. Etter første time sier jeg hva jeg tror. Manøveren kan gjentas i samme time hvis det er grunn til det.',
        source: `${OLVE_SPM} (spørsmål 3); ${SRC.olve2026}`,
      },
      {
        question: 'Er behandlingen farlig?',
        answer:
          'Reposisjonering regnes som trygg. Behandlingen er mekanisk, som å riste en stein ut av skoen. Den viktigste utfordringen er om nakken din er så stiv eller vond at du ikke tåler stillingene, og det tester jeg alltid først. Noen blir kvalme eller slitne etterpå. Det går som regel over i løpet av dagen.',
        source: `${SRC.orig('behandling')} («Er krystallsyken behandling farlig?»)`,
      },
      {
        question: 'Finnes det medisin mot krystallsyke?',
        answer:
          'Nei. Ingen medisin får krystallene til å flytte seg tilbake eller løse seg opp. Kvalmestillende kan brukes ved behov i en akutt fase, men virker lite på selve svimmelheten. Det er fastlegen som vurderer medisiner. Behandlingen av krystallsyke er manøveren.',
        source: `${SRC.orig('index')} («Finnes det medisin mot krystallsyke?»), uten vurdering av Stemetil; ${SRC.nhi}`,
      },
    ],
    related: ['diagnosering', 'buegangene', 'bestill-time'],
    closing: {
      heading: 'Vil du at jeg ser på det?',
      lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
    },
  },

  'kommer-tilbake': {
    kind: 'landing',
    intro: t(
      'Har du langvarig krystallsyke? Hjalp ikke øvelsene, eller kommer det tilbake? Da ser jeg på nytt hvilken side og hvilken buegang det gjelder, og om det i det hele tatt er krystaller. Ofte ligger krystallene i en annen buegang enn øvelsene er laget for, eller etterdønningene ble aldri trent opp.',
      `${SRC.orig('øvelser')} («Langtstående svimmelhetsplager ... dette er dessverre ikke uvanlig»); ${SRC.kw('langvarig krystallsyke, kronisk krystallsyke')}`,
    ),
    timeline: TIMELINE,
    showEquipment: true,
    showPrice: true,
    referral: referral('Når er det noe annet enn krystaller?'),
    sections: [
      {
        id: 'provd',
        eyebrow: 'Det du har prøvd',
        heading: 'Prøvd øvelsene uten at det hjalp?',
        body: [
          t(
            'Da har du gjort det riktige. Men Epley hjelper bare for bakre buegang, på riktig side. Ligger krystallene i horisontal buegang, eller på begge sider, kommer svimmelheten tilbake uansett hvor mange ganger du gjør øvelsen. Det første jeg gjør, er å finne ut om det er krystaller, og hvor.',
            `${SRC.orig('øvelser')}; ${SRC.orig('diagnosering')}`,
          ),
          t(
            'Har du gjort øvelser lenge uten at det hjalp, er det en grunn til å stoppe og bli undersøkt. Gjentatte øvelser mens krystallene ligger feil, kan få hjernen til å kompensere for feilsignalene fra buegangen. Det koster krefter, og over tid kan kompensasjonen svikte og gi en mer varig svimmelhet som tar lengre tid å trene bort. Det er min faglige vurdering.',
            `${OLVE_SPM} (spørsmål 5)`,
          ),
          t(
            'Har du blitt bedre av behandling, men fått det igjen, er du ikke alene. Mange får krystallsyke på nytt. Da er behandlingen den samme, men jeg ser også etter grunner til at det gjentar seg, og lærer deg å sjekke selv.',
            `${SRC.helsenorge} («høy risiko for å få den igjen»); ${SRC.orig('behandling')}`,
          ),
        ],
      },
      {
        id: 'kommer-tilbake',
        eyebrow: 'Tilbakefall',
        heading: 'Kommer krystallsyken tilbake?',
        body: [
          t(
            'Ofte, ja. Helsenorge skriver at det er høy risiko for å få krystallsyke igjen, og at behandlingen ved tilbakefall vanligvis er den samme. Grunnen er at det som gjorde krystallene løse, ofte alder, fortsatt er der. Kommer det igjen raskt etter behandling, kan det også være at ikke alle krystallene ble flyttet, eller at flere bueganger var involvert. Begge deler ser jeg etter på kontrollen.',
            `${SRC.helsenorge} («høy risiko for å få den igjen»); ${SRC.orig('behandling')} («Tilbakefall av krystallsyke forekommer relativt hyppig»)`,
          ),
        ],
      },
      {
        id: 'etterdonninger',
        eyebrow: 'Svimmel hele tiden?',
        heading: 'Svimmel hele tiden, også mellom anfallene?',
        body: [
          t(
            'Noen er svimle hele tiden, ikke i anfall. Da er det ofte ikke krystaller lenger, men etterdønninger. Har du gått lenge med krystaller uten at det ble behandlet, kan det påvirke nervesystemet, og da må det trenes opp igjen. For å se hvor svakheten sitter, måler jeg øyebevegelsene med VNG og balansen med en datastyrt test (CAPS). {{OLVE_BEKREFT: CAPS i bruk}} Balansetesten gir ikke diagnosen alene, men den er en del av puslespillet, og jeg legger opp opptreningen etter det.',
            `${SRC.orig('øvelser')} («Langtstående svimmelhetsplager»); ${SRC.video(197, 'Har man hatt krystallproblematikk over tid og det ikke har blitt behandlet så kan det påvirke nervesystemet og må rehabiliteres')}; ${SRC.video2(120, 'om balanseapparatet i videoen, antatt CAPS, bekreftes av Olve: Dette apparatet gir meg ikke den fulle diagnosen på noen måte. Men det er en del av puslespillet')}; ${SRC.orig('trening')}`,
          ),
          t(
            'Vedvarende svimmelhet kan også være noe annet enn krystallsyke, som nakken, PPPD, migrene eller medisiner. Jeg undersøker bredt, og henviser videre når det trengs.',
            `${SRC.orig('svimmelhet')}`,
          ),
        ],
      },
      {
        id: 'neste-gang',
        eyebrow: 'Plan for neste gang',
        heading: 'Hva gjør jeg neste gang det kommer?',
        body: [
          t(
            'Du vet hva det er, og du vet hvor du skal. Etter endt rehabilitering bruker du Brandt-Daroff som en ukentlig sjekk, for eksempel hver mandag morgen. Kjenner du symptomene igjen, ta kontakt så fort du kan, så ser jeg på nytt hvilken side og hvilken buegang det gjelder. Jo før krystallene kommer på plass, jo kortere tid må hjernen kompensere for feil signaler fra øret. Lagre nummeret mitt, så har du det neste gang det snurrer.',
            `Olve via Trym 2026-11-12 (Brandt-Daroff som ukentlig screening etter endt rehabilitering); ${SRC.orig('behandling')} («jeg anbefaler 1x/uke»)`,
          ),
        ],
        link: { href: '/kontakt', label: 'Lagre nummeret mitt' },
      },
    ],
    faqs: [
      {
        question: 'Hva er langvarig krystallsyke?',
        answer:
          'Krystallsyke som har vart i mer enn noen uker, eller som kommer igjen og igjen. Hos de fleste går sykdommen over i løpet av dager til uker, men noen få får langvarige og hyppig tilbakevendende plager. Da anbefales undersøkelse, særlig hvis det er usikkert hvilken buegang det gjelder.',
        source: `${SRC.kw('langvarig krystallsyke')}; ${SRC.sml} («Noen få pasienter har langvarige og hyppig tilbakevendende plager»); Olve, kommentar #8 og 9 (side, ikke øre) 2026-11-16; Olve, kommentar #8 og 9 (side, ikke øre) 2026-11-16`,
      },
      {
        question: 'Finnes kronisk krystallsyke?',
        answer:
          'Krystallsyke er sjelden kronisk i den forstand at krystallene ligger der for alltid. Men den kan komme tilbake mange ganger over år, og etterdønningene kan bli langvarige hvis de ikke trenes opp. Det folk kaller kronisk krystallsyke, er oftest en av disse to, og begge kan gjøres noe med.',
        source: `${SRC.kw('kronisk krystallsyke')}; ${SRC.helsenorge}; ${SRC.orig('øvelser')}`,
      },
      {
        question: 'Jeg er svimmel hele tiden, nesten konstant. Er det krystallsyke?',
        answer:
          'Krystaller gir som regel anfall, ikke konstant svimmelhet. Er du svimmel hele tiden, er det oftere etterdønninger etter krystallsyke, nakken, PPPD eller noe annet. Men det er vanlig å ha begge deler, altså krystaller som gir anfall og en ustøhet imellom. Undersøkelsen skiller dem.',
        source: `${SRC.kw('svimmel hele tiden, konstant svimmel')}; ${SRC.orig('svimmelhet')}`,
      },
      {
        question: 'Hvorfor kommer krystallsyken tilbake?',
        answer:
          'Fordi det som gjorde krystallene løse, ofte alder, fortsatt er der. Mange får det igjen, gjerne med år imellom. Kommer det igjen raskt etter behandling, kan det også være at ikke alle krystallene ble flyttet, eller at det var flere bueganger involvert. Begge deler sjekker jeg på kontrollen.',
        source: `${SRC.orig('behandling')} («Tilbakefall av krystallsyke forekommer relativt hyppig»); ${SRC.helsenorge}`,
      },
      {
        question: 'Kan langvarig eller kronisk svimmelhet komme av gamle krystaller?',
        answer:
          'Ja, indirekte. Krystaller som har ligget lenge, gir hjernen feil signaler over tid, og den kompenserer. Når krystallene er borte, henger kompensasjonen igjen som ustøhet, trøtthet og utrygghet. Det trenes opp med vestibulær rehabilitering, og jeg måler først hvor svakheten sitter.',
        source: `${SRC.kw('langvarig svimmelhet, kronisk svimmelhet')}; ${SRC.orig('øvelser')}`,
      },
      {
        question: 'Hva gjør du annerledes ved vedvarende svimmelhet?',
        answer:
          'Jeg undersøker bredere. Begge sider, alle bueganger, øyebevegelsene med VNG og balansen med en datastyrt test (CAPS). {{OLVE_BEKREFT: CAPS i bruk}} Så behandler jeg krystallene hvis de er der, og legger opp opptrening etter målingene. Er svimmelheten ikke fra øret, sier jeg det, og henviser deg videre til lege.',
        source: `${SRC.kw('vedvarende svimmelhet')}; ${SRC.orig('øvelser')} («Disse undersøkelsene, VNG, CAPS og balanseutfordrings-tester»)`,
      },
    ],
    related: ['buegangene', 'arsaker', 'behandling'],
    closing: {
      heading: 'Vil du at jeg ser på det på nytt?',
      lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
    },
  },
}

/* ------------------------------------------------------------------ */
/* Local landing (/lillestrom)                                          */
/* ------------------------------------------------------------------ */

export const LOCAL_CONTENT: LocalContent = {
  kind: 'local',
  intro: t(
    'Ved krystallsyke i Lillestrøm møter du meg, Olve Lyngset, i Storgata 25B. Med infrarøde videobriller undersøker jeg om det er krystaller og hvor, før jeg behandler. Pasientene kommer fra hele Romerike, og en del fra Oslo.',
    `${SRC.config}; ${SRC.limbra} («en erfaren behandler for pasienter på Romerike og omkringliggende områder»)`,
  ),
  areas: [
    t('Lillestrøm', SRC.config),
    t('Strømmen og Skedsmo', SRC.kw('kiropraktor strømmen')),
    t('Lørenskog og Rælingen', SRC.kw('kiropraktor lørenskog')),
    t('Jessheim og Ullensaker', SRC.kw('kiropraktor jessheim')),
    t('Nittedal og Aurskog-Høland', SRC.kw('kiropraktor bjørkelangen')),
    t('Oslo', SRC.kw('krystallsyke behandling oslo')),
  ],
  practical: [
    t(
      'Lillestrøm stasjon har hyppige avganger fra Oslo S (rundt 10 minutter) og fra Romerike. Fra stasjonen er det noen få minutters gange til Storgata 25B.',
      `Vy/Bane NOR rutetabell, generelt kjent; ${OLVE_SVAR} (gangavstand)`,
      'Tog',
    ),
    t(
      'Lillestrøm bussterminal ligger ved stasjonen, med busser fra hele Romerike. Derfra er det også noen få minutters gange.',
      `Ruter, generelt kjent; ${OLVE_SVAR} (gangavstand)`,
      'Buss',
    ),
    t(
      'Klinikken har ingen egen parkering. Du kan parkere i parkeringshuset på Lillestrøm Torv.',
      `${OLVE_SVAR} («NEI ingen parkering»)`,
      'Parkering',
    ),
    t(
      'Inngangen er på gateplan, og det er Limbra som står på skiltet.',
      `${OLVE_SVAR} («gateplan», skiltet «Ja»)`,
      'Inngang',
    ),
  ],
  sections: [
    {
      id: 'fra-oslo',
      eyebrow: 'Reisevei',
      heading: 'Behandling av krystallsyke fra Oslo, Lørenskog eller Jessheim?',
      body: [
        t(
          'Du trenger ikke bo i Lillestrøm. Fra Oslo S tar toget rundt ti minutter, og fra Jessheim, Lørenskog og Strømmen er det kort vei. Du bestiller time på nett uansett hvor du kommer fra.',
          `${SRC.kw('krystallsyke behandling oslo, kiropraktor jessheim')}`,
        ),
        t(
          'De fleste som kommer er over 60 og har fått svimmelheten uten forvarsel. Mange har vært hos fastlegen først, og noen har prøvd øvelser hjemme uten at det hjalp. Jeg ser også yngre, ofte etter en hodeskade eller en periode med sykdom, og en del som har gått lenge med en ustøhet de ikke har fått svar på.',
          `${SRC.orig('index')}; ${SRC.orig('årsaker')}`,
        ),
      ],
    },
    {
      id: 'kiropraktor-lillestrom',
      eyebrow: 'Kiropraktor i Lillestrøm',
      heading: 'Kiropraktor i Lillestrøm, for svimmelhet og krystallsyke',
      body: [
        t(
          'Jeg er kiropraktor, og behandler også nakke, rygg og hodepine. Men svimmelhet, krystallsyke og plager etter hjernerystelse er det jeg har fordypet meg mest i, og det er derfor denne siden handler om krystallsyke. Trenger du hjelp med noe annet, spør gjerne. {{OLVE_BEKREFT: hvordan krystallsyke etter hjernerystelse skal omtales}}',
          `${SRC.limbra} (fokusområder); ${SRC.kw('kiropraktor lillestrøm')}`,
        ),
      ],
    },
    {
      id: 'timen',
      eyebrow: 'Første time',
      heading: 'Hvor lang er første time?',
      body: [
        t(
          'Første time tar 40 til 50 minutter. Da har vi samtale, undersøkelse med videobriller, og behandling hvis det er krystaller. Du betaler etter timen. Spør om pris når du ringer.',
          `${OLVE_SPM} (40 til 50 minutter); beslutning 2026-11-11: ingen priser på siden foreløpig`,
        ),
      ],
      link: { href: '/bestill-time', label: 'Bestilling og første time' },
    },
    {
      id: 'henvisning',
      eyebrow: 'Henvisning',
      heading: 'Trenger jeg henvisning?',
      body: [
        t(
          'Nei. Du kan bestille selv, og kiropraktorer er primærkontakter, så du trenger ikke gå via fastlegen først.',
          `${SRC.helfo}`,
        ),
      ],
    },
  ],
  faqs: [
    {
      question: 'Finnes det kiropraktor i Lillestrøm som behandler krystallsyke?',
      answer:
        'Ja. Jeg heter Olve Lyngset og er kiropraktor i Storgata 25B i Lillestrøm. Krystallsyke og svimmelhet er hovedområdet mitt, og jeg undersøker med infrarøde videobriller før jeg behandler. Du trenger ikke henvisning, og du kan bestille time på nett.',
      source: `${SRC.kw('kiropraktor lillestrøm, lillestrøm kiropraktor')}; ${SRC.config}`,
    },
    {
      question: 'Jeg bor i Oslo. Kan jeg få behandling for krystallsyke hos deg?',
      answer:
        'Ja. Toget fra Oslo S til Lillestrøm tar rundt ti minutter, og klinikken ligger i Storgata, kort vei fra stasjonen. Du trenger ikke henvisning. Book en time selv. Om du får behandling samme dag, avhenger av hva undersøkelsen viser, men ofte gjør du det.',
      source: `${SRC.kw('krystallsyke behandling oslo, krystallsyke oslo')}`,
    },
    {
      question: 'Finnes det kiropraktor nær Jessheim, Lørenskog og Strømmen?',
      answer:
        'Strømmen ligger noen minutter unna med tog eller bil. Lørenskog og Rælingen er en kort kjøretur. Fra Jessheim og Ullensaker går det tog rett til Lillestrøm. Jeg har pasienter fra hele Romerike. Klinikken har ingen egen parkering. Du kan parkere i parkeringshuset på Lillestrøm Torv.',
      source: `${SRC.kw('kiropraktor jessheim, kiropraktor lørenskog, kiropraktor strømmen')}; ${SRC.orig('kontakt-oss')}`,
    },
    {
      question: 'Hva gjør jeg hvis jeg er for svimmel til å reise?',
      answer:
        'Ta med noen som kan kjøre deg, eller ta toget, så slipper du å kjøre selv. Er du så svimmel at du ikke kan stå eller gå, også med hodet i ro, skal du ikke til meg, men kontakte fastlege eller legevakt samme dag. Ved tegn på hjerneslag ringer du 113.',
      source: `${SRC.trym}; ${SRC.helsenorge}`,
    },
  ],
  related: ['behandling', 'bestill-time', 'kontakt'],
  closing: {
    heading: 'Vil du at jeg ser på det?',
    lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
  },
}

/* ------------------------------------------------------------------ */
/* Practitioner profile (/om-meg)                                       */
/* ------------------------------------------------------------------ */

export const PRACTITIONER_CONTENT: PractitionerContent = {
  kind: 'practitioner',
  intro: t(
    'Jeg er Olve Lyngset, kiropraktor i Lillestrøm. Jeg har vært kiropraktor siden 1993 og har hatt fokus på svimmelhet de siste 25 årene, med videreutdanning i nevrologi (DACNB). Målet mitt er å finne ut hva svimmelheten kommer av, ikke bare dempe den.',
    `${SRC.limbra} («arbeider Olve for å finne mulige årsaker til plagene, ikke bare behandle symptomene»)`,
  ),
  facts: [
    {
      label: 'Tittel',
      value: t('Kiropraktor med videreutdanning i nevrologi (DACNB)', 'VURDERING.md §4'),
    },
    {
      label: 'Autorisasjon',
      value: t('Autorisert kiropraktor, HPR-nummer 8056501', 'Trym 2026-11-12 (HPR-nummer)'),
    },
    {
      label: 'Utdanning',
      value: t(
        'Palmer College of Chiropractic, USA, 1993.',
        `${SRC.orig('om-oss')} («uteksaminert fra Palmer college of Chiropractic i 1993»)`,
      ),
    },
    {
      label: 'Erfaring',
      value: t('Kiropraktor siden 1993, med fokus på svimmelhet de siste 25 årene', OLVE_SVAR),
    },
    {
      label: 'Språk',
      value: t('Norsk, svensk, dansk og engelsk', SRC.limbra),
    },
    {
      label: 'Undervisning',
      value: t(
        'Har holdt foredrag i Norsk Kiropraktorforening (NKF) og undervist andre kiropraktorer i nevrologi og svimmelhet. {{OLVE_BEKREFT: om undervisningen fortsatt pågår}}',
        `${SRC.orig('om-oss')}; ${SRC.helsesmart}`,
      ),
    },
  ],
  sections: [
    {
      id: 'utdanning',
      eyebrow: 'Utdanning',
      heading: 'Utdanning og videreutdanning',
      body: [
        t(
          'Jeg er født og oppvokst på Skjetten, et par kilometer fra klinikken. Kiropraktorutdannelsen tok jeg i USA, ved Palmer College of Chiropractic. {{OLVE_BEKREFT: at historien om ishockeyskaden og møtet med kiropraktoren (helsesmart.no) skal brukes, og hvordan}}',
          `${SRC.orig('om-oss')}; ${SRC.helsesmart}`,
        ),
        t(
          'Siden har jeg holdt på med etterutdanning hele tiden, og i 2003 tok jeg den amerikanske videreutdanningen i nevrologi for kiropraktorer (DACNB). Det er ikke en norsk godkjent spesialitet, men det er grunnen til at jeg ser på svimmelhet som et spørsmål om hvordan nervesystemet tolker balanse, ikke bare om krystaller.',
          `${SRC.orig('om-oss')} («ble ... uteksaminert ... i 2003»), omskrevet uten «femte i Norge» og uten tittel; VURDERING.md §4`,
        ),
      ],
    },
    {
      id: 'hvorfor-svimmelhet',
      eyebrow: 'Hvorfor svimmelhet',
      heading: 'Hvorfor svimmelhet?',
      body: [
        t(
          'Svimmelhet ble et hovedområde fordi det er så mange som går lenge med det, og fordi undersøkelsen avgjør så mye av behandlingen. De siste årene har jeg også arbeidet mye med hjernerystelse og langvarige plager etterpå. {{OLVE_BEKREFT: din egen grunn til at det ble svimmelhet}}',
          `${SRC.limbra} («har et særlig fokus på svimmelhet, balanseproblemer, hjernerystelse og post commotio»)`,
        ),
      ],
    },
    {
      id: 'utstyret',
      eyebrow: 'Utstyret',
      heading: 'Utstyret jeg bruker',
      body: [
        t(
          'Jeg undersøker alltid før jeg behandler. Sykehistorien og en nevrologisk undersøkelse kommer først, så jeg vet om du hører hjemme hos meg eller hos legen. Så ser jeg på øynene dine med infrarøde videobriller, og tester buegangene. Først når jeg vet om det er krystaller, og hvor, velger jeg manøver.',
          `${SRC.orig('diagnosering')}; ${SRC.orig('behandling')}`,
        ),
        t(
          'I videoen «Behandling av krystallsyken» forklarer jeg det slik: «Behandlingen kalles Epleys manøver og er en behandling hvor vi flytter pasientens hode på en spesiell måte, slik at krystallene finner veien tilbake til der hvor de skal være.» Videoen er fra 2015, og hele videoen ligger ikke her; et klipp av undersøkelsen kommer når det er godkjent. {{OLVE_BEKREFT: bruk av video og portrett, hvilke klipp som godkjennes, og at manøveren er den samme i dag}}',
          `${SRC.video(134, 'Behandlingen kalles eppelismanøver [Epleys manøver] og er en behandling hvor vi flytter pasientens hode på spesiell måte slik at krystallene finner veien tilbake til der hvor de skal være')}; YouTube-opplasting 2015-04-10`,
        ),
        t(
          'Jeg bruker videonystagmografi (VNG) for å måle øyebevegelsene, og en datastyrt balansetest (CAPS) når svimmelheten har stått lenge. {{OLVE_BEKREFT: CAPS i bruk}} Målingene forteller hva som skal trenes opp. Og jeg henviser videre når det trengs: til fastlege, øre-nese-hals-lege, bildediagnostikk eller, i sjeldne tilfeller, til en klinikk med TRV-stol.',
          `${SRC.orig('trening')}; ${SRC.orig('svimmelhet')}; ${SRC.limbra} (VNG og VOG)`,
        ),
        t(
          'Jeg har også lang erfaring med nakke, rygg, hodepine og andre plager i muskler og ledd. Men denne siden handler om krystallsyke, fordi det er der jeg har mest å bidra med.',
          `${SRC.limbra} (fokusområder); ${SRC.orig('om-oss')}`,
        ),
      ],
    },
    {
      id: 'sprak',
      eyebrow: 'Språk',
      heading: 'Norsk, svensk, dansk eller engelsk',
      body: [
        t(
          'Du kan snakke norsk, svensk, dansk eller engelsk med meg, både på telefon og på timen.',
          SRC.limbra,
        ),
      ],
    },
    {
      id: 'klinikken',
      eyebrow: 'Hvem er hvem',
      heading: 'Eureka, Limbra og krystallsyken.no: hvem er hvem?',
      body: [
        t(
          'Jeg startet Strømmen Kiropraktiske Klinikk i 1995, og drev lenge under navnet Eureka kiropraktikk på Strømmen og i Lillestrøm. I dag holder jeg til hos Limbra i Storgata 25B i Lillestrøm. Det er Limbra som står på skiltet, og det er klinikkens kalender du bestiller time i. Krystallsyken.no er min egen side, og den handler bare om svimmelhet og krystallsyke. {{OLVE_BEKREFT: historikken for Eureka og tidspunkt for flytting til Limbra}}',
          `1881.no (Strømmen Kiropraktiske Klinikk, etablert 1995); ${SRC.orig('kontakt-oss')} (Eureka kiropraktikk Lillestrøm); ${SRC.limbra}`,
        ),
      ],
    },
  ],
  showVideo: false,
  faqs: [
    {
      question: 'Hvem er Olve Lyngset?',
      answer:
        'Kiropraktor i Lillestrøm, utdannet ved Palmer College of Chiropractic i USA, med videreutdanning i nevrologi (DACNB). Jeg har arbeidet med svimmelhet, krystallsyke og balanse i store deler av yrkeslivet, og holder til hos Limbra i Storgata 25B i Lillestrøm.',
      source: `${SRC.kw('olve lyngset')}; ${SRC.limbra}; ${SRC.orig('om-oss')}`,
    },
    {
      question: 'Hva skjedde med Eureka kiropraktikk i Lillestrøm?',
      answer:
        'Eureka var navnet på klinikken min på Strømmen og i Lillestrøm. I dag holder jeg til hos Limbra i Storgata 25B, i samme by. Telefonnummeret er det samme, og det er fortsatt meg du kommer til. {{OLVE_BEKREFT: ordlyden om Eureka og overgangen til Limbra}}',
      source: `${SRC.kw('eureka lillestrøm')}; ${SRC.orig('kontakt-oss')}; ${SRC.limbra}`,
    },
    {
      question: 'Hva er en nevrokiropraktor?',
      answer:
        'Et uformelt ord for en kiropraktor med videreutdanning i nevrologi, slik som den amerikanske DACNB-sertifiseringen jeg har. Det er ikke en godkjent spesialitet i Norge, og jeg bruker ikke tittelen. Det det betyr i praksis, er at jeg undersøker nervesystemet og balansesystemet, ikke bare nakke og rygg.',
      source: `${SRC.kw('olve lyngset')} (forklarende FAQ); VURDERING.md §4`,
    },
    {
      question: 'Hva er krystallsyken.no?',
      answer:
        'Nettsiden min om krystallsyke og svimmelhet. Her forklarer jeg hva krystallsyke er, hvordan jeg undersøker og behandler, og hvilke øvelser som finnes. Tekstene bygger på mine egne tekster, med lenker til helsenorge.no og Store medisinske leksikon der det passer. {{OLVE_BEKREFT: at alle tekstene er lest og godkjent av deg}} Du kan også bestille time her.',
      source: `${SRC.kw('krystallsyken.no')}`,
    },
  ],
  related: ['behandling', 'bestill-time', 'kontakt'],
  closing: {
    heading: 'Vil du at jeg ser på det?',
    lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
  },
}

/* ------------------------------------------------------------------ */
/* Booking page (/bestill-time), deeplink + price                      */
/* ------------------------------------------------------------------ */

export const BOOKING_CONTENT: BookingContent = {
  kind: 'booking',
  intro: t(
    'Trykk «Book en time» og velg en tid i kalenderen min hos {{OLVE_BEKREFT: Limbra Lillestrøm | Limbra Lillestrøm}}. Første time hos kiropraktor tar 40 til 50 minutter. Spør om pris når du ringer. Du trenger ikke henvisning. Første time er samtale, undersøkelse med videobriller, og behandling hvis det er krystaller. Svimmelhetspasienter blir prioritert, slik at ventetiden blir så kort som mulig.',
    `Solvit onlinebooking; ${SRC.helfo}; ${OLVE_SPM} (spørsmål 1 og 2)`,
  ),
  whatHappens: [
    {
      title: 'Samtale',
      body: t(
        'Jeg spør om når svimmelheten kom, hva som utløser den, og om hodeskader, sykeleie og medisiner. Så gjør jeg en nevrologisk undersøkelse og tester balansen.',
        `${SRC.olve2026}; ${SRC.orig('diagnosering')}`,
      ),
    },
    {
      title: 'Undersøkelse med videobriller',
      body: t(
        'Du får på deg infrarøde videobriller, og jeg legger deg ned på ryggen med hodet i forskjellige posisjoner. Øyebevegelsen viser om det er krystaller, og hvor. Testen kan gjøre deg svimmel, vanligvis i 10 til 15 sekunder, og jeg følger med på deg hele tiden.',
        SRC.olve2026,
      ),
    },
    {
      title: 'Behandling når det passer',
      body: t(
        'Er det krystallsyke, leder jeg krystallene tilbake på plass ved å føre hodet og kroppen din gjennom noen faste stillinger. Du får råd for de første dagene, og vi avtaler kontroll. Hvor mange behandlinger som trengs, varierer.',
        SRC.olve2026,
      ),
    },
  ],
  beforeVisit: [
    t(
      'Jeg anbefaler at du blir kjørt til første time. Noen blir kvalme under undersøkelsen, og du bør ikke kjøre selv så lenge du får anfall.',
      `${OLVE_SPM} (spørsmål 2); ${SRC.trym}`,
    ),
    t(
      'Ta med en liste over medisinene du bruker, og noter gjerne når svimmelheten kom og hva som utløser den.',
      SRC.orig('diagnosering'),
    ),
    t(
      'Du trenger ikke henvisning. Kiropraktorer er primærkontakter, så du kan bestille direkte.',
      SRC.helfo,
    ),
    confirmLine(
      'Refusjon fra Helfo og frikort:',
      'om refusjon fra Helfo og frikort håndteres av klinikken, og hvordan',
    ),
  ],
  faqs: [
    {
      question: 'Hvordan får jeg vite pris hos kiropraktor?',
      answer:
        'Spør om pris når du ringer. Første time tar 40 til 50 minutter, med samtale og undersøkelse med videobriller. Om du får behandling samme dag, avhenger av hva jeg finner, men ofte gjør du det. Du betaler etter timen.',
      source: `${SRC.kw('kiropraktor pris')}; beslutning 2026-11-11: ingen priser på siden foreløpig; Olve, kommentar #11 2026-11-16`,
    },
    {
      question: 'Trenger jeg henvisning til kiropraktor?',
      answer:
        'Nei. Du trenger ingen henvisning. Kiropraktorer har vært primærkontakter siden 2006, så du bestiller time direkte uten å gå via fastlegen. Det gjelder også for Helfo-refusjon. Har du vært hos legen først, er det fint, ta gjerne med det legen fant.',
      source: `${SRC.kw('kiropraktor henvisning, kiropraktor uten henvisning')}; ${SRC.helfo}`,
    },
    {
      question: 'Dekker Helfo eller forsikringen kiropraktor?',
      answer:
        'Helfo gir et fast beløp i refusjon for inntil 14 behandlinger hos kiropraktor per kalenderår, uten henvisning. Refusjonen er liten i forhold til prisen, og behandling hos kiropraktor teller ikke mot frikortet. {{OLVE_BEKREFT: om klinikken sender refusjonskrav direkte til Helfo, eller om du må søke selv}}',
      source: `${SRC.kw('kiropraktor helfo, kiropraktor refusjon')}; ${SRC.helfo}`,
    },
    {
      question: 'Hva skjer når jeg trykker på Book en time?',
      answer:
        'Du sendes til nettbookingen hos Limbra Lillestrøm, klinikken jeg jobber fra. Det står Limbra øverst, ikke krystallsyken.no, og det er riktig. Kalenderen åpner på «Første gang». Velg en ledig tid hos meg, Olve Lyngset, legg inn navn og telefonnummer, og du får bekreftelse. Du betaler etter timen.',
      source: 'Solvit onlinebooking',
    },
    {
      question: 'Hvor lang er første time?',
      answer:
        'Første time tar 40 til 50 minutter. Vi har samtale, undersøkelse med videobriller, og behandling hvis det er krystaller. Til slutt får du råd om de første dagene, og vi avtaler kontroll. Undersøkelsen kan gjøre deg svimmel, så jeg anbefaler at du blir kjørt til første time.',
      source: `${OLVE_SPM} (spørsmål 2); ${SRC.orig('behandling')}`,
    },
    {
      question: 'Kan jeg bestille for noen andre?',
      answer:
        'Ja. I nettbookingen legger du inn navn og telefonnummer til den som skal komme. Bestiller du for en eldre forelder, er det fint om du blir med på timen. Da får begge med seg rådene for de første dagene og hvordan hjemmeøvelsen gjøres.',
      source: `${SRC.trym}`,
    },
  ],
  related: ['behandling', 'kontakt', 'lillestrom'],
  closing: {
    heading: 'Klar til å finne en tid?',
    lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
  },
}

/* ------------------------------------------------------------------ */
/* FAQ page (/sporsmal-og-svar)                                                 */
/* ------------------------------------------------------------------ */

export const FAQ_CONTENT: FaqPageContent = {
  kind: 'faq',
  intro: t(
    'Korte svar på det folk lurer mest på om krystallsyke, som alkohol, medisin, arv, smitte og fly. Finner du ikke svaret, ring meg eller bestill en time.',
    SRC.marked,
  ),
  groups: [
    {
      heading: 'Hverdagen med krystallsyke',
      faqs: [
        {
          question: 'Hva heter vertigo på norsk?',
          answer:
            'Svimmelhet, nærmere bestemt snurresvimmelhet eller karusellsvimmelhet. Vertigo er det medisinske ordet for følelsen av at du eller rommet roterer. Det er et symptom, ikke en sykdom. Krystallsyke er den vanligste årsaken til vertigo, men ikke den eneste.',
          source: `${SRC.kw('vertigo norsk')}; ${SRC.orig('svimmelhet')}`,
        },
        {
          question: 'Kan jeg drikke alkohol når jeg har krystallsyke?',
          answer:
            'Alkohol gir ikke krystallsyke, men den gjør svimmelheten verre. Alkohol påvirker balanseorganet og væsken i buegangene, og mange kjenner seg mer ustø dagen derpå. Har du krystaller på avveie, er det lurt å la alkohol ligge til du er ferdig behandlet og opptrent.',
          source: `${SRC.kw('krystallsyke og alkohol')}; ${SRC.nhiSvimmelhet} (alkohol som årsak til svimmelhet)`,
        },
        {
          question: 'Er krystallsyke arvelig?',
          answer:
            'Noen studier antyder en viss økt forekomst i noen familier, men funnene er ikke tydelige nok til å skille arv fra tilfeldighet. Alder er en langt sterkere faktor. Har foreldrene dine hatt krystallsyke, er det ingen grunn til uro, men det er greit å kjenne symptomene.',
          source: `${SRC.kw('er krystallsyke arvelig')}; ${SRC.orig('index')} («Er krystallsyke arvelig?»)`,
        },
        {
          question: 'Er krystallsyke smittsomt?',
          answer:
            'Nei. Krystallsyke er løse kalkkrystaller i ditt eget indre øre, og kan ikke smitte. Det som kan skje, er at en infeksjon, som influensa, belaster kroppen og gjør at krystaller løsner lettere. Infeksjonen smitter, men ikke krystallsyken.',
          source: `${SRC.kw('er krystallsyke smittsomt')}; ${SRC.orig('årsaker')}`,
        },
        {
          question: 'Kan jeg fly med krystallsyke?',
          answer:
            'Ja. Ingen kilder fraråder flyreise ved krystallsyke. Det som er ubehagelig, er å legge hodet bakover i setet eller bøye seg etter bagasjen. Beveg hodet rolig, og få det undersøkt og behandlet før reisen hvis du kan.',
          source: 'nøktern vurdering; ingen kilde fraråder flyreise ved krystallsyke',
        },
      ],
    },
    {
      heading: 'Medisin og behandling',
      faqs: [
        {
          question: 'Finnes det medisin mot svimmelhet?',
          answer:
            'Medisin kan dempe kvalmen, og ved virus på balansenerven eller Menières sykdom brukes medisiner i den akutte fasen. Ved krystallsyke flytter ingen medisin krystallene. Spør legen din om hva som passer for deg; det er fastlegen som vurderer medisiner, ikke jeg.',
          source: `${SRC.kw('medisin mot svimmelhet, medisiner mot svimmelhet')}; ${SRC.nhi}; ${SRC.orig('svimmelhet')}`,
        },
        {
          question: 'Hjelper Paracet mot svimmelhet?',
          answer:
            'Nei. Paracet virker på smerte og feber, ikke på balanseorganet. Har du hodepine sammen med svimmelheten, kan paracet dempe hodepinen, men svimmelheten blir den samme. Ved krystallsyke er det hodemanøvrer som hjelper. Plutselig kraftig hodepine med svimmelhet er et faresignal, ring 113.',
          source: `${SRC.marked}; ${SRC.kw('hjelper paracet mot svimmelhet')}; ${SRC.helsenorgeSlag}`,
        },
        {
          question: 'Hvilke tabletter kan brukes mot svimmelhet?',
          answer:
            'Det avgjør fastlegen ut fra årsaken. Ved virus på balansenerven eller Menière kan legen gi noe i den akutte fasen. Ved krystallsyke finnes det ingen tablett som hjelper på årsaken. Jeg gir ingen råd om medisiner, men undersøker gjerne om svimmelheten er noe jeg kan behandle.',
          source: `${SRC.marked}; ${SRC.orig('svimmelhet')} («har ikke lov til å anbefale eller fraråde mine pasienter hva slags medisiner de tar»)`,
        },
        {
          question: 'Kan D-vitamin forebygge krystallsyke?',
          answer:
            'Forskning har knyttet lavt D-vitaminnivå til hyppigere tilbakefall, og helsenorge nevner D-vitaminmangel som en risikofaktor. Men D-vitamin behandler ikke krystaller som allerede er på avveie. Får du krystallsyke flere ganger, kan det være verdt å spørre fastlegen om å måle nivået.',
          source: `${SRC.orig('behandling')} («Kan D vitaminer være en behandling for krystallsyke?»), uten studiereferanse; ${SRC.helsenorge}; ${SRC.sml}`,
        },
        {
          question: 'Hvem kan undersøke og behandle krystallsyke?',
          answer:
            'Fastleger, fysioterapeuter, kiropraktorer og øre-nese-hals-leger. Mange fastleger gjør Epley selv. Videobriller gjør det lettere å se hvilken buegang det gjelder. Er du i tvil om hvor du skal, start hos fastlegen eller bestill time hos meg.',
          source: `${SRC.trym}; ${SRC.sml}`,
        },
      ],
    },
  ],
  faqs: [],
  related: ['hva-er-krystallsyken', 'ovelser', 'behandling'],
  closing: {
    heading: 'Fikk du ikke svar på det du lurte på?',
    lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
  },
}

/* ------------------------------------------------------------------ */
/* Contact (/kontakt)                                               */
/* ------------------------------------------------------------------ */

export const CONTACT_CONTENT: ContactContent = {
  kind: 'contact',
  intro: t(
    'Du booker time selv i kalenderen min, uten henvisning. Her finner du også telefonnummeret og veien til klinikken.',
    `${SRC.spec} §6; ${SRC.orig('kontakt-oss')}`,
  ),
  practical: [
    t(
      'Klinikken har ingen egen parkering. Du kan parkere i parkeringshuset på Lillestrøm Torv.',
      `${OLVE_SVAR} («NEI ingen parkering»)`,
      'Parkering',
    ),
    t(
      'Inngangen er på gateplan, og det er Limbra som står på skiltet.',
      `${OLVE_SVAR} («gateplan», skiltet «Ja»)`,
      'Inngang',
    ),
    confirmLine(
      'E-post:',
      'e-postadresse som skal vises (olve.lyngset@me.com stod på den gamle siden)',
    ),
  ],
  faqs: [],
  related: ['bestill-time', 'lillestrom', 'om-meg'],
  closing: {
    heading: 'Vil du at jeg ser på det?',
    lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
  },
}

/* ------------------------------------------------------------------ */
/* Privacy (/personvern), GDPR art. 13, from the real data flows        */
/* ------------------------------------------------------------------ */

export const PRIVACY_CONTENT: PrivacyContent = {
  kind: 'privacy',
  updated: '2026-11-12',
  intro: t(
    'krystallsyken.no har ingen skjemaer og ber deg ikke om opplysninger om deg selv. Her står hva siden behandler, hvorfor, og hvilke rettigheter du har. Siden bruker ikke sporingscookies.',
    'faktiske dataflyter i dette repoet',
  ),
  sections: [
    {
      id: 'ansvarlig',
      heading: 'Hvem er ansvarlig?',
      body: [
        t(
          'Behandlingsansvarlig er LOL AS, org.nr. 928 308 979, ved Olve Lyngset. Du finner kontaktinformasjonen på kontaktsiden.',
          'Trym 2026-11-12 (juridisk navn LOL AS); Brønnøysundregistrene (org.nr., styreleder Leif Olve Lyngset)',
        ),
      ],
    },
    {
      id: 'booking',
      heading: 'Timebestilling',
      body: [
        t(
          'Når du trykker «Book en time» sendes du via adressen /go/bestill til bookingsystemet til klinikken (Solvit Journal). Der gjelder klinikkens personvernerklæring. Jeg registrerer bare at lenken ble brukt, hvilken side du kom fra og om det var mobil eller datamaskin, uten IP-adresse eller andre opplysninger om deg.',
          'src/app/go/bestill/route.ts og src/app/api/booking-klikk/route.ts',
        ),
      ],
    },
    {
      id: 'maaling',
      heading: 'Informasjonskapsler og måling',
      body: [
        t(
          'Nettsiden teller besøk per side uten informasjonskapsler, uten IP-adresse og uten identifikator. Tellingen kan ikke knyttes til deg.',
          'src/middleware.ts (site_hits, valgfri)',
        ),
      ],
    },
    {
      id: 'rettigheter',
      heading: 'Dine rettigheter',
      body: [
        t(
          'Du kan be om innsyn, retting og sletting av opplysninger om deg, og du kan klage til Datatilsynet.',
          'GDPR art. 15 til 17, 77',
        ),
      ],
    },
  ],
}
