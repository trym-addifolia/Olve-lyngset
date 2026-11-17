import type { Sourced } from './types'

/** Text slot still to be written (renders as a visible amber chip). */
export function ph(label: string, source = 'tekst kommer'): Sourced {
  return { text: `{{FASE_B: ${label}}}`, source }
}

/** Fact the practitioner must confirm before launch (renders visibly, blocks production). */
export function confirm(label: string, source = 'bekreftes av Olve'): Sourced {
  return { text: `{{OLVE_BEKREFT: ${label}}}`, source }
}

/**
 * A whole line whose value is still unconfirmed: "Lead: avklares" with a
 * marker. Empty lead for a bare field value (e.g. a facts row).
 */
export function confirmLine(lead: string, label: string, source = 'bekreftes av Olve'): Sourced {
  const token = `{{OLVE_BEKREFT: ${label} | avklares}}`
  return { text: lead ? `${lead} ${token}` : token, source }
}
