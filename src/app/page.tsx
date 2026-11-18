import { HOME_CONTENT } from '@content/index'
import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import HomeTemplate from '@/components/templates/HomeTemplate'
import { webPageSchema } from '@/lib/schema'
import { HOME } from '@/routes'

export const metadata: Metadata = {
  title: { absolute: HOME.title },
  description: HOME.description,
  alternates: { canonical: '/' },
  openGraph: { title: HOME.title, description: HOME.description, url: '/' },
}

export default function HomePage() {
  return (
    <>
      <HomeTemplate content={HOME_CONTENT} />
      <JsonLd data={webPageSchema(HOME, HOME_CONTENT.updated)} />
    </>
  )
}
