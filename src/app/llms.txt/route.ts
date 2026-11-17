import { BASE_URL } from '@/lib/siteUrl'
import { CONTACT_ROUTE, PUBLIC_ROUTES, encodePath } from '@/routes'
import { site } from '@/site.config'

export const dynamic = 'force-static'

/** Strip {{OLVE_BEKREFT: etikett | visning}} to its shown text; drop bare markers. */
function plain(text: string): string {
  return text.replace(/\{\{[A-Z_]+:[^}|]*(?:\|\s*([^}]*?))?\s*\}\}/g, (_, shown) => shown ?? '')
}

/** llms.txt generated from the routes registry (public routes only) and site config. */
export function GET() {
  const p = site.practitioner
  const lines = [
    `# ${site.brand.name}`,
    '',
    `> ${site.brand.description}`,
    '',
    `${p.name}, ${p.titleLong} (${p.dacnb.long}). ${p.yearsInPractice}.`,
    `Arbeidssted: ${site.brand.clinicName}, ${site.contact.address.full}. Dette er ${p.firstName}s personlige faglige nettside.`,
    'Språk: norsk (bokmål). Tekstene bygger på Olves eget arbeidsdokument.',
    '',
    '## Sider',
    '',
    ...PUBLIC_ROUTES.map((r) => `- [${r.title}](${BASE_URL}${encodePath(r)}): ${r.description}`),
    '',
    '## Viktig',
    '',
    '- Ved plutselig kraftig svimmelhet sammen med lammelse, talevansker, synstap eller kraftig hodepine: ring 113.',
    `- Timebestilling og kontakt: ${BASE_URL}${encodePath(CONTACT_ROUTE)}`,
    `- Intensivt rehabiliteringsopphold avtales direkte på e-post: ${plain(site.contact.email)}`,
    '',
  ]
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
