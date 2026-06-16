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

export const block = style({
  padding: vars.space['6'],
  borderRadius: vars.radius.xl,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
})

export const blockFull = style({
  gridColumn: '1 / -1',
  padding: vars.space['6'],
  borderRadius: vars.radius.xl,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
})

export const blockTitle = style({
  fontSize: vars.fontSize.sm,
  fontFamily: vars.font.mono,
  fontWeight: 500,
  color: vars.color.textSecondary,
  marginBottom: vars.space['5'],
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
})

export const diagram = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.sm,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.relaxed,
  background: vars.color.bg,
  borderRadius: vars.radius.lg,
  padding: vars.space['5'],
  border: `1px solid ${vars.color.border}`,
  overflowX: 'auto',
  whiteSpace: 'pre',
})

export const diagramHighlight = style({
  color: vars.color.accent,
})

export const tokenRow = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['3'],
})

export const tokenItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space['3'],
  paddingTop: vars.space['3'],
  paddingBottom: vars.space['3'],
  borderBottom: `1px solid ${vars.color.border}`,
  ':last-child': {
    borderBottom: 'none',
  },
})

export const tokenName = style({
  fontSize: vars.fontSize.sm,
  fontFamily: vars.font.mono,
  color: vars.color.text,
})

export const tokenValue = style({
  fontSize: vars.fontSize.xs,
  fontFamily: vars.font.mono,
  color: vars.color.textTertiary,
  textAlign: 'right',
})

export const ruleList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['3'],
})

export const ruleItem = style({
  display: 'flex',
  gap: vars.space['3'],
  alignItems: 'flex-start',
})

export const ruleNum = style({
  fontSize: vars.fontSize.xs,
  fontFamily: vars.font.mono,
  color: vars.color.accent,
  fontWeight: 500,
  minWidth: '20px',
  paddingTop: '1px',
})

export const ruleText = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.normal,
})
