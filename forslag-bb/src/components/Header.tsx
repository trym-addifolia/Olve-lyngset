import { SITE } from '@content/site'
import Link from 'next/link'
import { plain, resolve } from '@/lib/facts'
import { NavLink } from './NavLink'

type Item = { label: string; href: string; lead?: boolean; sub?: boolean; external?: boolean }

function Item({ it }: { it: Item }) {
  const r = resolve(it.href)
  if (r.open.length) return null
  return (
    <li className={it.lead ? 'lead' : it.sub ? 'sub' : undefined}>
      {it.external ? (
        <a href={r.text} rel="noopener">
          {it.label}
        </a>
      ) : (
        <NavLink href={r.text}>{it.label}</NavLink>
      )}
    </li>
  )
}

/*
 * No booking link in the header DOM: the one booking element is the last thing in <body>
 * (DESIGN §6.12), so every 113 line comes before it. From 1024 it is positioned over the
 * space this header reserves on the right.
 */
export function Header() {
  const name = plain(SITE.brand)
  const groups = SITE.plager
  return (
    <header className="top">
      <a href="#innhold" className="skip">
        {SITE.skipLink}
      </a>
      <div className="wrap">
        <Link href="/" className="brand">
          <span className="wordmark">{name}</span>
          <span className="line">{resolve(SITE.brandLine).text}</span>
        </Link>
        <nav aria-label={SITE.mainNavLabel} className="nav">
          <details className="group" data-dropdown>
            <summary>{SITE.plagerLabel}</summary>
            <div className="drop">
              {groups.map((g, i) => (
                <ul key={i}>
                  {g.map((it) => (
                    <Item key={it.href} it={it} />
                  ))}
                </ul>
              ))}
            </div>
          </details>
          {SITE.nav.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <details className="menu" data-dropdown>
          <summary aria-controls="mobilmeny">{SITE.menuOpen}</summary>
          <nav id="mobilmeny" aria-label={SITE.mainNavLabel} className="sheet">
            <ul>
              {groups[0].map((it) => (
                <Item key={it.href} it={it} />
              ))}
              {groups[1]
                .filter((it) => !it.external)
                .map((it) => (
                  <Item key={it.href} it={it} />
                ))}
              {SITE.sheetRest.map((l) => (
                <Item key={l.href} it={l} />
              ))}
              {groups[1]
                .filter((it) => it.external)
                .map((it) => (
                  <Item key={it.href} it={it} />
                ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  )
}
