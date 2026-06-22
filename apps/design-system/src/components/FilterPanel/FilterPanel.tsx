import { useEffect, useRef, useState } from 'react'

import { cx } from '../../utils'
import {
  filterGroups,
  formatCount,
  getAllCheckState,
  getGroupCheckState,
  useExpanded,
  useFilterSelection,
} from './hooks'
import * as styles from './FilterPanel.css'

// ── 인터페이스 (types.ts 통합) ─────────────────────────────────────────────

export interface FilterPanelItem {
  value: string
  label: string
  count?: number
}

export interface FilterPanelGroup {
  id: string
  label: string
  count?: number
  items: FilterPanelItem[]
  defaultExpanded?: boolean
}

export interface FilterPanelProps {
  groups: FilterPanelGroup[]

  /** groupId -> 선택된 값 목록. 제공 시 controlled 모드. */
  selected?: Record<string, string[]>
  onChange?: (next: Record<string, string[]>) => void

  /** 패널 내부 레이블 검색. 제공 시 controlled 모드. */
  searchValue?: string
  onSearchChange?: (value: string) => void

  /** 패널을 좁은 strip 으로 접기. */
  collapsed?: boolean
  onToggleCollapse?: () => void

  /** Controlled expanded group id 목록. */
  expandedIds?: string[]
  onExpandedChange?: (ids: string[]) => void

  title?: string
  showAll?: boolean
  allLabel?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
}

// ── 내부 아이콘 (SVG 인라인) ──────────────────────────────────────────────

const ChevronRightIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M3.5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChevronLeftIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M6.5 2l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const SearchIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M8 8l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

// ── TriStateCheckbox ──────────────────────────────────────────────────────

interface TriStateCheckboxProps {
  state: 'none' | 'some' | 'all'
  onToggle: () => void
  ariaLabel: string
}

const TriStateCheckbox = ({ state, onToggle, ariaLabel }: TriStateCheckboxProps) => {
  const ref = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = state === 'some'
  }, [state])
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={state === 'all'}
      aria-checked={state === 'some' ? 'mixed' : state === 'all'}
      aria-label={ariaLabel}
      onChange={onToggle}
      onClick={(e) => e.stopPropagation()}
    />
  )
}

// ── FilterPanel ───────────────────────────────────────────────────────────

export const FilterPanel = ({
  groups,
  selected,
  onChange,
  searchValue,
  onSearchChange,
  collapsed,
  onToggleCollapse,
  expandedIds,
  onExpandedChange,
  title = '필터',
  showAll = true,
  allLabel = '전체',
  searchPlaceholder = '검색',
  emptyText = '결과가 없습니다',
  className,
}: FilterPanelProps) => {
  const [internalSearch, setInternalSearch] = useState('')
  const search = searchValue ?? internalSearch
  const handleSearchChange = (value: string) => {
    if (searchValue === undefined) setInternalSearch(value)
    onSearchChange?.(value)
  }

  const { value, toggleValue, toggleGroup, toggleAll } = useFilterSelection({
    groups,
    selected,
    onChange,
  })
  const expand = useExpanded({ groups, expandedIds, onExpandedChange })

  const filteredGroups = filterGroups(groups, search)

  if (collapsed) {
    return (
      <div className={cx(styles.root, styles.rootCollapsed, className)}>
        <div className={styles.collapsedStrip}>
          <button
            type="button"
            className={styles.collapseButton}
            onClick={onToggleCollapse}
            aria-label="필터 열기"
            aria-expanded={false}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    )
  }

  const allState = getAllCheckState(groups, value)

  return (
    <div className={cx(styles.root, className)} role="region" aria-label={title}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {onToggleCollapse && (
          <button
            type="button"
            className={styles.collapseButton}
            onClick={onToggleCollapse}
            aria-label="필터 접기"
            aria-expanded
          >
            <ChevronLeftIcon />
          </button>
        )}
      </div>

      <div className={styles.searchWrap}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <span className={styles.searchIcon}>
          <SearchIcon />
        </span>
      </div>

      <div className={styles.list}>
        {showAll && (
          <label className={styles.allRow}>
            <TriStateCheckbox state={allState} onToggle={() => toggleAll(allState === 'all')} ariaLabel={allLabel} />
            <span className={styles.labelText}>{allLabel}</span>
          </label>
        )}

        {filteredGroups.length === 0 ? (
          <div className={styles.empty}>{emptyText}</div>
        ) : (
          filteredGroups.map((group) => (
            <GroupRow
              key={group.id}
              group={group}
              selectedValues={value[group.id] ?? []}
              expanded={expand.isExpanded(group.id)}
              onToggleExpand={() => expand.toggle(group.id)}
              onToggleGroup={() => toggleGroup(group)}
              onToggleItem={(itemValue) => toggleValue(group.id, itemValue)}
            />
          ))
        )}
      </div>
    </div>
  )
}

// ── GroupRow ──────────────────────────────────────────────────────────────

interface GroupRowProps {
  group: FilterPanelGroup
  selectedValues: string[]
  expanded: boolean
  onToggleExpand: () => void
  onToggleGroup: () => void
  onToggleItem: (value: string) => void
}

const GroupRow = ({ group, selectedValues, expanded, onToggleExpand, onToggleGroup, onToggleItem }: GroupRowProps) => {
  const state = getGroupCheckState(group, selectedValues)
  const countLabel = formatCount(group.count)

  return (
    <>
      <div
        className={styles.groupRow}
        onClick={onToggleExpand}
        role="button"
        aria-expanded={expanded}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggleExpand()
          }
        }}
      >
        <span className={cx(styles.chevron, expanded && styles.chevronExpanded)} aria-hidden="true">
          <ChevronRightIcon />
        </span>
        <TriStateCheckbox state={state} onToggle={onToggleGroup} ariaLabel={group.label} />
        <span className={styles.labelText}>{group.label}</span>
        {countLabel && <span className={styles.count}>{countLabel}</span>}
      </div>
      {expanded &&
        group.items.map((item) => (
          <ItemRow
            key={item.value}
            item={item}
            checked={selectedValues.includes(item.value)}
            onToggle={() => onToggleItem(item.value)}
          />
        ))}
    </>
  )
}

// ── ItemRow ───────────────────────────────────────────────────────────────

interface ItemRowProps {
  item: FilterPanelItem
  checked: boolean
  onToggle: () => void
}

const ItemRow = ({ item, checked, onToggle }: ItemRowProps) => {
  const countLabel = formatCount(item.count)
  return (
    <label className={styles.itemRow}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        onClick={(e) => e.stopPropagation()}
        aria-label={item.label}
      />
      <span className={styles.labelText}>{item.label}</span>
      {countLabel && <span className={styles.count}>{countLabel}</span>}
    </label>
  )
}
