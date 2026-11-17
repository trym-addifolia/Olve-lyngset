import PortraitSlot from '@/components/PortraitSlot'
import RichText from '@/components/RichText'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PRACTITIONER_ROUTE, pathOf } from '@/routes'
import { site } from '@/site.config'

/**
 * Single-practitioner profile block (home "Hvem er jeg?"). Facts come from
 * site.config.ts; the free text from content/home.ts. No whole-video embed
 * (only approved clips, none approved yet).
 */
export default function PractitionerProfile({
  heading,
  lede,
  body,
}: {
  heading: string
  lede: string
  body: { text: string; source: string }[]
}) {
  const p = site.practitioner
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
      <PortraitSlot className="mx-auto lg:mx-0" />
      <div>
        <SectionHeading title={heading} lede={lede} />
        <dl className="mt-8 grid gap-x-10 gap-y-4 border-t border-border pt-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">Tittel</dt>
            <dd className="mt-1 text-base font-medium leading-snug">{p.titleLong}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Autorisasjon</dt>
            <dd className="mt-1 text-base font-medium leading-snug">
              <RichText text={p.hprNumber} />
            </dd>
          </div>
        </dl>
        <div className="prose-site mt-8">
          {body.map((b) => (
            <p key={b.text}>
              <RichText text={b.text} />
            </p>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href={pathOf(PRACTITIONER_ROUTE)}>Mer om meg</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
