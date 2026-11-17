import Link from 'next/link'
import ConditionGrid from '@/components/ConditionGrid'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="eyebrow mb-3">404</p>
      <h1 className="text-display-lg md:text-display-xl">Siden finnes ikke</h1>
      <p className="mt-4 max-w-prose text-lg text-muted-foreground">
        Lenken kan være gammel. Her er sidene om krystallsyke, eller gå til forsiden.
      </p>
      <div className="mt-6">
        <Button asChild>
          <Link href="/">Til forsiden</Link>
        </Button>
      </div>
      <div className="mt-12">
        <ConditionGrid />
      </div>
    </div>
  )
}
