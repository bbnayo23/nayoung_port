import type { InputHTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils'
import * as styles from './Switch.css'
import type { SwitchSize } from './Switch.css'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 스위치 크기 */
  switchSize?: SwitchSize
  /** 우측 라벨 텍스트 또는 노드 */
  label?: ReactNode
  className?: string
}

export const Switch = ({ switchSize = 'md', label, disabled, className, ...rest }: SwitchProps) => {
  return (
    <label className={cx(styles.wrapper, disabled && styles.wrapperDisabled, className)}>
      <input type="checkbox" role="switch" className={styles.hiddenInput} disabled={disabled} {...rest} />
      <span className={styles.trackSize[switchSize]}>
        <span className={styles.thumbSize[switchSize]} />
      </span>
      {label !== null && label !== undefined && <span className={styles.label}>{label}</span>}
    </label>
  )
}
