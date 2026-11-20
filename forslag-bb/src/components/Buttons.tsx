import { SITE } from '@content/site'
import type { Link as L } from '@content/types'
import Link from 'next/link'
import { bookHref, isPlain } from '@/lib/book'
import { fact, resolve } from '@/lib/facts'

type Props = { link: L; quiet?: boolean; from?: string; className?: string }

/* A button that may point at a page, the booking counter or an external address. */
export function Button({ link, quiet = false, from = '', className = '' }: Props) {
  const r = resolve(link.href)
  if (r.open.length) return null
  const href = bookHref(r.text, from)
  const cls = `btn ${quiet ? 'quiet' : ''} ${className}`
  return isPlain(href) ? (
    <a href={href} className={cls} {...(/^https?:/.test(href) ? { rel: 'noopener' } : {})}>
      {link.label}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {link.label}
    </Link>
  )
}

/* «Ring ...» from the confirmed phone fact, as a text link; nothing while it is open. */
export function PhoneLink({ only = false }: { only?: boolean }) {
  const phone = fact('telefon')
  if (!phone) return null
  return (
    <a href={`tel:${phone.replace(/\s/g, '')}`} className={only ? 'btn' : 'tel'}>
      {resolve(SITE.callLabel).text}
    </a>
  )
}

export function TextLink({ link, className = '' }: { link: L; className?: string }) {
  const r = resolve(link.href)
  if (r.open.length) return null
  const external = /^https?:/.test(r.text)
  return isPlain(r.text) ? (
    <a href={r.text} className={className} {...(external ? { rel: 'noopener' } : {})}>
      {link.label}
    </a>
  ) : (
    <Link href={r.text} className={className}>
      {link.label}
    </Link>
  )
}
