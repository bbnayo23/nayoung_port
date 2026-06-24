import type { ChangeEvent, ReactNode, CSSProperties } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }
type UIColorType = 'danger' | 'warning' | 'success' | 'info'

export interface CheckboxInterface extends CommonProps {
  id?: string
  checked?: boolean
  disabled?: boolean
  indeterminate?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  label?: string | ReactNode
  labelDirection?: 'left' | 'right'
  color?: UIColorType
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
}
