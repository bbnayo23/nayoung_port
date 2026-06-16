import { style } from '@vanilla-extract/css'
import { swiss } from '../../styles/swiss'

export const section = style({
  paddingBlock: '104px',
  paddingInline: '56px',
  borderTop: `1px solid ${swiss.color.line}`,
  '@media': {
    'screen and (max-width: 900px)': { paddingBlock: '72px', paddingInline: '28px' },
    'screen and (max-width: 560px)': { paddingInline: '20px' },
  },
})

export const inner = style({
  maxWidth: '1240px',
  margin: '0 auto',
})

export const sectionTag = style({
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: swiss.font.mono,
  fontSize: '12px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: swiss.color.inkSoft,
  marginBottom: '20px',
  selectors: {
    '&::before': {
      content: '""',
      display: 'inline-block',
      width: '8px',
      height: '8px',
      marginRight: '10px',
      backgroundImage: swiss.gradient,
    },
  },
})

export const sectionTitle = style({
  fontFamily: swiss.font.sans,
  fontWeight: 800,
  fontSize: 'clamp(36px, 6vw, 76px)',
  lineHeight: '0.95',
  letterSpacing: '-0.035em',
  textTransform: 'uppercase',
  color: swiss.color.ink,
  marginBottom: '56px',
  '@media': {
    'screen and (max-width: 640px)': { marginBottom: '40px' },
  },
})

export const items = style({
  display: 'flex',
  flexDirection: 'column',
})

export const item = style({
  display: 'grid',
  gridTemplateColumns: '220px 1fr',
  gap: '32px',
  padding: '32px 0',
  borderTop: `1px solid ${swiss.color.line}`,
  transition: `padding-left 0.45s ${swiss.ease.smooth}, background 0.3s ease, box-shadow 0.45s ${swiss.ease.smooth}`,
  selectors: {
    '&:last-child': { borderBottom: `1px solid ${swiss.color.line}` },
    '&:hover': {
      paddingLeft: '20px',
      background: `${swiss.color.accentSoft}12`,
      boxShadow: `inset 3px 0 0 ${swiss.color.accent}`,
    },
  },
  '@media': {
    'screen and (max-width: 700px)': { gridTemplateColumns: '1fr', gap: '16px' },
  },
})

export const itemMeta = style({})

export const period = style({
  fontSize: '13px',
  fontFamily: swiss.font.mono,
  color: swiss.color.accent,
  marginBottom: '6px',
})

export const company = style({
  fontSize: '16px',
  fontWeight: 600,
  color: swiss.color.ink,
})

export const itemBody = style({})

export const itemRole = style({
  fontFamily: swiss.font.sans,
  fontSize: '24px',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: swiss.color.ink,
  marginBottom: '10px',
})

export const itemDesc = style({
  fontSize: '15px',
  color: swiss.color.inkSoft,
  lineHeight: '1.6',
  marginBottom: '24px',
})

export const highlights = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  marginBottom: '24px',
})

export const highlight = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: '14px',
  alignItems: 'start',
})

export const highlightDot = style({
  width: '7px',
  height: '7px',
  background: swiss.color.accent,
  marginTop: '7px',
  flexShrink: 0,
})

export const highlightContent = style({})

export const highlightTitle = style({
  fontSize: '14px',
  fontWeight: 600,
  color: swiss.color.ink,
  marginBottom: '3px',
})

export const highlightDetail = style({
  fontSize: '14px',
  color: swiss.color.inkSoft,
})

export const tags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})
