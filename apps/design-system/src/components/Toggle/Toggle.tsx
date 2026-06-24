import { forwardRef, useState } from 'react'
import type { ToggleProps } from './Toggle.types'
import { track, thumb, innerText, toggleWrapper, toggleLabel } from './Toggle.css'
import cn from 'classnames'

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      size = 'md',
      disabled = false,
      label,
      innerLabel = false,
      className,
      style,
    },
    ref,
  ) => {
    const isControlled = controlledChecked !== undefined
    const [internal, setInternal] = useState(defaultChecked)
    const checked = isControlled ? controlledChecked : internal

    const handleClick = () => {
      if (disabled) return
      const next = !checked
      if (!isControlled) setInternal(next)
      onChange?.(next)
    }

    return (
      <div className={cn(toggleWrapper, className)} style={style}>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={handleClick}
          className={cn(track, `toggle-${size}`, {
            'is-on': checked,
            'is-disabled': disabled,
            'has-inner-label': innerLabel,
          })}
        >
          {innerLabel && <span className={cn(innerText, 'inner-on')}>ON</span>}
          <span className={thumb} />
          {innerLabel && <span className={cn(innerText, 'inner-off')}>OFF</span>}
        </button>
        {label && <span className={toggleLabel}>{label}</span>}
      </div>
    )
  },
)

Toggle.displayName = 'Toggle'
