// src/lib/compliance.test.ts
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { site } from '@/site.config'

/** Every source file under a directory, tests excluded. */
function files(dir: string, ext: RegExp): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) return files(p, ext)
    return ext.test(p) && !/\.test\.tsx?$/.test(p) ? [p] : []
  })
}

/** All of src/ (.ts, .tsx) and all of content/, page text and code alike. */
const TEXT_FILES = [...files('src', /\.tsx?$/), ...files('content', /\.[a-z]+$/)]

/**
 * The text a file is checked by. site.config.ts names the banned words in
 * compliance.bannedWords; that array alone is exempt, the rest of the file
 * is checked like any other.
 */
function checkedText(f: string): string {
  const text = readFileSync(f, 'utf8')
  return f.replace(/\\/g, '/').endsWith('src/site.config.ts')
    ? text.replace(/bannedWords:\s*\[[^\]]*\]/, 'bannedWords: []')
    : text
}

describe('compliance', () => {
  it('scans the whole site', () => {
    expect(TEXT_FILES.length).toBeGreaterThan(20)
    expect(TEXT_FILES.map((f) => f.replace(/\\/g, '/'))).toContain('src/site.config.ts')
  })
  it.each(TEXT_FILES)('%s has no en or em dash', (f) => {
    expect(readFileSync(f, 'utf8')).not.toMatch(/[\u2013\u2014]/)
  })
  it.each(TEXT_FILES)('%s has no banned word', (f) => {
    const text = checkedText(f).toLowerCase()
    for (const w of site.compliance.bannedWords) {
      expect(text, w).not.toContain(w)
    }
  })
  it('exempts only the bannedWords array in site.config.ts', () => {
    const stripped = checkedText('src/site.config.ts')
    expect(stripped).toContain('bannedWords: []')
    expect(stripped.length).toBeGreaterThan(readFileSync('src/site.config.ts', 'utf8').length / 2)
  })
})
