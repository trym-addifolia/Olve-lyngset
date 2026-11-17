/*
 * Named sources for the `source` field on every fact (claims-audit as data).
 * Order of authority: Olve's working document first (his own words from the
 * interview, v0.9 of 2026-11-17), then facts already confirmed for
 * krystallsyken.no, then the data flows in this repo.
 */
export const SRC = {
  /** docs/olve/olvelyngset_nettside_arbeidsdokument.md, by section */
  doc: (section: number) => `arbeidsdokument §${section}`,
  /** facts Olve confirmed for krystallsyken.no (address, hours, parking, booking) */
  krystallsyken: 'krystallsyken site.config',
  config: 'src/site.config.ts',
  /** what the code actually does (privacy page) */
  flows: 'faktiske dataflyter i dette repoet',
} as const
