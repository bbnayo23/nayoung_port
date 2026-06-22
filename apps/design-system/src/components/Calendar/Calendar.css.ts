import { globalStyle, style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const wrapper = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
})

const rdpCellSize = 32

globalStyle(`${wrapper} .rdp-root`, {
  // @ts-expect-error CSS custom properties
  '--rdp-accent-color': vars.color.brand[600],
  '--rdp-accent-background-color': `rgba(113, 135, 255, 0.1)`,
  '--rdp-day-height': `${rdpCellSize}px`,
  '--rdp-day-width': `${rdpCellSize}px`,
  '--rdp-day_button-width': `${rdpCellSize}px`,
  '--rdp-day_button-height': `${rdpCellSize}px`,
  fontFamily: vars.font.family.sans,
})

globalStyle(`${wrapper} .rdp-chevron`, {
  fill: vars.color.textSecondary,
})

globalStyle(`${wrapper} .rdp-nav`, {
  justifyContent: 'space-between',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  padding: `0 ${vars.space[2]}`,
  height: 'var(--rdp-day-height)',
  zIndex: 1,
  pointerEvents: 'none',
})

globalStyle(`${wrapper} .rdp-button_previous, ${wrapper} .rdp-button_next`, {
  pointerEvents: 'auto',
})

globalStyle(`${wrapper} .rdp-month_caption`, {
  color: vars.color.text,
  fontWeight: vars.font.weight.medium,
  fontSize: vars.font.size.md,
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
})

globalStyle(`${wrapper} .rdp-month`, {
  position: 'relative',
})

globalStyle(`${wrapper} .rdp-weekday`, {
  color: vars.color.textDisabled,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
})

// 일요일 (첫 번째 열) 빨간색
globalStyle(`${wrapper} .rdp-weekday:first-child`, {
  color: vars.color.danger,
})

globalStyle(`${wrapper} .rdp-day:nth-child(7n+1)`, {
  color: vars.color.danger,
})

globalStyle(`${wrapper} .rdp-day`, {
  color: vars.color.text,
  borderRadius: vars.radius.full,
  transition: `all ${vars.duration.fast} ease`,
})

globalStyle(`${wrapper} .rdp-day:hover`, {
  backgroundColor: vars.color.surfaceMuted,
})

globalStyle(`${wrapper} .rdp-today`, {
  fontWeight: vars.font.weight.bold,
  color: vars.color.brand[600],
})

globalStyle(`${wrapper} .rdp-selected .rdp-day_button`, {
  backgroundColor: vars.color.brand[600],
  color: vars.color.textInverse,
  borderRadius: vars.radius.full,
})

globalStyle(`${wrapper} .rdp-outside`, {
  color: vars.color.textDisabled,
  opacity: 0.4,
})

globalStyle(`${wrapper} .rdp-range_middle`, {
  backgroundColor: `rgba(113, 135, 255, 0.1)`,
})

// disabled는 다른 상태(today, selected, 일요일 등)보다 항상 우선
globalStyle(`${wrapper} .rdp-disabled`, {
  opacity: 0.3,
  cursor: 'not-allowed',
  pointerEvents: 'none',
  color: `${vars.color.textDisabled} !important`,
  fontWeight: `${vars.font.weight.regular} !important`,
  backgroundColor: 'transparent !important',
  textDecoration: 'line-through',
})

globalStyle(`${wrapper} .rdp-disabled .rdp-day_button`, {
  backgroundColor: 'transparent !important',
  color: 'inherit !important',
})
