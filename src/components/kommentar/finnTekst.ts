import type { Plassering } from '@/lib/kommentar/typer'

const UI = '[data-kommentar-ui]'
const TEKSTBLOKK = 'h1,h2,h3,h4,h5,p,li,dt,dd,figcaption,blockquote,summary,address,label,td,th'
const ANNEN_BLOKK = 'a,button,img,figure'

export function normaliser(s: string): string {
  return s.replace(/\s+/g, ' ').trim()
}

function tekstAv(el: HTMLElement): string {
  return normaliser(el instanceof HTMLImageElement ? el.alt : el.innerText || el.textContent || '')
}

/** The block a click or hover means: the nearest text block, else a link, button or image. */
export function blokkFra(mal: EventTarget | null): HTMLElement | null {
  if (!(mal instanceof Element) || mal.closest(UI)) return null
  const blokk = mal.closest<HTMLElement>(TEKSTBLOKK) ?? mal.closest<HTMLElement>(ANNEN_BLOKK)
  return blokk && tekstAv(blokk) ? blokk : null
}

function forrigeOverskrift(el: HTMLElement): string {
  let funnet = ''
  for (const h of document.querySelectorAll<HTMLElement>('h1,h2,h3')) {
    if (h === el || h.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) {
      funnet = tekstAv(h)
    } else break
  }
  return funnet.slice(0, 200)
}

export function plasseringFra(blokk: HTMLElement, side: string): Plassering {
  const helhet = tekstAv(blokk)
  let tekst = helhet
  const valg = window.getSelection()
  if (
    valg &&
    !valg.isCollapsed &&
    valg.anchorNode &&
    valg.focusNode &&
    blokk.contains(valg.anchorNode) &&
    blokk.contains(valg.focusNode)
  ) {
    const markert = normaliser(valg.toString())
    if (markert && helhet.includes(markert)) tekst = markert
  }
  tekst = tekst.slice(0, 1000)
  const i = Math.max(0, helhet.indexOf(tekst))
  return {
    side,
    tekst,
    prefiks: helhet.slice(Math.max(0, i - 40), i),
    suffiks: helhet.slice(i + tekst.length, i + tekst.length + 40),
    blokk: blokk.tagName.toLowerCase(),
    overskrift: forrigeOverskrift(blokk),
  }
}

export function helSide(side: string): Plassering {
  return {
    side,
    tekst: '',
    prefiks: '',
    suffiks: '',
    blokk: '',
    overskrift: normaliser(document.title).slice(0, 200),
  }
}

/** Finds the commented block again; null when the text has changed or the whole page is meant. */
export function finnElement(p: Plassering): HTMLElement | null {
  if (!p.tekst || !p.blokk) return null
  const treff = Array.from(document.body.querySelectorAll<HTMLElement>(p.blokk)).filter(
    (el) => !el.closest(UI) && tekstAv(el).includes(p.tekst),
  )
  if (treff.length === 0) return null
  const synlige = treff.filter((el) => el.getClientRects().length > 0)
  const kandidater = synlige.length > 0 ? synlige : treff
  const kontekst = `${p.prefiks}${p.tekst}${p.suffiks}`
  return kandidater.find((el) => tekstAv(el).includes(kontekst)) ?? kandidater[0]
}
