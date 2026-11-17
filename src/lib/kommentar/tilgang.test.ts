import { describe, expect, it } from 'vitest'
import { cookieVerdi, harTilgang, likeStrenger } from './tilgang'

describe('likeStrenger', () => {
  it('compares strings', () => {
    expect(likeStrenger('abc', 'abc')).toBe(true)
    expect(likeStrenger('abc', 'abd')).toBe(false)
    expect(likeStrenger('abc', 'abcd')).toBe(false)
  })
})

describe('cookieVerdi', () => {
  it('is a stable 64-character hex hash that differs per secret', async () => {
    const a = await cookieVerdi('hemmelig-1')
    expect(a).toMatch(/^[0-9a-f]{64}$/)
    expect(await cookieVerdi('hemmelig-1')).toBe(a)
    expect(await cookieVerdi('hemmelig-2')).not.toBe(a)
  })

  it('never equals the secret itself', async () => {
    expect(await cookieVerdi('hemmelig-1')).not.toContain('hemmelig')
  })
})

describe('harTilgang', () => {
  it('lets the right cookie in and keeps everything else out', async () => {
    const riktig = await cookieVerdi('hemmelig-1')
    expect(await harTilgang(riktig, 'hemmelig-1')).toBe(true)
    expect(await harTilgang(riktig, 'hemmelig-2')).toBe(false)
    expect(await harTilgang('hemmelig-1', 'hemmelig-1')).toBe(false)
    expect(await harTilgang(undefined, 'hemmelig-1')).toBe(false)
    expect(await harTilgang(riktig, undefined)).toBe(false)
  })
})
