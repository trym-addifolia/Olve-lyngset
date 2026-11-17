import Link from 'next/link'
import { NAV_FAG, pathOf } from '@/routes'

/**
 * "Alt om krystallsyke": the condition pages as an index. Rules between
 * rows, three columns on wide screens; it is a directory, not a set of
 * products, so no cards.
 */
export default function ConditionGrid() {
  return (
    <ul className="grid border-t border-border sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
      {NAV_FAG.map((r) => (
        <li key={r.slug} className="border-b border-border">
          <Link
            href={pathOf(r)}
            className="group block py-4 transition-colors hover:text-fjord-700 md:py-5"
          >
            <span className="block font-serif text-[1.25rem] leading-snug text-foreground group-hover:text-fjord-800">
              {r.h1}
            </span>
            <span className="mt-1 block text-sm text-muted-foreground">{r.navLabel}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
