import { SITE } from '@content/site'
import type { Metadata, Viewport } from 'next'
import { Atkinson_Hyperlegible_Next, Besley, Cormorant_Garamond } from 'next/font/google'
import type { ReactNode } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Book } from '@/components/Book'
import { Dropdowns } from '@/components/Dropdowns'
import { fact, plain, resolve } from '@/lib/facts'
import { INDEXABLE, SITE_URL } from '@/lib/site-url'
import './globals.css'

// Every read line: Atkinson Hyperlegible Next (drawn for low vision). Headings: Besley 400.
// The wordmark alone: Cormorant Garamond 600 italic (DESIGN §4).
const text = Atkinson_Hyperlegible_Next({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600'],
  variable: '--font-text',
  display: 'swap',
})
const display = Besley({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
})

const mark = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['600'],
  style: ['italic'],
  variable: '--font-mark',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: plain(SITE.brand),
  robots: INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = { themeColor: '#edf3f8', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={SITE.lang} className={`${text.variable} ${display.variable} ${mark.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <Book phone={fact('telefon')} telLabel={resolve(SITE.callLabel).text} />
        <Dropdowns />
      </body>
    </html>
  )
}
