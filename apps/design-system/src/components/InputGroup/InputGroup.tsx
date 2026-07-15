import { forwardRef, type PropsWithChildren } from 'react'
import type {
  InputGroupButtonProps,
  InputGroupHelperTextProps,
  InputGroupIconProps,
  InputGroupInputProps,
  InputGroupLabelProps,
  InputGroupProps,
  InputGroupTextProps,
} from './InputGroup.types'
import { InputGroupContext, useResolvedSize } from './InputGroupContext'
import {
  styledInputGroup,
  styledInputGroupButton,
  styledInputGroupFormField,
  styledInputGroupHelperText,
  styledInputGroupIcon,
  styledInputGroupInput,
  styledInputGroupLabel,
  styledInputGroupText,
} from './InputGroup.css'
import { Button } from '@dc/components/Button'
import cn from 'classnames'

const InputGroup = forwardRef<HTMLDivElement, PropsWithChildren<InputGroupProps>>((props, ref) => {
  const { children, size = 'md', variant = 'default', fullWidth = false, label, className, ...restProps } = props
  const mergedClassName = cn(
    'input-group',
    `input-group-${size}`,
    variant !== 'default' && `variant-${variant}`,
    fullWidth && 'full-width',
    className,
  )
  return (
    <InputGroupContext.Provider value={size}>
      <div ref={ref} className={cn(styledInputGroup, mergedClassName)} {...restProps}>
        {label !== undefined && <InputGroupLabel>{label}</InputGroupLabel>}
        {children}
      </div>
    </InputGroupContext.Provider>
  )
})

InputGroup.displayName = 'InputGroup'

export const InputGroupInput = forwardRef<HTMLInputElement, InputGroupInputProps>((props, ref) => {
  const { size: _size, className, style, ...restProps } = props
  return (
    <div className={cn(styledInputGroupInput, 'input-group-input', className)} style={style}>
      <input ref={ref} {...restProps} />
    </div>
  )
})

InputGroupInput.displayName = 'InputGroup.Input'

export const InputGroupButton = forwardRef<HTMLButtonElement, PropsWithChildren<InputGroupButtonProps>>(
  (props, ref) => {
    const { children, size, variant = 'secondary', className, ...restProps } = props
    return (
      <div className={cn(styledInputGroupButton, 'input-group-button', className)}>
        <Button ref={ref} size={useResolvedSize(size)} variant={variant} {...restProps}>
          {children}
        </Button>
      </div>
    )
  },
)

InputGroupButton.displayName = 'InputGroup.Button'

export const InputGroupText = forwardRef<HTMLSpanElement, PropsWithChildren<InputGroupTextProps>>((props, ref) => {
  const { children, size: _size, className, ...restProps } = props
  return (
    <span ref={ref} className={cn(styledInputGroupText, 'input-group-text', className)} {...restProps}>
      {children}
    </span>
  )
})

InputGroupText.displayName = 'InputGroup.Text'

export const InputGroupIcon = forwardRef<HTMLSpanElement, PropsWithChildren<InputGroupIconProps>>((props, ref) => {
  const { children, position: _position, size: _size, className, ...restProps } = props
  return (
    <span
      ref={ref}
      className={cn(styledInputGroupIcon, 'input-group-icon', className)}
      aria-hidden="true"
      {...restProps}
    >
      {children}
    </span>
  )
})

InputGroupIcon.displayName = 'InputGroup.Icon'

export const InputGroupHelperText = forwardRef<HTMLDivElement, PropsWithChildren<InputGroupHelperTextProps>>(
  (props, ref) => {
    const { children, variant = 'default', className, ...restProps } = props
    return (
      <div
        ref={ref}
        className={cn(
          styledInputGroupHelperText,
          'input-group-helper-text',
          variant !== 'default' && `variant-${variant}`,
          className,
        )}
        {...restProps}
      >
        {children}
      </div>
    )
  },
)

InputGroupHelperText.displayName = 'InputGroup.HelperText'

export const InputGroupLabel = forwardRef<HTMLLabelElement, PropsWithChildren<InputGroupLabelProps>>((props, ref) => {
  const { children, required, className, ...restProps } = props
  return (
    <label ref={ref} className={cn(styledInputGroupLabel, 'input-group-label', className)} {...restProps}>
      {children}
      {required && <span className="required-mark">*</span>}
    </label>
  )
})

InputGroupLabel.displayName = 'InputGroup.Label'

export const InputGroupFormField = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    direction?: 'vertical' | 'horizontal'
    fullWidth?: boolean
    className?: string
  }>
>((props, ref) => {
  const { children, direction = 'vertical', fullWidth = false, className, ...restProps } = props
  return (
    <div
      ref={ref}
      className={cn(
        styledInputGroupFormField,
        'input-group-form-field',
        direction === 'horizontal' && 'form-field-horizontal',
        fullWidth && 'form-field-full-width',
        className,
      )}
      {...restProps}
    >
      {children}
    </div>
  )
})

InputGroupFormField.displayName = 'InputGroup.FormField'

const InputGroupWithSubComponents = InputGroup as typeof InputGroup & {
  Input: typeof InputGroupInput
  Button: typeof InputGroupButton
  Text: typeof InputGroupText
  Icon: typeof InputGroupIcon
  HelperText: typeof InputGroupHelperText
  Label: typeof InputGroupLabel
  FormField: typeof InputGroupFormField
}

InputGroupWithSubComponents.Input = InputGroupInput
InputGroupWithSubComponents.Button = InputGroupButton
InputGroupWithSubComponents.Text = InputGroupText
InputGroupWithSubComponents.Icon = InputGroupIcon
InputGroupWithSubComponents.HelperText = InputGroupHelperText
InputGroupWithSubComponents.Label = InputGroupLabel
InputGroupWithSubComponents.FormField = InputGroupFormField

export default InputGroupWithSubComponents
