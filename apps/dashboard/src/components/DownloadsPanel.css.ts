import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@port/design-system'

export const panel = style({
  position: 'fixed',
  zIndex: 40,
  width: 260,
  maxWidth: 'calc(100vw - 16px)',
  display: 'flex',
  flexDirection: 'column',
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: '0 12px 32px rgba(15, 23, 42, 0.16)',
  overflow: 'hidden',
})

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
  maxHeight: 320,
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

const statusIconBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  borderRadius: vars.radius.sm,
  flexShrink: 0,
})

export const statusIcon = styleVariants({
  progress: [statusIconBase, { background: vars.color.primarySoft, color: vars.color.primary }],
  done: [
    statusIconBase,
    { background: `color-mix(in srgb, ${vars.color.success} 14%, transparent)`, color: vars.color.success },
  ],
  failed: [
    statusIconBase,
    { background: `color-mix(in srgb, ${vars.color.error} 14%, transparent)`, color: vars.color.error },
  ],
})

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  flex: 1,
  minWidth: 0,
})

export const name = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.text,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const meta = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
})

export const retry = style({
  border: 'none',
  background: 'transparent',
  padding: 0,
  marginLeft: 6,
  color: vars.color.primary,
  fontSize: vars.font.sizeXs,
  cursor: 'pointer',
  ':hover': { textDecoration: 'underline' },
})

export const track = style({
  height: 3,
  marginTop: 2,
  borderRadius: vars.radius.full,
  background: vars.color.border,
  overflow: 'hidden',
})

export const fill = style({
  height: '100%',
  borderRadius: vars.radius.full,
  background: vars.color.primary,
})

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  padding: '8px 14px',
  borderTop: `1px solid ${vars.color.border}`,
})

export const footerLeft = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
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
