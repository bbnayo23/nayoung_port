import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[4],
  width: '100%',
  height: '100%',
  minHeight: 300,
  padding: vars.space[8],
  textAlign: 'center',
})

export const title = style({
  margin: 0,
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text,
})

export const description = style({
  margin: 0,
  maxWidth: 480,
  fontSize: vars.font.size.sm,
  color: vars.color.textDisabled,
  wordBreak: 'break-word',
})
