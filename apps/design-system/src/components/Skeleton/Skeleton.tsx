import type { CSSProperties } from 'react'
import { vars } from '@dc/theme/contract.css'
import { skeleton } from './Skeleton.css'
import type { SkeletonProps } from './Skeleton.types'
import cn from 'classnames'

const pixelHelper = (value: string | number) => (typeof value === 'number' ? `${value}px` : value)

const BORDER_RADIUS: Record<NonNullable<SkeletonProps['variant']>, string> = {
  rectangular: '0',
  rounded: vars.radius.md,
  circle: '50%',
}

const Skeleton = ({
  variant = 'rounded',
  width = '100%',
  height = '8px',
  className,
  style,
  ...rest
}: SkeletonProps) => {
  const dynamicStyle: CSSProperties = {
    ...style,
    width: pixelHelper(width),
    height: pixelHelper(height),
    borderRadius: BORDER_RADIUS[variant],
  }

  return <div className={cn(skeleton, 'skeleton', className)} style={dynamicStyle} {...rest} />
}

export default Skeleton
