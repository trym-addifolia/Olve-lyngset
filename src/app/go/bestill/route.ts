/*
 * /go/bestill: the booking click route named in ADS-PLAN
 * §3.1 (ad sitelinks point here). Same handler and same server tally as
 * /api/booking-klikk: log, then 302 to the provider calendar.
 */
export { GET, dynamic } from '@/app/api/booking-klikk/route'
