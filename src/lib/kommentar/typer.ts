import { z } from 'zod'

export const MAKS_TEKST = 2000

export const PlasseringSchema = z.object({
  side: z.string().startsWith('/').max(200),
  tekst: z.string().max(1000),
  prefiks: z.string().max(80),
  suffiks: z.string().max(80),
  blokk: z.string().max(20),
  overskrift: z.string().max(200),
})

export const NyKommentarSchema = z.object({
  plassering: PlasseringSchema,
  kommentar: z.string().trim().min(1).max(MAKS_TEKST),
  forslag: z.string().trim().max(MAKS_TEKST),
})

export type Plassering = z.infer<typeof PlasseringSchema>
export type NyKommentar = z.infer<typeof NyKommentarSchema>

export type Status = 'venter' | 'godkjent' | 'endret' | 'avvist' | 'lukket'

export type Kommentar = NyKommentar & {
  nummer: number
  status: Status
  svar: string | null
  opprettet: string
}

export const STATUS_TEKST: Record<Status, string> = {
  venter: 'Venter',
  godkjent: 'Godkjent',
  endret: 'Endret',
  avvist: 'Avvist',
  lukket: 'Lukket',
}
