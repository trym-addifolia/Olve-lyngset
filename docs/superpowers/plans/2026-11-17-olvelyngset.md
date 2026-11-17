# olvelyngset.no Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the krystallsyken-main fork in this repo into olvelyngset.no: 10 pages for all of Olve's services, plus two home-page directions on a noindex preview.

**Architecture:** This is the same Next.js 15 / OpenNext / Cloudflare codebase as krystallsyken. `site.config.ts` holds the facts, `src/routes.ts` the page registry, `content/*.ts` the text (each fact has a `source`), and `src/components/templates/*` holds one template per page kind. The routing becomes a catch-all so nested slugs work. Spec: `docs/superpowers/specs/2026-11-17-olvelyngset-design.md`. Text source: `docs/olve/olvelyngset_nettside_arbeidsdokument.md` (cited below as «doc §N»).

**Tech Stack:** Next.js 15 App Router, React 18, TypeScript strict, Tailwind 3 + shadcn, Biome, Vitest, OpenNext Cloudflare, D1.

**House rules (every task):**
- No U+2013 or U+2014 anywhere in the repo's src/content/routes. The doc is full of en dashes: rewrite with commas, colons, periods or «til» (40 til 50 minutter).
- Never write «spesialist», «nevrokiropraktor», «garanti», «kurere», «mirakel», «helt frisk» or «smertefri» (`site.compliance.bannedWords`).
- No prices, no testimonials, no outcome promises, no stock or generated images.
- Unconfirmed facts: `{{OLVE_BEKREFT: etikett | visning}}`.
- Each `Sourced.source` cites the doc section, e.g. `'arbeidsdokument §5'`, or `'krystallsyken site.config'`.
- Commit identity is automatic (includeIf: trym-addifolia). End commit messages with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- `npm run check` must be green before each commit. Node 20 is on PATH.

---

## Route registry (locked; all tasks use these exact slugs and templates)

| slug | template | nav | navLabel | H1 (doc) |
|---|---|---|---|---|
| `''` | `home` | main | Hjem | Svimmelhet, hjernerystelse eller plager som ikke slipper taket? (§4) |
| `svimmelhet` | `hub` | main | Svimmelhet | Svimmelhet og balanseproblemer (§5) |
| `svimmelhet/krystallsyke` | `info` | (none; linked from svimmelhet) | Krystallsyke | Krystallsyke (BPPV): undersøkelse og behandling (§12) |
| `hjernerystelse` | `info` | main | Hjernerystelse | Når plagene etter hjernerystelsen ikke går over (§6) |
| `intensivt-opphold` | `landing` | main | Intensivt opphold | Intensivt rehabiliteringsopphold i Lillestrøm (§7) |
| `andre-plager` | `info` | main | Andre plager | Kiropraktikk for rygg, nakke og andre muskel- og skjelettplager (§9) |
| `undersokelse` | `info` | main | Undersøkelse | Flere vinduer inn i nervesystemet (§8) |
| `om-olve` | `practitioner` | main | Om Olve | Om Olve Lyngset (§10) |
| `kontakt` | `contact` | main, footer | Kontakt | Bestill time hos Olve Lyngset (§11) |
| `personvern` | `privacy` | footer | Personvern | Personvern |
| `retning-b` | `home-b` | (none) | Retning B | same H1 as home | 

`retning-b` is `noindex`, excluded from the sitemap and llms.txt, and its `<title>` is prefixed «[Forhåndsvisning B]». Add a `Route.hidden?: boolean` flag for that.

Titles and descriptions: from the doc's «SEO-tittel» and «Metabeskrivelse» lines, with dashes rewritten. Where the doc has none (krystallsyke, personvern), write them.

---

### Task 1: Foundation (rebrand, routing, prune, guard test, stub content)

