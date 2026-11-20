import { SITE } from '@content/site'
import Link from 'next/link'
import { fact, plainOrNull, resolve } from '@/lib/facts'
import { INDEXABLE } from '@/lib/site-url'

/* Light on purpose: the page has one dark surface, and it is not the footer. */
export function Footer() {
  const lines = [SITE.footer.personal, SITE.footer.address, SITE.footer.org]
    .map((t) => plainOrNull(t))
    .filter(Boolean)
  const phone = fact('telefon')
  const sister = resolve(SITE.footer.sister.href)
  const hours = fact('apningstider')
  const brandLine = resolve(SITE.brandLine)
  return (
    <footer className="foot">
      <div className="wrap">
        <p className="brand">
          <span className="wordmark">{plainOrNull(SITE.brand)}</span>
          {!brandLine.open.length && <span className="line">{brandLine.text}</span>}
        </p>
        {lines.map((t) => (
          <p key={t}>{t}</p>
        ))}
        {phone && (
          <p>
            <a href={`tel:${phone.replace(/\s/g, '')}`}>{resolve(SITE.footer.phone).text}</a>
          </p>
        )}
        {hours && (
          <p>
            {SITE.rail.hoursLabel}: {hours}
          </p>
        )}
        <p>{SITE.footer.notAdvice}</p>
        <ul>
          {SITE.footer.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
          {!sister.open.length && (
            <li>
              <a href={sister.text} rel="noopener">
                {SITE.footer.sister.label}
              </a>
            </li>
          )}
        </ul>
        {!INDEXABLE && <p className="soft">{SITE.footer.preview}</p>}
      </div>
    </footer>
  )
}
