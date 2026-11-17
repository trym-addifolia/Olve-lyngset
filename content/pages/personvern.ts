import { t } from '../helpers'
import { SRC } from '../sources'
import type { PrivacyContent } from '../types'

/**
 * /personvern (GDPR art. 13), from the real data flows. Carried over from
 * krystallsyken.no and adapted; Task 2 adds the comment cookie, YouTube and
 * email sections.
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
          'Behandlingsansvarlig er LOL AS, org.nr. 928 308 979, ved Olve Lyngset. Du finner kontaktinformasjonen på kontaktsiden.',
          `${SRC.krystallsyken} (LOL AS, Brønnøysundregistrene)`,
        ),
      ],
    },
    {
      id: 'booking',
      heading: 'Timebestilling',
      body: [
        t(
          'Når du trykker «Bestill time» sendes du via adressen /go/bestill til timebestillingen hos Limbra (Solvit Journal). Der gjelder klinikkens personvernerklæring. Jeg registrerer bare at lenken ble brukt, hvilken side du kom fra og om det var mobil eller datamaskin, uten IP-adresse eller andre opplysninger om deg.',
          'src/app/go/bestill/route.ts og src/app/api/booking-klikk/route.ts',
        ),
      ],
    },
    {
      id: 'maaling',
      heading: 'Informasjonskapsler og måling',
      body: [
        t(
          'Nettsiden teller besøk per side uten informasjonskapsler, uten IP-adresse og uten identifikator. Tellingen kan ikke knyttes til deg.',
          'src/middleware.ts (site_hits)',
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
