import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { cx } from '../../utils/cx'
import * as styles from './Input.css'
import type { InputSize, InputVariant } from './Input.css'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 시각적 스타일 (outline·filled) */
  variant?: InputVariant
  /** 크기 (sm·md·lg) */
  size?: InputSize
  /** 필드 위에 노출되는 라벨 */
  label?: ReactNode
  /** 필드 아래 보조 설명 */
  helperText?: ReactNode
  /** 에러 메시지 — 존재하면 invalid 처럼 동작하며 helperText 보다 우선한다 */
  errorText?: ReactNode
  /** 에러(유효성 실패) 상태 강제 지정 */
  invalid?: boolean
  /** input 앞(왼쪽) 슬롯 — 아이콘 등 */
  leftSlot?: ReactNode
  /** input 뒤(오른쪽) 슬롯 — 아이콘 등 */
  rightSlot?: ReactNode
  /** 부모 폭을 가득 채움 */
  fullWidth?: boolean
}

/**
 * 텍스트 입력 필드.
 *
 * variant(outline·filled) + size(sm·md·lg) 설계이며 leftSlot / rightSlot 으로
 * 필드 내부 좌·우에 아이콘 등 임의 노드를 배치할 수 있다.
 *
 * a11y: `label` 은 `htmlFor` 로 `<input>` 과 연결되고, id 가 없으면 `useId()` 로 생성한다.
 * 에러(`invalid` 또는 `errorText`) 시 `aria-invalid` 를 설정하고, 메시지 요소에
 * `aria-describedby` 를 연결해 스크린리더가 보조 설명/에러를 읽도록 한다.
 * 포커스 링은 컨테이너의 `:focus-within` 에서 `vars.shadow.focus` 로 표현한다.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    variant = 'outline',
    size = 'md',
    label,
    helperText,
    errorText,
    invalid = false,
    leftSlot,
    rightSlot,
    fullWidth = false,
    disabled,
    className,
    id,
    ...rest
  },
  ref,
) {
  const reactId = useId()
  const inputId = id ?? reactId
  const messageId = `${inputId}-message`

  const hasError = invalid || errorText != null
  const message = hasError && errorText != null ? errorText : helperText
  const hasMessage = message != null

  return (
    <div className={cx(styles.root, fullWidth && styles.fullWidth, className)}>
      {label != null && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div
        className={cx(
          styles.field,
          styles.variants[variant],
          styles.sizes[size],
          hasError && styles.invalid,
          disabled && styles.disabled,
        )}
      >
        {leftSlot != null && (
          <span className={styles.slot} aria-hidden="true">
            {leftSlot}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={styles.control}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={hasMessage ? messageId : undefined}
          {...rest}
        />
        {rightSlot != null && (
          <span className={styles.slot} aria-hidden="true">
            {rightSlot}
          </span>
        )}
      </div>
      {hasMessage && (
        <span
          id={messageId}
          className={cx(styles.message, hasError && errorText != null && styles.errorMessage)}
        >
          {message}
        </span>
      )}
    </div>
  )
})
