import { pageBySlug } from '@content/pages'
import { PageView, type SearchProps, isDraft, pageMetadata } from '@/components/PageView'

const page = pageBySlug('')
if (!page) throw new Error('home page missing in content/pages.ts')

export async function generateMetadata({ searchParams }: SearchProps) {
  return pageMetadata(page as NonNullable<typeof page>, await isDraft(searchParams))
}

export default async function Home({ searchParams }: SearchProps) {
  return <PageView page={page as NonNullable<typeof page>} draft={await isDraft(searchParams)} />
}
