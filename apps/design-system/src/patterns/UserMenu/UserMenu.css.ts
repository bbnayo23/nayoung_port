import { style } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

export const head = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '12px 14px',
  borderBottom: `1px solid ${vars.color.border}`,
})

export const avatar = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  borderRadius: vars.radius.full,
  background: vars.color.primary,
  color: vars.color.textInverse,
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightBold,
  flexShrink: 0,
})

export const info = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  minWidth: 0,
})

export const name = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightBold,
  color: vars.color.text,
})

export const role = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
})

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 4,
})

export const item = style({
  width: '100%',
  padding: '8px 10px',
  border: 'none',
  background: 'transparent',
  borderRadius: vars.radius.sm,
  textAlign: 'left',
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
  cursor: 'pointer',
  transition: `background ${vars.transition.fast}`,
  ':hover': { background: vars.color.surfaceHover },
})

export const itemDanger = style({
  color: vars.color.error,
})
