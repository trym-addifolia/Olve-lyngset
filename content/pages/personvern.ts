import { site } from '@/site.config'
import { t } from '../helpers'
import { SRC } from '../sources'
import type { PrivacyContent } from '../types'

/**
 * /personvern (GDPR art. 13), from the real data flows in this repo. Carried
 * over from krystallsyken.no and adapted: cookieless counting in D1, the
 * booking click, the comment cookies (only for Olve), YouTube via
 * youtube-nocookie on click, and email. No FAQ on this page.
 */
export const PERSONVERN_CONTENT: PrivacyContent = {
  kind: 'privacy',
  updated: '2026-11-17',
  intro: t(
    'olvelyngset.no har ingen skjemaer og ber deg ikke om opplysninger om deg selv. Her står hva siden behandler, hvorfor, og hvilke rettigheter du har. Siden bruker ikke sporingscookies.',
    SRC.flows,
  ),
  sections: [
    {
      id: 'ansvarlig',
      heading: 'Hvem er ansvarlig?',
      body: [
        t(
          `Behandlingsansvarlig er ${site.brand.legalName}, org.nr. ${site.brand.orgNumber}, ved Olve Lyngset. Du finner kontaktinformasjonen på kontaktsiden.`,
          `${SRC.krystallsyken} (LOL AS, Brønnøysundregistrene)`,
        ),
      ],
    },
    {
      id: 'maaling',
      heading: 'Informasjonskapsler og måling',
      body: [
        t(
          'Nettsiden teller besøk per side uten informasjonskapsler, uten IP-adresse og uten identifikator. For hvert besøk lagres bare hvilken side det gjaldt, om du kom fra et søk, Facebook, en annen side eller direkte, om du kom via en Google-annonse, om det var mobil eller datamaskin, og tidspunktet. Tellingen kan ikke knyttes til deg.',
          'src/middleware.ts og src/lib/tally.ts (site_hits i Cloudflare D1)',
        ),
      ],
    },
    {
      id: 'booking',
      heading: 'Timebestilling',
      body: [
        t(
          'Når du trykker «Bestill time» sendes du via adressen /go/bestill til timebestillingen hos Limbra (Solvit Journal). Der gjelder klinikkens personvernerklæring. Jeg registrerer bare at lenken ble brukt, hvilken knapp på siden du trykket på og om det var mobil eller datamaskin, uten IP-adresse eller andre opplysninger om deg.',
          'src/app/go/bestill/route.ts og src/app/api/booking-klikk/route.ts (booking_clicks)',
        ),
      ],
    },
    {
      id: 'e-post',
      heading: 'E-post',
      body: [
        t(
          `Skriver du til meg på ${site.contact.email}, behandler jeg det du skriver for å svare deg og avtale videre oppfølging. Ikke send fødselsnummer, journaler eller detaljerte helseopplysninger i vanlig e-post. Blir det aktuelt, avtaler vi en tryggere måte å utveksle nødvendig informasjon på.`,
          `${SRC.doc(7)}; ${SRC.doc(11)}`,
        ),
      ],
    },
    {
      id: 'video',
      heading: 'Video fra YouTube',
      body: [
        t(
          'Hvis en side viser en video, lastes ingenting fra YouTube før du selv trykker på den. Først da hentes forhåndsbildet og videoen, gjennom youtube-nocookie.com. Da gjelder Googles personvernerklæring for avspillingen.',
          'src/components/VideoEmbed.tsx',
        ),
      ],
    },
    {
      id: 'kommentarer',
      heading: 'Kommentarmodus for Olve',
      body: [
        t(
          `Olve kan kommentere tekstene på siden gjennom en egen kommentarmodus. Den slås bare på med en hemmelig lenke, og da settes to informasjonskapsler (${site.brand.cookiePrefix}_kommentar og ${site.brand.cookiePrefix}_kommentar_ui) i nettleseren hans. Som vanlig besøkende får du aldri disse informasjonskapslene.`,
          'src/middleware.ts og src/lib/kommentar/tilgang.ts',
        ),
      ],
    },
    {
      id: 'drift',
      heading: 'Drift',
      body: [
        t(
          'Nettsiden leveres gjennom Cloudflare. Som all nettrafikk passerer forespørselen din deres servere, som behandler tekniske opplysninger som IP-adresse for å levere siden og beskytte den mot angrep. Jeg lagrer ikke disse opplysningene.',
          'wrangler.jsonc (Cloudflare Workers)',
        ),
      ],
    },
    {
      id: 'rettigheter',
      heading: 'Dine rettigheter',
      body: [
        t(
          'Du kan be om innsyn, retting og sletting av opplysninger om deg, og du kan klage til Datatilsynet.',
          'GDPR art. 15 til 17, 77',
        ),
      ],
    },
  ],
}
