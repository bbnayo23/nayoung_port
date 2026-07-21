import { style } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

// 대상 클릭이 통과하도록 오버레이 자체는 pointer-events 없음. 콜아웃만 클릭 가능.
export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 3000,
  pointerEvents: 'none',
})

// 스포트라이트 — 큰 box-shadow 로 대상 밖을 어둡게 덮고, 대상 영역만 드러낸다.
export const spotlight = style({
  position: 'fixed',
  borderRadius: vars.radius.md,
  boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.55)',
  outline: `2px solid ${vars.color.primary}`,
  transition: 'all 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
  pointerEvents: 'none',
})

export const callout = style({
  position: 'fixed',
  width: 320,
  maxWidth: 'calc(100vw - 32px)',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 16,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: '0 12px 32px rgba(15, 23, 42, 0.18)',
  pointerEvents: 'auto',
})

export const stepRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const stepBadge = style({
  fontFamily: vars.font.family,
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightBold,
  letterSpacing: '0.04em',
  color: vars.color.primary,
})

export const skip = style({
  border: 'none',
  background: 'transparent',
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeXs,
  cursor: 'pointer',
  ':hover': { color: vars.color.text, textDecoration: 'underline' },
})

export const title = style({
  fontSize: vars.font.sizeMd,
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
})

export const desc = style({
  fontSize: vars.font.sizeSm,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
})

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  marginTop: 4,
})

// "오늘 하루 보지 않기" — 조용한 텍스트 버튼
export const dontShow = style({
  border: 'none',
  background: 'transparent',
  padding: 0,
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeXs,
  cursor: 'pointer',
  ':hover': { color: vars.color.text, textDecoration: 'underline' },
})

export const nextBtn = style({
  marginLeft: 'auto',
  padding: '7px 16px',
  border: 'none',
  borderRadius: vars.radius.sm,
  background: vars.color.primary,
  color: vars.color.textInverse,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  cursor: 'pointer',
  transition: `opacity ${vars.transition.fast}`,
  ':hover': { opacity: 0.92 },
})
