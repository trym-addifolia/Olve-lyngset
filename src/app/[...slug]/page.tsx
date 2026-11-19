import { PAGES, pageBySlug } from '@content/pages'
import { notFound } from 'next/navigation'
import { PageView, type SearchProps, isDraft, pageMetadata } from '@/components/PageView'

/* One route for every page except home; nested pages (a/b) arrive as two segments. */
type Props = SearchProps & { params: Promise<{ slug: string[] }> }

export const dynamicParams = false

export function generateStaticParams() {
  return PAGES.filter((p) => p.slug !== '').map((p) => ({ slug: p.slug.split('/') }))
}

const find = async (params: Props['params']) => pageBySlug((await params).slug.join('/'))

export async function generateMetadata({ params, searchParams }: Props) {
  const page = await find(params)
  return page ? pageMetadata(page, await isDraft(searchParams)) : {}
}

export default async function Slug({ params, searchParams }: Props) {
  const page = await find(params)
  if (!page) notFound()
  return <PageView page={page} draft={await isDraft(searchParams)} />
}
