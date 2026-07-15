import { style } from '@vanilla-extract/css'
import { swiss } from '@/styles/swiss'
import { glassPanel } from '@/styles/glass.css'

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
  marginBottom: '16px',
  '@media': {
    'screen and (max-width: 640px)': { fontSize: 'clamp(32px, 9vw, 48px)' },
  },
})

export const sectionDesc = style({
  fontSize: '16px',
  color: swiss.color.inkSoft,
  lineHeight: '1.6',
  maxWidth: '520px',
  marginBottom: '56px',
  '@media': {
    'screen and (max-width: 640px)': { marginBottom: '40px' },
  },
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  '@media': {
    'screen and (max-width: 800px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
    'screen and (max-width: 500px)': { gridTemplateColumns: '1fr' },
  },
})

export const card = style([glassPanel, {
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
  borderRadius: '16px',
  selectors: {
    '&:hover': {
      borderColor: `${swiss.color.accent}66`,
      boxShadow: '0 24px 54px rgba(13,148,136,0.16), inset 0 1px 0 rgba(255,255,255,0.75)',
    },
  },
}])

export const cardIcon = style({
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  background: `${swiss.color.accentSoft}1f`,
  border: `1px solid ${swiss.color.accent}55`,
  color: swiss.color.accentDeep,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '18px',
  fontSize: '17px',
  transition: `transform 0.6s ${swiss.ease.smooth}, background 0.3s ease`,
  selectors: {
    [`${card}:hover &`]: { transform: 'rotate(-12deg) scale(1.08)', background: `${swiss.color.accentSoft}33` },
  },
})

export const cardTitle = style({
  fontFamily: swiss.font.sans,
  fontSize: '18px',
  fontWeight: 700,
  letterSpacing: '-0.01em',
  color: swiss.color.ink,
  marginBottom: '8px',
})

export const cardDesc = style({
  fontSize: '14px',
  color: swiss.color.inkSoft,
  lineHeight: '1.7',
  flexGrow: 1,
  marginBottom: '18px',
})

export const cardTags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: 'auto',
})
