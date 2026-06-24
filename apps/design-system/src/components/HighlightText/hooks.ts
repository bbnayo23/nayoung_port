import type { HighlightTextProps } from './types'

const MAX_HIGHLIGHT_LENGTH = 20_000
const MAX_SEARCH_WORD_LENGTH = 30_000

const totalSearchWordLength = (words: Array<string | RegExp>) =>
  words.reduce((acc, w) => acc + (typeof w === 'string' ? w.length : w.source.length), 0)

export const useShouldRenderPlain = (
  text: HighlightTextProps['text'],
  searchWords: HighlightTextProps['searchWords'],
): boolean => {
  if (searchWords.length === 0) return true
  if (text.length > MAX_HIGHLIGHT_LENGTH) return true
  if (totalSearchWordLength(searchWords) > MAX_SEARCH_WORD_LENGTH) return true
  return false
}
