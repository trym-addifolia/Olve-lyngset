import { t } from '../helpers'
import { SRC } from '../sources'
import type { InfoContent } from '../types'

/** /andre-plager (arbeidsdokument §9). Stub: Task 2 adds the sections and the list. */
export const ANDRE_PLAGER_CONTENT: InfoContent = {
  kind: 'info',
  safety: false,
  heroPhoto: 'olve-nakken',
  intro: t(
    'Selv om jeg har fordypet meg i svimmelhet og funksjonell nevrologi, arbeider jeg også med det mange forbinder med vanlig kiropraktikk: smerter og funksjonsproblemer i rygg, nakke, skuldre, kjeve, hofter og andre ledd.',
    SRC.doc(9),
  ),
  sections: [],
  faqs: [],
  related: ['om-olve', 'kontakt'],
  closing: {
    heading: 'Vil du bestille en kiropraktortime?',
    lede: 'Jeg begynner med å høre hvordan plagene oppsto, hva som provoserer dem, og hvordan de påvirker deg.',
  },
}
