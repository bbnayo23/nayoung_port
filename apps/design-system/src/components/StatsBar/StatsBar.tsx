import { forwardRef, useState, type MouseEvent } from 'react'
import { Popover } from '@dc/components/Popover'
import { statsBar, statItem, statItemActive, statItemTotal, statCountVariant, statLabel } from './StatsBar.css'
import type { StatsBarProps, StatItemProps, StatCountProps, StatLabelProps } from './StatsBar.types'
import cn from 'classnames'

const StatsBar = forwardRef<HTMLDivElement, StatsBarProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn(statsBar, className)} {...props}>
    {children}
  </div>
))
StatsBar.displayName = 'StatsBar'

const StatItem = forwardRef<HTMLDivElement, StatItemProps>(
  ({ $isTotal, $active, popoverContent, className, onMouseEnter, onMouseLeave, children, ...props }, ref) => {
    const [popoverVisible, setPopoverVisible] = useState(false)

    const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
      if (popoverContent) setPopoverVisible(true)
      onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
      if (popoverContent) setPopoverVisible(false)
      onMouseLeave?.(e)
    }

    const el = (
      <div
        ref={ref}
        className={cn(statItem, $isTotal && statItemTotal, $active && statItemActive, className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    )

    if (!popoverContent) return el

    return (
      <Popover
        placement="bottom"
        arrow
        visible={popoverVisible}
        onVisibleChange={setPopoverVisible}
        content={popoverContent}
      >
        {el}
      </Popover>
    )
  },
)
StatItem.displayName = 'StatItem'

const StatCount = forwardRef<HTMLSpanElement, StatCountProps>(({ $isTotal, className, children, ...props }, ref) => (
  <span ref={ref} className={cn($isTotal ? statCountVariant.total : statCountVariant.normal, className)} {...props}>
    {children}
  </span>
))
StatCount.displayName = 'StatCount'

const StatLabel = forwardRef<HTMLSpanElement, StatLabelProps>(({ className, children, ...props }, ref) => (
  <span ref={ref} className={cn(statLabel, 'stat-label-text', className)} {...props}>
    {children}
  </span>
))
StatLabel.displayName = 'StatLabel'

export { StatsBar, StatItem, StatCount, StatLabel }
export default StatsBar
