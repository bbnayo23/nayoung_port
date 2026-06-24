import type { CSSProperties, ReactNode } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export interface ButtonGroupProps extends CommonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export interface ButtonGroupItemProps extends CommonProps {
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
  active?: boolean
}
