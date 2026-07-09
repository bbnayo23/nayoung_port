import type { HTMLAttributes, ReactNode } from 'react'

/**
 * GNB (Global Navigation Bar) — AiR Works 레이아웃 셸 상단 바.
 * Figma "AW · Layout Shell (LNB+GNB · Empty)" 프레임을 재현한 프리젠테이션 컴포넌트.
 * 각 액션은 onClick 콜백만 노출하며, 팝오버 등 상태는 소비처에서 관리한다.
 */
export interface GnbProps extends HTMLAttributes<HTMLElement> {
  // ── 좌측 브랜드 ──────────────────────────────────────────────────────────
  /** 좌측 로고 마크. 미지정 시 AiR Works 기본 로고 */
  logo?: ReactNode
  /** 브랜드 타이틀 텍스트 */
  title?: string
  /** 브랜드 우측 드롭다운 셰브론 표시 여부 */
  showBrandDropdown?: boolean
  /** 브랜드 영역(로고+타이틀+셰브론) 클릭 콜백 */
  onBrandClick?: () => void

  // ── AI Assistant ─────────────────────────────────────────────────────────
  /** AI Assistant 버튼 표시 여부 */
  showAiAssistant?: boolean
  /** AI Assistant 라벨 텍스트 */
  aiAssistantLabel?: string
  onAiAssistantClick?: () => void

  // ── 우측 액션 ────────────────────────────────────────────────────────────
  /** 다운로드 버튼 표시 여부 */
  showDownload?: boolean
  onDownloadClick?: () => void

  /** 알림 버튼 표시 여부 */
  showNotification?: boolean
  /** 읽지 않은 알림 개수 — 1 이상이면 빨간 점을 표시한다 */
  notiCount?: number
  onNotificationClick?: () => void

  /** 테마 버튼 표시 여부 */
  showTheme?: boolean
  onThemeClick?: () => void

  /** 언어 버튼 표시 여부 */
  showLanguage?: boolean
  onLanguageClick?: () => void

  /** 사용자 버튼 표시 여부 */
  showUser?: boolean
  onUserClick?: () => void

  /** 홈 버튼(강조 박스) 표시 여부 */
  showHome?: boolean
  onHomeClick?: () => void
}
