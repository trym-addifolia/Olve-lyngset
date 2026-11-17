import { describe, expect, it } from 'vitest'
import { MAKS_TEKST, NyKommentarSchema } from './typer'

const plassering = {
  side: '/behandling',
  tekst: 'Krystallsyke behandles med hodemanøvrer.',
  prefiks: '',
  suffiks: '',
  blokk: 'p',
  overskrift: 'Behandling',
}

describe('NyKommentarSchema', () => {
  it('accepts a valid comment and trims the text', () => {
    const r = NyKommentarSchema.safeParse({ plassering, kommentar: '  Bytt ord  ', forslag: '' })
    expect(r.success).toBe(true)
    expect(r.success && r.data.kommentar).toBe('Bytt ord')
  })

  it('rejects an empty comment', () => {
    expect(NyKommentarSchema.safeParse({ plassering, kommentar: '   ', forslag: '' }).success).toBe(false)
  })

  it('rejects a comment over the limit', () => {
    const lang = 'a'.repeat(MAKS_TEKST + 1)
    expect(NyKommentarSchema.safeParse({ plassering, kommentar: lang, forslag: '' }).success).toBe(false)
  })

  it('rejects a page path that is not a path', () => {
    const feil = { ...plassering, side: 'https://example.com/' }
    expect(NyKommentarSchema.safeParse({ plassering: feil, kommentar: 'x', forslag: '' }).success).toBe(false)
  })
})
