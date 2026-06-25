import { style, styleVariants } from '@vanilla-extract/css'
import { swiss } from '../../styles/swiss'
import { glassPanel } from '../../styles/glass.css'

export const section = style({
  paddingBlock: '104px',
  paddingInline: '56px',
  background: swiss.glass.tint,
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

export const card = style([glassPanel, {
  display: 'flex',
  flexDirection: 'column',
  padding: '28px',
  borderRadius: '16px',
  color: 'inherit',
  textDecoration: 'none',
  selectors: {
    '&:hover': {
      borderColor: `${swiss.color.accent}66`,
      boxShadow: '0 24px 54px rgba(13,148,136,0.16), inset 0 1px 0 rgba(255,255,255,0.75)',
    },
  },
}])

// 링크형 카드 — 카드 전체가 클릭 가능
export const cardClickable = style({
  cursor: 'pointer',
})

export const cardHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '12px',
  marginBottom: '14px',
})

export const cardName = style({
  fontFamily: swiss.font.sans,
  fontSize: '22px',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: swiss.color.ink,
})

const statusBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  padding: '4px 9px',
  borderRadius: '2px',
  fontSize: '11px',
  fontFamily: swiss.font.mono,
  fontWeight: 500,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  border: '1px solid',
  whiteSpace: 'nowrap',
  flexShrink: 0,
})

export const statusBadge = styleVariants({
  shipped: [statusBase, { color: swiss.color.ink, borderColor: swiss.color.ink }],
  'in-progress': [statusBase, { color: swiss.color.accent, borderColor: `${swiss.color.accent}66` }],
  experiment: [statusBase, { color: swiss.color.inkSoft, borderColor: swiss.color.line, borderStyle: 'dashed' }],
})

export const cardTagline = style({
  fontSize: '13px',
  fontFamily: swiss.font.mono,
  color: swiss.color.inkFaint,
  marginBottom: '14px',
})

export const cardDesc = style({
  fontSize: '14px',
  color: swiss.color.inkSoft,
  lineHeight: '1.7',
  flexGrow: 1,
  marginBottom: '24px',
})

export const cardFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  marginTop: 'auto',
})

export const cardTags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

export const cardLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  fontFamily: swiss.font.sans,
  fontSize: '14px',
  fontWeight: 600,
  color: swiss.color.ink,
  whiteSpace: 'nowrap',
  transition: `color 0.3s ease, transform 0.4s ${swiss.ease.smooth}`,
  ':hover': { color: swiss.color.accent, transform: 'translateX(3px)' },
})