**Files:**
- Modify: `package.json` (name `olvelyngset`), `wrangler.jsonc` (name and service `olvelyngset`, D1 `olvelyngset-maling` with database_id `"TODO-create"` left as a string the deploy task fills in, var `GITHUB_KOMMENTAR_REPO=trym-addifolia/Olve-lyngset`), `.env.production` (`NEXT_PUBLIC_SITE_URL=https://olvelyngset.hei-0de.workers.dev`), `next.config.js` (REDIRECTS = []), `CLAUDE.md`, `README.md` (rewrite for this site, same structure, Norwegian).
- Modify: `src/site.config.ts`: brand (name «Olve Lyngset», shortName «Olve Lyngset», tagline «Kiropraktor, DACNB · Lillestrøm», domain `www.olvelyngset.no`, cookiePrefix `ol`, description from the doc §4 meta), `practitioner.titleLong` «Kiropraktor, DACNB», `yearsInPractice` «Mer enn 30 års klinisk erfaring», `education` keep Palmer 1993 but wrap the year as OLVE_BEKREFT, add `memberships: ['{{OLVE_BEKREFT: NKF-medlemskap | Medlem av Norsk Kiropraktorforening}}']`, `furtherEducation` (Carrick Institute, vestibular rehab, as OLVE_BEKREFT), `contact.email: '{{OLVE_BEKREFT: e-post | kontakt@olvelyngset.no}}'` plus a `contact.emailHref` for mailto with the subject «Forespørsel om intensivt rehabiliteringsopphold», equipment list (VOG/VNG videobriller, sakkadometer, balanse og koordinasjon; drop CAPS unless the doc mentions it, which it does not). Theme: add `moss` and `ochre` scales (50..900) and keep `krystall`. Keep everything else confirmed (address, hours, booking, HPR, org).
- Modify: `tailwind.config.ts` (expose `moss`, `ochre`).
- Modify: `src/routes.ts`: replace ROUTES with the registry above; drop `adGroup`/`noAds`/`legacy` uses that no longer make sense (keep fields optional if templates read them); REDIRECTS = []; `SAFETY_ROUTE` now points at an anchor (`/svimmelhet#akutt`), not a page, so change SafetyBox to link there; `pathOf` works with nested slugs; `KNOWN_SLUGS` holds the full paths.
- Move: `src/app/[slug]/page.tsx` → `src/app/[...slug]/page.tsx` (`params.slug: string[]`, join with `/`; `generateStaticParams` returns split slugs; skips `hidden` + home). Add `src/app/retning-b/page.tsx` rendering `HomeTemplateB` (a stub until Task 3) with `robots: { index: false, follow: false }`.
- Update: `src/middleware.ts`, `src/app/sitemap.ts`, `src/app/llms.txt/route.ts`, `src/lib/schema.ts` (Person + WebSite + BreadcrumbList; Limbra as workLocation; no LocalBusiness/MedicalClinic claiming his own clinic), `src/components/Header.tsx` and `Footer.tsx` (new nav groups; no «fag» mega menu, just main nav + booking button), `src/lib/booking.ts`.
- Delete: `src/components/templates/{Exercise,Faq,Local,Booking}Template.tsx`, `content/positions.tsx`, `content/keywords.generated.ts`, `content/pages.ts`, `content/info.ts`, `content/home.ts` (replaced), `src/components/ConditionGrid.tsx` if unused, `public/gammel/`, `src/components/RailObserver.tsx` if unused. `content/illustrations.tsx`: delete all canal drawings, and change `Figure` consumers (`ArticleBody`, `CtaBand`, `PageHero`, `LandingTemplate`) to accept a photo (`PhotoName`) instead. CtaBand without a figure must still look finished.
- Create: `content/pages/` with one file per route (`svimmelhet.ts`, `krystallsyke.ts`, `hjernerystelse.ts`, `intensivt-opphold.ts`, `andre-plager.ts`, `undersokelse.ts`, `om-olve.ts`, `kontakt.ts`, `personvern.ts`, `home.ts`), each exporting a valid typed content object. For Task 1 a **stub** is fine: intro paragraph + closing from the doc. `content/index.ts` maps the slug to content.
- Photos: export `IMG_0910`, `IMG_0924`, `IMG_0928`, `IMG_0929` from `C:\Users\tlyng\Desktop\Addifolia\krystallsyken-main\bilder olve\` (exif_transpose, strip EXIF, long side 1600, JPEG q82, Pillow) to `public/bilder/` as `olve-ryggsoyle.jpg`, `vog-pasient-oreplansje.jpg`, `vog-naerbilde.jpg`, `vog-profil.jpg`; register them in `src/photos.ts` with honest Norwegian alt text. Comment in photos.ts: the patient in the VOG photos is identifiable; consent is confirmed internally before launch.
- Test: `src/lib/compliance.test.ts`

- [ ] **Step 1: Write the guard test**

```ts
// src/lib/compliance.test.ts
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { site } from '@/site.config'

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? files(p) : /\.(ts|tsx)$/.test(p) ? [p] : []
  })
}
const TEXT_FILES = [...files('content'), 'src/routes.ts', 'src/site.config.ts']

