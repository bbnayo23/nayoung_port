import type { MouseEvent, KeyboardEvent } from 'react'
import { ExdChevronDownIcon } from '@port/icon-library'
import { useTree } from './hooks'
import * as styles from './Tree.css'
import type { TreeNode as TreeNodeType, TreeProps } from './Tree.types'

const TreeNodeItem = ({
  node,
  selectedId,
  onSelect,
  isExpanded,
  toggle,
}: {
  node: TreeNodeType
  selectedId?: string
  onSelect?: (id: string) => void
  isExpanded: (id: string) => boolean
  toggle: (id: string) => void
}) => {
  const hasChildren = node.children && node.children.length > 0
  const expanded = hasChildren && isExpanded(node.id)
  const selected = selectedId === node.id

  const contentClass = [
    styles.nodeContent,
    selected ? styles.nodeSelected : '',
    node.disabled ? styles.nodeDisabled : '',
  ]
    .filter(Boolean)
    .join(' ')

  const handleClick = () => {
    if (node.disabled) return
    onSelect?.(node.id)
  }

  const handleChevronClick = (e: MouseEvent) => {
    e.stopPropagation()
    toggle(node.id)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (node.disabled) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect?.(node.id)
    }
    if (e.key === 'ArrowRight' && hasChildren && !expanded) {
      e.preventDefault()
      toggle(node.id)
    }
    if (e.key === 'ArrowLeft' && hasChildren && expanded) {
      e.preventDefault()
      toggle(node.id)
    }
  }

  return (
    <li>
      <div
        className={contentClass}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={node.disabled ? -1 : 0}
        role="treeitem"
        aria-expanded={hasChildren ? expanded : undefined}
        aria-selected={selected}
        aria-disabled={node.disabled}
      >
        {hasChildren ? (
          <span
            className={`${styles.chevron}${expanded ? ` ${styles.chevronExpanded}` : ''}`}
            onClick={handleChevronClick}
          >
            <ExdChevronDownIcon size={12} />
          </span>
        ) : (
          <span className={styles.chevronPlaceholder} />
        )}
        <span className={styles.nodeLabel}>{node.label}</span>
      </div>
      {expanded && node.children && (
        <ul className={styles.nodeList} role="group">
          {node.children.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              isExpanded={isExpanded}
              toggle={toggle}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export const Tree = ({ nodes, expandedIds, onExpandChange, selectedId, onSelect, className }: TreeProps) => {
  const tree = useTree(expandedIds, onExpandChange)

  return (
    <ul className={`${styles.root}${className ? ` ${className}` : ''}`} role="tree">
      {nodes.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          selectedId={selectedId}
          onSelect={onSelect}
          isExpanded={tree.isExpanded}
          toggle={tree.toggle}
        />
      ))}
    </ul>
  )
}

export default Tree
