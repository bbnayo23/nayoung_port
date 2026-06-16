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
  fontSize: 'clamp(40px, 8vw, 96px)',
  lineHeight: '0.95',
  letterSpacing: '-0.035em',
  textTransform: 'uppercase',
  color: swiss.color.ink,
  marginBottom: '16px',
})

export const sectionDesc = style({
  fontSize: '18px',
  color: swiss.color.inkSoft,
  lineHeight: '1.6',
  maxWidth: '500px',
  marginBottom: '48px',
  '@media': {
    'screen and (max-width: 640px)': { fontSize: '16px' },
  },
})

export const links = style({
  display: 'flex',
  flexDirection: 'column',
  borderTop: `1px solid ${swiss.color.ink}`,
  maxWidth: '640px',
})

export const link = style({
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px 4px',
  borderBottom: `1px solid ${swiss.color.line}`,
  color: swiss.color.ink,
  transition: `padding-left 0.45s ${swiss.ease.smooth}, background 0.3s ease`,
  selectors: {
    // 대각선 샤인 스윕
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-60%',
      width: '40%',
      height: '100%',
      background: `linear-gradient(105deg, transparent, ${swiss.color.accentSoft}33, transparent)`,
      transform: 'skewX(-18deg)',
      transition: `left 0.6s ${swiss.ease.smooth}`,
      pointerEvents: 'none',
    },
    '&:hover': { paddingLeft: '18px', background: `${swiss.color.accentSoft}10` },
    '&:hover::before': { left: '120%' },
  },
})

export const linkLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: '18px',
})

export const linkIcon = style({
  width: '40px',
  height: '40px',
  borderRadius: '2px',
  background: 'transparent',
  border: `1px solid ${swiss.color.line}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  flexShrink: 0,
})

export const linkLabel = style({
  fontFamily: swiss.font.sans,
  fontSize: '17px',
  fontWeight: 600,
  color: swiss.color.ink,
})

export const linkValue = style({
  fontSize: '13px',
  color: swiss.color.inkSoft,
  fontFamily: swiss.font.mono,
})

export const linkArrow = style({
  color: swiss.color.inkFaint,
  fontSize: '18px',
  transition: `transform 0.4s ${swiss.ease.smooth}, color 0.3s ease`,
  selectors: {
    [`${link}:hover &`]: { transform: 'translate(4px, -4px)', color: swiss.color.accent },
  },
})

export const footer = style({
  marginTop: '80px',
  paddingTop: '24px',
  borderTop: `1px solid ${swiss.color.line}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  fontFamily: swiss.font.mono,
  '@media': {
    'screen and (max-width: 500px)': { flexDirection: 'column', alignItems: 'flex-start' },
  },
})

export const footerLeft = style({
  fontSize: '13px',
  color: swiss.color.ink,
  fontFamily: swiss.font.mono,
})

export const footerRight = style({
  fontSize: '12px',
  color: swiss.color.inkFaint,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
})
