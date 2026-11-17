import { Figure } from '@content/illustrations'
import type { Section } from '@content/types'
import Link from 'next/link'
import RichText from '@/components/RichText'

/** Long-form sections: kicker + H2 (anchor) + lede + paragraphs + bullets. */
export function ArticleSection({ section }: { section: Section }) {
  return (
    <section id={section.id} className="scroll-mt-28">
      {section.eyebrow && <p className="eyebrow eyebrow-mark mb-2">{section.eyebrow}</p>}
      <h2 className="text-display-sm md:text-display-md">
        <RichText text={section.heading} />
      </h2>
      {section.lede && (
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          <RichText text={section.lede} />
        </p>
      )}
      {section.canal && (
        <Figure name="buegangene-ute" canal={section.canal} className="mt-5 w-full max-w-[11rem]" />
      )}
      <div className="prose-site mt-5">
        {section.body.map((p) => (
          <p key={p.text}>
            {p.label && <strong className="block font-semibold text-foreground">{p.label}</strong>}
            <RichText text={p.text} />
          </p>
        ))}
        {section.bullets && (
          <ul>
            {section.bullets.map((b) => (
              <li key={b.text}>
                {b.label && (
                  <strong className="block font-semibold text-foreground">{b.label}</strong>
                )}
                <RichText text={b.text} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {section.link && (
        <p className="mt-5">
          <Link
            href={section.link.href}
            className="font-semibold text-fjord-700 underline decoration-fjord-300 underline-offset-4 hover:decoration-fjord-700"
          >
            {section.link.label}
          </Link>
        </p>
      )}
    </section>
  )
}

export default function ArticleBody({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-12 md:space-y-16">
      {sections.map((s) => (
        <ArticleSection key={s.id} section={s} />
      ))}
    </div>
  )
}
