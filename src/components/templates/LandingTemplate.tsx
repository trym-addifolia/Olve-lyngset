import type { LandingContent } from '@content/types'
import { ArticleSection } from '@/components/ArticleBody'
import CtaBand from '@/components/CtaBand'
import EquipmentList from '@/components/EquipmentList'
import FaqAccordion from '@/components/FaqAccordion'
import PageHero from '@/components/PageHero'
import Photo from '@/components/Photo'
import ProcessTimeline from '@/components/ProcessTimeline'
import RelatedLinks from '@/components/RelatedLinks'
import RichText from '@/components/RichText'
import SafetyBox from '@/components/SafetyBox'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { type Route, crumbsOf, pathOf } from '@/routes'
import { site } from '@/site.config'
import { topicOf } from './InfoTemplate'

/** The enquiry for the intensive stay (arbeidsdokument §7 and §15). */
const EMAIL_ACTION = {
  label: 'Send forespørsel om intensivt opphold',
  href: site.contact.emailHref,
}

/**
 * Landing page for a considered decision (the intensive stay): the contact
 * card beside the hero, the process as a timeline, optional equipment,
 * sections, FAQ. `content.contact` decides whether the card and the closing
 * band book online or open an email enquiry.
 */
export default function LandingTemplate({
  route,
  content,
}: { route: Route; content: LandingContent }) {
  const path = pathOf(route)
  const byEmail = content.contact === 'email'
  return (
    <>
      <PageHero
        crumbs={crumbsOf(route)}
        eyebrow={route.eyebrow}
        h1={route.h1}
        intro={content.intro.text}
        source={route.slug}
        cta={route.heroCta}
        tone="mist"
      >
        <div className="rounded-lg border border-border bg-card p-6 md:p-7">
          {byEmail ? (
            <>
              <h2 className="text-display-sm">Kontakt meg direkte</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/80">
                Et opphold planlegges individuelt og kan ikke bestilles som en vanlig nett-time.
                Skriv til <RichText text={site.contact.email} />.
              </p>
              <Button asChild size="lg" className="mt-5 h-auto min-h-12 w-full whitespace-normal">
                <a href={EMAIL_ACTION.href}>{EMAIL_ACTION.label}</a>
              </Button>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Ikke send følsomme helseopplysninger eller journaler i vanlig e-post.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-display-sm">Velg en tid i kalenderen</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/80">
                Du velger tid selv i timebestillingen hos {site.brand.clinicName}.
              </p>
              <Button asChild size="lg" className="mt-5 w-full">
                <a href={bookingHref(`kort:${route.slug}`)}>Bestill time</a>
              </Button>
            </>
          )}
        </div>
      </PageHero>

      {content.safety && (
        // the 113 box right under the hero: nobody books past a warning sign
        <section id="akutt" className="scroll-mt-28 bg-mist py-10 md:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SafetyBox variant="compact" />
          </div>
        </section>
      )}

      <section id="forlop" className="scroll-mt-28 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16 lg:px-8">
          <div>
            <SectionHeading title={content.timelineHeading} lede={content.timelineLede} />
            {content.photo && (
              <Photo
                name={content.photo.name}
                caption={content.photo.caption}
                className="mx-auto mt-10 lg:mx-0"
              />
            )}
          </div>
          <ProcessTimeline steps={content.timeline} />
        </div>
      </section>

      {content.showEquipment && (
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16 lg:px-8">
            <Photo name="videobriller" className="mx-auto lg:mx-0" />
            <div>
              <SectionHeading title="Hva jeg undersøker deg med" />
              <div className="mt-8">
                <EquipmentList columns={1} />
              </div>
            </div>
          </div>
        </section>
      )}

      {content.sections.length > 0 && (
        <section className="border-t border-border bg-card py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
            {content.sections.map((s) => (
              <div key={s.id} className="max-w-prose">
                <ArticleSection section={s} />
              </div>
            ))}
          </div>
        </section>
      )}

      {content.faqs.length > 0 && (
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <section
              id="faq"
              className="grid scroll-mt-28 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16"
            >
              <SectionHeading title={`Vanlige spørsmål om ${topicOf(route)}`} />
              <FaqAccordion faqs={content.faqs} path={path} />
            </section>
          </div>
        </section>
      )}

      <RelatedLinks slugs={content.related} />
      <CtaBand
        title={content.closing.heading}
        lede={content.closing.lede}
        source={`cta:${route.slug}`}
        action={byEmail ? EMAIL_ACTION : undefined}
      />
    </>
  )
}
