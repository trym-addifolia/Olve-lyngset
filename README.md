# olvelyngset.no

Personlig faglig nettside for kiropraktor Olve Lyngset (Kiropraktor, DACNB), Limbra Storgata, Lillestrøm. Siden dekker svimmelhet og balanse, plager etter hjernerystelse, intensivt rehabiliteringsopphold og vanlig kiropraktikk. Den er en kopi av krystallsyken.no i samme visuelle familie, slik at pasienter kjenner den igjen.

Laget av Addifolia i november 2026. Siden er ikke lansert.

## Innhold

- Roten er nettsiden (Next.js 15). Den kjører på Cloudflare Workers (Addifolia-kontoen) via OpenNext.
- [docs/olve/olvelyngset_nettside_arbeidsdokument.md](docs/olve/olvelyngset_nettside_arbeidsdokument.md): Olves arbeidsdokument, kilden til tekstene.
- [docs/superpowers/specs/2026-11-17-olvelyngset-design.md](docs/superpowers/specs/2026-11-17-olvelyngset-design.md): designet.

## Kjør siden

Node 20.

```
npm install
npm run dev        # http://localhost:3077
npm run check      # typecheck, lint, test og build
npm run preview    # bygget kjørt lokalt i Cloudflare-runtime, http://localhost:8787
npm run deploy     # bygg og publiser til https://olvelyngset.hei-0de.workers.dev
npm run db:migrate # nye tabeller i D1 (migrations/)
```

Deploy krever `.cloudflare.env` med token for Addifolia-kontoen (se `.env.example`). Tokenet skal ikke ligge i `.env`: Next og OpenNext leser `.env*` ved bygging og ville tatt det med inn i Workeren.

D1-databasen `olvelyngset-maling` er ikke opprettet ennå. Før første deploy: `npm run cf -- wrangler d1 create olvelyngset-maling`, lim inn id-en i `wrangler.jsonc` (der står `TODO-create`), så `npm run db:migrate`.

Adressen siden bygges for står i `.env.production`. Så lenge den ikke er `https://www.olvelyngset.no`, står siden som noindex.

Tellingen av sidevisninger og klikk på «Bestill time» ligger i D1-databasen `olvelyngset-maling` (tabellene `site_hits` og `booking_clicks`), uten IP, informasjonskapsler eller identifikator.

## To retninger for forsiden

- **A, «To dører»** på `/` (mosegrønn aksent).
- **B, «Det er hjelp å få»** på `/retning-b` (oker aksent). Noindex, ikke i meny, sitemap eller llms.txt, og tittelen er merket «[Forhåndsvisning B]».

Når Trym har valgt, slettes den andre (mal, side, rute i `src/routes.ts` og aksenten i `site.config.ts`).

## Kommentarer fra Olve

Olve kan kommentere tekstene direkte på forhåndsvisningen. Spesifikasjonen står i `docs/superpowers/specs/2026-11-12-olve-kommentarer-design.md`.

- **Tilgang:** Olve åpner `https://olvelyngset.hei-0de.workers.dev/?kommenter=<KOMMENTAR_NOKKEL>` én gang. Nettleseren husker ham i 90 dager, og knappen «Kommenter» vises nede til venstre. Uten lenken ser ingen knappen, og på olvelyngset.no finnes funksjonen ikke.
- **Lagring:** hver kommentar blir en sak i repoet `trym-addifolia/Olve-lyngset` med etiketten `olve-kommentar`. Saken har lenke rett til teksten, sitat, kommentaren og eventuelt forslag til ny tekst.
- **Gjennomgang:** be Claude «gå gjennom Olves kommentarer». Godkjent får etiketten `godkjent` og endres i en PR med «Fixes #n». Avvist får etiketten `avvist` og en kort kommentar. Olve ser status og svar ved merket på siden.
- **Hemmeligheter på Workeren:** `KOMMENTAR_NOKKEL` (lenken) og `GITHUB_KOMMENTAR_TOKEN` (fine-grained token, «Issues: Read and write» på bare dette repoet). Settes med `npm run cf -- wrangler secret put <navn>`. Ny `KOMMENTAR_NOKKEL` gjør gamle lenker ugyldige.
- **Lokalt:** `.dev.vars` (git-ignorert) med de samme to navnene, så `npm run preview`.

## Hvor ting ligger

- `src/site.config.ts`: alle fakta om Olve og arbeidsstedet (navn, adresse, åpningstider, booking, tittel, utdanning). Fakta som ikke er bekreftet står som `{{OLVE_BEKREFT: ...}}` og vises merket på siden.
- `src/routes.ts`: de ti sidene pluss `/retning-b` (tittel, H1, mal, meny). Styrer meny, brødsmuler, sitemap og llms.txt.
- `content/pages/*.ts`: teksten på hver side, én fil per side. Hvert faktum har en `source`.
- `src/components/templates/`: én mal per sidetype.
- `src/lib/booking.ts`: bestillingsknappen. Klikk går via `/go/bestill` (telles på serveren, så 302 til timebestillingen hos Limbra).
- `src/lib/schema.ts`: strukturert data (Person, WebSite, BreadcrumbList). Ingen egen klinikk: Limbra Storgata er arbeidssted.
- `public/bilder/` og `src/photos.ts`: klinikkens egne bilder, uten EXIF. Pasienten på VOG-bildene er gjenkjennelig; samtykke bekreftes internt før lansering.
