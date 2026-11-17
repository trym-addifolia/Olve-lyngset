/*
 * Launch gate. A build for the production host (www.olvelyngset.no) must not
 * ship while the site still carries unconfirmed facts, photos without
 * consent, or a portrait Olve has not approved.
 *
 * The target host is decided exactly as the build decides it: Next loads
 * NEXT_PUBLIC_SITE_URL from the shell or the .env files for a production
 * build (.env.production, committed, is the noindex preview until launch),
 * and src/lib/siteUrl.ts compares it with site.brand.domain
 * (IS_PRODUCTION_HOST). On the preview host the gate skips, so `npm run
 * check` stays green before launch. `npm run deploy` runs this file first
 * (`npm run launch-gate`), so a deploy to the production host stops here.
 */
import { loadEnvConfig } from '@next/env'
import { describe, expect, it } from 'vitest'

// Vitest runs with NODE_ENV=test, under which Next would read .env.test.
// Load the files a production build reads, then put NODE_ENV back.
const env = process.env as Record<string, string | undefined>
const nodeEnv = env.NODE_ENV
env.NODE_ENV = 'production'
loadEnvConfig(process.cwd(), false, { info: () => {}, error: console.error }, true)
env.NODE_ENV = nodeEnv

// imported after the env is loaded: siteUrl reads it once, at module load
const { BASE_URL, IS_PRODUCTION_HOST } = await import('./siteUrl')
const { CONTENT } = await import('@content/index')
const { PHOTOS } = await import('@/photos')
const { ROUTES } = await import('@/routes')
const { site } = await import('@/site.config')

const PLACEHOLDER = /\{\{(OLVE_BEKREFT|FASE_B):[^}]*\}\}/

/** Every string value under `value`, with its path, that still holds a placeholder. */
function placeholders(value: unknown, path: string): string[] {
  if (typeof value === 'string') return PLACEHOLDER.test(value) ? [`${path}: ${value}`] : []
  if (Array.isArray(value)) return value.flatMap((v, i) => placeholders(v, `${path}[${i}]`))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => placeholders(v, `${path}.${k}`))
  }
  return []
}

describe('launch gate', () => {
  it('reads the host the build targets', () => {
    // a stale siteUrl module (loaded before the env) would silently skip the gate
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      expect(BASE_URL).toBe(process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, ''))
    }
    expect(IS_PRODUCTION_HOST).toBe(new URL(BASE_URL).host === site.brand.domain)
  })

  it('finds the placeholders it is meant to find', () => {
    expect(placeholders({ a: ['{{OLVE_BEKREFT: x | y}}'] }, 'test')).toHaveLength(1)
    expect(placeholders({ a: '{{FASE_B: tekst}}' }, 'test')).toHaveLength(1)
    expect(placeholders({ a: 'ferdig tekst' }, 'test')).toEqual([])
  })

  describe.skipIf(!IS_PRODUCTION_HOST)(`production build for ${BASE_URL}`, () => {
    it('has no unconfirmed facts or unwritten text in content/, routes or site.config', () => {
      expect([
        ...placeholders(CONTENT, 'content'),
        ...placeholders(ROUTES, 'routes'),
        ...placeholders(site, 'site'),
      ]).toEqual([])
    })

    it('has consent for every photo', () => {
      expect(
        Object.entries(PHOTOS)
          .filter(([, p]) => !p.consent)
          .map(([name]) => name),
      ).toEqual([])
    })

    it('has a portrait Olve has approved', () => {
      expect(site.practitioner.portrait.approvedByOlve).toBe(true)
    })
  })
})
