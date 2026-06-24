import type { ReactNode } from 'react'

export interface TreeNode {
  id: string
  label: ReactNode
  children?: TreeNode[]
  disabled?: boolean
}

export interface TreeProps {
  nodes: TreeNode[]
  expandedIds?: string[]
  onExpandChange?: (expandedIds: string[]) => void
  selectedId?: string
  onSelect?: (id: string) => void
  className?: string
}
