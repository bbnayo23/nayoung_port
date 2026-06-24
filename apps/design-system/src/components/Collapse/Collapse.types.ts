import type { CSSProperties, ReactNode } from 'react'

export type CollapseVariant = 'card' | 'row' | 'more' | 'horizontal'

export interface CollapseProps {
  /** 헤더 영역 (클릭 시 토글). 생략하면 외부에서 open 제어만 가능 */
  header?: ReactNode
  children: ReactNode
  variant?: CollapseVariant
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  style?: CSSProperties
}
