import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  gap: vars.space[4],
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.space[2]} ${vars.space[4]}`,
  borderBottom: `1px solid ${vars.color.border}`,
})

export const headerMain = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[1],
})

export const title = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.bold,
  margin: 0,
  color: vars.color.text,
})

export const description = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textDisabled,
})

export const headerRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
})
