import RichText from '@/components/RichText'

/** Table of contents for long-form pages; items are the section ids. */
export default function Toc({ items }: { items: { id: string; label: string }[] }) {
  if (items.length < 2) return null
  return (
    <nav aria-label="Innhold på siden" className="border-l-2 border-fjord-200 pl-5">
      <p className="text-sm font-semibold text-foreground">På denne siden</p>
      <ol className="mt-3 space-y-2 text-[0.9375rem]">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-foreground/75 transition-colors hover:text-fjord-700"
            >
              <RichText text={item.label} />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
