import './theme/reset.css'

// Theme & tokens
export { vars, commonTokens } from './theme'
export type { ThemeVars } from './theme'

// Shared utilities
export { cx, Portal, useFocusTrap } from './utils'
export type { ClassValue, PortalProps } from './utils'
export { useClickOutside } from './hooks'

// Components (ported from style-guide-components — 2026-OneUI)
export * from './components/Accordion'
export * from './components/AlertModal'
export * from './components/Badge'
export * from './components/Breadcrumbs'
export * from './components/Button'
export * from './components/ButtonGroup'
export * from './components/Calendar'
export * from './components/CalendarInput'
export * from './components/Card'
export * from './components/Checkbox'
export * from './components/Collapse'
export * from './components/ContextMenu'
export * from './components/DateTimePicker'
export * from './components/Divider'
export * from './components/Dropdown'
export * from './components/Filter'
export * from './components/HighlightText'
export * from './components/IconButton'
export * from './components/Input'
export * from './components/InputGroup'
export * from './components/Modal'
export * from './components/PageHeader'
export {
  PageContent,
  PageHeaderRow,
  SectionCard,
  GridContainer,
  PaginationBar,
  SectionToolbar,
  ToolbarLeft,
  ToolbarCenter,
  ToolbarRight,
  TotalCount,
  GhostIconButton,
  ContentSection,
  TopologyContainer,
  InlineBadgeRow,
  ChipContainer,
  Chip,
} from './components/PageLayout'
export * from './components/Pagination'
export * from './components/QueryListCard'
export * from './components/Popover'
export * from './components/Progress'
export * from './components/Radio'
export * from './components/RangeCalendar'
export * from './components/SearchBar'
export * from './components/Lnb'
export * from './components/Skeleton'
export * from './components/Spinner'
export * from './components/StatsBar'
export * from './components/Stepper'
export * from './components/Table'
export * from './components/Tabs'
export * from './components/Textarea'
export * from './components/Toast'
export * from './components/Toggle'
export * from './components/Tooltip'
export * from './components/Gnb'
export * from './components/Tree'
export * from './components/AppLayout'

// default-export 컴포넌트의 named 재노출 — 위의 `export *` 는 default 를 전달하지 않으므로
// 패키지 소비자가 `import { Table } from '@port/design-system'` 처럼 쓰도록 별칭을 추가한다.
// (각 컴포넌트의 props 타입은 위 `export *` 가 이미 노출한다.)
export { default as Table } from './components/Table'
export { default as Badge } from './components/Badge'
export { default as Pagination } from './components/Pagination'
export { default as IconButton } from './components/IconButton'
export { default as Input } from './components/Input'
export { default as Checkbox } from './components/Checkbox'
export { default as Filter } from './components/Filter'
export { default as Lnb } from './components/Lnb'
export { default as AppLayout } from './components/AppLayout'
export { default as AlertModal } from './components/AlertModal'
export { default as PageHeader } from './components/PageHeader'
export { default as Breadcrumbs } from './components/Breadcrumbs'
export { default as QueryListCard } from './components/QueryListCard'

// ── Patterns — 기능(로직·상태)이 포함된 UI 블록 (순수 프리미티브 components 와 구분) ──
export { default as GnbDropdown } from './patterns/GnbDropdown'
export type { GnbDropdownProps } from './patterns/GnbDropdown'
export { default as GuideTour } from './patterns/GuideTour'
export type { GuideStep, GuideTourProps } from './patterns/GuideTour'
export { default as LanguageMenu } from './patterns/LanguageMenu'
export type { LanguageMenuProps, LanguageOption } from './patterns/LanguageMenu'
export { default as UserMenu } from './patterns/UserMenu'
export type { UserMenuProps, UserMenuUser } from './patterns/UserMenu'
export { default as SolutionSwitcher } from './patterns/SolutionSwitcher'
export type { SolutionSwitcherProps, SolutionApp } from './patterns/SolutionSwitcher'
export { default as DownloadDropdown } from './patterns/DownloadDropdown'
export type { DownloadDropdownProps, DownloadItem } from './patterns/DownloadDropdown'
export { default as NotificationDropdown } from './patterns/NotificationDropdown'
export type { NotificationDropdownProps, NotificationItem, NotificationLevel } from './patterns/NotificationDropdown'
export { default as AiAssistantPanel } from './patterns/AiAssistantPanel'
export type { AiAssistantPanelProps, AssistantMessage } from './patterns/AiAssistantPanel'
