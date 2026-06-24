import type { HTMLAttributes, CSSProperties } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export interface BadgeProps
  extends CommonProps, Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'style' | 'color'> {
  variant?:
    | 'dot-outline'
    | 'dot'
    | 'status'
    | 'status-round'
    | 'status-score'
    | 'icon'
    | 'outline'
    | 'fill'
    | 'alert'
    | 'step'
    | 'circle'
    | 'tag'
    | 'detail-tag'
    | string
  color?:
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'purple'
    | 'blue'
    | 'navy'
    | 'gray'
    | 'medium-gray'
    | 'light-blue'
    | 'pink'
    | string
  size?: 'sm' | 'md' | 'lg'
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  closable?: boolean
  onRemove?: () => void
}
