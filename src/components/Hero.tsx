import { PAGES } from '@content/pages'
import { PHOTOS, SITE } from '@content/site'
import type { Page } from '@content/types'
import Image from 'next/image'
import Link from 'next/link'
import { resolve } from '@/lib/facts'
import { pathOf } from '@/lib/site-url'
import { Button, PhoneLink } from './Buttons'
import { EmergencyLineView } from './EmergencyBox'
import { Picker } from './Picker'
import { RichText } from './RichText'
import { Visual } from './Visual'

function Crumbs({ page }: { page: Page }) {
  const parent = page.parent ? PAGES.find((p) => p.slug === page.parent) : undefined
  return (
    <nav aria-label="Brødsmuler" className="crumb">
      <Link href="/">{SITE.breadcrumbHome}</Link>
      <span className="sep" aria-hidden="true">
        /
      </span>
      {parent && (
        <>
          <Link href={pathOf(parent.slug)}>{parent.navLabel}</Link>
          <span className="sep" aria-hidden="true">
            /
          </span>
        </>
      )}
      <span aria-current="page">{page.navLabel}</span>
    </nav>
  )
}

/* One filled button; the phone number is a text link beside it. */
export function Ctas({ page }: { page: Page }) {
  const c = page.heroCtas
  if (!c) return null
  return (
    <div className="cta" data-nobar>
      {c.primary && <Button link={c.primary} from={page.slug} />}
      {c.phone && <PhoneLink only={!c.primary} />}
      {c.secondary && <Button link={c.secondary} quiet from={page.slug} />}
    </div>
  )
}

function Chips() {
  return (
    <ul className="chips">
      {SITE.chips.map((c) => {
        const r = resolve(c.text)
        if (r.open.length) return null
        return <li key={c.text}>{r.text}</li>
      })}
    </ul>
  )
}

/*
 * The hero photo, whole at every width: right of the text from 1024, beside the supporting line
 * (home) or after the button (other pages) below. SITE.heroPhoto picks the cutout or the frame.
 * On «om» the page's own photo takes its place and carries the gate mark.
 */
function Photo({ own }: { own: boolean }) {
  const variant = own ? 'own' : SITE.heroPhoto
  const p = own ? PHOTOS.portrett : PHOTOS[SITE.heroPhoto === 'utklipp' ? 'utklipp' : 'fotograf']
  return (
    <div className={`hero-photo ${variant}`}>
      <figure className="ground">
        <Image
          src={p.src}
          width={p.width}
          height={p.height}
          alt={resolve(p.alt).text}
          priority
          sizes="(min-width: 1024px) 380px, 170px"
          {...(own ? { 'data-portrait': true } : {})}
        />
      </figure>
      <p className="by">
        {resolve(SITE.rail.caption).text}
        <span className="soft">{resolve(SITE.rail.place).text}</span>
      </p>
    </div>
  )
}

/*
 * One job per first screen (DESIGN §1): heading, one paragraph, the way in, one button, the photo.
 * The H1 is first in the DOM; a 113 line, where a page has one, comes before the booking button.
 */
export function Hero({ page, draft }: { page: Page; draft: boolean }) {
  const home = page.slug === ''
  const own = page.heroVisual?.type === 'photo' && page.heroVisual.name === 'portrett'
  const support = page.support ? resolve(page.support).text : ''
  // the supporting sentence is lifted out of the lede; the rest of the lede follows below the fold
  const rest = support
    ? page.lede.map((t) => resolve(t).text.replace(support, '').replace(/\s+/g, ' ').trim())
    : []
  return (
    <section className={home ? 'hero home-hero' : 'hero'} data-section>
      <div className="hero-text">
        {page.slug && <Crumbs page={page} />}
        <h1>{page.h1}</h1>
        <div className="lede">
          {support ? (
            <p>{support}</p>
          ) : (
            page.lede.map((t, i) => <RichText key={i} text={t} draft={draft} />)
          )}
        </div>
        {page.picker && <Picker picker={page.picker} />}
        {page.emergencyLine && <EmergencyLineView line={page.emergencyLine} />}
        <Ctas page={page} />
      </div>
      <Photo own={own} />
      {(rest.length > 0 || page.chips) && (
        <div className="hero-more">
          {rest.map((t) => (
            <p key={t} className="read">
              {t}
            </p>
          ))}
          {page.chips && <Chips />}
        </div>
      )}
      {!own && page.heroVisual && <Visual visual={page.heroVisual} draft={draft} />}
    </section>
  )
}
