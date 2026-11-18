# olvelyngset.no

Personlig faglig nettside for kiropraktor Olve Lyngset (Kiropraktor, DACNB), Limbra Storgata, Storgata 25B, Lillestrøm. Den dekker alle tjenestene hans: svimmelhet og balanse, plager etter hjernerystelse, intensivt rehabiliteringsopphold og vanlig kiropraktikk. Søstersiden krystallsyken.no er den dype siden om krystallsyke. Siden er ikke lansert.

## Stack
Next.js 15 (App Router, React 18), TypeScript strict, Tailwind 3 med shadcn-komponenter, Biome, Vitest. OpenNext på Cloudflare Workers (Addifolia-kontoen). Node 20. Dev og start på port 3077.

## Kommandoer
- `npm run dev`: utviklingsserver.
- `npm run check`: typecheck, lint, test og build. Skal være grønn før hver commit.
- `npm run build && npm start`: produksjonsbygg lokalt.

## Struktur
- `src/site.config.ts`: alle fakta om Olve og arbeidsstedet. Ubekreftede fakta skrives `{{OLVE_BEKREFT: etikett | visning}}` og vises merket på siden. Mekanismen skal beholdes til Olve har bekreftet alt.
- `src/routes.ts`: sideregisteret (slug, mal, tittel, H1, meny). Nestede slugs er lov (`svimmelhet/krystallsyke`). `hidden` holder en side utenfor sitemap, llms.txt og meny og gir noindex.
- `content/pages/*.ts`: sideteksten, én fil per side. Hvert faktum har en `source` (som regel `arbeidsdokument §N`). `content/index.ts` kobler slug til innhold.
- `src/components/templates/`: én mal per sidetype. `src/app/[...slug]/page.tsx` velger mal etter `content.kind`. Forsiden er `HomeTemplate` («Det er hjelp å få», oker aksent), valgt av Trym 2026-11-18.
- `src/photos.ts` og `public/bilder/`: klinikkens egne bilder, eksportert uten EXIF.
- `docs/olve/olvelyngset_nettside_arbeidsdokument.md`: Olves arbeidsdokument, kilden til tekstene. Design i `docs/superpowers/specs/`, plan i `docs/superpowers/plans/`.

## Innholdsregler
- Ingen tankestreker (U+2013 og U+2014) i `content/`, `src/routes.ts` og `src/site.config.ts`. Bruk komma, kolon, punktum eller «til» (40 til 50 minutter). `src/lib/compliance.test.ts` stopper dem.
- Helsepersonelloven § 13: markedsføringen skal være forsvarlig, nøktern og saklig. Ingen effektløfter, ingen prosenter om effekt, ingen pasientuttalelser, ingen før/etter, ingen kritikk av andre behandlere. Aldri «spesialist», «nevrokiropraktor», «garanti», «kurere», «mirakel», «helt frisk» eller «smertefri» (`site.compliance.bannedWords`, sjekket av samme test). Tittelen er «kiropraktor», vist som «Kiropraktor, DACNB».
- Bevisste avgrensninger (arbeidsdokument §18): ikke long covid-opphold, ikke justering av spedbarn, ikke barns atferdskurs.
- Ingen priser på siden (`compliance.showPrices = false`).
- Ved akutt svimmelhet med tegn på slag: 113 først. Rådet står før alt salg på svimmelhet, hjernerystelse og krystallsyke.
- Bare ekte bilder, aldri stock eller genererte personer.
- Ingen deploy til olvelyngset.no uten Olves godkjenning av tekstene. Lanseringssperren `src/lib/launch-gate.test.ts` (kjøres først i `npm run deploy`) stopper et bygg for produksjonsverten så lenge det finnes `{{OLVE_BEKREFT:`/`{{FASE_B:` i innhold eller config, et bilde uten `consent: true` eller et portrett uten `approvedByOlve`. På forhåndsvisningsverten hopper den over.
