import type { CSSProperties } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export interface DividerProps extends CommonProps {
  size?: number
  opacity?: number
  margin?: number
  color?: string
  direction?: 'horizontal' | 'vertical'
}
