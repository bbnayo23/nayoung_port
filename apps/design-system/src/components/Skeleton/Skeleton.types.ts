import type { CSSProperties } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export interface SkeletonProps extends CommonProps {
  width?: string | number
  height?: string | number
  variant?: 'rectangular' | 'rounded' | 'circle'
}
