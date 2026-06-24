import { forwardRef } from 'react'
import { XdrCloseIcon } from '@port/icon-library'
import {
  inputRecipe,
  helperTextRecipe,
  inputWrapper,
  inputFieldArea,
  clearButton,
  suffixIconWrapper,
  prefixIconWrapper,
} from './Input.css'
import type { InputInterface } from './Input.types'
import cn from 'classnames'

const Input = forwardRef<HTMLInputElement, InputInterface>(
  (
    {
      fullWidth = true,
      variant = 'default',
      size = 'md',
      inputSize,
      prefixIcon,
      suffixIcon,
      showClearButton,
      onClear,
      helperText: helperTextContent,
      className,
      style,
      ...restProps
    },
    ref,
  ) => {
    const hasSuffixIcon = !!suffixIcon
    const effectiveShowClearButton = !hasSuffixIcon && showClearButton

    return (
      <div
        className={cn(
          inputWrapper,
          'input-wrapper',
          className,
          fullWidth && 'full-width',
          !!prefixIcon && 'has-prefix-icon',
          hasSuffixIcon && 'has-suffix-icon',
          effectiveShowClearButton && 'has-clear-button',
        )}
        style={style}
      >
        <div className={cn(inputFieldArea, 'input-field-area')}>
          {prefixIcon && <div className={cn(prefixIconWrapper, 'prefix-icon-wrapper')}>{prefixIcon}</div>}
          <input
            ref={ref}
            className={cn(
              inputRecipe({ variant, size: inputSize ?? size }),
              fullWidth && 'full-width',
              !!restProps.disabled && 'disabled',
              !!prefixIcon && 'with-prefix-icon',
              hasSuffixIcon && 'with-suffix-icon',
              effectiveShowClearButton && 'clearable',
            )}
            {...restProps}
          />
          {suffixIcon && <div className={cn(suffixIconWrapper, 'suffix-icon-wrapper')}>{suffixIcon}</div>}
          {effectiveShowClearButton && (
            <button
              type="button"
              className={cn(clearButton, 'clear-button')}
              onClick={onClear}
              aria-label="Clear input"
              tabIndex={-1}
            >
              <XdrCloseIcon size={14} />
            </button>
          )}
        </div>
        {helperTextContent && (
          <div className={helperTextRecipe({ variant: variant === 'ghost' ? 'default' : variant })}>
            {helperTextContent}
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
