import { ANDRE_PLAGER_CONTENT } from './pages/andre-plager'
import { HJERNERYSTELSE_CONTENT } from './pages/hjernerystelse'
import { HOME_CONTENT } from './pages/home'
import { INTENSIVT_OPPHOLD_CONTENT } from './pages/intensivt-opphold'
import { KONTAKT_CONTENT } from './pages/kontakt'
import { KRYSTALLSYKE_CONTENT } from './pages/krystallsyke'
import { OM_OLVE_CONTENT } from './pages/om-olve'
import { PERSONVERN_CONTENT } from './pages/personvern'
import { SVIMMELHET_CONTENT } from './pages/svimmelhet'
import { UNDERSOKELSE_CONTENT } from './pages/undersokelse'
import type { PageContent } from './types'

/**
 * Content per route slug ('' = home; nested slugs joined with «/»), one file
 * per page in content/pages/. Every route in src/routes.ts must have an entry
 * whose kind fits its template (src/lib/routes.test.ts).
 */
export const CONTENT: Record<string, PageContent> = {
  '': HOME_CONTENT,
  svimmelhet: SVIMMELHET_CONTENT,
  'svimmelhet/krystallsyke': KRYSTALLSYKE_CONTENT,
  hjernerystelse: HJERNERYSTELSE_CONTENT,
  'intensivt-opphold': INTENSIVT_OPPHOLD_CONTENT,
  'andre-plager': ANDRE_PLAGER_CONTENT,
  undersokelse: UNDERSOKELSE_CONTENT,
  'om-olve': OM_OLVE_CONTENT,
  kontakt: KONTAKT_CONTENT,
  personvern: PERSONVERN_CONTENT,
}

/** The home content, typed, for the two home routes (no cast from CONTENT). */
export { HOME_CONTENT }

export function contentFor(slug: string): PageContent | undefined {
  return CONTENT[slug]
}

export * from './types'
