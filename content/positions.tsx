import type { CSSProperties, ReactNode } from 'react'

/*
 * Position drawings: the conversation, Dix-Hallpike, and the eye movement as
 * a still trace. Same hand as illustrations.tsx: one line in the ink colour,
 * nothing moves. Plain pictograms on purpose (round heads, no face, hair or
 * goggles): the drawings explain a position, they do not portray a person.
 * The head turn and the goggles are told in the captions, not drawn.
 *
 * Limbs are capsules filled with the plate colour (--plate) and drawn back to
 * front, so they overlap cleanly. Line styles live in globals.css (.tegning).
 */

type P = [number, number]

function capsulePath(a: P, b: P, w: number): string {
  const r = w / 2
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1
  const dx = (b[0] - a[0]) / len
  const dy = (b[1] - a[1]) / len
  const nx = -dy * r
  const ny = dx * r
  const f = (n: number) => n.toFixed(1)
  return [
    `M${f(a[0] + nx)} ${f(a[1] + ny)}`,
    `L${f(b[0] + nx)} ${f(b[1] + ny)}`,
    `A${r} ${r} 0 0 0 ${f(b[0] - nx)} ${f(b[1] - ny)}`,
    `L${f(a[0] - nx)} ${f(a[1] - ny)}`,
    `A${r} ${r} 0 0 0 ${f(a[0] + nx)} ${f(a[1] + ny)}Z`,
  ].join('')
}

function Limb({ a, b, w }: { a: P; b: P; w: number }) {
  return <path className="flate" d={capsulePath(a, b, w)} />
}

type Pose = {
  head: P
  shoulder: P
  hip: P
  knee: P
  ankle: P
  toe: P
  elbow: P
  hand: P
}

function Head({ c }: { c: P }) {
  return <circle className="flate" cx={c[0]} cy={c[1]} r={13} />
}

function Person({ pose }: { pose: Pose }) {
  return (
    <g>
      <Limb a={pose.ankle} b={pose.toe} w={8} />
      <Limb a={pose.knee} b={pose.ankle} w={12} />
      <Limb a={pose.hip} b={pose.knee} w={15} />
      <Limb a={pose.shoulder} b={pose.hip} w={24} />
      <Limb a={pose.shoulder} b={pose.head} w={9} />
      <Head c={pose.head} />
      <Limb a={pose.shoulder} b={pose.elbow} w={10} />
      <Limb a={pose.elbow} b={pose.hand} w={9} />
    </g>
  )
}

const VIEWBOX = '0 -14 260 194'
const FLOOR = 172

function Scene({ title, children }: { title: string; children: ReactNode }) {
  return (
    <svg viewBox={VIEWBOX} role="img" aria-label={title} className="tegning block h-auto w-full">
      <path className="svak" d={`M8 ${FLOOR}H252`} />
      {children}
    </svg>
  )
}

/** Treatment bench: a top at y = 110 with two legs. */
function Bench() {
  return (
    <g>
      <rect className="flate" x={86} y={110} width={164} height={9} rx={4} />
      <path d={`M102 119V${FLOOR}M234 119V${FLOOR}`} />
    </g>
  )
}

const LEGS_FLAT = { knee: [198, 97] as P, ankle: [240, 97] as P, toe: [243, 83] as P }

const SITTING: Pose = {
  head: [145, 13],
  shoulder: [143, 41],
  hip: [152, 98],
  ...LEGS_FLAT,
  elbow: [153, 70],
  hand: [178, 87],
}
/** on the back, head past the end of the bench and a little below it */
const HANGING: Pose = {
  head: [65, 105],
  shoulder: [95, 97],
  hip: [152, 98],
  ...LEGS_FLAT,
  elbow: [125, 91],
  hand: [157, 88],
}
/** the practitioner standing at the head end, hands at the patient's head */
const PRACTITIONER: Pose = {
  head: [36, 6],
  shoulder: [32, 33],
  hip: [24, 90],
  knee: [24, 131],
  ankle: [23, 168],
  toe: [37, 169],
  elbow: [38, 72],
  hand: [52, 116],
}

function Samtale() {
  const left: Pose = {
    head: [70, 20],
    shoulder: [67, 48],
    hip: [72, 106],
    knee: [116, 108],
    ankle: [117, 160],
    toe: [133, 162],
    elbow: [76, 78],
    hand: [101, 95],
  }
  const m = (p: P): P => [260 - p[0], p[1]]
  const right: Pose = {
    head: m(left.head),
    shoulder: m(left.shoulder),
    hip: m(left.hip),
    knee: m(left.knee),
    ankle: m(left.ankle),
    toe: m(left.toe),
    elbow: m(left.elbow),
    hand: m(left.hand),
  }
  const chair = (x: number, dir: 1 | -1) => (
    <path
      d={`M${x - dir * 24} 62V120H${x + dir * 30}M${x - dir * 20} 120V${FLOOR}M${x + dir * 26} 120V${FLOOR}`}
    />
  )
  return (
    <Scene title="Tegning: to personer sitter på hver sin stol og snakker sammen">
      {chair(74, 1)}
      {chair(186, -1)}
      <Person pose={left} />
      <Person pose={right} />
    </Scene>
  )
}

