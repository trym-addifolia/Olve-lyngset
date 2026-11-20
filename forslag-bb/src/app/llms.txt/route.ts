import { PAGES } from '@content/pages'
import { LLMS, SITE } from '@content/site'
import { plain } from '@/lib/facts'
import { SITE_URL, pathOf } from '@/lib/site-url'

export const dynamic = 'force-static'

/* llms.txt: who and where, the pages in groups, and the safety line. Unconfirmed facts never appear. */
export function GET() {
  const line = (slug: string) => {
    const p = PAGES.find((x) => x.slug === slug)
    return p ? `- [${p.title}](${SITE_URL}${pathOf(p.slug)}): ${plain(p.description)}` : null
  }
  const listed = new Set(LLMS.groups.flatMap((g) => g.slugs as readonly string[]))
  const rest = PAGES.filter((p) => !listed.has(p.slug)).map((p) => line(p.slug))
  const lines = [
    `# ${plain(SITE.brand)}`,
    '',
    `> ${plain(LLMS.intro)}`,
    '',
    ...LLMS.groups.flatMap((g) => [`## ${g.heading}`, ...g.slugs.map(line).filter(Boolean), '']),
    ...(rest.length ? ['## Andre sider', ...rest, ''] : []),
    `## ${LLMS.importantHeading}`,
    `- ${LLMS.important[0]}`,
    `- ${LLMS.important[1]}${SITE_URL}${pathOf('kontakt')}`,
    '',
  ]
  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
