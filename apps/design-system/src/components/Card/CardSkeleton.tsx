import { forwardRef } from 'react'
import Card from './Card'
import Skeleton from '@dc/components/Skeleton'
import type { CardSkeletonProps } from './Card.types'
import { styledCardSkeleton } from './Card.css'

const CardSkeleton = forwardRef<HTMLDivElement, CardSkeletonProps>(function CardSkeleton(
  { className, timeDiff = false, style, skeletonCount = 2 },
  ref,
) {
  const keys = Array.from({ length: skeletonCount }, (_, i) => `sk-${i}`)
  return (
    <Card ref={ref} className={className} style={style} disabled>
      <div className={styledCardSkeleton}>
        {timeDiff && (
          <div className="card-skeleton-time-diff">
            <Skeleton width={16} height={10} />
            <Skeleton height={10} />
          </div>
        )}
        {keys.map((key) => (
          <Skeleton key={key} height={10} />
        ))}
      </div>
    </Card>
  )
})

export default CardSkeleton
