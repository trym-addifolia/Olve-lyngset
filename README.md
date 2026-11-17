# krystallsyken

Den nye krystallsyken.no for kiropraktor Olve Lyngset, Lillestrøm, og resultatene bak den: markedsanalyse, plan, annonser, søkeord, Google-profil og måling.

Laget av Borrow Brains (contact@borrowbrains.com) i november 2026. Siden er ikke lansert.

## Innhold

- Roten er nettsiden (Next.js 15). Den kjører på Cloudflare Workers (Addifolia-kontoen) via OpenNext.
- [resultater/](resultater/README.md): analysen, tallene og leveransene.

## Kjør siden

Node 20.

```
npm install
npm run dev        # http://localhost:3077
npm run check      # typecheck, lint og build
npm run preview    # bygget kjørt lokalt i Cloudflare-runtime, http://localhost:8787
npm run deploy     # bygg og publiser til https://krystallsyken.hei-0de.workers.dev
npm run db:migrate # nye tabeller i D1 (migrations/)
```

Deploy krever `.cloudflare.env` med token for Addifolia-kontoen (se `.env.example`). Tokenet skal ikke ligge i `.env`: Next og OpenNext leser `.env*` ved bygging og ville tatt det med inn i Workeren.

Adressen siden bygges for står i `.env.production`. Så lenge den ikke er `https://www.krystallsyken.no`, står siden som noindex.

Tellingen av sidevisninger og klikk på «Book en time» ligger i D1-databasen `krystallsyken-maling` (tabellene `site_hits` og `booking_clicks`), uten IP, informasjonskapsler eller identifikator.

## Kommentarer fra Olve

Olve kan kommentere tekstene direkte på forhåndsvisningen. Spesifikasjonen står i `docs/superpowers/specs/2026-11-12-olve-kommentarer-design.md`.

- **Tilgang:** Olve åpner `https://krystallsyken.hei-0de.workers.dev/?kommenter=<KOMMENTAR_NOKKEL>` én gang. Nettleseren husker ham i 90 dager, og knappen «Kommenter» vises nede til venstre. Uten lenken ser ingen knappen, og på krystallsyken.no finnes funksjonen ikke.
- **Lagring:** hver kommentar blir en sak i dette repoet med etiketten `olve-kommentar`. Saken har lenke rett til teksten, sitat, kommentaren og eventuelt forslag til ny tekst.
- **Gjennomgang:** be Claude «gå gjennom Olves kommentarer». Godkjent får etiketten `godkjent` og endres i en PR med «Fixes #n». Avvist får etiketten `avvist` og en kort kommentar. Olve ser status og svar ved merket på siden.
- **Hemmeligheter på Workeren:** `KOMMENTAR_NOKKEL` (lenken) og `GITHUB_KOMMENTAR_TOKEN` (fine-grained token, «Issues: Read and write» på bare dette repoet). Settes med `npm run cf -- wrangler secret put <navn>`. Ny `KOMMENTAR_NOKKEL` gjør gamle lenker ugyldige.
- **Lokalt:** `.dev.vars` (git-ignorert) med de samme to navnene, så `npm run preview`.

## Hvor ting ligger

- `src/site.config.ts`: alle fakta om Olve og klinikken (navn, adresse, åpningstider, booking, tittel). Fakta som ikke er bekreftet står som `{{OLVE_BEKREFT: ...}}` og vises merket på siden.
- `src/routes.ts`: de 21 sidene (tittel, H1, annonsegruppe, søkeord). Styrer meny, sitemap og llms.txt.
- `content/*.ts`: teksten på hver side. Hvert faktum har en `source`.
- `src/components/templates/`: én mal per sidetype.
- `src/lib/booking.ts`: bestillingsknappen. Klikk går via `/go/bestill` (telles på serveren, så 302 til Olves kalender).
- `public/bilder/`: klinikkens egne bilder (portrettet av Olve).
- `public/gammel/`: bilder fra den gamle siden. Rettighetene er ikke avklart, se `RETTIGHETER.md`.
