import type { ReactNode } from 'react'
import { cx } from '../../utils'
import * as styles from './FormField.css'
import type { FormFieldDirection } from './FormField.css'

export type { FormFieldDirection }

export interface FormFieldProps {
  label?: ReactNode
  required?: boolean
  error?: string
  helpText?: string
  children: ReactNode
  /** 레이블과 입력 필드의 배치 방향 */
  direction?: FormFieldDirection
  /** 수평 방향일 때 레이블 너비(px) */
  labelWidth?: number
  className?: string
  labelClassName?: string
  htmlFor?: string
}

/**
 * 폼 레이아웃 래퍼 컴포넌트.
 *
 * 레이블, 필수 표시, 에러 메시지, 도움말 텍스트를 통합 관리한다.
 * direction="horizontal"(기본) 또는 "vertical" 로 배치를 선택할 수 있다.
 */
export const FormField = ({
  label,
  required,
  error,
  helpText,
  children,
  direction = 'horizontal',
  labelWidth = 140,
  className,
  labelClassName,
  htmlFor,
}: FormFieldProps) => {
  const isHorizontal = direction === 'horizontal'
  const baseLabel = isHorizontal ? styles.label : styles.labelVertical

  return (
    <div className={cx(isHorizontal ? styles.horizontal : styles.vertical, className)}>
      {label && (
        <label
          className={cx(baseLabel, labelClassName)}
          htmlFor={htmlFor}
          style={isHorizontal ? { width: labelWidth, minWidth: labelWidth } : undefined}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.content}>
        {children}
        {error && <p className={styles.error}>{error}</p>}
        {helpText && !error && <p className={styles.helpText}>{helpText}</p>}
      </div>
    </div>
  )
}
