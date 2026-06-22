import type { HighlightTextProps } from './HighlightText'

const MAX_HIGHLIGHT_LENGTH = 20_000
const MAX_SEARCH_WORD_LENGTH = 30_000

/** searchWords の合計シリアライズ長を計算 */
const totalSearchWordLength = (words: Array<string | RegExp>) =>
  words.reduce((acc, w) => acc + (typeof w === 'string' ? w.length : w.source.length), 0)

/**
 * text / searchWords が閾値を超えるか searchWords が空の場合 true を返す。
 * true の場合は plain テキストとしてレンダリングする。
 */
export const useShouldRenderPlain = (
  text: HighlightTextProps['text'],
  searchWords: HighlightTextProps['searchWords'],
): boolean => {
  if (searchWords.length === 0) return true
  if (text.length > MAX_HIGHLIGHT_LENGTH) return true
  if (totalSearchWordLength(searchWords) > MAX_SEARCH_WORD_LENGTH) return true
  return false
}
