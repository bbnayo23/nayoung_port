import type { FilterGroup } from './Filter.types'

export const getGroupCheckState = (group: FilterGroup, selectedValues: string[]): 'none' | 'some' | 'all' => {
  if (group.items.length === 0) return 'none'
  const count = group.items.filter((i) => selectedValues.includes(i.value)).length
  if (count === 0) return 'none'
  if (count === group.items.length) return 'all'
  return 'some'
}

export const getAllCheckState = (
  groups: FilterGroup[],
  selected: Record<string, string[]>,
): 'none' | 'some' | 'all' => {
  let total = 0
  let selectedTotal = 0
  for (const g of groups) {
    total += g.items.length
    const sel = selected[g.id]
    if (sel) selectedTotal += g.items.filter((i) => sel.includes(i.value)).length
  }
  if (total === 0 || selectedTotal === 0) return 'none'
  if (selectedTotal === total) return 'all'
  return 'some'
}

export const filterGroups = (groups: FilterGroup[], searchTerm: string): FilterGroup[] => {
  const term = searchTerm.trim().toLowerCase()
  if (!term) return groups
  const out: FilterGroup[] = []
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
