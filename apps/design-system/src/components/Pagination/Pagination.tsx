import { useId, useState } from 'react'
import { ExdPagingLIcon, ExdPagingRIcon } from '@port/icon-library'
import { usePages } from './Pagination.hooks'
import {
  paginationBar,
  pageSizeDropdown,
  paginationCenter,
  pagination,
  paginationItem,
  pageInfo,
  pageJump,
} from './Pagination.css'
import { Dropdown } from '../Dropdown'
import type { PaginationProps } from './Pagination.types'
import cn from 'classnames'

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  maxDisplay = 5,
  showFirstLast = false,
  showPrevNext = true,
  size = 'md',
  className,
  disabled = false,
  totalItems,
  itemsPerPage,
  itemsPerPageOptions,
  onItemsPerPageChange,
  showPageInfo = false,
  showPageJump = false,
  showItemsPerPage = false,
  ...props
}) => {
  const id = useId()
  const { pages, start, end } = usePages(totalPages, currentPage, maxDisplay)
  const [jumpValue, setJumpValue] = useState('')

  const hasGapFromStart = start > 1
  const hasGapFromEnd = end < totalPages
  const showFirst = showFirstLast && hasGapFromStart
  const showLast = showFirstLast && hasGapFromEnd

  let iconSize = 10
  if (size === 'lg') iconSize = 12
  if (size === 'sm') iconSize = 8

  const hasExtras = showItemsPerPage || showPageInfo || showPageJump

  const handleJump = () => {
    const page = parseInt(jumpValue, 10)
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
    setJumpValue('')
  }

  const paginationContent = (
    <ul className={cn(pagination, 'pagination', `pagination-${size}`, disabled && 'disabled')} {...props}>
      {showPrevNext && (
        <li
          className={cn(paginationItem, 'prev', currentPage === 1 && 'disabled')}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ExdPagingLIcon size={iconSize} />
        </li>
      )}
      {showFirst && (
        <li className={cn(paginationItem, 'page', 1 === currentPage && 'active')} onClick={() => onPageChange(1)}>
          1
        </li>
      )}
      {hasGapFromStart && (
        <li className={cn(paginationItem, 'ellipsis')} onClick={() => onPageChange(start - 1)}>
          ...
        </li>
      )}
      {pages.map((page) => (
        <li
          key={`${id}-${page}`}
          className={cn(paginationItem, 'page', page === currentPage && 'active')}
          onClick={() => onPageChange(page)}
        >
          {page}
        </li>
      ))}
      {hasGapFromEnd && (
        <li className={cn(paginationItem, 'ellipsis')} onClick={() => onPageChange(end + 1)}>
          ...
        </li>
      )}
      {showLast && (
        <li
          className={cn(paginationItem, 'page', totalPages === currentPage && 'active')}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </li>
      )}
      {showPrevNext && (
        <li
          className={cn(paginationItem, 'next', currentPage === totalPages && 'disabled')}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ExdPagingRIcon size={iconSize} />
        </li>
      )}
    </ul>
  )

  if (!hasExtras) {
    return paginationContent
  }

  const formattedTotalItems = totalItems?.toLocaleString()

  return (
    <div className={cn(paginationBar, 'pagination-bar', `pagination-bar-${size}`, className)}>
      {showItemsPerPage && itemsPerPageOptions && itemsPerPageOptions.length > 0 && (
        <div className={pageSizeDropdown}>
          <Dropdown
            options={itemsPerPageOptions.map((opt) => ({ value: String(opt), label: `${opt} 건` }))}
            value={itemsPerPage !== null && itemsPerPage !== undefined ? String(itemsPerPage) : undefined}
            onChange={(value) => onItemsPerPageChange?.(Number(value))}
            size={size}
          />
        </div>
      )}

      <div className={paginationCenter}>
        {paginationContent}

        {showPageInfo && (
          <span className={cn(pageInfo, 'pagination-page-info')}>
            전체 {totalPages}페이지 중 {currentPage} 페이지
            {totalItems !== undefined && ` (${formattedTotalItems} 항목)`}
          </span>
        )}
      </div>

      {showPageJump && (
        <span className={cn(pageJump, 'pagination-page-jump')}>
          <input
            type="text"
            value={jumpValue}
            placeholder={String(currentPage)}
            onChange={(e) => setJumpValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleJump()
            }}
            onBlur={handleJump}
          />
          / {totalPages}
        </span>
      )}
    </div>
  )
}

export default Pagination
