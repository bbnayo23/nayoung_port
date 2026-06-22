import {
  useRef,
  useCallback,
  useMemo,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react'
import { cx } from '../../utils'
import { Portal } from '../../utils'
import type { DropdownItem } from '../Dropdown/Dropdown'
import { useMultipleDropdown } from './hooks'
import * as styles from './MultipleDropdown.css'

// ---------------------------------------------------------------------------
// 타입 (types.ts 를 MultipleDropdown.tsx 에 통합)
// ---------------------------------------------------------------------------

export interface MultipleDropdownProps<T = string> {
  items: DropdownItem<T>[]
  values?: T[]
  onChange?: (values: T[]) => void
  placeholder?: string
  searchable?: boolean
  disabled?: boolean
  className?: string
  /** trigger 너비를 고정한다. 선택 항목이 늘어도 너비가 변하지 않도록. */
  width?: number | string
  maxWidth?: number | string
  /**
   * "전체" 토글(모두 선택)을 패널에서 숨긴다. 빈 배열이 곧 "전체"로 해석되는
   * API(예: 빈 logTypes 가 전체 의미)에 대해, 모두 선택해 n개를 그대로 전송하는
   * 비효율을 막기 위함. 선택이 있을 때만 우측 "초기화" 버튼이 노출된다.
   */
  hideSelectAll?: boolean
}

// ---------------------------------------------------------------------------
// 내부 유틸
// ---------------------------------------------------------------------------

interface PanelPosition {
  top: number
  left: number
  minWidth: number
}

// ---------------------------------------------------------------------------
// MultipleDropdown
// ---------------------------------------------------------------------------

export function MultipleDropdown<T = string>({
  items,
  values = [],
  onChange,
  placeholder = '전체',
  searchable = false,
  disabled = false,
  className,
  width,
  maxWidth,
  hideSelectAll = false,
}: MultipleDropdownProps<T>) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const {
    isOpen,
    toggle,
    close,
    searchQuery,
    setSearchQuery,
    filteredItems,
    toggleSelect,
    isAllSelected,
    toggleAll,
    selectedCount,
  } = useMultipleDropdown({ items, values, onChange, searchable })

  // ---- 패널 위치 계산 ----
  const [panelPos, setPanelPos] = useState<PanelPosition>({ top: 0, left: 0, minWidth: 0 })

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    let left = rect.left + window.scrollX

    // viewport clamping: 패널이 오른쪽으로 넘치면 조정
    if (panelRef.current) {
      const panelWidth = panelRef.current.offsetWidth
      if (left + panelWidth > window.innerWidth) {
        left = Math.max(0, window.innerWidth - panelWidth - 8)
      }
    }

    setPanelPos({
      top: rect.bottom + window.scrollY,
      left,
      minWidth: rect.width,
    })
  }, [])

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition()
      requestAnimationFrame(() => updatePosition())
    }
  }, [isOpen, updatePosition])

  // ---- scroll / resize / Escape / click-outside ----
  useEffect(() => {
    if (!isOpen) return

    const handleScroll = () => updatePosition()
    const handleResize = () => updatePosition()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (
        !triggerRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        close()
      }
    }

    window.addEventListener('scroll', handleScroll, true)
    window.addEventListener('resize', handleResize)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen, close, updatePosition])

  const selectedLabel = useMemo(() => {
    if (values.length === 0) return ''
    const labelMap = new Map<T, string>()
    for (const item of items) {
      if (!('type' in item && item.type === 'divider')) labelMap.set(item.value, item.label)
    }
    return values.map((v) => labelMap.get(v) ?? String(v)).join(', ')
  }, [items, values])

  const hasSelection = selectedCount > 0

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cx(styles.trigger, isOpen && styles.triggerOpen, className)}
        onClick={toggle}
        disabled={disabled}
        style={
          width !== undefined || maxWidth !== undefined ? { width, maxWidth } : undefined
        }
      >
        <span
          className={cx(styles.triggerLabel, !hasSelection && styles.placeholder)}
          title={hasSelection ? selectedLabel : undefined}
        >
          {hasSelection ? selectedLabel : placeholder}
        </span>
        <span className={cx(styles.arrow, isOpen && styles.arrowOpen)}>▼</span>
      </button>

      {isOpen && (
        <Portal>
          <div
            ref={panelRef}
            className={styles.panel}
            style={{
              top: panelPos.top,
              left: panelPos.left,
              minWidth: panelPos.minWidth,
            }}
          >
            {searchable && (
              <div className={styles.searchRow}>
                <input
                  className={styles.searchInput}
                  type="text"
                  placeholder="검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {hideSelectAll && (
                  <button type="button" className={styles.resetButton} onClick={() => onChange?.([])}>
                    초기화
                  </button>
                )}
              </div>
            )}
            {(!hideSelectAll || !searchable) && (
              <div className={cx(styles.toolbar, hideSelectAll && styles.toolbarEnd)}>
                {!hideSelectAll && (
                  <div className={styles.allItem} onClick={toggleAll}>
                    <input type="checkbox" className={styles.checkbox} checked={isAllSelected} readOnly />
                    <span>전체</span>
                    {hasSelection && <span className={styles.badge}>{selectedCount}</span>}
                  </div>
                )}
                {(hideSelectAll || hasSelection) && (
                  <button type="button" className={styles.resetButton} onClick={() => onChange?.([])}>
                    초기화
                  </button>
                )}
              </div>
            )}
            <div className={styles.list}>
              {filteredItems.length === 0 ? (
                <div className={styles.empty}>검색 결과가 없습니다</div>
              ) : (
                filteredItems.map((item) =>
                  'type' in item && item.type === 'divider' ? (
                    <div key={item.key} className={styles.divider} />
                  ) : (
                    <div
                      key={String(item.value)}
                      className={cx(styles.item, item.disabled && styles.itemDisabled)}
                      onClick={() => !item.disabled && toggleSelect(item.value)}
                    >
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={values.includes(item.value)}
                        readOnly
                      />
                      <span>{item.label}</span>
                    </div>
                  ),
                )
              )}
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
