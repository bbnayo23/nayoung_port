import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@port/design-system'

export const head = style({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: 8,
  padding: '10px 14px',
  borderBottom: `1px solid ${vars.color.border}`,
})

export const headTitle = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
})

export const headCount = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
})

export const list = style({
  maxHeight: 360,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
})

export const item = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 10,
  padding: '11px 14px',
  transition: `background ${vars.transition.fast}`,
  ':hover': { background: vars.color.surfaceHover },
})

const dotBase = style({
  width: 8,
  height: 8,
  marginTop: 5,
  borderRadius: vars.radius.full,
  flexShrink: 0,
})

// 심각도 도트 색 (medium 은 전용 토큰이 없어 데모용 앰버 리터럴)
export const dot = styleVariants({
  critical: [dotBase, { background: vars.color.error }],
  high: [dotBase, { background: vars.color.warning }],
  medium: [dotBase, { background: '#eab308' }],
  ok: [dotBase, { background: vars.color.success }],
})

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  flex: 1,
  minWidth: 0,
})

export const title = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
  lineHeight: 1.45,
})

export const meta = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
})

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  padding: '8px 14px',
  borderTop: `1px solid ${vars.color.border}`,
})

export const footerBtn = style({
  border: 'none',
  background: 'transparent',
  padding: 0,
  color: vars.color.primary,
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightMedium,
  cursor: 'pointer',
  ':hover': { textDecoration: 'underline' },
})
