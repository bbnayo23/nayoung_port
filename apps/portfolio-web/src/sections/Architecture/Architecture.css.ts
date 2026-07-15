import { style } from '@vanilla-extract/css'
import { swiss } from '@/styles/swiss'
import { glassPanel } from '@/styles/glass.css'

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

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px',
  '@media': {
    'screen and (max-width: 700px)': { gridTemplateColumns: '1fr' },
  },
})

export const block = style([glassPanel, {
  padding: '28px',
  borderRadius: '16px',
}])

export const blockFull = style([glassPanel, {
  padding: '28px',
  borderRadius: '16px',
  gridColumn: '1 / -1',
}])

export const blockTitle = style({
  fontFamily: swiss.font.mono,
  fontSize: '12px',
  fontWeight: 500,
  color: swiss.color.inkSoft,
  marginBottom: '20px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
})

export const diagram = style({
  fontFamily: swiss.font.mono,
  fontSize: '13px',
  color: swiss.color.inkSoft,
  lineHeight: '1.75',
  background: swiss.color.paperAlt,
  borderRadius: '2px',
  padding: '20px',
  border: `1px solid ${swiss.color.line}`,
  overflowX: 'auto',
  whiteSpace: 'pre',
})

export const diagramHighlight = style({
  color: swiss.color.accent,
  fontWeight: 600,
})

export const tokenRow = style({
  display: 'flex',
  flexDirection: 'column',
})

export const tokenItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '12px 0',
  borderBottom: `1px solid ${swiss.color.line}`,
  ':last-child': { borderBottom: 'none' },
})

export const tokenName = style({
  fontSize: '13px',
  fontFamily: swiss.font.mono,
  color: swiss.color.ink,
})

export const tokenValue = style({
  fontSize: '12px',
  fontFamily: swiss.font.mono,
  color: swiss.color.inkFaint,
  textAlign: 'right',
})

export const ruleList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
})

export const ruleItem = style({
  display: 'flex',
  gap: '14px',
  alignItems: 'flex-start',
})

export const ruleNum = style({
  fontSize: '12px',
  fontFamily: swiss.font.mono,
  color: swiss.color.accent,
  fontWeight: 600,
  minWidth: '22px',
  paddingTop: '2px',
})

export const ruleText = style({
  fontSize: '14px',
  color: swiss.color.inkSoft,
  lineHeight: '1.6',
})
