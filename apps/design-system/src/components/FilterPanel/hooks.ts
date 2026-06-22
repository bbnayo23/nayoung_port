import { useState } from 'react'

import type { FilterPanelGroup } from './FilterPanel'

interface UseFilterSelectionArgs {
  groups: FilterPanelGroup[]
  selected?: Record<string, string[]>
  onChange?: (next: Record<string, string[]>) => void
}

export const useFilterSelection = ({ groups, selected, onChange }: UseFilterSelectionArgs) => {
  const [internal, setInternal] = useState<Record<string, string[]>>({})
  const value = selected ?? internal

  const commit = (next: Record<string, string[]>) => {
    if (selected === undefined) setInternal(next)
    onChange?.(next)
  }

  const toggleValue = (groupId: string, itemValue: string) => {
    const current = value[groupId] ?? []
    const exists = current.includes(itemValue)
    const nextList = exists ? current.filter((v) => v !== itemValue) : [...current, itemValue]
    commit({ ...value, [groupId]: nextList })
  }

  const toggleGroup = (group: FilterPanelGroup) => {
    const current = value[group.id] ?? []
    const allValues = group.items.map((item) => item.value)
    const allSelected = allValues.length > 0 && allValues.every((v) => current.includes(v))
    commit({ ...value, [group.id]: allSelected ? [] : allValues })
  }

  const toggleAll = (allSelected: boolean) => {
    if (allSelected) {
      commit({})
      return
    }
    const next: Record<string, string[]> = {}
    for (const g of groups) next[g.id] = g.items.map((i) => i.value)
    commit(next)
  }

  return { value, toggleValue, toggleGroup, toggleAll }
}

interface UseExpandedArgs {
  groups: FilterPanelGroup[]
  expandedIds?: string[]
  onExpandedChange?: (ids: string[]) => void
}

export const useExpanded = ({ groups, expandedIds, onExpandedChange }: UseExpandedArgs) => {
  const [internal, setInternal] = useState<string[]>(() => groups.filter((g) => g.defaultExpanded).map((g) => g.id))
  const ids = expandedIds ?? internal

  const toggle = (groupId: string) => {
    const has = ids.includes(groupId)
    const next = has ? ids.filter((id) => id !== groupId) : [...ids, groupId]
    if (expandedIds === undefined) setInternal(next)
    onExpandedChange?.(next)
  }

  const isExpanded = (groupId: string) => ids.includes(groupId)

  return { isExpanded, toggle }
}

export const getGroupCheckState = (group: FilterPanelGroup, selectedValues: string[]): 'none' | 'some' | 'all' => {
  if (group.items.length === 0) return 'none'
  let selectedCount = 0
  for (const item of group.items) {
    if (selectedValues.includes(item.value)) selectedCount += 1
  }
  if (selectedCount === 0) return 'none'
  if (selectedCount === group.items.length) return 'all'
  return 'some'
}

export const getAllCheckState = (
  groups: FilterPanelGroup[],
  selected: Record<string, string[]>,
): 'none' | 'some' | 'all' => {
  let total = 0
  let selectedTotal = 0
  for (const g of groups) {
    total += g.items.length
    const sel = selected[g.id]
    if (!sel) continue
    for (const item of g.items) {
      if (sel.includes(item.value)) selectedTotal += 1
    }
  }
  if (total === 0 || selectedTotal === 0) return 'none'
  if (selectedTotal === total) return 'all'
  return 'some'
}

export const filterGroups = (groups: FilterPanelGroup[], searchTerm: string): FilterPanelGroup[] => {
  const term = searchTerm.trim().toLowerCase()
  if (!term) return groups
  const out: FilterPanelGroup[] = []
  for (const g of groups) {
    if (g.label.toLowerCase().includes(term)) {
      out.push(g)
      continue
    }
    const matched = g.items.filter((i) => i.label.toLowerCase().includes(term))
    if (matched.length > 0) out.push({ ...g, items: matched })
  }
  return out
}

export const formatCount = (count: number | undefined): string | null => {
  if (count === undefined || count === null) return null
  return count.toLocaleString()
}
