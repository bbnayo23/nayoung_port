import { forwardRef } from 'react'
import cn from 'classnames'
import type { ButtonProps } from './Button.types'
import { buttonRecipe, spinner, iconSlot } from './Button.css'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = cn(
      buttonRecipe({ variant, size, fullWidth: fullWidth || undefined }),
      loading && 'is-loading',
      className,
    )

    return (
      <button ref={ref} type={type} disabled={disabled || loading} className={classes} {...rest}>
        {loading ? (
          <span className={spinner} aria-hidden="true" />
        ) : (
          <>
            {leftIcon && (
              <span className={iconSlot} aria-hidden="true">
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span className={iconSlot} aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
