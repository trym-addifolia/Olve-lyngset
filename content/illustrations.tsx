import type { CSSProperties, ReactNode } from 'react'

/*
 * The site's own drawings. One hand, one line weight, ink on the page ground;
 * orange is used for the crystals and nothing else.
 *
 * Motion rule: only the orange crystals move, and a line may draw itself.
 * Bodies, heads, eyes and whole figures never turn, slide or pulse (the
 * reader is dizzy). Every animation is short, runs once, is started by the
 * reader's scrolling (src/components/AnimObserver.tsx) and ends in the
 * drawing as it stands without motion. With reduced motion, or without
 * JavaScript, only the finished drawing is shown (globals.css, «anim»).
 *
 * The inner ear is drawn as in a textbook, seen from the side: the three
 * canals at right angles to each other (the horizontal one in perspective,
 * inside the back canal's hoop), all springing from the vestibule, the
 * front and back canals sharing a common stem, each with its ampulla, and
 * the cochlea faintly toned so the whole reads as «the inner ear». The
 * crystals belong as a cluster on one spot in the utricle; the loose ones
 * lie low in the back canal, near the ampulla.
 *
 * The tubes are a thick ink stroke with a slightly thinner stroke in the
 * ground colour on top, so overlapping shapes merge into one outline.
 * `ground` must therefore match the surface the drawing sits on.
 */

export type FigureName = 'buegangene-ute' | 'buegangene-pa-plass' | 'brillene'
export type Ground = 'paper' | 'mist' | 'card' | 'night'
/** which canal a small figure points out: back, horizontal, front */
export type CanalName = 'bakre' | 'horisontal' | 'fremre'

const GROUND: Record<Ground, { stroke: string; fill: string; ink: string }> = {
  paper: { stroke: 'stroke-paper', fill: 'fill-paper', ink: 'text-ink-900' },
  mist: { stroke: 'stroke-mist', fill: 'fill-mist', ink: 'text-ink-900' },
  card: { stroke: 'stroke-card', fill: 'fill-card', ink: 'text-ink-900' },
  night: { stroke: 'stroke-ink-900', fill: 'fill-ink-900', ink: 'text-fjord-100' },
}

type P = [number, number]
/** a path as a start point and cubic segments [c1, c2, end] */
type Curve = { start: P; segs: [P, P, P][] }

const curveD = ({ start, segs }: Curve) =>
  `M${start.join(' ')}${segs.map((s) => `C${s.map((p) => p.join(' ')).join(' ')}`).join('')}`

/** the common stem the front and back canals share, from the vestibule up */
const CRUS: Curve = { start: [276, 276], segs: [[[281, 243], [287, 209], [292, 176]]] }
const CANAL: Record<CanalName, Curve> = {
  // from the top of the common stem, round the back, down to the ampulla
  bakre: {
    start: [292, 176],
    segs: [
      [
        [306, 100],
        [432, 92],
        [452, 200],
      ],
      [
        [472, 300],
        [400, 372],
        [284, 324],
      ],
    ],
  },
  // from the ampulla at the vestibule, back in a flat hoop, and in again
  horisontal: {
    start: [288, 272],
    segs: [
      [
        [312, 222],
        [392, 212],
        [404, 238],
      ],
      [
        [414, 262],
        [352, 276],
        [294, 288],
      ],
    ],
  },
  // from the top of the common stem, forward over the top, down to the ampulla
  fremre: {
    start: [292, 176],
    segs: [
      [
        [296, 70],
        [186, 44],
        [152, 112],
      ],
      [
        [128, 160],
        [146, 230],
        [190, 270],
      ],
    ],
  },
}
const AMPULLA: Record<CanalName, [number, number, number]> = {
  bakre: [298, 332, 22],
  horisontal: [296, 276, 20],
  fremre: [192, 262, 22],
}
const VESTIBULE = { cx: 232, cy: 300, rx: 60, ry: 40 }
const MACULA = { cx: 238, cy: 293, rx: 38, ry: 17 }
const COCHLEA_C: P = [106, 336]

function bezier(p0: P, [c1, c2, p3]: [P, P, P], t: number): P {
  const m = 1 - t
  const f = (i: 0 | 1) =>
    m * m * m * p0[i] + 3 * m * m * t * c1[i] + 3 * m * t * t * c2[i] + t * t * t * p3[i]
  return [f(0), f(1)]
}

