import type { CSSProperties } from 'react'

export type DateTimePreset =
  | 'today'
  | 'yesterday'
  | 'last30m'
  | 'last1h'
  | 'last6h'
  | 'last12h'
  | 'last1d'
  | 'last7d'
  | 'last30d'
  | 'custom'

export interface PresetItem {
  value: DateTimePreset
  label: string
}

export interface DateTimeRange {
  start: Date
  end: Date
}

export interface DateTimePickerProps {
  /** 트리거 앞에 표시되는 라벨 */
  label?: string
  /** 선택된 프리셋 */
  preset?: DateTimePreset
  /** 기본 프리셋 */
  defaultPreset?: DateTimePreset
  /** 날짜 범위 변경 콜백 */
  onChange?: (range: DateTimeRange, preset: DateTimePreset) => void
  /** 프리셋 목록 (기본: 검색시간 전체 목록) */
  presets?: PresetItem[]
  /** 비활성 */
  disabled?: boolean
  /** 사이즈 */
  size?: 'sm' | 'md' | 'lg'
  className?: string
  style?: CSSProperties
}
