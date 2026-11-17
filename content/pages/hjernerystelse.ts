import { t } from '../helpers'
import { SRC } from '../sources'
import type { InfoContent } from '../types'

/** /hjernerystelse (arbeidsdokument §6). Stub: Task 2 adds the sections and FAQ. */
export const HJERNERYSTELSE_CONTENT: InfoContent = {
  kind: 'info',
  safety: true,
  intro: t(
    'De fleste kommer seg etter en hjernerystelse, men noen får plager som varer lenge. Det kan dreie seg om svimmelhet, hodepine, ubehag ved skjermbruk, vansker med konsentrasjon, redusert toleranse for aktivitet eller en følelse av at kroppen ikke fungerer som før.',
    SRC.doc(6),
  ),
  sections: [],
  faqs: [],
  related: ['intensivt-opphold', 'undersokelse', 'svimmelhet'],
  closing: {
    heading: 'Vil du ha en grundig vurdering?',
    lede: 'Jeg kan ikke love et bestemt resultat. Men jeg kan tilby en grundig vurdering og se om min tilnærming kan gi oss en nyttig vei videre.',
  },
}
