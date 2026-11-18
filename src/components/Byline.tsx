import Link from 'next/link'
import { formatDate } from '@/lib/dates'
import { cn } from '@/lib/utils'
import { PRACTITIONER_ROUTE, pathOf } from '@/routes'
import { site } from '@/site.config'

/**
 * Who wrote the page and when its text last changed (arbeidsdokument §13:
 * a named professional author on health content). The date is the content
 * file's `updated`, the same one the WebPage schema and the sitemap send.
 * `author={false}` gives the date alone, for the page about Olve himself.
 */
export default function Byline({
  updated,
  author = true,
  className,
}: { updated: string; author?: boolean; className?: string }) {
  const p = site.practitioner
  return (
    <p className={cn('text-base text-muted-foreground', className)}>
      {author && (
        <>
          Tekst:{' '}
          <Link
            href={pathOf(PRACTITIONER_ROUTE)}
            className="text-fjord-700 underline decoration-fjord-300 underline-offset-4 hover:decoration-fjord-700"
          >
            {p.name}
          </Link>
          , {p.title.toLowerCase()}, {p.dacnb.short}.{' '}
        </>
      )}
      Sist oppdatert <time dateTime={updated}>{formatDate(updated)}</time>.
    </p>
  )
}
