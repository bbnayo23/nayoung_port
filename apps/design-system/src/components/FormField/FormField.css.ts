import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const horizontal = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
})

export const vertical = style({
  display: 'flex',
  flexDirection: 'column',
})

export const label = style({
  flexShrink: 0,
  fontSize: '13px',
  fontWeight: vars.font.weight.medium,
  color: vars.color.text,
  lineHeight: '32px',
})

export const labelVertical = style({
  flexShrink: 0,
  fontSize: '13px',
  fontWeight: vars.font.weight.medium,
  color: vars.color.text,
  whiteSpace: 'nowrap',
  marginBottom: vars.space[2],
})

export const required = style({
  color: vars.color.danger,
  marginLeft: '2px',
})

export const content = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
})

export const error = style({
  fontSize: vars.font.size.xs,
  color: vars.color.danger,
  margin: 0,
  marginTop: vars.space[1],
})

export const helpText = style({
  fontSize: vars.font.size.xs,
  color: vars.color.textDisabled,
  margin: 0,
  marginTop: vars.space[1],
})

export type FormFieldDirection = 'horizontal' | 'vertical'
