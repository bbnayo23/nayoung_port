import { forwardRef, type FC, type ForwardRefExoticComponent, type RefAttributes } from 'react'
import {
  filterWrapper,
  filterOuter,
  filterHeader,
  filterBody,
  filterSearch,
  filterContent,
  filterSelectAll,
  filterCategories,
  filterCollapseBtn,
  filterSearchInput,
  filterEmptyText,
} from './Filter.css'
import type { FilterProps, FilterSearchProps, FilterContentProps, FilterGroup } from './Filter.types'
import { getGroupCheckState, getAllCheckState, filterGroups, formatCount } from './Filter.hooks'
import IconButton from '../IconButton'
import Checkbox from '../Checkbox'
import Accordion from '../Accordion'
import { XdrChevronLeftIcon } from '@port/icon-library'
import cn from 'classnames'

// ── Data-driven inner content (controlled) ────────────────────────────────────

interface FilterDataContentProps {
  groups: FilterGroup[]
  selected: Record<string, string[]>
  onChange: (next: Record<string, string[]>) => void
  searchValue: string
  onSearchChange: (value: string) => void
  expandedIds: string[]
  onExpandedChange: (ids: string[]) => void
  showAll: boolean
  allLabel: string
  searchPlaceholder: string
  emptyText: string
}

const FilterDataContent: FC<FilterDataContentProps> = ({
  groups,
  selected,
  onChange,
  searchValue,
  onSearchChange,
  expandedIds,
  onExpandedChange,
  showAll,
  allLabel,
  searchPlaceholder,
  emptyText,
}) => {
  const allState = getAllCheckState(groups, selected)
  const filteredGroups = filterGroups(groups, searchValue)

  const toggleAll = () => {
    if (allState === 'all') {
      onChange({})
      return
    }
    const next: Record<string, string[]> = {}
    for (const g of groups) next[g.id] = g.items.map((i) => i.value)
    onChange(next)
  }

  const toggleGroup = (group: FilterGroup) => {
    const current = selected[group.id] ?? []
    const allValues = group.items.map((i) => i.value)
    const allChecked = allValues.every((v) => current.includes(v))
    onChange({ ...selected, [group.id]: allChecked ? [] : allValues })
  }

  const toggleItem = (groupId: string, itemValue: string) => {
    const current = selected[groupId] ?? []
    const exists = current.includes(itemValue)
    onChange({ ...selected, [groupId]: exists ? current.filter((v) => v !== itemValue) : [...current, itemValue] })
  }

  const toggleExpand = (groupId: string) => {
    const has = expandedIds.includes(groupId)
    onExpandedChange(has ? expandedIds.filter((id) => id !== groupId) : [...expandedIds, groupId])
  }

  return (
    <>
      <div className={filterSearch}>
        <input
          type="text"
          className={filterSearchInput}
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className={cn(filterContent, 'filter-content')}>
        {showAll && (
          <div className={cn(filterSelectAll, 'filter-checkbox-all')}>
            <Checkbox
              label={allLabel}
              checked={allState === 'all'}
              indeterminate={allState === 'some'}
              onChange={toggleAll}
            />
          </div>
        )}
        <div className={cn(filterCategories, 'filter-categories-wrapper')}>
          {filteredGroups.length === 0 ? (
            <div className={filterEmptyText}>{emptyText}</div>
          ) : (
            filteredGroups.map((group) => {
              const selectedValues = selected[group.id] ?? []
              const state = getGroupCheckState(group, selectedValues)
              const count = formatCount(group.count)
              const isOpen = expandedIds.includes(group.id)
              return (
                <Accordion key={group.id} iconDirection="left">
                  <Accordion.Item
                    active={isOpen}
                    onChange={(open) => {
                      if (open !== isOpen) toggleExpand(group.id)
                    }}
                  >
                    <Accordion.Header>
                      <span onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={state === 'all'}
                          indeterminate={state === 'some'}
                          onChange={() => toggleGroup(group)}
                        />
                      </span>
                      <span>{group.label}</span>
                      {count !== null && <span className="filter-groups-count">{count}</span>}
                    </Accordion.Header>
                    <Accordion.Content>
                      <div className="filter-groups-list">
                        {group.items.map((item) => {
                          const itemCount = formatCount(item.count)
                          return (
                            <div key={item.value} className="filter-item-row">
                              <Checkbox
                                label={item.label}
                                checked={selectedValues.includes(item.value)}
                                onChange={() => toggleItem(group.id, item.value)}
                              />
                              {itemCount !== null && <span className="filter-groups-count">{itemCount}</span>}
                            </div>
                          )
                        })}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}

// ── Filter root ───────────────────────────────────────────────────────────────

const Filter = forwardRef<HTMLDivElement, FilterProps>(
  (
    {
      collapsed = false,
      onCollapse,
      title = '필터',
      children,
      className,
      groups,
      selected = {},
      onChange = () => {},
      searchValue = '',
      onSearchChange = () => {},
      expandedIds = [],
      onExpandedChange = () => {},
      showAll = true,
      allLabel = '전체',
      searchPlaceholder = '검색',
      emptyText = '결과가 없습니다',
      ...props
    },
    ref,
  ) => (
    <div className={filterOuter}>
      <div
        ref={ref}
        className={cn(filterWrapper, 'filter-wrapper', { 'is-collapsed': collapsed }, className)}
        {...props}
      >
        <div className={filterHeader}>
          <h1 className="filter-title">{title}</h1>
        </div>
        <div className={filterBody}>
          {groups !== undefined ? (
            <FilterDataContent
              groups={groups}
              selected={selected}
              onChange={onChange}
              searchValue={searchValue}
              onSearchChange={onSearchChange}
              expandedIds={expandedIds}
              onExpandedChange={onExpandedChange}
              showAll={showAll}
              allLabel={allLabel}
              searchPlaceholder={searchPlaceholder}
              emptyText={emptyText}
            />
          ) : (
            children
          )}
        </div>
      </div>
      <IconButton
        size="sm"
        icon={<XdrChevronLeftIcon size={16} />}
        variant="circle"
        aria-label="필터 접기"
        onClick={onCollapse}
        className={cn('filter-collapse-button', filterCollapseBtn)}
      />
    </div>
  ),
)

// ── Sub-components ────────────────────────────────────────────────────────────

const Search: FC<FilterSearchProps> = ({ className, children }) => (
  <div className={cn(filterSearch, className)}>{children}</div>
)

const Content: FC<FilterContentProps> = ({ className = '', children }) => (
  <div className={cn(filterContent, 'filter-content', className)}>{children}</div>
)

const SelectAll: FC<FilterContentProps> = ({ className = '', children }) => (
  <div className={cn(filterSelectAll, 'filter-checkbox-all', className)}>{children}</div>
)

const Categories: FC<FilterContentProps> = ({ className = '', children }) => (
  <div className={cn(filterCategories, 'filter-categories-wrapper', className)}>{children}</div>
)

type FilterComponent = ForwardRefExoticComponent<FilterProps & RefAttributes<HTMLDivElement>> & {
  Search: typeof Search
  Content: typeof Content
  SelectAll: typeof SelectAll
  Categories: typeof Categories
}

Filter.displayName = 'Filter'
Search.displayName = 'Filter.Search'
Content.displayName = 'Filter.Content'
SelectAll.displayName = 'Filter.SelectAll'
Categories.displayName = 'Filter.Categories'

;(Filter as FilterComponent).Search = Search
;(Filter as FilterComponent).Content = Content
;(Filter as FilterComponent).SelectAll = SelectAll
;(Filter as FilterComponent).Categories = Categories

export default Filter as FilterComponent
