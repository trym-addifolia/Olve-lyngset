import { Phone } from 'lucide-react'
import Link from 'next/link'
import { SAFETY_ROUTE, pathOf } from '@/routes'
import { cn } from '@/lib/utils'

/*
 * The 113 box. Mandatory on every info page and on the home page. Generic
 * wording from helsenorge.no's stroke and dizziness guidance; a later round may
 * sharpen it with a source, never soften it. Red is used nowhere else on
 * the site, so the bar alone says "emergency". One flat surface: a red
 * edge, a heading, four short signs, one line for the unsure, one link.
 * Olve, comment #14 2026-11-16: the unsure should also call 113, not the
 * legevakt (116 117); helsenorge says the same for suspected stroke.
 */
// Inline in a sentence: vertical padding on an inline box widens the tap
// area to about 44 px without changing the line height.
const TEL_LINK =
  'py-3 font-semibold text-foreground underline decoration-2 underline-offset-4 hover:decoration-destructive'

const SIGNS = [
  'lammelse, skjevt ansikt eller talevansker',
  'dobbeltsyn, synstap eller plutselig kraftig hodepine',
  'nummenhet eller svakhet i arm eller bein',
  'brystsmerter, hjertebank eller besvimelse',
]

export default function SafetyBox({
  variant = 'full',
  className,
  headingId = 'ring-113-heading',
}: {
  variant?: 'full' | 'compact'
  className?: string
  /** unique per page when a second copy sits in a viewport-specific slot */
  headingId?: string
}) {
  return (
    <aside
      aria-labelledby={headingId}
      className={cn(
        'rounded-r-lg border-l-4 border-destructive bg-card',
        variant === 'full' ? 'px-5 py-5 md:px-7 md:py-6' : 'px-5 py-5',
        className,
      )}
    >
      <p id={headingId} className="font-serif text-xl font-medium leading-snug text-foreground">
        Ring{' '}
        <a href="tel:113" className={TEL_LINK}>
          113
        </a>{' '}
        hvis svimmelheten kommer sammen med:
      </p>
      <ul className="mt-3 space-y-1.5 text-base leading-snug text-foreground/90">
        {SIGNS.map((s) => (
          <li key={s} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-destructive"
            />
            {s}
          </li>
        ))}
      </ul>
      <a
        href="tel:113"
        className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-md bg-destructive px-5 text-base font-semibold text-white hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:hidden"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        Ring 113
      </a>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-foreground/80">
        Er du usikker, ring også{' '}
        <a href="tel:113" className={TEL_LINK}>
          113
        </a>
        . Det er bedre å ringe én gang for mye.{' '}
        <Link
          href={pathOf(SAFETY_ROUTE)}
          className="font-medium text-fjord-700 underline decoration-fjord-300 underline-offset-4 hover:decoration-fjord-700"
        >
          Les mer om når svimmelhet er farlig
        </Link>
      </p>
    </aside>
  )
}
