import { t } from '../helpers'
import { SRC } from '../sources'
import type { InfoContent } from '../types'

/**
 * /undersokelse (arbeidsdokument §8), with the clinic's VOG photos and the
 * equipment list from site.practitioner.equipment. No claim that one test
 * alone finds the cause of complex symptoms (§18).
 */
export const UNDERSOKELSE_CONTENT: InfoContent = {
  kind: 'info',
  updated: '2026-11-17',
  safety: false,
  heroPhoto: 'vog-pasient-oreplansje',
  intro: t(
    'Når jeg undersøker langvarig svimmelhet eller plager etter hjernerystelse, prøver jeg å få informasjon fra flere ulike funksjoner. Ingen enkelt test gir hele svaret.',
    SRC.doc(8),
  ),
  sections: [
    {
      id: 'videobriller',
      heading: 'Videobriller: VOG/VNG',
      lede: '«Jeg skal sette på deg et par briller slik at jeg kan se på øynene dine i mørket.»',
      photo: {
        name: 'vog-naerbilde',
        caption: 'Et lite kamera filmer det ene øyet. Det andre er dekket, så øynene er i mørket.',
      },
      body: [
        t(
          'Med videobriller kan jeg observere og ved behov gjøre opptak av øyebevegelser, blant annet nystagmus. Det kan være nyttig når jeg skal skille mellom ulike mønstre av svimmelhet eller følge endringer over tid.',
          SRC.doc(8),
        ),
      ],
    },
    {
      id: 'sakkader',
      heading: 'Måling av raske øyebevegelser',
      body: [
        t(
          'Med et sakkadometer kan jeg undersøke egenskaper ved raske øyebevegelser, for eksempel reaksjonstid, hastighet og presisjon. Resultatene vurderes sammen med øvrige funn og pasientens symptomer.',
          SRC.doc(8),
        ),
      ],
    },
    {
      id: 'balanse',
      heading: 'Balanse, koordinasjon og blikkstabilisering',
      body: [
        t(
          'Avhengig av problemstillingen kan jeg undersøke balanse på ulike underlag, koordinasjon, evnen til å følge et mål med blikket og samspillet mellom hode- og øyebevegelser.',
          SRC.doc(8),
        ),
      ],
    },
    {
      id: 'undersok-pa-nytt',
      heading: 'Undersøk, prøv, undersøk på nytt',
      photo: {
        name: 'vog-profil',
        caption: 'Undersøkelse med videobriller, sett fra siden.',
      },
      body: [
        t(
          'Funnene gir grunnlag for en foreløpig arbeidshypotese. Deretter kan vi prøve ut målrettede øvelser eller andre tiltak og undersøke på nytt. Hvis resultatene ikke stemmer med det jeg forventet, må hypotesen revurderes.',
          SRC.doc(8),
        ),
        t(
          'Testresultater er nyttige, men bedre funksjon i hverdagen er det viktigste målet.',
          SRC.doc(8),
        ),
      ],
    },
  ],
  showEquipment: true,
  faqs: [
    {
      question: 'Hva er videobriller (VOG/VNG)?',
      answer:
        'Briller med et lite kamera som filmer øyet mens du er i mørket. Med dem kan jeg observere og ved behov gjøre opptak av øyebevegelser, blant annet nystagmus, også når du ikke kan feste blikket.',
      source: SRC.doc(8),
    },
    {
      question: 'Kan én test finne årsaken til plagene mine?',
      answer:
        'Nei. Ingen enkelt test gir hele svaret. Jeg henter informasjon fra flere funksjoner, som øyebevegelser, balanse og koordinasjon, og vurderer resultatene sammen med symptomene dine.',
      source: `${SRC.doc(8)}; ${SRC.doc(18)}`,
    },
    {
      question: 'Hvorfor undersøker du på nytt etter en øvelse?',
      answer:
        'Funnene gir en foreløpig arbeidshypotese. Når vi har prøvd en øvelse eller et annet tiltak, undersøker jeg på nytt. Stemmer ikke resultatene med det jeg forventet, må hypotesen revurderes.',
      source: SRC.doc(8),
    },
  ],
  related: ['svimmelhet', 'hjernerystelse', 'om-olve'],
  closing: {
    heading: 'Vil du bli undersøkt?',
    lede: 'Du bestiller time i timebestillingen hos Limbra. Jeg velger undersøkelsene ut fra det du forteller.',
  },
}
