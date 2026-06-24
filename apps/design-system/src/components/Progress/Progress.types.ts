import type { CSSProperties, ReactNode } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }
type UIColorType = 'danger' | 'warning' | 'success' | 'info'

export type ProgressShape = 'linear' | 'linear-round'

export type ProgressTransition = boolean | { duration?: string; easing?: string }

export interface ProgressProps extends CommonProps {
  value: number
  shape?: ProgressShape
  transition?: ProgressTransition
  color?: UIColorType
  shadow?: boolean
  onComplete?: () => void
}

export type ProgressStackProps = Omit<ProgressProps, 'value' | 'onComplete'> & {
  children: ReactNode
}

export interface ProgressStackItemProps extends CommonProps {
  value: number
  color?: UIColorType
  transition?: ProgressTransition
}
