import { forwardRef } from 'react'
import { badgeRecipe, dotMarker, badgeCloseBtn, badgeIconSvg, statusScoreInner } from './Badge.css'
import type { BadgeProps } from './Badge.types'
import cn from 'classnames'

const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const {
    className,
    children,
    variant,
    color,
    style,
    size = 'md',
    closable,
    onRemove,
    backgroundColor,
    borderColor,
    textColor,
    ...restProps
  } = props

  const recipeVariant = variant as NonNullable<Parameters<typeof badgeRecipe>[0]>['variant']
  const recipeColor = color as NonNullable<Parameters<typeof badgeRecipe>[0]>['color']
  const recipeSize = size as NonNullable<Parameters<typeof badgeRecipe>[0]>['size']

  const isDot = variant === 'dot' || variant === 'dot-outline'
  const isStatusScore = variant === 'status-score'
  const isIcon = variant === 'icon'
  const showClose = closable || !!onRemove

  const mergedStyle =
    backgroundColor || borderColor || textColor || style
      ? {
          ...style,
          ...(backgroundColor && { backgroundColor }),
          ...(borderColor && { borderColor }),
          ...(textColor && { color: textColor }),
        }
      : style

  return (
    <span
      ref={ref}
      className={cn(
        badgeRecipe({ variant: recipeVariant, color: recipeColor, size: recipeSize }),
        isDot && dotMarker,
        isStatusScore && statusScoreInner,
        isIcon && badgeIconSvg,
        showClose && 'badge-closable',
        className,
      )}
      style={mergedStyle}
      {...restProps}
    >
      {children}
      {showClose && (
        <span
          className={badgeCloseBtn}
          role="button"
          tabIndex={0}
          aria-label="remove"
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation()
              onRemove?.()
            }
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
            <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      )}
    </span>
  )
})

Badge.displayName = 'Badge'

export default Badge
