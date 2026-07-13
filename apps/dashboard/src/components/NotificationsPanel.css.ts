import { style } from '@vanilla-extract/css'
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
  alignItems: 'center',
  gap: 10,
  padding: '10px 14px',
  transition: `background ${vars.transition.fast}`,
  ':hover': { background: vars.color.surfaceHover },
})

// 읽지 않은 알림 — 옅은 강조 배경
export const itemUnread = style({
  background: vars.color.primarySoft,
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
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const titleUnread = style({
  fontWeight: vars.font.weightBold,
})

export const meta = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
})

export const unreadDot = style({
  width: 7,
  height: 7,
  borderRadius: vars.radius.full,
  background: vars.color.primary,
  flexShrink: 0,
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
