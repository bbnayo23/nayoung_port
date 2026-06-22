import { useEffect, useLayoutEffect, useRef, useState, type ChangeEvent } from 'react'
import { Tree } from 'react-arborist'
import type { NodeRendererProps } from 'react-arborist'
import { cx } from '../../utils/cx'
import * as styles from './ArboristTree.css'

// ─── 타입 정의 (types.ts 에서 인라인으로 통합) ────────────────────────────────

export interface TreeNodeData {
  value: string | number
  label: string
  seq?: number
  name?: string
  children?: TreeNodeData[]
  disabled?: boolean
  isLeaf?: boolean
  showCheckbox?: boolean
  count?: number
  level?: number
  hasChildren?: boolean
  dataType?: string
  data?: unknown
  indeterminate?: boolean
  [key: string]: unknown
}

export type CheckType = 'single' | 'multi' | 'click'

export interface ArboristTreeProps {
  nodes: TreeNodeData[]
  checkType?: CheckType
  checkedSeqList?: (string | number)[]
  handleCheckedSeq?: (checkedSeqList: (string | number)[], targetNode?: TreeNodeData) => void
  handleClickedNode?: (targetNode: TreeNodeData) => void
  enableSearchArea?: boolean
  /** Controlled search value. When provided together with `onSearchChange`, the internal search state is bypassed. */
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  isExpandAll?: boolean
  noBorder?: boolean
  isLoading?: boolean
  enableLabelToggle?: boolean
  hideTitleArea?: boolean
  title?: string
  height?: number | string
  className?: string
}

// ─── 아이콘 컴포넌트 ──────────────────────────────────────────────────────────

const ChevronRight = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const ChevronDown = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const FolderIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
)

const FolderOpenIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
  </svg>
)

const FileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
)

// ─── 내부 헬퍼 ────────────────────────────────────────────────────────────────

const getNodeId = (d: TreeNodeData) => String(d.seq ?? d.value)

const EMPTY_CHECKED: (string | number)[] = []

const CheckboxInput = ({
  checked,
  indeterminate,
  onClick,
}: {
  checked: boolean
  indeterminate: boolean
  onClick: (e: React.MouseEvent) => void
}) => {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={() => {}}
      onClick={onClick}
      className={styles.checkbox}
    />
  )
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────

