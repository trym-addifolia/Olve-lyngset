import { contentFor } from '@content/index'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BookingTemplate from '@/components/templates/BookingTemplate'
import ContactTemplate from '@/components/templates/ContactTemplate'
import ExerciseTemplate from '@/components/templates/ExerciseTemplate'
import FaqTemplate from '@/components/templates/FaqTemplate'
import InfoTemplate from '@/components/templates/InfoTemplate'
import LandingTemplate from '@/components/templates/LandingTemplate'
import LocalTemplate from '@/components/templates/LocalTemplate'
import PractitionerTemplate from '@/components/templates/PractitionerTemplate'
import PrivacyTemplate from '@/components/templates/PrivacyTemplate'
import { CONTENT_ROUTES, type Route, pathOf, routeBySlug } from '@/routes'
import { site } from '@/site.config'

/*
 * One dynamic segment renders all 20 non-home routes from the registry.
 * Static params are generated from the registry; unknown slugs 404.
 * Slugs are ASCII now; old æøå slugs 301 in next.config.js. Any slug may arrive raw or percent-encoded depending
 * on the client; routeBySlug() decodes defensively.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return CONTENT_ROUTES.map((r) => ({ slug: r.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const route = routeBySlug(slug)
  if (!route) return {}
  const path = pathOf(route)
  return {
    // titles that already name the sender («| Olve Lyngset») skip the brand template
    title: route.title.includes('|') ? { absolute: route.title } : route.title,
    description: route.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${route.title} | ${site.brand.name}`,
      description: route.description,
      url: path,
    },
  }
}

export default async function RoutePage({ params }: Props) {
  const { slug } = await params
  const route = routeBySlug(slug)
  const content = route ? contentFor(route.slug) : undefined
  if (!route || !content) notFound()
  return renderTemplate(route, content)
}

function renderTemplate(route: Route, content: NonNullable<ReturnType<typeof contentFor>>) {
  switch (content.kind) {
    case 'info':
    case 'hub':
      return <InfoTemplate route={route} content={content} />
    case 'exercise':
      return <ExerciseTemplate route={route} content={content} />
    case 'landing':
      return <LandingTemplate route={route} content={content} />
    case 'local':
      return <LocalTemplate route={route} content={content} />
    case 'practitioner':
      return <PractitionerTemplate route={route} content={content} />
    case 'booking':
      return <BookingTemplate route={route} content={content} />
    case 'faq':
      return <FaqTemplate route={route} content={content} />
    case 'contact':
      return <ContactTemplate route={route} content={content} />
    case 'privacy':
      return <PrivacyTemplate route={route} content={content} />
    case 'home':
      notFound()
  }
}