/** a point on a curve at segment index + t (e.g. 1.6 = second segment, t 0.6) */
function at(c: Curve, u: number): P {
  const i = Math.min(Math.floor(u), c.segs.length - 1)
  const p0 = i === 0 ? c.start : c.segs[i - 1][2]
  return bezier(p0, c.segs[i], u - i)
}

/** points along a curve from u0 to u1 (u as in `at`), n steps */
function along(c: Curve, u0: number, u1: number, n: number): P[] {
  return Array.from({ length: n + 1 }, (_, k) => at(c, u0 + ((u1 - u0) * k) / n))
}

function spiralD(): string {
  const n = 120
  let d = ''
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const th = -0.2 + t * 2.6 * 2 * Math.PI
    const r = 54 - t * 44
    const x = COCHLEA_C[0] + Math.cos(th) * r
    const y = COCHLEA_C[1] + Math.sin(th) * r * 0.92
    d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return d
}
const SPIRAL = spiralD()

/** Utricle positions: where the crystals belong, as one cluster. */
const HOME_SPOTS: P[] = [
  [214, 292],
  [228, 284],
  [242, 292],
  [228, 300],
  [256, 284],
  [246, 304],
  [262, 298],
]
/** the last three home spots are the ones that come loose */
const LOOSE_FROM = 4

/** where the loose crystals rest in each canal, as positions along the curve */
const REST: Record<CanalName, number[]> = {
  // low in the back canal, near the ampulla
  bakre: [1.68, 1.76, 1.84],
  // the far, lower part of the hoop
  horisontal: [1.12, 1.24, 1.36],
  // low in the front arm, near the ampulla
  fremre: [1.62, 1.72, 1.82],
}
/** the route in: through the common stem for the vertical canals, the plain end for the horizontal */
function route(canal: CanalName, from: P, rest: number): P[] {
  const c = CANAL[canal]
  if (canal === 'horisontal') {
    const back = along({ start: c.start, segs: c.segs }, 2, rest, 16)
    return [from, [286, 292], ...back]
  }
  return [from, ...along(CRUS, 0, 1, 6), ...along(c, 0, rest, 22)]
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
/** inverse of `ease`, by bisection: the time at which the eased progress is s */
function easeInv(s: number): number {
  let lo = 0
  let hi = 1
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2
    if (ease(mid) < s) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

/**
 * Keyframes that carry a crystal along a route and end where it is drawn.
 * Linear timing, with the ease-in-out baked into the percentages, so the
 * crystal does not brake at every waypoint.
 */
function routeKeyframes(name: string, pts: P[]): string {
  const end = pts[pts.length - 1]
  const lens = [0]
  for (let i = 1; i < pts.length; i++) {
    lens.push(lens[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]))
  }
  const total = lens[lens.length - 1] || 1
  const frames = pts.map((p, i) => {
    const pct = (easeInv(lens[i] / total) * 100).toFixed(2)
    return `${pct}%{transform:translate(${(p[0] - end[0]).toFixed(1)}px,${(p[1] - end[1]).toFixed(1)}px)}`
  })
  return `@keyframes ${name}{${frames.join('')}}`
}

function crystalD([x, y]: P, s: number) {
  return `M${x.toFixed(1)} ${(y - s).toFixed(1)}l${s} ${s}l${-s} ${s}l${-s} ${-s}Z`
}

type AnimStyle = CSSProperties & { '--kf'?: string; '--dur'?: string; '--delay'?: string }

function Label({
  x,
  y,
  from,
  to,
  children,
  anchor = 'middle',
}: {
  x: number
  y: number
  from?: P
  to?: P
  children: ReactNode
  anchor?: 'start' | 'middle' | 'end'
}) {
  return (
    <g className="hidden sm:block lg:hidden xl:block">
      {from && to && (
        <line
          x1={from[0]}
          y1={from[1]}
          x2={to[0]}
          y2={to[1]}
          stroke="currentColor"
          strokeWidth={1}
          opacity={0.55}
        />
      )}
      <text x={x} y={y} textAnchor={anchor} fontSize={17} fill="currentColor" className="font-sans">
        {children}
      </text>
    </g>
  )
}

/** The labyrinth as one merged outline (ink, then ground), plus the faint cochlea. */
function Labyrinth({ g }: { g: (typeof GROUND)[Ground] }) {
  const tubes = [CRUS, CANAL.bakre, CANAL.horisontal, CANAL.fremre].map(curveD)
  const amp = Object.values(AMPULLA)
  return (
    <>
      {/* the cochlea, faintly toned: it makes the drawing read as the inner ear */}
      <g opacity={0.4} fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2.5}>
        <circle
          cx={COCHLEA_C[0]}
          cy={COCHLEA_C[1]}
          r={58}
          fill="currentColor"
          fillOpacity={0.08}
        />
        <path d={SPIRAL} />
        <path d="M162 318 L176 314" />
      </g>
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        {tubes.map((d) => (
          <path key={d} d={d} strokeWidth={28} />
        ))}
      </g>
      <g fill="currentColor">
        {amp.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r + 2.5} />
        ))}
        <ellipse
          cx={VESTIBULE.cx}
          cy={VESTIBULE.cy}
          rx={VESTIBULE.rx + 2.5}
          ry={VESTIBULE.ry + 2.5}
        />
      </g>
      <g fill="none" className={g.stroke} strokeLinecap="round">
        {tubes.map((d) => (
          <path key={d} d={d} strokeWidth={23} />
        ))}
      </g>
      <g className={g.fill}>
        {amp.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
        ))}
        <ellipse cx={VESTIBULE.cx} cy={VESTIBULE.cy} rx={VESTIBULE.rx} ry={VESTIBULE.ry} />
      </g>
    </>
  )
}

