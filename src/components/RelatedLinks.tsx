import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'
import { ROUTES, pathOf } from '@/routes'

/** "Les videre": related pages, resolved from the routes registry. */
export default function RelatedLinks({
  slugs,
  title = 'Les videre',
}: { slugs: string[]; title?: string }) {
  const routes = slugs.map((s) => ROUTES.find((r) => r.slug === s)).filter((r) => r !== undefined)
  if (!routes.length) return null
  return (
    <section className="border-t border-border py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Se også" title={title} />
        <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((r) => (
            <li key={r.slug} className="border-t border-border pt-5">
              <Link href={pathOf(r)} className="group block">
                <span className="eyebrow text-sm">{r.eyebrow}</span>
                <h3 className="mt-1 font-serif text-[1.375rem] leading-snug text-foreground group-hover:text-fjord-800">
                  {r.h1}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {r.description}
                </p>
                <span className="mt-3 inline-block text-sm font-semibold text-fjord-700 underline decoration-fjord-300 underline-offset-4 group-hover:decoration-fjord-700">
                  Les mer
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
