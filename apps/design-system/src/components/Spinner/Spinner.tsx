import { forwardRef } from 'react'
import type { SpinnerProps } from './Spinner.types'
import {
  spinnerColorVar,
  spinnerWrapperRecipe,
  spinnerRecipe,
  spinnerBounce,
  spinnerBounceSm,
  spinnerBounceLg,
  spinnerFadeinout,
  spinnerFadeinoutSm,
  spinnerFadeinoutLg,
} from './Spinner.css'
import type { CSSProperties } from 'react'
import cn from 'classnames'

const defaultVariantMap: Record<string, string> = {
  default: 'solid',
  dots: 'fadeinout',
  outline: 'outline',
}

const bounceClassMap: Record<string, string> = {
  sm: spinnerBounceSm,
  md: spinnerBounce,
  lg: spinnerBounceLg,
}

const fadeinoutClassMap: Record<string, string> = {
  sm: spinnerFadeinoutSm,
  md: spinnerFadeinout,
  lg: spinnerFadeinoutLg,
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(function Spinner(
  { className, color, type = 'default', variant, overlay = false, size = 'md', ...props },
  ref,
) {
  const resolvedVariant = variant || defaultVariantMap[type] || 'solid'

  const isBounce = resolvedVariant === 'bounce'
  const isFadeinout = resolvedVariant === 'fadeinout'

  const spinnerClass = (() => {
    if (isBounce) return bounceClassMap[size] ?? spinnerBounce
    if (isFadeinout) return fadeinoutClassMap[size] ?? spinnerFadeinout
    return spinnerRecipe({
      type: type as 'default' | 'dots' | 'outline',
      variant: resolvedVariant as 'solid' | 'round' | 'circle' | 'outline' | 'flow',
      size: size as 'sm' | 'md' | 'lg',
    })
  })()

  const rawColorVar = (spinnerColorVar as string).replace(/^var\((.+)\)$/, '$1')
  const inlineVars = color ? ({ [rawColorVar]: color } as CSSProperties) : undefined

  return (
    <div className={cn(spinnerWrapperRecipe({ overlay }), className)}>
      <div className={spinnerClass} style={inlineVars} ref={ref} {...props} />
    </div>
  )
})

export default Spinner
