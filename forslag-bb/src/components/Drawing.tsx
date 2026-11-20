import { DRAWINGS, DRAWING_LABELS } from '@content/site'
import type { DrawingName } from '@content/types'

/*
 * One hand for every drawing (see DESIGN.md): a 1.5 px ink line with round ends, one light
 * level line or axis, and one gold element (thin ink outline) for the eye to land on. Static, no motion.
 * Drawn on 320 x 200.
 */
const S = {
  stroke: 'var(--ink)',
  strokeWidth: 1.5,
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const
const LEVEL = { stroke: 'var(--line)', strokeWidth: 1.5, strokeLinecap: 'round' } as const
const OCHRE = { ...S, stroke: 'var(--fjord)' } as const
const T = { fill: 'var(--ink)', fontSize: 14, fontFamily: 'inherit' } as const

function Horisont() {
  return (
    <>
      <line x1="16" y1="100" x2="304" y2="100" {...LEVEL} />
      <path d="M26 100 Q66 56 108 100 Q66 144 26 100 Z" {...S} fill="var(--pane)" />
      <circle cx="70" cy="100" r="17" {...S} fill="var(--lamplight)" />
      <circle cx="75" cy="100" r="7" fill="var(--ink)" />
      <line x1="122" y1="100" x2="232" y2="100" {...OCHRE} strokeDasharray="1 9" />
      <circle cx="250" cy="100" r="9" fill="var(--gold)" stroke="var(--ink)" strokeWidth="1" />
      <circle cx="286" cy="100" r="9" {...OCHRE} strokeWidth="1.5" strokeDasharray="3 5" />
    </>
  )
}

function Briller() {
  return (
    <>
      <line x1="262" y1="92" x2="304" y2="92" {...LEVEL} />
      <path
        d="M112 188 C112 162 96 150 92 122 C84 72 120 32 170 32 C210 32 238 56 242 90 L257 122 C260 129 256 133 249 133 L246 133 L246 144 C251 147 251 151 246 153 L246 160 C246 171 238 175 228 174 L208 172 L206 188"
        {...S}
        fill="var(--pane)"
      />
      <path d="M148 98 q11 -7 13 8 q0 11 -9 13" {...S} />
      <path d="M198 86 C164 76 126 82 94 106" {...S} stroke="var(--ink)" strokeWidth="7" />
      <rect x="194" y="72" width="60" height="38" rx="9" {...S} fill="var(--ink)" />
      <circle cx="237" cy="91" r="6" fill="var(--gold)" stroke="var(--ink)" strokeWidth="1" />
    </>
  )
}

function Person({ lean = 0, feet = 160 }: { lean?: number; feet?: number }) {
  return (
    <g transform={`rotate(${lean} 160 ${feet})`}>
      <circle cx="160" cy={feet - 124} r="15" {...S} fill="var(--pane)" />
      <path d={`M160 ${feet - 109} L160 ${feet - 50}`} {...S} strokeWidth="2.5" />
      <path d={`M160 ${feet - 96} L130 ${feet - 68} M160 ${feet - 96} L190 ${feet - 68}`} {...S} />
      <path
        d={`M160 ${feet - 50} L149 ${feet} h-9 M160 ${feet - 50} L171 ${feet} h9`}
        {...S}
        strokeWidth="2.5"
      />
    </g>
  )
}

function Balanse() {
  return (
    <>
      <line x1="36" y1="184" x2="284" y2="184" {...LEVEL} />
      <path
        d="M112 162 Q160 170 208 162 Q218 162 218 172 Q218 183 208 183 L112 183 Q102 183 102 172 Q102 162 112 162 Z"
        {...OCHRE}
        fill="var(--lamplight)"
      />
      <Person feet={165} />
    </>
  )
}

function Butikk() {
  const shelf = (y: number, pick: number) => (
    <g key={y}>
      {Array.from({ length: 12 }, (_, i) => {
        const h = 24 - ((i * 5 + y) % 4) * 4
        return (
          <rect
            key={i}
            x={46 + i * 19.5}
            y={y - h}
            width="13"
            height={h}
            rx="2"
            {...(i === pick ? OCHRE : S)}
            strokeWidth="1.5"
            fill={i === pick ? 'var(--gold)' : i % 3 === 1 ? 'var(--lamplight)' : 'var(--pane)'}
          />
        )
      })}
      <line x1="36" y1={y} x2="284" y2={y} {...S} />
    </g>
  )
  return (
    <>
      <line x1="16" y1="184" x2="304" y2="184" {...LEVEL} />
      <path d="M36 184 L36 22 L284 22 L284 184" {...S} />
      {[62, 108, 154].map((y, i) => shelf(y, i === 1 ? 7 : -1))}
    </>
  )
}

function Gynge() {
  return (
    <>
      <line x1="16" y1="160" x2="304" y2="160" {...LEVEL} />
      <path d="M30 160 Q72 136 116 160 T202 160 T290 160" {...OCHRE} strokeWidth="2.5" />
      <Person lean={7} feet={168} />
    </>
  )
}

function Syklus() {
  const [a, b, c] = DRAWING_LABELS.syklus
  const head = (x: number, y: number, deg: number) => (
    <path d="M-9 -5 L0 0 L-9 5" transform={`translate(${x} ${y}) rotate(${deg})`} {...OCHRE} />
  )
  return (
    <>
      <circle cx="160" cy="100" r="60" {...LEVEL} fill="none" />
      {head(212, 70, 60)}
      {head(160, 160, 180)}
      {head(108, 70, 300)}
      <circle cx="160" cy="40" r="7" fill="var(--ink)" />
      <circle cx="212" cy="130" r="7" fill="var(--ink)" />
      <circle cx="108" cy="130" r="7" fill="var(--ink)" />
      <text x="160" y="24" textAnchor="middle" {...T}>
        {a}
      </text>
      <text x="228" y="135" {...T}>
        {b}
      </text>
      <text x="120" y="163" textAnchor="end" {...T}>
        {c}
      </text>
    </>
  )
}

function Sakkade() {
  const [mal, reaksjon, presisjon] = DRAWING_LABELS.sakkade
  return (
    <>
      <path d="M30 168 L300 168 M30 168 L30 22" {...LEVEL} fill="none" />
      <path d="M40 138 L120 138 L120 60 L292 60" {...OCHRE} strokeDasharray="1 8" />
      <path
        d="M40 138 L160 138 C173 138 175 52 191 52 C201 52 205 61 215 60 L292 60"
        {...S}
        strokeWidth="2.5"
      />
      <path d="M120 152 L160 152 M120 146 v12 M160 146 v12" {...S} strokeWidth="1.5" />
      <text x="140" y="188" textAnchor="middle" {...T}>
        {reaksjon}
      </text>
      <text x="256" y="44" textAnchor="middle" {...T}>
        {mal}
      </text>
      <path d="M198 70 L214 92" {...LEVEL} />
      <text x="206" y="110" {...T}>
        {presisjon}
      </text>
    </>
  )
}

function Grasone() {
  const [syk, frisk] = DRAWING_LABELS.grasone
  return (
    <>
      <line x1="16" y1="100" x2="304" y2="100" {...LEVEL} />
      <rect x="30" y="80" width="260" height="40" rx="20" fill="var(--pane)" />
      <rect x="84" y="80" width="152" height="40" fill="var(--lamplight)" />
      <rect x="30" y="80" width="260" height="40" rx="20" {...S} />
      <circle cx="50" cy="100" r="9" fill="var(--ink)" />
      <circle cx="270" cy="100" r="9" {...S} fill="var(--pane)" />
      <circle cx="172" cy="100" r="9" fill="var(--gold)" stroke="var(--ink)" strokeWidth="1" />
      <text x="50" y="150" textAnchor="middle" {...T}>
        {syk}
      </text>
      <text x="270" y="150" textAnchor="middle" {...T}>
        {frisk}
      </text>
    </>
  )
}

function Dagen() {
  const [okt, hvile] = DRAWING_LABELS.dagen
  const session = (x: number) => (
    <rect key={x} x={x} y="62" width="56" height="58" rx="4" {...S} fill="var(--ink)" />
  )
  const rest = (x: number) => (
    <rect key={x} x={x} y="96" width="56" height="24" rx="4" {...S} fill="var(--lamplight)" />
  )
  return (
    <>
      <line x1="16" y1="120" x2="304" y2="120" {...LEVEL} />
      {[36, 164].map(session)}
      {[100, 228].map(rest)}
      <circle cx="20" cy="120" r="6" fill="var(--gold)" stroke="var(--ink)" strokeWidth="1" />
      <text x="64" y="148" textAnchor="middle" {...T}>
        {okt}
      </text>
      <text x="128" y="148" textAnchor="middle" {...T}>
        {hvile}
      </text>
    </>
  )
}

const ART: Record<DrawingName, () => JSX.Element> = {
  horisont: Horisont,
  briller: Briller,
  balanse: Balanse,
  butikk: Butikk,
  gynge: Gynge,
  syklus: Syklus,
  sakkade: Sakkade,
  grasone: Grasone,
  dagen: Dagen,
}

/* flat drawings get a lower plate, so a line across the page is not framed by empty space */
const BOX: Partial<Record<DrawingName, string>> = {
  horisont: '0 36 320 128',
  grasone: '0 44 320 128',
  dagen: '0 34 320 132',
}

export function Drawing({ name }: { name: DrawingName }) {
  const Art = ART[name]
  return (
    <svg
      data-figure
      viewBox={BOX[name] ?? '0 0 320 200'}
      role="img"
      aria-label={DRAWINGS[name]}
      className="block h-auto w-full"
    >
      <Art />
    </svg>
  )
}
