import { style, keyframes, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const slideInRight = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
})

const slideInLeft = keyframes({
  from: { transform: 'translateX(-100%)' },
  to: { transform: 'translateX(0)' },
})

export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  animation: `${fadeIn} 150ms ease-out`,
})

const panelBase = style({
  position: 'fixed',
  top: 0,
  bottom: 0,
  zIndex: 1001,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.lg,
  overflow: 'hidden',
})

export const panel = styleVariants({
  right: [
    panelBase,
    {
      right: 0,
      animation: `${slideInRight} 200ms ease-out`,
    },
  ],
  left: [
    panelBase,
    {
      left: 0,
      animation: `${slideInLeft} 200ms ease-out`,
    },
  ],
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.space[4]} ${vars.space[6]}`,
  borderBottom: `1px solid ${vars.color.border}`,
  fontWeight: vars.font.weight.medium,
  fontSize: vars.font.size.lg,
  color: vars.color.text,
  flexShrink: 0,
})

export const title = style({
  flex: 1,
})

export const closeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  border: 'none',
  background: 'transparent',
  color: vars.color.textSecondary,
  fontSize: vars.font.size.lg,
  cursor: 'pointer',
  borderRadius: vars.radius.sm,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.surfaceMuted,
      color: vars.color.text,
    },
  },
})

export const body = style({
  flex: 1,
  padding: vars.space[6],
  overflowY: 'auto',
  color: vars.color.text,
  fontSize: vars.font.size.md,
})

export type SidePanelSide = keyof typeof panel
