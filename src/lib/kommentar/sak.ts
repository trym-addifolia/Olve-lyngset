import { type NyKommentar, NyKommentarSchema, type Status } from './typer'

// Hyphens are written as JSON \u002d escapes so nothing inside can close the HTML comment
const BS = String.fromCharCode(92)
const DATA = /<!-- kommentar-data (\{[\s\S]*?\}) -->/

export function sakTittel(ny: NyKommentar): string {
  const kort = ny.kommentar.replace(/\s+/g, ' ').trim()
  const tittel = kort.length > 60 ? `${kort.slice(0, 60)}…` : kort
  return `[${ny.plassering.side}] ${tittel}`
}

export function sideLenke(baseUrl: string, side: string, tekst: string): string {
  const url = `${baseUrl.replace(/\/$/, '')}${side}`
  if (!tekst) return url
  const fragment = encodeURIComponent(tekst.slice(0, 300))
    .replace(/-/g, '%2D')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
  return `${url}#:~:text=${fragment}`
}

function sitat(tekst: string): string {
  return tekst
    .split('\n')
    .map((linje) => `> ${linje}`)
    .join('\n')
}

export function sakTekst(ny: NyKommentar, baseUrl: string): string {
  const p = ny.plassering
  const under = p.overskrift ? ` (under «${p.overskrift}»)` : ''
  const data = JSON.stringify(ny).replace(/-/g, `${BS}u002d`)
  return [
    `**Side:** [${p.side}](${sideLenke(baseUrl, p.side, p.tekst)})${under}`,
    '',
    p.tekst ? `**Markert tekst:**\n\n${sitat(p.tekst)}` : '**Gjelder hele siden.**',
    '',
    `**Kommentar fra Olve:**\n\n${ny.kommentar}`,
    '',
    `**Forslag til ny tekst:**\n\n${ny.forslag || '_Ingen_'}`,
    '',
    `<!-- kommentar-data ${data} -->`,
  ].join('\n')
}

export function lesSak(body: string | null | undefined): NyKommentar | null {
  const treff = body ? DATA.exec(body) : null
  if (!treff) return null
  try {
    const tolket = NyKommentarSchema.safeParse(JSON.parse(treff[1]))
    return tolket.success ? tolket.data : null
  } catch {
    return null
  }
}

export function statusFra(state: string, etiketter: string[]): Status {
  if (etiketter.includes('avvist')) return 'avvist'
  if (etiketter.includes('godkjent')) return state === 'closed' ? 'endret' : 'godkjent'
  return state === 'closed' ? 'lukket' : 'venter'
}
