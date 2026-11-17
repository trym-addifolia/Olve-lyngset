import { SRC, URLS } from './sources'
import type { HomeContent } from './types'

/*
 * Home.
 * Olve's first person throughout. The one
 * idea the page repeats: the eye movements show whether it is crystals and
 * where, and that decides the treatment. Said as examination («for å finne
 * ut», «ser etter»), never as a certain diagnosis. hpl § 13: no effect
 * numbers, no cure promise, no testimonials as proof.
 */
export const HOME_CONTENT: HomeContent = {
  kind: 'home',
  hero: {
    lede: {
      text: 'Alt går rundt når du snur deg? Med infrarøde videobriller ser jeg etter øyebevegelsene som ved krystallsyke viser hvilken side og hvilken buegang det gjelder.',
      source: `${SRC.limbra} (VOG, VNG); ${SRC.video(85, 'Disse brillene er et infrarødt kamera som da gir meg muligheten til å kunne se på øynene dine')}; Olve, kommentar #9 2026-11-16`,
    },
    factLine: {
      text: 'Storgata 25B, Lillestrøm · Uten henvisning · Kiropraktor siden 1993',
      source: `${SRC.config}; Olve 2026-11-11 (resultater/olve/2026-11-11-olve-svar-nettsiden.md) (henvisning, 1993, 1450)`,
    },
    figureCaption:
      'Balanseorganet i det indre øret, med de tre buegangene. Krystaller som har løsnet, kan bli liggende i en av dem.',
  },
  safety: {
    // Olve 2026-11-10: the old lede repeated the box («smør på flesk»); the heading and the box are enough
    heading: 'Krystallsyke er i seg selv ikke farlig, men svimmelhet kan ha andre årsaker',
    lede: '',
  },

  recognise: {
    heading: 'Kjenner du deg igjen?',
    lede: 'Slik beskriver mange krystallsyke (BPPV). Det er gjenkjennelse, ikke diagnose. Bare en undersøkelse kan avgjøre hva det er.',
    items: [
      {
        text: 'Du snur deg i sengen, og alt går rundt.',
        source: `${SRC.hort('hva-er-krystallsyken')} (omskrevet)`,
      },
      {
        text: 'Du legger deg ned eller setter deg opp, og rommet snurrer.',
        source: `${SRC.hort('hva-er-krystallsyken')} (omskrevet)`,
      },
      {
        text: 'Du ser opp i skapet eller bøyer deg, og det tar tak.',
        source: `${SRC.hort('hva-er-krystallsyken')}; ${SRC.orig('symptomer')}`,
      },
      {
        text: 'Anfallet varer under ett minutt. For de fleste går svimmelheten over, men noen kan være noe ør utover dagen.',
        source: `Olve på e-post 2026-11-10 (resultater/olve/2026-11-10-olve-epost-rettelser.jpg); ${SRC.orig('symptomer')}; ${SRC.helsenorge}`,
      },
    ],
  },
  wait: {
    id: 'vente',
    eyebrow: 'Går det over av seg selv?',
    heading: 'Må jeg vente til det går over?',
    body: [
      {
        text: 'Noen ganger går det over av seg selv. Helsenorge skriver at de aller fleste blir friske av krystallsyken, men at det kan ta tid, og at risikoen for å få den igjen er høy.',
        source: `${SRC.helsenorge} (${URLS.helsenorgeKrystallsyke}: «De aller fleste blir friske», «høy risiko for å få den igjen»); Olve, kommentar #10 2026-11-16`,
      },
      {
        text: 'Du trenger ikke vente det ut for å få det undersøkt. Du kan bestille time selv, uten henvisning. Svimmelhetspasienter blir prioritert, slik at ventetiden blir så kort som mulig.',
        source: `${SRC.helfo}; Olve på e-post 2026-11-11 (resultater/olve/2026-11-11-olve-svar-sporsmal.md) (spørsmål 1); Olve, kommentar #11 2026-11-16`,
      },
    ],
    link: { href: '/varighet', label: 'Hvor lenge varer krystallsyke?' },
  },
  eyes: {
    id: 'oynene',
    eyebrow: 'Undersøkelsen',
    heading: 'Hvorfor ser du på øynene mine?',
    body: [
      {
        text: 'Krystallene ligger i én av tre bueganger, i ett av ørene. Når du har brillene på og jeg legger deg bakover, og det er krystaller, får øynene en bestemt bevegelse (nystagmus). Retningen på den viser hvilken buegang og hvilken side det gjelder. Brillene bruker jeg på alle med svimmelhet og balanseproblemer, som en del av den nevrologiske undersøkelsen. Ved krystallsyke er de avgjørende for å stille diagnosen.',
        source: `${SRC.orig('diagnosering')} («Det er øyebevegelsen, eller nystagmusen og retning av denne som er avgjørende»); ${SRC.video(85)}; Olve 2026-11-11 (resultater/olve/2026-11-11-olve-svar-nettsiden.md) (brillene); Olve, kommentar #15 2026-11-16`,
      },
      {
        text: 'Det avgjør hvilken manøver som passer. Epley er laget for bakre buegang; ligger krystallene i horisontal buegang, trengs en annen. Testen kan også være negativ den dagen, og da sier jeg det.',
        source: `${SRC.orig('øvelser')}; ${SRC.sml} («Den vanligste varianten er otolitter i bakre buegang»)`,
      },
    ],
    link: { href: '/diagnosering', label: 'Slik foregår undersøkelsen' },
    figureCaption:
      'Brillene er et infrarødt kamera. På skjermen ser jeg øynene dine, også i mørket.',
  },
  tried: {
    id: 'provd-ovelser',
    eyebrow: 'Hjalp ikke øvelsene?',
    heading: 'Prøvd øvelsene uten at det hjalp?',
    body: [
      {
        text: 'Øvelsen må passe siden og buegangen krystallene ligger i. Epleys manøver er laget for bakre buegang på én side. Ligger krystallene i horisontal eller fremre buegang, eller på den andre siden, hjelper den ikke. Ved feil øvelse kan noen oppleve økt svimmelhet.',
        source: `${SRC.orig('øvelser')} («Det florerer av hjemmeøvelser på nettet ...»); Olve, kommentar #17 2026-11-16`,
      },
      {
        text: 'Det er øyebevegelsen og retningen på den som viser hvilken buegang det gjelder, ikke bare at du blir svimmel. Derfor undersøker jeg først, og behandler etterpå.',
        source: `${SRC.orig('øvelser')} («Det er øyebevegelsen, eller nystagmusen og retning av denne som er avgjørende»)`,
      },
      {
        text: 'Jeg fraråder øvelser hjemme før du er undersøkt. Gjør du øvelsene igjen og igjen mens krystallene ligger feil, kan hjernen begynne å kompensere for feilsignalene fra buegangen. Det koster krefter. Over tid kan kompensasjonen svikte, og da kan svimmelheten bli mer varig og ta lengre tid å trene bort. Det er min faglige vurdering.',
        source:
          'Olve på e-post 2026-11-11 (resultater/olve/2026-11-11-olve-svar-sporsmal.md) (spørsmål 5, Olves faglige vurdering)',
      },
    ],
    linkLabel: 'Les hvorfor øvelsene ikke virket',
  },
  process: {
    heading: 'Slik foregår timen',
    lede: 'Vi snakker, jeg undersøker, og behandler hvis det er krystaller. Er det noe annet, sier jeg fra.',
    steps: [
      {
        title: 'Samtale',
        figure: { name: 'samtale' },
        body: {
          text: 'Jeg spør når svimmelheten kom, hva som utløser den og hvor lenge anfallene varer. Jeg spør også om hodeskader, sykeleie, medisiner og andre plager. Sykehistorien er det viktigste jeg har for å utelukke andre årsaker.',
          source: `Olve på e-post 2026-11-10 (resultater/olve/2026-11-10-olve-epost-timen.jpg); ${SRC.olve2026}`,
        },
      },
      {
        title: 'Undersøkelse',
        figure: { name: 'dix-hallpike', caption: 'Dix-Hallpike-testen. Du har videobrillene på hele tiden.' },
        body: {
          text: 'For å utelukke andre årsaker til svimmelheten får du en grundig nevrologisk undersøkelse. Jeg undersøker nervesystemet ditt generelt og balanseorganet spesielt. For å kunne sette riktig diagnose er det viktig med riktig utstyr. Du får på deg briller med infrarødt kamera, så jeg kan se øynene dine i mørket. Det jeg ser etter, er en spesiell øyebevegelse (nystagmus) som oppstår når krystallene beveger seg. Det er retningen på den spontane øyebevegelsen som avgjør hvilken behandling som er riktig for akkurat deg.',
          source: `Olve på e-post 2026-11-10 (resultater/olve/2026-11-10-olve-epost-timen.jpg); ${SRC.olve2026}`,
        },
      },
      {
        title: 'Behandling',
        body: {
          text: 'Er det krystallsyke, flytter jeg hodet ditt på en bestemt måte, i noen faste stillinger, slik at krystallene ledes tilbake til der de skal være. Det kalles reposisjonering. For bakre buegang bruker jeg Epleys manøver, for horisontal buegang rullemanøveren (bbq-roll). Jeg tester alltid først at nakken din tåler bevegelsene. Om du får behandling samme dag, avhenger av hva undersøkelsen viser, men ofte gjør du det.',
          source: `Olve på e-post 2026-11-10 (resultater/olve/2026-11-10-olve-epost-timen.jpg); ${SRC.orig('behandling')}; Olve via Trym 2026-11-12 («Avhengig av funn, men ofte behandling samme dag»)`,
        },
      },
      {
        title: 'Etterpå',
        body: {
          text: 'Du kan bli litt sliten, og noen kjenner seg litt ør resten av dagen. Du får råd om hvordan du skal ligge og bevege hodet de første dagene. Et fullt forløp, med undersøkelse, behandlinger og rehabilitering, er vanligvis 4 til 6 behandlinger. Når undersøkelsen ikke lenger viser krystaller, får du hjemmeøvelsen Brandt-Daroff. Hjemmeøvelser skal ikke startes før jeg er sikker på at det ikke er krystaller på avveie.',
          source:
            'Olve på e-post 2026-11-10 (resultater/olve/2026-11-10-olve-epost-timen.jpg); Olve på e-post 2026-11-11 (resultater/olve/2026-11-11-olve-svar-sporsmal.md) (spørsmål 3)',
        },
      },
    ],
  },
  profile: {
    heading: 'Hvem møter jeg?',
    lede: 'Olve Lyngset, kiropraktor i Lillestrøm med videreutdanning i nevrologi (DACNB).',
    body: [
      {
        text: 'Jeg tok kiropraktorutdannelsen ved Palmer College of Chiropractic i USA og har arbeidet med svimmelhet og balanse i store deler av yrkeslivet. Svimmelhet, krystallsyke og plager etter hjernerystelse er det jeg har fordypet meg mest i. {{OLVE_BEKREFT: hvordan krystallsyke etter hjernerystelse skal omtales}}',
        source: `${SRC.orig('om-oss')}; ${SRC.limbra}`,
      },
      {
        text: 'Jeg har vært kiropraktor siden 1993, og har hatt fokus på svimmelhet de siste 25 årene.',
        source: 'Olve 2026-11-11 (resultater/olve/2026-11-11-olve-svar-nettsiden.md)',
      },
      {
        text: 'Det viktigste verktøyet mitt, ut over kunnskap, er videobrillene. Brillene er et infrarødt kamera som gir meg muligheten til å se på øynene dine, også mens du er svimmel. Uten dem er svake utslag, og forskjellen mellom buegangene, lett å overse.',
        source: `${SRC.orig('behandling')} («Det viktigste verktøyet ut over kunnskap er de infrarøde brillene»); ${SRC.video(85, 'Disse brillene er et infrarødt kamera som da gir meg muligheten til å kunne se på øynene dine')}`,
      },
      {
        text: 'Du kan snakke norsk, svensk, dansk eller engelsk med meg. Og jeg behandler ikke alt. Er det tegn på noe annet enn krystaller, sier jeg hva det kan være og hvem du bør gå til.',
        source: `${SRC.limbra} (språk); ${SRC.video(108, 'svimmelhet kan også helt klart ha andre årsaker')}`,
      },
    ],
  },
  price: {
    id: 'pris',
    eyebrow: 'Time og henvisning',
    heading: 'Hvordan får jeg time, og trenger jeg henvisning?',
    body: [
      {
        text: 'Første time tar 40 til 50 minutter. Da har vi samtale og undersøkelse med videobriller. Om du får behandling samme dag, avhenger av hva jeg finner, men ofte gjør du det. Jeg anbefaler at du blir kjørt til første time. Spør om pris når du ringer.',
        source:
          'Olve på e-post 2026-11-11 (resultater/olve/2026-11-11-olve-svar-sporsmal.md) (spørsmål 2); beslutning 2026-11-11: ingen priser på siden foreløpig',
      },
      {
        text: 'Du trenger ikke henvisning. Du kan bestille selv.',
        source: `${SRC.helfo}`,
      },
      {
        text: 'Klinikken ligger i Storgata 25B i Lillestrøm sentrum. Limbra står på skiltet ved inngangen, og inngangen er på gateplan.',
        source: `${SRC.config}; ${SRC.trym}`,
      },
    ],
    link: { href: '/bestill-time', label: 'Bestilling og hva som skjer på timen' },
    practical: [
      {
        label: 'Gangavstand',
        text: 'Noen få minutter fra Lillestrøm stasjon og bussterminalen.',
        source: 'Olve 2026-11-11 (resultater/olve/2026-11-11-olve-svar-nettsiden.md)',
      },
      {
        label: 'Parkering',
        text: 'Klinikken har ingen egen parkering. Du kan parkere i parkeringshuset på Lillestrøm Torv.',
        source:
          'Olve 2026-11-11 (resultater/olve/2026-11-11-olve-svar-nettsiden.md) («NEI ingen parkering»)',
      },
      {
        label: 'Inngang',
        text: 'På gateplan.',
        source: 'Olve 2026-11-11 (resultater/olve/2026-11-11-olve-svar-nettsiden.md) («gateplan»)',
      },
    ],
  },
  closing: {
    heading: 'Vil du at jeg ser på det?',
    lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
    figureCaption: 'Krystallene tilbake der de hører hjemme.',
  },
  depth: {
    heading: 'Alt om krystallsyke',
    lede: 'Fagsidene mine, for deg som vil forstå hva som skjer i det indre øret.',
  },
  faqs: [
    {
      question: 'Er vertigo farlig?',
      answer:
        'Som regel ikke. Vertigo betyr at det føles som om du eller rommet snurrer, og den vanligste årsaken er krystallsyke, som i seg selv er ufarlig. Kommer svimmelheten sammen med lammelse, skjevt ansikt, talevansker, dobbeltsyn eller plutselig kraftig hodepine, kan det være hjerneslag. Da ringer du 113 med en gang.',
      source: `${SRC.marked}; ${SRC.helsenorgeSlag}; ${SRC.sml}`,
    },
    {
      question: 'Kan man kurere krystallsyke?',
      answer:
        'Krystallsyke behandles med hodemanøvrer som leder krystallene ut av buegangen. Ifølge helsenorge blir de aller fleste friske, og mange blir også bra av seg selv i løpet av uker. Men har du hatt det én gang, er risikoen høy for å få det igjen. Da er behandlingen vanligvis den samme.',
      source: `${SRC.marked}; ${SRC.helsenorge} («De aller fleste blir friske av krystallsyken», «høy risiko for å få den igjen»)`,
    },
    {
      question: 'Går krystallsyke over av seg selv?',
      answer:
        'Ofte, ja. Hos mange går plagene over i løpet av dager til uker uten behandling. Men ikke hos alle, og noen går lenge med ustøhet og utrygghet imens. Ifølge Store medisinske leksikon gir hodemanøvrer vanligvis raskest bedring, og en undersøkelse ser også etter om svimmelheten kommer av noe annet.',
      source: `${SRC.marked}; ${SRC.sml} («Symptomene har en tendens til å gå over av seg selv i løpet av dager til uker», «raskest bedring oppnås vanligvis ved å utføre bestemte hodemanøvre»)`,
    },
    {
      question: 'Kan krystallsyken komme tilbake?',
      answer:
        'Ja. Har du hatt krystallsyke én gang, er risikoen høy for å få det igjen, ofte med flere år imellom. Derfor anbefaler jeg Brandt-Daroff-øvelsen som en ukentlig sjekk etter endt rehabilitering, for eksempel hver mandag morgen. Kjenner du symptomene igjen, ta kontakt med en gang, så får vi krystallene på plass så fort som mulig.',
      source: `${SRC.marked}; ${SRC.helsenorge}; ${SRC.orig('behandling')} («jeg anbefaler 1x/uke»); Olve via Trym 2026-11-12 (ukentlig screening etter endt rehabilitering)`,
    },
    {
      question: 'Er vertigo og krystallsyke det samme?',
      answer:
        'Nei. Vertigo er en type svimmelhet, følelsen av at du eller rommet snurrer. Krystallsyke er den vanligste årsaken til vertigo, men virus på balansenerven, Menières sykdom og migrene kan også gi det. Krystallsyke kjennes igjen på korte anfall som utløses av bestemte hodebevegelser.',
      source: `${SRC.marked}; ${SRC.sml}; ${SRC.orig('svimmelhet')}`,
    },
    {
      question: 'Hva betyr BPPV (benign paroksysmal posisjonell vertigo)?',
      answer:
        'BPPV er fagnavnet på krystallsyke. B står for benign, altså godartet. P for paroksysmal, som betyr anfallsvis. P for posisjonell, utløst av stilling eller bevegelse. V for vertigo, svimmelhet med følelse av å snurre. Kort sagt er det anfall av snurrende svimmelhet som kommer av hodebevegelser, og som i seg selv er ufarlige.',
      source: `${SRC.orig('hva-er-krystallsyken')} («B = Benign ...»); ${SRC.kw('bppv, benign posisjonell vertigo')}`,
    },
    {
      question: 'Hva utløser krystallsyke?',
      answer:
        'Oftest finner jeg ingen grunn. Krystallene løsner lettere med alderen, og de fleste jeg ser er over 60. Hos yngre er hodeskade en vanlig årsak. Sykeleie etter influensa eller operasjon og betennelse i det indre øret kan også øke risikoen, og helsenorge nevner at vitamin D-mangel kan gjøre det.',
      source: `${SRC.orig('index')} («Uflaks er det eneste jeg kan komme på»); ${SRC.helsenorge}; ${SRC.kw('hva utløser krystallsyke')}`,
    },
  ],
}
