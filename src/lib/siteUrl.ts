/*
 * Canonical absolute base URL for metadata, JSON-LD, sitemap and robots.
 *
 * Rule (pitfall P1 in the template extraction): the production origin comes
 * from env ONLY (NEXT_PUBLIC_SITE_URL, set per build in .env.production). No
 * literal domain anywhere in src/. The workers.dev preview can therefore never
 * claim the production domain, and the index switch (IS_PRODUCTION_HOST) keys
 * off the same comparison.
 */
import { site } from '@/site.config'

function resolveBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  return 'http://localhost:3077'
}

export const BASE_URL = resolveBaseUrl()

/** Host the site is meant to live on; declared once in site.config.ts. */
export const PRODUCTION_HOST: string = site.brand.domain

/**
 * True only when this build serves the production host. Everything else
 * (localhost, *.workers.dev) is noindex in meta, robots and sitemap.
 */
export const IS_PRODUCTION_HOST: boolean = (() => {
  try {
    return new URL(BASE_URL).host === PRODUCTION_HOST
  } catch {
    return false
  }
})()

export const ALLOW_INDEX: boolean = IS_PRODUCTION_HOST

export function absUrl(path: string): string {
  return `${BASE_URL}${path}`
}
