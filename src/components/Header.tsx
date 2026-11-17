'use client'

import LogoMark from '@/components/LogoMark'
import ReadingProgress from '@/components/ReadingProgress'
import { Button } from '@/components/ui/button'
import { bookingPagePath } from '@/lib/booking'
import { cn } from '@/lib/utils'
import { NAV_FAG, NAV_MAIN, ROUTES, pathOf } from '@/routes'
import { site } from '@/site.config'
import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

/*
 * Sticky header. A plain serif wordmark (no badge), the main navigation from
 * the routes registry, the condition pages under an "Alt om krystallsyke"
 * disclosure so the depth is visible without a 15-item menu bar.
 */
/** pages read top to bottom get a reading progress bar under the header */
const ARTICLE_TEMPLATES = new Set(['info', 'exercise', 'landing', 'hub', 'faq'])

export default function Header() {
  const [open, setOpen] = useState(false)
  const [fagOpen, setFagOpen] = useState(false)
  const pathname = usePathname()
  const current = (() => {
    try {
      return decodeURIComponent(pathname)
    } catch {
      return pathname
    }
  })()

  const isActive = (path: string) => (path === '/' ? current === '/' : current === path)
  const mainLinks = NAV_MAIN.filter((r) => r.template !== 'booking')
  const fagActive = NAV_FAG.some((r) => isActive(pathOf(r)))
  const isArticle = ROUTES.some((r) => ARTICLE_TEMPLATES.has(r.template) && pathOf(r) === current)

  const linkClass = (active: boolean) =>
    cn(
      'rounded px-3 py-2 text-[0.9375rem] font-medium transition-colors',
      active
        ? 'text-fjord-800 underline decoration-fjord-700 decoration-2 underline-offset-[10px]'
        : 'text-foreground/75 hover:text-foreground',
    )

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 sm:gap-3.5"
            onClick={() => setOpen(false)}
          >
            {/* the crystal carries the brand: it spans both lines and turns once on load (globals.css) */}
            <LogoMark spin className="h-10 w-auto shrink-0 sm:h-11" />
            <span className="min-w-0">
              <span className="block truncate font-serif text-[1.375rem] font-medium leading-none text-foreground sm:text-2xl">
                {site.brand.name}
              </span>
              <span className="mt-1.5 block truncate text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.16em] text-fjord-600">
                {site.brand.tagline}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Hovedmeny">
            <div
              className="relative"
              onMouseEnter={() => setFagOpen(true)}
              onMouseLeave={() => setFagOpen(false)}
            >
              <button
                type="button"
                className={cn('flex items-center gap-1', linkClass(fagActive))}
                aria-expanded={fagOpen}
                aria-controls="fagmeny"
                onClick={() => setFagOpen((v) => !v)}
              >
                Alt om krystallsyke
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
              {fagOpen && (
                <div
                  id="fagmeny"
                  className="absolute left-0 top-full z-50 mt-1 grid w-[34rem] grid-cols-2 gap-0.5 rounded-lg border border-border bg-card p-2 shadow-lg"
                >
                  {NAV_FAG.map((r) => (
                    <Link
                      key={r.slug}
                      href={pathOf(r)}
                      onClick={() => setFagOpen(false)}
                      className={cn(
                        'rounded px-3 py-2 text-[0.9375rem] transition-colors hover:bg-secondary',
                        r.nav.includes('main') && 'xl:hidden',
                        isActive(pathOf(r))
                          ? 'bg-secondary font-medium text-foreground'
                          : 'text-foreground/80',
                      )}
                    >
                      {r.navLabel}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {mainLinks.map((r) => (
              <Link
                key={r.slug}
                href={pathOf(r)}
                className={cn(
                  linkClass(isActive(pathOf(r))),
                  r.nav.includes('fag') && 'hidden xl:inline-block',
                )}
              >
                {r.navLabel}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <Button asChild>
              <Link href={bookingPagePath}>Book en time</Link>
            </Button>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="rounded p-2 text-foreground lg:hidden"
              aria-expanded={open}
              aria-controls="mobilmeny"
              aria-label={open ? 'Lukk meny' : 'Åpne meny'}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="rounded p-2 text-foreground"
              aria-expanded={open}
              aria-controls="mobilmeny"
              aria-label={open ? 'Lukk meny' : 'Åpne meny'}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div id="mobilmeny" className="border-t border-border pb-5 lg:hidden">
            <nav className="grid gap-0.5 pt-3 sm:grid-cols-2" aria-label="Mobilmeny">
              {mainLinks.map((r) => (
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
            <p className="eyebrow mt-4 px-3">Alt om krystallsyke</p>
            <nav className="mt-1 grid gap-0.5 sm:grid-cols-2" aria-label="Fagsider">
              {NAV_FAG.filter((r) => !r.nav.includes('main')).map((r) => (
                <Link
                  key={r.slug}
                  href={pathOf(r)}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded px-3 py-2 text-[0.9375rem]',
                    isActive(pathOf(r))
                      ? 'bg-secondary font-medium'
                      : 'text-foreground/80 hover:bg-secondary/60',
                  )}
                >
                  {r.navLabel}
                </Link>
              ))}
            </nav>
            <div className="mt-4 border-t border-border px-3 pt-4 md:hidden">
              <Button asChild className="w-full">
                <Link href={bookingPagePath} onClick={() => setOpen(false)}>
                  Book en time
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
      {isArticle && <ReadingProgress />}
    </header>
  )
}
