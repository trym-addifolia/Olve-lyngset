import type { ReactNode } from 'react'
import UnconfirmedMarker from '@/components/UnconfirmedMarker'

const TOKEN = /(\{\{[A-Z_]+:[^}]*\}\})/g
const TOKEN_PARTS = /^\{\{([A-Z_]+):\s*([^}|]*?)\s*(?:\|\s*([^}]*?)\s*)?\}\}$/

/**
 * An unconfirmed fact. With `visning` the value reads as normal text with a
 * dotted underline; without it only the raised marker shows. A tap on the
 * marker opens the label in place (UnconfirmedMarker); it does not jump to
 * the #avklaringer list. PreviewNotes swaps the "*" for a running number
 * after mount. Never hidden: title, marker and sr-only text carry the label.
 */
export function Unconfirmed({ label, visning }: { label: string; visning?: string }) {
  return (
    <span
      data-placeholder="OLVE_BEKREFT"
      data-label={label}
      title={`Avklares med Olve: ${label}`}
      className="scroll-mt-28"
    >
      {visning ? (
        <span className="underline decoration-dotted decoration-foreground/40 underline-offset-4">
          {visning}
        </span>
      ) : null}
      <UnconfirmedMarker label={label} />
    </span>
  )
}

/**
 * Renders content text and turns {{OLVE_BEKREFT: etikett | visning}} into
 * <Unconfirmed>. {{FASE_B: ...}} keeps the visible amber chip. Real text
 * passes through unchanged.
 */
export default function RichText({ text }: { text: string }): ReactNode {
  const parts = text.split(TOKEN)
  if (parts.length === 1) return text
  return parts.map((part, i) => {
    const m = TOKEN_PARTS.exec(part)
    if (!m) return part
    const [, kind, label, visning] = m
    if (kind === 'OLVE_BEKREFT') {
      return <Unconfirmed key={i} label={label} visning={visning || undefined} />
    }
    return (
      <span key={i} className="placeholder" data-placeholder={kind}>
        Tekst kommer: {label}
        {visning ? ` (${visning})` : null}
      </span>
    )
  })
}
