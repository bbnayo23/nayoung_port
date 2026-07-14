import type { ReactNode } from 'react'

/** 검색기록·템플릿 등 저장된 쿼리 한 건 */
export interface QueryListItem {
  id: string
  /** 검색기록의 시각 또는 템플릿명 */
  title: string
  /** 보조 요약 — 예: "전체 · 내림차순" (없으면 표시하지 않음) */
  meta?: string
  /** 쿼리 문자열 */
  query: string
}

export interface QueryListCardProps {
  /** 헤더 좌측 아이콘 */
  icon?: ReactNode
  /** 헤더 타이틀 */
  title: string
  /** 헤더 우측 액션 라벨 — 예: "전체", "더보기" */
  actionLabel?: string
  onAction?: () => void
  /** 목록 항목 */
  items: QueryListItem[]
  /** 항목 클릭(실행) */
  onSelect: (item: QueryListItem) => void
  /** hover 시 노출되는 실행 어피던스 라벨 (기본: 실행) */
  runLabel?: string
  /** 빈 목록 안내 문구 */
  emptyText?: string
  /** 카드 내 필터 검색 입력 표시 (기본: true) */
  searchable?: boolean
  className?: string
}
