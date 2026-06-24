import { forwardRef, useState } from 'react'
import { ExdChevronDownIcon } from '@port/icon-library'
import type { CollapseProps } from './Collapse.types'
import { collapseRoot, collapseHeader, collapseChevron, collapseBody, collapseInner } from './Collapse.css'
import cn from 'classnames'

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  (
    { header, children, variant = 'card', defaultOpen = false, open: controlledOpen, onOpenChange, className, style },
    ref,
  ) => {
    const isControlled = controlledOpen !== undefined
    const [internal, setInternal] = useState(defaultOpen)
    const open = isControlled ? controlledOpen : internal

    const toggle = () => {
      const next = !open
      if (!isControlled) setInternal(next)
      onOpenChange?.(next)
    }

    return (
      <div ref={ref} className={cn(collapseRoot, `variant-${variant}`, open && 'is-open', className)} style={style}>
        {header !== undefined && (
          <button type="button" className={collapseHeader} aria-expanded={open} onClick={toggle}>
            <span className={cn(collapseChevron, open && 'is-open')}>
              <ExdChevronDownIcon size={12} />
            </span>
            {header}
          </button>
        )}
        <div className={cn(collapseBody, open && 'is-open')}>
          <div className={collapseInner}>{children}</div>
        </div>
      </div>
    )
  },
)

Collapse.displayName = 'Collapse'
