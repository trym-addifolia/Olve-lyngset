import type { SisterLink } from '@content/types'
import { ArrowUpRight } from 'lucide-react'
import RichText from '@/components/RichText'
import { site } from '@/site.config'

/**
 * The outbound card to a sister site («Les mer på krystallsyken.no»). The
 * orange krystall accent lives here and nowhere else on the site: it is the
 * colour of krystallsyken.no, so the reader sees where the link goes.
 */
export default function SisterSiteCard({ link }: { link: SisterLink }) {
  const target = site.sister[link.site]
  return (
    <aside
      aria-labelledby="sister-heading"
      className="rounded-r-lg border-l-4 border-krystall bg-krystall-50 px-5 py-6 md:px-7 md:py-7"
    >
      <p className="eyebrow mb-2 text-krystall-700">Søstersiden</p>
      <h2 id="sister-heading" className="text-display-sm md:text-display-md">
        {link.heading}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-foreground/85 md:text-lg">
        <RichText text={link.body.text} />
      </p>
      <a
        href={target.url}
        className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-md bg-krystall-700 px-5 text-base font-semibold text-white hover:bg-krystall-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Gå til {target.label}
        <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
      </a>
    </aside>
  )
}
