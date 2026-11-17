import RichText from '@/components/RichText'
import { site } from '@/site.config'

/**
 * Price table, rendered only behind compliance.showPrices. Prices must be
 * correct and plainly stated (hpl § 13); placeholders stay visible until
 * the practitioner confirms the numbers.
 */
export default function PriceTable({ className }: { className?: string }) {
  if (!site.compliance.showPrices) return null
  return (
    <div className={className}>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Priser</caption>
        <thead>
          <tr className="border-b border-foreground/80 text-sm">
            <th scope="col" className="py-2 pr-4 font-semibold">
              Time
            </th>
            <th scope="col" className="py-2 text-right font-semibold">
              Pris
            </th>
          </tr>
        </thead>
        <tbody>
          {site.prices.map((p) => (
            <tr key={p.name} className="border-b border-border">
              <td className="py-4 pr-4 align-top">
                <span className="block font-serif text-[1.25rem] leading-snug text-foreground">
                  {p.name}
                </span>
                {p.note && (
                  <span className="mt-1 block text-[0.9375rem] text-muted-foreground">
                    {p.note}
                  </span>
                )}
              </td>
              <td className="py-4 text-right align-top font-semibold">
                <RichText text={p.price} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-[0.9375rem] text-muted-foreground">
        <RichText text="Du betaler etter timen. Du trenger ikke henvisning fra lege." />
      </p>
    </div>
  )
}
