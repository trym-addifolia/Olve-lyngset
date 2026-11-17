import { PositionFigure } from '@content/positions'
import type { Step } from '@content/types'
import Image from 'next/image'
import RailObserver from '@/components/RailObserver'
import RichText from '@/components/RichText'

/**
 * Steps in the order they happen: "Slik foregår timen" on home, the
 * treatment timeline on landing pages, the exercise steps (with optional
 * illustration). The content is a real sequence, so the number is the
 * structural device: a large serif numeral in the margin, a rule between.
 *
 * `rail` (the Epley steps): a thin line runs down the number column, and a
 * cluster of three crystals moves one step down it each time the next step
 * reaches the middle of the screen, ending in a pocket marked «dit
 * manøveren skal føre krystallene». A schematic: equal steps on the rail
 * are not equal distances in the canal. At rest (no JavaScript, reduced
 * motion) the line is empty and the three crystals lie in the pocket.
 */
const RAIL_ID = 'krystallskinne'

function Cluster({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`flex flex-col items-center gap-[3px] ${className}`}>
      {[0, 1, 2].map((k) => (
        <span key={k} className="block h-[7px] w-[7px] rotate-45 bg-krystall-500" />
      ))}
    </span>
  )
}

export default function ProcessTimeline({
  steps,
  numbered = true,
  rail = false,
}: { steps: Step[]; numbered?: boolean; rail?: boolean }) {
  return (
    <>
      <ol className="border-t border-border" id={rail ? RAIL_ID : undefined}>
        {steps.map((step, i) => (
          <li
            key={step.title}
            className={`${rail ? 'relative ' : ''}grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-b border-border py-6 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-x-6 md:py-8`}
          >
            {rail && (
              <>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-[0.6rem] top-[4.5rem] w-0.5 bg-fjord-200 md:top-[5.25rem]"
                />
                <span className="skinne-klynge absolute bottom-0 left-[calc(0.6rem-4px)] top-[4.5rem] w-[10px] md:top-[5.25rem]">
                  <Cluster />
                </span>
              </>
            )}
            <span
              aria-hidden="true"
              className="font-serif text-[2.25rem] leading-none text-fjord-700 md:text-[2.75rem]"
            >
              {numbered ? (
                i + 1
              ) : (
                <span className="mt-2 inline-block h-2.5 w-2.5 rotate-45 bg-krystall-500" />
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
              {step.figure && <PositionFigure {...step.figure} />}
              {step.image && (
                <figure className="mt-5 overflow-hidden rounded-lg bg-mist">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={step.image.src}
                      alt={step.image.alt}
                      fill
                      className="object-contain"
                      sizes="(min-width: 768px) 640px, 100vw"
                    />
                  </div>
                </figure>
              )}
            </div>
          </li>
        ))}
      </ol>
      {rail && (
        <>
          <div className="flex items-center gap-4 pt-4">
            <span className="grid h-12 w-[1.75rem] place-items-center rounded-full border-2 border-fjord-200">
              <Cluster className="lomme-krystaller" />
            </span>
            <span className="text-[0.9375rem] leading-snug text-muted-foreground">
              Dit manøveren skal føre krystallene, tilbake dit de hører hjemme.
            </span>
          </div>
          <RailObserver id={RAIL_ID} />
        </>
      )}
    </>
  )
}
