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
  /**
   * A short list of named items, each with one line and an optional link
   * («Tilstander jeg ofte møter» on /svimmelhet). Items without `href` are
   * plain text: their pages do not exist yet.
   */
  entries?: { term: string; body: Sourced; href?: string }[]
}

export type Step = {
  title: string
  body: Sourced
  /** optional duration or timing label on timelines */
  meta?: string
}

export type Closing = { heading: string; lede: string }

export type BaseContent = {
  /**
   * ISO date (YYYY-MM-DD) the text of the page last changed. Shown as «Sist
   * oppdatert» and sent as dateModified and sitemap lastModified. Change it
   * only when the text changes; it is not a review date («sist faglig
   * gjennomgått», arbeidsdokument §13, comes when Olve reviews on a schedule).
   */
  updated: string
  /** first paragraph; carries the head keyword of the page */
  intro: Sourced
  faqs: Faq[]
  /** slugs of related pages (nested slugs allowed) */
  related: string[]
  closing: Closing
}

/**
 * Which 113 box a page carries: the dizziness/stroke signs (default) or the
 * acute head injury signs (legevakt and 113), for /hjernerystelse.
 */
export type SafetyTopic = 'svimmelhet' | 'hjernerystelse'

/** The outbound card to a sister site (site.sister), e.g. krystallsyken.no. */
export type SisterLink = { site: 'krystallsyken'; heading: string; body: Sourced }

type ArticleContent = BaseContent & {
  /** the 113 box (id «akutt»); required on svimmelhet, hjernerystelse and krystallsyke */
  safety: boolean
  /** which signs the 113 box lists; default 'svimmelhet' */
  safetyTopic?: SafetyTopic
  /** a photo beside the hero text (desktop) */
  heroPhoto?: PhotoName
  sections: Section[]
  /** the equipment list from site.practitioner.equipment, after the sections */
  showEquipment?: boolean
  /** an outbound card to a sister site, after the sections */
  sister?: SisterLink
}

export type InfoContent = ArticleContent & { kind: 'info' }

export type HubContent = ArticleContent & { kind: 'hub' }

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
  /** ISO date, as on BaseContent */
  updated: string
  intro: Sourced
  sections: Section[]
}

/**
 * One of the two equal main entrances on the home page (arbeidsdokument §1:
 * svimmelhet and hjernerystelse are «to likeverdige hovedinnganger»). The text
 * is §4 in full: `lede` is the first paragraph (what the reader recognises),
 * `body` the rest. `quote` is one sentence of that text lifted out and set
 * large, as a pull line.
 */
export type HomeDoor = {
  id: string
  heading: string
  lede: Sourced
  quote?: Sourced
  body: Sourced[]
  link: { href: string; label: string }
}

/** A titled block of the home page with an optional link («Les mer»). */
export type HomeBlock = {
  id: string
  heading: string
  /** a second line under the heading (the part after the dash in the document) */
  subheading?: string
  body: Sourced[]
  link?: { href: string; label: string }
}

/**
 * The home page (/). The
 * H1 and eyebrow live in the route registry. Every text block is
 * arbeidsdokument §4 in full; the practical block and the FAQ only say what
 * the page itself answers. Photo choice is a design decision of each
 * template; the captions live here so the copy rules (no dashes, banned
 * words) cover them.
 */
export type HomeContent = {
  kind: 'home'
  /** ISO date, as on BaseContent */
  updated: string
  hero: {
    /** the ingress under the H1, one or two paragraphs */
    lede: Sourced[]
    /** the button beside «Bestill time» */
    secondary: { label: string; href: string }
  }
  /** Olve's own core sentence (arbeidsdokument §2), the centrepiece of the home page */
  motto: Sourced
  /** svimmelhet og balanse, then plager etter hjernerystelse */
  doors: [HomeDoor, HomeDoor]
  /** «Også vanlig kiropraktikk» */
  general: HomeBlock
  /** «En grundig undersøkelse», flere vinduer inn i nervesystemet */
  examination: HomeBlock
  /** «Gråsonen mellom syk og frisk», the one dark band */
  greyZone: HomeBlock
  /** «Om meg»: `body` is his story, `promise` the closing paragraph in his voice */
  about: HomeBlock & { promise: Sourced }
  /** «Klar for å ta kontakt?» */
  closing: Closing & {
    /** the second button: the intensive stay is not booked online (§7) */
    secondary: { label: string; href: string }
  }
  /** heading and short practical lines over the location card */
  practical: { heading: string; lede: string; items: Sourced[] }
  faqs: Faq[]
  /** captions for the clinic's own photos, by photo name */
  captions: Partial<Record<PhotoName, string>>
}

export type PageContent =
  | HomeContent
  | InfoContent
  | HubContent
  | LandingContent
  | PractitionerContent
  | ContactContent
  | PrivacyContent
