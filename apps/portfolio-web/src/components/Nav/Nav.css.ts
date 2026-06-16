import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/tokens.css'

export const header = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: vars.space['8'],
  paddingRight: vars.space['8'],
  borderBottom: `1px solid transparent`,
  transition: `background ${vars.transition.base}, border-color ${vars.transition.base}`,
  '@media': {
    'screen and (max-width: 768px)': {
      paddingLeft: vars.space['5'],
      paddingRight: vars.space['5'],
    },
  },
})

export const headerScrolled = style({
  background: 'rgba(9, 9, 9, 0.88)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderBottomColor: vars.color.border,
})

export const logo = style({
  fontSize: vars.fontSize.lg,
  fontWeight: 700,
  letterSpacing: '-0.5px',
  color: vars.color.text,
  transition: `color ${vars.transition.base}`,
  ':hover': {
    color: vars.color.accent,
  },
})

export const nav = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['8'],
})

export const navList = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['6'],
  '@media': {
    'screen and (max-width: 600px)': {
      display: 'none',
    },
  },
})

export const navLink = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textSecondary,
  transition: `color ${vars.transition.base}`,
  ':hover': {
    color: vars.color.text,
  },
})

export const contactBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['2'],
  paddingTop: vars.space['2'],
  paddingBottom: vars.space['2'],
  paddingLeft: vars.space['4'],
  paddingRight: vars.space['4'],
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  fontWeight: 500,
  color: vars.color.text,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  transition: `border-color ${vars.transition.base}, background ${vars.transition.base}`,
  ':hover': {
    background: vars.color.surfaceHover,
    borderColor: vars.color.borderHover,
  },
  '@media': {
    'screen and (max-width: 400px)': {
      display: 'none',
    },
  },
})
