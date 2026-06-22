import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

const badgeBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: `0 ${vars.space[2]}`,
  height: 20,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  borderRadius: vars.radius.full,
  lineHeight: 1,
})

export const badge = styleVariants({
  primary: [badgeBase, { backgroundColor: vars.color.brand[600], color: vars.color.textInverse }],
  neutral: [
    badgeBase,
    {
      backgroundColor: vars.color.surfaceMuted,
      color: vars.color.text,
      border: `1px solid ${vars.color.border}`,
    },
  ],
  danger: [badgeBase, { backgroundColor: vars.color.danger, color: vars.color.textInverse }],
  success: [badgeBase, { backgroundColor: vars.color.success, color: vars.color.textInverse }],
})

export const ipContainer = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space[1],
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
})

export const flag = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 4px',
  height: 16,
  fontSize: 10,
  fontWeight: vars.font.weight.bold,
  color: vars.color.textInverse,
  backgroundColor: vars.color.info,
  borderRadius: vars.radius.sm,
  lineHeight: 1,
  letterSpacing: 0.5,
})

export const code = style({
  display: 'inline-block',
  padding: `1px ${vars.space[1]}`,
  backgroundColor: vars.color.surfaceMuted,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  fontFamily: 'monospace',
  fontSize: vars.font.size.sm,
  color: vars.color.text,
})

export const logSourceLabel = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space[1],
  fontSize: vars.font.size.sm,
  color: vars.color.text,
})

export const logSourceDot = style({
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.brand[600],
  flexShrink: 0,
})

export const arrayContainer = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space[1],
  flexWrap: 'wrap',
})

export type CellBadgeColor = keyof typeof badge
