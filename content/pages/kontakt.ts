import { site } from '@/site.config'
import { t } from '../helpers'
import { SRC } from '../sources'
import type { ContactContent } from '../types'

/**
 * /kontakt, with the practical information folded in (arbeidsdokument §11).
 * Stub: Task 2 completes it.
 */
export const KONTAKT_CONTENT: ContactContent = {
  kind: 'contact',
  intro: t(
    'Jeg tar imot pasienter ved Limbra Storgata i Lillestrøm. En vanlig konsultasjon bestiller du i timebestillingen hos Limbra.',
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
  faqs: [],
  related: ['om-olve', 'intensivt-opphold'],
  closing: {
    heading: 'Klar for å ta kontakt?',
    lede: 'Du kan bestille en vanlig konsultasjon gjennom timebestillingen hos Limbra. Ved spørsmål om et intensivt rehabiliteringsopphold ber jeg deg kontakte meg direkte, slik at vi kan vurdere behov og praktisk gjennomføring.',
  },
}
