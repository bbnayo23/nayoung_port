import { style, keyframes, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

const GNB_H = 56

const slideIn = keyframes({
  from: { transform: 'translateX(16px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
})

// 우측 도킹 패널 — GNB 아래부터 화면 하단까지
export const panel = style({
  position: 'fixed',
  top: GNB_H,
  right: 0,
  bottom: 0,
  width: 380,
  maxWidth: '100vw',
  zIndex: 30,
  display: 'flex',
  flexDirection: 'column',
  background: vars.color.surface,
  borderLeft: `1px solid ${vars.color.border}`,
  boxShadow: '-8px 0 28px rgba(15, 23, 42, 0.10)',
  animation: `${slideIn} 0.24s cubic-bezier(0.22, 1, 0.36, 1)`,
})

// ── 헤더 ───────────────────────────────────────────────────────────────────
export const head = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '14px 16px',
  borderBottom: `1px solid ${vars.color.border}`,
  flexShrink: 0,
})

export const avatar = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  borderRadius: vars.radius.md,
  background: vars.color.primary,
  color: vars.color.textInverse,
  flexShrink: 0,
})

export const headText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  flex: 1,
  minWidth: 0,
})

export const headTitle = style({
  fontSize: vars.font.sizeMd,
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
})

export const headStatus = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
})

export const dot = style({
  width: 6,
  height: 6,
  borderRadius: vars.radius.full,
  background: vars.color.success,
  flexShrink: 0,
})

export const close = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  border: 'none',
  background: 'transparent',
  borderRadius: vars.radius.sm,
  color: vars.color.textSecondary,
  cursor: 'pointer',
  transition: `background ${vars.transition.fast}, color ${vars.transition.fast}`,
  ':hover': { background: vars.color.surfaceHover, color: vars.color.text },
})

// ── 대화 본문 ───────────────────────────────────────────────────────────────
export const body = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: 16,
})

export const aiRow = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
})

export const aiAvatar = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 26,
  height: 26,
  borderRadius: vars.radius.full,
  background: vars.color.primary,
  color: vars.color.textInverse,
  flexShrink: 0,
})

export const aiBubbleWrap = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  minWidth: 0,
  maxWidth: '86%',
})

export const aiBubble = style({
  padding: '10px 12px',
  borderRadius: vars.radius.md,
  background: vars.color.background,
  color: vars.color.text,
  fontSize: vars.font.sizeSm,
  lineHeight: 1.6,
  whiteSpace: 'pre-line',
  wordBreak: 'break-word',
})

// 하이라이트 강조(숫자 등)
globalStyle(`${aiBubble} b`, {
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
})

export const chips = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 6,
})

export const chip = style({
  padding: '5px 10px',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.full,
  background: vars.color.surface,
  color: vars.color.text,
  fontSize: vars.font.sizeXs,
  cursor: 'pointer',
  transition: `border-color ${vars.transition.fast}, color ${vars.transition.fast}`,
  ':hover': { borderColor: vars.color.primary, color: vars.color.primary },
})

export const userRow = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  gap: 8,
})

export const userBubble = style({
  padding: '10px 12px',
  borderRadius: vars.radius.md,
  background: vars.color.primary,
  color: vars.color.textInverse,
  fontSize: vars.font.sizeSm,
  lineHeight: 1.6,
  maxWidth: '80%',
  whiteSpace: 'pre-line',
  wordBreak: 'break-word',
})

export const userAvatar = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 26,
  height: 26,
  borderRadius: vars.radius.full,
  background: vars.color.textSecondary,
  color: vars.color.textInverse,
  fontSize: 10,
  fontWeight: vars.font.weightBold,
  flexShrink: 0,
})

// ── 입력 푸터 ───────────────────────────────────────────────────────────────
export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 12,
  borderTop: `1px solid ${vars.color.border}`,
  flexShrink: 0,
})

export const inputRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '4px 4px 4px 8px',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
  transition: `border-color ${vars.transition.fast}`,
  ':focus-within': { borderColor: vars.color.primary },
})

export const attach = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  border: 'none',
  background: 'transparent',
  color: vars.color.textSecondary,
  cursor: 'pointer',
  flexShrink: 0,
  transition: `color ${vars.transition.fast}`,
  ':hover': { color: vars.color.text },
})

export const input = style({
  flex: 1,
  minWidth: 0,
  height: 30,
  border: 'none',
  background: 'transparent',
  outline: 'none',
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
  fontFamily: vars.font.family,
  '::placeholder': { color: vars.color.textMuted },
})

export const send = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  border: 'none',
  borderRadius: vars.radius.sm,
  background: vars.color.primary,
  color: vars.color.textInverse,
  cursor: 'pointer',
  flexShrink: 0,
  transition: `opacity ${vars.transition.fast}`,
  ':hover': { opacity: 0.92 },
  ':disabled': { opacity: 0.4, cursor: 'not-allowed' },
})

export const disclaimer = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
  textAlign: 'center',
  lineHeight: 1.5,
})
