import { HOME_CONTENT } from './home'
import { INFO_CONTENT } from './info'
import {
  BOOKING_CONTENT,
  CONTACT_CONTENT,
  EXERCISE_CONTENT,
  FAQ_CONTENT,
  LANDING_CONTENT,
  LOCAL_CONTENT,
  PRACTITIONER_CONTENT,
  PRIVACY_CONTENT,
} from './pages'
import type { PageContent } from './types'

/** Content per slug ('' = home). Every public route must have an entry. */
export const CONTENT: Record<string, PageContent> = {
  '': HOME_CONTENT,
  ...INFO_CONTENT,
  ...EXERCISE_CONTENT,
  ...LANDING_CONTENT,
  lillestrom: LOCAL_CONTENT,
  'om-meg': PRACTITIONER_CONTENT,
  'bestill-time': BOOKING_CONTENT,
  'sporsmal-og-svar': FAQ_CONTENT,
  kontakt: CONTACT_CONTENT,
  personvern: PRIVACY_CONTENT,
}

export function contentFor(slug: string): PageContent | undefined {
  return CONTENT[slug]
}

export * from './types'
