/**
 * Content model. Every string that a reader sees lives in content/, never in src/.
 * A paragraph (Para) may hold a fakta token (prints the value) and a bekreft token
 * (guards the paragraph). If any fact in a paragraph is unconfirmed, the whole
 * paragraph is left out of the normal view and shown with a mark under ?utkast=1.
 */
export type Para = string

export type PhotoName =
  | 'portrett'
  | 'nakken'
  | 'videobriller'
  | 'vogPasient'
  | 'vogProfil'
  | 'fotograf'
  | 'utklipp'
export type DrawingName =
  | 'horisont'
  | 'briller'
  | 'butikk'
  | 'gynge'
  | 'balanse'
  | 'syklus'
  | 'sakkade'
  | 'grasone'
  | 'dagen'

export type Visual =
  | {
      type: 'photo'
      name: PhotoName
      caption: Para
      /** a second, small photo set into the corner of the first (the goggles and what they film) */
      inset?: PhotoName
    }
  | { type: 'drawing'; name: DrawingName; caption: Para }

export type Link = { label: string; href: string }

export type PickerItem = {
  label: string
  short: string
  hint?: Para
  href: string
  major?: boolean
  external?: boolean
}

export type EmergencyLine = { variant: 'dizziness' | 'headInjury'; text: Para; callLabel: string }

export type Pane = { drawing: DrawingName; name: string; hint: Para; anchor?: string }

export type Block =
  | {
      kind: 'emergency'
      heading: string
      body: Para[]
      callLabel: string
      source: Link
      extraSources?: Link[]
    }
  | {
      kind: 'text'
      id?: string
      heading: string
      /** his own sentence, set large with a bar (method hub) */
      quote?: Para
      body: Para[]
      list?: Para[]
      visual?: Visual
      link?: Link
    }
  | {
      kind: 'entries'
      heading: string
      items: { heading: string; body: Para[]; link: Link; visual?: Visual }[]
    }
  | {
      kind: 'conditions'
      heading: string
      intro: Para[]
      visual?: Visual
      items: { name: string; hint: Para; href: string; external?: boolean }[]
    }
  | { kind: 'faq' }
  | { kind: 'profile'; heading: string; body: Para[]; link?: Link }
  | {
      kind: 'windows'
      id?: string
      statement?: Para
      heading: string
      body: Para[]
      photo?: Visual
      panes: Pane[]
      closing?: Para
      link?: Link
    }
  | {
      kind: 'round'
      id?: string
      heading: string
      body: Para[]
      steps: { name: string; text: Para }[]
      goalsHeading?: string
      goals?: Para[]
      closing?: Para
    }
  | {
      kind: 'rows'
      id?: string
      heading: string
      link?: Link
      rows: { label: string; value: Para }[]
      visual?: Visual
      note?: Para[]
    }
  | {
      kind: 'next'
      id?: string
      heading: string
      steps: Para[]
      body: Para[]
      /** primary button; omit for phone only (the stay is not bookable online) */
      primary?: Link
      phone: boolean
      secondary?: Link
      note?: Para
    }
  | {
      kind: 'siblings'
      heading: string
      items: { name: string; hint: Para; href: string; drawing?: DrawingName }[]
    }
  | {
      /** closing line with both buttons */
      kind: 'closing'
      heading: string
      body: Para[]
      primary?: Link
      phone: boolean
      link?: Link
      visual?: Visual
    }

export type Faq = { question: string; answer: Para[] }

export type SchemaKind = 'home' | 'condition' | 'service' | 'about' | 'contact' | 'page'

export type Page = {
  /** '' is the home page */
  slug: string
  navLabel: string
  title: string
  description: string
  h1: string
  /** short line above the H1 */
  kicker?: string
  /** slug of the parent page (breadcrumbs, siblings) */
  parent?: string
  /** home only: the one supporting line under the H1, a whole sentence taken from the lede */
  support?: string
  /** the answer first paragraph, 40 to 60 words; later paragraphs follow it in the hero */
  lede: Para[]
  /** compact 113 line in the hero, before any booking button */
  emergencyLine?: EmergencyLine
  /** hero buttons: primary is a booking link or phone; phone adds «Ring ...» */
  heroCtas?: { primary?: Link; phone?: boolean; secondary?: Link }
  /** show the trust chips under the hero buttons */
  chips?: boolean
  /** home only: the complaint picker inside the hero */
  picker?: { heading: string; ask: string; items: PickerItem[] }
  /** drawing plate under the hero (condition subpages) or the portrait on «om» */
  heroVisual?: Visual
  blocks: Block[]
  faqs?: Faq[]
  schema: SchemaKind
  /** MedicalCondition entries for condition pages (name, alternate name, anchor on the page) */
  conditions?: { name: string; alternateName?: string; anchor?: string }[]
}
