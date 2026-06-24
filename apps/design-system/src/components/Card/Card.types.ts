import type { MouseEvent, ReactNode, CSSProperties } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export type CardVariant = 'default' | 'section' | 'old-exd' | 'neo'

export interface CardProps extends CommonProps {
  title?: ReactNode
  action?: ReactNode
  variant?: CardVariant
  disabled?: boolean
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  isActive?: boolean
  size?: 'sm' | 'md' | 'lg'
  density?: 'default' | 'compact'
  hoverable?: boolean
  noPadding?: boolean
}

export interface CardSkeletonProps extends CommonProps {
  timeDiff?: boolean
  skeletonCount?: number
}
