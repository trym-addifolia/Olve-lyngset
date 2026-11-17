import type { Faq } from '@content/types'
import { Plus } from 'lucide-react'
import RichText from '@/components/RichText'
import JsonLd from '@/components/seo/JsonLd'
import { faqSchema } from '@/lib/schema'

/**
 * Visible FAQ accordion + FAQPage JSON-LD built from the SAME array, so the
 * schema can never say something the page does not. Questions are H3 in the
 * patient's words; answers lead with the answer (40 to 60 words). Rows are
 * separated by rules; the plus turns into a cross when open.
 * `schema={false}` when the page emits one FAQPage for several groups.
 */
export default function FaqAccordion({
  faqs,
  path,
  schema = true,
}: {
  faqs: Faq[]
  path?: string
  schema?: boolean
}) {
  if (!faqs.length) return null
  return (
    <div className="border-t border-border">
      {faqs.map((faq) => (
        <details key={faq.question} className="group border-b border-border">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden md:py-5">
            <h3 className="font-sans text-[1.0625rem] font-semibold leading-snug text-foreground group-hover:text-fjord-800 md:text-lg">
              <RichText text={faq.question} />
            </h3>
            <Plus
              className="mt-0.5 h-5 w-5 shrink-0 text-fjord-700 transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="max-w-prose pb-5 leading-relaxed text-foreground/85">
            <RichText text={faq.answer} />
          </p>
        </details>
      ))}
      {schema && <JsonLd data={faqSchema(faqs, path)} />}
    </div>
  )
}
