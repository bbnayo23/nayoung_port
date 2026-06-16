import { style, styleVariants } from '@vanilla-extract/css'
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
  marginBottom: vars.space['16'],
  '@media': {
    'screen and (max-width: 640px)': {
      fontSize: vars.fontSize['2xl'],
      marginBottom: vars.space['10'],
    },
  },
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: vars.space['4'],
  '@media': {
    'screen and (max-width: 700px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  padding: vars.space['6'],
  borderRadius: vars.radius.xl,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  transition: `border-color ${vars.transition.base}, background ${vars.transition.base}`,
  ':hover': {
    borderColor: vars.color.borderHover,
    background: vars.color.surfaceHover,
  },
})

export const cardHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: vars.space['3'],
  marginBottom: vars.space['3'],
})

export const cardName = style({
  fontSize: vars.fontSize.lg,
  fontWeight: 600,
  color: vars.color.text,
})

const statusBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['1'],
  paddingTop: vars.space['1'],
  paddingBottom: vars.space['1'],
  paddingLeft: vars.space['2'],
  paddingRight: vars.space['2'],
  borderRadius: vars.radius.full,
  fontSize: vars.fontSize.xs,
  fontFamily: vars.font.mono,
  fontWeight: 500,
  border: '1px solid',
  whiteSpace: 'nowrap',
  flexShrink: 0,
})

export const statusBadge = styleVariants({
  shipped: [statusBase, {
    color: vars.color.green,
    background: vars.color.greenSubtle,
    borderColor: vars.color.greenBorder,
  }],
  'in-progress': [statusBase, {
    color: vars.color.accent,
    background: vars.color.accentSubtle,
    borderColor: vars.color.accentBorder,
  }],
  experiment: [statusBase, {
    color: vars.color.purple,
    background: vars.color.purpleSubtle,
    borderColor: vars.color.purpleBorder,
  }],
})

export const cardTagline = style({
  fontSize: vars.fontSize.sm,
  fontFamily: vars.font.mono,
  color: vars.color.textTertiary,
  marginBottom: vars.space['3'],
})

export const cardDesc = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.relaxed,
  flexGrow: 1,
  marginBottom: vars.space['5'],
})

export const cardFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space['3'],
  marginTop: 'auto',
})

export const cardTags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space['2'],
})

export const cardLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['1'],
  fontSize: vars.fontSize.sm,
  color: vars.color.accent,
  fontWeight: 500,
  whiteSpace: 'nowrap',
  transition: `color ${vars.transition.fast}`,
  ':hover': {
    color: vars.color.accentHover,
  },
})
