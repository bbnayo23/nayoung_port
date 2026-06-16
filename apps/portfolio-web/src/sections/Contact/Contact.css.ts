import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/tokens.css'

export const section = style({
  paddingTop: vars.space['24'],
  paddingBottom: vars.space['24'],
  paddingLeft: vars.space['8'],
  paddingRight: vars.space['8'],
  '@media': {
    'screen and (max-width: 768px)': {
      paddingTop: vars.space['16'],
      paddingBottom: vars.space['16'],
      paddingLeft: vars.space['5'],
      paddingRight: vars.space['5'],
    },
  },
})

export const inner = style({
  maxWidth: '960px',
  margin: '0 auto',
})

export const sectionTag = style({
  display: 'inline-block',
  fontSize: vars.fontSize.xs,
  fontFamily: vars.font.mono,
  color: vars.color.textTertiary,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: vars.space['3'],
})

export const sectionTitle = style({
  fontSize: vars.fontSize['3xl'],
  fontWeight: 700,
  letterSpacing: '-1px',
  color: vars.color.text,
  marginBottom: vars.space['4'],
  '@media': {
    'screen and (max-width: 640px)': {
      fontSize: vars.fontSize['2xl'],
    },
  },
})

export const sectionDesc = style({
  fontSize: vars.fontSize.lg,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.normal,
  maxWidth: '480px',
  marginBottom: vars.space['12'],
  '@media': {
    'screen and (max-width: 640px)': {
      fontSize: vars.fontSize.md,
    },
  },
})

export const links = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['3'],
  maxWidth: '480px',
})

export const link = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: vars.space['5'],
  paddingBottom: vars.space['5'],
  paddingLeft: vars.space['5'],
  paddingRight: vars.space['5'],
  borderRadius: vars.radius.xl,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  color: vars.color.text,
  transition: `border-color ${vars.transition.base}, background ${vars.transition.base}`,
  ':hover': {
    borderColor: vars.color.borderHover,
    background: vars.color.surfaceHover,
  },
})

export const linkLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['4'],
})

export const linkIcon = style({
  width: '36px',
  height: '36px',
  borderRadius: vars.radius.md,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: vars.fontSize.md,
  flexShrink: 0,
})

export const linkLabel = style({
  fontSize: vars.fontSize.base,
  fontWeight: 500,
  color: vars.color.text,
})

export const linkValue = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textSecondary,
  fontFamily: vars.font.mono,
})

export const linkArrow = style({
  color: vars.color.textTertiary,
  fontSize: vars.fontSize.md,
})

export const footer = style({
  marginTop: vars.space['20'],
  paddingTop: vars.space['6'],
  borderTop: `1px solid ${vars.color.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space['4'],
  '@media': {
    'screen and (max-width: 500px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
})

export const footerLeft = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textTertiary,
  fontFamily: vars.font.mono,
})

export const footerRight = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textTertiary,
})
