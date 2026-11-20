import { BOOK_HREF } from '@content/site'

/** Booking links carry the page they come from, so the counter can tell pages apart. */
export const bookHref = (href: string, from: string) =>
  href === BOOK_HREF ? `${BOOK_HREF}?fra=${encodeURIComponent(from || 'forside')}` : href

/** Route handlers and external links must be plain anchors (no client prefetch, which would count). */
export const isPlain = (href: string) =>
  /^(https?:|tel:|mailto:|#)/.test(href) || href.startsWith('/go/')
