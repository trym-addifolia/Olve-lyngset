import type { Faq } from '@content/types'
import FaqAccordion from '@/components/FaqAccordion'
import { type AccentName, ACCENTS } from '@/components/home/accent'
import { cn } from '@/lib/utils'

/**
 * The home FAQ: a heading column and the accordion beside it. Only questions
 * the page itself answers. `schema` off on the preview direction, so the
 * FAQPage data is emitted once, by the indexed home page.
 */
export default function HomeFaq({
  faqs,
  accent,
  path,
  schema = true,
}: {
  faqs: Faq[]
  accent: AccentName
  path: string
  schema?: boolean
}) {
  if (!faqs.length) return null
  return (
    <section aria-labelledby="sporsmal-heading" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20 lg:px-8">
        <div>
          <span aria-hidden="true" className={cn('block h-[3px] w-12', ACCENTS[accent].mark)} />
          <h2 id="sporsmal-heading" className="mt-6 text-display-md text-foreground">
            Vanlige spørsmål
          </h2>
        </div>
        <FaqAccordion faqs={faqs} path={path} schema={schema} />
      </div>
    </section>
  )
}
