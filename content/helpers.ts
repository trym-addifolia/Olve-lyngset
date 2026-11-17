import type { Sourced } from './types'

/** A sourced line of text; `label` is the short lead shown above it. */
export function t(text: string, source: string, label?: string): Sourced {
  return label ? { text, source, label } : { text, source }
}
