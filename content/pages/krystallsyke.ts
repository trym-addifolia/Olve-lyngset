import { t } from '../helpers'
import { SRC } from '../sources'
import type { InfoContent } from '../types'

/**
 * /svimmelhet/krystallsyke: a short summary that links out to krystallsyken.no
 * (arbeidsdokument §12, design decision 1). The §12 angle: short episodes set
 * off by position, why a correct examination of the canals matters, other
 * dizziness can coexist, when other causes must be considered, and no
 * categorical claim that krystallsyke always shows nystagmus. The orange
 * krystall accent is used only in the outbound card (`sister`).
 */
export const KRYSTALLSYKE_CONTENT: InfoContent = {
  kind: 'info',
  safety: true,
  heroPhoto: 'videobriller',
  intro: t(
    'Krystallsyke (BPPV) gir korte episoder med svimmelhet som utløses av stillingsendringer, for eksempel når du snur deg i sengen eller ser opp. Ved mistanke om krystallsyke undersøker jeg buegangene særskilt, samtidig som jeg vurderer om andre forhold kan være relevante.',
    `${SRC.doc(12)} (vinkling); ${SRC.doc(5)} («Ikke all nystagmus er krystallsyke»)`,
  ),
  sections: [
    {
      id: 'episoder',
      heading: 'Korte episoder når du endrer stilling',
      body: [
        t(
          'Krystallsyke skyldes at små krystaller i det indre øret har løsnet og havnet i en av buegangene. Når du endrer stilling, beveger krystallene seg og sender feil signal om bevegelse til hjernen.',
          `${SRC.doc(12)} (hva krystallsyke er)`,
        ),
        t(
          'Svimmelheten kommer gjerne når du legger deg ned, snur deg i sengen, ser opp eller bøyer deg frem. Episodene er som regel korte, men mange kjenner seg ustø eller uvel en stund etterpå.',
          `${SRC.doc(12)} (typiske kortvarige, stillingsutløste episoder)`,
        ),
      ],
    },
    {
      id: 'buegangene',
      heading: 'Hvorfor undersøkelsen av buegangene er viktig',
      body: [
        t(
          'Det indre øret har tre bueganger på hver side. Krystallene kan ligge i ulike bueganger, og behandlingen må passe til den buegangen det gjelder. Derfor undersøker jeg deg i bestemte stillinger med videobriller, slik at jeg kan se øyebevegelsene også uten at du fester blikket.',
          `${SRC.doc(12)} (korrekt undersøkelse av bueganger); ${SRC.doc(5)}`,
        ),
        t(
          'Funnene er ikke alltid like tydelige. Ikke alle med krystallsyke viser nystagmus ved hver undersøkelse, så jeg vurderer det jeg ser sammen med det du forteller.',
          `${SRC.doc(12)} (ingen kategoriske påstander om nystagmus)`,
        ),
        t(
          'Når undersøkelsen peker mot krystallsyke, behandler jeg med bestemte hode- og kroppsbevegelser som er tilpasset buegangen det gjelder. Noen trenger mer enn én behandling.',
          `${SRC.doc(12)} (H1: undersøkelse og behandling)`,
        ),
      ],
    },
    {
      id: 'annen-svimmelhet',
      heading: 'Når det kan være mer enn krystallsyke',
      body: [
        t(
          'Krystallsyke kan forekomme samtidig med annen svimmelhet, for eksempel etter en hjernerystelse. Hvis plagene ikke passer med krystallsyke, eller svimmelheten varer også mellom episodene, vurderer jeg andre forklaringer. Ved behov henviser jeg videre til lege.',
          `${SRC.doc(12)} (annen svimmelhet samtidig, når andre årsaker må vurderes)`,
        ),
      ],
      link: { href: '/svimmelhet', label: 'Les om svimmelhet og balanse' },
    },
  ],
  sister: {
    site: 'krystallsyken',
    heading: 'Les mer på krystallsyken.no',
    body: t(
      'Krystallsyken.no er min egen nettside om krystallsyke. Der forklarer jeg grundigere hvordan buegangene virker, hvordan undersøkelsen foregår og hva du selv kan gjøre.',
      'designspesifikasjon, beslutning 1 (to nettsider, lenket)',
    ),
  },
  faqs: [
    {
      question: 'Hvordan kjenner jeg igjen krystallsyke?',
      answer:
        'Typisk er korte episoder med svimmelhet som kommer når du endrer stilling, for eksempel når du legger deg ned, snur deg i sengen eller ser opp. Mange kjenner seg ustø en stund etterpå. Bare en undersøkelse kan avgjøre om det er krystallsyke.',
      source: SRC.doc(12),
    },
    {
      question: 'Kan jeg ha krystallsyke og annen svimmelhet samtidig?',
      answer:
        'Ja. Krystallsyke kan forekomme sammen med annen svimmelhet, for eksempel etter en hjernerystelse. Hvis plagene ikke passer med krystallsyke, vurderer jeg andre forklaringer, og ved behov henviser jeg videre til lege.',
      source: SRC.doc(12),
    },
    {
      question: 'Hvorfor bruker du videobriller?',
      answer:
        'Med videobriller kan jeg se øyebevegelsene også uten at du fester blikket. Det hjelper meg å finne ut hvilken buegang det gjelder, slik at behandlingen passer. Ikke alle med krystallsyke viser nystagmus ved hver undersøkelse, så jeg vurderer funnene sammen med det du forteller.',
      source: `${SRC.doc(12)}; ${SRC.doc(5)}`,
    },
  ],
  related: ['svimmelhet', 'undersokelse', 'kontakt'],
  closing: {
    heading: 'Lurer du på om det er krystallsyke?',
    lede: 'Hvis jeg finner avvik som kan ha sammenheng med plagene dine, viser og forklarer jeg hva jeg har funnet.',
  },
}
