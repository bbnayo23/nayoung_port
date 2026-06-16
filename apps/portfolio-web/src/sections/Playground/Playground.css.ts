import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/tokens.css'

export const section = style({
  paddingTop: vars.space['24'],
  paddingBottom: vars.space['24'],
  paddingLeft: vars.space['8'],
  paddingRight: vars.space['8'],
  background: vars.color.bgSecondary,
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
  fontSize: vars.fontSize.md,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.normal,
  maxWidth: '500px',
  marginBottom: vars.space['16'],
  '@media': {
    'screen and (max-width: 640px)': {
      marginBottom: vars.space['10'],
    },
  },
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: vars.space['4'],
  '@media': {
    'screen and (max-width: 800px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    'screen and (max-width: 500px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  padding: vars.space['5'],
  borderRadius: vars.radius.xl,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  transition: `border-color ${vars.transition.base}`,
  ':hover': {
    borderColor: vars.color.borderHover,
  },
})

export const cardIcon = style({
  width: '36px',
  height: '36px',
  borderRadius: vars.radius.md,
  background: vars.color.purpleSubtle,
  border: `1px solid ${vars.color.purpleBorder}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: vars.space['4'],
  fontSize: vars.fontSize.md,
})

export const cardTitle = style({
  fontSize: vars.fontSize.base,
  fontWeight: 600,
  color: vars.color.text,
  marginBottom: vars.space['2'],
})

export const cardDesc = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.relaxed,
  flexGrow: 1,
  marginBottom: vars.space['4'],
})

export const cardTags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space['2'],
  marginTop: 'auto',
})

export const wip = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['2'],
  paddingTop: vars.space['1'],
  paddingBottom: vars.space['1'],
  paddingLeft: vars.space['2'],
  paddingRight: vars.space['2'],
  borderRadius: vars.radius.full,
  fontSize: vars.fontSize.xs,
  fontFamily: vars.font.mono,
  border: `1px solid`,
})
