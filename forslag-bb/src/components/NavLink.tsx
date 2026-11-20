'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* A menu link that marks the current page (aria-current) */
export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const path = usePathname()
  const here = path === href || path === href.replace(/\/$/, '')
  return (
    <Link href={href} aria-current={here ? 'page' : undefined}>
      {children}
    </Link>
  )
}
