import type { CSSProperties, ReactNode } from 'react'

export type DropdownSize = 'sm' | 'md' | 'lg'

export interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
  /** 태그 모드에서 Badge variant 색상 (예: 'red', 'green', 'yellow', 'orange', 'purple', 'gray') */
  variant?: string
  /** true 이면 선택 불가능한 구분선으로 렌더링됩니다 */
  isDivider?: boolean
}

// ── 공통 Props ────────────────────────────────────────────────────────────────

interface DropdownBaseProps {
  options: DropdownOption[]
  placeholder?: string
  /** 트리거 앞에 표시되는 라벨 */
  label?: string
  size?: DropdownSize
  disabled?: boolean
  className?: string
  style?: CSSProperties
  /** 드롭다운 너비를 직접 지정합니다 (예: 200, '100%') */
  width?: number | string
  /** Style Guide 전용: 메뉴를 강제로 열어둠 */
  forceOpen?: boolean
  /** 검색 입력 활성화 여부 */
  searchable?: boolean
  /** 메뉴 열림 방향 */
  placement?: 'bottom' | 'top'
  /** 드롭다운 최대 너비 (예: 300, '50%') */
  maxWidth?: number | string
  /** 커스텀 패널 렌더러 — 제공 시 react-select 메뉴 대신 renderPanel(close) 결과를 표시합니다 */
  renderPanel?: (close: () => void) => ReactNode
}

// ── Single Select (기본) ──────────────────────────────────────────────────────

export interface DropdownSingleProps extends DropdownBaseProps {
  multiSelect?: false
  value?: string
  defaultValue?: string
  onChange?: (value: string, option: DropdownOption) => void
}

// ── Multi Select ──────────────────────────────────────────────────────────────

export interface DropdownMultiProps extends DropdownBaseProps {
  /** 다중 선택 모드 */
  multiSelect: true
  /** 트리거 표시 방식: 'count' = "N개 선택", 'values' = 텍스트 말줄임, 'tags' = 태그 배지, 'tags-closable' = 닫기 버튼 태그 */
  multiDisplayMode?: 'count' | 'values' | 'tags' | 'tags-closable'
  value?: string[]
  /** value 의 별칭 */
  values?: string[]
  defaultValue?: string[]
  onChange?: (values: string[], options: DropdownOption[]) => void
  /** false 로 설정하면 메뉴 상단에 "전체" 전체선택 행을 표시합니다 */
  hideSelectAll?: boolean
  /** 제공 시 선택된 항목이 있을 때 "초기화" 버튼을 표시합니다 */
  onReset?: () => void
}

// ── Union ─────────────────────────────────────────────────────────────────────

export type DropdownProps = DropdownSingleProps | DropdownMultiProps
