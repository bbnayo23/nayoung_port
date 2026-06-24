import { dividerRecipe } from './Divider.css'
import type { DividerProps } from './Divider.types'
import cn from 'classnames'

const Divider = ({
  color,
  margin = 0,
  opacity,
  size,
  direction = 'horizontal',
  className,
  style,
  ...props
}: DividerProps) => {
  const dynamicStyle: React.CSSProperties = {
    ...style,
    margin: margin ? `${margin}px` : undefined,
    opacity,
    ...(direction === 'horizontal' && {
      borderTopColor: color || undefined,
      borderTopWidth: size ? `${size}px` : undefined,
    }),
    ...(direction === 'vertical' && {
      borderLeftColor: color || undefined,
      borderLeftWidth: size ? `${size}px` : undefined,
    }),
  }

  return <hr role="separator" className={cn(dividerRecipe({ direction }), className)} style={dynamicStyle} {...props} />
}

export default Divider
