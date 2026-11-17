/*
 * /go/bestill: the booking click route every «Bestill time» uses. Same
 * handler and same server tally as /api/booking-klikk: log, then 302 to the
 * Limbra calendar.
 */
export { GET, dynamic } from '@/app/api/booking-klikk/route'
