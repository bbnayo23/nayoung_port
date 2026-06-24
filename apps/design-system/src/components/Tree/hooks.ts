import { useState } from 'react'

export const useTree = (controlledIds?: string[], onExpandChange?: (ids: string[]) => void) => {
  const [localIds, setLocalIds] = useState<string[]>([])

  const isControlled = controlledIds !== undefined
  const ids = isControlled ? controlledIds : localIds

  const isExpanded = (id: string) => ids.includes(id)

  const toggle = (id: string) => {
    const next = isExpanded(id) ? ids.filter((x) => x !== id) : [...ids, id]
    if (!isControlled) setLocalIds(next)
    onExpandChange?.(next)
  }

  return { isExpanded, toggle }
}
