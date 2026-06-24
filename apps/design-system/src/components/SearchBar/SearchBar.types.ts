import type { ReactNode, CSSProperties } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export type SearchBarSize = 'sm' | 'md' | 'lg'

export interface SearchBarProps extends CommonProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  onClear?: () => void
  placeholder?: string
  size?: SearchBarSize
  disabled?: boolean
  searchLabel?: string
  hideButton?: boolean
  leftOuterActions?: ReactNode
  leftActions?: ReactNode
  prefix?: ReactNode
  onPrefixClick?: () => void
  suffixActions?: ReactNode
  rightActions?: ReactNode
  expandable?: boolean
  expanded?: boolean
  onExpandChange?: (expanded: boolean) => void
}
