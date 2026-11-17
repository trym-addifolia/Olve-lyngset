import { site } from '@/site.config'
import { t } from '../helpers'
import { SRC } from '../sources'
import type { ContactContent } from '../types'

/**
 * /kontakt, with the practical information folded in (arbeidsdokument §11).
 * Booking goes through /go/bestill, the intensive stay through the mailto.
 * Address and hours come from site.config (LocationCard). The doc's «Åpne
 * opplysninger» list is a to-do list for the launch, not page text, so it is
 * not here; its open facts are OLVE_BEKREFT markers in site.config.
 */
export const KONTAKT_CONTENT: ContactContent = {
  kind: 'contact',
  intro: t(
    'Jeg tar imot pasienter ved Limbra Storgata i Lillestrøm. En vanlig konsultasjon bestiller du i timebestillingen hos Limbra. Har du spørsmål om et intensivt rehabiliteringsopphold, kontakter du meg direkte på e-post.',
    SRC.doc(11),
  ),
  practical: [
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
    t(
      'Ikke send fødselsnummer, journaler eller detaljerte helseopplysninger i vanlig e-post.',
      SRC.doc(11),
      'Personvern',
    ),
  ],
  faqs: [
    {
      question: 'Hvor lang tid tar den første konsultasjonen?',
      answer: `Ved svimmelhetsundersøkelse setter jeg ofte av ${site.practitioner.consultations[0].duration} til første konsultasjon. Ved langvarige plager etter hjernerystelse tar første konsultasjon ofte ${site.practitioner.consultations[1].duration}.`,
      source: SRC.doc(11),
    },
    {
      question: 'Kan jeg bestille intensivt opphold i timebestillingen?',
      answer:
        'Nei. Et intensivt rehabiliteringsopphold planlegges individuelt. Send meg en kort forespørsel på e-post, så vurderer vi behov og praktisk gjennomføring sammen.',
      source: `${SRC.doc(7)}; ${SRC.doc(11)}`,
    },
    {
      question: 'Kan jeg sende helseopplysninger på e-post?',
      answer:
        'Nei. Ikke send fødselsnummer, journaler eller detaljerte helseopplysninger i vanlig e-post. Blir det aktuelt, avtaler vi en tryggere måte å utveksle nødvendig informasjon på.',
      source: `${SRC.doc(11)}; ${SRC.doc(7)}`,
    },
    {
      question: 'Hvor kan jeg parkere?',
      answer:
        'Klinikken har ingen egen parkering. Du kan parkere i parkeringshuset på Lillestrøm Torv.',
      source: SRC.krystallsyken,
    },
  ],
  related: ['om-olve', 'intensivt-opphold', 'undersokelse'],
  closing: {
    heading: 'Klar for å ta kontakt?',
    lede: 'Du kan bestille en vanlig konsultasjon gjennom timebestillingen hos Limbra. Ved spørsmål om et intensivt rehabiliteringsopphold ber jeg deg kontakte meg direkte, slik at vi kan vurdere behov og praktisk gjennomføring.',
  },
}
