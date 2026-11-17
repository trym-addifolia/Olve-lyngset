import { SRC, URLS } from './sources'
import type { HubContent, InfoContent, Section, Sourced } from './types'

/*
 * Info / condition pages and
 * the /svimmelhet hub. Keyed by slug. First person (Olve), patient language
 * first, clinical term in parentheses. Every paragraph carries a source.
 */

const t = (text: string, source: string, label?: string): Sourced =>
  label ? { text, source, label } : { text, source }

/** Step 4 of the condition template: who examines you and what it rests on. */
function whoExamines(extra?: string): Section {
  return {
    id: 'hvem',
    eyebrow: 'Hvem undersøker deg',
    heading: 'Hvem undersøker deg, og hva bygger det på?',
    body: [
      t(
        'Jeg heter Olve Lyngset og er kiropraktor i Lillestrøm, med videreutdanning i nevrologi (DACNB). Svimmelhet og balanse har vært et hovedområde for meg i store deler av yrkeslivet.',
        `${SRC.limbra}; ${SRC.orig('om-oss')}`,
      ),
      t(
        `Helsenorge.no og Store medisinske leksikon beskriver samme undersøkelse. Hodet føres i bestemte stillinger som kan utløse anfallet, og så ser man på øyebevegelsene som følger med. Jeg bruker videobriller med infrarødt kamera for å se dem tydelig i mørket.${extra ? ` ${extra}` : ''}`,
        `${SRC.helsenorge} (${URLS.helsenorgeKrystallsyke}); ${SRC.sml} (${URLS.sml})`,
      ),
    ],
  }
}

/** Step 5: make the first visit safe. */
function firstVisit(topicLine: string): Section {
  return {
    id: 'forste-besok',
    eyebrow: 'Første besøk',
    heading: 'Hva skjer på første time?',
    body: [
      t(
        `Vi starter med en samtale om sykehistorien din. ${topicLine} Så gjør jeg en nevrologisk undersøkelse og tester balansen, før du får på deg infrarøde videobriller og jeg legger deg ned på ryggen med hodet i forskjellige posisjoner. Testen kan gjøre deg svimmel, vanligvis i 10 til 15 sekunder, og jeg følger med på deg hele tiden.`,
        `${SRC.olve2026}; ${SRC.orig('diagnosering')}`,
      ),
      t(
        'Om du får behandling samme dag, avhenger av hva undersøkelsen viser, men ofte gjør du det. Du trenger ikke henvisning. Jeg anbefaler at du blir kjørt til første time.',
        `${SRC.orig('behandling')}; ${SRC.helfo}; Olve via Trym 2026-11-12 («Avhengig av funn, men ofte behandling samme dag»)`,
      ),
    ],
  }
}

