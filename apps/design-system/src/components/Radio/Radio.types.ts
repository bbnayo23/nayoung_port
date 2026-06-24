import type { ReactNode, ChangeEvent, CSSProperties } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export interface RadioProps extends CommonProps {
  value: string
  name: string
  label?: ReactNode
  checked?: boolean
  disabled?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary'
  id?: string
}
