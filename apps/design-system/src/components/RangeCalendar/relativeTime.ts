/**
 * RangeCalendar의 상대시간 표현식 포맷 (UI 계층 정의).
 * 부호 필수, 1~4자리 숫자, 단위 m(분)/h(시간)/d(일).
 * 예: "-1h", "+30m", "-7d"
 */
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

/** 상대시간 표현식을 `relativeTo` 기준 Date로 변환. 포맷 불일치 시 null. */
export const parseRelativeTime = (value: string, relativeTo: Date = new Date()): Date | null => {
  const match = value.trim().match(RELATIVE_TIME_REGEX)
  if (!match) return null
  const [, sign, numStr, unit] = match
  const amount = Number(numStr) * (sign === '-' ? -1 : 1)
  return new Date(relativeTo.getTime() + amount * UNIT_MS[unit as 'm' | 'h' | 'd'])
}
