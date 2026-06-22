import {
  useRef,
  useCallback,
  useState,
  useMemo,
  useLayoutEffect,
  useEffect,
  type ReactNode,
} from 'react'
import { cx } from '../../utils'
import { Portal } from '../../utils'
import * as styles from './Dropdown.css'

// ---------------------------------------------------------------------------
// 타입 (types.ts 를 Dropdown.tsx 에 통합)
// ---------------------------------------------------------------------------

export type DropdownItem<T = string> =
  | {
      type?: 'item'
      label: string
      value: T
      disabled?: boolean
      searchFixed?: boolean
      /** 항목 우측에 부가 정보 (e.g. 타입 라벨) 를 회색으로 표시 */
      description?: string
    }
  | { type: 'divider'; key: string }

export interface DropdownProps<T = string> {
  items?: DropdownItem<T>[]
  value?: T
  onChange?: (value: T) => void
  placeholder?: string
  /** trigger 에 표시할 고정 텍스트. value/selectedItem 보다 우선 */
  label?: string
  searchable?: boolean
  disabled?: boolean
  className?: string
  /** trigger 너비를 고정한다. label 이 길어져도 너비가 변하지 않도록. */
  width?: number | string
  placement?: 'bottom' | 'top'
  /** items 기반 렌더링 대신 커스텀 패널을 렌더링. close()로 패널 닫기 */
  renderPanel?: (close: () => void) => ReactNode
}

// ---------------------------------------------------------------------------
// 내부 유틸
// ---------------------------------------------------------------------------

function isSelectableItem<T>(
  item: DropdownItem<T>,
): item is Extract<DropdownItem<T>, { label: string }> {
  return !('type' in item && item.type === 'divider')
}

interface PanelPosition {
  top: number
  left: number
  minWidth: number
}

// ---------------------------------------------------------------------------
// Dropdown
// ---------------------------------------------------------------------------

export function Dropdown<T = string>({
  items = [],
  value,
  onChange,
  placeholder = '선택하세요',
  label,
  searchable = false,
  disabled = false,
  className,
  width,
  placement = 'bottom',
  renderPanel,
}: DropdownProps<T>) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // ---- 열림/닫힘 + 검색 상태 ----
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) setSearchQuery('')
      return !prev
    })
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setSearchQuery('')
  }, [])

  const select = useCallback(
    (itemValue: T) => {
      onChange?.(itemValue)
      close()
    },
    [onChange, close],
  )

  // ---- 필터링 + 선택 항목 ----
  const filteredItems = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return items
    const query = searchQuery.toLowerCase()
    return items.filter((item) =>
      isSelectableItem(item)
        ? item.searchFixed || item.label.toLowerCase().includes(query)
        : true,
    )
  }, [items, searchQuery, searchable])

  const selectedItem = useMemo(
    () => items.find((item) => isSelectableItem(item) && item.value === value) ?? null,
    [items, value],
  )

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

    const panelHeight =
      placement === 'top' && panelRef.current ? panelRef.current.offsetHeight : 0

    setPanelPos({
      top:
        placement === 'top'
          ? rect.top + window.scrollY - panelHeight
          : rect.bottom + window.scrollY,
      left,
      minWidth: rect.width,
    })
  }, [placement])

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

  const triggerText =
    label ?? (selectedItem && 'label' in selectedItem ? selectedItem.label : null)

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cx(styles.trigger, isOpen && styles.triggerOpen, className)}
        onClick={toggle}
        disabled={disabled}
        style={width !== undefined ? { width } : undefined}
      >
        {triggerText !== null ? (
          <span className={styles.triggerLabel}>{triggerText}</span>
        ) : (
          <span className={cx(styles.triggerLabel, styles.placeholder)}>{placeholder}</span>
        )}
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
            {renderPanel ? (
              renderPanel(close)
            ) : (
              <>
                {searchable && (
                  <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
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
                          className={cx(
                            styles.item,
                            item.value === value && styles.itemSelected,
                            item.disabled && styles.itemDisabled,
                          )}
                          onClick={() => !item.disabled && select(item.value)}
                        >
                          {item.value === value && (
                            <span className={styles.checkmark}>✓</span>
                          )}
                          <span className={styles.itemLabel}>{item.label}</span>
                          {item.description && (
                            <span className={styles.itemDescription}>{item.description}</span>
                          )}
                        </div>
                      ),
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </Portal>
      )}
    </>
  )
}
