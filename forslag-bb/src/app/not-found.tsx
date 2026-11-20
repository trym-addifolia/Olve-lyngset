import { PAGES } from '@content/pages'
import { SITE } from '@content/site'
import Link from 'next/link'
import { pathOf } from '@/lib/site-url'

export default function NotFound() {
  return (
    <main id="innhold" className="wrap" style={{ paddingBlock: 64 }}>
      <h1>{SITE.notFound.title}</h1>
      <p className="read">{SITE.notFound.body}</p>
      <p>
        <Link href={SITE.notFound.link.href}>{SITE.notFound.link.label}</Link>
      </p>
      <ul>
        {PAGES.filter((p) => p.slug && !p.parent).map((p) => (
          <li key={p.slug}>
            <Link href={pathOf(p.slug)}>{p.navLabel}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
