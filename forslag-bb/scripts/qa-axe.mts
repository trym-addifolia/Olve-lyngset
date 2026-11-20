/*
 * Axe gate: every route x {375, 1440}; fails on serious/critical violations.
 *   npx tsx scripts/qa-axe.mts <baseUrl>
 */
import { AxeBuilder } from '@axe-core/playwright'
import { chromium } from 'playwright'
import { ROUTES } from '../src/routes'

const base = (process.argv[2] ?? '').replace(/\/$/, '')
const VIEWPORTS = [
  { name: '375', width: 375, height: 812 },
  { name: '1440', width: 1440, height: 900 },
]

const browser = await chromium.launch()
let bad = 0
for (const vp of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
  const page = await context.newPage()
  for (const r of ROUTES) {
    const path = r.path
    await page.goto(base + path, { waitUntil: 'networkidle' })
    const results = await new AxeBuilder({ page }).analyze()
    const seriousUp = results.violations.filter((v) =>
      ['serious', 'critical'].includes(v.impact ?? ''),
    )
    if (seriousUp.length) {
      bad += seriousUp.length
      for (const v of seriousUp) {
        console.log(
          `  ${vp.name} ${path}: [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`,
        )
        for (const n of v.nodes.slice(0, 2)) console.log(`      ${n.target.join(' ')}`)
      }
    } else {
      console.log(`  ok ${path} @ ${vp.name}`)
    }
  }
  await context.close()
}
await browser.close()
console.log(`\nRESULT: serious/critical violations=${bad}`)
process.exit(bad > 0 ? 1 : 0)
