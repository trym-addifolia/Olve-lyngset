import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { type AccentName, ACCENTS } from '@/components/home/accent'
import { cn } from '@/lib/utils'

/**
 * The home page's «read more» link: petrol text, underlined in the
 * direction's accent, a small arrow that moves on hover. The tap area is at
 * least 44 px high.
 */
export default function TextLink({
  href,
  children,
  accent,
  tone = 'light',
  className,
}: {
  href: string
  children: React.ReactNode
  accent: AccentName
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex min-h-[44px] items-center gap-2 text-[1.0625rem] font-semibold underline decoration-2 underline-offset-[6px] transition-colors',
        tone === 'dark'
          ? 'text-white decoration-white/40 hover:decoration-white'
          : cn('text-fjord-700 hover:text-fjord-900', ACCENTS[accent].underline),
        className,
      )}
    >
      {children}
      <ArrowRight
        className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  )
}
