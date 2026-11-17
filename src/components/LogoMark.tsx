/** The two crystals of the wordmark. `spin` turns the large one once on load (globals.css). */
export default function LogoMark({
  className,
  spin = false,
}: { className?: string; spin?: boolean }) {
  return (
    <svg viewBox="0 0 20 24" className={className} aria-hidden="true">
      <path
        d="M8 2 14 11 8 20 2 11Z"
        className={`${spin ? 'logo-krystall ' : ''}fill-krystall-500`}
      />
      <path d="M15.5 13 19 18 15.5 23 12 18Z" className="fill-krystall-300" />
    </svg>
  )
}
