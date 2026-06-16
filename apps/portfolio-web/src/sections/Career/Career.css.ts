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

export const items = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['1'],
})

export const item = style({
  display: 'grid',
  gridTemplateColumns: '200px 1fr',
  gap: vars.space['8'],
  paddingTop: vars.space['8'],
  paddingBottom: vars.space['8'],
  borderTop: `1px solid ${vars.color.border}`,
  ':last-child': {
    borderBottom: `1px solid ${vars.color.border}`,
  },
  '@media': {
    'screen and (max-width: 700px)': {
      gridTemplateColumns: '1fr',
      gap: vars.space['4'],
    },
  },
})

export const itemMeta = style({})

export const period = style({
  fontSize: vars.fontSize.sm,
  fontFamily: vars.font.mono,
  color: vars.color.textTertiary,
  marginBottom: vars.space['1'],
})

export const company = style({
  fontSize: vars.fontSize.base,
  fontWeight: 500,
  color: vars.color.text,
})

export const itemBody = style({})

export const itemRole = style({
  fontSize: vars.fontSize.lg,
  fontWeight: 600,
  color: vars.color.text,
  marginBottom: vars.space['2'],
})

export const itemDesc = style({
  fontSize: vars.fontSize.base,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.normal,
  marginBottom: vars.space['5'],
})

export const highlights = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['3'],
  marginBottom: vars.space['5'],
})

export const highlight = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: vars.space['3'],
  alignItems: 'start',
})

export const highlightDot = style({
  width: '5px',
  height: '5px',
  borderRadius: vars.radius.full,
  background: vars.color.accent,
  marginTop: '7px',
  flexShrink: 0,
})

export const highlightContent = style({})

export const highlightTitle = style({
  fontSize: vars.fontSize.sm,
  fontWeight: 500,
  color: vars.color.text,
  marginBottom: vars.space['1'],
})

export const highlightDetail = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textSecondary,
})

export const tags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space['2'],
})