function Buegangene({
  loose,
  ground,
  labels,
  canal,
}: {
  loose: boolean
  ground: Ground
  labels: boolean
  /** a small figure that points out one canal (/buegangene) */
  canal?: CanalName
}) {
  const g = GROUND[ground]
  const which: CanalName = canal ?? 'bakre'
  const moving = loose || canal !== undefined
  const restAt = REST[which].map((u) => at(CANAL[which], u))
  const kf = moving
    ? restAt.map((p, i) => routeKeyframes(`kr-${which}-${i}`, route(which, HOME_SPOTS[LOOSE_FROM + i], REST[which][i])))
    : []
  const dur = canal ? 1100 : 1600
  return (
    <svg
      viewBox="0 0 480 440"
      className={`h-auto w-full ${g.ink} ${moving ? 'anim-rot' : ''}`}
      aria-hidden="true"
      focusable="false"
    >
      {moving && <style>{kf.join('')}</style>}
      {canal ? (
        <>
          {/* the other canals step back in colour, never in opacity (hidden joins would show) */}
          <g className="anim kanal-demp" style={{ '--kf': 'kanal-demp', '--dur': '700ms' } as AnimStyle}>
            <Labyrinth g={g} />
          </g>
          <ActiveCanal canal={canal} g={g} />
        </>
      ) : (
        <Labyrinth g={g} />
      )}
      {/* where the crystals live */}
      <ellipse
        cx={MACULA.cx}
        cy={MACULA.cy}
        rx={MACULA.rx}
        ry={MACULA.ry}
        className="fill-krystall-500"
        fillOpacity={0.14}
      />
      {HOME_SPOTS.map((p, i) =>
        moving && i >= LOOSE_FROM ? (
          <path
            key={p.join()}
            d={crystalD(p, 6.5)}
            className="fill-none stroke-krystall-500"
            strokeWidth={1.5}
            strokeDasharray="2.5 2.5"
          />
        ) : (
          <path key={p.join()} d={crystalD(p, 6.5)} className="fill-krystall-500" />
        ),
      )}
      {moving &&
        restAt.map((p, i) => (
          <path
            key={p.join()}
            d={crystalD(p, 7)}
            className="anim fill-krystall-500"
            style={
              {
                '--kf': `kr-${which}-${i}`,
                '--dur': `${dur}ms`,
                '--delay': `${(canal ? 250 : 0) + i * 140}ms`,
              } as AnimStyle
            }
          />
        ))}
      {labels && !canal && (
        <>
          <Label x={150} y={24}>
            fremre buegang
          </Label>
          <Label x={448} y={80} anchor="end">
            bakre buegang
          </Label>
          <Label x={362} y={170}>
            horisontal
          </Label>
          <Label x={362} y={190} from={[362, 196]} to={[364, 228]}>
            buegang
          </Label>
          <Label x={106} y={426}>
            sneglehuset
          </Label>
          {loose ? (
            <>
              <Label x={474} y={404} anchor="end" from={[392, 388]} to={[362, 350]}>
                krystaller på avveie
              </Label>
              <Label x={250} y={426} from={[246, 410]} to={[240, 312]}>
                her hører de hjemme
              </Label>
            </>
          ) : (
            <Label x={260} y={420} from={[252, 404]} to={[240, 312]}>
              krystallene på plass
            </Label>
          )}
        </>
      )}
    </svg>
  )
}

