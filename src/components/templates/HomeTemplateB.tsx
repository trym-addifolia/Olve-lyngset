import type { HomeBlock, HomeContent, HomeDoor } from '@content/types'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { ACCENTS } from '@/components/home/accent'
import HomeContact from '@/components/home/HomeContact'
import HomeFaq from '@/components/home/HomeFaq'
import Print from '@/components/home/Print'
import TextLink from '@/components/home/TextLink'
import { Button } from '@/components/ui/button'
import { bookingHref } from '@/lib/booking'
import { cn } from '@/lib/utils'
import { HOME_B, SAFETY_HREF, pathOf } from '@/routes'
import { site } from '@/site.config'

const ACCENT = 'ochre' as const
const a = ACCENTS[ACCENT]

/** A short ochre bar: the mark of this direction, over a section or an entry. */
function Bar({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn('block h-[3px] w-14', dark ? a.markOnDark : a.mark, className)}
    />
  )
}

/**
 * One entry of the editorial list of what Olve works with: the heading set
 * large on the left, the text on the right, no card, no picture. The two main
 * doors are equal; ordinary chiropractic follows as a smaller third entry.
 */
function Entry({ item, size }: { item: HomeDoor | HomeBlock; size: 'main' | 'minor' }) {
  const door = 'lede' in item ? item : null
  const paragraphs = door ? door.body : item.body
  return (
    <li
      className={cn(
        'grid gap-x-16 gap-y-6 lg:grid-cols-12',
        size === 'main' ? 'py-14 md:py-20' : 'py-12 md:py-16',
      )}
    >
      <div className="lg:col-span-6">
        <Bar />
        <h2
          id={`${item.id}-heading`}
          className={cn(
            'mt-6 text-foreground',
            size === 'main'
              ? 'text-[2.375rem] leading-[1.04] tracking-[-0.02em] md:text-[3.25rem] xl:text-[3.75rem]'
              : 'text-display-sm md:text-[2.25rem]',
          )}
        >
          {item.link ? (
            <Link href={item.link.href} className="hover:text-fjord-800">
              {item.heading}
            </Link>
          ) : (
            item.heading
          )}
        </h2>
      </div>
      <div className="lg:col-span-5 lg:col-start-8 lg:pt-12">
        {door && (
          <p className="text-lg leading-relaxed text-foreground md:text-[1.25rem] md:leading-[1.6]">
            <RichText text={door.lede.text} />
          </p>
        )}
        {door?.quote && (
          <p className="voice mt-6 text-[1.5rem] leading-[1.25] md:text-[1.75rem]">
            <RichText text={door.quote.text} />
          </p>
        )}
        {paragraphs.map((p) => (
          <p
            key={p.text}
            className={cn(
              'leading-relaxed text-foreground',
              door ? 'mt-5 text-[1.0625rem] text-foreground/85 md:text-lg' : 'text-lg',
            )}
          >
            <RichText text={p.text} />
          </p>
        ))}
        {item.link && (
          <TextLink href={item.link.href} accent={ACCENT} className="mt-5">
            {item.link.label}
          </TextLink>
        )}
      </div>
    </li>
  )
}

/**
 * Home, direction B «Det er hjelp å få» (ochre accent), served at /retning-b
 * (noindex, outside menus and sitemap). Shares HomeContent with direction A.
 *
 * Person-led: Olve's portrait whole and large beside his own sentence «Det er
 * hjelp å få.» set as the biggest type on the page; the H1 follows as a
 * smaller line. «Gråsonen» comes second as the one dark band, so the reader
 * who has been told «alt er normalt» meets it early. Then what he works with
 * as an editorial list (no cards), the examination with two prints, Om meg,
 * contact with the location card, and the FAQ. Ochre marks only: short bars,
 * link underlines. Buttons stay petrol.
 */
