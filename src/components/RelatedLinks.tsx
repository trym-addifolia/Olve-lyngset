import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'
import { ROUTES, pathOf } from '@/routes'

/** "Les videre": related pages as white plates, resolved from the routes registry. */
export default function RelatedLinks({
  slugs,
  title = 'Les videre',
}: { slugs: string[]; title?: string }) {
  const routes = slugs.map((s) => ROUTES.find((r) => r.slug === s)).filter((r) => r !== undefined)
  if (!routes.length) return null
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={title} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {routes.map((r) => (
            <li key={r.slug} className="reveal flex">
              <Link
                href={pathOf(r)}
                className="group flex w-full flex-col bg-card p-6 transition-colors hover:bg-fjord-50 sm:p-8"
              >
                <h3 className="font-serif text-[1.5rem] leading-snug text-foreground group-hover:text-fjord-800">
                  {r.h1}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/85">{r.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-base font-semibold text-fjord-700">
                  Les mer
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
