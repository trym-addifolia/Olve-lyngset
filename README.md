# olvelyngset.no, forslag fra Borrow Brains

Et eget forslag til olvelyngset.no, bygget fra Olves arbeidsdokument (v0.9).
Det ligger på en egen gren og rører ikke main.

Forhåndsvisning (noindex): https://olvelyngset-iqs5axb57-borrow-brains.vercel.app

## Innhold

- Svimmelhet og balanse, med undersider (PPPD, MdDS, vestibularisnevritt, Ménières sykdom)
- Hjernerystelse, intensivt opphold, undersøkelsen, andre plager, om Olve, kontakt
- Krystallsyke lenker til krystallsyken.no og dupliseres ikke her
- Alle fakta i `content/facts.json`. Status `ubekreftet` betyr at Olve må bekrefte før lansering
- Søkeordskart i `docs/seo/keyword-map.csv` (ett søkeordsknippe per side)

## Kjøre lokalt

```
npm ci
npm run dev        # http://localhost:3141
npm run check      # typecheck, lint, søkeord, test, build
```

Next.js 15, TypeScript, Tailwind.

## Før lansering

- Bilderett: portrettet (Greger Flak) og videobrillebildene (samtykke fra personen)
- Åpne fakta i `content/facts.json` (HPR, DACNB, telefon, diagnosetekster)
- Fjern noindex først når alt over er bekreftet