/** One canal drawn again in full ink over the stepped-back drawing, kept off the vestibule. */
function ActiveCanal({ canal, g }: { canal: CanalName; g: (typeof GROUND)[Ground] }) {
  const id = `uten-forgard-${canal}`
  const tubes = [CANAL[canal], ...(canal === 'horisontal' ? [] : [CRUS])].map(curveD)
  const [x, y, r] = AMPULLA[canal]
  return (
    <>
      <defs>
        <mask id={id}>
          <rect x={0} y={0} width={480} height={440} fill="white" />
          <ellipse
            cx={VESTIBULE.cx}
            cy={VESTIBULE.cy}
            rx={VESTIBULE.rx - 1}
            ry={VESTIBULE.ry - 1}
            fill="black"
          />
        </mask>
      </defs>
      <g mask={`url(#${id})`}>
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          {tubes.map((d) => (
            <path key={d} d={d} strokeWidth={28} />
          ))}
        </g>
        <circle cx={x} cy={y} r={r + 2.5} fill="currentColor" />
        <g fill="none" className={g.stroke} strokeLinecap="round">
          {tubes.map((d) => (
            <path key={d} d={d} strokeWidth={23} />
          ))}
        </g>
        <circle cx={x} cy={y} r={r} className={g.fill} />
      </g>
    </>
  )
}

function Brillene({ ground }: { ground: Ground }) {
  const g = GROUND[ground]
  return (
    <svg viewBox="0 0 400 300" className={`h-auto w-full ${g.ink}`} aria-hidden="true" focusable="false">
      {/* the screen: the eye, seen in the dark */}
      <rect x={130} y={14} width={256} height={176} rx={14} className="fill-ink-900" />
      <g fill="none" className="stroke-fjord-100" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M172 102 C206 58 310 58 344 102 C310 146 206 146 172 102 Z" />
        <circle cx={258} cy={102} r={30} />
        <path d="M222 164 L294 164 M282 156 L294 164 L282 172" />
      </g>
      <circle cx={258} cy={102} r={12} className="fill-fjord-100" />
      {/* the cable */}
      <path
        d="M112 232 C150 262 214 250 230 190"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      {/* the goggles, seen from the front */}
      <g stroke="currentColor" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round">
        <path d="M14 214 L2 206 M186 214 L198 206" fill="none" />
        <path
          d="M30 176 H170 Q186 176 186 192 V236 Q186 252 170 252 H128 Q114 252 108 240 Q100 228 92 240 Q86 252 72 252 H30 Q14 252 14 236 V192 Q14 176 30 176 Z"
          className={g.fill}
        />
        <circle cx={58} cy={214} r={20} className="fill-ink-900" />
        <circle cx={142} cy={214} r={20} className="fill-ink-900" />
      </g>
    </svg>
  )
}

/** The two labels the SVG hides on small screens, as HTML under the drawing. */
function SmallLegend({ loose }: { loose: boolean }) {
  const mark = <span aria-hidden="true" className="mt-[0.45em] inline-block h-2 w-2 shrink-0 rotate-45 bg-krystall-500" />
  return (
    <ul className="mt-3 space-y-1 text-[0.9375rem] leading-snug text-foreground/85 sm:hidden lg:block xl:hidden">
      <li className="flex gap-2.5">
        {mark}
        <span>Klyngen i midten: her hører krystallene hjemme.</span>
      </li>
      {loose && (
        <li className="flex gap-2.5">
          {mark}
          <span>Nede i bakre buegang: krystaller på avveie.</span>
        </li>
      )}
    </ul>
  )
}

/**
 * A drawing by name. Decorative for assistive tech: the caption or the text
 * beside it carries the meaning, so pass `caption` wherever it stands alone.
 */
export function Figure({
  name,
  ground = 'paper',
  labels = false,
  caption,
  className,
  canal,
}: {
  name: FigureName
  ground?: Ground
  labels?: boolean
  caption?: string
  className?: string
  canal?: CanalName
}) {
  const loose = name === 'buegangene-ute'
  const drawing =
    name === 'brillene' ? (
      <Brillene ground={ground} />
    ) : (
      <Buegangene loose={loose} ground={ground} labels={labels} canal={canal} />
    )
  return (
    <figure className={className}>
      {drawing}
      {labels && name !== 'brillene' && <SmallLegend loose={loose} />}
      {caption && (
        <figcaption
          className={`mt-3 text-[0.9375rem] leading-snug ${ground === 'night' ? 'text-white/70' : 'text-muted-foreground'}`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
