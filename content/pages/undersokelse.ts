import { t } from '../helpers'
import { SRC } from '../sources'
import type { InfoContent } from '../types'

/** /undersokelse (arbeidsdokument §8). Stub: Task 2 adds the sections and photos. */
export const UNDERSOKELSE_CONTENT: InfoContent = {
  kind: 'info',
  safety: false,
  heroPhoto: 'vog-pasient-oreplansje',
  intro: t(
    'Når jeg undersøker langvarig svimmelhet eller plager etter hjernerystelse, prøver jeg å få informasjon fra flere ulike funksjoner. Ingen enkelt test gir hele svaret.',
    SRC.doc(8),
  ),
  sections: [],
  faqs: [],
  related: ['svimmelhet', 'hjernerystelse'],
  closing: {
    heading: 'Vil du bli undersøkt?',
    lede: 'Testresultater er nyttige, men bedre funksjon i hverdagen er det viktigste målet.',
  },
}
