import RichText from '@/components/RichText'
import { ACCENT } from '@/components/home/accent'
import { cn } from '@/lib/utils'

/**
 * House section header: a short ochre bar (the mark shared with the home
 * page), the display title and a calm lede. `as="h1"` for page heroes.
 * Always left aligned; the reading column sets the width. `mark={false}`
 * drops the bar where a heading sits inside another marked block.
 */
export default function SectionHeading({
  title,
  lede,
  mark = true,
  as: Tag = 'h2',
  className,
  id,
}: {
  title: string
  lede?: string
  mark?: boolean
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  id?: string
}) {
  return (
    <div className={cn('reveal max-w-3xl text-left', className)}>
      {mark && <span aria-hidden="true" className={cn('mb-6 block h-[3px] w-14', ACCENT.mark)} />}
      <Tag
        id={id}
        className={cn(
          Tag === 'h1'
            ? 'text-display-lg tracking-[-0.02em] md:text-display-xl'
            : 'text-display-md md:text-display-lg',
          'scroll-mt-28 hyphens-auto text-foreground',
        )}
      >
        <RichText text={title} />
      </Tag>
      {lede && (
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-foreground/85">
          <RichText text={lede} />
        </p>
      )}
    </div>
  )
}
