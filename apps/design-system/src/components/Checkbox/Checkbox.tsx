import { forwardRef } from 'react'
import { ExdCheckIcon } from '@port/icon-library'
import { checkbox } from './Checkbox.css'
import type { CheckboxInterface } from './Checkbox.types'
import cn from 'classnames'

const Checkbox = forwardRef<HTMLInputElement, CheckboxInterface>(function Checkbox(props, ref) {
  const {
    checked = false,
    disabled = false,
    indeterminate = false,
    onChange = () => false,
    className,
    id,
    label,
    labelDirection = 'right',
    color,
    size,
    error = false,
    ...rest
  } = props

  return (
    <label
      className={cn(
        checkbox,
        'checkbox-wrapper',
        !!label && `label-${labelDirection}`,
        checked && 'checked',
        disabled && 'disabled',
        indeterminate && 'indeterminate',
        color,
        size && `size-${size}`,
        error && 'error',
        className,
      )}
      htmlFor={id}
    >
      {label && labelDirection === 'left' && <span className="checkbox-label">{label}</span>}
      <input
        type="checkbox"
        className="checkbox-input"
        id={id}
        checked={checked}
        disabled={disabled}
        ref={ref}
        onChange={onChange}
        aria-checked={indeterminate ? 'mixed' : checked}
        {...rest}
      />
      <span className={cn('custom-checkbox', disabled && 'disabled')}>
        <ExdCheckIcon className="checkbox-icon" />
        <span className="checkbox-indeterminate" />
      </span>
      {label && labelDirection === 'right' && <span className="checkbox-label">{label}</span>}
    </label>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
