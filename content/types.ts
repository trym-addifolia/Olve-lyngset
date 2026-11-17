import type { PhotoName } from '@/photos'
/*
 * Content model. Every fact carries a `source` (claims-audit as data), usually
 * the section of Olve's working document: 'arbeidsdokument §5'.
 * Text may contain placeholders:
 *   {{FASE_B: ...}}       text slot still to be written
 *   {{OLVE_BEKREFT: ...}} fact the practitioner must confirm before launch
 *   {{OLVE_BEKREFT: etikett | visning}} same, with the text shown in its place
 * Placeholders render as numbered markers (RichText, PreviewNotes) and block production.
 */

/**
 * `label` is a short lead shown on its own line above the text («Parkering»),
 * so a paragraph never opens with «Etikett: lang setning».
 */
export type Sourced = { text: string; source: string; label?: string }

export type Faq = { question: string; answer: string; source: string }

/** One of the clinic's own photos (src/photos.ts) with an optional caption. */
export type PhotoRef = { name: PhotoName; caption?: string }

export type Section = {
  /** anchor id for the table of contents */
  id: string
  eyebrow?: string
  heading: string
  lede?: string
  body: Sourced[]
  bullets?: Sourced[]
  /** a photo under the heading */
  photo?: PhotoRef
  /** optional link rendered after the body */
  link?: { href: string; label: string }
}

export type Step = {
  title: string
  body: Sourced
  /** optional duration or timing label on timelines */
  meta?: string
}

export type Closing = { heading: string; lede: string }

export type BaseContent = {
  /** first paragraph; carries the head keyword of the page */
  intro: Sourced
  faqs: Faq[]
  /** slugs of related pages (nested slugs allowed) */
  related: string[]
  closing: Closing
}

export type InfoContent = BaseContent & {
  kind: 'info'
  /** the 113 box (id «akutt»); required on svimmelhet, hjernerystelse and krystallsyke */
  safety: boolean
  /** a photo beside the hero text (desktop) */
  heroPhoto?: PhotoName
  sections: Section[]
}

export type HubContent = BaseContent & {
  kind: 'hub'
  safety: boolean
  heroPhoto?: PhotoName
  sections: Section[]
}

export type LandingContent = BaseContent & {
  kind: 'landing'
  /**
   * How the reader gets in touch. 'email': the intensive stay, which is not
   * booked online (arbeidsdokument §7); the hero card and the closing band
   * open a mailto with the enquiry subject instead of the booking calendar.
   */
  contact: 'booking' | 'email'
  safety: boolean
  /** H2 and lede over the timeline («Slik kan et opphold foregå») */
  timelineHeading: string
  timelineLede?: string
  timeline: Step[]
  /** a photo beside the timeline */
  photo?: PhotoRef
  showEquipment: boolean
  showPrice: boolean
  sections: Section[]
}

export type PractitionerContent = BaseContent & {
  kind: 'practitioner'
  facts: { label: string; value: Sourced }[]
  sections: Section[]
  showVideo: boolean
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

/**
 * The home page, shared by direction A (/) and direction B (/retning-b). The
 * H1 and eyebrow live in the route registry. Task 3 extends this with the
 * doorways and the lower sections (arbeidsdokument §4).
 */
export type HomeContent = {
  kind: 'home'
  hero: {
    /** the ingress under the H1, one or two paragraphs */
    lede: Sourced[]
    /** the button beside «Bestill time» */
    secondary: { label: string; href: string }
  }
  /** «Klar for å ta kontakt?» */
  closing: Closing
}

export type PageContent =
  | HomeContent
  | InfoContent
  | HubContent
  | LandingContent
  | PractitionerContent
  | ContactContent
  | PrivacyContent
