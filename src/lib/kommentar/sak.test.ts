import { describe, expect, it } from 'vitest'
import { lesSak, sakTekst, sakTittel, sideLenke, statusFra } from './sak'
import type { NyKommentar } from './typer'

const BASE = 'https://krystallsyken.hei-0de.workers.dev'

const ny: NyKommentar = {
  plassering: {
    side: '/behandling',
    tekst: 'Epleys manøver (bakre buegang)',
    prefiks: 'For ',
    suffiks: ' bruker jeg',
    blokk: 'p',
    overskrift: 'Behandling',
  },
  kommentar: 'Skriv heller «Epley-manøveren».',
  forslag: 'Epley-manøveren',
}

describe('sakTittel', () => {
  it('puts the page first and keeps short comments whole', () => {
    expect(sakTittel(ny)).toBe('[/behandling] Skriv heller «Epley-manøveren».')
  })

  it('cuts long comments at 60 characters', () => {
    const lang = { ...ny, kommentar: 'a'.repeat(100) }
    expect(sakTittel(lang)).toBe(`[/behandling] ${'a'.repeat(60)}…`)
  })
})

describe('sideLenke', () => {
  it('links to the page with a text fragment, hyphens and parentheses encoded', () => {
    expect(sideLenke(`${BASE}/`, '/behandling', 'Epley-x (y)')).toBe(
      `${BASE}/behandling#:~:text=Epley%2Dx%20%28y%29`,
    )
  })

  it('links to the page only when there is no text', () => {
    expect(sideLenke(BASE, '/kontakt', '')).toBe(`${BASE}/kontakt`)
  })
})

describe('sakTekst and lesSak', () => {
  it('round-trips the comment through the issue body', () => {
    expect(lesSak(sakTekst(ny, BASE))).toEqual(ny)
  })

  it('survives text that would end an HTML comment', () => {
    const farlig = { ...ny, kommentar: 'a --> b -- c } -->\n"sitat"', forslag: '<!-- x -->' }
    const tekst = sakTekst(farlig, BASE)
    const blokk = tekst.slice(tekst.indexOf('<!-- kommentar-data '))
    expect(blokk.indexOf('-->')).toBe(blokk.length - 3)
    expect(lesSak(tekst)).toEqual(farlig)
  })

  it('shows the marked text as a quote and the comment in the body', () => {
    const tekst = sakTekst(ny, BASE)
    expect(tekst).toContain('> Epleys manøver (bakre buegang)')
    expect(tekst).toContain('Skriv heller «Epley-manøveren».')
  })

  it('says «hele siden» when no text is marked', () => {
    const hel = { ...ny, plassering: { ...ny.plassering, tekst: '', blokk: '' } }
    expect(sakTekst(hel, BASE)).toContain('Gjelder hele siden.')
  })

  it('returns null for bodies without valid data', () => {
    expect(lesSak(null)).toBeNull()
    expect(lesSak('vanlig sak')).toBeNull()
    expect(lesSak('<!-- kommentar-data {"x":1} -->')).toBeNull()
    expect(lesSak('<!-- kommentar-data {ikke json} -->')).toBeNull()
  })
})

describe('statusFra', () => {
  it.each([
    ['open', [], 'venter'],
    ['open', ['olve-kommentar', 'godkjent'], 'godkjent'],
    ['closed', ['godkjent'], 'endret'],
    ['open', ['avvist'], 'avvist'],
    ['closed', ['avvist'], 'avvist'],
    ['closed', [], 'lukket'],
  ] as const)('%s with %j is %s', (state, etiketter, status) => {
    expect(statusFra(state, [...etiketter])).toBe(status)
  })
})
