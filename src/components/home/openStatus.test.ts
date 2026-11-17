import { describe, expect, it } from 'vitest'
import { openStatus } from '@/components/home/openStatus'

// November: Oslo is UTC+1. The weekly hours are Olve's (site.config.ts).
describe('openStatus', () => {
  it('is open on a Monday morning', () => {
    expect(openStatus(new Date('2026-11-16T08:00:00Z'))).toEqual({
      open: true,
      text: 'Åpent nå, til 15:00',
    })
  })
  it('names today before opening time', () => {
    expect(openStatus(new Date('2026-11-17T05:00:00Z'))?.text).toBe('Stengt nå. Åpner i dag 07:30.')
  })
  it('says tomorrow after closing on a weekday', () => {
    expect(openStatus(new Date('2026-11-16T15:00:00Z'))?.text).toBe(
      'Stengt nå. Åpner i morgen 07:30.',
    )
  })
  it('skips the weekend to Monday', () => {
    expect(openStatus(new Date('2026-11-21T12:00:00Z'))?.text).toBe(
      'Stengt nå. Åpner mandag 07:30.',
    )
  })
})
