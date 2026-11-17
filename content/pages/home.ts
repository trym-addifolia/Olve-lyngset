import { t } from '../helpers'
import { SRC } from '../sources'
import type { HomeContent } from '../types'

/** The home page, both directions (arbeidsdokument §4). Task 3 fills in the rest. */
export const HOME_CONTENT: HomeContent = {
  kind: 'home',
  hero: {
    lede: [
      t(
        'Når symptomene varer lenge, og du fortsatt mangler en forklaring, kan det være vanskelig å vite hvor du skal søke hjelp. Jeg heter Olve Lyngset og er kiropraktor med mer enn 30 års erfaring. Jeg arbeider særlig med svimmelhet, balanseproblemer og langvarige plager etter hjernerystelse, i tillegg til vanlige muskel- og skjelettplager.',
        SRC.doc(4),
      ),
      t(
        'Jeg legger vekt på å lytte til historien din, undersøke grundig og forsøke å finne en fornuftig vei videre. Målet er ikke bare bedre testresultater, men at du skal fungere bedre i hverdagen.',
        SRC.doc(4),
      ),
    ],
    secondary: { label: 'Slik undersøker jeg', href: '/undersokelse' },
  },
  closing: {
    heading: 'Klar for å ta kontakt?',
    lede: 'Du kan bestille en vanlig konsultasjon gjennom timebestillingen hos Limbra. Ved spørsmål om et intensivt rehabiliteringsopphold ber jeg deg kontakte meg direkte, slik at vi kan vurdere behov og praktisk gjennomføring.',
  },
}