describe('compliance', () => {
  it.each(TEXT_FILES)('%s has no en or em dash', (f) => {
    expect(readFileSync(f, 'utf8')).not.toMatch(/[\u2013\u2014]/)
  })
  it.each(TEXT_FILES)('%s has no banned word', (f) => {
    const text = readFileSync(f, 'utf8').toLowerCase()
    for (const w of site.compliance.bannedWords) {
      if (f.endsWith('site.config.ts')) continue
      expect(text, w).not.toContain(w)
    }
  })
})
```

- [ ] **Step 2:** Run `npx vitest run src/lib/compliance.test.ts`. Expected: FAIL on the old content (dashes or words), or on missing files.
- [ ] **Step 3:** Do the rebrand, routing, prune, photo export and stubs listed above.
- [ ] **Step 4:** Run `npm run check`. Expected: typecheck, lint, test and build all pass, and the build lists all 10 routes plus `/retning-b`.
- [ ] **Step 5:** Run `npm run dev` and curl each path for 200 (`/`, `/svimmelhet`, `/svimmelhet/krystallsyke`, `/hjernerystelse`, `/intensivt-opphold`, `/andre-plager`, `/undersokelse`, `/om-olve`, `/kontakt`, `/personvern`, `/retning-b`), plus 404 for `/symptomer`.
- [ ] **Step 6:** Commit: «Grunnmur: olvelyngset.no, nye ruter, felles komponenter, vakt mot tankestreker og forbudte ord».

### Task 2: Inner page text and templates (parallel with Task 3, after Task 1)

**Files:** `content/pages/{svimmelhet,krystallsyke,hjernerystelse,intensivt-opphold,andre-plager,undersokelse,om-olve,kontakt,personvern}.ts`; may adjust `src/components/templates/{Info,Landing,Practitioner,Contact,Privacy}Template.tsx` and shared components. **Do not touch** `content/pages/home.ts` or `HomeTemplate*.tsx`.

- [ ] Fill each page with the doc's text (§5 svimmelhet, §6 hjernerystelse, §7 intensivt opphold, §8 undersøkelse, §9 andre plager, §10 om Olve, §11 kontakt). Rewrite only to remove dashes and banned words, and to swap the doc's open items for OLVE_BEKREFT markers.
- [ ] `svimmelhet` (hub): body from §5 plus a short «Tilstander jeg ofte møter» list. Krystallsyke links to `/svimmelhet/krystallsyke`. PPPD, MdDS, vestibularisnevritt and Ménière get one honest line each, **no links** (pages not built yet). The 113 box gets `id="akutt"` (§5 «Når svimmelhet må vurderes raskt»).
- [ ] `svimmelhet/krystallsyke`: short (about 250 to 350 words), following the §12 angle. A clear outbound card «Les mer på krystallsyken.no» linking to `https://www.krystallsyken.no` (until it launches: `https://krystallsyken.hei-0de.workers.dev`; put the URL in `site.config.ts` as `sister.krystallsyken`). Uses the orange `krystall` accent only here. 113 box.
- [ ] `hjernerystelse`: §6 with the quote heading «Jeg har ikke fått prøve meg ennå». Use «vedvarende plager etter hjernerystelse» in running text; mention «postcommotio» once as the technical term. Secondary CTA to `/intensivt-opphold`. 113 box (acute head injury: legevakt/113).
- [ ] `intensivt-opphold` (landing): §7. The timeline is the stay (about one week, 3 to 5 sessions a day, written exercises, follow-up by email, a possible revisit after 2 to 3 months). No online booking button: the primary CTA is mailto with the subject. Include the «ikke send helseopplysninger på e-post» line. Do not mention long covid at all.
- [ ] `undersokelse`: §8 with the photos `vog-profil` / `vog-naerbilde`, plus the existing `videobriller` screen photo. The equipment list comes from `site.practitioner.equipment`.
- [ ] `andre-plager`: §9 with the bullet list.
- [ ] `om-olve` (practitioner): §10. Facts table: Kiropraktor (HPR 8056501), DACNB (explain it), Utdanning, Videreutdanning (Carrick, vestibular), Erfaring, Medlemskap, Arbeidssted (Limbra Storgata, Lillestrøm), «personlig faglig nettside». Uses `olve-ryggsoyle` and the existing portrait. YouTube video (`7avfb-lI4Bs`, click-to-load) stays off (`showVideo: false`) until Olve has reviewed it (doc §14).
- [ ] `kontakt`: §11 with booking (Solvit deeplink via `/go/bestill`), mailto for the intensive stay, address, hours (from config), parking and directions (from config), first-consultation lengths as OLVE_BEKREFT, privacy line.
- [ ] `personvern`: adapt the krystallsyken text (`git show HEAD~1:content/info.ts` or the krystallsyken-main repo) to this site: D1 counting with no cookies, the kommentar cookie (only for Olve), YouTube nocookie, email. Controller: LOL AS, org 928 308 979.
- [ ] FAQs: only questions that each page actually answers (doc §13), 2 to 4 per page; none on personvern.
- [ ] Run `npm run check`, then commit «Innhold: undersider fra Olves arbeidsdokument».

