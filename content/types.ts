import type { PositionName } from './positions'
import type { PhotoName } from '@/photos'
/*
 * Content model. Every fact carries a `source` (claims-audit as data).
 * Text may contain placeholders:
 *   {{FASE_B: ...}}       text slot still to be written
 *   {{OLVE_BEKREFT: ...}} fact the practitioner must confirm before launch
 *   {{OLVE_BEKREFT: etikett | visning}} same, with the text shown in its place
 * Placeholders render as numbered markers (RichText, PreviewNotes) and block production.
 */

/**
 * `label` is a short lead shown on its own line above the text («Anfallet»,
 * «Tog»), so a paragraph never opens with «Etikett: lang setning».
 */
export type Sourced = { text: string; source: string; label?: string }

export type Faq = { question: string; answer: string; source: string }

export type Section = {
  /** anchor id for the table of contents */
  id: string
  eyebrow?: string
  heading: string
  lede?: string
  body: Sourced[]
  bullets?: Sourced[]
  /** a small drawing that points out one canal, beside the heading (/buegangene) */
  canal?: 'bakre' | 'horisontal' | 'fremre'
  /** optional link rendered after the body */
  link?: { href: string; label: string }
}

export type Step = {
  title: string
  body: Sourced
  /** optional duration or timing label on timelines */
  meta?: string
  image?: { src: string; alt: string }
  /** a position drawing shown under the step (content/positions.tsx) */
  figure?: { name: PositionName; caption?: string }
}

export type Closing = { heading: string; lede: string }

export type BaseContent = {
  /** first paragraph; must carry the head keyword of the page */
  intro: Sourced
  faqs: Faq[]
  /** slugs of related pages */
  related: string[]
  closing: Closing
}

export type InfoContent = BaseContent & {
  kind: 'info'
  sections: Section[]
}

export type HubContent = BaseContent & {
  kind: 'hub'
  sections: Section[]
}

export type ExerciseContent = BaseContent & {
  kind: 'exercise'
  /** H2 over the warning box («Vet du hvilket øre det er?») */
  warningHeading: string
  warning: Sourced
  /** optional short section right under the warning (why to wait for the examination) */
  why?: Section
  /** H2 over the numbered steps («Epleys manøver hjemme, steg for steg») */
  stepsHeading: string
  /** a short line under the steps heading (e.g. what the orange rail shows) */
  stepsLede?: string
  /** the crystal rail beside the steps (Epley) */
  rail?: boolean
  steps: Step[]
  showVideo: boolean
  sections: Section[]
}

export type LandingContent = BaseContent & {
  kind: 'landing'
  timeline: Step[]
  /** one of the clinic's photos (src/photos.ts) over the canal drawing in «Slik foregår timen» */
  photo?: { name: PhotoName; caption: string }
  showEquipment: boolean
  showPrice: boolean
  referral: Section
  sections: Section[]
}

export type LocalContent = BaseContent & {
  kind: 'local'
  areas: Sourced[]
  /** «Slik finner du frem»: train, bus, parking, the sign on the door */
  practical: Sourced[]
  sections: Section[]
}

export type PractitionerContent = BaseContent & {
  kind: 'practitioner'
  facts: { label: string; value: Sourced }[]
  sections: Section[]
  showVideo: boolean
}

export type BookingContent = BaseContent & {
  kind: 'booking'
  whatHappens: Step[]
  beforeVisit: Sourced[]
}

export type FaqPageContent = BaseContent & {
  kind: 'faq'
  groups: { heading: string; faqs: Faq[] }[]
}

export type ContactContent = BaseContent & {
  kind: 'contact'
  practical: Sourced[]
}

export type PrivacyContent = {
  kind: 'privacy'
  updated: string
  intro: Sourced
  sections: Section[]
}

export type HomeContent = {
  kind: 'home'
  /** Lede under the H1, one fact line under the buttons */
  hero: { lede: Sourced; factLine: Sourced; figureCaption: string }
  /** Order: safety box first, then recognition */
  safety: { heading: string; lede: string }
  recognise: { heading: string; lede: string; items: Sourced[] }
  /** «Må jeg vente til det går over?» */
  wait: Section
  /** «Hvorfor ser du på øynene mine?» */
  eyes: Section & { figureCaption: string }
  /** «Prøvd øvelsene uten at det hjalp?» (variant 3 as H2) */
  tried: Section & { linkLabel: string }
  process: { heading: string; lede: string; steps: Step[] }
  /** «Hvem møter jeg?» */
  profile: { heading: string; lede: string; body: Sourced[] }
  /** «Hva koster det, og trenger jeg henvisning?» with the practical lines for the location card */
  price: Section & { practical: Sourced[] }
  closing: Closing & { figureCaption: string }
  depth: { heading: string; lede: string }
  faqs: Faq[]
}

export type PageContent =
  | HomeContent
  | InfoContent
  | HubContent
  | ExerciseContent
  | LandingContent
  | LocalContent
  | PractitionerContent
  | BookingContent
  | FaqPageContent
  | ContactContent
  | PrivacyContent
