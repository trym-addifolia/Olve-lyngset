/*
 * The home page's one accent: ochre. It is a mark, never a field or a button:
 * short bars, the rhombus before the open-now line, link underlines. Buttons
 * stay petrol (fjord), as on krystallsyken.no.
 *
 * Contrast (WCAG, measured on the hex scale in site.config.ts):
 *   text on paper  ochre-700 6.2:1
 *   text on ink    ochre-300 7.4:1
 *   marks on paper ochre-600 4.3:1 (non-text, 3:1 needed)
 * Class names are written out in full so Tailwind can find them.
 */
export const ACCENT = {
  /** small text in the accent on paper (attributions) */
  text: 'text-ochre-700',
  /** filled marks (rhombus, short bars) on paper */
  mark: 'bg-ochre-600',
  /** filled marks on the ink band */
  markOnDark: 'bg-ochre-400',
  /** link underline colour and its hover */
  underline: 'decoration-ochre-500 hover:decoration-ochre-800',
} as const
