import { useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../../utils'
import * as styles from './Checkbox.css'
import type { CheckboxSize } from './Checkbox.css'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checkboxSize?: CheckboxSize
  label?: ReactNode
  error?: boolean
  indeterminate?: boolean
  className?: string
}

export const Checkbox = ({
  checkboxSize = 'md',
  label,
  error,
  disabled,
  indeterminate,
  className,
  ...rest
}: CheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate ?? false
  }, [indeterminate])

  return (
    <label className={cx(styles.wrapper, disabled && styles.wrapperDisabled, className)}>
      <input
        ref={ref}
        type="checkbox"
        className={cx(styles.inputSize[checkboxSize], error && styles.inputError)}
        disabled={disabled}
        {...rest}
      />
      {label !== null && label !== undefined && <span className={styles.label}>{label}</span>}
    </label>
  )
}
