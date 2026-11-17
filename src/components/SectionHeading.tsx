import RichText from '@/components/RichText'
import { cn } from '@/lib/utils'

/**
 * House section header: a sentence-case kicker (the category, never a
 * heading element), the display title and a calm lede. `as="h1"` for page
 * heroes. Always left aligned; the reading column sets the width.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  tone = 'light',
  as: Tag = 'h2',
  className,
  id,
}: {
  eyebrow?: string
  title: string
  lede?: string
  align?: 'center' | 'left'
  tone?: 'light' | 'dark'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  id?: string
}) {
  const dark = tone === 'dark'
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && (
        <p className={cn('eyebrow eyebrow-mark mb-3', dark && 'text-fjord-200')}>{eyebrow}</p>
      )}
      <Tag
        id={id}
        className={cn(
          Tag === 'h1'
            ? 'text-display-lg md:text-display-xl'
            : 'text-display-md md:text-display-lg',
          'scroll-mt-28',
          dark ? 'text-white' : 'text-foreground',
        )}
      >
        <RichText text={title} />
      </Tag>
      {lede && (
        <p
          className={cn(
            'mt-4 max-w-prose text-lg leading-relaxed',
            dark ? 'text-white/75' : 'text-muted-foreground',
          )}
        >
          <RichText text={lede} />
        </p>
      )}
    </div>
  )
}
