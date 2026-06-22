import { cx } from '../../utils'
import * as styles from './Pagination.css'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  /** 가운데에 표시할 최대 페이지 버튼 수 (기본 5) */
  maxDisplay?: number
  /** `«` `»` 첫/마지막 페이지 버튼 노출 */
  showFirstLast?: boolean
  /** `‹` `›` 이전/다음 페이지 버튼 노출 (기본 true) */
  showPrevNext?: boolean
  /** 모든 버튼 비활성화 — fetching 중 사용 */
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

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxDisplay = 5,
  showFirstLast = false,
  showPrevNext = true,
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
      className={cx(styles.container, className)}
      aria-label="Pagination"
      aria-busy={disabled || undefined}
    >
      {showFirstLast && (
        <button
          type="button"
          className={styles.button}
          onClick={() => go(1)}
          disabled={disabled || page === 1}
          aria-label="First page"
        >
          «
        </button>
      )}
      {showPrevNext && (
        <button
          type="button"
          className={styles.button}
          onClick={() => go(page - 1)}
          disabled={disabled || page === 1}
          aria-label="Previous page"
        >
          ‹
        </button>
      )}
      {hasLeftEllipsis && (
        <span className={styles.ellipsis} aria-hidden="true">
          …
        </span>
      )}
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={styles.pageButton}
          onClick={() => go(p)}
          disabled={disabled}
          aria-current={p === page ? 'page' : undefined}
          aria-label={`Page ${p}`}
        >
          {p}
        </button>
      ))}
      {hasRightEllipsis && (
        <span className={styles.ellipsis} aria-hidden="true">
          …
        </span>
      )}
      {showPrevNext && (
        <button
          type="button"
          className={styles.button}
          onClick={() => go(page + 1)}
          disabled={disabled || page === safeTotal}
          aria-label="Next page"
        >
          ›
        </button>
      )}
      {showFirstLast && (
        <button
          type="button"
          className={styles.button}
          onClick={() => go(safeTotal)}
          disabled={disabled || page === safeTotal}
          aria-label="Last page"
        >
          »
        </button>
      )}
    </nav>
  )
}
