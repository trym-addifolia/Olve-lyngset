import { contentFor } from '@content/index'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ContactTemplate from '@/components/templates/ContactTemplate'
import InfoTemplate from '@/components/templates/InfoTemplate'
import LandingTemplate from '@/components/templates/LandingTemplate'
import PractitionerTemplate from '@/components/templates/PractitionerTemplate'
import PrivacyTemplate from '@/components/templates/PrivacyTemplate'
import { CONTENT_ROUTES, type Route, pathOf, routeBySlug } from '@/routes'
import { site } from '@/site.config'

/*
 * One catch-all segment renders every inner page from the registry, nested
 * ones too (/svimmelhet/krystallsyke): the segments are joined with «/» and
 * looked up in the registry. Static params come from the registry; anything
 * else 404s. The home page has its own route (src/app/page.tsx). Segments may arrive raw or percent-encoded;
 * routeBySlug() decodes defensively.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return CONTENT_ROUTES.map((r) => ({ slug: r.slug.split('/') }))
}

type Props = { params: Promise<{ slug: string[] }> }

async function routeOf(params: Props['params']): Promise<Route | undefined> {
  const { slug } = await params
  return routeBySlug(slug.join('/'))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = await routeOf(params)
  if (!route) return {}
  const path = pathOf(route)
  // titles that already name him («| Olve Lyngset», «Om Olve Lyngset») skip the brand suffix
  const named = route.title.includes('|') || route.title.includes(site.brand.name)
  return {
    title: named ? { absolute: route.title } : route.title,
    description: route.description,
    alternates: { canonical: path },
    openGraph: {
      title: named ? route.title : `${route.title} | ${site.brand.name}`,
      description: route.description,
      url: path,
    },
  }
}

export default async function RoutePage({ params }: Props) {
  const route = await routeOf(params)
  const content = route && !route.hidden ? contentFor(route.slug) : undefined
  if (!route || !content) notFound()
  return renderTemplate(route, content)
}

function renderTemplate(route: Route, content: NonNullable<ReturnType<typeof contentFor>>) {
  switch (content.kind) {
    case 'info':
    case 'hub':
      return <InfoTemplate route={route} content={content} />
    case 'landing':
      return <LandingTemplate route={route} content={content} />
    case 'practitioner':
      return <PractitionerTemplate route={route} content={content} />
    case 'contact':
      return <ContactTemplate route={route} content={content} />
    case 'privacy':
      return <PrivacyTemplate route={route} content={content} />
    case 'home':
      notFound()
  }
}
