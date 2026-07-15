import { forwardRef } from 'react'
import type { PageHeaderProps } from './PageHeader.types'
import {
  styledPageHeader,
  pageHeaderBreadcrumbs,
  pageHeaderRow,
  pageHeaderBackBtn,
  pageHeaderTitleGroup,
  pageHeaderTitle,
  pageHeaderSubtitle,
  pageHeaderTags,
  pageHeaderActions,
  pageHeaderDivider,
  breadcrumbBtn,
} from './PageHeader.css'
import Breadcrumbs from '@dc/components/Breadcrumbs'
import Divider from '@dc/components/Divider'
import { ExdArrowLIcon } from '@port/icon-library'
import cn from 'classnames'

const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(
  ({ title, subtitle, breadcrumbs, tags, actions, backButton, onBack, divider = true, className, ...rest }, ref) => {
    const backEl =
      backButton ??
      (onBack ? (
        <button type="button" className={pageHeaderBackBtn} onClick={onBack} aria-label="이전 페이지로 이동">
          <ExdArrowLIcon size={16} />
        </button>
      ) : null)

    return (
      <header ref={ref} className={cn(styledPageHeader, 'page-header', className)} {...rest}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className={pageHeaderBreadcrumbs}>
            <Breadcrumbs>
              {breadcrumbs.map((item) =>
                item.href ? (
                  <a key={item.key} href={item.href}>
                    {item.label}
                  </a>
                ) : item.onClick ? (
                  <button key={item.key} type="button" className={breadcrumbBtn} onClick={item.onClick}>
                    {item.label}
                  </button>
                ) : (
                  <span key={item.key}>{item.label}</span>
                ),
              )}
            </Breadcrumbs>
          </div>
        )}

        <div className={pageHeaderRow}>
          {backEl}
          <div className={pageHeaderTitleGroup}>
            <h1 className={pageHeaderTitle}>{title}</h1>
            {subtitle && <span className={pageHeaderSubtitle}>{subtitle}</span>}
          </div>
          {tags && <div className={pageHeaderTags}>{tags}</div>}
          {actions && <div className={pageHeaderActions}>{actions}</div>}
        </div>

        {divider && (
          <div className={pageHeaderDivider}>
            <Divider />
          </div>
        )}
      </header>
    )
  },
)

PageHeader.displayName = 'PageHeader'

export default PageHeader
