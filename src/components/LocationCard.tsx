import RichText from '@/components/RichText'
import { hoursRows } from '@/lib/hours'
import { site } from '@/site.config'

/** NAP + hours + practical notes. Everything from site.config.ts. */
export default function LocationCard({
  practical = [],
  className,
}: {
  practical?: { text: string; source: string; label?: string }[]
  className?: string
}) {
  return (
    <div className={className}>
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <div className="border-t border-border pt-5">
          <h3 className="font-sans text-base font-semibold text-foreground">Adresse</h3>
          <address className="mt-3 font-serif text-[1.375rem] not-italic leading-snug text-foreground">
            {site.contact.address.street}
            <br />
            {site.contact.address.postalCode} {site.contact.address.city}
          </address>
          <p className="mt-2 text-base text-muted-foreground">{site.brand.clinicName}</p>
          <p className="mt-4 text-base">
            <a
              href={site.contact.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-fjord-700 underline decoration-fjord-300 underline-offset-4 hover:decoration-fjord-700"
            >
              Åpne i kart
            </a>
          </p>
        </div>
        <div className="border-t border-border pt-5">
          <h3 className="font-sans text-base font-semibold text-foreground">Åpningstider</h3>
          {site.hours.verified ? (
            <dl className="mt-3 space-y-1.5 text-base">
              {hoursRows().map((r) => (
                <div
                  key={r.day}
                  className="flex justify-between gap-4 border-b border-border/70 pb-1.5"
                >
                  <dt className="text-muted-foreground">{r.day}</dt>
                  <dd className="font-medium">{r.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-3 text-base leading-relaxed">
              <RichText text={site.hours.note} />
            </p>
          )}
          <p className="mt-4 text-base text-muted-foreground">
            Nettbooking er åpen hele døgnet.
          </p>
        </div>
      </div>
      {practical.length > 0 && (
        <ul className="mt-8 grid gap-x-10 gap-y-3 text-base leading-relaxed text-foreground/85 sm:grid-cols-2">
          {practical.map((p) => (
            <li key={p.text} className="border-t border-border/70 pt-3">
              {p.label && (
                <strong className="block font-semibold text-foreground">{p.label}</strong>
              )}
              <RichText text={p.text} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
