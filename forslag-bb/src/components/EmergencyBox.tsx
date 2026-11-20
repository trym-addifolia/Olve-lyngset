import type { Block, EmergencyLine } from '@content/types'
import { fact, resolve } from '@/lib/facts'
import { RichText } from './RichText'

type E = Extract<Block, { kind: 'emergency' }>

const tel = () => `tel:${(fact('akutt_boks') ?? '').replace(/\s/g, '')}`

/* The full 113 box. Signal red is used here and in the compact line, nowhere else. */
export function EmergencyBox({ block, draft }: { block: E; draft: boolean }) {
  const sources = [block.source, ...(block.extraSources ?? [])].map((s) => ({
    label: s.label,
    r: resolve(s.href),
  }))
  return (
    <section data-emergency data-nobar aria-labelledby="akutt" className="emergency">
      <h2 id="akutt">{block.heading}</h2>
      <div className="read">
        {block.body.map((t, i) => (
          <RichText key={i} text={t} draft={draft} />
        ))}
      </div>
      <a href={tel()} className="call">
        {resolve(block.callLabel).text}
      </a>
      <p className="src note">
        {sources
          .filter((s) => !s.r.open.length)
          .map((s) => (
            <a key={s.r.text} href={s.r.text} rel="noopener">
              {s.label}
            </a>
          ))}
      </p>
    </section>
  )
}

/* The compact 113 line in the hero, before any booking button. */
export function EmergencyLineView({ line }: { line: EmergencyLine }) {
  const text = resolve(line.text)
  if (text.open.length) return null
  return (
    <p className="e113" data-nobar>
      {text.text} <a href={tel()}>{resolve(line.callLabel).text}</a>
    </p>
  )
}
