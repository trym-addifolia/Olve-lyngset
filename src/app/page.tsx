import { CONTENT } from '@content/index'
import type { HomeContent } from '@content/types'
import type { Metadata } from 'next'
import HomeTemplate from '@/components/templates/HomeTemplate'
import { HOME } from '@/routes'

export const metadata: Metadata = {
  title: { absolute: HOME.title },
  description: HOME.description,
  alternates: { canonical: '/' },
  openGraph: { title: HOME.title, description: HOME.description, url: '/' },
}

export default function HomePage() {
  return <HomeTemplate content={CONTENT[''] as HomeContent} />
}
