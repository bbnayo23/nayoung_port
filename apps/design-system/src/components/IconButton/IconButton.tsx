import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cx } from '../../utils/cx'
import * as styles from './IconButton.css'
import type { IconButtonVariant, IconButtonSize } from './IconButton.css'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 시각적 강조 단계 */
  variant?: IconButtonVariant
  /** 크기 */
  size?: IconButtonSize
  /** 접근성을 위한 필수 레이블 */
  'aria-label': string
}

/**
 * 아이콘 전용 정사각형 버튼.
 *
 * Variant(default·primary·danger·ghost) + size(sm·md) 설계.
 * 접근성을 위해 aria-label 이 필수다.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { variant = 'default', size = 'md', className, children, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className={cx(styles.base, styles.variant[variant], styles.size[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  },
)
