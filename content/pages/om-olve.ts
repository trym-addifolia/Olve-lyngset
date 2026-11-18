import { site } from '@/site.config'
import { t } from '../helpers'
import { SRC } from '../sources'
import type { PractitionerContent } from '../types'

const p = site.practitioner

/**
 * /om-olve (arbeidsdokument §10), with the facts table. DACNB is explained
 * here, as the design asks. Olve named two colleagues in his own text; each
 * name is marked so he explicitly okays publishing a third party's name. The
 * video stays off until Olve has reviewed it (§14).
 */
export const OM_OLVE_CONTENT: PractitionerContent = {
  kind: 'practitioner',
  updated: '2026-11-17',
  intro: t(
    'Jeg hadde egentlig sett for meg en annen yrkesvei. Som ung spilte jeg ishockey, og etter en takling fikk jeg ryggplager. Moren min tok meg med til kiropraktor {{OLVE_BEKREFT: navn på tredjepart (Gunn Austlid) | Gunn Austlid}} i Lillestrøm. Hjelpen jeg fikk der, gjorde så sterkt inntrykk at jeg bestemte meg for å bli kiropraktor.',
    SRC.doc(10),
  ),
  facts: [
    { label: 'Kiropraktor', value: t(p.hprNumber, SRC.krystallsyken) },
    {
      label: p.dacnb.short,
      value: t(
        `${p.dacnb.long}. {{OLVE_BEKREFT: forklaring av DACNB | En amerikansk eksamen i kiropraktisk nevrologi, som jeg har bestått. Det er ikke en norsk godkjenning.}}`,
        `${SRC.doc(2)}; ${SRC.doc(10)} (faktasjekk: DACNB-betegnelse)`,
      ),
    },
    { label: 'Utdanning', value: t(p.education, `${SRC.doc(10)}; ${SRC.krystallsyken}`) },
    {
      label: 'Videreutdanning',
      value: t(p.furtherEducation.join('. '), `${SRC.doc(2)}; ${SRC.doc(10)}`),
    },
    { label: 'Erfaring', value: t(p.yearsInPractice, SRC.doc(2)) },
    { label: 'Medlemskap', value: t(p.memberships.join('. '), SRC.doc(2)) },
    {
      label: 'Arbeidssted',
      value: t(`${site.brand.clinicName}, ${site.contact.address.full}`, SRC.doc(10)),
    },
    {
      label: 'Om nettsiden',
      value: t('Min personlige faglige nettside, ikke Limbras.', `${SRC.doc(2)}; ${SRC.doc(10)}`),
    },
  ],
  sections: [
    {
      id: 'utdanning',
      heading: 'Utdanning og videreutdanning',
      body: [
        t(
          'Jeg utdannet meg i Davenport i Iowa, USA, og hadde praksis hos {{OLVE_BEKREFT: navn på tredjepart (Finn Morten Halle) | Finn Morten Halle}} ved Stabekk kiropraktiske klinikk. Siden har jeg arbeidet klinisk i mer enn 30 år.',
          SRC.doc(10),
        ),
        t(
          'Nysgjerrigheten på nervesystemet førte meg videre til {{OLVE_BEKREFT: Carrick Institute, ordlyd | omfattende etterutdanning gjennom blant annet Carrick Institute, med mye undervisning i Amsterdam}}. Jeg har bestått eksamen til DACNB, og har i tillegg {{OLVE_BEKREFT: vestibulær rehabilitering, ordlyd | videreutdannet meg innen vestibulær rehabilitering}}. Jeg har også deltatt på kliniske opphold i Atlanta i USA og undervist kolleger om svimmelhet og funksjonell nevrologi.',
          SRC.doc(10),
        ),
      ],
    },
    {
      id: 'hva-som-driver-meg',
      heading: 'Hva som driver meg',
      photo: { name: 'olve-ryggsoyle' },
      body: [
        t(
          'Det som betyr mest for meg, er når en pasient føler seg sett, får en forståelig forklaring og opplever at hverdagen blir lettere. Jeg liker å lete etter sammenhenger, undersøke grundig og finne en plan vi kan arbeide med sammen.',
          SRC.doc(10),
        ),
        t(
          'Jeg er ikke den rette behandleren for alle. Noen ganger må vi endre kurs, og noen ganger er det best å henvise videre. Men jeg ønsker at du skal oppleve at plagene dine blir tatt på alvor.',
          SRC.doc(10),
        ),
      ],
    },
    {
      id: 'arbeidssted',
      heading: 'Limbra Storgata i Lillestrøm',
      body: [
        t(
          'Jeg arbeider ved Limbra Storgata i Lillestrøm. Denne nettsiden er min personlige faglige nettside.',
          SRC.doc(10),
        ),
      ],
      link: { href: '/kontakt', label: 'Adresse, åpningstider og timebestilling' },
    },
  ],
  showVideo: false,
  faqs: [
    {
      question: 'Hva betyr DACNB?',
      answer:
        'DACNB står for Diplomate of the American Chiropractic Neurology Board. Jeg har bestått eksamen til DACNB etter {{OLVE_BEKREFT: Carrick Institute, ordlyd | etterutdanning gjennom blant annet Carrick Institute}}. Tittelen min i Norge er kiropraktor.',
      source: `${SRC.doc(2)}; ${SRC.doc(10)}`,
    },
    {
      question: 'Hvor lenge har du arbeidet som kiropraktor?',
      answer:
        'Jeg har arbeidet klinisk i mer enn 30 år, etter utdanning i Davenport i Iowa, USA, og praksis ved Stabekk kiropraktiske klinikk.',
      source: SRC.doc(10),
    },
    {
      question: 'Hvor arbeider du?',
      answer:
        'Jeg arbeider ved Limbra Storgata i Lillestrøm. Denne nettsiden er min personlige faglige nettside, ikke Limbra sin.',
      source: `${SRC.doc(2)}; ${SRC.doc(10)}`,
    },
  ],
  related: ['undersokelse', 'svimmelhet', 'kontakt'],
  closing: {
    heading: 'Vil du at jeg ser på plagene dine?',
    lede: 'Jeg kan ikke love at jeg finner løsningen for alle. Men jeg lover å ta plagene dine på alvor, gjøre en grundig vurdering og være ærlig om hva jeg tror kan hjelpe.',
  },
}
