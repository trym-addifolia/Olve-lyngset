/*
 * The two home directions differ in one accent: moss for A («To dører»),
 * ochre for B («Det er hjelp å få»). The accent is a mark, never a field or a
 * button: short rules, the rhombus before a kicker, link underlines, a tint
 * plate. Buttons stay petrol (fjord), as on krystallsyken.no.
 *
 * Contrast (WCAG, measured on the hex scales in site.config.ts):
 *   text on paper  moss-700 7.8:1, ochre-700 6.2:1
 *   text on ink    moss-300 6.7:1, ochre-300 7.4:1
 *   marks on paper moss-600 5.8:1, ochre-600 4.3:1 (non-text, 3:1 needed)
 * Class names are written out in full so Tailwind can find them.
 */
export type AccentName = 'moss' | 'ochre'

export type Accent = {
  /** small text in the accent on paper (kickers, attributions) */
  text: string
  /** small text in the accent on the ink band */
  textOnDark: string
  /** filled marks (rhombus, short bars) on paper */
  mark: string
  /** filled marks on the ink band */
  markOnDark: string
  /** a heavier top rule on paper */
  rule: string
  /** link underline colour and its hover */
  underline: string
  /** a pale plate in the accent, with its text colour */
  plate: string
  plateText: string
}

export const ACCENTS: Record<AccentName, Accent> = {
  moss: {
    text: 'text-moss-700',
    textOnDark: 'text-moss-300',
    mark: 'bg-moss-600',
    markOnDark: 'bg-moss-400',
    rule: 'border-moss-600',
    underline: 'decoration-moss-500 hover:decoration-moss-800',
    plate: 'bg-moss-100',
    plateText: 'text-moss-900',
  },
  ochre: {
    text: 'text-ochre-700',
    textOnDark: 'text-ochre-300',
    mark: 'bg-ochre-600',
    markOnDark: 'bg-ochre-400',
    rule: 'border-ochre-600',
    underline: 'decoration-ochre-500 hover:decoration-ochre-800',
    plate: 'bg-ochre-100',
    plateText: 'text-ochre-900',
  },
}
