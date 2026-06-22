import Highlighter from 'react-highlight-words'
import { useShouldRenderPlain } from './hooks'
import * as styles from './HighlightText.css'

export interface HighlightTextProps {
  text: string
  searchWords: Array<string | RegExp>
  caseSensitive?: boolean
  className?: string
}

export const HighlightText = ({
  text,
  searchWords,
  caseSensitive = false,
  className,
}: HighlightTextProps) => {
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
