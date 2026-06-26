import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

export const root = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
})

export const nodeList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  paddingLeft: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
})

export const nodeContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '5px 8px',
  borderRadius: vars.radius.sm,
  cursor: 'pointer',
  transition: `background ${vars.transition.fast}, color ${vars.transition.fast}`,
  outline: 'none',
  color: vars.color.text,
  fontSize: vars.font.sizeSm,
  lineHeight: 1.4,
  userSelect: 'none',
})

globalStyle(`${nodeContent}:hover`, {
  background: vars.color.surfaceHover,
})

globalStyle(`${nodeContent}:focus-visible`, {
  boxShadow: `0 0 0 2px color-mix(in srgb, ${vars.color.primary} 30%, transparent)`,
})

export const nodeSelected = style({
  background: vars.color.primarySoft,
  color: vars.color.primary,
  fontWeight: 500,
})

globalStyle(`${nodeContent}${nodeSelected}:hover`, {
  background: vars.color.primarySoftStrong,
})

export const nodeDisabled = style({
  opacity: 0.4,
  cursor: 'not-allowed',
  pointerEvents: 'none',
})

export const chevron = style({
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  width: 16,
  height: 16,
  color: vars.color.textSecondary,
  transition: `transform ${vars.transition.fast}`,
  transform: 'rotate(-90deg)',
})

export const chevronExpanded = style({
  transform: 'rotate(0deg)',
})

export const chevronPlaceholder = style({
  width: 16,
  height: 16,
  flexShrink: 0,
  display: 'inline-block',
})

export const nodeLabel = style({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})
