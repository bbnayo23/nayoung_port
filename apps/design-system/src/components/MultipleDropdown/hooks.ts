import { useState, useCallback, useMemo } from 'react'
import type { DropdownItem } from '../Dropdown/Dropdown'

function isSelectableItem<T>(item: DropdownItem<T>): item is Extract<DropdownItem<T>, { label: string }> {
  return !('type' in item && item.type === 'divider')
}

export interface UseMultipleDropdownOptions<T = string> {
  items: DropdownItem<T>[]
  values?: T[]
  onChange?: (values: T[]) => void
  searchable?: boolean
}

export function useMultipleDropdown<T = string>({
  items,
  values = [],
  onChange,
  searchable,
}: UseMultipleDropdownOptions<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const selectableItems = useMemo(() => items.filter(isSelectableItem), [items])

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

  const toggleSelect = useCallback(
    (itemValue: T) => {
      const next = values.includes(itemValue) ? values.filter((v) => v !== itemValue) : [...values, itemValue]
      onChange?.(next)
    },
    [values, onChange],
  )

  const isAllSelected = useMemo(
    () => selectableItems.length > 0 && selectableItems.every((item) => values.includes(item.value)),
    [selectableItems, values],
  )

  const toggleAll = useCallback(() => {
    if (isAllSelected) {
      onChange?.([])
    } else {
      onChange?.(selectableItems.map((item) => item.value))
    }
  }, [isAllSelected, selectableItems, onChange])

  const filteredItems = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return items
    const query = searchQuery.toLowerCase()
    return items.filter((item) =>
      isSelectableItem(item) ? item.searchFixed || item.label.toLowerCase().includes(query) : true,
    )
  }, [items, searchQuery, searchable])

  return {
    isOpen,
    toggle,
    close,
    searchQuery,
    setSearchQuery,
    filteredItems,
    toggleSelect,
    isAllSelected,
    toggleAll,
    selectedCount: values.length,
  } as const
}
