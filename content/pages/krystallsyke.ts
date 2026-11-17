import { t } from '../helpers'
import { SRC } from '../sources'
import type { InfoContent } from '../types'

/**
 * /svimmelhet/krystallsyke: a short summary that links out to krystallsyken.no
 * (arbeidsdokument §12, design decision 1). Stub: Task 2 writes the page.
 */
export const KRYSTALLSYKE_CONTENT: InfoContent = {
  kind: 'info',
  safety: true,
  heroPhoto: 'videobriller',
  intro: t(
    'Krystallsyke (BPPV) gir korte episoder med svimmelhet som utløses av stillingsendringer, for eksempel når du snur deg i sengen eller ser opp. Ved mistanke om krystallsyke undersøker jeg buegangene særskilt, samtidig som jeg vurderer om andre forhold kan være relevante.',
    `${SRC.doc(12)} (vinkling); ${SRC.doc(5)} («Ikke all nystagmus er krystallsyke»)`,
  ),
  sections: [],
  faqs: [],
  related: ['svimmelhet', 'undersokelse'],
  closing: {
    heading: 'Lurer du på om det er krystallsyke?',
    lede: 'Hvis jeg finner avvik som kan ha sammenheng med plagene dine, viser og forklarer jeg hva jeg har funnet.',
  },
}
