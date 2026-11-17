import { type NextRequest, NextResponse } from 'next/server'
import { hentKommentarer, opprettSak } from '@/lib/kommentar/github'
import { type KommentarMiljo, kommentarMiljo } from '@/lib/kommentar/miljo'
import { KOMMENTAR_COOKIE, harTilgang } from '@/lib/kommentar/tilgang'
import { NyKommentarSchema } from '@/lib/kommentar/typer'
import { BASE_URL } from '@/lib/siteUrl'

export const dynamic = 'force-dynamic'

/*
 * Olve's comments (preview only). The ol_kommentar cookie from the secret link
 * is required; SameSite=Lax plus the JSON content type keeps other sites out.
 */
function svar(status: number, data: unknown) {
  return NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } })
}

async function sjekk(request: NextRequest): Promise<KommentarMiljo | NextResponse> {
  const m = kommentarMiljo()
  if (!m) return svar(404, { feil: 'finnes-ikke' })
  if (!(await harTilgang(request.cookies.get(KOMMENTAR_COOKIE)?.value, m.nokkel))) {
    return svar(401, { feil: 'ingen-tilgang' })
  }
  if (!m.token || !m.repo) return svar(503, { feil: 'ikke-koblet' })
  return m
}

export async function GET(request: NextRequest) {
  const m = await sjekk(request)
  if (m instanceof NextResponse) return m
  const side = request.nextUrl.searchParams.get('side') ?? ''
  if (!side.startsWith('/') || side.length > 200) return svar(400, { feil: 'ugyldig-side' })
  try {
    return svar(200, { kommentarer: await hentKommentarer(m, side) })
  } catch (e) {
    console.error(e)
    return svar(502, { feil: 'github' })
  }
}

export async function POST(request: NextRequest) {
  const m = await sjekk(request)
  if (m instanceof NextResponse) return m
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return svar(415, { feil: 'json' })
  }
  let data: unknown
  try {
    data = await request.json()
  } catch {
    return svar(400, { feil: 'ugyldig' })
  }
  const ny = NyKommentarSchema.safeParse(data)
  if (!ny.success) return svar(400, { feil: 'ugyldig' })
  try {
    return svar(201, { nummer: await opprettSak(m, ny.data, BASE_URL) })
  } catch (e) {
    console.error(e)
    return svar(502, { feil: 'github' })
  }
}
