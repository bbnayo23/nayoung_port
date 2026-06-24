import { forwardRef } from 'react'
import cn from 'classnames'
import { iconButtonRecipe } from './IconButton.css'
import type { IconButtonProps } from './IconButton.types'

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = 'md', variant, icon, children, className, ...props }, ref) => (
    <button ref={ref} className={cn(iconButtonRecipe({ size, variant }), className)} {...props}>
      {icon ?? children}
    </button>
  ),
)

IconButton.displayName = 'IconButton'

export default IconButton
