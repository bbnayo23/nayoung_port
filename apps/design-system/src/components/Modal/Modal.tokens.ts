import { vars } from '../../theme/contract.css'

/** Modal 컴포넌트 전용 CSS 커스텀 프로퍼티 토큰 */
export const createModalTokens = (): Record<string, string> => ({
  '--color-modal-bg': vars.color.surface,
  '--color-modal-sidepanel-bg': vars.color.surface,
  '--color-modal-text': vars.color.textSecondary,
  '--color-modal-title-text': vars.color.text,
  '--color-modal-border': vars.color.border,
})

export const modalTokens = createModalTokens()
