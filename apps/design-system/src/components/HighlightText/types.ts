export interface HighlightTextProps {
  text: string
  searchWords: Array<string | RegExp>
  caseSensitive?: boolean
  className?: string
}
