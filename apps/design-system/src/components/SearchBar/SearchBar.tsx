import { forwardRef, useRef, useState } from 'react'
import type { ChangeEvent, KeyboardEvent, RefObject } from 'react'
import type { SearchBarProps } from './SearchBar.types'
import {
  searchBarRoot,
  searchBarWrapper,
  searchInput,
  clearButton,
  searchButton,
  leftOuterActionsSlot,
  leftActionsSlot,
  prefixSlot,
  suffixActionsSlot,
  rightActionsSlot,
  expandButton,
  expandedTopRow,
  searchTextarea,
} from './SearchBar.css'
import { ExdSearchIcon, ExdCloseIcon, ExdExpandIcon } from '@port/icon-library'
import cn from 'classnames'

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value,
      defaultValue = '',
      onChange,
      onSearch,
      onClear,
      placeholder = '검색어를 입력하세요',
      size = 'md',
      disabled = false,
      searchLabel,
      hideButton = false,
      className,
      style,
      leftOuterActions,
      leftActions,
      prefix,
      onPrefixClick,
      suffixActions,
      expandable = false,
      expanded,
      onExpandChange,
      rightActions,
    },
    ref,
  ) => {
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue)
    const inputValue = isControlled ? value : internalValue

    const isControlledExpand = expanded !== undefined
    const [internalExpanded, setInternalExpanded] = useState(false)
    const isExpanded = isControlledExpand ? !!expanded : internalExpanded

    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value
      if (!isControlled) setInternalValue(next)
      onChange?.(next)
    }

    const handleClear = () => {
      if (!isControlled) setInternalValue('')
      onChange?.('')
      onClear?.()
      const target = (ref as RefObject<HTMLInputElement> | null)?.current ?? inputRef.current
      target?.focus()
    }

    const handleSearch = () => onSearch?.(inputValue ?? '')

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSearch()
    }

    const handleExpandToggle = () => {
      const next = !isExpanded
      if (!isControlledExpand) setInternalExpanded(next)
      onExpandChange?.(next)
    }

    const PrefixTag = onPrefixClick ? 'button' : 'span'

    const prefixEl = prefix ? (
      <PrefixTag
        className={cn(prefixSlot, 'searchbar-prefix', !!onPrefixClick && 'is-interactive')}
        {...(onPrefixClick ? { type: 'button' as const, onClick: onPrefixClick } : {})}
      >
        {prefix}
      </PrefixTag>
    ) : null

    const clearEl = inputValue ? (
      <button type="button" className={clearButton} onClick={handleClear} aria-label="검색어 지우기" tabIndex={-1}>
        <ExdCloseIcon size={12} />
      </button>
    ) : null

    const expandEl = expandable ? (
      <button
        type="button"
        className={expandButton}
        onClick={handleExpandToggle}
        aria-label={isExpanded ? '검색영역 축소' : '검색영역 확장'}
        tabIndex={-1}
      >
        <ExdExpandIcon size={14} />
      </button>
    ) : null

    const searchBtnEl = !hideButton ? (
      <button
        type="button"
        className={searchButton}
        onClick={handleSearch}
        disabled={disabled}
        aria-label={searchLabel ?? '검색'}
      >
        <ExdSearchIcon size={14} />
        {searchLabel && <span>{searchLabel}</span>}
      </button>
    ) : null

    const inputEl = (
      <input
        ref={ref ?? inputRef}
        type="text"
        className={searchInput}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
      />
    )

    return (
      <div className={cn(searchBarRoot, `searchbar-${size}`, disabled && 'is-disabled', className)} style={style}>
        {leftOuterActions && <span className={leftOuterActionsSlot}>{leftOuterActions}</span>}

        {isExpanded ? (
          <div className={cn(searchBarWrapper, 'is-expanded')}>
            <div className={expandedTopRow}>
              {leftActions && <span className={leftActionsSlot}>{leftActions}</span>}
              {prefixEl}
              {inputEl}
              {clearEl}
              {suffixActions && <span className={suffixActionsSlot}>{suffixActions}</span>}
              {expandEl}
              {searchBtnEl}
            </div>
            <textarea
              className={searchTextarea}
              value={inputValue}
              onChange={(e) => {
                const next = e.target.value
                if (!isControlled) setInternalValue(next)
                onChange?.(next)
              }}
              placeholder={placeholder}
              disabled={disabled}
            />
          </div>
        ) : (
          <div className={searchBarWrapper}>
            {leftActions && <span className={leftActionsSlot}>{leftActions}</span>}
            {prefixEl}
            {inputEl}
            {clearEl}
            {suffixActions && <span className={suffixActionsSlot}>{suffixActions}</span>}
            {expandEl}
            {searchBtnEl}
          </div>
        )}

        {rightActions && <span className={rightActionsSlot}>{rightActions}</span>}
      </div>
    )
  },
)

SearchBar.displayName = 'SearchBar'
