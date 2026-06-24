export const RELATIVE_TIME_REGEX = /^([+-])(\d{1,4})([mhd])$/

export const isValidRelativeTime = (value: string): boolean => {
  const trimmed = value.trim()
  if (trimmed.length > 6) return false
  return RELATIVE_TIME_REGEX.test(trimmed)
}

const UNIT_MS: Record<'m' | 'h' | 'd', number> = {
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
}

export const parseRelativeTime = (value: string, relativeTo: Date = new Date()): Date | null => {
  const match = value.trim().match(RELATIVE_TIME_REGEX)
  if (!match) return null
  const [, sign, numStr, unit] = match
  const amount = Number(numStr) * (sign === '-' ? -1 : 1)
  return new Date(relativeTo.getTime() + amount * UNIT_MS[unit as 'm' | 'h' | 'd'])
}
