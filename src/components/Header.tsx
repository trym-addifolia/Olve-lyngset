'use client'

import ReadingProgress from '@/components/ReadingProgress'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { cn } from '@/lib/utils'
import { NAV_MAIN, ROUTES, pathOf } from '@/routes'
import { site } from '@/site.config'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

/*
 * Sticky header: a plain serif wordmark (Olve's name and «Kiropraktor, DACNB
 * · Lillestrøm»), the main navigation from the routes registry, and one
 * «Bestill time» that goes straight to the counted booking link. Seven menu
 * items need the width of xl; below that they sit behind the menu button.
 */
/** pages read top to bottom get a reading progress bar under the header */
const ARTICLE_TEMPLATES = new Set(['info', 'landing', 'hub'])

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const current = (() => {
    try {
      return decodeURIComponent(pathname)
    } catch {
      return pathname
    }
  })()

  // a section is active on its own page and on the pages under it (/svimmelhet/krystallsyke)
  const isActive = (path: string) =>
    path === '/' ? current === '/' : current === path || current.startsWith(`${path}/`)
  const isArticle = ROUTES.some((r) => ARTICLE_TEMPLATES.has(r.template) && pathOf(r) === current)

  const linkClass = (active: boolean) =>
    cn(
      'rounded px-2.5 py-2 text-[0.9375rem] font-medium transition-colors',
      active
        ? 'text-fjord-800 underline decoration-fjord-700 decoration-2 underline-offset-[10px]'
        : 'text-foreground/75 hover:text-foreground',
    )

  const menuButton = (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="rounded p-2 text-foreground xl:hidden"
      aria-expanded={open}
      aria-controls="mobilmeny"
      aria-label={open ? 'Lukk meny' : 'Åpne meny'}
    >
      {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Link href="/" className="min-w-0" onClick={() => setOpen(false)}>
            <span className="block truncate font-serif text-[1.375rem] font-medium leading-none text-foreground sm:text-2xl">
              {site.brand.name}
            </span>
            <span className="mt-1.5 block truncate text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.16em] text-fjord-600">
              {site.brand.tagline}
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Hovedmeny">
            {NAV_MAIN.map((r) => (
              <Link key={r.slug} href={pathOf(r)} className={linkClass(isActive(pathOf(r)))}>
                {r.navLabel}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="hidden md:inline-flex">
              <a href={bookingHref('meny')}>Bestill time</a>
            </Button>
            {menuButton}
          </div>
        </div>

        {open && (
          <div id="mobilmeny" className="border-t border-border pb-5 xl:hidden">
            <nav className="grid gap-0.5 pt-3 sm:grid-cols-2" aria-label="Mobilmeny">
              {NAV_MAIN.map((r) => (
                <Link
                  key={r.slug}
                  href={pathOf(r)}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded px-3 py-2.5 text-base font-medium',
                    isActive(pathOf(r))
                      ? 'bg-secondary text-foreground'
                      : 'text-foreground/80 hover:bg-secondary/60 hover:text-foreground',
                  )}
                >
                  {r.navLabel}
                </Link>
              ))}
            </nav>
            <div className="mt-4 border-t border-border px-3 pt-4 md:hidden">
              <Button asChild className="w-full">
                <a href={bookingHref('meny')} onClick={() => setOpen(false)}>
                  Bestill time
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
      {isArticle && <ReadingProgress />}
    </header>
  )
}
