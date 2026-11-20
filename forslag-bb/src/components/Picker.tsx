import type { Page } from '@content/types'
import Link from 'next/link'
import { resolve } from '@/lib/facts'

type P = NonNullable<Page['picker']>

/* «Finn plagen din»: the main ways in, at most four, in the first screen of the home page. */
export function Picker({ picker }: { picker: P }) {
  const major = picker.items.filter((i) => i.major).slice(0, 4)
  return (
    <nav className="pick" aria-labelledby="finn-plagen">
      <p id="finn-plagen">{picker.heading}</p>
      <ul className="tiles" data-figure>
        {major.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="pane">
              <b>{i.short}</b>
              {i.hint && <span className="hint">{resolve(i.hint).text}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* «Har du fått en diagnose?»: the diagnosis pages as one quiet line, lower on the home page. */
export function DiagnosisLine({ picker }: { picker: P }) {
  const minor = picker.items
    .filter((i) => !i.major)
    .map((i) => ({ ...i, r: resolve(i.href) }))
    .filter((i) => !i.r.open.length)
  if (!minor.length) return null
  return (
    <nav className="diagnoses" aria-labelledby="har-diagnose">
      <p id="har-diagnose">{picker.ask}</p>
      <ul>
        {minor.map((i) => (
          <li key={i.href}>
            {i.external ? (
              <a href={i.r.text} rel="noopener">
                {i.label}
              </a>
            ) : (
              <Link href={i.r.text}>{i.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
