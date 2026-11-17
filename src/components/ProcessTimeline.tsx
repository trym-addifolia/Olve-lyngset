import type { Step } from '@content/types'
import RichText from '@/components/RichText'

/**
 * Steps in the order they happen (the intensive stay, a first visit). The
 * content is a real sequence, so the number is the structural device: a
 * large serif numeral in the margin, a rule between steps. `numbered={false}`
 * swaps the numeral for a small petrol rhombus when the order is loose.
 */
export default function ProcessTimeline({
  steps,
  numbered = true,
}: { steps: Step[]; numbered?: boolean }) {
  if (!steps.length) return null
  return (
    <ol className="border-t border-border">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-b border-border py-6 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-x-6 md:py-8"
        >
          <span
            aria-hidden="true"
            className="font-serif text-[2.25rem] leading-none text-fjord-700 md:text-[2.75rem]"
          >
            {numbered ? (
              i + 1
            ) : (
              <span className="mt-2 inline-block h-2.5 w-2.5 rotate-45 bg-fjord-500" />
            )}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-sans text-[1.1875rem] font-semibold leading-snug text-foreground">
                {step.title}
              </h3>
              {step.meta && <span className="text-sm text-muted-foreground">{step.meta}</span>}
            </div>
            <p className="mt-2 max-w-prose text-[1.0625rem] leading-[1.65] text-foreground/90">
              <RichText text={step.body.text} />
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
