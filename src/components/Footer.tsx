import LogoMark from '@/components/LogoMark'
import RichText from '@/components/RichText'
import { hoursRows } from '@/lib/hours'
import { NAV_FAG, NAV_FOOTER, NAV_MAIN, pathOf } from '@/routes'
import { site } from '@/site.config'
import Link from 'next/link'

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 font-sans text-[0.9375rem] font-semibold text-white">{children}</h2>
}

export default function Footer() {
  const bottomLinks = [...NAV_MAIN, ...NAV_FOOTER].filter(
    (r, i, arr) => arr.findIndex((x) => x.slug === r.slug) === i,
  )
  return (
    <footer className="bg-ink-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3.5">
              <LogoMark className="h-11 w-auto shrink-0" />
              <div>
                <p className="font-serif text-2xl font-medium leading-none">{site.brand.name}</p>
                <p className="mt-1.5 text-[0.9375rem] leading-none text-white/60">
                  {site.brand.tagline}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-white/70">
              {site.brand.description}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              {site.practitioner.name}. {site.practitioner.titleLong}.
            </p>
          </div>

          <div>
            <ColumnHeading>Kontakt</ColumnHeading>
            <ul className="space-y-4 text-[0.9375rem]">
              <li>
                <a
                  href={site.contact.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <span className="block text-white transition-colors group-hover:text-fjord-200">
                    {site.contact.address.street}
                  </span>
                  <span className="text-white/60">
                    {site.contact.address.postalCode} {site.contact.address.city} (
                    {site.brand.clinicName})
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <ColumnHeading>Åpningstider</ColumnHeading>
            {site.hours.verified ? (
              <ul className="space-y-2 text-[0.9375rem]">
                {hoursRows().map((row) => (
                  <li key={row.day} className="flex justify-between gap-4">
                    <span className="text-white/60">{row.day}</span>
                    <span>{row.value}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[0.9375rem] leading-relaxed text-white/70">
                <RichText text={site.hours.note} />
              </p>
            )}
          </div>

          <div>
            <ColumnHeading>Alt om krystallsyke</ColumnHeading>
            <ul className="space-y-2 text-[0.9375rem]">
              {NAV_FAG.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={pathOf(r)}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {r.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/15 pt-7 md:flex-row md:items-start md:justify-between">
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Bunnmeny">
            {bottomLinks.map((r) => (
              <Link
                key={r.slug}
                href={pathOf(r)}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {r.navLabel}
              </Link>
            ))}
          </nav>
          <div className="md:text-right">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} {site.brand.name}
            </p>
            <p className="mt-1 text-xs leading-6 text-white/60">
              <RichText text={site.brand.legalName} />, org.nr.{' '}
              <RichText text={site.brand.orgNumber} />
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
