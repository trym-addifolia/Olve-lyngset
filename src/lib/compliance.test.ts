// src/lib/compliance.test.ts
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { site } from '@/site.config'

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? files(p) : /\.(ts|tsx)$/.test(p) ? [p] : []
  })
}
const TEXT_FILES = [...files('content'), 'src/routes.ts', 'src/site.config.ts']

describe('compliance', () => {
  it.each(TEXT_FILES)('%s has no en or em dash', (f) => {
    expect(readFileSync(f, 'utf8')).not.toMatch(/[\u2013\u2014]/)
  })
  it.each(TEXT_FILES)('%s has no banned word', (f) => {
    const text = readFileSync(f, 'utf8').toLowerCase()
    for (const w of site.compliance.bannedWords) {
      if (f.endsWith('site.config.ts')) continue
      expect(text, w).not.toContain(w)
    }
  })
})
