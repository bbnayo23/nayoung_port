import type { CSSProperties } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export interface SpinnerProps extends CommonProps {
  size?: 'sm' | 'md' | 'lg'
  type?: 'default' | 'dots' | 'outline'
  variant?: 'solid' | 'round' | 'circle' | 'outline' | 'flow' | 'bounce' | 'fadeinout'
  color?: string
  overlay?: boolean
}
