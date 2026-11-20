/*
 * Draft-mode safety test (security review 2026-11-18):
 *   1. ?utkast=1 renders draft content only on non-indexable builds (SITE_INDEX unset).
 *      On an indexable build (SITE_INDEX=1, launch) it is ignored.
 *   2. Any response rendered in draft mode carries robots noindex, also on an indexable build.
 * Each case runs in a fresh process because the build flag is read at import time.
 *   npx tsx scripts/test-draft.mts
 */
import { execFileSync } from 'node:child_process'
import { rmSync, writeFileSync } from 'node:fs'

const PROBE = 'scripts/.draft-probe.mts'
const probe = `
import { isDraft, pageMetadata } from '../src/components/PageView'
import { PAGES } from '../content/pages'
const sp = (o: Record<string, string>) => Promise.resolve(o)
const on = await isDraft(sp({ utkast: '1' }))
const off = await isDraft(sp({}))
const r = (pageMetadata(PAGES[0], true).robots ?? {}) as { index?: boolean }
console.log(JSON.stringify({ on, off, draftIndex: r.index }))
`
function run(index: boolean) {
  const env = {
    ...process.env,
    SITE_INDEX: index ? '1' : '',
    ...(index
      ? { PRODUCTION_HOST: 'olvelyngset.no', NEXT_PUBLIC_SITE_URL: 'https://olvelyngset.no' }
      : {}),
  }
  writeFileSync(PROBE, probe)
  try {
    const out = execFileSync('npx', ['tsx', '--tsconfig', 'tsconfig.json', PROBE], {
      env,
      encoding: 'utf8',
    })
    return JSON.parse(out.trim().split('\n').pop() ?? '{}') as {
      on: boolean
      off: boolean
      draftIndex?: boolean
    }
  } finally {
    rmSync(PROBE, { force: true })
  }
}

let fails = 0
const expect = (name: string, ok: boolean) => {
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${name}`)
  if (!ok) fails++
}
const preview = run(false)
expect('preview build: ?utkast=1 turns draft on', preview.on === true)
expect('preview build: no param, no draft', preview.off === false)
expect('preview build: draft response is noindex', preview.draftIndex === false)
const launch = run(true)
expect('indexable build: ?utkast=1 is ignored', launch.on === false)
expect('indexable build: a draft-rendered response is still noindex', launch.draftIndex === false)
console.log(fails ? `draft-test: FAIL (${fails})` : 'draft-test: OK (5 cases)')
process.exit(fails ? 1 : 0)
