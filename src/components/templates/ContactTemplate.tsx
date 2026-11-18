import type { ContactContent } from '@content/types'
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
      title: 'Bestill time',
      body: `En vanlig konsultasjon bestiller du i timebestillingen hos ${site.brand.clinicName}.`,
      href: bookingHref('kontakt:intent'),
      primary: true,
    },
    {
      title: 'Intensivt opphold',
      body: `Spør om et intensivt rehabiliteringsopphold på ${site.contact.email}. Ikke send helseopplysninger i vanlig e-post.`,
      href: site.contact.emailHref,
      primary: false,
    },
    {
      title: 'Telefon',
      // display carries its own OLVE_BEKREFT marker until the number is confirmed (§11)
      body: site.contact.phone.display,
      href: site.contact.phone.href,
      primary: false,
    },
  ]
  return (
    <>
      <PageHero
        crumbs={crumbsOf(route)}
        h1={route.h1}
        intro={content.intro.text}
        source={route.slug}
        showCtas={false}
      />
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-4 md:grid-cols-3 lg:gap-6">
            {intents.map((it) => {
              return (
                // the title is the link, not the whole card: the body can hold an
                // unconfirmed-fact marker, which is a button of its own
                <li
                  key={it.title}
                  className={`reveal flex h-full flex-col p-6 transition-colors sm:p-8 ${
                    it.primary
                      ? 'bg-fjord-700 text-white focus-within:bg-fjord-800 hover:bg-fjord-800'
                      : 'bg-card focus-within:bg-fjord-50 hover:bg-fjord-50'
                  }`}
                >
                  <h2 className="text-display-sm md:text-display-md">
                    <a
                      href={it.href}
                      className={`underline decoration-1 underline-offset-4 hover:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                        it.primary
                          ? 'decoration-white/50 focus-visible:ring-white focus-visible:ring-offset-fjord-700'
                          : 'decoration-fjord-300 focus-visible:ring-ring'
                      }`}
                    >
                      {it.title}
                    </a>
                  </h2>
                  <p
                    className={`mt-3 text-base leading-relaxed ${it.primary ? 'text-white/90' : 'text-foreground/85'}`}
                  >
                    <RichText text={it.body} />
                  </p>
                </li>
              )
            })}
          </ul>
          <p className="mt-8 text-base text-muted-foreground">
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

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={`Finn frem til ${site.contact.address.street}`}
          />
          <LocationCard className="mt-10" practical={content.practical} />
        </div>
      </section>

      {content.faqs.length > 0 && (
        <section id="faq" className="scroll-mt-28 py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-8">
            <SectionHeading title="Vanlige spørsmål om timebestilling" />
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
