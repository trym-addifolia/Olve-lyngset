import type { HomeBlock, HomeContent, HomeDoor } from '@content/types'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { ACCENT } from '@/components/home/accent'
import HomeContact from '@/components/home/HomeContact'
import HomeFaq from '@/components/home/HomeFaq'
import Print from '@/components/home/Print'
import TextLink from '@/components/home/TextLink'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { cn } from '@/lib/utils'
import { HOME, SAFETY_HREF, pathOf } from '@/routes'
import { site } from '@/site.config'

/** A short ochre bar: the mark of the home page, over a section or a door. */
function Bar({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn('block h-[3px] w-14', dark ? ACCENT.markOnDark : ACCENT.mark, className)}
    />
  )
}

/**
 * One of the two main doors: a white plate on the linen ground, the two side
 * by side and equal. Heading, his lede, his own sentence where there is one,
 * the rest, and the link at the foot so the two plates end on the same line.
 */
function Door({ door, className }: { door: HomeDoor; className?: string }) {
  return (
    <li className={cn('flex flex-col bg-card p-6 sm:p-10 xl:p-14', className)}>
      <Bar />
      <h2
        id={`${door.id}-heading`}
        className="mt-6 text-[2.25rem] leading-[1.06] tracking-[-0.02em] text-foreground md:text-display-lg lg:min-h-[2.12em] xl:text-display-xl"
      >
        {door.link ? (
          <Link href={door.link.href} className="transition-colors hover:text-fjord-700">
            {door.heading}
          </Link>
        ) : (
          door.heading
        )}
      </h2>
      <p className="mt-6 text-lg leading-relaxed text-foreground md:text-xl">
        <RichText text={door.lede.text} />
      </p>
      {door.quote && (
        <p className="voice mt-6 text-[1.5rem] leading-[1.25] md:text-[1.75rem]">
          <RichText text={door.quote.text} />
        </p>
      )}
      {door.body.map((p) => (
        <p key={p.text} className="mt-5 text-lg leading-relaxed text-foreground/85">
          <RichText text={p.text} />
        </p>
      ))}
      {door.link && (
        <div className="mt-auto pt-6">
          <TextLink href={door.link.href}>{door.link.label}</TextLink>
        </div>
      )}
    </li>
  )
}

/** Ordinary chiropractic: the third, smaller plate, across the full width under the two doors. */
function General({ item }: { item: HomeBlock }) {
  return (
    <li className="reveal grid gap-x-16 gap-y-5 bg-card p-6 sm:p-10 lg:col-span-2 lg:grid-cols-12 xl:px-14">
      <h2
        id={`${item.id}-heading`}
        className="text-display-sm text-foreground md:text-display-md lg:col-span-5"
      >
        {item.link ? (
          <Link href={item.link.href} className="transition-colors hover:text-fjord-700">
            {item.heading}
          </Link>
        ) : (
          item.heading
        )}
      </h2>
      <div className="lg:col-span-7">
        {item.body.map((p) => (
          <p key={p.text} className="text-lg leading-relaxed text-foreground">
            <RichText text={p.text} />
          </p>
        ))}
        {item.link && (
          <TextLink href={item.link.href} className="mt-4">
            {item.link.label}
          </TextLink>
        )}
      </div>
    </li>
  )
}

/**
 * The home page, «Det er hjelp å få» (chosen by Trym 2026-11-18 over the «To
 * dører» direction, for its storytelling).
 *
 * Person-led: Olve's portrait whole and large beside his own sentence «Det er
 * hjelp å få.» set as the biggest type on the page; the H1 follows as a
 * smaller line. «Gråsonen» comes second as the one dark band, so the reader
 * who has been told «alt er normalt» meets it early. Then the two doors as
 * equal white plates with ordinary chiropractic under them, the examination
 * with two prints, Om meg, contact beside the location card, and the FAQ.
 * Ochre marks only: short bars, link underlines. Buttons stay petrol.
 *
 * Motion is kept to quiet fades (`rise`, `reveal` in globals.css): many
 * readers here are dizzy, so nothing slides far, pins or moves with the scroll.
 */
