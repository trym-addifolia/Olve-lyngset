import { SITE } from '@content/site'
import type { Block, Faq, Page } from '@content/types'
import Link from 'next/link'
import { resolve } from '@/lib/facts'
import { blockId } from '@/lib/sections'
import { Button, PhoneLink, TextLink } from './Buttons'
import { Drawing } from './Drawing'
import { EmergencyBox } from './EmergencyBox'
import { DiagnosisLine } from './Picker'
import { DraftMark, RichText, anyVisible, visible } from './RichText'
import { Visual } from './Visual'

function Paras({
  items,
  draft,
  className,
}: { items: string[]; draft: boolean; className?: string }) {
  return (
    <div className={className}>
      {items.map((t, i) => (
        <RichText key={i} text={t} draft={draft} />
      ))}
    </div>
  )
}

function Steps({ items, draft, row = false }: { items: string[]; draft: boolean; row?: boolean }) {
  return (
    <ol className={`steps ${row ? 'row' : ''}`}>
      {visible(items, draft).map((t) => (
        <RichText key={t} as="li" text={t} draft={draft} />
      ))}
    </ol>
  )
}

function PaneLink({
  href,
  external,
  children,
}: { href: string; external?: boolean; children: React.ReactNode }) {
  const r = resolve(href)
  if (r.open.length) return null
  return external || /^#/.test(r.text) ? (
    <a href={r.text} className="pane" {...(external ? { rel: 'noopener' } : {})}>
      {children}
    </a>
  ) : (
    <Link href={r.text} className="pane">
      {children}
    </Link>
  )
}

export function Blocks({ page, draft }: { page: Page; draft: boolean }) {
  return (
    <>
      {page.blocks.map((b, i) =>
        b.kind === 'faq' ? (
          page.faqs?.length ? (
            <Faqs key={i} faqs={page.faqs} draft={draft} />
          ) : null
        ) : (
          <BlockView key={i} block={b} draft={draft} from={page.slug} picker={page.picker} />
        ),
      )}
    </>
  )
}

