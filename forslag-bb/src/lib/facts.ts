import register from '@content/facts.json'

type Fact = {
  value: string
  status: 'bekreftet' | 'ubekreftet'
  blocks: 'bygg' | 'preview' | 'lansering'
  type?: 'verdi' | 'paastand'
  ask?: string
  source?: string
}

const FACTS = register as Record<string, Fact>
const TOKEN = /\{\{(fakta|bekreft):([a-z0-9_]+)\}\}/g

function entry(key: string): Fact {
  const f = FACTS[key]
  if (!f) throw new Error(`Unknown fact «${key}» (content/facts.json)`)
  return f
}

/** The value of a confirmed fact, or null while it is unconfirmed (the field is then left out). */
export function fact(key: string): string | null {
  const f = entry(key)
  return f.status === 'bekreftet' && f.value !== '' ? f.value : null
}

export type Resolved = { text: string; open: string[] }

/**
 * Resolves fakta tokens to the value and drops bekreft tokens. `open` lists every
 * unconfirmed fact the string depends on; the caller leaves the whole string out
 * of the normal view when it is not empty, and marks it under ?utkast=1.
 */
export function resolve(text: string): Resolved {
  const open: string[] = []
  const out = text.replace(TOKEN, (_m, kind: string, key: string) => {
    const f = entry(key)
    if (f.status !== 'bekreftet') open.push(key)
    if (kind === 'bekreft') return ''
    return f.value === '' ? '…' : f.value
  })
  return { text: out, open: [...new Set(open)] }
}

/** For titles, metadata and schema: must not depend on anything unconfirmed. */
export function plain(text: string): string {
  const r = resolve(text)
  if (r.open.length)
    throw new Error(`«${text.slice(0, 60)}» uses unconfirmed facts: ${r.open.join(', ')}`)
  return r.text
}

/** For optional fields (schema, header): the resolved text, or null when it depends on something open. */
export function plainOrNull(text: string): string | null {
  const r = resolve(text)
  return r.open.length ? null : r.text
}

export function openFacts(): { key: string; ask: string; blocks: string }[] {
  return Object.entries(FACTS)
    .filter(([, f]) => f.status === 'ubekreftet')
    .map(([key, f]) => ({ key, ask: f.ask ?? '', blocks: f.blocks }))
}
