import { BASE_URL } from '@/lib/siteUrl'
import { ROUTES, encodePath } from '@/routes'
import { site } from '@/site.config'

export const dynamic = 'force-static'

/** llms.txt generated from the routes registry and site config. */
export function GET() {
  const lines = [
    `# ${site.brand.name}`,
    '',
    `> ${site.brand.description}`,
    '',
    `Behandler: ${site.practitioner.name}. ${site.practitioner.titleLong}.`,
    `Sted: ${site.contact.address.full} (${site.brand.clinicName}). Telefon ${site.contact.phone.display}.`,
    'Språk: norsk (bokmål). Innholdet bygger på behandlerens egne tekster med kilder (helsenorge.no, NHI, Store medisinske leksikon).',
    '',
    '## Sider',
    '',
    ...ROUTES.map((r) => `- [${r.title}](${BASE_URL}${encodePath(r)}): ${r.description}`),
    '',
    '## Viktig',
    '',
    '- Ved svimmelhet sammen med lammelse, talevansker, synstap eller kraftig hodepine: ring 113.',
    `- Timebestilling: ${BASE_URL}/bestill-time`,
    '',
  ]
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
