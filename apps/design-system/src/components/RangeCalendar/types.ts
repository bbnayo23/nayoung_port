export interface DateRange {
  start: Date
  end: Date
}

export type RangePreset =
  | {
      label: string
      type: 'preset'
      getValue: (now?: Date) => DateRange
      editValue?: string
    }
  | { label: string; type: 'custom' }

export interface RangeCalendarProps {
  start?: Date | null
  end?: Date | null
  onStartChange?: (date: Date) => void
  onEndChange?: (date: Date) => void
  relativeValue?: string | null
  onRelativeValueChange?: (value: string | null) => void
  presets: RangePreset[]
  formatDate: (date: Date) => string
  parseDate: (text: string) => Date | null
  placeholder?: string
  disabled?: boolean
  disabledBefore?: Date
  disabledAfter?: Date
  className?: string
}
