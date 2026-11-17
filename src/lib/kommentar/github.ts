import type { KommentarMiljo } from './miljo'
import { lesSak, sakTekst, sakTittel, statusFra } from './sak'
import type { Kommentar, NyKommentar } from './typer'

export const ETIKETT = 'olve-kommentar'
const API = 'https://api.github.com'

type GitHubSak = {
  number: number
  state: string
  body: string | null
  created_at: string
  comments: number
  labels: ({ name?: string } | string)[]
  pull_request?: unknown
}
type GitHubKommentar = { issue_url: string; body: string | null }

async function gh<T>(m: KommentarMiljo, sti: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}/repos/${m.repo}${sti}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${m.token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'krystallsyken-kommentarer',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
    },
  })
  if (!res.ok) throw new Error(`GitHub svarte ${res.status} på ${sti}`)
  return (await res.json()) as T
}

export async function opprettSak(
  m: KommentarMiljo,
  ny: NyKommentar,
  baseUrl: string,
): Promise<number> {
  const sak = await gh<GitHubSak>(m, '/issues', {
    method: 'POST',
    body: JSON.stringify({ title: sakTittel(ny), body: sakTekst(ny, baseUrl), labels: [ETIKETT] }),
  })
  return sak.number
}

export async function hentKommentarer(m: KommentarMiljo, side: string): Promise<Kommentar[]> {
  const saker = await gh<GitHubSak[]>(m, `/issues?labels=${ETIKETT}&state=all&per_page=100`)
  const funnet = saker
    .filter((s) => !s.pull_request)
    .flatMap((s) => {
      const ny = lesSak(s.body)
      return ny && ny.plassering.side === side ? [{ s, ny }] : []
    })

  // the newest comment on each issue is our reply to Olve
  const svar = new Map<number, string>()
  if (funnet.some(({ s }) => s.comments > 0)) {
    const siste = await gh<GitHubKommentar[]>(
      m,
      '/issues/comments?sort=created&direction=desc&per_page=100',
    )
    for (const k of siste) {
      const nummer = Number(k.issue_url.split('/').pop())
      if (k.body && !svar.has(nummer)) svar.set(nummer, k.body)
    }
  }

  return funnet
    .map(({ s, ny }) => ({
      ...ny,
      nummer: s.number,
      status: statusFra(
        s.state,
        s.labels.map((l) => (typeof l === 'string' ? l : (l.name ?? ''))),
      ),
      svar: svar.get(s.number) ?? null,
      opprettet: s.created_at,
    }))
    .sort((a, b) => a.nummer - b.nummer)
}
