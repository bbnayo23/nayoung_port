import type { InputHTMLAttributes } from 'react'
import { cx } from '../../utils/cx'
import * as styles from './RelativeTimeInput.css'

export interface RelativeTimeInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  /** false 일 때 invalid 스타일 적용 */
  isValid?: boolean
  placeholder?: string
  className?: string
}

/**
 * 상대 시간 문자열(예: "1h", "30m")을 입력받는 작은 텍스트 필드.
 *
 * isValid prop 이 false 이면 error 테두리를 표시한다.
 * maxLength=6 으로 고정되어 있다.
 */
export const RelativeTimeInput = ({
  value,
  onChange,
  onBlur,
  isValid,
  placeholder,
  className,
  ...rest
}: RelativeTimeInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <input
      type="text"
      value={value ?? ''}
      onChange={handleChange}
      onBlur={onBlur}
      maxLength={6}
      placeholder={placeholder}
      className={cx(styles.input, isValid === false && styles.invalid, className)}
      {...rest}
    />
  )
}