export const ArboristTree = ({
  nodes = [],
  checkType = 'click',
  checkedSeqList,
  isExpandAll = true,
  handleCheckedSeq,
  handleClickedNode,
  noBorder = false,
  isLoading = false,
  enableSearchArea = true,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  hideTitleArea = false,
  title,
  height,
  className,
}: ArboristTreeProps) => {
  const stableChecked = checkedSeqList ?? EMPTY_CHECKED
  const isControlledSearch = searchValue !== undefined
  const [internalSearch, setInternalSearch] = useState('')
  const searchTerm = isControlledSearch ? (searchValue ?? '') : internalSearch
  const setSearchTerm = (v: string) => {
    if (isControlledSearch) {
      onSearchChange?.(v)
    } else {
      setInternalSearch(v)
      onSearchChange?.(v)
    }
  }
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 300, height: 240 })

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const w = el.getBoundingClientRect().width
    const h = el.getBoundingClientRect().height
    if (w > 0) {
      setDimensions({ width: w, height: h || 240 })
    }
    const obs = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect
      if (!rect) return
      setDimensions({
        width: rect.width || 300,
        height: rect.height || 240,
      })
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const NodeRenderer = ({ node, style }: NodeRendererProps<TreeNodeData>) => {
    const name = node.data.name ?? node.data.label
    const isDisabled = node.data.disabled
    const id = node.data.seq ?? node.data.value
    const isChecked = stableChecked.includes(id)

    const rowClass = cx(
      styles.nodeRow,
      isDisabled ? styles.nodeDisabled : styles.nodeClickable,
      !isDisabled && isChecked ? styles.nodeSelected : undefined,
    )

    const handleCheckboxClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (isDisabled) return
      if (checkType === 'single') {
        handleCheckedSeq?.([id], node.data)
      } else if (checkType === 'multi') {
        const newList = isChecked ? stableChecked.filter((v) => v !== id) : [...stableChecked, id]
        handleCheckedSeq?.(newList, node.data)
      }
    }

    const handleRowClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (isDisabled) return
      if (checkType === 'click') {
        handleClickedNode?.(node.data)
      } else if (checkType === 'single') {
        handleCheckedSeq?.([id], node.data)
      } else if (checkType === 'multi') {
        const newList = isChecked ? stableChecked.filter((v) => v !== id) : [...stableChecked, id]
        handleCheckedSeq?.(newList, node.data)
      }
    }

    return (
      // style prop 은 react-arborist 가 row virtualization 을 위해 주는 runtime top/height — design token 으로 표현 불가, 인라인 유지.
      <div style={style} className={styles.nodeOuter}>
        <div className={rowClass} onClick={handleRowClick}>
          {node.isInternal ? (
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={(e) => {
                e.stopPropagation()
                node.toggle()
              }}
              aria-label={node.isOpen ? 'Collapse' : 'Expand'}
            >
              {node.isOpen ? <ChevronDown /> : <ChevronRight />}
            </button>
          ) : (
            <div className={styles.toggleSpacer} />
          )}
          {node.data.showCheckbox && (
            <CheckboxInput
              checked={isChecked}
              indeterminate={!!node.data.indeterminate}
              onClick={handleCheckboxClick}
            />
          )}
          <span className={styles.nodeIcon}>
            {node.data.dataType === 'GROUP' ? (
              node.isInternal && node.isOpen ? (
                <FolderOpenIcon />
              ) : (
                <FolderIcon />
              )
            ) : (
              <FileIcon />
            )}
          </span>
          <span className={styles.nodeLabel}>{name}</span>
          {node.data.count !== undefined && <span className={styles.nodeCount}>{node.data.count}</span>}
        </div>
      </div>
    )
  }

  // height 가 지정되면 runtime pixel 값을 inline 으로 — design token 으로 표현 불가한 동적 값.
  // flex / minHeight 분기는 modifier class 로.
  const bodyStyle: React.CSSProperties | undefined = height
    ? { height: typeof height === 'number' ? `${height}px` : height }
    : undefined

  const bodyClassName = cx(
    styles.treeBody,
    noBorder ? styles.treeBodyNoBorder : undefined,
    height ? styles.treeBodyFixedHeight : undefined,
  )

  const containerClassName = cx(styles.treeContainer, className)

  const treeHeight = height
    ? typeof height === 'number'
      ? height - 12
      : dimensions.height - 12
    : dimensions.height - 12

  return (
    <div className={containerClassName}>
      {!hideTitleArea && (
        <div className={cx(styles.titleRow, title ? styles.titleRowWithTitle : undefined)}>
          {title && <div className={styles.titleText}>{title}</div>}
          {enableSearchArea && (
            <div className={styles.searchArea}>
              <input
                type="text"
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
              />
            </div>
          )}
        </div>
      )}
      <div className={bodyClassName} ref={containerRef} style={bodyStyle}>
        {isLoading ? (
          <div className={styles.loadingWrapper}>Loading...</div>
        ) : (
          <Tree<TreeNodeData>
            data={nodes}
            idAccessor={getNodeId}
            childrenAccessor="children"
            searchTerm={searchTerm}
            searchMatch={(node, term) => (node.data.name ?? node.data.label).toLowerCase().includes(term.toLowerCase())}
            openByDefault={isExpandAll}
            disableMultiSelection
            disableDrag
            disableDrop
            disableEdit
            width={dimensions.width}
            height={treeHeight > 0 ? treeHeight : 200}
            rowHeight={24}
            indent={20}
          >
            {NodeRenderer}
          </Tree>
        )}
      </div>
    </div>
  )
}