function BlockView({
  block: b,
  draft,
  from,
  picker,
}: {
  block: Exclude<Block, { kind: 'faq' }>
  draft: boolean
  from: string
  picker?: Page['picker']
}) {
  const id = blockId(b) ?? undefined
  switch (b.kind) {
    case 'emergency':
      return <EmergencyBox block={b} draft={draft} />

    case 'text': {
      const texts = [...b.body, ...(b.list ?? [])]
      if (!anyVisible(texts, draft)) return null
      return (
        <section id={id} aria-labelledby={`${id}-h`}>
          <div className={`media ${b.visual ? 'has-visual' : ''}`}>
            <div>
              <h2 id={`${id}-h`}>{b.heading}</h2>
              {b.quote && <p className="quote">{resolve(b.quote).text}</p>}
              <Paras items={b.body} draft={draft} className="read" />
              {b.list && (
                <ul className="list two" style={{ marginTop: 12 }}>
                  {visible(b.list, draft).map((t) => (
                    <RichText key={t} as="li" text={t} draft={draft} className="pane" />
                  ))}
                </ul>
              )}
              {b.link && (
                <p style={{ marginTop: 12 }}>
                  <TextLink link={b.link} />
                </p>
              )}
            </div>
            {b.visual && <Visual visual={b.visual} draft={draft} />}
          </div>
        </section>
      )
    }

    case 'entries':
      return (
        <section aria-label={b.heading} className="doors">
          {b.items.map((it) => (
            <article key={it.heading}>
              {it.visual && <Visual visual={it.visual} draft={draft} />}
              <h2>{it.heading}</h2>
              <Paras items={it.body} draft={draft} className="read" />
              <p style={{ marginTop: 12 }}>
                <TextLink link={it.link} />
              </p>
            </article>
          ))}
          {picker && <DiagnosisLine picker={picker} />}
        </section>
      )

    case 'conditions':
      return (
        <section id={id} aria-labelledby={`${id}-h`}>
          <div className={`media ${b.visual ? 'has-visual' : ''}`}>
            <div>
              <h2 id={`${id}-h`}>{b.heading}</h2>
              <Paras items={b.intro} draft={draft} className="read" />
            </div>
            {b.visual && <Visual visual={b.visual} draft={draft} />}
          </div>
          <ul className="list two" style={{ marginTop: 20 }}>
            {b.items.map((it) => (
              <li key={it.name} className={it.external ? 'out' : undefined}>
                <PaneLink href={it.href} external={it.external}>
                  <b>{it.name}</b>
                  <span className="hint">{resolve(it.hint).text}</span>
                </PaneLink>
              </li>
            ))}
          </ul>
        </section>
      )

    case 'profile':
      return (
        <section id={id} aria-labelledby={`${id}-h`}>
          <h2 id={`${id}-h`}>{b.heading}</h2>
          <Paras items={b.body} draft={draft} className="read" />
          {b.link && (
            <p style={{ marginTop: 12 }}>
              <TextLink link={b.link} />
            </p>
          )}
        </section>
      )

    case 'windows': {
      const statement = b.statement ? resolve(b.statement) : null
      return (
        <section id={id} aria-labelledby={`${id}-h`} className="night">
          {statement && <p className="say">{statement.text}</p>}
          <div className={b.photo ? 'split' : undefined}>
            <div>
              <h2 id={`${id}-h`}>{b.heading}</h2>
              <Paras items={b.body} draft={draft} className="read" />
            </div>
            {b.photo && (
              <Visual visual={b.photo} draft={draft} sizes="(min-width: 768px) 380px, 100vw" />
            )}
          </div>
          <ul className="lit">
            {b.panes.map((p) => {
              const inner = (
                <>
                  <Drawing name={p.drawing} />
                  <b>{p.name}</b>
                  <span className="hint">{resolve(p.hint).text}</span>
                </>
              )
              return (
                <li key={p.name}>
                  {from === 'undersokelse' && p.anchor ? (
                    <a href={`#${p.anchor}`} className="pane">
                      {inner}
                    </a>
                  ) : (
                    <div className="pane">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
          {b.closing && <p className="closing">{resolve(b.closing).text}</p>}
          {b.link && (
            <p>
              <TextLink link={b.link} />
            </p>
          )}
        </section>
      )
    }

    case 'round':
      return (
        <section id={id} aria-labelledby={`${id}-h`}>
          <h2 id={`${id}-h`}>{b.heading}</h2>
          <Paras items={b.body} draft={draft} className="read" />
          <div className="loop">
            <Visual
              visual={{
                type: 'drawing',
                name: 'syklus',
                caption: 'Undersøk, prøv, og undersøk på nytt.',
              }}
              draft={draft}
            />
            <ol className="steps">
              {b.steps.map((s) => (
                <li key={s.name}>
                  <span>
                    <b>{s.name}</b> {resolve(s.text).text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          {b.goals && (
            <>
              <p className="label">{b.goalsHeading}</p>
              <ul className="goals">
                {visible(b.goals, draft).map((g) => (
                  <RichText key={g} as="li" text={g} draft={draft} />
                ))}
              </ul>
            </>
          )}
          {b.closing && <RichText text={b.closing} draft={draft} className="read" />}
        </section>
      )

    case 'rows': {
      if (
        !anyVisible(
          b.rows.map((r) => r.value),
          draft,
        )
      )
        return null
      return (
        <section id={id} aria-labelledby={`${id}-h`}>
          <h2 id={`${id}-h`}>{b.heading}</h2>
          <div className={`media rows-media ${b.visual ? 'has-visual' : ''}`}>
            <div>
              <dl className="rows">
                {b.rows.map((r0) => {
                  const r = resolve(r0.value)
                  if (r.open.length && !draft) return null
                  const isUrl = /^https?:\/\//.test(r.text)
                  return (
                    <div key={r0.label} className={r.open.length ? 'draft' : undefined}>
                      <dt>{r0.label}</dt>
                      <dd>
                        {isUrl ? <a href={r.text}>{r.text}</a> : r.text}
                        {r.open.length > 0 && <DraftMark keys={r.open} />}
                      </dd>
                    </div>
                  )
                })}
              </dl>
              {b.note && <Paras items={b.note} draft={draft} className="read soft" />}
              {b.link && (
                <p className="more">
                  <TextLink link={b.link} />
                </p>
              )}
            </div>
            {b.visual && <Visual visual={b.visual} draft={draft} />}
          </div>
        </section>
      )
    }

    case 'next': {
      const note = b.note ? resolve(b.note) : null
      return (
        <section id={id} aria-labelledby={`${id}-h`} className="next" data-nobar>
          <h2 id={`${id}-h`}>{b.heading}</h2>
          <Steps items={b.steps} draft={draft} row />
          <Paras items={b.body} draft={draft} className="body" />
          <div className="cta">
            {b.primary && <Button link={b.primary} from={from} />}
            {b.phone && <PhoneLink only={!b.primary} />}
          </div>
          {b.secondary && (
            <p className="more">
              <TextLink link={b.secondary} />
            </p>
          )}
          {note && !note.open.length && <p className="note">{note.text}</p>}
        </section>
      )
    }

    case 'siblings':
      return (
        <section id={id} aria-labelledby={`${id}-h`}>
          <h2 id={`${id}-h`}>{b.heading}</h2>
          <ul className="list two">
            {b.items.map((it) => (
              <li key={it.href}>
                <PaneLink href={it.href}>
                  {it.drawing && <Drawing name={it.drawing} />}
                  <b>{it.name}</b>
                  <span className="hint">{resolve(it.hint).text}</span>
                </PaneLink>
              </li>
            ))}
          </ul>
        </section>
      )

    case 'closing':
      return (
        <section id={id} aria-labelledby={`${id}-h`} data-nobar>
          <h2 id={`${id}-h`}>{b.heading}</h2>
          <Paras items={b.body} draft={draft} className="read" />
          {b.visual && <Visual visual={b.visual} draft={draft} className="closing-plate" />}
          <div className="cta" style={{ marginTop: 16 }}>
            {b.primary && <Button link={b.primary} from={from} />}
            {b.phone && <PhoneLink only={!b.primary} />}
          </div>
          {b.link && (
            <p style={{ marginTop: 12 }}>
              <TextLink link={b.link} />
            </p>
          )}
        </section>
      )
  }
}

/* Questions fold: the page stays short for a tired reader, the answers stay in the document. */
export function Faqs({ faqs, draft }: { faqs: Faq[]; draft: boolean }) {
  const shown = faqs.filter((f) => anyVisible(f.answer, draft))
  if (!shown.length) return null
  return (
    <section id="sporsmal" className="faq" aria-labelledby="sporsmal-h">
      <h2 id="sporsmal-h">{SITE.faqHeading}</h2>
      {shown.map((f) => (
        <details key={f.question}>
          <summary>{f.question}</summary>
          <Paras items={f.answer} draft={draft} />
        </details>
      ))}
    </section>
  )
}
