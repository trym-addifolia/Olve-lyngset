/*
 * Open-now status for the home page's location block, in Europe/Oslo time,
 * from the weekly hours in site.config.ts (the same source as the hours table).
 * Plain TS so it can be unit tested (vitest does not transform .tsx here).
 */
import { type WeeklyHours, site } from '@/site.config'

const DAY: Record<number, string> = {
  1: 'mandag',
  2: 'tirsdag',
  3: 'onsdag',
  4: 'torsdag',
  5: 'fredag',
  6: 'lørdag',
  7: 'søndag',
}

/** Weekday (1 = Monday) and «HH:MM» in Europe/Oslo, whatever the visitor's clock zone. */
function osloNow(date: Date): { day: number; time: string } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: site.hours.timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(get('weekday')) + 1
  return { day, time: `${get('hour')}:${get('minute')}` }
}

/** «Åpent nå, til 15:00» or «Stengt nå. Åpner tirsdag 07:30.» from the weekly hours. */
export function openStatus(date: Date, weekly: readonly WeeklyHours[] = site.hours.weekly) {
  const { day, time } = osloNow(date)
  const today = weekly.find((w) => w.day === day)
  if (today && time >= today.opens && time < today.closes) {
    return { open: true, text: `Åpent nå, til ${today.closes}` }
  }
  if (today && time < today.opens) {
    return { open: false, text: `Stengt nå. Åpner i dag ${today.opens}.` }
  }
  for (let i = 1; i <= 7; i++) {
    const d = ((day - 1 + i) % 7) + 1
    const next = weekly.find((w) => w.day === d)
    if (next) {
      const when = i === 1 ? 'i morgen' : DAY[d]
      return { open: false, text: `Stengt nå. Åpner ${when} ${next.opens}.` }
    }
  }
  return null
}
