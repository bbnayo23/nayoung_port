import type { HTMLAttributes, ReactNode } from 'react'

export interface BreadcrumbItem {
  key: string
  label: string
  href?: string
  onClick?: () => void
}

export interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
  /** 페이지 타이틀 (h1 자동 적용) */
  title: string
  /** 서브 타이틀 (타이틀 옆에 표시) */
  subtitle?: string
  /** 브레드크럼 경로 — 배열로 전달하면 내부에서 Breadcrumbs 렌더 */
  breadcrumbs?: BreadcrumbItem[]
  /** 상태 칩 등 태그 슬롯 (ACTIVE · DRAFT · ARCHIVED 등) */
  tags?: ReactNode
  /** 우측 액션 영역 */
  actions?: ReactNode
  /** 뒤로가기 버튼 커스텀 슬롯 */
  backButton?: ReactNode
  /** 뒤로가기 핸들러 — 지정 시 기본 뒤로가기 버튼 자동 렌더 */
  onBack?: () => void
  /** 헤더 하단 구분선 표시 여부 */
  divider?: boolean
}
