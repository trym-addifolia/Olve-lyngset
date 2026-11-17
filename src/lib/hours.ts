/*
 * Opening hours helpers computed in the configured timezone (Europe/Oslo),
 * from the structured weekly spec in site.config.ts. Replaces the template's
 * browser-clock check (pitfall P12).
 */
import { type WeeklyHours, site } from '@/site.config'

const DAY_NAMES: Record<WeeklyHours['day'], string> = {
  1: 'Mandag',
  2: 'Tirsdag',
  3: 'Onsdag',
  4: 'Torsdag',
  5: 'Fredag',
  6: 'Lørdag',
  7: 'Søndag',
}

const SCHEMA_DAYS: Record<WeeklyHours['day'], string> = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
}

export function dayName(day: WeeklyHours['day']): string {
  return DAY_NAMES[day]
}

/** Rows for a visible hours table, every weekday listed, closed days marked. */
export function hoursRows(): { day: string; value: string }[] {
  const days: WeeklyHours['day'][] = [1, 2, 3, 4, 5, 6, 7]
  return days.map((d) => {
    const spec = site.hours.weekly.find((w) => w.day === d)
    return { day: DAY_NAMES[d], value: spec ? `${spec.opens} til ${spec.closes}` : 'Stengt' }
  })
}

/** schema.org OpeningHoursSpecification, only when the hours are verified. */
export function openingHoursSpecification() {
  if (!site.hours.verified) return undefined
  return site.hours.weekly.map((w) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: SCHEMA_DAYS[w.day],
    opens: w.opens,
    closes: w.closes,
  }))
}

function osloNow(now = new Date()): { day: WeeklyHours['day']; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: site.hours.timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const weekdayIndex: Record<string, WeeklyHours['day']> = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7,
  }
  const hour = Number(get('hour')) % 24
  return { day: weekdayIndex[get('weekday')] ?? 1, minutes: hour * 60 + Number(get('minute')) }
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Open right now in the clinic's timezone? null when hours are unverified. */
export function isOpenNow(now = new Date()): boolean | null {
  if (!site.hours.verified) return null
  const { day, minutes } = osloNow(now)
  const spec = site.hours.weekly.find((w) => w.day === day)
  if (!spec) return false
  return minutes >= toMinutes(spec.opens) && minutes < toMinutes(spec.closes)
}
