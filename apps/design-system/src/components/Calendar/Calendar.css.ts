import { globalStyle, style } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

export const wrapper = style({
  fontFamily: vars.font.family,
  fontSize: vars.font.sizeSm,
})

const rdpCellSize = 32

globalStyle(`${wrapper} .rdp-root`, {
  // @ts-expect-error CSS custom properties
  '--rdp-accent-color': vars.color.primary,
  '--rdp-accent-background-color': vars.color.primarySoft,
  '--rdp-day-height': `${rdpCellSize}px`,
  '--rdp-day-width': `${rdpCellSize}px`,
  '--rdp-day_button-width': `${rdpCellSize}px`,
  '--rdp-day_button-height': `${rdpCellSize}px`,
  '--rdp-nav-height': `${rdpCellSize}px`,
  fontFamily: vars.font.family,
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
  padding: `0 ${vars.spacing.sm}`,
  height: 'var(--rdp-day-height)',
  zIndex: 1,
  pointerEvents: 'none',
})

globalStyle(`${wrapper} .rdp-button_previous, ${wrapper} .rdp-button_next`, {
  pointerEvents: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: `${rdpCellSize}px`,
  height: `${rdpCellSize}px`,
  color: vars.color.textSecondary,
  flexShrink: 0,
})

globalStyle(`${wrapper} .rdp-month_caption`, {
  color: vars.color.text,
  fontWeight: vars.font.weightMedium,
  fontSize: vars.font.sizeMd,
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
})

globalStyle(`${wrapper} .rdp-month`, {
  position: 'relative',
})

globalStyle(`${wrapper} .rdp-weekday`, {
  color: vars.color.textMuted,
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightMedium,
})

globalStyle(`${wrapper} .rdp-weekday:first-child`, {
  color: vars.color.error,
})

globalStyle(`${wrapper} .rdp-day:nth-child(7n+1)`, {
  color: vars.color.error,
})

globalStyle(`${wrapper} .rdp-day`, {
  color: vars.color.text,
  borderRadius: vars.radius.full,
  transition: vars.transition.fast,
})

globalStyle(`${wrapper} .rdp-day:hover`, {
  backgroundColor: vars.color.surfaceHover,
})

globalStyle(`${wrapper} .rdp-today`, {
  fontWeight: vars.font.weightBold,
  color: vars.color.primary,
})

globalStyle(`${wrapper} .rdp-today:not(.rdp-selected) .rdp-day_button`, {
  boxShadow: `inset 0 0 0 2px ${vars.color.primary}`,
  borderRadius: vars.radius.full,
})

globalStyle(`${wrapper} .rdp-day_button`, {
  border: 'none',
  fontSize: vars.font.sizeSm,
})

globalStyle(`${wrapper} .rdp-selected .rdp-day_button`, {
  backgroundColor: vars.color.primary,
  color: vars.color.textInverse,
  borderRadius: vars.radius.full,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightNormal,
})

globalStyle(`${wrapper} .rdp-outside`, {
  color: vars.color.textMuted,
})

globalStyle(`${wrapper} .rdp-range_middle`, {
  backgroundColor: vars.color.primarySoft,
})

globalStyle(`${wrapper} .rdp-disabled`, {
  opacity: 0.4,
  cursor: 'not-allowed',
  pointerEvents: 'none',
  color: `${vars.color.textMuted} !important`,
  fontWeight: `${vars.font.weightNormal} !important`,
  backgroundColor: 'transparent !important',
  textDecoration: 'line-through',
})

globalStyle(`${wrapper} .rdp-disabled .rdp-day_button`, {
  backgroundColor: 'transparent !important',
  color: 'inherit !important',
})
