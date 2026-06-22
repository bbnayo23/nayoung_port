import type { ReactNode } from 'react'
import { cx } from '../../utils'
import * as styles from './SearchStatus.css'
import type { LoadableState } from './SearchStatus.css'

export interface SearchStatusProps {
  state: LoadableState
  children?: ReactNode
  className?: string
}

export const SearchStatus = ({ state, children, className }: SearchStatusProps) => {
  if (state === 'loading') {
    return (
      <span className={cx(styles.wrapper, className)} aria-busy="true">
        <span className={styles.spinner} aria-hidden="true" />
      </span>
    )
  }

  if (state === 'hasError') {
    return <span className={cx(styles.wrapper, styles.error, className)}>-</span>
  }

  return <span className={cx(styles.wrapper, className)}>{children}</span>
}
