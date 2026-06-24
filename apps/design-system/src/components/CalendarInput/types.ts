export interface CalendarInputProps {
  value?: string
  selectedDate?: Date | null
  onDateSelect?: (date: Date | undefined) => void
  onInputChange?: (text: string) => void
  onInputBlur?: () => void
  disabledBefore?: Date
  disabledAfter?: Date
  placeholder?: string
  disabled?: boolean
  className?: string
}
