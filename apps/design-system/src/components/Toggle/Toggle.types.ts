import type { CSSProperties, ReactNode } from 'react'

export type ToggleSize = 'sm' | 'md' | 'lg'

export interface ToggleProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  size?: ToggleSize
  disabled?: boolean
  label?: ReactNode
  innerLabel?: boolean
  className?: string
  style?: CSSProperties
}
