import type { Metadata, Viewport } from 'next'
import { Source_Sans_3, Newsreader } from 'next/font/google'
import './globals.css'
import AnimObserver from '@/components/AnimObserver'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import KommentarLag from '@/components/kommentar/KommentarLag'
import PreviewNotes, { PreviewBar } from '@/components/PreviewNotes'
import StickyMobileCta from '@/components/StickyMobileCta'
import JsonLd from '@/components/seo/JsonLd'
import { Toaster } from '@/components/ui/sonner'
import { clinicSchema, personSchema, websiteSchema } from '@/lib/schema'
import { ALLOW_INDEX, BASE_URL } from '@/lib/siteUrl'
import { HOME } from '@/routes'
import { site } from '@/site.config'

// Newsreader carries the voice (headings, Olve's own sentences); Source Sans 3 (was Atkinson, whose slashed zero reads as Ø)
// Hyperlegible Next carries everything read while dizzy, on a phone, at 55+.
// Norwegian (æ ø å) is covered by the latin subset; latin-ext would double
// the preloaded font bytes for nothing. One roman file for the serif (no
// italic, no opsz axis): the hero lede is the LCP and waits on these bytes.
const display = Newsreader({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
})
const body = Source_Sans_3({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: HOME.title,
    template: `%s | ${site.brand.name}`,
  },
  description: HOME.description,
  applicationName: site.brand.name,
  openGraph: { siteName: site.brand.name, locale: 'nb_NO', type: 'website' },
  twitter: { card: 'summary_large_image' },
  // noindex everywhere except on the production host (siteUrl.ts)
  robots: ALLOW_INDEX ? { index: true, follow: true } : { index: false, follow: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // needed for env(safe-area-inset-bottom) in the sticky mobile bar
  viewportFit: 'cover',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="no"
      className={`${display.variable} ${body.variable}`}
      // the head script adds data-anim before paint; React must not undo it
      suppressHydrationWarning
    >
      <head>
        {/* JavaScript is on: the explaining animations may wait at their first frame (globals.css) */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: a fixed one-line flag, no input
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.setAttribute('data-anim','')",
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <a
          href="#innhold"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-card focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg"
        >
          Hopp til innhold
        </a>
        <PreviewBar enabled={!ALLOW_INDEX} />
        <Header />
        <main id="innhold" className="flex-grow">
          {children}
        </main>
        <PreviewNotes enabled={!ALLOW_INDEX} />
        <Footer />
        <StickyMobileCta />
        <KommentarLag enabled={!ALLOW_INDEX} />
        <AnimObserver />
        <Toaster position="top-right" />
        <JsonLd data={websiteSchema()} />
        <JsonLd data={clinicSchema()} />
        <JsonLd data={personSchema()} />
      </body>
    </html>
  )
}
