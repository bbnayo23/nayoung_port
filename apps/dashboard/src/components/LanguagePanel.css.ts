import { style } from '@vanilla-extract/css'
import { vars } from '@port/design-system'

export const head = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
  padding: '10px 14px',
  borderBottom: `1px solid ${vars.color.border}`,
})

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 4,
})

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  width: '100%',
  padding: '8px 10px',
  border: 'none',
  background: 'transparent',
  borderRadius: vars.radius.sm,
  cursor: 'pointer',
  textAlign: 'left',
  transition: `background ${vars.transition.fast}`,
  ':hover': { background: vars.color.surfaceHover },
})

export const itemActive = style({
  background: vars.color.primarySoft,
})

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 26,
  height: 26,
  borderRadius: vars.radius.sm,
  background: vars.color.background,
  border: `1px solid ${vars.color.border}`,
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightBold,
  color: vars.color.textSecondary,
  flexShrink: 0,
})

export const label = style({
  flex: 1,
  minWidth: 0,
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
})

export const check = style({
  color: vars.color.primary,
  flexShrink: 0,
  display: 'inline-flex',
})
