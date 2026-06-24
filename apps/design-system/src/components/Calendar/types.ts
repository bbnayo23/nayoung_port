export interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabledBefore?: Date
  disabledAfter?: Date
  className?: string
}
