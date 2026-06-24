import type { ReactNode, CSSProperties } from 'react'

type CommonProps = { className?: string; style?: CSSProperties }

export interface BreadcrumbsProps extends CommonProps {
  children: ReactNode
  separator?: string | ReactNode
  maxItems?: number
}
