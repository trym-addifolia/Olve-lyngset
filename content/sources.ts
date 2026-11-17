/*
 * Named sources for the `source` field on every fact (claims-audit as data).
 * Order of authority: Olve's own texts first, then his
 * public profiles, then Trym's draft where sober, then public health sources.
 *
 * The YouTube videos (7avfb-lI4Bs, jpzmI2ajvZM) were transcribed with
 * faster-whisper large-v3 on 2026-11-09.
 * Speakers are not separated: both videos open with a patient testimonial,
 * which is never quoted or paraphrased here (hpl § 13). Only Olve's own
 * sentences are used, with the timestamp in the source. Machine transcript:
 * «eppelismanøver» is read as Epleys manøver, «krystalsyke» as krystallsyke.
 */
export const SRC = {
  /** Olve's own text on examination, treatment and aftercare, via Trym, 2026-11-10 */
  olve2026:
    'Olves egen tekst om undersøkelse, behandling og etterpå (via Trym, 2026-11-10), resultater/olve/2026-11-10-olve-undersokelse-behandling.md',
  /** Olve speaking in «Behandling av krystallsyken» (7avfb-lI4Bs), with timestamp */
  video: (seconds: number, quote?: string) =>
    `Olve Lyngset, fra videoen «Behandling av krystallsyken», https://www.youtube.com/watch?v=7avfb-lI4Bs&t=${seconds}s${quote ? ` («${quote}»)` : ''} (transkript faster-whisper 2026-11-09)`,
  /** Olve speaking in «Generell svimmelhet» (jpzmI2ajvZM), with timestamp */
  video2: (seconds: number, quote?: string) =>
    `Olve Lyngset, fra videoen «Generell svimmelhet», https://www.youtube.com/watch?v=jpzmI2ajvZM&t=${seconds}s${quote ? ` («${quote}»)` : ''} (transkript faster-whisper 2026-11-09)`,
  /** Olve's own first-person text on the old site */
  orig: (page: string) => `Olves egen tekst, gammel krystallsyken.no /${page}`,
  /** Patient phrasing quoted under «Hørt på klinikken» on the old site; used as symptom language only */
  hort: (page: string) =>
    `«Hørt på klinikken», gammel krystallsyken.no /${page} (symptomspråk, ikke effektbevis)`,
  limbra: 'limbra.no/terapeuter/olve-lyngset/ («Om meg, med mine egne ord», lest 2026-11-09)',
  limbraPriser: 'limbra.no/priser/lillestrom-storgata/ (lest 2026-11-09)',
  helsesmart: 'helsesmart.no/personalia/olve-lyngset-567/ (lest 2026-11-09, bekreftes av Olve)',
  youtube:
    'YouTube «Behandling av krystallsyken», Strømmen Kiropraktiske Klinikk, 7avfb-lI4Bs (maskintranskript 2026-11-09)',
  trym: 'Tryms utkast B (nøktern del)',
  helsenorge:
    'helsenorge.no/sykdom/svimmelhet-og-balanseforstyrrelser/krystallsyke/ (oppdatert 2025-10-07; hentet 2026-11-09: «De aller fleste blir friske», «høy risiko for å få den igjen», «Vitamin D-mangel kan også øke risikoen», «Kontakt fastlege eller legevakt ved akutt, kraftig eller plagsom svimmelhet»)',
  helsenorgeSlag: 'helsenorge.no/sykdom/hjerneslag/ (PRATE, SMILE, LØFTE, ring 113)',
  nhi: 'nhi.no/sykdommer/hjernenervesystem/ulike-sykdommer/benign-posisjonell-vertigo-bppv',
  nhiSvimmelhet: 'nhi.no/symptomer/hjerne-og-nervesystem/svimmelhet',
  sml: 'sml.snl.no/krystallsyke (Goplen, Store medisinske leksikon, oppdatert 2025-07-04)',
  marked: 'MARKED.md §3 (People also ask, ordrett)',
  kw: (k: string) => `keyword-map.csv (${k})`,
  config: 'src/site.config.ts',
  spec: 'oppsettet av siden',
  helfo:
    'helfo.no, stønad til kiropraktor: ingen henvisning nødvendig, refusjon for inntil 14 behandlinger per år (bekreftes mot klinikkens praksis)',
} as const

/** Public URLs used in running text (links in copy). */
export const URLS = {
  helsenorgeKrystallsyke:
    'https://www.helsenorge.no/sykdom/svimmelhet-og-balanseforstyrrelser/krystallsyke/',
  helsenorgeSlag: 'https://www.helsenorge.no/sykdom/hjerneslag/',
  nhiBppv:
    'https://nhi.no/sykdommer/hjernenervesystem/ulike-sykdommer/benign-posisjonell-vertigo-bppv',
  sml: 'https://sml.snl.no/krystallsyke',
} as const
