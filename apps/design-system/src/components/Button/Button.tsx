import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../../utils/cx'
import * as styles from './Button.css'
import type { ButtonSize, ButtonVariant } from './Button.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 시각적 강조 단계 */
  variant?: ButtonVariant
  /** 크기 */
  size?: ButtonSize
  /** 부모 폭을 가득 채움 */
  fullWidth?: boolean
  /** 로딩 스피너 표시 + 비활성화 */
  loading?: boolean
  /** 라벨 앞 아이콘 슬롯 */
  leftIcon?: ReactNode
  /** 라벨 뒤 아이콘 슬롯 */
  rightIcon?: ReactNode
}

/**
 * 기본 액션 버튼.
 *
 * Variant 기반(primary·secondary·outline·ghost·danger) + size(sm·md·lg) 설계.
 * leftIcon / rightIcon 은 Slot 패턴으로 임의의 노드를 받는다.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    disabled,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cx(
        styles.root,
        styles.variants[variant],
        styles.sizes[size],
        fullWidth && styles.fullWidth,
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span
        className={cx(loading && styles.hiddenLabel)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 'inherit' }}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </span>
    </button>
  )
})
