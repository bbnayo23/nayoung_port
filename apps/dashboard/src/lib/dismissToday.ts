/**
 * "오늘 하루 보지 않기" — 지정 키를 오늘 날짜로 localStorage 에 기록하고,
 * 같은 날 안에서는 다시 노출되지 않도록 판별한다. (날짜가 바뀌면 자동 만료)
 */

/** 로컬 타임존 기준 오늘 날짜 문자열 (YYYY-MM-DD) */
const today = (): string => {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

/** 해당 키가 오늘 날짜로 "보지 않기" 처리되어 있는지 여부 */
export const isDismissedToday = (key: string): boolean => {
  try {
    return localStorage.getItem(key) === today()
  } catch {
    return false
  }
}

/** 해당 키를 오늘 하루 "보지 않기" 로 기록 */
export const dismissForToday = (key: string): void => {
  try {
    localStorage.setItem(key, today())
  } catch {
    /* localStorage 접근 불가 환경(프라이빗 모드 등)에서는 무시 */
  }
}