export const INFO_CONTENT: Record<string, InfoContent | HubContent> = {
  /* ------------------------------------------------------------------ */
  'hva-er-krystallsyken': {
    kind: 'info',
    intro: t(
      'Små krystaller i det indre øret har løsnet og havnet der de ikke skal være. Når du beveger hodet, flytter de seg, og da går alt rundt en kort stund. Fagnavnet er BPPV (benign paroksysmal posisjonsvertigo). Det er den vanligste formen for svimmelhet jeg behandler, og den er i seg selv ufarlig.',
      `${SRC.orig('hva-er-krystallsyken')} («Krystallsyken er den vanligste formen for svimmelhet vi behandler ...»); ${SRC.sml}`,
    ),
    sections: [
      {
        id: 'plagen',
        eyebrow: 'Kjenner du deg igjen?',
        heading: 'Hvorfor går alt rundt når jeg snur meg?',
        body: [
          t(
            'Det begynner ofte om morgenen. Du snur deg, setter deg opp eller legger deg ned, og rommet snurrer i noen sekunder. Så gir det seg, og du sitter igjen kvalm og utrygg. Mange lærer seg å bevege hodet sakte for å slippe unna.',
            `${SRC.hort('hva-er-krystallsyken')}; ${SRC.orig('svimmelhet')} («Mange pasienter ... lærer seg til å bevege hodet rolig»)`,
          ),
        ],
      },
      {
        id: 'mekanismen',
        eyebrow: 'Slik henger det sammen',
        heading: 'Hvor i øret sitter krystallene?',
        body: [
          t(
            '«Kort fortalt så er krystallsyken at krystaller som skal være et sted, har havnet et annet sted og forårsaker svimmelhet ved bevegelse.» Slik sa jeg det i videoen «Behandling av krystallsyken», og det er fortsatt den enkleste måten å forklare det på.',
            SRC.video(
              120,
              'Kort fortalt så er krystallsyken at krystaller som skal være et sted har havnet et annet sted og forårsaker svimmelhet ved bevegelse',
            ),
          ),
          t(
            'Innerst i øret, på toppen av sneglehuset, ligger balanseorganet ditt. Der ligger det små krystaller (otolitter) på en geléplate. De skal være der. De fungerer som små vekter som gjør at du kjenner bevegelse og tyngdekraft.',
            `${SRC.video(113, 'På toppen av sneglehuset så ligger balanseorganet ditt')}; ${SRC.orig('årsaker')} («Disse er en helt avgjørende del av vårt balanseorgan. De fungerer som vekter»)`,
          ),
          t(
            'Ved krystallsyke har noen av krystallene løsnet og falt over i en av de tre væskefylte buegangene. Når du snur på hodet, drar tyngdekraften krystallene nedover i buegangen. Det setter væsken i bevegelse, hårcellene bøyes, og hjernen får beskjed om at du snurrer. Det gjør du ikke, og derfor blir du svimmel.',
            `${SRC.orig('årsaker')}; ${SRC.sml}`,
          ),
          t(
            'Oftest ligger krystallene i bakre buegang. Sjeldnere i horisontal buegang, og svært sjelden i fremre. Hvilken buegang det er, avgjør hvilken manøver som hjelper.',
            `${SRC.orig('årsaker')}; ${SRC.sml} («Den vanligste varianten er otolitter i bakre buegang»)`,
          ),
        ],
        link: { href: '/buegangene', label: 'Les om de tre buegangene' },
      },
      {
        id: 'bekymre',
        eyebrow: 'Trygghet først',
        heading: 'Når skal jeg bekymre meg?',
        body: [
          t(
            'Krystallsyke er i seg selv ufarlig, men svimmelhet kan også ha andre årsaker. Kommer svimmelheten sammen med skjevt ansikt, svakhet i arm eller bein, utydelig tale, synsforstyrrelser eller plutselig kraftig hodepine, ringer du 113. Er du usikker, ring legevakt på 116 117. Er svimmelheten der hele tiden, også når du ligger i ro, bør fastlegen se på det.',
            `${SRC.helsenorgeSlag}; ${SRC.helsenorge} («Kontakt fastlege eller legevakt ved akutt, kraftig eller plagsom svimmelhet»)`,
          ),
        ],
        link: { href: '/er-det-farlig', label: 'Er svimmelheten farlig? Se tegnene' },
      },
      {
        id: 'hvem-faar',
        eyebrow: 'Hvem rammes',
        heading: 'Hvem får krystallsyke?',
        body: [
          t(
            'De fleste er over 60, og ofte finnes det ingen klar grunn. Krystallene løsner lettere med alderen. Hos yngre er et slag mot hodet den vanligste forhistorien, og en del får det etter sengeleie ved sykdom eller operasjon. Har du hatt det én gang, er risikoen høy for å få det igjen.',
            `${SRC.orig('index')} («Uflaks er det eneste jeg kan komme på»); ${SRC.sml} («Otolittene blir mer porøse med økende alder»); ${SRC.helsenorge} («høy risiko for å få den igjen»)`,
          ),
        ],
        link: { href: '/arsaker', label: 'Les om årsakene' },
      },
      whoExamines(),
      firstVisit('Jeg vil vite når det startet, hva som utløser anfallene og hvor lenge de varer.'),
    ],
    faqs: [
      {
        question: 'Hva er krystallsyken?',
        answer:
          'Krystallsyke er en i seg selv ufarlig sykdom i det indre øret. Små krystaller har løsnet og havnet i en buegang, og bestemte hodebevegelser utløser korte anfall av svimmelhet. Det er en av de vanligste årsakene til svimmelhet, og den blir vanligere med alderen. Fagnavnet er BPPV.',
        source: `${SRC.kw('hva er krystallsyken')}; ${SRC.sml}; Olve, kommentar #19 2026-11-16`,
      },
      {
        question: 'Hva er krystaller i øret?',
        answer:
          'Krystallene er små korn av kalk (kalsiumkarbonat) som ligger på en geléplate i balanseorganet. De skal være der, og de hjelper deg å kjenne tyngdekraft og bevegelse. Problemet oppstår når noen av dem løsner og faller inn i en buegang, der de ikke hører hjemme.',
        source: `${SRC.kw('krystaller i øret')}; ${SRC.orig('årsaker')}; ${SRC.sml}`,
      },
      {
        question: 'Hvor vanlig er krystallsyke?',
        answer:
          'Vanlig. Store medisinske leksikon anslår at rundt en av seksti rammes hvert år, flest kvinner, med en gjennomsnittsalder på 65 år. Jeg ser mest eldre, men også folk i 20- og 30-årene, ofte etter en hodeskade eller en periode med sykdom.',
        source: `${SRC.sml} («1,6 prosent av befolkningen årlig»); ${SRC.orig('hva-er-krystallsyken')}`,
      },
      {
        question: 'Er krystallsyke farlig?',
        answer:
          'Nei. Krystallsyke er i seg selv ufarlig, men den kan oppleves skremmende, og du kan lettere falle under et anfall. Reis deg derfor rolig. Svimmelhet som kommer sammen med lammelse, talevansker, skjevt ansikt eller kraftig hodepine er noe annet. Da ringer du 113.',
        source: `${SRC.orig('hva-er-krystallsyken')}; ${SRC.helsenorgeSlag}`,
      },
      {
        question: 'Hvor lenge varer et anfall av krystallsyke?',
        answer:
          'Vanligvis fra noen sekunder til under ett minutt. Ligger du helt i ro, gir svimmelheten seg. Varer øyebevegelsene og svimmelheten mer enn ett til to minutter i samme stilling, kan årsaken være en annen enn krystallsyke, og det bør undersøkes.',
        source: `${SRC.orig('symptomer')}; ${SRC.helsenorge}`,
      },
    ],
    related: ['symptomer', 'arsaker', 'buegangene'],
    closing: {
      heading: 'Vil du vite om det er krystallsyke?',
      lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
    },
  },

  /* ------------------------------------------------------------------ */
  symptomer: {
    kind: 'info',
    intro: t(
      'Typisk symptom på krystallsyke er kort, kraftig svimmelhet når du snur deg i sengen, legger deg ned, ser opp eller bøyer deg. Anfallet varer som regel under ett minutt, og noen kan bli lett kvalme og kjenne seg ør etterpå.',
      `${SRC.orig('symptomer')} («Symptomer på krystallsyke er kraftig svimmelhet, som oftest etter en hodebevegelse»)`,
    ),
    sections: [
      {
        id: 'plagen',
        eyebrow: 'Kjenner du deg igjen?',
        heading: 'Svimmel når jeg legger meg ned eller snur meg i senga?',
        body: [
          t(
            'Svimmelheten er ofte så kraftig at du føler du skal falle ut av sengen og må holde deg fast. Så gir den seg hvis du ligger helt i ro. Etterpå kan du være kvalm, ør og lett i hodet, som om du skulle besvime.',
            `${SRC.orig('symptomer')} («så kraftig at man føler at man skal falle ut av sengen»)`,
          ),
        ],
        bullets: [
          t('Kraftig svimmelhet som kommer etter hodebevegelser', SRC.orig('symptomer')),
          t('Kommer oftest når du snur deg i sengen eller ser opp', SRC.orig('symptomer')),
          t(
            'Anfallet varer fra noen sekunder til rundt ett minutt',
            `${SRC.orig('symptomer')}; ${SRC.helsenorge}`,
          ),
          t('Svimmelheten blir gradvis borte om du ligger helt rolig', SRC.orig('symptomer')),
          t('Kvalme er vanlig, oppkast kan forekomme, men er ikke vanlig', SRC.orig('symptomer')),
        ],
      },
      {
        id: 'mekanismen',
        eyebrow: 'Slik henger det sammen',
        heading: 'Svimmel og kvalm samtidig?',
        body: [
          t(
            'Når krystaller ligger i en buegang og du beveger hodet, får hjernen beskjed fra det ene øret om at du snurrer. Øynene og kroppen sier noe annet. Den uenigheten er det som gir svimmelheten, og kvalmen følger med på samme måte som ved sjøsyke.',
            `${SRC.orig('svimmelhet')} («mismatch i hjernen»)`,
          ),
          t(
            'Under anfallet gjør øynene ufrivillige, rytmiske bevegelser (nystagmus). En partner kan ofte se dem. Retningen på bevegelsen forteller meg hvilken del av balanseorganet som er involvert.',
            `${SRC.orig('symptomer')} («Øyebevegelsene kalles nystagmus»)`,
          ),
        ],
      },
      {
        id: 'tretthet',
        eyebrow: 'Mellom anfallene',
        heading: 'Rar i hodet og svimmel, også mellom anfallene?',
        body: [
          t(
            'Mange forteller at de er «rare i hodet» mellom anfallene. De er ør og lett ustø, som på en båt. Noen merker det mest på kjøpesenteret, i bilen gjennom en tunnel eller når det snør. Det er en liten ustøhet, og de blir slitne og uvel av det. Det kommer av at hjernen bruker krefter på å kompensere for feilsignalene fra øret. Derfor blir en del også uvanlig trette, og noen strammer nakke og skuldre for å beskytte seg mot neste anfall.',
            `${SRC.orig('trening')} («kvalme, trøtthet og ustøhet»); ${SRC.video2(81, 'om kompensasjonssvimmelhet: en viss liten ustøhet. For eksempel når man går på storsenter. Man blir sliten og uvel av det. Eller når man sitter i bil, kjører i tunneller, eller når det sner')}; ${SRC.orig('svimmelhet')} («Hvorfor blir jeg så stiv i nakken av krystallsyke?»)`,
          ),
        ],
      },
      {
        id: 'tretthet-sliten',
        eyebrow: 'Krystallsyke og tretthet',
        heading: 'Krystallsyke og tretthet: hvorfor blir jeg så sliten?',
        body: [
          t(
            'Krystaller på avveie gir hjernen feil signaler, og den bruker krefter på å rette opp. Resultatet er trøtthet, ustøhet og konsentrasjonsvansker mellom anfallene. Mange tar det også med ro for å slippe anfall, og det hjelper på selve anfallet, men det fjerner ikke krystallene. Trøttheten kan henge igjen en stund etter at krystallene er på plass, og derfor gir jeg opptreningsøvelser etterpå.',
            `${SRC.orig('trening')} («kvalme, trøtthet og ustøhet»); ${SRC.orig('øvelser')}`,
          ),
        ],
        link: { href: '/trening', label: 'Trening etter krystallsyke' },
      },
      whoExamines(),
      firstVisit(
        'Jeg vil vite nøyaktig hvilke bevegelser som utløser svimmelheten, og om du har andre symptomer.',
      ),
    ],
    faqs: [
      {
        question: 'Hvilke symptomer gir krystallsyke?',
        answer:
          'Korte, kraftige anfall av snurrende svimmelhet som utløses av hodebevegelser, oftest når du snur deg i sengen, legger deg ned, setter deg opp eller ser opp. Anfallet varer under ett minutt. Kvalme og ustøhet etterpå er vanlig. Hørsel og tale påvirkes ikke.',
        source: `${SRC.kw('krystallsyke symptomer')}; ${SRC.orig('symptomer')}; ${SRC.helsenorge}; Olve, kommentar #12 2026-11-16`,
      },
      {
        question: 'Hvorfor blir jeg svimmel når jeg legger meg ned?',
        answer:
          'Når du legger deg ned, endrer buegangene stilling i forhold til tyngdekraften. Løse krystaller faller da nedover i buegangen og setter væsken i bevegelse. Hjernen tolker det som at du snurrer. Derfor er det å legge seg ned, snu seg og sette seg opp de typiske utløserne ved krystallsyke.',
        source: `${SRC.kw('svimmel når jeg legger meg ned')}; ${SRC.orig('svimmelhet')} («Hvorfor blir jeg mindre svimmel om jeg snur meg helt rolig»)`,
      },
      {
        question: 'Kan krystallsyke forårsake tretthet?',
        answer:
          'Ja, det ser jeg ofte. Krystaller på avveie gir hjernen feil signaler, og den bruker krefter på å rette opp. Resultatet er trøtthet, ustøhet og konsentrasjonsvansker mellom anfallene. Dette kan henge igjen en stund etter at krystallene er på plass, og derfor gir jeg opptreningsøvelser etterpå.',
        source: `${SRC.marked}; ${SRC.kw('krystallsyke og tretthet')}; ${SRC.orig('trening')}`,
      },
      {
        question: 'Svimmel og kvalm samtidig, er det krystallsyke?',
        answer:
          'Det kan være det, særlig hvis svimmelheten kommer i korte anfall ved hodebevegelser. Svimmelhet og kvalme sammen kan også komme fra virus på balansenerven, migrene eller Menières sykdom. Er du svimmel og kvalm hele tiden, også i ro, bør du til fastlegen samme dag.',
        source: `${SRC.kw('svimmel og kvalm')}; ${SRC.orig('svimmelhet')}; ${SRC.nhiSvimmelhet}`,
      },
      {
        question: 'Jeg føler meg rar i hodet og svimmel. Hva kan det være?',
        answer:
          'En ørhet eller «bomull i hodet» uten snurring kan være etterdønninger etter krystallsyke, nakkeplager, lavt blodtrykk, medisiner eller stress. Får du i tillegg korte anfall når du beveger hodet, peker det mot krystaller. En undersøkelse med videobriller skiller de vanligste årsakene fra hverandre.',
        source: `${SRC.kw('rar i hodet svimmel')}; ${SRC.orig('svimmelhet')}; ${SRC.nhiSvimmelhet}`,
      },
      {
        question: 'Når skal jeg ringe 113 for svimmelhet?',
        answer:
          'Hvis svimmelheten kommer sammen med nummenhet i ansikt eller kropp, svakhet i arm eller bein, problemer med å snakke, dobbeltsyn eller plutselig kraftig hodepine. Det kan være hjerneslag. Er du i tvil, ring 113.',
        source: `${SRC.orig('symptomer')} («NB! om en får nummenhet ... ring 113»); ${SRC.helsenorgeSlag}`,
      },
    ],
    related: ['er-det-farlig', 'diagnosering', 'behandling'],
    closing: {
      heading: 'Kjenner du deg igjen i symptomene?',
      lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
    },
  },

  /* ------------------------------------------------------------------ */
  arsaker: {
    kind: 'info',
    intro: t(
      'Hvorfor får man krystallsyke? Ofte finnes det ingen klar årsak. Noen får det etter et slag mot hodet, etter sengeleie eller en operasjon, og det blir vanligere med alderen. De fleste jeg ser er over 60.',
      `${SRC.orig('index')} («Uflaks er det eneste jeg kan komme på»); ${SRC.helsenorge}`,
    ),
    sections: [
      {
        id: 'stress',
        eyebrow: 'Krystallsyke og stress',
        heading: 'Kan stress gi krystallsyke?',
        body: [
          t(
            'Det er ikke dokumentert at stress løsner krystaller. Men mange opplever at krystallsyken kom i en periode med mye stress, og hos mange yngre jeg møter står stress sentralt i sykehistorien. Stress gir dårlig søvn, dårligere kosthold og dårligere pust. Jeg kan ikke bevise sammenhengen, men jeg ser det ofte nok til å spørre om det.',
            `${SRC.orig('årsaker')} («Kan stress være en årsak til krystallsyke?», omskrevet uten påstand om mekanisme)`,
          ),
          t(
            'Det samme gjelder belastende hendelser, som dødsfall, skilsmisse eller alvorlig sykdom i familien. Kroppen tåler mindre når den er sliten, og en infeksjon eller et sykeleie i en slik periode er en vanlig kombinasjon hos dem jeg møter.',
            `${SRC.orig('index')} («etter psykisk belastende hendelser som dødsfall, skilsmisse eller alvorlig sykdom»)`,
          ),
        ],
      },
      {
        id: 'hodeskade',
        eyebrow: 'Etter et slag mot hodet',
        heading: 'Krystallsyke etter fall eller hjernerystelse?',
        body: [
          t(
            'Hodeskader er den tydeligste årsaken hos yngre. Jeg behandler mange med hjernerystelse, og ser ofte krystallsyke i etterkant. Skaden trenger ikke treffe hodet direkte. En nakkesleng i bil eller et fall rett på baken kan være nok. {{OLVE_BEKREFT: hvordan krystallsyke etter hjernerystelse skal omtales}}',
            `${SRC.orig('årsaker')} («Skaden eller traumet trenger ikke direkte involvere hodet»); ${SRC.limbra} (hjernerystelse som fokusområde)`,
          ),
        ],
      },
      {
        id: 'sengeleie',
        eyebrow: 'Slik henger det sammen',
        heading: 'Etter operasjon og lang tid i sengen?',
        body: [
          t(
            'Sykeleie etter influensa eller operasjon er overrepresentert blant dem som kommer til meg. Betennelse i det indre øret (labyrintitt) og Menières sykdom kan også løsne krystaller. Lavt D-vitaminnivå og benskjørhet er satt i sammenheng med sykdommen.',
            `${SRC.orig('årsaker')} («Sengeleie i forbindelse med influensa er overrepresentert»); ${SRC.sml}; ${SRC.helsenorge}`,
          ),
          t(
            'Og så er det alderen. Krystallene (otolittene) sitter på en geléplate i balanseorganet. Med årene blir de mer porøse og løsner lettere. Da kan de skli over i en buegang, oftest den bakre, fordi den ligger lavest når du ligger.',
            `${SRC.sml} («Otolittene blir mer porøse med økende alder»); ${SRC.orig('årsaker')}`,
          ),
        ],
      },
      {
        id: 'forebygge',
        eyebrow: 'Forebygging',
        heading: 'Kan jeg forebygge det?',
        body: [
          t(
            'Alder og arv kan du ikke gjøre noe med. Det du kan påvirke, er søvn, kosthold, fysisk aktivitet og stress. Lavt D-vitaminnivå er knyttet til tilbakefall i noen studier, uten klar konklusjon; spør fastlegen om måling hvis du får krystallsyke flere ganger. Ingen av delene gir noen sikkerhet. Får du det igjen, er behandlingen vanligvis den samme.',
            `${SRC.orig('index')} («Er det noe jeg kan gjøre selv for å forhindre tilbakefall?»); ${SRC.sml}; ${SRC.helsenorge}`,
          ),
        ],
      },
      whoExamines(),
      firstVisit(
        'Jeg spør om hodeskader, sykeleie, infeksjoner, medisiner og hvordan du har hatt det den siste tiden.',
      ),
    ],
    faqs: [
      {
        question: 'Hva er den vanligste årsaken til krystallsyke?',
        answer:
          'Alder. Krystallene løsner lettere når vi blir eldre, og de fleste med krystallsyke er over 60, uten noen annen kjent årsak. Hos yngre er hodeskade den vanligste årsaken. Sykeleie, betennelse i det indre øret og lavt D-vitaminnivå kan også øke risikoen.',
        source: `${SRC.kw('krystallsyke årsak')}; ${SRC.orig('index')}; ${SRC.helsenorge}; ${SRC.sml}`,
      },
      {
        question: 'Kan jeg få krystallsyke etter hodeskade eller sykdom?',
        answer:
          'Ja. Et slag mot hodet kan løsne krystaller, også uten hjernerystelse. Bilulykker med nakkesleng og fall er vanlige forhistorier. Etter influensa eller operasjon ser jeg også mange. Infeksjonen belaster kroppen, og når du ligger mye, finner løse krystaller lettere veien inn i en buegang.',
        source: `${SRC.orig('årsaker')} («Kan påkjenninger og stress etter hodeskade eller sykdom gi krystallsyke?»)`,
      },
      {
        question: 'Hvorfor får man krystallsyke flere ganger?',
        answer:
          'Fordi det som løsnet krystallene første gang, som alder eller porøse krystaller, fortsatt er der. Har du hatt krystallsyke én gang, er risikoen høy for å få det igjen, gjerne med flere år imellom. Behandlingen er vanligvis den samme neste gang.',
        source: `${SRC.kw('hvorfor får man krystallsyke')}; ${SRC.helsenorge}`,
      },
      {
        question: 'Kan jeg minske sjansen for å få krystallsyke?',
        answer:
          'Alder og arv kan du ikke gjøre noe med. Det du kan påvirke, er søvn, kosthold, fysisk aktivitet og stress. Forskning har knyttet lavt D-vitaminnivå til tilbakefall, uten klar konklusjon. Spør fastlegen om måling hvis du får krystallsyke flere ganger. Ingen av delene gir noen sikkerhet.',
        source: `${SRC.orig('index')} («Er det noe jeg kan gjøre selv for å forhindre tilbakefall?»); ${SRC.sml}`,
      },
      {
        question: 'Er krystallsyke og stress knyttet sammen?',
        answer:
          'Jeg ser det ofte i sykehistorien, men det er ikke dokumentert som en direkte årsak. Stress gir dårlig søvn og dårligere pust og kosthold, og mange får krystallsyke i perioder der kroppen er sliten, ofte sammen med en infeksjon eller et sykeleie. Det er grunn god nok til å ta stress på alvor.',
        source: `${SRC.kw('krystallsyke stress')}; ${SRC.orig('årsaker')}`,
      },
    ],
    related: ['hva-er-krystallsyken', 'kommer-tilbake', 'varighet'],
    closing: {
      heading: 'Vil du finne ut hva svimmelheten kommer av?',
      lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
    },
  },

  /* ------------------------------------------------------------------ */
  diagnosering: {
    kind: 'info',
    intro: t(
      'Først gjør jeg en nevrologisk undersøkelse og tester balansen. Så har du på infrarøde videobriller (VOG), og jeg legger deg ned på ryggen med hodet i forskjellige posisjoner. Blir du svimmel, ser jeg øyebevegelsene (nystagmus) som viser om det er krystaller, og i hvilken buegang. En av testene jeg bruker, heter Dix-Hallpike.',
      `${SRC.orig('diagnosering')} («man nødt til å kunne se øynene i mørket ... Den spontane øyebevegelsen (Nystagmus) kan stoppes om pasienten har noe å fokusere på»)`,
    ),
    sections: [
      {
        id: 'nystagmus',
        eyebrow: 'Slik henger det sammen',
        heading: 'Hvorfor ser du på øynene mine?',
        body: [
          t(
            'Nystagmus er ufrivillige, rykkende øyebevegelser. Når krystaller setter væsken i en buegang i bevegelse, tror hjernen at hodet roterer, og øynene prøver å kompensere. Ved krystallsyke ser nystagmusen slik ut:',
            `${SRC.orig('diagnosering')} («kan sammenfattes slik»)`,
          ),
        ],
        bullets: [
          t(
            'Den starter med noen sekunders forsinkelse etter at hodet er lagt ned',
            SRC.orig('diagnosering'),
          ),
          t(
            'Den varer kort, oftest sekunder og sjelden mot ett minutt, og dør ut',
            SRC.orig('diagnosering'),
          ),
          t(
            'Den kommer bare i bestemte stillinger eller ved bestemte bevegelser',
            SRC.orig('diagnosering'),
          ),
          t('Gjentar du bevegelsen, blir utslaget gradvis mindre', SRC.orig('diagnosering')),
          t(
            'Den roterer når krystallene ligger i bakre eller fremre buegang',
            SRC.orig('diagnosering'),
          ),
          t(
            'Den slår horisontalt når krystallene ligger i horisontal buegang',
            SRC.orig('diagnosering'),
          ),
          t('Den stopper hvis du får stirre på noe. Derfor brillene', SRC.orig('diagnosering')),
        ],
      },
      {
        id: 'dix-hallpike',
        eyebrow: 'Testen',
        heading: 'Hva er Dix-Hallpike-testen?',
        body: [
          t(
            'Du sitter på benken med brillene på. Jeg vrir hodet ditt 45 grader til siden og legger deg rolig ned på ryggen, slik at hodet kommer litt under benkens nivå. Er det krystaller i bakre buegang på den siden, blir du svimmel etter noen sekunder, og jeg ser den roterende øyebevegelsen på skjermen.',
            `${SRC.orig('diagnosering')} («Med brillene på, blir pasienten lagt ned på ryggen med hodet vendt 45 grader til siden»)`,
          ),
          t(
            'Venter jeg funn, sier jeg det som det er før jeg legger deg ned: «Du kommer til å bli svimmel. Bare stol på meg og pass på å ha øynene åpne.» Det er det samme jeg sier til pasienten i videoen «Behandling av krystallsyken». Er det krystaller, kan jeg med brillene på fremprovosere svimmelheten og se øyebevegelsene som følger med. Det er dem jeg trenger for å vite hvor krystallene ligger.',
            `${SRC.video(90, 'Du kommer til å bli svimmel. Bare stol på meg og pass på å ha øynene åpne')}; ${SRC.video(98, 'Med infrarøde brillene så kan jeg framprovosere svimmelighet, og da vil pasienten få noen helt spesielle øyebevegelser')}`,
          ),
          t(
            'Mistenker jeg horisontal buegang, gjør jeg en annen variant, rulletesten. Da ligger du på ryggen, og jeg snur hodet ditt raskt 90 grader til hver side. Krystaller der gir en horisontal øyebevegelse.',
            `${SRC.orig('diagnosering')} («roll test»)`,
          ),
          t(
            'Svimmelheten under testen går vanligvis over i løpet av 10 til 15 sekunder, og jeg følger med på deg hele tiden. De fleste synes det går greit. Noen blir kvalme, og da tar vi det med ro før vi går videre. Jeg tester alltid først at nakken din tåler stillingene.',
            `${SRC.orig('svimmelhet')} («en svimmelhet som kun varer i noen få sekunder»); ${SRC.orig('behandling')}`,
          ),
        ],
      },
      {
        id: 'svimmel-av-testen',
        eyebrow: 'Ubehaget',
        heading: 'Blir jeg svimmel av testen?',
        body: [
          t(
            'Ja, et øyeblikk, hvis det er krystaller. Det er meningen, for da ser jeg øyebevegelsene. Svimmelheten går vanligvis over i løpet av 10 til 15 sekunder, og jeg følger med på deg hele tiden. De fleste synes det går greit. Noen blir kvalme, og da tar vi det med ro før vi går videre. Jeg anbefaler at du blir kjørt til første time.',
            `${SRC.video(90, 'Du kommer til å bli svimmel')}; ${SRC.orig('svimmelhet')} («en svimmelhet som kun varer i noen få sekunder»)`,
          ),
        ],
      },
      {
        id: 'ikke-krystaller',
        eyebrow: 'Når det er noe annet',
        heading: 'Hva om det ikke er krystaller?',
        body: [
          t(
            'Da er det trolig ikke krystallsyke akkurat nå, eller krystallene har lagt seg til ro. Da undersøker jeg videre, med øyebevegelser (VNG), balanse og nakke. Peker funnene mot noe jeg ikke behandler, forklarer jeg hva det kan være og hvem du bør gå til, som fastlege eller øre-nese-hals-lege.',
            `${SRC.orig('diagnosering')}; ${SRC.orig('svimmelhet')} («henviser jeg disse pasienter til fastlegen»)`,
          ),
        ],
        link: { href: '/andre-arsaker', label: 'Når det ikke er krystallsyke' },
      },
      whoExamines(
        'En sjelden gang kan skader i nervesystemet gi symptomer som ligner. Blir du ikke raskt bedre etter behandling, anbefaler jeg videre utredning hos lege, for eksempel MR.',
      ),
      firstVisit('Jeg gjør alltid en nevrologisk undersøkelse før jeg tester for krystaller.'),
    ],
    faqs: [
      {
        question: 'Hva er nystagmus?',
        answer:
          'Nystagmus er ufrivillige, rytmiske øyebevegelser. Ved krystallsyke kommer den noen sekunder etter at hodet er lagt i en bestemt stilling, varer under ett minutt og dør ut. Retningen forteller hvilken buegang krystallene ligger i. Andre årsaker til svimmelhet gir andre typer nystagmus, og det er slik jeg skiller dem.',
        source: `${SRC.kw('nystagmus')}; ${SRC.orig('diagnosering')}; Olve, kommentar #16 2026-11-16`,
      },
      {
        question: 'Hvordan gjøres Dix-Hallpikes test?',
        answer:
          'Du sitter med hodet vridd 45 grader til siden. Så legges du rolig ned på ryggen med hodet litt lavere enn kroppen. Er det krystaller i bakre buegang på den siden, blir du svimmel etter noen sekunder, og jeg ser den typiske øyebevegelsen gjennom videobrillene. Testen gjentas på den andre siden.',
        source: `${SRC.kw('dix hallpikes')}; ${SRC.orig('diagnosering')}; ${SRC.sml}`,
      },
      {
        question: 'Hvordan ser nystagmus ut ved krystallsyke?',
        answer:
          'Den roterer når krystallene ligger i bakre buegang, som er det vanligste. Den slår horisontalt når de ligger i horisontal buegang. Den kommer med forsinkelse, varer kort og blir svakere hvis testen gjentas. Nystagmus som varer i flere minutter, eller som er der i ro, peker mot en annen årsak.',
        source: `${SRC.kw('nystagmus krystallsyke')}; ${SRC.orig('diagnosering')}`,
      },
      {
        question: 'Gjør testen meg svimmel?',
        answer:
          'Ja, hvis det er krystaller. Det er hele poenget med testen. Svimmelheten går vanligvis over i løpet av 10 til 15 sekunder, og jeg følger med på deg hele tiden. De fleste opplever det som ubehagelig, men greit. Er du svært kvalm, tar vi pauser. Ta gjerne med noen hvis du gruer deg.',
        source: `${SRC.orig('svimmelhet')}; ${SRC.trym}`,
      },
      {
        question: 'Hva om testen ikke viser krystaller?',
        answer:
          'Da er det trolig ikke krystallsyke akkurat nå, eller krystallene kan ha lagt seg til ro. Da undersøker jeg videre, med øyebevegelser (VNG), balanse og nakke. Peker funnene mot noe jeg ikke behandler, som Menières sykdom eller noe i nervesystemet, sier jeg hvem du bør gå til, som regel fastlegen, for videre utredning.',
        source: `${SRC.orig('diagnosering')}; ${SRC.orig('svimmelhet')}`,
      },
    ],
    related: ['buegangene', 'behandling', 'bestill-time'],
    closing: {
      heading: 'Vil du at jeg ser på øynene dine?',
      lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
    },
  },

  /* ------------------------------------------------------------------ */
  buegangene: {
    kind: 'info',
    intro: t(
      'Det indre øret har tre bueganger på hver side (bakre, horisontal og fremre). Øvelsen som hjelper, avhenger av hvilken buegang krystallene ligger i, og på hvilken side. Oftest er det bakre buegang. Det er derfor øvelser fra nettet ikke alltid virker.',
      `${SRC.orig('årsaker')} («Den bakre buegangen ... er den vanligste»); ${SRC.sml}`,
    ),
    sections: [
      {
        id: 'plagen',
        eyebrow: 'Kjenner du deg igjen?',
        heading: 'Hvorfor hjalp ikke Epley-øvelsen?',
        body: [
          t(
            'Det hører jeg ofte. Epleys manøver er laget for bakre buegang på én side. Ligger krystallene i horisontal buegang, kan samme bevegelse flytte dem lenger inn, eller over i en annen buegang. Da får du et mer komplisert bilde, og det tar lenger tid å få orden på det.',
            `${SRC.orig('øvelser')} («Pasienter som har satt i gang med øvelser ... kommer ofte inn med et mer komplisert symptombilde»)`,
          ),
        ],
      },
      {
        id: 'mekanismen',
        eyebrow: 'Slik henger det sammen',
        heading: 'Hva er en buegang?',
        body: [
          t(
            'Buegangene er tre væskefylte rør som står vinkelrett på hverandre, som tre halvsirkler i hver sin retning. Når du beveger hodet, henger væsken litt etter, og små hårceller i enden av røret bøyes. Slik kjenner du at hodet roterer. Krystaller i et rør forsterker den bevegelsen.',
            `${SRC.orig('svimmelhet')} («Buegangene er som væskefylte ballonger»)`,
          ),
        ],
      },
      {
        id: 'bakre',
        canal: 'bakre',
        eyebrow: 'Vanligst',
        heading: 'Bakre buegang: den vanligste',
        body: [
          t(
            'Her havner krystallene oftest, fordi bakre buegang ligger lavest når du ligger på ryggen. Du blir svimmel når du legger deg ned, snur deg i sengen eller ser opp. Nystagmusen roterer. Behandlingen er Epleys manøver, eventuelt Semont.',
            `${SRC.orig('årsaker')}; ${SRC.orig('diagnosering')}; ${SRC.sml}`,
          ),
        ],
      },
      {
        id: 'horisontal',
        canal: 'horisontal',
        eyebrow: 'Sjeldnere',
        heading: 'Horisontal buegang: verst når du ruller over i sengen',
        body: [
          t(
            'Her blir du gjerne svimmel når du snur deg til begge sider i sengen, ofte kraftigere til den ene. Nystagmusen slår horisontalt. Epley virker ikke her. Behandlingen er rullemanøveren (barbecue roll), der du rulles i trinn på 90 grader rundt din egen akse.',
            `${SRC.orig('diagnosering')} («roll test ... horisontalt slående øyebevegelse»); ${SRC.orig('øvelser')} (Barbeque roll)`,
          ),
        ],
      },
      {
        id: 'fremre',
        canal: 'fremre',
        eyebrow: 'Svært sjelden',
        heading: 'Fremre buegang',
        body: [
          t(
            'Krystaller i fremre buegang er sjeldent, og nystagmusen slår nedover med rotasjon. Her bruker jeg en reversert Epleys manøver. Fordi det er sjeldent, er det også lett å overse, og jeg sjekker for det når bildet ikke passer med bakre buegang. {{OLVE_BEKREFT: hvilke varianter du behandler (bakre, horisontal, fremre, cupulolithiasis) og hva du henviser}}',
            `${SRC.orig('index')} («Reversert Epleys er den metoden jeg bruker for denne type BPPV»)`,
          ),
        ],
      },
      whoExamines(),
      firstVisit(
        'Jeg tester bakre buegang med Dix-Hallpike og horisontal buegang med rulletesten, på begge sider.',
      ),
    ],
    faqs: [
      {
        question: 'Hva er buegangene i øret?',
        answer:
          'Tre væskefylte rør i balanseorganet, ett for hver retning hodet kan rotere i. Væsken henger etter når du beveger hodet, og små hårceller registrerer det. Løse krystaller i et av rørene gir et overdrevet signal, og du blir svimmel. Hvert øre har tre bueganger, altså seks i alt.',
        source: `${SRC.kw('buegang')}; ${SRC.orig('svimmelhet')}; Olve, kommentar #8 og 9 (side, ikke øre) 2026-11-16`,
      },
      {
        question: 'Hva er bakre buegang?',
        answer:
          'Buegangen som ligger lavest når du ligger på ryggen. Derfor havner løse krystaller oftest her. Typisk svimmelhet når du legger deg ned, snur deg eller ser opp, med roterende øyebevegelse under Dix-Hallpike-testen. Epleys manøver er laget for akkurat denne buegangen.',
        source: `${SRC.kw('bakre buegang')}; ${SRC.sml}; ${SRC.orig('diagnosering')}`,
      },
      {
        question: 'Hva er horisontal krystallsyke?',
        answer:
          'Krystaller i horisontal buegang. Du blir svimmel når du snur deg til begge sider i sengen, og øyebevegelsen slår sidelengs. Den undersøkes med rulletesten og behandles med rullemanøveren, ikke Epley. Det er sjeldnere enn bakre buegang, men det er den varianten folk oftest behandler feil hjemme.',
        source: `${SRC.kw('horisontal buegang, horisontal krystallsyke')}; ${SRC.orig('diagnosering')}; ${SRC.orig('øvelser')}`,
      },
      {
        question: 'Hva er fremre buegang?',
        answer:
          'Den øverste av de tre buegangene. Krystaller her er svært sjelden, og gir en nedadslående, roterende øyebevegelse. Behandlingen er en reversert Epleys manøver. Fordi det er sjeldent, blir det lett oversett, så jeg ser etter det når funnene ikke passer med bakre buegang.',
        source: `${SRC.kw('fremre buegang')}; ${SRC.orig('index')}`,
      },
      {
        question: 'Hvordan vet jeg hvilken buegang det gjelder?',
        answer:
          'Det kan du ikke kjenne deg frem til med sikkerhet. Retningen på øyebevegelsen under Dix-Hallpike-testen og rulletesten er det som avgjør. Roterende nystagmus betyr bakre buegang, horisontal betyr horisontal buegang. Derfor undersøker jeg med videobriller før jeg velger manøver.',
        source: `${SRC.orig('øvelser')}; ${SRC.orig('diagnosering')}`,
      },
    ],
    related: ['ovelser', 'behandling', 'kommer-tilbake'],
    closing: {
      heading: 'Vil du vite hvilken buegang det gjelder?',
      lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
    },
  },

  /* ------------------------------------------------------------------ */
  varighet: {
    kind: 'info',
    intro: t(
      'Hvor lenge varer krystallsyke? Varigheten varierer. Krystallsyke går ofte over av seg selv, men det kan ta tid, og den kommer ofte tilbake, skriver helsenorge. Du trenger ikke vente det ut for å få det undersøkt.',
      `${SRC.helsenorge}; ${SRC.sml} («Symptomene har en tendens til å gå over av seg selv i løpet av dager til uker, men dette gjelder ikke alle»)`,
    ),
    sections: [
      {
        id: 'plagen',
        eyebrow: 'Kjenner du deg igjen?',
        heading: 'Kan krystallsyke gå over av seg selv?',
        body: [
          t(
            'Ofte, ja. Helsenorge skriver at de aller fleste blir friske av krystallsyken, og krystallene kan legge seg til ro på egen hånd i løpet av dager til uker. Men mens du venter, lever du med anfall og utrygghet, og mange slutter å bevege hodet normalt. Det kan gi stiv nakke og ustøhet som henger igjen lenge etter at krystallene har lagt seg. Du kan få det undersøkt uten å vente det ut.',
            `${SRC.orig('svimmelhet')} («Hvorfor blir jeg så stiv i nakken av krystallsyke?»)`,
          ),
        ],
      },
      {
        id: 'mekanismen',
        eyebrow: 'Slik henger det sammen',
        heading: 'Hva avgjør varigheten av krystallsyke?',
        body: [
          t(
            'Fra noen sekunder til under ett minutt, så lenge du ligger i ro.',
            `${SRC.helsenorge}; ${SRC.sml}`,
            'Anfallet',
          ),
          t(
            'Krystallene kan løse seg opp eller legge seg til ro i løpet av dager til uker, men hos noen ligger de i måneder.',
            `${SRC.helsenorge}; ${SRC.sml}`,
            'Sykdommen',
          ),
          t(
            'Ustøhet og trøtthet etter at krystallene er borte. Det kan vare noen uker og trenger opptrening.',
            SRC.orig('trening'),
            'Etterdønningene',
          ),
          t(
            'Jo lenger krystallene har ligget på avveie, desto mer har hjernen vent seg til feilsignalene, og desto mer opptrening trengs etterpå.',
            `${SRC.orig('øvelser')} («Pasienter som kommer raskt til behandling ... vil etter en uke med symptomfri rehabilitering stort sett være tilbake»)`,
          ),
        ],
      },
      {
        id: 'sykemelding',
        eyebrow: 'Jobb',
        heading: 'Trenger jeg sykemelding?',
        body: [
          t(
            'Det vurderer fastlegen sammen med deg. Mange klarer å jobbe med krystallsyke hvis jobben ikke krever raske hodebevegelser eller arbeid i høyden. Andre, særlig i de første dagene, bør ta det rolig. {{OLVE_BEKREFT: om du sykemelder selv}}',
            `${SRC.kw('krystallsyke sykemelding')}; nøktern vurdering, sykemelding er legens oppgave`,
          ),
        ],
      },
      {
        id: 'bil',
        eyebrow: 'Bil',
        heading: 'Kan jeg kjøre bil?',
        body: [
          t(
            'Ikke så lenge du får anfall ved hodebevegelser. Et anfall i bilen er farlig, også om det varer kort. Når du kan kjøre igjen, avklarer du med fastlegen. Testen hos meg kan gjøre deg svimmel, så jeg anbefaler at du blir kjørt til første time.',
            `${SRC.kw('krystallsyke bilkjøring')}; nøktern vurdering uten juridisk påstand`,
          ),
        ],
      },
      {
        id: 'fly',
        eyebrow: 'Reise',
        heading: 'Kan jeg fly?',
        body: [
          t(
            'Ingen av kildene jeg bruker (helsenorge, NHI, Store medisinske leksikon) fraråder flyreise ved krystallsyke. Det som kan være ubehagelig, er å legge hodet bakover i setet og bevegelsene i køen. Er du svimmel og kvalm, snakk med fastlegen før du reiser.',
            'nøktern vurdering; ingen kilde fraråder flyreise ved krystallsyke',
          ),
        ],
      },
      {
        id: 'tilbake',
        eyebrow: 'Neste gang',
        heading: 'Hvorfor kommer det tilbake?',
        body: [
          t(
            'Fordi det som gjorde krystallene løse, ofte alder, fortsatt er der. Helsenorge skriver at det er høy risiko for å få krystallsyke igjen, og at behandlingen ved tilbakefall vanligvis er den samme. Har du gått i flere uker med anfall ved hodebevegelser, eller kommer det igjen, er det verdt å finne ut hvilken side og hvilken buegang det gjelder.',
            `${SRC.helsenorge} («høy risiko for å få den igjen»); ${SRC.sml} («ved langvarige eller hyppig tilbakevendende plager er undersøkelse ... anbefalt»)`,
          ),
        ],
        link: { href: '/kommer-tilbake', label: 'Når det ikke går over, eller kommer tilbake' },
      },
      whoExamines(),
      firstVisit('Jeg spør hvor lenge du har hatt det, og om det har kommet og gått tidligere.'),
    ],
    faqs: [
      {
        question: 'Hvor lenge varer krystallsyke uten behandling?',
        answer:
          'Hos mange går den over i løpet av dager til uker. Hos andre varer den i måneder, og noen få får langvarige og hyppig tilbakevendende plager. Selve anfallet varer under ett minutt. Går det over to til tre uker uten bedring, anbefaler jeg undersøkelse og behandling.',
        source: `${SRC.kw('hvor lenge varer krystallsyke')}; ${SRC.sml}; ${SRC.nhi} («går over av seg selv etter uker eller noen måneder»); Olve, kommentar #8 og 9 (side, ikke øre) 2026-11-16`,
      },
      {
        question: 'Kan krystallsyke gå over av seg selv?',
        answer:
          'Ja, ofte. Krystallene kan løse seg opp eller legge seg til ro på egen hånd. Men det er ikke sikkert, og det tar gjerne uker. Ifølge Store medisinske leksikon gir hodemanøvrer vanligvis raskest bedring, og en undersøkelse ser også etter om svimmelheten kommer av noe annet enn krystaller.',
        source: `${SRC.kw('kan krystallsyke gå over av seg selv')}; ${SRC.helsenorge}; ${SRC.sml}`,
      },
      {
        question: 'Trenger jeg sykemelding ved krystallsyke?',
        answer:
          'Det avgjør fastlegen sammen med deg. Mange jobber som vanlig, men unngår raske hodebevegelser og arbeid i høyden. Kjører du i jobben eller jobber med maskiner, bør du vente til anfallene er borte. Snakk med legen om jobben din og hva den krever.',
        source: `${SRC.kw('krystallsyke sykemelding')}; nøktern vurdering, ingen medisinsk eller juridisk påstand`,
      },
      {
        question: 'Kan jeg kjøre bil med krystallsyke?',
        answer:
          'Ikke så lenge du får anfall ved hodebevegelser. Et anfall bak rattet, selv på 20 sekunder, er farlig. Når du kan kjøre igjen, er det fastlegen som vurderer, ikke jeg.',
        source: `${SRC.kw('krystallsyke bilkjøring')}; nøktern vurdering`,
      },
      {
        question: 'Hvor lenge varer krystallsyken etter behandling?',
        answer:
          'Noen merker forskjell samme dag, andre ikke. Et fullt forløp, med undersøkelse, behandlinger og rehabilitering, er vanligvis 4 til 6 behandlinger. Hvor lang rehabiliteringen blir, avhenger av hvor lenge du har gått med plagene. Etterpå kan ustøhet og trøtthet henge igjen i noen uker, særlig hvis du har gått lenge med krystallene. Opptreningsøvelsene er laget for den perioden.',
        source: `${SRC.orig('behandling')} («Gjennomsnittlig er det tilstrekkelig med 2-4 påfølgende behandlinger», «for de fleste vil en ikke kjenne noen umiddelbar forandring»)`,
      },
    ],
    related: ['kommer-tilbake', 'trening', 'behandling'],
    closing: {
      heading: 'Vil du få det undersøkt uten å vente det ut?',
      lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
    },
  },

  /* ------------------------------------------------------------------ */
  'er-det-farlig': {
    kind: 'info',
    intro: t(
      'Plutselig svimmel? Ring 113 hvis svimmelheten kommer sammen med skjevt ansikt, svakhet i arm eller bein, utydelig tale, synsforstyrrelser eller kraftig hodepine. Er du usikker, ring legevakt på 116 117. Plutselig svimmelhet er skremmende, men sjelden farlig, og den vanligste årsaken er krystallsyke.',
      `${SRC.orig('svimmelhet')} («Tommelfingerregelen her er, er du i tvil så ringer ambulansen!»); ${SRC.helsenorgeSlag}`,
    ),
    sections: [
      {
        id: 'ring-113',
        eyebrow: 'Ring 113',
        heading: 'Når skal du ringe 113?',
        body: [
          t(
            'Hjerneslag gir nesten alltid andre symptomer samtidig med svimmelheten. Helsenorge anbefaler en enkel test. Be personen PRATE en sammenhengende setning, SMILE og LØFTE begge armene. Klarer hun ikke det, ring 113. Ring også hvis svimmelheten kommer sammen med:',
            `${SRC.helsenorgeSlag} (${URLS.helsenorgeSlag}); ${SRC.orig('svimmelhet')} («vil den i nesten alle tilfeller gi andre symptomer parallelt»)`,
          ),
        ],
        bullets: [
          t(
            'Nummenhet i ansikt, lepper, armer, fingre eller bein',
            `${SRC.orig('svimmelhet')}; ${SRC.helsenorgeSlag}`,
          ),
          t(
            'Svakhet eller lammelse i arm, bein eller den ene siden av ansiktet',
            SRC.helsenorgeSlag,
          ),
          t('Problemer med å snakke eller forstå', SRC.helsenorgeSlag),
          t(
            'Plutselig kraftig hodepine, dobbeltsyn eller synstap',
            `${SRC.orig('svimmelhet')}; ${SRC.helsenorgeSlag}`,
          ),
          t('Du klarer ikke stå eller gå, selv med hodet i ro', SRC.trym),
          t('Brystsmerter eller besvimelse sammen med svimmelheten', SRC.nhiSvimmelhet),
          t('Plutselig nedsatt hørsel på ett øre sammen med svimmelheten', SRC.nhiSvimmelhet),
        ],
      },
      {
        id: 'peker-mot-krystallsyke',
        eyebrow: 'Ufarlig, men plagsomt',
        heading: 'Hvordan kjennes krystallsyke annerledes?',
        body: [
          t(
            'Korte anfall, under ett minutt, som utløses av at du snur deg, legger deg ned eller ser opp. Ro i hodet gir ro i svimmelheten. Ingen av tegnene over. Det er det typiske bildet ved krystallsyke, og det er i seg selv ufarlig. Du kan likevel lettere falle under et anfall, så reis deg rolig.',
            `${SRC.orig('symptomer')}; ${SRC.helsenorge}`,
          ),
          t(
            'Plutselig svimmelhet i noen sekunder når du reiser deg, uten snurring, er oftest blodtrykket som ikke henger med. Det er vanligvis ufarlig, men skjer det ofte, bør fastlegen se på det.',
            `${SRC.orig('svimmelhet')} («Ortostatisk hypotensjon»); ${SRC.nhiSvimmelhet}`,
          ),
        ],
      },
      {
        id: 'akutt-kvalm',
        eyebrow: 'Fastlege eller legevakt',
        heading: 'Akutt svimmel og kvalm, hva nå?',
        body: [
          t(
            'Har svimmelheten kommet plutselig og er der hele tiden, også når du ligger helt i ro, bør du til fastlegen samme dag. Er legekontoret stengt, ring legevakten på 116 117. Det samme gjelder hvis du er svimmel og kvalm i timevis, har øresus eller nedsatt hørsel, eller tar nye medisiner.',
            `${SRC.trym}; ${SRC.helsenorge} («Kontakt fastlege eller legevakt ved akutt, kraftig eller plagsom svimmelhet»)`,
          ),
        ],
      },
      {
        id: 'noen-sekunder',
        eyebrow: 'Korte anfall',
        heading: 'Plutselig svimmel i noen sekunder?',
        body: [
          t(
            'Kort, kraftig svimmelhet som kommer når du snur deg, legger deg ned eller ser opp, og som gir seg etter sekunder til et minutt når du ligger i ro, er typisk for krystallsyke. Den er i seg selv ufarlig, men du kan falle under et anfall, så reis deg rolig. Varer svimmelheten i minutter eller timer, eller kommer den uten at du beveget hodet, er det noe annet, og det bør undersøkes hos lege.',
            `${SRC.orig('symptomer')}; ${SRC.helsenorge}; ${SRC.sml}`,
          ),
        ],
      },
      {
        id: 'bestille',
        eyebrow: 'Hos meg',
        heading: 'Når kan jeg bestille time hos deg?',
        body: [
          t(
            'Er bildet typisk for krystallsyke, korte anfall ved hodebevegelser og ingen av faresignalene, kan du komme rett til meg, uten henvisning. Finner jeg noe som ikke passer med krystaller, sier jeg hva det kan være og hvem du bør gå til. Det er en del av undersøkelsen.',
            `${SRC.orig('diagnosering')} («Dette avgjør om pasienten skal behandles eller henvises til andre»)`,
          ),
        ],
        link: { href: '/bestill-time', label: 'Bestilling og hva som skjer på timen' },
      },
    ],
    faqs: [
      {
        question: 'Er plutselig svimmelhet farlig?',
        answer:
          'Som regel ikke. Krystallsyke og blodtrykksfall er de vanligste årsakene, og begge er som regel ufarlige. Farlig blir det når svimmelheten kommer sammen med nummenhet, lammelse, talevansker, dobbeltsyn eller kraftig hodepine. Da kan det være hjerneslag, og du ringer 113 med en gang.',
        source: `${SRC.kw('plutselig svimmelhet')}; ${SRC.helsenorgeSlag}; ${SRC.nhiSvimmelhet}`,
      },
      {
        question: 'Hva betyr plutselig svimmelhet i noen sekunder?',
        answer:
          'Kommer den når du reiser deg, er det oftest blodtrykket som henger etter. Kommer den når du snur deg i sengen eller ser opp, og det snurrer, er det oftest krystallsyke. Begge varer kort og er som regel ufarlige. Skjer det ofte, eller sammen med andre symptomer, bør fastlegen se på det.',
        source: `${SRC.kw('plutselig svimmelhet i noen sekunder')}; ${SRC.orig('svimmelhet')}`,
      },
      {
        question: 'Akutt svimmel og kvalm, hva gjør jeg?',
        answer:
          'Sett eller legg deg ned så du ikke faller. Sjekk faresignalene. Kan du prate, smile og løfte begge armene? Hvis ikke, ring 113. Gir svimmelheten seg i ro etter under ett minutt, er det trolig krystallsyke. Er du svimmel og kvalm i timevis, kontakt fastlege eller legevakt samme dag.',
        source: `${SRC.kw('akutt svimmel og kvalm')}; ${SRC.helsenorgeSlag}; ${SRC.helsenorge}`,
      },
      {
        question: 'Nummen i beina og svimmel, er det farlig?',
        answer:
          'Nummenhet sammen med svimmelhet er et av tegnene på hjerneslag, særlig hvis det kom plutselig og rammer én side. Ring 113. Kommer nummenheten gradvis, eller bare når du sitter på en bestemt måte, er det oftere nerver eller rygg, og da er fastlegen riktig vei.',
        source: `${SRC.kw('nummen i beina og svimmel')}; ${SRC.orig('svimmelhet')}; ${SRC.helsenorgeSlag}`,
      },
      {
        question: 'Hva er akutt svimmelhet?',
        answer:
          'Svimmelhet som kommer brått, uten forvarsel. Den kan være snurrende (vertigo), nautisk som på en båt, eller en følelse av å skulle besvime. Krystallsyke, virus på balansenerven, migrene og blodtrykksfall er vanlige årsaker. Hjerneslag er sjeldent, men må utelukkes når andre symptomer følger med.',
        source: `${SRC.kw('akutt svimmelhet')}; ${SRC.orig('svimmelhet')} («Former for akutt svimmelhet»)`,
      },
    ],
    related: ['svimmelhet', 'symptomer', 'andre-arsaker'],
    closing: {
      heading: 'Ingen faresignaler, men svimmel ved hodebevegelser?',
      lede: 'Da kan du velge en ledig tid i kalenderen og booke selv. Du trenger ikke henvisning.',
    },
  },

  /* ------------------------------------------------------------------ */
  nakkesvimmelhet: {
    kind: 'info',
    intro: t(
      'Stiv nakke og svimmelhet kan henge sammen, men det kjennes ofte annerledes enn krystallsyke. Fagordet er cervikogen svimmelhet. Derfor undersøker jeg begge deler før jeg behandler. Er det krystaller, er det øret jeg behandler.',
      `${SRC.orig('svimmelhet')} («Nakke-svimmelhet», «Hvorfor blir jeg så stiv i nakken av krystallsyke?»)`,
    ),
    sections: [
      {
        id: 'plagen',
        eyebrow: 'Kjenner du deg igjen?',
        heading: 'Stiv nakke og svimmel samtidig?',
        body: [
          t(
            'Svimmelheten fra nakken snurrer sjelden. Den er mer en ustøhet eller ørhet som kommer når du har sittet lenge, vrir hodet eller er stiv om morgenen. Mange har hodepine fra nakken i tillegg. Og mange har hatt krystallsyke, og lurer på om det er det igjen.',
            `${SRC.orig('svimmelhet')}; ${SRC.kw('stiv nakke svimmel')}`,
          ),
        ],
      },
      {
        id: 'mekanismen',
        eyebrow: 'Slik henger det sammen',
        heading: 'Hva er cervikogen svimmelhet?',
        body: [
          t(
            'Hjernen bruker tre kilder for å vite hvor du er. Det er øynene, balanseorganet i øret og kroppsfølerne i muskler og ledd. Øverst i nakken sitter det flest bevegelsesfølere. Fungerer leddene der dårlig, får hjernen informasjon som ikke stemmer med det øret og øynene sier, og du kjenner deg ustø.',
            `${SRC.orig('svimmelhet')} («De tre systemene hjernen bruker», «Ofte er denne svimmelheten forårsaket av en leddfunksjonsforstyrrelse øverst i nakken»)`,
          ),
          t(
            'Når du har krystaller på avveie, strammer du nakke og skuldre for å beskytte deg mot anfallene. Over tid gir det smerter og stivhet, ofte med hodepine. Derfor ser jeg mange med både krystallsyke og stiv nakke, og da er det krystallene som må tas først.',
            `${SRC.orig('svimmelhet')} («En naturlig måte å stabilisere på er å stramme musklene i nakke og skuldre»)`,
          ),
        ],
      },
      {
        id: 'skille',
        eyebrow: 'Forskjellen',
        heading: 'Nakkesvimmelhet eller krystaller: hvordan skiller du dem?',
        body: [
          t(
            'Krystallsyke gir korte, snurrende anfall når du legger deg ned eller snur deg, og en bestemt øyebevegelse under testen. Nakkesvimmelhet gir ustøhet uten snurring, ingen nystagmus ved Dix-Hallpike, og den henger sammen med stivhet og smerter i nakken. Jeg utelukker alltid krystaller og andre årsaker først, så vurderer jeg nakken.',
            `${SRC.orig('svimmelhet')} («Kiropraktoren vil etter å ha utelukket andre årsaker funksjonsvurdere bevegelsen i de forskjellige leddene i nakken»)`,
          ),
        ],
      },
      {
        id: 'provd',
        eyebrow: 'Det du har prøvd',
        heading: 'Øvelser for stiv nakke og svimmelhet',
        body: [
          t(
            'Tøying og bevegelse for nakken er sjelden feil, og hjelper mange. Men virker det ikke, kan det være fordi svimmelheten ikke kommer fra nakken, men fra øret. Og øvelser for krystallsyke hjelper ikke på nakken. Derfor er det lurt å finne kilden før du trener.',
            `${SRC.kw('øvelser for stiv nakke og svimmelhet')}; ${SRC.orig('øvelser')}`,
          ),
        ],
      },
      {
        id: 'nakken-ved-krystaller',
        eyebrow: 'Når det er krystaller',
        heading: 'Hva gjør du med nakken når det er krystaller?',
        body: [
          t(
            'Ved krystallsyke behandler jeg øret, med rolige hodebevegelser i bestemte stillinger, så krystallene kan flytte seg tilbake. Jeg tester alltid først at nakken din tåler stillingene. Er nakken stiv etter en periode med svimmelhet, er det ofte fordi du har holdt hodet stille for å unngå anfall. Den slipper gjerne når anfallene er borte og du beveger deg normalt igjen. {{OLVE_BEKREFT: hvordan du skiller nakkesvimmelhet fra krystallsyke, og hva du gjør med nakken}}',
            `${SRC.orig('behandling')} («Jeg tester alltid om pasienten klarer manøveren før den utføres»); ${SRC.orig('svimmelhet')} («Hvorfor blir jeg så stiv i nakken av krystallsyke?»)`,
          ),
        ],
      },
      whoExamines(
        'Nakkesvimmelhet er noe kiropraktorer har arbeidet med i mange år, og jeg vurderer bevegelsen i leddene øverst i nakken som en del av undersøkelsen.',
      ),
      firstVisit('Jeg tester for krystaller først, og undersøker så nakken.'),
    ],
    faqs: [
      {
        question: 'Hva er cervikogen svimmelhet?',
        answer:
          'Svimmelhet som kommer fra nakken. Leddene og musklene øverst i nakken sender informasjon til hjernen om hvor hodet er. Fungerer de dårlig, stemmer ikke informasjonen med det øret og øynene sier, og du blir ustø og ør. Den snurrer sjelden, og følger ofte stivhet og smerter i nakken.',
        source: `${SRC.kw('cervikogen svimmelhet')}; ${SRC.orig('svimmelhet')}`,
      },
      {
        question: 'Kan man bli svimmel av stiv nakke?',
        answer:
          'Ja. En stiv nakke gir hjernen dårligere informasjon om hvor hodet er, og det kan kjennes som ustøhet eller ørhet. Men stiv nakke kan også være en følge av krystallsyke, fordi du spenner deg mot anfallene. Snurrer det når du snur deg i sengen, er det øret som må undersøkes først.',
        source: `${SRC.marked}; ${SRC.orig('svimmelhet')}`,
      },
      {
        question: 'Hvorfor blir jeg stiv i nakken av krystallsyke?',
        answer:
          'Når balanseorganet sender feil signaler, prøver kroppen å stabilisere seg, og den letteste måten er å stramme musklene i nakke og skuldre. I tillegg beveger du deg forsiktig for å unngå anfall. Begge deler gir over tid stivhet og smerter, ofte med hodepine. Det går vanligvis over når krystallene er på plass.',
        source: `${SRC.orig('svimmelhet')} («Hvorfor blir jeg så stiv i nakken av krystallsyke?»)`,
      },
      {
        question: 'Finnes det øvelser for stiv nakke og svimmelhet?',
        answer:
          'Ja, rolige bevegelser og tøying av nakken hjelper mange, og øye- og balansetrening kan legges til. Men øvelsene må passe årsaken. Kommer svimmelheten fra krystaller, må de flyttes først. Kommer den fra nakken, er nakkebehandling og trening veien. Derfor undersøker jeg før jeg gir øvelser.',
        source: `${SRC.kw('øvelser for stiv nakke og svimmelhet')}; ${SRC.orig('trening')}`,
      },
      {
        question: 'Hva er nakkesvimmelhet?',
        answer:
          'Det er et hverdagsord for cervikogen svimmelhet, altså ustøhet og ørhet som henger sammen med stivhet, smerter eller dårlig bevegelse i nakken. Den utløses ofte av å sitte lenge eller vri hodet, og snurrer sjelden. Den stilles ved å utelukke øret og andre årsaker først, og så vurdere nakken.',
        source: `${SRC.kw('nakkesvimmelhet')}; ${SRC.orig('svimmelhet')}`,
      },
    ],
    related: ['svimmelhet', 'andre-arsaker', 'behandling'],
    closing: {
      heading: 'Vil du vite om det er nakken eller øret?',
      lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
    },
  },

  /* ------------------------------------------------------------------ */
  'andre-arsaker': {
    kind: 'info',
    intro: t(
      'Ikke all svimmelhet er krystaller. Her er de vanligste andre årsakene, som Menières sykdom, virus på balansenerven (vestibularisnevritt) og PPPD, hvordan de ofte kjennes, og hvem du bør gå til.',
      `${SRC.orig('svimmelhet')} («Andre årsaker til svimmelhet kan være»)`,
    ),
    sections: [
      {
        id: 'plagen',
        eyebrow: 'Kjenner du deg igjen?',
        heading: 'Svimmel, men ikke bare når du snur deg?',
        body: [
          t(
            'Krystaller gir som regel ingen svimmelhet når du ligger helt i ro. Er du svimmel hele tiden, i timer eller dager, eller har du øresus og nedsatt hørsel samtidig, peker det mot noe annet. Det er viktig å vite, fordi noen av disse tilstandene bør vurderes av lege tidlig.',
            `${SRC.orig('svimmelhet')} («krystaller stort sett aldri gir symptomer når pasienten er helt i ro»)`,
          ),
        ],
      },
      {
        id: 'meniere',
        eyebrow: 'Øresus og svimmel',
        heading: 'Menières sykdom: anfall med øresus og nedsatt hørsel',
        body: [
          t(
            'Menières sykdom er en sykdom i det indre øret som gir anfall av svimmelhet som varer i timer, sammen med øresus, trykk i øret og nedsatt hørsel. Den er ganske uvanlig, men kan være svært plagsom. Mistenker jeg Menière, henviser jeg til fastlegen og øre-nese-hals-lege.',
            `${SRC.orig('svimmelhet')} («Menières sykdom»), omskrevet uten vurdering av medisinsk behandling`,
          ),
        ],
      },
      {
        id: 'vestibularisnevritt',
        eyebrow: 'Virus på balansenerven',
        heading: 'Virus på balansenerven (vestibularisnevritt)',
        body: [
          t(
            'En betennelse eller irritasjon på balansenerven, som sender informasjon fra det indre øret til hjernen. Den gir kraftig svimmelhet og nystagmus som ved krystallsyke, men svimmelheten er der hele tiden, og kan vare i opptil tre døgn før den roer seg. Dette bør vurderes av lege i den akutte fasen.',
            `${SRC.orig('svimmelhet')} («Virus på balansenerven (vestibularisnevritt)»)`,
          ),
          t(
            'Etter den akutte fasen kan det sitte igjen en ubalanse. Da kan en vurdering av øyebevegelser og balanse, og opptrening med vestibulær rehabilitering, være aktuelt. Hvem som følger opp det, avklarer du med fastlegen. {{OLVE_BEKREFT: hva du tar imot av svimmelhet som ikke er krystallsyke}}',
            `${SRC.orig('svimmelhet')}; ${SRC.limbra} (vestibulær rehabilitering)`,
          ),
        ],
      },
      {
        id: 'labyrintitt',
        eyebrow: 'Betennelse i det indre øret',
        heading: 'Labyrintitt',
        body: [
          t(
            'En betennelse i selve det indre øret, ofte etter en infeksjon. Den gir svimmelhet og gjerne nedsatt hørsel samtidig. Labyrintitt kan også løsne krystaller, så en del får krystallsyke i etterkant. Selve betennelsen skal vurderes av lege.',
            `${SRC.orig('årsaker')} («Betennelser i det indre øret (Labyrintitt) kan ofte predisponere for krystallsyke»); ${SRC.sml}`,
          ),
        ],
      },
      {
        id: 'pppd',
        eyebrow: 'Svimmel uten funn',
        heading: 'PPPD: ustø over lang tid',
        body: [
          t(
            'Noen blir gående ustø og ør i måneder etter et anfall av akutt svimmelhet, selv om undersøkelsene er normale. Det kalles PPPD (persisterende postural-perseptuell svimmelhet), tidligere fobisk postural vertigo. Balansesystemet er styrt uten at vi tenker på det, og etter et kraftig anfall kan en slags svimmelhetsangst sette seg.',
            `${SRC.orig('svimmelhet')} («Fobisk postural vertigo»)`,
          ),
          t(
            'Her er det sjelden noe å behandle mekanisk. Gradvis trening og hjelp til å tåle bevegelse igjen er det som vanligvis anbefales. Er plagene store, henviser jeg til lege eller psykolog. Det er riktig hjelp.',
            `${SRC.orig('svimmelhet')} («Om problemene er så store at mine teknikker ikke er tilstrekkelige henviser jeg ofte til lege eller psykolog»)`,
          ),
        ],
      },
      {
        id: 'blodtrykk',
        eyebrow: 'Svimmel når du reiser deg',
        heading: 'Svimmel når jeg reiser meg?',
        body: [
          t(
            'En følelse av å bli lett i hodet, nesten besvime, når du reiser deg fort. Det er blodtrykket som ikke henger med (ortostatisk hypotensjon). Den snurrer ikke, og den kommer ved å reise seg, ikke ved å legge seg ned. Medisiner er en vanlig årsak, og da er det fastlegen som skal vurdere det.',
            `${SRC.orig('svimmelhet')} («Ortostatisk hypotensjon», «henviser jeg disse pasienter til fastlegen»); ${SRC.nhiSvimmelhet}`,
          ),
        ],
      },
      {
        id: 'hvem-gaa-til',
        eyebrow: 'Hvem du bør gå til',
        heading: 'Hvem bør jeg gå til?',
        body: [
          t(
            'Jeg behandler ikke Menières sykdom, vestibularisnevritt i den akutte fasen, migrene med medisiner, eller svimmelhet som kommer av medisiner eller blodtrykk. Jeg gir ingen råd om medisiner. Da sier jeg hva det kan være og hvem du bør gå til, som regel fastlegen.',
            `${SRC.orig('svimmelhet')} («Da jeg ikke har noen lovmessig kompetanse innen farmakologi ... henviser jeg disse pasienter til fastlegen»)`,
          ),
        ],
      },
    ],
    faqs: [
      {
        question: 'Hva er forskjellen på vestibularisnevritt og krystallsyke?',
        answer:
          'Begge gir kraftig svimmelhet og nystagmus. Men krystallsyke gir korte anfall ved hodebevegelser og ro i ro. Vestibularisnevritt gir svimmelhet som er der hele tiden, gjerne i ett til tre døgn, og den er mindre avhengig av stilling. Under videobrillene ser de to tilstandene helt forskjellige ut.',
        source: `${SRC.kw('vestibularisnevritt')}; ${SRC.orig('svimmelhet')} («Er svimmelhet når jeg snur meg i sengen alltid krystallsyke?»)`,
      },
      {
        question: 'Hva er Menières sykdom?',
        answer:
          'En sykdom i det indre øret som gir anfall av svimmelhet som varer i timer, sammen med øresus, trykkfølelse og nedsatt hørsel på det ene øret. Den er uvanlig, men kan være svært plagsom. Diagnosen stilles av lege, gjerne øre-nese-hals-lege, og jeg henviser dit ved mistanke.',
        source: `${SRC.kw('menières sykdom')}; ${SRC.orig('svimmelhet')}`,
      },
      {
        question: 'Hva er PPPD?',
        answer:
          'PPPD står for persisterende postural-perseptuell svimmelhet. Det er en vedvarende følelse av ustøhet og ørhet, ofte etter et anfall av akutt svimmelhet, der undersøkelsene er normale. Den forverres av å stå, gå og av synsinntrykk. Behandlingen er gradvis trening, ofte sammen med hjelp fra lege eller psykolog.',
        source: `${SRC.kw('pppd')}; ${SRC.orig('svimmelhet')} («Fobisk postural vertigo»)`,
      },
      {
        question: 'Jeg blir svimmel når jeg reiser meg. Er det krystallsyke?',
        answer:
          'Sjelden. Svimmelhet når du reiser deg er oftest blodtrykket som ikke henger med, og det kjennes som å nesten besvime, uten snurring. Krystallsyke kommer når du legger deg ned, snur deg eller ser opp, og det snurrer. Skjer det ofte når du reiser deg, bør fastlegen sjekke blodtrykk og medisiner.',
        source: `${SRC.kw('svimmel når jeg reiser meg')}; ${SRC.orig('svimmelhet')}; ${SRC.nhiSvimmelhet}`,
      },
      {
        question: 'Øresus og svimmel samtidig, hva kan det være?',
        answer:
          'Krystallsyke gir ikke øresus. Øresus og svimmelhet sammen peker mot det indre øret eller balansenerven, som ved Menières sykdom eller labyrintitt. Plutselig nedsatt hørsel sammen med svimmelhet skal vurderes av lege raskt. Jeg henviser alltid videre når hørselen er med i bildet.',
        source: `${SRC.kw('øresus og svimmel')}; ${SRC.nhiSvimmelhet}; ${SRC.orig('svimmelhet')}`,
      },
      {
        question: 'Hva er balansenerven?',
        answer:
          'Nerven som fører informasjon fra balanseorganet i det indre øret til hjernen. Blir den betent eller irritert, som ved vestibularisnevritt, får hjernen plutselig helt feil signaler fra den ene siden, og du blir kraftig svimmel i dager. Etterpå må hjernen lære seg å stole på den siden igjen, og det kan trenes.',
        source: `${SRC.kw('balansenerven')}; ${SRC.orig('svimmelhet')}`,
      },
    ],
    related: ['svimmelhet', 'er-det-farlig', 'nakkesvimmelhet'],
    closing: {
      heading: 'Usikker på om det er krystaller?',
      lede: 'Book en time, så finner vi ut om det er noe jeg kan hjelpe med, eller om du skal videre til lege. {{OLVE_BEKREFT: hva du tar imot av svimmelhet som ikke er krystallsyke}}',
    },
  },

  /* ------------------------------------------------------------------ */
  svimmelhet: {
    kind: 'hub',
    intro: t(
      'Snurrer det, eller føler du deg ustø? Svimmelhet er to ulike ting, og de har ofte ulike årsaker. Fagordet for snurringen er vertigo. Her er de vanligste årsakene, og når du skal ringe 113.',
      `${SRC.orig('svimmelhet')} («Svimmelhet er en falsk følelse av at man selv eller omgivelsene er i bevegelse»); ${SRC.video2(63, 'Svimmelhet kan vise seg på flere måter og kan ha flere årsaker')}`,
    ),
    sections: [
      {
        id: 'typer',
        eyebrow: 'Oversikt',
        heading: 'Snurrer det, eller er du ustø?',
        body: [
          t(
            'Hvordan svimmelheten kjennes, sier mye om hvor den kommer fra. Jeg deler den i fire:',
            SRC.orig('svimmelhet'),
          ),
        ],
        bullets: [
          t(
            'Du eller rommet roterer. Oftest balanseorganet, som ved krystallsyke eller virus på balansenerven.',
            `${SRC.orig('svimmelhet')} («Rotatorisk svimmelhet / vertigo»)`,
            'Det snurrer (vertigo)',
          ),
          t(
            'Det duver og vugger. Har oftere en årsak i hjernen enn i øret.',
            `${SRC.orig('svimmelhet')} («Nautisk svimmelhet»)`,
            'Som på en båt (nautisk)',
          ),
          t(
            'Det går ikke rundt, men du skjener og er redd for å falle. Vanlig hos eldre, og etter langvarig krystallsyke.',
            `${SRC.orig('svimmelhet')} («Disequilibrium / balanse-problemer»)`,
            'Ustø og utrygg',
          ),
          t(
            'Du er nær ved å besvime. Oftest blodtrykket.',
            `${SRC.orig('svimmelhet')} («Ortostatisk hypotensjon»)`,
            'Lett i hodet når du reiser deg',
          ),
        ],
      },
      {
        id: 'balansen',
        eyebrow: 'Slik henger det sammen',
        heading: 'Hva er vertigo, og hvorfor blir man svimmel?',
        body: [
          t(
            'Hjernen bruker tre kilder for å vite hvor kroppen er. Det er øynene, balanseorganet i det indre øret og kroppsfølerne i muskler, sener og ledd. Når de tre er enige, er du i balanse. Når én av dem sier noe annet enn de to andre, blir du svimmel. Oftest er det balanseorganet som svikter.',
            `${SRC.orig('svimmelhet')} («De tre systemene hjernen bruker er», «Det er klart oftest balanseorganet som svikter»)`,
          ),
        ],
      },
      {
        id: 'arsaker',
        eyebrow: 'Årsaker',
        heading: 'Hva er de vanligste årsakene til svimmelhet?',
        body: [
          t(
            'Krystallsyke er den vanligste årsaken, og den jeg behandler mest. «Men svimmelhet kan også helt klart ha andre årsaker», som jeg sier i videoen «Behandling av krystallsyken». Virus på balansenerven, nakken, migrene, hjernerystelse, Menières sykdom, blodtrykksfall, medisiner og angst etter et svimmelhetsanfall er de vanligste. Hjerneslag er sjeldent, men gir nesten alltid andre symptomer samtidig.',
            `${SRC.orig('svimmelhet')}; ${SRC.video(108, 'Men svimmelighet kan også helt klart ha andre årsaker')}; ${SRC.nhiSvimmelhet}`,
          ),
        ],
        link: { href: '/andre-arsaker', label: 'Les om svimmelhet som ikke er krystallsyke' },
      },
      {
        id: 'ring-113',
        eyebrow: 'Trygghet først',
        heading: 'Når skal du ringe 113?',
        body: [
          t(
            'Tommelfingerregelen min er enkel. Er du i tvil, ring. Svimmelhet sammen med nummenhet, lammelse, talevansker, dobbeltsyn eller plutselig kraftig hodepine kan være hjerneslag. Da ringer du 113 med en gang. Jeg har samlet faresignalene på en egen side.',
            `${SRC.orig('svimmelhet')} («er du i tvil så ringer ambulansen!»); ${SRC.helsenorgeSlag}`,
          ),
        ],
        link: { href: '/er-det-farlig', label: 'Er svimmelheten farlig? Les faresignalene' },
      },
      {
        id: 'undersokelse',
        eyebrow: 'Hos meg',
        heading: 'Hvem kan undersøke svimmelheten?',
        body: [
          t(
            'Fastlegen er et godt første sted, særlig hvis svimmelheten er der hele tiden. Kommer den i korte anfall når du beveger hodet, kan du komme rett til meg. Jeg starter med sykehistorien og en nevrologisk undersøkelse, for å utelukke årsaker som skal til lege. Så ser jeg på øynene med videobriller, på reflekser, nystagmus og hvordan du følger et punkt. Deretter tester jeg balanseorganet med Dix-Hallpike og rulletest, og balansen. Til sammen peker det mot hvilket system som ikke fungerer.',
            `${SRC.orig('svimmelhet')} («Undersøkelse før behandling av akutt svimmelhet»)`,
          ),
        ],
      },
    ],
    faqs: [
      {
        question: 'Hva er vertigo?',
        answer:
          'Vertigo er svimmelhet med følelse av å snurre, enten at du roterer eller at rommet gjør det. Det er en type svimmelhet, ikke en diagnose. Den vanligste årsaken er krystallsyke, men virus på balansenerven, Menières sykdom og migrene gir også vertigo. På norsk sier vi gjerne karusellsvimmelhet eller snurresvimmelhet.',
        source: `${SRC.kw('vertigo, hva er vertigo, vertigo norsk')}; ${SRC.orig('svimmelhet')}`,
      },
      {
        question: 'Hva er årsaken til svimmelhet?',
        answer:
          'Svimmelhet oppstår når øynene, balanseorganet og kroppsfølerne gir hjernen informasjon som ikke stemmer overens. Oftest er det balanseorganet i øret som svikter, og den vanligste enkeltårsaken er krystallsyke. Nakke, blodtrykk, medisiner, migrene, virus på balansenerven og angst er andre vanlige årsaker.',
        source: `${SRC.kw('svimmelhet årsak')}; ${SRC.orig('svimmelhet')}; ${SRC.nhiSvimmelhet}`,
      },
      {
        question: 'Hva er årsakene til svimmelhet hos eldre?',
        answer:
          'Krystallsyke er den vanligste årsaken hos eldre, og den blir vanligere med alderen. Deretter kommer blodtrykksfall når man reiser seg, bivirkninger av medisiner, nedsatt syn og kroppsfølelse, og generell ustøhet. Svimmelhet øker faren for fall, og derfor er det verdt å få det undersøkt, ikke bare leve med det.',
        source: `${SRC.marked}; ${SRC.sml}; ${SRC.nhiSvimmelhet}`,
      },
      {
        question: 'Hvilke tabletter kan brukes mot svimmelhet?',
        answer:
          'Det er fastlegen som vurderer medisiner, ikke jeg. Ved krystallsyke finnes det ingen tablett som flytter krystallene tilbake. Kvalmestillende kan brukes ved behov, men har lite dokumentert effekt på selve svimmelheten. Ved virus på balansenerven eller Menières sykdom kan legen gi medisin i den akutte fasen.',
        source: `${SRC.marked}; ${SRC.nhi} («Kvalmestillende midler har lite dokumentert effekt»); ${SRC.orig('svimmelhet')}`,
      },
      {
        question: 'Hva betyr svimmel på norsk, og hva er forskjellen på svimmel og ør?',
        answer:
          'Svimmel er et samleord for alt fra snurring til ustøhet. Ør eller lett i hodet brukes gjerne om den milde varianten, uten snurring, som når du reiser deg for fort eller har sovet dårlig. Snurrer det, heter det vertigo. Hvilket ord som passer, hjelper meg å finne årsaken.',
        source: `${SRC.kw('svimmel, svimmelhet ika')}; ${SRC.orig('svimmelhet')}`,
      },
    ],
    related: ['hva-er-krystallsyken', 'nakkesvimmelhet', 'andre-arsaker', 'er-det-farlig'],
    closing: {
      heading: 'Vil du finne ut hva svimmelheten kommer av?',
      lede: 'Velg en ledig tid i kalenderen og book selv. Du trenger ikke henvisning.',
    },
  },
}