### Task 3: Home directions A and B (parallel with Task 2, after Task 1)

**Files:** `content/pages/home.ts`, `src/components/templates/HomeTemplate.tsx` (A), create `src/components/templates/HomeTemplateB.tsx`, `src/app/page.tsx`, `src/app/retning-b/page.tsx`. May add home-only components under `src/components/home/`. Theme tokens are already in place from Task 1.

- [ ] Load the `design-taste-frontend` skill first, then follow it for the look-and-fix loop.
- [ ] Content: doc §4 in full (H1, ingress, Svimmelhet og balanse, Langvarige plager etter hjernerystelse, En grundig undersøkelse, Gråsonen mellom syk og frisk, Også vanlig kiropraktikk, Om meg, Klar for å ta kontakt), plus the practical/location block and 3 to 4 FAQs. One shared `HomeContent` type serves both directions.
- [ ] **A «To dører»** (moss accent): hero = eyebrow, H1, lede, buttons «Bestill time» + «Slik undersøker jeg» (→ `/undersokelse`), a short fact line (Limbra Storgata, Lillestrøm · Mer enn 30 års erfaring · Ingen henvisning nødvendig, if krystallsyken confirms that; otherwise leave it out), and the portrait. Immediately below: two equal doorway panels (svimmelhet / hjernerystelse), large serif heading, 2 to 3 lines, link, one photo each (VOG photo for svimmelhet; `olve-nakken` or a typographic panel for hjernerystelse). Then a slim «Også vanlig kiropraktikk» strip → `/andre-plager`. Then undersøkelse with a photo, «Gråsonen» as the single dark band, Om meg with the portrait, «Klar for å ta kontakt?» with two buttons (booking + intensivt opphold mailto/page), location card, and FAQ.
- [ ] **B «Det er hjelp å få»** (ochre accent): hero = large portrait (`olve-lyngset` or `olve-ryggsoyle`) bleeding to the edge, the quote «Det er hjelp å få.» in display serif as the dominant element, then the H1 as a smaller line, lede, booking button. Next, «Gråsonen mellom syk og frisk» as the dark band (second section), then the two doorways as a typographic list (not cards), then undersøkelse, Om meg, contact, location, FAQ.
- [ ] Both: mobile-first (390 px: no horizontal scroll, the booking button reachable in the first viewport), keep `StickyMobileCta`, no gradients, no icon grids, no fake stats, max one dark band.
- [ ] Screenshot both at 1440 and 390 with Playwright (save under `.playwright-mcp/`, which is git-ignored), look, fix, repeat until clean.
- [ ] Run `npm run check`, then commit «Forside: retning A (to dører) og retning B (det er hjelp å få)».

### Task 4: Integrate, review, deploy, push (controller)

- [ ] Merge the Task 2 and Task 3 branches into `main`; `npm run check` green.
- [ ] Code review (superpowers:code-reviewer) against the spec; fix the findings.
- [ ] Playwright screenshots of all pages; check for dashes and banned words in the rendered HTML.
- [ ] `npm run cf -- wrangler d1 create olvelyngset-maling`, put the id in `wrangler.jsonc`, then `npm run db:migrate` and `npm run deploy`. Verify the preview returns 200 plus `X-Robots-Tag`/meta noindex.
- [ ] `git push -u origin main`.
- [ ] Report to Trym: preview URLs (A `/`, B `/retning-b`), open OLVE_BEKREFT list, and the decision needed (A or B).
