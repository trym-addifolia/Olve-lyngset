import { t } from '../helpers'
import { SRC } from '../sources'
import type { InfoContent } from '../types'

/** /andre-plager (arbeidsdokument §9): ordinary chiropractic, with the list of examples. */
export const ANDRE_PLAGER_CONTENT: InfoContent = {
  kind: 'info',
  safety: false,
  heroPhoto: 'olve-nakken',
  intro: t(
    'Selv om jeg har fordypet meg i svimmelhet og funksjonell nevrologi, arbeider jeg også med det mange forbinder med vanlig kiropraktikk: smerter og funksjonsproblemer i rygg, nakke, skuldre, kjeve, hofter og andre ledd.',
    SRC.doc(9),
  ),
  sections: [
    {
      id: 'slik-jobber-jeg',
      heading: 'Slik jobber jeg',
      body: [
        t(
          'Jeg begynner med å høre hvordan plagene oppsto, hva som provoserer dem, og hvordan de påvirker deg. Deretter undersøker jeg blant annet bevegelighet, leddfunksjon og relevante ortopediske og nevrologiske forhold.',
          SRC.doc(9),
        ),
        t(
          'Når det er hensiktsmessig, kan behandlingen omfatte justeringer eller korrigeringer, øvelser og råd om aktivitet. Jeg undersøker gjerne funksjonen på nytt for å vurdere responsen.',
          SRC.doc(9),
        ),
      ],
    },
    {
      id: 'forventninger',
      heading: 'Tydelig på forventninger',
      body: [
        t(
          'Ved langvarige eller sammensatte problemer er jeg tydelig på forventninger. Hvis utviklingen uteblir, vurderer jeg behov for videre undersøkelser eller henvisning til annen behandler.',
          SRC.doc(9),
        ),
      ],
    },
    {
      id: 'eksempler',
      heading: 'Eksempler på plager',
      body: [
        t(
          'Undersøkelse, forventninger og tiltak tilpasses problemet og det du ønsker å oppnå.',
          SRC.doc(4),
        ),
      ],
      bullets: [
        t('Ryggsmerter og stivhet', SRC.doc(9)),
        t('Nakkeplager', SRC.doc(9)),
        t('Hodepine, blant annet mulig nakkerelatert hodepine', SRC.doc(9)),
        t('Skulderplager', SRC.doc(9)),
        t('Kjeveplager', SRC.doc(9)),
        t('Hofte-, kne- og ankelplager', SRC.doc(9)),
      ],
    },
  ],
  faqs: [
    {
      question: 'Hva undersøker du ved rygg- og nakkeplager?',
      answer:
        'Jeg begynner med å høre hvordan plagene oppsto, hva som provoserer dem, og hvordan de påvirker deg. Deretter undersøker jeg blant annet bevegelighet, leddfunksjon og relevante ortopediske og nevrologiske forhold.',
      source: SRC.doc(9),
    },
    {
      question: 'Hva kan behandlingen bestå av?',
      answer:
        'Når det er hensiktsmessig, kan behandlingen omfatte justeringer eller korrigeringer, øvelser og råd om aktivitet. Jeg undersøker gjerne funksjonen på nytt for å vurdere responsen.',
      source: SRC.doc(9),
    },
    {
      question: 'Hva om jeg ikke blir bedre?',
      answer:
        'Hvis utviklingen uteblir, vurderer jeg behov for videre undersøkelser eller henvisning til annen behandler. Ved langvarige eller sammensatte problemer er jeg tydelig på forventninger fra starten.',
      source: SRC.doc(9),
    },
  ],
  related: ['om-olve', 'svimmelhet', 'kontakt'],
  closing: {
    heading: 'Vil du bestille en kiropraktortime?',
    lede: 'En vanlig konsultasjon bestiller du i timebestillingen hos Limbra Storgata i Lillestrøm.',
  },
}
