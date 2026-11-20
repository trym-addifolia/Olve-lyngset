import { SITE } from '@content/site'
import type { ElementType } from 'react'
import { resolve } from '@/lib/facts'

type Props = { text: string; draft: boolean; as?: ElementType; className?: string }

/**
 * One paragraph. If it depends on an unconfirmed fact, it is left out of the
 * normal view entirely, and shown with a mark under ?utkast=1.
 */
export function RichText({ text, draft, as: Tag = 'p', className }: Props) {
  const r = resolve(text)
  if (r.open.length && !draft) return null
  const cls = [className, r.open.length ? 'draft' : ''].filter(Boolean).join(' ') || undefined
  return (
    <Tag className={cls}>
      {r.text}
      {r.open.length > 0 && <DraftMark keys={r.open} />}
    </Tag>
  )
}

export function DraftMark({ keys }: { keys: string[] }) {
  return (
    <span data-utkast title={keys.join(', ')} className="mark">
      {SITE.draft.mark}: {keys.join(', ')}
    </span>
  )
}

/** true when at least one of the strings will render in this view */
export function anyVisible(texts: string[], draft: boolean) {
  return texts.some((t) => draft || resolve(t).open.length === 0)
}

/** the strings that render in this view */
export function visible(texts: string[], draft: boolean) {
  return texts.filter((t) => draft || resolve(t).open.length === 0)
}
