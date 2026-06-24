import { forwardRef } from 'react'
import type { ButtonGroupItemProps, ButtonGroupProps } from './ButtonGroup.types'
import { styledButtonGroupWrapper, styledButtonGroupItem } from './ButtonGroup.css'
import cn from 'classnames'

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, className, style, variant = 'primary', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styledButtonGroupWrapper, 'button-group', className, `button-group-${variant}`)}
        style={style}
        {...props}
      >
        {children}
        {variant === 'primary' && <div className="slider-background" />}
      </div>
    )
  },
)

const ButtonGroupItem = ({ children, onClick, disabled, active, className, style, ...props }: ButtonGroupItemProps) => {
  return (
    <button
      className={cn(styledButtonGroupItem, 'button-group-item', className, active && 'is-active')}
      onClick={onClick}
      disabled={disabled}
      style={style}
      {...props}
    >
      {children}
    </button>
  )
}

ButtonGroup.displayName = 'ButtonGroup'
ButtonGroupItem.displayName = 'ButtonGroup.Item'

const ButtonGroupWithItem = Object.assign(ButtonGroup, { Item: ButtonGroupItem })

export default ButtonGroupWithItem
