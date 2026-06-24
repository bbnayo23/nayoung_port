import { forwardRef, useState, Children, isValidElement } from 'react'
import type { ReactNode } from 'react'
import { breadcrumbsNav, breadcrumbsWrapper, breadcrumbsEllipsis } from './Breadcrumbs.css'
import type { BreadcrumbsProps } from './Breadcrumbs.types'
import cn from 'classnames'

const itemKey = (child: ReactNode) => (isValidElement(child) ? child.key : String(child))

const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, style, children, separator = '/', maxItems = 0, ...props }, ref) => {
    const [expanded, setExpanded] = useState(false)
    const items = Children.toArray(children)
    const total = items.length
    const shouldCollapse = maxItems > 0 && total > maxItems && !expanded
    const tail = shouldCollapse ? items.slice(-(maxItems - 1)) : []

    const renderItem = (child: ReactNode, isLast: boolean) => (
      <li key={itemKey(child)} className="breadcrumbs-item" {...(isLast ? { 'aria-current': 'page' as const } : {})}>
        {child}
        {!isLast && <span className="breadcrumbs-separator">{separator}</span>}
      </li>
    )

    return (
      <nav ref={ref} aria-label="breadcrumb" className={cn(breadcrumbsNav, className)} style={style}>
        <ol className={breadcrumbsWrapper} {...props}>
          {shouldCollapse ? (
            <>
              {renderItem(items[0], false)}
              <li className="breadcrumbs-item">
                <button
                  type="button"
                  className={breadcrumbsEllipsis}
                  onClick={() => setExpanded(true)}
                  aria-label="숨겨진 항목 모두 보기"
                >
                  ...
                </button>
                <span className="breadcrumbs-separator">{separator}</span>
              </li>
              {tail.map((child, idx) => renderItem(child, idx === tail.length - 1))}
            </>
          ) : (
            items.map((child, idx) => renderItem(child, idx === total - 1))
          )}
        </ol>
      </nav>
    )
  },
)

Breadcrumbs.displayName = 'Breadcrumbs'

export default Breadcrumbs
