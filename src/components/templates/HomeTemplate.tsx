import type { HomeContent, HomeDoor } from '@content/types'
import Link from 'next/link'
import PortraitSlot from '@/components/PortraitSlot'
import RichText from '@/components/RichText'
import { ACCENTS } from '@/components/home/accent'
import HomeContact from '@/components/home/HomeContact'
import HomeFaq from '@/components/home/HomeFaq'
import Print from '@/components/home/Print'
import TextLink from '@/components/home/TextLink'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { cn } from '@/lib/utils'
import type { PhotoName } from '@/photos'
import { HOME, SAFETY_HREF, pathOf } from '@/routes'

const ACCENT = 'moss' as const
const a = ACCENTS[ACCENT]

/** The picture on each door: the VOG photo for svimmelhet, Olve's own sentence for hjernerystelse. */
const DOOR_PHOTO: Record<string, PhotoName | undefined> = {
  'svimmelhet-og-balanse': 'vog-profil',
}

/** The small moss rhombus, the family mark of krystallsyken.no in this direction's accent. */
function Mark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block h-2 w-2 shrink-0 rotate-45', a.mark, className)}
    />
  )
}

/**
 * One of the two equal doors. Same parts in the same places on both sides:
 * a moss rule, the heading (held to two lines' height so the two texts start
 * level), the first paragraph, then a 3:4 plate beside the rest of the text.
 * The plate is a whole photo or, for hjernerystelse, the sentence from the
 * text that the reader most needs to hear, set in the serif.
 */
function Door({ door, caption }: { door: HomeDoor; caption?: string }) {
  const photo = DOOR_PHOTO[door.id]
  return (
    <article aria-labelledby={`${door.id}-heading`} className={cn('border-t-[3px] pt-8', a.rule)}>
      <h2
        id={`${door.id}-heading`}
        className="text-[2.25rem] leading-[1.06] tracking-[-0.015em] text-foreground md:text-[2.75rem] lg:min-h-[2.12em] xl:text-[3rem]"
      >
        <Link href={door.link.href} className="hover:text-fjord-800">
          {door.heading}
        </Link>
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-foreground md:text-[1.1875rem]">
        <RichText text={door.lede.text} />
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-[15.5rem_minmax(0,1fr)] sm:gap-8">
        {photo ? (
          <Print
            name={photo}
            caption={caption}
            width="15.5rem"
            mat
            sizes="260px"
            className="max-sm:max-w-[18rem]"
          />
        ) : (
          door.quote && (
            <figure
              className={cn(
                'flex flex-col justify-between gap-6 p-6 sm:aspect-[3/4] sm:p-5',
                a.plate,
              )}
            >
              <Mark />
              <blockquote
                className={cn(
                  'font-serif text-[1.625rem] leading-[1.16] sm:text-[1.75rem]',
                  a.plateText,
                )}
              >
                <p>
                  <RichText text={door.quote.text} />
                </p>
              </blockquote>
            </figure>
          )
        )}
        <div className="flex flex-col">
          {door.body.map((p) => (
            <p key={p.text} className="text-[1.0625rem] leading-relaxed text-foreground">
              <RichText text={p.text} />
            </p>
          ))}
          <TextLink href={door.link.href} accent={ACCENT} className="mt-5">
            {door.link.label}
          </TextLink>
        </div>
      </div>
    </article>
  )
}

/**
 * Home, direction A «To dører» (moss accent), served at /.
 *
 * The page opens on two equal doors: svimmelhet og balanse and langvarige
 * plager etter hjernerystelse (arbeidsdokument §1), right under a hero in
 * krystallsyken's grammar (big serif H1 beside the portrait). Then a slim
 * strip for ordinary chiropractic, the examination with two prints at uneven
 * sizes, «Gråsonen» as the one dark band, Om meg in Olve's own voice, contact
 * with the location card, and the FAQ. Moss is a mark only: rules, the
 * rhombus, link underlines and the one tint plate. Buttons stay petrol.
 */
