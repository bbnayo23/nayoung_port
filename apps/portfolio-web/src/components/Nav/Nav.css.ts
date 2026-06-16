import { style } from '@vanilla-extract/css'
import { glitch } from '../../styles/glitch'

export const header = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingInline: '40px',
  color: glitch.color.text,
  borderBottom: '1px solid transparent',
  transition: 'background 0.2s ease, border-color 0.2s ease',
  '@media': {
    'screen and (max-width: 768px)': { paddingInline: '20px' },
  },
})

export const headerScrolled = style({
  background: 'rgba(10, 10, 11, 0.8)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderBottomColor: glitch.color.line,
})

export const logo = style({
  display: 'inline-flex',
  alignItems: 'baseline',
  fontFamily: glitch.font.display,
  fontSize: '24px',
  letterSpacing: '0.5px',
  textTransform: 'lowercase',
  color: glitch.color.text,
  transition: 'text-shadow 0.18s ease',
  ':hover': {
    textShadow: `-2px 0 ${glitch.color.red}, 2px 0 ${glitch.color.cyan}`,
  },
})

export const logoExpand = style({
  display: 'inline-block',
  overflow: 'hidden',
  maxWidth: 0,
  opacity: 0,
  whiteSpace: 'nowrap',
  fontFamily: glitch.font.mono,
  fontSize: '13px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: glitch.color.cyan,
  transition: 'max-width 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease, margin-left 0.35s cubic-bezier(0.16,1,0.3,1)',
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
  gap: '22px',
  '@media': {
    'screen and (max-width: 600px)': { display: 'none' },
  },
})

export const navLink = style({
  position: 'relative',
  fontFamily: glitch.font.mono,
  fontSize: '13px',
  color: glitch.color.textDim,
  transition: 'color 0.2s ease',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '-4px',
      height: '2px',
      background: glitch.color.cyan,
      transformOrigin: 'left center',
      transform: 'scaleX(0)',
      transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
    },
    '&:hover': { color: glitch.color.text },
    '&:hover::after': { transform: 'scaleX(1)' },
  },
})

export const contactBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '8px 16px',
  fontFamily: glitch.font.mono,
  fontSize: '13px',
  letterSpacing: '0.04em',
  color: glitch.color.text,
  background: 'transparent',
  border: `1px solid ${glitch.color.line}`,
  transition: 'border-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease',
  ':hover': {
    borderColor: glitch.color.cyan,
    color: glitch.color.cyan,
    boxShadow: `0 0 16px ${glitch.color.cyan}33`,
  },
  '@media': {
    'screen and (max-width: 400px)': { display: 'none' },
  },
})