const DIX: ReactNode[] = [
  <Scene
    key="1"
    title="Tegning: en person sitter på en benk med videobriller på, hodet vridd 45 grader til siden"
  >
    <Bench />
    <Person pose={SITTING} />
  </Scene>,
  <Scene
    key="2"
    title="Tegning: personen ligger på ryggen med hodet utenfor benken og vridd til siden, behandleren holder hodet"
  >
    <Bench />
    <Person pose={HANGING} />
    <Person pose={PRACTITIONER} />
  </Scene>,
]

/**
 * A numbered series of positions. The numbers are real: the positions follow
 * each other. Captions are HTML, so they stay readable on a phone.
 */
function Series({ scenes, captions }: { scenes: ReactNode[]; captions: string[] }) {
  return (
    <ol
      className={`grid gap-x-5 gap-y-6 ${scenes.length === 4 ? 'grid-cols-2 xl:grid-cols-4' : 'grid-cols-1 min-[420px]:grid-cols-2'}`}
    >
      {scenes.map((scene, i) => (
        <li key={captions[i]} className="min-w-0">
          {scene}
          <p className="mt-2 flex gap-2 text-[0.9375rem] leading-snug text-foreground/90">
            <span aria-hidden="true" className="font-serif text-[1.0625rem] leading-none text-fjord-700">
              {i + 1}
            </span>
            <span>{captions[i]}</span>
          </p>
        </li>
      ))}
    </ol>
  )
}

export type PositionName = 'samtale' | 'dix-hallpike'

/** A position drawing on a soft mist plate (white figures), for a step in a timeline. */
export function PositionFigure({ name, caption }: { name: PositionName; caption?: string }) {
  const series = name === 'dix-hallpike'
  return (
    <figure className={`mt-5 ${series ? '-ml-16 md:ml-0' : ''}`}>
      <div
        className={`rounded-lg bg-mist p-4 [--plate:theme(colors.white)] sm:p-6 ${
          series ? 'max-w-[34rem]' : 'max-w-[19rem]'
        }`}
      >
        {name === 'dix-hallpike' && (
          <Series
            scenes={DIX}
            captions={[
              'Du sitter på benken med videobrillene på, og jeg snur hodet ditt litt til siden.',
              'Jeg legger deg ned på ryggen med hodet litt bakover, og ser på øynene dine.',
            ]}
          />
        )}
        {name === 'samtale' && <Samtale />}
      </div>
      {caption && (
        <figcaption className="mt-3 text-[0.9375rem] leading-snug text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

const BASE = 62
/** amplitude of each beat: builds up, then fades */
const BEATS = [10, 20, 30, 38, 40, 36, 30, 23, 16, 10, 5]

function tracePath(): string {
  let d = `M8 ${BASE}H150`
  BEATS.forEach((a, i) => {
    const x = 150 + i * 42
    // slow drift, quick return: the sawtooth of a nystagmus recording
    d += `L${x + 42 * 0.82} ${BASE - a}L${x + 42} ${BASE}`
  })
  return `${d}H792`
}

/**
 * The eye movement as a trace on a time axis: the head is laid down (the
 * mark), a short pause, a run of beats that builds and fades, calm again.
 * When it scrolls into view the trace uncovers itself from left to right,
 * once (a clip that grows, not stroke-dashoffset, which non-scaling strokes
 * break). Without motion the whole trace stands, as before.
 */
export function NystagmusTrace({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 800 96"
        role="img"
        aria-label="Tegning av øyebevegelsen som et spor: hodet legges ned, etter en kort pause kommer en rekke rykk som tar seg opp og dør ut, så er det rolig igjen"
        className="tegning anim-rot block h-auto w-full"
      >
        <defs>
          <clipPath id="spor-klipp">
            <rect
              x={0}
              y={0}
              width={800}
              height={96}
              className="anim spor-avdekk"
              style={{ '--kf': 'spor-avdekk', '--dur': '1800ms' } as CSSProperties}
            />
          </clipPath>
        </defs>
        <path className="svak" d="M8 84H792" />
        {/* the moment the head is laid down */}
        <path d={`M90 ${BASE - 30}V${BASE + 12}`} />
        <g clipPath="url(#spor-klipp)">
          <path d={tracePath()} />
        </g>
      </svg>
      <p className="mt-1 grid grid-cols-3 gap-3 text-[0.9375rem] leading-snug text-muted-foreground">
        <span>Hodet legges ned</span>
        <span className="text-center">Rykkene tar seg opp</span>
        <span className="text-right">og dør ut</span>
      </p>
      <p className="mt-2 text-[0.9375rem] leading-snug text-muted-foreground">
        Slik ser rykkene ut under testen. De tar seg opp og dør ut av seg selv.
      </p>
    </div>
  )
}
