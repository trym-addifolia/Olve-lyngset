import type { ContactContent } from '@content/types'
import { CalendarCheck, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import CtaBand from '@/components/CtaBand'
import FaqAccordion from '@/components/FaqAccordion'
import LocationCard from '@/components/LocationCard'
import PageHero from '@/components/PageHero'
import RelatedLinks from '@/components/RelatedLinks'
import RichText from '@/components/RichText'
import SectionHeading from '@/components/SectionHeading'
import { bookingHref } from '@/lib/booking'
import { type Route, SAFETY_HREF, crumbsOf, pathOf } from '@/routes'
import { site } from '@/site.config'

/**
 * Contact, with the practical information folded in (arbeidsdokument §11):
 * the ways in first (book online, ask about the intensive stay by email,
 * phone), then the location card with hours and the practical lines.
 */
export default function ContactTemplate({
  route,
  content,
}: { route: Route; content: ContactContent }) {
  const intents = [
    {
      icon: CalendarCheck,
      title: 'Bestill time',
      body: `En vanlig konsultasjon bestiller du i timebestillingen hos ${site.brand.clinicName}.`,
      href: bookingHref('kontakt:intent'),
      primary: true,
    },
    {
      icon: Mail,
      title: 'Intensivt opphold',
      body: `Spør om et intensivt rehabiliteringsopphold på ${site.contact.email}. Ikke send helseopplysninger i vanlig e-post.`,
      href: site.contact.emailHref,
      primary: false,
    },
    {
      icon: Phone,
      title: 'Telefon',
      // arbeidsdokument §11: the reception number is still to be confirmed
      body: `{{OLVE_BEKREFT: telefonnummer på siden | ${site.contact.phone.display}}}`,
      href: site.contact.phone.href,
      primary: false,
    },
  ]
  return (
    <>
      <PageHero
        crumbs={crumbsOf(route)}
        eyebrow={route.eyebrow}
        h1={route.h1}
        intro={content.intro.text}
        source={route.slug}
        showCtas={false}
      />
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-x-10 gap-y-6 md:grid-cols-3">
            {intents.map((it) => {
              const Icon = it.icon
              return (
                <li key={it.title}>
                  <a
                    href={it.href}
                    className={`group flex h-full flex-col rounded-lg p-6 transition-colors ${
                      it.primary
                        ? 'bg-fjord-700 text-white hover:bg-fjord-800'
                        : 'border-t-2 border-fjord-200 pt-5 hover:border-fjord-700'
                    }`}
                  >
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
                  </a>
                </li>
              )
            })}
          </ul>
          <p className="mt-8 text-[0.9375rem] text-muted-foreground">
            Ved plutselig kraftig svimmelhet med tegn på slag: ring 113 først.{' '}
            <Link
              href={SAFETY_HREF}
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
            eyebrow="Praktisk"
            title={`Finn frem til ${site.contact.address.street}`}
          />
          <LocationCard className="mt-10" practical={content.practical} />
        </div>
      </section>

      {content.faqs.length > 0 && (
        <section id="faq" className="scroll-mt-28 border-t border-border py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16 lg:px-8">
            <SectionHeading eyebrow="Spørsmål og svar" title="Vanlige spørsmål om timebestilling" />
            <FaqAccordion faqs={content.faqs} path={pathOf(route)} />
          </div>
        </section>
      )}

      <RelatedLinks slugs={content.related} />
      <CtaBand
        title={content.closing.heading}
        lede={content.closing.lede}
        source={`cta:${route.slug}`}
      />
    </>
  )
}
