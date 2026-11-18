import type { Faq } from '@content/types'
import FaqAccordion from '@/components/FaqAccordion'
import { ACCENT } from '@/components/home/accent'
import { cn } from '@/lib/utils'

/**
 * The home FAQ: a heading column and the accordion beside it. Only questions
 * the page itself answers.
 */
export default function HomeFaq({ faqs, path }: { faqs: Faq[]; path: string }) {
  if (!faqs.length) return null
  return (
    <section aria-labelledby="sporsmal-heading" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="reveal lg:col-span-4">
          <span aria-hidden="true" className={cn('block h-[3px] w-14', ACCENT.mark)} />
          <h2
            id="sporsmal-heading"
            className="mt-6 text-display-md text-foreground md:text-display-lg"
          >
            Vanlige spørsmål
          </h2>
        </div>
        <div className="reveal reveal-late lg:col-span-7 lg:col-start-6">
          <FaqAccordion faqs={faqs} path={path} />
        </div>
      </div>
    </section>
  )
}
