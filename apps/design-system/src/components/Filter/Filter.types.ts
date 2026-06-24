import type { PropsWithChildren, CSSProperties } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export interface FilterItem {
  value: string
  label: string
  count?: number
}

export interface FilterGroup {
  id: string
  label: string
  count?: number
  items: FilterItem[]
  defaultExpanded?: boolean
}

export interface FilterProps extends PropsWithChildren<CommonProps> {
  collapsed?: boolean
  onCollapse?: () => void
  title?: string
  className?: string

  /** Data-driven mode: groups를 전달하면 내부에서 렌더링 */
  groups?: FilterGroup[]
  selected?: Record<string, string[]>
  onChange?: (next: Record<string, string[]>) => void
  searchValue?: string
  onSearchChange?: (value: string) => void
  expandedIds?: string[]
  onExpandedChange?: (ids: string[]) => void
  showAll?: boolean
  allLabel?: string
  searchPlaceholder?: string
  emptyText?: string
}

export interface FilterSearchProps extends PropsWithChildren<CommonProps> {
  className?: string
}

export interface FilterContentProps extends PropsWithChildren<{ className?: string }> {}
