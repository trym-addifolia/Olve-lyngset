import { site } from '@/site.config'
import { t } from '../helpers'
import { SRC } from '../sources'
import type { PractitionerContent } from '../types'

const p = site.practitioner

/**
 * /om-olve (arbeidsdokument §10). Stub: Task 2 adds the story, the full facts
 * table (DACNB explained, further education, memberships) and the FAQ. The
 * video stays off until Olve has reviewed it (§14).
 */
export const OM_OLVE_CONTENT: PractitionerContent = {
  kind: 'practitioner',
  intro: t(
    'Jeg hadde egentlig sett for meg en annen yrkesvei. Som ung spilte jeg ishockey, og etter en takling fikk jeg ryggplager. Moren min tok meg med til kiropraktor Gunn Austlid i Lillestrøm. Hjelpen jeg fikk der, gjorde så sterkt inntrykk at jeg bestemte meg for å bli kiropraktor.',
    SRC.doc(10),
  ),
  facts: [
    { label: 'Autorisasjon', value: t(p.hprNumber, SRC.krystallsyken) },
    { label: 'Utdanning', value: t(p.education, `${SRC.doc(10)}; ${SRC.krystallsyken}`) },
    { label: 'Erfaring', value: t(p.yearsInPractice, SRC.doc(2)) },
    { label: 'Arbeidssted', value: t('Limbra Storgata, Lillestrøm', SRC.doc(10)) },
  ],
  sections: [],
  showVideo: false,
  faqs: [],
  related: ['undersokelse', 'kontakt'],
  closing: {
    heading: 'Vil du at jeg ser på plagene dine?',
    lede: 'Jeg kan ikke love at jeg finner løsningen for alle. Men jeg lover å ta plagene dine på alvor, gjøre en grundig vurdering og være ærlig om hva jeg tror kan hjelpe.',
  },
}
