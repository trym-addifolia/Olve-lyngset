import { ImageResponse } from 'next/og'
import { site } from '@/site.config'

export const OG_SIZE = { width: 1200, height: 630 }

/*
 * Shared Open Graph card: ink ground, ember rule, paper type. System fonts so
 * no font fetch at build. Hex values mirror site.config.ts theme (the one
 * allowed place besides the config itself).
 */
export function buildOgImage(title: string, subtitle: string) {
  const t = site.theme
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 96px',
        backgroundColor: t.ink[950],
        color: t.paper,
        fontFamily: 'Georgia, serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 36 }}>
        <div style={{ width: 56, height: 2, backgroundColor: t.ember[400] }} />
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: t.ember[300],
            fontFamily: 'sans-serif',
          }}
        >
          {site.brand.name}
        </div>
      </div>
      <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.1, maxWidth: 980 }}>{title}</div>
      <div
        style={{
          marginTop: 32,
          fontSize: 30,
          color: '#C9D1D6',
          fontFamily: 'sans-serif',
          maxWidth: 940,
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 56,
          left: 96,
          fontSize: 24,
          color: '#8A98A3',
          fontFamily: 'sans-serif',
        }}
      >
        {`${site.practitioner.name}, ${site.practitioner.title.toLowerCase()} · ${site.contact.address.full}`}
      </div>
    </div>,
    OG_SIZE,
  )
}
