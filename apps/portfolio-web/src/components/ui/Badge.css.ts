import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../styles/tokens.css'

const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['1'],
  paddingTop: vars.space['1'],
  paddingBottom: vars.space['1'],
  paddingLeft: vars.space['2'],
  paddingRight: vars.space['2'],
  borderRadius: vars.radius.full,
  fontSize: vars.fontSize.xs,
  fontWeight: 500,
  fontFamily: vars.font.mono,
  lineHeight: vars.lineHeight.none,
  border: `1px solid ${vars.color.border}`,
  whiteSpace: 'nowrap',
  transition: `border-color ${vars.transition.fast}`,
})

export const badge = styleVariants({
  default: [base, {
    color: vars.color.textSecondary,
    background: vars.color.surface,
    borderColor: vars.color.border,
  }],
  accent: [base, {
    color: vars.color.accent,
    background: vars.color.accentSubtle,
    borderColor: vars.color.accentBorder,
  }],
  green: [base, {
    color: vars.color.green,
    background: vars.color.greenSubtle,
    borderColor: vars.color.greenBorder,
  }],
  purple: [base, {
    color: vars.color.purple,
    background: vars.color.purpleSubtle,
    borderColor: vars.color.purpleBorder,
  }],
  amber: [base, {
    color: vars.color.amber,
    background: vars.color.amberSubtle,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  }],
})
