import { OG_SIZE, buildOgImage } from '@/lib/og'
import { HOME } from '@/routes'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = HOME.title

export default function OgImage() {
  return buildOgImage(HOME.eyebrow, HOME.h1)
}
