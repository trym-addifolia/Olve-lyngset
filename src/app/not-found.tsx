import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NAV_MAIN, pathOf } from '@/routes'

/** 404: say so plainly, then the pages as a short index (rules between rows, no cards). */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="eyebrow mb-3">404</p>
      <h1 className="text-display-lg md:text-display-xl">Siden finnes ikke</h1>
      <p className="mt-4 max-w-prose text-lg text-muted-foreground">
        Lenken kan være gammel. Her er sidene på nettstedet, eller gå til forsiden.
      </p>
      <div className="mt-6">
        <Button asChild>
          <Link href="/">Til forsiden</Link>
        </Button>
      </div>
      <ul className="mt-12 grid border-t border-border sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
        {NAV_MAIN.map((r) => (
          <li key={r.slug} className="border-b border-border">
            <Link href={pathOf(r)} className="group block py-4 md:py-5">
              <span className="block font-serif text-[1.25rem] leading-snug text-foreground group-hover:text-fjord-800">
                {r.h1}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{r.navLabel}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
