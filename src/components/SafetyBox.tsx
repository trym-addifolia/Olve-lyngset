import type { SafetyTopic } from '@content/types'
import { Phone } from 'lucide-react'
import Link from 'next/link'
import { SAFETY_HREF } from '@/routes'
import { cn } from '@/lib/utils'

/*
 * The 113 box. Mandatory on the svimmelhet, hjernerystelse and krystallsyke
 * pages (content `safety`), before any booking talk. Generic
 * wording from helsenorge.no's stroke and dizziness guidance; a later round may
 * sharpen it with a source, never soften it. Red is used nowhere else on
 * the site, so the bar alone says "emergency". One flat surface: a red
 * edge, a heading, four short signs, one line for the unsure, one link.
 * Olve, comment #14 2026-11-16: the unsure should also call 113, not the
 * legevakt (116 117); helsenorge says the same for suspected stroke.
 *
 * `topic` picks the signs. 'svimmelhet' (default) is the dizziness/stroke box.
 * 'hjernerystelse' is the acute head injury box (helsenorge.no, hodeskader):
 * danger signs after a blow to the head call for 113; the unsure who have just
 * hit their head call the legevakt. The page itself is about complaints that
 * last, so the box says it is not about the acute injury.
 */
// Inline in a sentence: vertical padding on an inline box widens the tap
// area to about 44 px without changing the line height.
const TEL_LINK =
  'py-3 font-semibold text-foreground underline decoration-2 underline-offset-4 hover:decoration-destructive'

const TOPICS: Record<SafetyTopic, { lead: string; signs: string[] }> = {
  svimmelhet: {
    lead: 'hvis svimmelheten kommer sammen med:',
    signs: [
      'lammelse, skjevt ansikt eller talevansker',
      'dobbeltsyn, synstap eller plutselig kraftig hodepine',
      'nummenhet eller svakhet i arm eller bein',
      'brystsmerter, hjertebank eller besvimelse',
    ],
  },
  hjernerystelse: {
    lead: 'hvis du etter et slag mot hodet får:',
    signs: [
      'bevisstløshet, kramper eller økende døsighet',
      'hodepine som tiltar, eller gjentatte oppkast',
      'forvirring, talevansker, lammelse eller nummenhet',
      'ulike store pupiller, eller blod eller klar væske fra nese eller øre',
    ],
  },
}

export default function SafetyBox({
  variant = 'full',
  topic = 'svimmelhet',
  title,
  className,
  headingId = 'ring-113-heading',
  moreLink = true,
}: {
  variant?: 'full' | 'compact'
  /** which signs the box lists; default the dizziness/stroke box */
  topic?: SafetyTopic
  /** an optional H2 above the box text, e.g. «Når svimmelhet må vurderes raskt» */
  title?: string
  className?: string
  /** unique per page when a second copy sits in a viewport-specific slot */
  headingId?: string
  /** the link to the full advice; off on the page that holds it (/svimmelhet#akutt) */
  moreLink?: boolean
}) {
  const { lead, signs } = TOPICS[topic]
  return (
    <aside
      aria-labelledby={headingId}
      className={cn(
        'rounded-r-lg border-l-4 border-destructive bg-card',
        variant === 'full' ? 'px-5 py-5 md:px-7 md:py-6' : 'px-5 py-5',
        className,
      )}
    >
      {title && <h2 className="mb-3 text-display-sm">{title}</h2>}
      <p id={headingId} className="font-serif text-xl font-medium leading-snug text-foreground">
        Ring{' '}
        <a href="tel:113" className={TEL_LINK}>
          113
        </a>{' '}
        {lead}
      </p>
      <ul className="mt-3 space-y-1.5 text-base leading-snug text-foreground/90">
        {signs.map((s) => (
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
      {topic === 'hjernerystelse' ? (
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-foreground/80">
          Har du nylig slått hodet og er usikker, ring legevakten på{' '}
          <a href="tel:116117" className={TEL_LINK}>
            116 117
          </a>
          . Denne siden handler om plager som varer lenge, ikke om den akutte skaden, og den
          erstatter ikke medisinsk vurdering.
        </p>
      ) : (
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-foreground/80">
          Er du usikker, ring også{' '}
          <a href="tel:113" className={TEL_LINK}>
            113
          </a>
          . Det er bedre å ringe én gang for mye. Nettsiden erstatter ikke medisinsk vurdering.
          {moreLink && (
            <>
              {' '}
              <Link
                href={SAFETY_HREF}
                className="font-medium text-fjord-700 underline decoration-fjord-300 underline-offset-4 hover:decoration-fjord-700"
              >
                Les mer om når svimmelhet må vurderes raskt
              </Link>
            </>
          )}
        </p>
      )}
    </aside>
  )
}