export default function HomeTemplate({ content }: { content: HomeContent }) {
  const { hero, doors, general, examination, greyZone, about, captions } = content
  const [lede1, ...ledeRest] = hero.lede

  return (
    <>
      {/* Hero. On a phone the buttons come right after the first paragraph, so «Bestill time» is in the first screen. */}
      <section className="pb-16 pt-8 md:pb-24 md:pt-16">
        <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-center lg:px-8">
          <div className="flex flex-col">
            <p className={cn('flex items-start gap-3 text-[0.9375rem] font-semibold', a.text)}>
              <Mark className="mt-[0.45em]" />
              {HOME.eyebrow}
            </p>
            <h1 className="mt-5 text-[2.25rem] leading-[1.06] tracking-[-0.02em] text-foreground sm:text-[3rem] lg:text-[3.375rem] xl:text-[3.75rem]">
              {HOME.h1}
            </h1>
            <p className="order-1 mt-6 max-w-[62ch] text-lg leading-relaxed text-foreground md:mt-8 md:text-[1.25rem] md:leading-[1.6]">
              <RichText text={lede1.text} />
            </p>
            {ledeRest.map((p) => (
              <p
                key={p.text}
                className="order-3 mt-6 max-w-[62ch] text-lg leading-relaxed text-foreground/85 md:text-[1.25rem] md:leading-[1.6] lg:order-2 lg:mt-4"
              >
                <RichText text={p.text} />
              </p>
            ))}
            <div className="order-2 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:order-3 lg:mt-10">
              <Button asChild size="lg" className="h-14 px-7 text-[1.0625rem]">
                <a href={bookingHref('hero:forside')} data-hero-cta="">
                  Bestill time
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-7 text-[1.0625rem]">
                <Link href={hero.secondary.href}>{hero.secondary.label}</Link>
              </Button>
            </div>
            <p className="order-4 mt-6 text-[0.9375rem] text-muted-foreground">
              Plutselig, kraftig svimmelhet?{' '}
              <Link
                href={SAFETY_HREF}
                className="font-semibold text-fjord-700 underline decoration-fjord-300 underline-offset-4 hover:decoration-fjord-700"
              >
                Når du skal ringe 113
              </Link>
            </p>
          </div>
          <PortraitSlot
            priority
            sizes="(min-width: 640px) 400px, 100vw"
            className="mx-auto lg:mx-0 lg:justify-self-end"
          />
        </div>
      </section>

      {/* The two doors, equal in size and weight */}
      <section aria-label="To hovedområder" className="pb-20 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          {doors.map((door) => (
            <Door
              key={door.id}
              door={door}
              caption={DOOR_PHOTO[door.id] ? captions[DOOR_PHOTO[door.id] as PhotoName] : undefined}
            />
          ))}
        </div>
      </section>

      {/* Ordinary chiropractic: a slim strip, not a third door */}
      <section aria-labelledby={`${general.id}-heading`} className="bg-mist">
        <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-4 px-4 py-10 sm:px-6 md:py-12 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:px-8">
          <h2
            id={`${general.id}-heading`}
            className="flex items-baseline gap-3 text-display-sm text-foreground md:text-[1.875rem] lg:whitespace-nowrap"
          >
            <Mark className="-translate-y-[0.2em]" />
            {general.heading}
          </h2>
          {general.body.map((p) => (
            <p key={p.text} className="max-w-prose leading-relaxed text-foreground">
              <RichText text={p.text} />
            </p>
          ))}
          {general.link && (
            <TextLink href={general.link.href} accent={ACCENT}>
              {general.link.label}
            </TextLink>
          )}
        </div>
      </section>

      {/* The examination: two prints at uneven sizes */}
      <section aria-labelledby={`${examination.id}-heading`} className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <Print
            name="videobriller"
            caption={captions.videobriller}
            mat
            sizes="(min-width: 640px) 600px, 100vw"
            className="lg:col-span-6"
          />
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-6">
            <h2
              id={`${examination.id}-heading`}
              className="text-display-md text-foreground md:text-display-lg"
            >
              {examination.heading}
            </h2>
            {examination.subheading && (
              <p
                className={cn(
                  'mt-2 font-serif text-[1.5rem] leading-snug md:text-[1.75rem]',
                  a.text,
                )}
              >
                {examination.subheading}
              </p>
            )}
            {examination.body.map((p) => (
              <p
                key={p.text}
                className="mt-6 text-lg leading-relaxed text-foreground md:text-[1.1875rem]"
              >
                <RichText text={p.text} />
              </p>
            ))}
            {examination.link && (
              <TextLink href={examination.link.href} accent={ACCENT} className="mt-6">
                {examination.link.label}
              </TextLink>
            )}
            <Print
              name="vog-naerbilde"
              caption={captions['vog-naerbilde']}
              width="15rem"
              mat
              sizes="260px"
              className="mt-12"
            />
          </div>
        </div>
      </section>

      {/* Gråsonen: the one dark band */}
      <section aria-labelledby={`${greyZone.id}-heading`} className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-10 px-4 py-24 sm:px-6 md:py-32 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <span aria-hidden="true" className={cn('block h-[3px] w-16', a.markOnDark)} />
            <h2
              id={`${greyZone.id}-heading`}
              className="mt-8 text-[2.75rem] leading-[1.02] tracking-[-0.02em] text-white md:text-[4rem] xl:text-[4.75rem]"
            >
              {greyZone.heading}
            </h2>
          </div>
          <div className="space-y-6 lg:col-span-5 lg:col-start-8 lg:pt-36">
            {greyZone.body.map((p, i) => (
              <p
                key={p.text}
                className={cn(
                  'leading-relaxed',
                  i === 0
                    ? 'text-[1.1875rem] text-white md:text-[1.3125rem]'
                    : 'text-lg text-white/85',
                )}
              >
                <RichText text={p.text} />
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Om meg: the tall print beside his story and his own promise */}
      <section aria-labelledby={`${about.id}-heading`} className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <Print
            name="olve-ryggsoyle"
            width="19rem"
            mat
            sizes="(min-width: 640px) 320px, 80vw"
            className="max-lg:mx-auto lg:col-span-4"
          />
          <div className="lg:col-span-7 lg:col-start-6 lg:self-center">
            <h2
              id={`${about.id}-heading`}
              className="text-display-md text-foreground md:text-display-lg"
            >
              {about.heading}
            </h2>
            {about.body.map((p) => (
              <p
                key={p.text}
                className="mt-6 max-w-prose text-lg leading-relaxed text-foreground md:text-[1.1875rem]"
              >
                <RichText text={p.text} />
              </p>
            ))}
            <figure className="mt-10">
              <span aria-hidden="true" className={cn('block h-[3px] w-12', a.mark)} />
              <blockquote className="voice mt-6 max-w-[38ch] text-[1.5rem] leading-[1.25] md:text-[1.875rem]">
                <p>
                  <RichText text={about.promise.text} />
                </p>
              </blockquote>
            </figure>
            {about.link && (
              <TextLink href={about.link.href} accent={ACCENT} className="mt-8">
                {about.link.label}
              </TextLink>
            )}
          </div>
        </div>
      </section>

      <HomeContact content={content} accent={ACCENT} source="cta:forside" layout="split" />
      <HomeFaq faqs={content.faqs} accent={ACCENT} path={pathOf(HOME)} />
    </>
  )
}
