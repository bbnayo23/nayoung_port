import { forwardRef } from 'react'
import { radio } from './Radio.css'
import type { RadioProps } from './Radio.types'
import cn from 'classnames'

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      name,
      disabled,
      onChange,
      label,
      checked,
      className,
      style,
      size = 'md',
      variant = 'default',
      id,
      ...rest
    },
    ref,
  ) => {
    const radioId = id ?? `radio-${name}-${value}`

    return (
      <label
        className={cn(
          radio,
          'radio-wrapper',
          `radio-${size}`,
          variant !== 'default' && `radio-${variant}`,
          disabled && 'radio-disabled',
          className,
        )}
        style={style}
        htmlFor={radioId}
      >
        <input
          ref={ref}
          id={radioId}
          className="radio-input"
          type="radio"
          value={value}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...rest}
        />
        {label && <span className="radio-label">{label}</span>}
      </label>
    )
  },
)

Radio.displayName = 'Radio'

export default Radio
