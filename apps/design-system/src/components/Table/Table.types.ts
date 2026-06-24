import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, ReactNode } from 'react'

type UISizeType = 'sm' | 'md' | 'lg'

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  size?: UISizeType
  striped?: boolean
  hoverable?: boolean
  bordered?: boolean
  toolbarExtra?: ReactNode
  children?: ReactNode
}

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  emptyContent?: ReactNode
  children?: ReactNode
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  expandable?: boolean
  expanded?: boolean
  onExpandToggle?: (expanded: boolean) => void
  active?: boolean
  children?: ReactNode
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right'
  children?: ReactNode
}

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sortDirection?: 'asc' | 'desc' | null
  onSort?: () => void
  align?: 'left' | 'center' | 'right'
  children?: ReactNode
}
