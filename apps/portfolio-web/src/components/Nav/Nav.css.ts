import { style } from '@vanilla-extract/css'
import { swiss } from '../../styles/swiss'

export const header = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingInline: '56px',
  color: swiss.color.ink,
  borderBottom: '1px solid transparent',
  transition: `background 0.45s ${swiss.ease.smooth}, border-color 0.45s ${swiss.ease.smooth}`,
  '@media': {
    'screen and (max-width: 900px)': { paddingInline: '28px' },
    'screen and (max-width: 560px)': { paddingInline: '20px' },
  },
})

export const headerScrolled = style({
  background: swiss.glass.bg,
  backdropFilter: swiss.glass.blur,
  WebkitBackdropFilter: swiss.glass.blur,
  borderBottomColor: `${swiss.color.accent}33`,
})

export const logo = style({
  display: 'inline-flex',
  alignItems: 'baseline',
  fontFamily: swiss.font.sans,
  fontSize: '20px',
  fontWeight: 800,
  letterSpacing: '-0.03em',
  textTransform: 'lowercase',
  color: swiss.color.ink,
  transition: `color 0.3s ease`,
  ':hover': { color: swiss.color.accent },
})

export const logoExpand = style({
  display: 'inline-block',
  overflow: 'hidden',
  maxWidth: 0,
  opacity: 0,
  whiteSpace: 'nowrap',
  fontFamily: swiss.font.mono,
  fontSize: '12px',
  fontWeight: 400,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: swiss.color.accent,
  transition: `max-width 0.4s ${swiss.ease.soft}, opacity 0.3s ease, margin-left 0.4s ${swiss.ease.soft}`,
  selectors: {
    [`${logo}:hover &`]: { maxWidth: '160px', opacity: 1, marginLeft: '10px' },
  },
})

export const nav = style({
  display: 'flex',
  alignItems: 'center',
  gap: '28px',
})

export const navList = style({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  '@media': {
    'screen and (max-width: 600px)': { display: 'none' },
  },
})

export const navLink = style({
  position: 'relative',
  fontFamily: swiss.font.sans,
  fontSize: '14px',
  fontWeight: 500,
  color: swiss.color.inkSoft,
  transition: 'color 0.3s ease',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '-5px',
      height: '2px',
      background: swiss.color.accent,
      transformOrigin: 'left center',
      transform: 'scaleX(0)',
      transition: `transform 0.35s ${swiss.ease.soft}`,
    },
    '&:hover': { color: swiss.color.ink },
    '&:hover::after': { transform: 'scaleX(1)' },
  },
})

export const contactBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '9px 18px',
  fontFamily: swiss.font.sans,
  fontSize: '14px',
  fontWeight: 600,
  color: swiss.color.paper,
  background: swiss.color.ink,
  border: `1px solid ${swiss.color.ink}`,
  borderRadius: '2px',
  transition: `background 0.3s ease, border-color 0.3s ease, transform 0.4s ${swiss.ease.smooth}`,
  ':hover': {
    background: swiss.color.accent,
    borderColor: swiss.color.accent,
    transform: 'translateY(-2px)',
  },
  '@media': {
    'screen and (max-width: 400px)': { display: 'none' },
  },
})