export default function HomeTemplateB({ content }: { content: HomeContent }) {
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
            className="order-2 w-full max-lg:mx-auto lg:order-1 lg:col-span-5"
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
            <figure>
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
                <span className={cn('text-[1.0625rem] font-semibold', a.text)}>
                  {name}, kiropraktor
                </span>
              </figcaption>
            </figure>
            <h1 className="mt-10 max-w-[30ch] text-[1.625rem] leading-[1.15] tracking-[-0.01em] text-foreground md:text-[2rem] lg:mt-10">
              {HOME_B.h1}
            </h1>
            <p className="order-1 mt-5 max-w-[62ch] text-lg leading-relaxed text-foreground md:text-[1.1875rem] md:leading-[1.6]">
              <RichText text={lede1.text} />
            </p>
            {ledeRest.map((p) => (
              <p
                key={p.text}
                className="order-3 mt-5 max-w-[62ch] text-lg leading-relaxed text-foreground/85 md:text-[1.1875rem] md:leading-[1.6] lg:order-2"
              >
                <RichText text={p.text} />
              </p>
            ))}
            <div className="order-2 mt-8 flex flex-col gap-x-6 gap-y-3 sm:flex-row sm:items-center lg:order-3 lg:mt-8">
              <Button asChild size="lg" className="h-14 px-7 text-[1.0625rem]">
                <a href={bookingHref('hero:retning-b')} data-hero-cta="">
                  Bestill time
                </a>
              </Button>
              <TextLink href={hero.secondary.href} accent={ACCENT}>
                {hero.secondary.label}
              </TextLink>
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
        </div>
      </section>

      {/* Gråsonen early: the one dark band */}
      <section aria-labelledby={`${greyZone.id}-heading`} className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <Bar dark />
          <h2
            id={`${greyZone.id}-heading`}
            className="mt-8 max-w-[14ch] text-[2.75rem] leading-[1.02] tracking-[-0.02em] text-white md:text-[4.5rem] xl:text-[5.75rem]"
          >
            {greyZone.heading}
          </h2>
          <div className="mt-14 grid gap-x-16 gap-y-6 md:grid-cols-2 lg:mt-20">
            {greyZone.body.map((p) => (
              <p key={p.text} className="text-lg leading-relaxed text-white/90 md:text-[1.1875rem]">
                <RichText text={p.text} />
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* What he works with: an editorial list, the two doors equal, ordinary chiropractic third */}
      <section aria-label="Hva jeg arbeider med" className="pt-10 md:pt-16">
        <ul className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {doors.map((door) => (
            <Entry key={door.id} item={door} size="main" />
          ))}
          <Entry item={general} size="minor" />
        </ul>
      </section>

      {/* The examination: text first, the two prints at uneven sizes */}
      <section aria-labelledby={`${examination.id}-heading`} className="bg-mist py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="lg:col-span-5">
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
              name="videobriller"
              caption={captions.videobriller}
              width="17rem"
              sizes="300px"
              className="mt-12"
            />
          </div>
          <Print
            name="vog-pasient-oreplansje"
            caption={captions['vog-pasient-oreplansje']}
            sizes="(min-width: 640px) 713px, 100vw"
            className="lg:col-span-6 lg:col-start-7 lg:mt-24"
          />
        </div>
      </section>

      {/* Om meg: his story and his promise, the tall print beside */}
      <section aria-labelledby={`${about.id}-heading`} className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="lg:col-span-7 lg:self-center">
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
              <Bar />
              <blockquote className="voice mt-6 max-w-[36ch] text-[1.625rem] leading-[1.22] md:text-[1.875rem]">
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
          <Print
            name="olve-ryggsoyle"
            width="20rem"
            sizes="(min-width: 640px) 340px, 80vw"
            className="max-lg:mx-auto lg:col-span-4 lg:col-start-9"
          />
        </div>
      </section>

      <HomeContact content={content} accent={ACCENT} source="cta:retning-b" layout="stacked" />
      <HomeFaq faqs={content.faqs} accent={ACCENT} path={pathOf(HOME_B)} schema={false} />
    </>
  )
}
