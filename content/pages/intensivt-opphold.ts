import { t } from '../helpers'
import { SRC } from '../sources'
import type { LandingContent } from '../types'

/**
 * /intensivt-opphold (arbeidsdokument §7). Enquiry by email, never online
 * booking. Long covid is not mentioned at all (§7, «Viktig avgrensning»).
 * Stub: Task 2 adds the sections and FAQ.
 */
export const INTENSIVT_OPPHOLD_CONTENT: LandingContent = {
  kind: 'landing',
  contact: 'email',
  safety: false,
  intro: t(
    'Bor du langt unna, eller har du sammensatte plager som krever tett oppfølging over flere dager? For enkelte pasienter tilbyr jeg et individuelt planlagt rehabiliteringsopphold i Lillestrøm.',
    SRC.doc(7),
  ),
  timelineHeading: 'Slik kan et opphold foregå',
  timelineLede:
    'Målet er ikke at alle plagene skal være borte etter én uke. Målet er å komme nærmere en nyttig forståelse av funksjonen din, finne øvelser som ser ut til å passe og lage en plan du kan arbeide videre med hjemme.',
  timeline: [
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
      body: t('Ved avslutning får du skriftlige øvelser.', SRC.doc(7)),
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
  showPrice: false,
  sections: [],
  faqs: [],
  related: ['hjernerystelse', 'svimmelhet'],
  closing: {
    heading: 'Vil du spørre om et intensivt opphold?',
    lede: 'Fortell kort hva slags plager du ønsker vurdert, hvor du bor og om du ønsker et intensivt opphold. Ikke send følsomme helseopplysninger eller journaler i vanlig e-post. Vi avtaler en tryggere måte å utveksle nødvendig informasjon på dersom det blir aktuelt.',
  },
}
