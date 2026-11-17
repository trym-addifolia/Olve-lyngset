# olvelyngset.no: design

Date: 2026-11-17. Approved by Trym the same day.
Source of truth for text: `olvelyngset_nettside_arbeidsdokument.md` (Olve's working document, v0.9).

## Goal

A personal, professional site for **Olve Lyngset, kiropraktor (DACNB)**, Limbra Storgata, Lillestrøm. It covers all his services, with two equal main entrances (svimmelhet og balanse; langvarige plager etter hjernerystelse), plus ordinary chiropractic and the intensive stay. It is a separate site from krystallsyken.no but visibly the same family, so returning patients recognise it.

Reader reaction we want: «Dit må jeg bare. Endelig noen som kan hjelpe.» Core message: «Det er hjelp å få.» Hope without promises.

## Decisions (Trym, 2026-11-17)

1. **Two sites, linked.** krystallsyken.no stays the deep BPPV site. olvelyngset.no gets a short `/svimmelhet/krystallsyke` summary that links out to it. No 301 from krystallsyken.no, and no duplicated text.
2. **Scope = the document's launch set:** `/`, `/svimmelhet`, `/svimmelhet/krystallsyke`, `/hjernerystelse`, `/intensivt-opphold`, `/andre-plager`, `/undersokelse`, `/om-olve`, `/kontakt` (practical info folded in), `/personvern`. PPPD, MdDS, vestibularisnevritt, Ménière and `/artikler` come later.
3. **Editing:** kommentar-modus (comments become GitHub issues in this repo); a CMS is deferred to phase 5 (articles).
4. **Two home directions** in the same visual family, both on the preview; Trym picks one and the other is deleted.

## Architecture

A fork of `krystallsyken-main` (Next.js 15 App Router, React 18, TS strict, Tailwind 3 + shadcn, Biome, OpenNext on Cloudflare Workers, Addifolia account, free tier). It is a copy rather than a shared package because the two sites will diverge.

Kept as is: `site.config.ts` as the only file holding client facts; `content/*.ts` with a `source` on every fact; the `{{OLVE_BEKREFT: ...}}` markers; banned words; the no-dash rule; the 113 safety box; kommentar-modus; cookieless hit and booking-click counting in D1; the security headers; the `/go/bestill` redirect; JSON-LD; sitemap; llms.txt; the noindex preview switch.

Changed:
- **Routing:** `src/app/[slug]` becomes `src/app/[...slug]` so nested `svimmelhet/krystallsyke` works. `routeBySlug` takes the joined path. Middleware and the sitemap handle the slash.
- **Removed (BPPV-only):** ExerciseTemplate, FaqTemplate (FAQ lives on pages), LocalTemplate, BookingTemplate (merged into contact), `content/positions.tsx`, the canal drawings in `content/illustrations.tsx` (keep only what a remaining page uses), `keywords.generated.ts`, all 21 old routes and texts, legacy redirects, `public/gammel/`.
- **Brand:** name «Olve Lyngset», tagline «Kiropraktor, DACNB · Lillestrøm», domain `www.olvelyngset.no`, cookie prefix `ol`, Worker `olvelyngset`, D1 `olvelyngset-maling`, comments repo `trym-addifolia/Olve-lyngset`, preview `https://olvelyngset.hei-0de.workers.dev` (noindex).
- **Schema:** `Person` + `WebSite` + `BreadcrumbList`. The document says not to claim a separate clinic; Limbra is the `workLocation`.

## Visual system

Shared with krystallsyken: Newsreader (display) + Source Sans 3 (body), petrol `fjord` scale, `ink` dark band and footer, linen `paper`, `mist` alternate ground, generous editorial spacing, hairline rules, one dark band per page.

The orange `krystall` accent survives **only** on `/svimmelhet/krystallsyke`, as the link to the sister site.

Each direction gets its own accent token (`accent` scale in `site.config.ts` theme):

- **Direction A, «To dører»** (served at `/`): H1 from the document, a lede, *Bestill time* plus *Slik undersøker jeg*, and a portrait. Directly below are two equal doorway panels, Svimmelhet og balanse | Plager etter hjernerystelse, each with two lines and a link. Then a thin strip «Også vanlig kiropraktikk». Then undersøkelse («flere vinduer inn i nervesystemet») with the videobriller photo, «Gråsonen» as the dark band, Om meg, Klar for å ta kontakt (booking + intensivt opphold), and practical info / location card. Accent: moss green.
- **Direction B, «Det er hjelp å få»** (served at `/retning-b`, noindex, not in nav or sitemap): person-led. A large portrait with the quote «Det er hjelp å få.» as the typographic centrepiece, the H1 and lede next to it, then «Gråsonen mellom syk og frisk» as the dark band early, then the doorways, then the same lower sections. Accent: warm ochre.

The look is not "AI landing page": no gradients, no icon grids, no stock photos, no fake stats, and no generated people. Real photos only (`public/bilder/`, EXIF stripped).

## Content rules (carried over plus the document's own)

- Title is «kiropraktor». DACNB is shown as «Kiropraktor, DACNB» with an explanation (Diplomate of the American Chiropractic Neurology Board) on Om Olve. Never «spesialist», never «nevrokiropraktor».
- No promises, no percentages, no testimonials, no before/after. Use the document's «Unngå» list and «Bevisste avgrensninger» (no long covid stay, no infant adjustments, no children's behaviour courses).
- No prices (`compliance.showPrices = false`).
- 113 advice before any sales on svimmelhet, hjernerystelse and krystallsyke.
- No U+2013 / U+2014 anywhere. The document is full of en dashes, so rewrite them with commas, colons or periods.
- Facts not yet confirmed render as `{{OLVE_BEKREFT: ...}}`: `kontakt@olvelyngset.no` (not created), the Limbra reception phone (the existing 906 66 485 is Olve's from the old site, so keep it but confirm), Carrick Institute wording, Norsk Kiropraktorforening membership, the Davenport/Palmer year, and session lengths (40 to 50 / 50 to 60 min).
- Facts already confirmed in krystallsyken (reuse): Storgata 25B 2000 Lillestrøm, hours, the Solvit deeplink, HPR 8056501, LOL AS org 928 308 979, Palmer College 1993.

## Contact flow

- Ordinary visit: *Bestill time* → `/go/bestill` (counted) → the Solvit deeplink.
- Intensive stay: `mailto:` with subject «Forespørsel om intensivt rehabiliteringsopphold». The address is marked OLVE_BEKREFT until the mailbox exists. Include the warning not to send health details by email.

## Testing / done

- `npm run check` (typecheck, lint, vitest, build) is green.
- A vitest test guards banned words and the U+2013/U+2014 ban across `content/` and `routes.ts`.
- Playwright screenshots of both directions at 1440 and 390 width, plus every inner page at 1440.
- Deployed to the preview Worker. Pushed to `trym-addifolia/Olve-lyngset` `main`.

## Out of scope

The diagnosis subpages, articles, CMS, domain purchase, email setup, Limbra permission, and the krystallsyken.no redirect map.
