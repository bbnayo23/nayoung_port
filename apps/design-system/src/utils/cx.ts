/**
 * 조건부 클래스네임 결합기. variant/size/state 클래스를 합칠 때 사용한다.
 *
 * @example
 * cx(root, variants[variant], sizes[size], isDisabled && stateDisabled)
 */
export type ClassValue = string | false | null | undefined

export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
