# krystallsyken

Nettsiden krystallsyken.no for kiropraktor Olve Lyngset (Storgata 25B, Lillestrøm), og resultatene bak den i `resultater/`. Siden er ikke lansert.

## Stack
Next.js 15 (App Router, React 18), TypeScript strict, Tailwind 3 med shadcn-komponenter, Biome. Node 20 (`export PATH=$HOME/.nvm/versions/node/v20.20.2/bin:$PATH` på maskiner med nvm). Dev og start på port 3077.

## Kommandoer
- `npm run dev`: utviklingsserver.
- `npm run check`: typecheck, lint og build. Skal være grønn før hver commit.
- `npm run build && npm start`: produksjonsbygg lokalt.

## Struktur
- `src/site.config.ts`: alle fakta om Olve og klinikken. Ubekreftede fakta skrives `{{OLVE_BEKREFT: etikett | visning}}` og vises merket på siden. Mekanismen skal beholdes til Olve har bekreftet alt.
- `src/routes.ts`: sideregisteret (tittel, H1, annonsegruppe, søkeord).
- `content/*.ts`: sideteksten. Hvert faktum har en `source`.
- `src/components/templates/`: én mal per sidetype. `src/app/[slug]/page.tsx` velger mal etter `content.kind`.
- `resultater/`: markedsanalyse, plan, annonser, søkeord, Google-profil, måling, rapporter og Olves svar. Indeks i `resultater/README.md`.

## Innholdsregler
- Ingen tankestreker (U+2013 og U+2014) noe sted. Bruk komma, punktum eller parentes.
- Helsepersonelloven § 13: markedsføringen skal være forsvarlig, nøktern og saklig. Ingen effektløfter, ingen prosenter om effekt, ingen pasientuttalelser som bevis, ingen kritikk av andre behandlere. Aldri «spesialist» eller «nevrokiropraktor». Tittelen er «kiropraktor».
- Ingen priser på siden (`compliance.showPrices = false`).
- Ved akutt svimmelhet med tegn på slag: 113 først. Det rådet står før alt salg.
- Ny tekst bygger på Olves egne ord og offentlige helsekilder, og får en `source`.
- Ingen deploy til krystallsyken.no uten Olves godkjenning av tekstene.
