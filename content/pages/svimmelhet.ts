import { t } from '../helpers'
import { SRC } from '../sources'
import type { HubContent } from '../types'

/** /svimmelhet (arbeidsdokument §5). Stub: Task 2 adds the sections and FAQ. */
export const SVIMMELHET_CONTENT: HubContent = {
  kind: 'hub',
  safety: true,
  heroPhoto: 'vog-profil',
  intro: t(
    'Svimmelhet er ikke én enkelt tilstand. For noen snurrer rommet rundt. Andre føler seg ustø, gynger, blir slitne av å handle i store butikker eller synes det er vanskelig å lese, bruke skjerm eller bevege seg i travle omgivelser.',
    SRC.doc(5),
  ),
  sections: [],
  faqs: [],
  related: ['svimmelhet/krystallsyke', 'undersokelse', 'intensivt-opphold'],
  closing: {
    heading: 'Vil du få svimmelheten undersøkt?',
    lede: 'Jeg vil vite hvordan svimmelheten oppleves, når den startet, hva som utløser eller forverrer den, og hva du ikke lenger får gjort i hverdagen. Deretter velger jeg undersøkelser ut fra det du forteller.',
  },
}
