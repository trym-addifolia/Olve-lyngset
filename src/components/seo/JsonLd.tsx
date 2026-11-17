/*
 * JSON-LD injector. Escapes `<` so no markup can break out of the script tag
 * (all data is our own static content, this is belt-and-braces).
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires a raw script body; content is our own static data with `<` escaped above
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
