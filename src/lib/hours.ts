/*
 * Opening hours from the structured weekly spec in site.config.ts (Europe/Oslo).
 * No openingHoursSpecification in JSON-LD: the hours are Limbra's, and this
 * site claims no clinic of its own (src/lib/schema.ts).
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

/** Rows for a visible hours table, every weekday listed, closed days marked. */
export function hoursRows(): { day: string; value: string }[] {
  const days: WeeklyHours['day'][] = [1, 2, 3, 4, 5, 6, 7]
  return days.map((d) => {
    const spec = site.hours.weekly.find((w) => w.day === d)
    return { day: DAY_NAMES[d], value: spec ? `${spec.opens} til ${spec.closes}` : 'Stengt' }
  })
}
