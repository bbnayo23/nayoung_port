import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '../../styles/tokens.css'

const fadeUp = keyframes({
  from: { opacity: '0', transform: 'translateY(20px)' },
  to: { opacity: '1', transform: 'translateY(0)' },
})

export const section = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100svh',
  paddingTop: vars.space['32'],
  paddingBottom: vars.space['24'],
  paddingLeft: vars.space['8'],
  paddingRight: vars.space['8'],
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 768px)': {
      paddingTop: vars.space['24'],
      paddingBottom: vars.space['16'],
      paddingLeft: vars.space['5'],
      paddingRight: vars.space['5'],
    },
  },
})

export const bg = style({
  position: 'absolute',
  inset: 0,
  backgroundImage:
    'radial-gradient(ellipse 1000px 600px at 65% -50px, rgba(91, 141, 238, 0.07), transparent 70%), linear-gradient(rgba(255, 255, 255, 0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px)',
  backgroundSize: 'auto, 64px 64px, 64px 64px',
  pointerEvents: 'none',
  userSelect: 'none',
})

export const content = style({
  position: 'relative',
  maxWidth: '880px',
})

export const statusRow = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['2'],
  marginBottom: vars.space['8'],
  animation: `${fadeUp} 0.5s ease both`,
})

export const statusDot = style({
  width: '6px',
  height: '6px',
  borderRadius: vars.radius.full,
  background: vars.color.green,
  boxShadow: `0 0 10px ${vars.color.green}`,
  flexShrink: 0,
})

export const statusLabel = style({
  fontSize: vars.fontSize.xs,
  fontFamily: vars.font.mono,
  color: vars.color.textSecondary,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
})

export const name = style({
  fontSize: vars.fontSize['6xl'],
  fontWeight: 700,
  letterSpacing: '-3px',
  lineHeight: vars.lineHeight.tight,
  color: vars.color.text,
  marginBottom: vars.space['5'],
  animation: `${fadeUp} 0.5s 0.08s ease both`,
  '@media': {
    'screen and (max-width: 900px)': {
      fontSize: vars.fontSize['5xl'],
      letterSpacing: '-2px',
    },
    'screen and (max-width: 640px)': {
      fontSize: vars.fontSize['4xl'],
      letterSpacing: '-1.5px',
    },
    'screen and (max-width: 400px)': {
      fontSize: vars.fontSize['3xl'],
      letterSpacing: '-1px',
    },
  },
})

export const roles = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space['3'],
  marginBottom: vars.space['8'],
  animation: `${fadeUp} 0.5s 0.16s ease both`,
})

export const role = style({
  fontSize: vars.fontSize.md,
  color: vars.color.textSecondary,
  fontWeight: 400,
})

export const roleSep = style({
  fontSize: vars.fontSize.md,
  color: vars.color.textTertiary,
  fontWeight: 300,
  userSelect: 'none',
})

export const bio = style({
  fontSize: vars.fontSize.lg,
  lineHeight: vars.lineHeight.relaxed,
  color: vars.color.textSecondary,
  maxWidth: '520px',
  marginBottom: vars.space['10'],
  animation: `${fadeUp} 0.5s 0.24s ease both`,
  whiteSpace: 'pre-line',
  '@media': {
    'screen and (max-width: 640px)': {
      fontSize: vars.fontSize.md,
    },
  },
})

export const stack = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space['2'],
  animation: `${fadeUp} 0.5s 0.32s ease both`,
})

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['3'],
  marginTop: vars.space['8'],
  animation: `${fadeUp} 0.5s 0.4s ease both`,
})

export const primaryBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['2'],
  paddingTop: vars.space['3'],
  paddingBottom: vars.space['3'],
  paddingLeft: vars.space['5'],
  paddingRight: vars.space['5'],
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  fontWeight: 500,
  color: vars.color.bg,
  background: vars.color.text,
  border: `1px solid ${vars.color.text}`,
  transition: `opacity ${vars.transition.fast}`,
  ':hover': {
    opacity: '0.85',
  },
})

export const secondaryBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['2'],
  paddingTop: vars.space['3'],
  paddingBottom: vars.space['3'],
  paddingLeft: vars.space['5'],
  paddingRight: vars.space['5'],
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  fontWeight: 500,
  color: vars.color.textSecondary,
  background: 'transparent',
  border: `1px solid ${vars.color.border}`,
  transition: `color ${vars.transition.fast}, border-color ${vars.transition.fast}`,
  ':hover': {
    color: vars.color.text,
    borderColor: vars.color.borderHover,
  },
})

export const scrollHint = style({
  position: 'absolute',
  bottom: vars.space['10'],
  left: vars.space['8'],
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['3'],
  animation: `${fadeUp} 0.5s 0.6s ease both`,
  '@media': {
    'screen and (max-width: 768px)': {
      left: vars.space['5'],
    },
    'screen and (max-width: 480px)': {
      display: 'none',
    },
  },
})

export const scrollLine = style({
  width: '28px',
  height: '1px',
  background: vars.color.textTertiary,
})

export const scrollLabel = style({
  fontSize: vars.fontSize.xs,
  fontFamily: vars.font.mono,
  color: vars.color.textTertiary,
  letterSpacing: '0.06em',
})
