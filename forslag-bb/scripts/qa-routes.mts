/*
 * Route gate: every route answers 200 with exactly one H1, the slash-less form redirects to
 * the slash form, the sitemap lists every route, robots and 404 behave, and the preview is noindex.
 *   npx tsx scripts/qa-routes.mts http://localhost:3141
 */
import { ROUTES } from '../src/routes'

const base = (process.argv[2] ?? '').replace(/\/$/, '')
if (!base) {
  console.log('usage: qa-routes.mts <baseUrl>')
  process.exit(2)
}
let failures = 0
const rows: string[] = []
async function expect(
  path: string,
  status: number,
  check?: (r: Response, body: string) => string | null,
) {
  const res = await fetch(base + path, { redirect: 'manual' })
  const body = status === 200 ? await res.text() : ''
  let note = check ? check(res, body) : null
  if (res.status !== status) note = `expected ${status}`
  const ok = res.status === status && !note
  if (!ok) failures++
  rows.push(`| ${path} | ${res.status} | ${ok ? 'OK' : `FAIL ${note ?? ''}`} |`)
}
const oneH1 = (_r: Response, body: string) => {
  const n = (body.match(/<h1[\s>]/g) ?? []).length
  return n === 1 ? null : `${n} h1`
}
for (const r of ROUTES) {
  await expect(r.path, 200, oneH1)
  if (r.path !== '/')
    await expect(r.path.replace(/\/$/, ''), 308, (res) =>
      (res.headers.get('location') ?? '').endsWith(r.path)
        ? null
        : `location ${res.headers.get('location')}`,
    )
  await expect(`${r.path}?utkast=1`, 200, oneH1)
}
await expect('/sitemap.xml', 200, (_r, body) => {
  const missing = ROUTES.filter((r) => !body.includes(`${r.path}<`)).map((r) => r.path)
  return missing.length ? `sitemap missing ${missing.join(',')}` : null
})
await expect('/robots.txt', 200, (_r, body) =>
  /Disallow: \/\s*$/m.test(body) || process.env.EXPECT_INDEX === '1'
    ? null
    : 'robots does not disallow',
)
await expect('/', 200, (res, body) => {
  if (process.env.EXPECT_INDEX === '1') return null
  const header = res.headers.get('x-robots-tag') ?? ''
  const meta = /<meta name="robots" content="noindex/.test(body)
  return header.includes('noindex') && meta ? null : `noindex header=${header} meta=${meta}`
})
await expect('/llms.txt', 200, (_r, body) =>
  ROUTES.every((r) => body.includes(r.path)) ? null : 'llms.txt misses a route',
)
await expect('/finnes-ikke/', 404)
console.log('| Path | Status | Result |\n|---|---|---|')
console.log(rows.join('\n'))
console.log(`\nRESULT: failures=${failures}`)
process.exit(failures ? 1 : 0)