export default function HomeTemplate({ content }: { content: HomeContent }) {
  const { hero, motto, doors, general, examination, greyZone, about, captions } = content
  const { portrait, name, titleLong } = site.practitioner
  const [lede1, ...ledeRest] = hero.lede
  const titleLower = titleLong.charAt(0).toLowerCase() + titleLong.slice(1)

  return (
    <>
      {/* Hero: the portrait and his sentence. On a phone a small portrait sits by the name, the big one after the text. */}
      <section className="pb-20 pt-8 md:pb-28 md:pt-12">
        <div className="mx-auto grid max-w-7xl gap-x-20 gap-y-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <figure
            className="rise order-2 w-full max-lg:mx-auto lg:order-1 lg:col-span-5"
            style={{ maxWidth: `${portrait.width}px` }}
          >
            <div
              className="relative overflow-hidden bg-mist"
              style={{ aspectRatio: `${portrait.width} / ${portrait.height}` }}
            >
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                priority
                sizes={`(min-width: 640px) ${portrait.width}px, 100vw`}
                className="object-contain"
              />
            </div>
            <figcaption className="mt-3 text-[0.9375rem] text-muted-foreground">
              <span className="font-serif text-lg text-foreground">{name}</span>, {titleLower}
            </figcaption>
          </figure>

          <div className="order-1 flex flex-col lg:order-2 lg:col-span-7 lg:pt-4">
            <figure className="rise rise-1">
              <blockquote>
                <p className="font-serif text-[3.75rem] font-medium leading-[0.95] tracking-[-0.035em] text-foreground sm:text-[5rem] lg:text-[5.75rem] xl:text-[6.5rem]">
                  {motto.text}
                </p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <div
                  className="relative w-12 shrink-0 overflow-hidden bg-mist lg:hidden"
                  style={{ aspectRatio: `${portrait.width} / ${portrait.height}` }}
                >
                  <Image
                    src={portrait.src}
                    alt=""
                    fill
                    priority
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <Bar className="max-lg:hidden" />
                <span className={cn('text-lg font-semibold', ACCENT.text)}>{name}, kiropraktor</span>
              </figcaption>
            </figure>
            <h1 className="rise rise-2 mt-10 max-w-[30ch] text-display-sm tracking-[-0.01em] text-foreground md:text-[2rem] md:leading-[1.15]">
              {HOME.h1}
            </h1>
            <p className="rise rise-2 order-1 mt-5 max-w-[62ch] text-lg leading-relaxed text-foreground md:text-xl md:leading-[1.6]">
              <RichText text={lede1.text} />
            </p>
            {ledeRest.map((p) => (
              <p
                key={p.text}
                className="rise rise-3 order-3 mt-5 max-w-[62ch] text-lg leading-relaxed text-foreground/85 md:text-xl md:leading-[1.6] lg:order-2"
              >
                <RichText text={p.text} />
              </p>
            ))}
            <div className="rise rise-3 order-2 mt-8 flex flex-col gap-x-6 gap-y-3 sm:flex-row sm:items-center lg:order-3">
              <Button asChild size="lg" className="h-14 px-7 text-lg">
                <a href={bookingHref('hero:forside')} data-hero-cta="">
                  Bestill time
                </a>
              </Button>
              <TextLink href={hero.secondary.href}>{hero.secondary.label}</TextLink>
            </div>
            <p className="rise rise-3 order-4 mt-6 text-base text-muted-foreground">
              Plutselig, kraftig svimmelhet?{' '}
              <Link
                href={SAFETY_HREF}
                className="font-semibold text-fjord-700 underline decoration-fjord-300 underline-offset-4 hover:decoration-fjord-700"
              >
                Når du skal ringe 113
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Gråsonen early: the one dark band, the heading left and his two paragraphs low on the right */}
      <section aria-labelledby={`${greyZone.id}-heading`} className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-12 px-4 py-24 sm:px-6 md:py-32 lg:grid-cols-12 lg:items-end lg:px-8">
          <div className="reveal lg:col-span-7">
            <Bar dark />
            <h2
              id={`${greyZone.id}-heading`}
              className="mt-8 max-w-[14ch] text-[2.75rem] leading-[1.02] tracking-[-0.02em] text-white md:text-[4.5rem] xl:text-[5.75rem]"
            >
              {greyZone.heading}
            </h2>
          </div>
          <div className="reveal reveal-late space-y-6 lg:col-span-5 lg:pb-3">
            {greyZone.body.map((p) => (
              <p key={p.text} className="text-lg leading-relaxed text-white/90 md:text-xl">
                <RichText text={p.text} />
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* What he works with: the two doors as equal plates, ordinary chiropractic under them */}
      <section aria-label="Hva jeg arbeider med" className="py-20 md:py-28">
        <ul className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-8">
          {doors.map((door, i) => (
            <Door key={door.id} door={door} className={cn('reveal', i > 0 && 'reveal-late')} />
          ))}
          <General item={general} />
        </ul>
      </section>

      {/* The examination: text first, the two prints at uneven sizes */}
      <section aria-labelledby={`${examination.id}-heading`} className="bg-mist py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="lg:col-span-5">
            <div className="reveal">
              <Bar />
              <h2
                id={`${examination.id}-heading`}
                className="mt-6 text-display-md text-foreground md:text-display-lg"
              >
                {examination.heading}
              </h2>
              {examination.subheading && (
                <p className="mt-2 font-serif text-[1.5rem] leading-snug text-foreground/75 md:text-[1.75rem]">
                  {examination.subheading}
                </p>
              )}
              {examination.body.map((p) => (
                <p key={p.text} className="mt-6 text-lg leading-relaxed text-foreground md:text-xl">
                  <RichText text={p.text} />
                </p>
              ))}
              {examination.link && (
                <TextLink href={examination.link.href} className="mt-6">
                  {examination.link.label}
                </TextLink>
              )}
            </div>
            <Print
              name="videobriller"
              caption={captions.videobriller}
              width="17rem"
              sizes="300px"
              className="reveal mt-12"
            />
          </div>
          <Print
            name="vog-pasient-oreplansje"
            caption={captions['vog-pasient-oreplansje']}
            sizes="(min-width: 640px) 713px, 100vw"
            className="reveal reveal-late lg:col-span-6 lg:col-start-7 lg:mt-24"
          />
        </div>
      </section>

      {/* Om meg: his story and his promise, the tall print beside */}
      <section aria-labelledby={`${about.id}-heading`} className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="lg:col-span-7 lg:self-center">
            <div className="reveal">
              <h2
                id={`${about.id}-heading`}
                className="text-display-md text-foreground md:text-display-lg"
              >
                {about.heading}
              </h2>
              {about.body.map((p) => (
                <p
                  key={p.text}
                  className="mt-6 max-w-prose text-lg leading-relaxed text-foreground md:text-xl"
                >
                  <RichText text={p.text} />
                </p>
              ))}
            </div>
            <figure className="reveal mt-10">
              <Bar />
              <blockquote className="voice mt-6 max-w-[40ch] text-[1.5rem] leading-[1.25] md:text-[1.75rem]">
                <p>
                  <RichText text={about.promise.text} />
                </p>
              </blockquote>
            </figure>
            {about.link && (
              <TextLink href={about.link.href} className="mt-8">
                {about.link.label}
              </TextLink>
            )}
          </div>
          <Print
            name="olve-ryggsoyle"
            width="20rem"
            sizes="(min-width: 640px) 340px, 80vw"
            className="reveal reveal-late max-lg:mx-auto lg:col-span-4 lg:col-start-9"
          />
        </div>
      </section>

      <HomeContact content={content} source="cta:forside" />
      <HomeFaq faqs={content.faqs} path={pathOf(HOME)} />
    </>
  )
}
