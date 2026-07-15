import { vars } from '@dc/theme/contract.css'

/** Button 컴포넌트 전용 CSS 커스텀 프로퍼티 토큰 */
export const createButtonTokens = (): Record<string, string> => ({
  // primary
  '--color-button-primary-bg': vars.color.primary,
  '--color-button-primary-bg-hover': vars.color.primaryHover,
  '--color-button-primary-text': '#ffffff',
  '--color-button-primary-focus': vars.color.primary,

  // secondary
  '--color-button-secondary-bg': vars.color.surface,
  '--color-button-secondary-text': vars.color.text,
  '--color-button-secondary-border': vars.color.border,
  '--color-button-secondary-bg-hover': `color-mix(in srgb, ${vars.color.primary} 12%, transparent)`,
  '--color-button-secondary-text-hover': vars.color.primary,
  '--color-button-secondary-border-hover': vars.color.primary,

  // outline
  '--color-button-outline-text': vars.color.primary,
  '--color-button-outline-border': vars.color.primary,
  '--color-button-outline-bg-hover': vars.color.primary,
  '--color-button-outline-text-hover': '#ffffff',
  '--color-button-outline-focus': vars.color.primary,

  // ghost
  '--color-button-ghost-text': vars.color.text,
  '--color-button-ghost-bg-hover': vars.color.surfaceHover,
  '--color-button-ghost-text-hover': vars.color.primary,
  '--color-button-ghost-focus': vars.color.primary,

  // danger
  '--color-button-danger-bg': vars.color.error,
  '--color-button-danger-text': '#ffffff',
  '--color-button-danger-focus': vars.color.error,
})

export const buttonTokens = createButtonTokens()
