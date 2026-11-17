'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { KOMMENTAR_UI_COOKIE } from '@/lib/kommentar/tilgang'

const KommentarModus = dynamic(() => import('./KommentarModus'), { ssr: false })

/** Preview only: loads comment mode for whoever opened the secret link. */
export default function KommentarLag({ enabled }: { enabled: boolean }) {
  const [aktiv, setAktiv] = useState(false)
  useEffect(() => {
    if (enabled) setAktiv(document.cookie.split('; ').includes(`${KOMMENTAR_UI_COOKIE}=1`))
  }, [enabled])
  return aktiv ? <KommentarModus /> : null
}
