import { useEffect, useState } from 'react'
import { Dropdown } from '../Dropdown'
import { cx } from '../../utils'
import * as styles from './PaginationBar.css'

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

// ---------------------------------------------------------------------------
// PaginationBarProps (types.ts 를 통합)
// ---------------------------------------------------------------------------

export interface PaginationBarProps {
  currentPage: number
  totalPages: number
  totalCount: number
  pageSize: number
  pageSizeOptions?: readonly number[]
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  maxDisplay?: number
  /** fetching 중 모든 컨트롤 비활성화 */
  disabled?: boolean
  /** 우측 "전체 N 페이지 중 [input] 페이지 (M 항목)" 영역 노출 (기본 true) */
  showRight?: boolean
  className?: string
}

// ---------------------------------------------------------------------------
// 내부 Pagination — PaginationBar 전용 (경량 인라인)
// ---------------------------------------------------------------------------

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxDisplay?: number
  disabled?: boolean
  className?: string
}

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)

const getVisiblePages = (currentPage: number, totalPages: number, maxDisplay: number) => {
  const safeTotal = Math.max(1, totalPages)
  const safeMax = Math.max(1, Math.min(maxDisplay, safeTotal))
  const half = Math.floor(safeMax / 2)

  let start = currentPage - half
  let end = currentPage + (safeMax - 1 - half)

  if (start < 1) {
    end += 1 - start
    start = 1
  }
  if (end > safeTotal) {
    start -= end - safeTotal
    end = safeTotal
  }
  start = Math.max(1, start)

  const pages: number[] = []
  for (let p = start; p <= end; p += 1) pages.push(p)
  return {
    pages,
    hasLeftEllipsis: start > 1,
    hasRightEllipsis: end < safeTotal,
  }
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxDisplay = 5,
  disabled = false,
  className,
}: PaginationProps) => {
  const safeTotal = Math.max(1, totalPages)
  const page = clamp(currentPage, 1, safeTotal)
  const { pages, hasLeftEllipsis, hasRightEllipsis } = getVisiblePages(page, safeTotal, maxDisplay)

  const go = (target: number) => {
    const next = clamp(target, 1, safeTotal)
    if (next !== page) onPageChange(next)
  }

  return (
    <nav
      className={cx(styles.paginationContainer, className)}
      aria-label="Pagination"
      aria-busy={disabled || undefined}
    >
      <button
        type="button"
        className={styles.paginationButton}
        onClick={() => go(page - 1)}
        disabled={disabled || page === 1}
        aria-label="Previous page"
      >
        ‹
      </button>
      {hasLeftEllipsis && (
        <span className={styles.paginationEllipsis} aria-hidden="true">
          …
        </span>
      )}
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={styles.paginationPageButton}
          onClick={() => go(p)}
          disabled={disabled}
          aria-current={p === page ? 'page' : undefined}
          aria-label={`Page ${p}`}
        >
          {p}
        </button>
      ))}
      {hasRightEllipsis && (
        <span className={styles.paginationEllipsis} aria-hidden="true">
          …
        </span>
      )}
      <button
        type="button"
        className={styles.paginationButton}
        onClick={() => go(page + 1)}
        disabled={disabled || page === safeTotal}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  )
}

// ---------------------------------------------------------------------------
// PaginationBar
// ---------------------------------------------------------------------------

export const PaginationBar = ({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onPageChange,
  onPageSizeChange,
  maxDisplay = 5,
  disabled = false,
  showRight = true,
  className,
}: PaginationBarProps) => {
  const [inputValue, setInputValue] = useState(String(currentPage))

  useEffect(() => {
    setInputValue(String(currentPage))
  }, [currentPage])

  const commit = () => {
    const n = Number(inputValue.trim())
    // 음수/0/비정수/NaN/Infinity 입력은 현재 페이지로 복원, 상한 초과는 totalPages 로 clamp
    if (!Number.isInteger(n) || n < 1) {
      setInputValue(String(currentPage))
      return
    }
    onPageChange(Math.min(n, totalPages))
  }

  const pageSizeItems = pageSizeOptions.map((size) => ({
    label: size.toLocaleString(),
    value: size,
  }))

  return (
    <div
      className={cx(styles.container, className)}
      aria-busy={disabled || undefined}
    >
      <div className={styles.left}>
        <span className={styles.leftLabel}>페이지 당 항목 수</span>
        <Dropdown<number>
          items={pageSizeItems}
          value={pageSize}
          onChange={onPageSizeChange}
          placement="top"
          disabled={disabled}
        />
      </div>
      <div className={styles.center}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          maxDisplay={maxDisplay}
          disabled={disabled}
        />
      </div>
      {showRight ? (
        <div className={styles.right}>
          <span>전체 {totalPages} 페이지 중</span>
          <input
            type="text"
            inputMode="numeric"
            className={styles.pageInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit()
            }}
            disabled={disabled}
            aria-label="페이지 이동"
          />
          <span>페이지 ({totalCount.toLocaleString()} 항목)</span>
        </div>
      ) : (
        <div className={styles.right} aria-hidden="true" />
      )}
    </div>
  )
}
