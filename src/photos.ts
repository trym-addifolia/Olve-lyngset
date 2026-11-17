/*
 * The clinic's own photos, taken 2026-11-10 (iPhone) and supplied by Trym
 * 2026-11-16. Exported to public/bilder/ without EXIF (the originals carry GPS);
 * originals stay out of git in «bilder olve/». Never stock, never generated.
 *
 * width/height are display sizes; the files are 2x for sharp screens, same ratio.
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
  nakken: {
    src: '/bilder/olve-nakken.jpg',
    width: 480,
    height: 640,
    alt: 'Kiropraktor Olve Lyngset peker på nakken på en modell av ryggsøylen',
  },
} as const

export type PhotoName = keyof typeof PHOTOS
