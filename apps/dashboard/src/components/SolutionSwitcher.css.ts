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

export const headSub = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 8,
  padding: 12,
})

export const tile = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 8,
  padding: '12px',
  border: '1px solid transparent',
  borderRadius: vars.radius.md,
  background: 'transparent',
  cursor: 'pointer',
  textAlign: 'left',
  transition: `background ${vars.transition.fast}, border-color ${vars.transition.fast}`,
  ':hover': { background: vars.color.surfaceHover },
})

export const tileActive = style({
  borderColor: vars.color.primary,
  background: vars.color.primarySoft,
})

const tileIconBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: vars.radius.md,
  flexShrink: 0,
})

export const tileIcon = styleVariants({
  primary: [tileIconBase, { background: vars.color.primary, color: vars.color.textInverse }],
  danger: [tileIconBase, { background: vars.color.error, color: vars.color.textInverse }],
  muted: [tileIconBase, { background: vars.color.background, color: vars.color.textSecondary, border: `1px solid ${vars.color.border}` }],
})

export const tileName = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.text,
})

export const tileNameSpider = style({
  color: vars.color.textSecondary,
})

export const tileNameBold = style({
  fontWeight: vars.font.weightBold,
})

export const tileSub = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
})
