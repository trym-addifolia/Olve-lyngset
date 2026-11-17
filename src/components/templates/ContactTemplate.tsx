import type { ContactContent } from '@content/types'
import { CalendarCheck, Contact } from 'lucide-react'
import Link from 'next/link'
import CtaBand from '@/components/CtaBand'
import LocationCard from '@/components/LocationCard'
import RichText from '@/components/RichText'
import PageHero from '@/components/PageHero'
import SectionHeading from '@/components/SectionHeading'
import JsonLd from '@/components/seo/JsonLd'
import { bookingHref } from '@/lib/booking'
import { contactPageSchema } from '@/lib/schema'
import { HOME, type Route, SAFETY_ROUTE, pathOf } from '@/routes'
import { site } from '@/site.config'

/**
 * Contact: intent-first (book, phone, is it urgent?), then the location card.
 * The only page that shows the phone number.
 */
export default function ContactTemplate({
  route,
  content,
}: { route: Route; content: ContactContent }) {
  const path = pathOf(route)
  const intents = [
    {
      icon: CalendarCheck,
      title: 'Book en time',
      body: 'Velg en tid i kalenderen min. Du trenger ikke henvisning.',
      href: bookingHref('kontakt:intent'),
      primary: true,
      external: true,
    },
    {
      icon: Contact,
      title: 'Telefon',
      body: `${site.contact.phone.display}. Lagre nummeret, så har du det neste gang det snurrer.`,
      href: site.contact.phone.href,
      primary: false,
      external: true,
    },
  ]
  return (
    <>
      <JsonLd data={contactPageSchema(path)} />
      <PageHero
        crumbs={[
          { name: HOME.navLabel, path: '/' },
          { name: route.navLabel, path },
        ]}
        eyebrow={route.eyebrow}
        h1={route.h1}
        intro={content.intro.text}
        source={route.slug}
        showCtas={false}
      />
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-x-10 gap-y-6 md:grid-cols-2">
            {intents.map((it) => {
              const Icon = it.icon
              const cls = `group flex h-full flex-col rounded-lg p-6 transition-colors ${
                it.primary
                  ? 'bg-fjord-700 text-white hover:bg-fjord-800'
                  : 'border-t-2 border-fjord-200 pt-5 hover:border-fjord-700'
              }`
              const inner = (
                <>
                  <Icon
                    className={`h-6 w-6 ${it.primary ? 'text-white' : 'text-fjord-700'}`}
                    aria-hidden="true"
                    strokeWidth={1.5}
                  />
                  <h2 className="mt-4 text-display-sm">{it.title}</h2>
                  <p
                    className={`mt-2 text-[0.9375rem] leading-relaxed ${it.primary ? 'text-white/80' : 'text-muted-foreground'}`}
                  >
                    <RichText text={it.body} />
                  </p>
                </>
              )
              return (
                <li key={it.title}>
                  {it.external || it.href.startsWith('#') ? (
                    <a href={it.href} className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={it.href} className={cls}>
                      {inner}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
          <p className="mt-8 text-[0.9375rem] text-muted-foreground">
            Noen tegn skal du ringe 113 for, ikke meg.{' '}
            <Link
              href={pathOf(SAFETY_ROUTE)}
              className="font-medium text-fjord-700 underline-offset-4 hover:underline"
            >
              Se tegnene
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Finn frem"
            title={`Finn frem til ${site.contact.address.street}`}
          />
          <LocationCard className="mt-10" practical={content.practical} />
        </div>
      </section>

      <CtaBand
        title={content.closing.heading}
        lede={content.closing.lede}
        source={`cta:${route.slug}`}
      />
    </>
  )
}
