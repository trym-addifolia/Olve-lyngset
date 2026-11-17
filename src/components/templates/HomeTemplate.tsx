import { Figure } from '@content/illustrations'
import { NystagmusTrace } from '@content/positions'
import type { HomeContent } from '@content/types'
import Link from 'next/link'
import { ArticleSection } from '@/components/ArticleBody'
import ConditionGrid from '@/components/ConditionGrid'
import CtaBand from '@/components/CtaBand'
import FaqAccordion from '@/components/FaqAccordion'
import LocationCard from '@/components/LocationCard'
import PortraitSlot from '@/components/PortraitSlot'
import PractitionerProfile from '@/components/PractitionerProfile'
import ProcessTimeline from '@/components/ProcessTimeline'
import RichText from '@/components/RichText'
import SafetyBox from '@/components/SafetyBox'
import Photo from '@/components/Photo'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { HOME, ROUTES, type Route, pathOf } from '@/routes'

const KOMMER_TILBAKE = ROUTES.find((r) => r.slug === 'kommer-tilbake') as Route

const WRAP = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
const TEXT_LINK =
  'font-semibold text-fjord-700 underline decoration-fjord-300 decoration-[1.5px] underline-offset-[5px] hover:decoration-fjord-700'

/** The crystal: the page's one mark. A small orange rhombus, never a spinner. */
function Crystal({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 shrink-0 rotate-45 bg-krystall-500 ${className}`}
    />
  )
}

/**
 * Home / pillar page. One visual idea carries it: the drawing of the balance
 * organ, with the crystals astray in the hero and back in place at the end.
 * Section order: hero (name and face, H1, lede, the
 * booking button, three facts), the 113 box before anything else,
 * recognition, why the eyes, the visit, «prøvd øvelsene», who you meet,
 * price and place, closing, the deep pages, FAQ.
 */
export default function HomeTemplate({ content }: { content: HomeContent }) {
  const facts = content.hero.factLine.text.split(' · ')
  const [place, who] = HOME.eyebrow.split(' · ')
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden border-b border-border">
        <div
          className={`${WRAP} grid gap-x-12 gap-y-10 pb-12 pt-4 md:pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:items-center lg:pb-20 lg:pt-16 xl:gap-x-16`}
        >
          <div className="max-w-[35rem]">
            <div className="mb-4 flex items-center gap-4 md:mb-6">
              <PortraitSlot variant="mini" priority className="lg:hidden" />
              <p className="eyebrow flex flex-col gap-x-5 lg:flex-row">
                <span>{place}</span>
                <span className="font-normal text-foreground/80">{who}</span>
              </p>
            </div>
            <h1 className="text-[2.375rem] leading-[1.08] tracking-[-0.01em] text-foreground sm:text-display-lg md:text-display-xl">
              {HOME.h1}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-foreground/85 md:mt-6 md:text-[1.25rem] md:leading-[1.6]">
              <RichText text={content.hero.lede.text} />
            </p>
            <div className="mt-6 md:mt-8">
              <Button asChild size="lg" className="h-14 px-7 text-[1.0625rem]">
                <a href={bookingHref('hero:forside')} data-hero-cta="">
                  Book en time
                </a>
              </Button>
            </div>
            <ul className="mt-5 flex flex-col gap-1.5 text-[1.0625rem] leading-snug text-foreground/90 sm:flex-row sm:flex-wrap sm:gap-x-7 md:mt-7">
              {facts.map((fact) => (
                <li key={fact} className="flex items-baseline gap-3">
                  <Crystal className="-translate-y-0.5" />
                  <span>
                    <RichText text={fact} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[1.0625rem]">
              <a href="#farlig" className={TEXT_LINK}>
                Er det farlig? Når du skal ringe 113
              </a>
            </p>
          </div>

          <div className="mx-auto grid w-full max-w-[17rem] items-start sm:max-w-md gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-[13.5rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)]">
            <PortraitSlot priority sizes="240px" className="hidden lg:block" />
            <Figure name="buegangene-ute" labels caption={content.hero.figureCaption} />
          </div>
        </div>
      </section>

      {/* Kjenner du deg igjen? + Må jeg vente til det går over? */}
      <section className="py-16 md:py-24">
        <div className={`${WRAP} grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20`}>
          <div>
            <SectionHeading title={content.recognise.heading} lede={content.recognise.lede} />
            <ul className="mt-8 border-t border-border">
              {content.recognise.items.map((item) => (
                <li
                  key={item.text}
                  className="flex items-baseline gap-4 border-b border-border py-4 font-serif text-[1.3125rem] leading-snug text-foreground md:text-2xl"
                >
                  <Crystal className="-translate-y-1" />
                  <span>
                    <RichText text={item.text} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[1.0625rem]">
              <Link href="/symptomer" className={TEXT_LINK}>
                Alle symptomene på krystallsyke
              </Link>
            </p>
          </div>
          <div className="max-w-prose lg:pt-2">
            <ArticleSection section={{ ...content.wait, eyebrow: undefined }} />
          </div>
        </div>
      </section>

      {/* Er det farlig? (after the symptoms; the hero links here) */}
      <section id="farlig" className="scroll-mt-20 bg-mist py-12 md:py-20">
        <div className={`${WRAP} grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16`}>
          <SectionHeading title={content.safety.heading} lede={content.safety.lede || undefined} />
          <SafetyBox />
        </div>
      </section>

      {/* Hvorfor ser du på øynene mine? */}
      <section className="border-y border-border bg-card py-16 md:py-24">
        <div
          className={`${WRAP} grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20`}
        >
          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            <Photo name="videobriller" caption={content.eyes.figureCaption} className="mx-auto" />
            <NystagmusTrace className="mt-8 border-t border-border pt-6" />
          </div>
          <div className="max-w-prose">
            <ArticleSection section={{ ...content.eyes, eyebrow: undefined }} />
          </div>
        </div>
      </section>

      {/* Slik foregår timen */}
      <section className="py-16 md:py-24">
        <div className={`${WRAP} grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16`}>
          <div>
            <SectionHeading title={content.process.heading} lede={content.process.lede} />
            <div className="mt-8">
              <Button asChild size="lg">
                <a href={bookingHref('slik-foregar-timen')}>Book en time</a>
              </Button>
            </div>
          </div>
          <ProcessTimeline steps={content.process.steps} />
        </div>
      </section>

      {/* Prøvd øvelsene uten at det hjalp? The one dark band. */}
      <section className="bg-ink-900 py-16 text-white md:py-24">
        <div className={`${WRAP} grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16`}>
          <SectionHeading tone="dark" title={content.tried.heading} />
          <div>
            <div className="max-w-prose space-y-5 text-lg leading-relaxed text-white/85">
              {content.tried.body.map((p) => (
                <p key={p.text}>
                  <RichText text={p.text} />
                </p>
              ))}
            </div>
            <div className="mt-8">
              <Button
                asChild
                variant="outline-dark"
                size="lg"
                className="h-auto min-h-12 whitespace-normal py-3 text-left"
              >
                <Link href={pathOf(KOMMER_TILBAKE)}>{content.tried.linkLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hvem møter jeg? */}
      <section className="py-16 md:py-24">
        <div className={WRAP}>
          <PractitionerProfile
            heading={content.profile.heading}
            lede={content.profile.lede}
            body={content.profile.body}
          />
        </div>
      </section>

      {/* Hvordan får jeg time, og trenger jeg henvisning? */}
      <section className="border-t border-border bg-mist py-16 md:py-24">
        <div className={`${WRAP} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20`}>
          <div className="max-w-prose">
            <ArticleSection section={{ ...content.price, eyebrow: undefined }} />
          </div>
          <LocationCard practical={content.price.practical} />
        </div>
      </section>

      <CtaBand
        title={content.closing.heading}
        lede={content.closing.lede}
        source="cta:forside"
        figure={{ name: 'buegangene-pa-plass', caption: content.closing.figureCaption }}
      />

      {/* Alt om krystallsyke */}
      <section className="py-16 md:py-24">
        <div className={WRAP}>
          <SectionHeading title={content.depth.heading} lede={content.depth.lede} />
          <div className="mt-10">
            <ConditionGrid />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={`${WRAP} grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16`}>
          <SectionHeading title="Vanlige spørsmål om krystallsyke" />
          <FaqAccordion faqs={content.faqs} path="/" />
        </div>
      </section>
    </>
  )
}
