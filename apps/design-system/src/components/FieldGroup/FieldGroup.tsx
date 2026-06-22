import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import * as styles from './FieldGroup.css'
import type { FieldGroupSize } from './FieldGroup.css'

export type { FieldGroupSize }

export interface FieldGroupProps {
  label: ReactNode
  children: ReactNode
  size?: FieldGroupSize
  className?: string
}

export const FieldGroup = ({ label, children, size = 'md', className }: FieldGroupProps) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={cx(styles.label, styles.labelSize[size])}>{label}</div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
