/*
 * The clinic's own photos, taken 2026-11-10 (iPhone) and supplied by Trym
 * 2026-11-16. Exported to public/bilder/ without EXIF (the originals carry GPS)
 * with Pillow (exif_transpose, long side 1600, JPEG q82); the originals stay
 * out of git, in krystallsyken-main «bilder olve/». Never stock, never generated.
 *
 * Keys are the file names (except videobriller), so content names a photo the
 * way it is named on disk. width/height are display sizes; the files are 2x
 * for sharp screens, same ratio.
 *
 * The patient in the three VOG photos (vog-pasient-oreplansje, vog-naerbilde,
 * vog-profil) is identifiable. Consent is confirmed internally before launch;
 * until then these photos are preview only.
 */
export const PHOTOS = {
  /** IMG_0925, cropped to the screen and the top of the head. No face is shown. */
  videobriller: {
    src: '/bilder/videobriller-skjerm.jpg',
    width: 600,
    height: 618,
    alt: 'Et øye på skjermen, filmet med infrarøde videobriller mens pasienten sitter foran skjermen',
  },
  /** IMG_0908 */
  'olve-nakken': {
    src: '/bilder/olve-nakken.jpg',
    width: 480,
    height: 640,
    alt: 'Kiropraktor Olve Lyngset peker på nakken på en modell av ryggsøylen',
  },
  /** IMG_0910: tall, the whole spine model down to the pelvis */
  'olve-ryggsoyle': {
    src: '/bilder/olve-ryggsoyle.jpg',
    width: 390,
    height: 800,
    alt: 'Kiropraktor Olve Lyngset sitter med en modell av ryggsøylen og bekkenet og peker på nakkevirvlene',
  },
  /** IMG_0924 */
  'vog-pasient-oreplansje': {
    src: '/bilder/vog-pasient-oreplansje.jpg',
    width: 713,
    height: 800,
    alt: 'En pasient med videobriller sitter foran en plansje som viser øret og balanseorganet',
  },
  /** IMG_0928 */
  'vog-naerbilde': {
    src: '/bilder/vog-naerbilde.jpg',
    width: 600,
    height: 800,
    alt: 'Nærbilde av en pasient med videobriller: et kamera foran det ene øyet, det andre øyet dekket',
  },
  /** IMG_0929 */
  'vog-profil': {
    src: '/bilder/vog-profil.jpg',
    width: 600,
    height: 800,
    alt: 'En pasient med videobriller sett fra siden, foran en plansje over øret',
  },
} as const

export type PhotoName = keyof typeof PHOTOS
