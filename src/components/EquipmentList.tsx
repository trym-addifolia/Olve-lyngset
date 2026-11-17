import RichText from '@/components/RichText'
import { site } from '@/site.config'

import { cn } from '@/lib/utils'

/** Concrete equipment from site.config.ts; a lawful advantage instead of superlatives. */
export default function EquipmentList({ columns = 2 }: { columns?: 1 | 2 | 3 }) {
  return (
    <ul
      className={cn(
        'grid gap-x-10 gap-y-6',
        columns === 2 && 'sm:grid-cols-2',
        columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
      )}
    >
      {site.practitioner.equipment.map((e) => {
        return (
          <li key={e.name} className="border-t border-border pt-5">
            <span className="flex items-baseline gap-3 font-sans text-[1.0625rem] font-semibold text-foreground">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 shrink-0 -translate-y-0.5 rotate-45 bg-krystall-500"
              />
              {e.name}
            </span>
            <span className="mt-1 block pl-5 text-base leading-relaxed text-foreground/80">
              <RichText text={e.description} />
            </span>
          </li>
        )
      })}
    </ul>
  )
}
