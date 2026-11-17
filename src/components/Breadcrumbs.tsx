import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'

export type Crumb = { name: string; path: string }

/** Visible breadcrumb trail + BreadcrumbList JSON-LD from the same items. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brødsmulesti">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-foreground">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="transition-colors hover:text-fjord-700">
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="text-border">
                    /
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
      <JsonLd data={breadcrumbSchema(items)} />
    </nav>
  )
}

export function BreadcrumbBar({ items }: { items: Crumb[] }) {
  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <Breadcrumbs items={items} />
      </div>
    </div>
  )
}
