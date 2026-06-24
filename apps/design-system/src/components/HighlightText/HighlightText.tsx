import Highlighter from 'react-highlight-words'
import type { HighlightTextProps } from './types'
import { useShouldRenderPlain } from './hooks'
import * as styles from './HighlightText.css'

export const HighlightText = ({ text, searchWords, caseSensitive = false, className }: HighlightTextProps) => {
  const plain = useShouldRenderPlain(text, searchWords)

  if (plain) {
    return <span className={className}>{text}</span>
  }

  return (
    <Highlighter
      textToHighlight={text}
      searchWords={searchWords as string[]}
      caseSensitive={caseSensitive}
      highlightClassName={styles.highlight}
      highlightTag="mark"
      autoEscape={false}
      className={className}
    />
  )
}

export default HighlightText
