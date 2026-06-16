import { globalStyle } from '@vanilla-extract/css'
import { vars } from './tokens.css'

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
})

globalStyle('html', {
  scrollBehavior: 'smooth',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  colorScheme: 'dark',
})

globalStyle('body', {
  fontFamily: vars.font.sans,
  fontSize: vars.fontSize.base,
  lineHeight: vars.lineHeight.normal,
  color: vars.color.text,
  background: vars.color.bg,
  overflowX: 'hidden',
  minHeight: '100dvh',
})

globalStyle('#root', {
  isolation: 'isolate',
})

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
})

globalStyle('img, video, svg', {
  display: 'block',
  maxWidth: '100%',
})

globalStyle('button', {
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  font: 'inherit',
  color: 'inherit',
})

globalStyle('ul, ol', {
  listStyle: 'none',
})

globalStyle('h1, h2, h3, h4, h5, h6', {
  fontWeight: 600,
  lineHeight: vars.lineHeight.tight,
})

globalStyle(':focus-visible', {
  outline: `2px solid ${vars.color.accent}`,
  outlineOffset: '3px',
  borderRadius: vars.radius.sm,
})

globalStyle('::selection', {
  background: vars.color.accentSubtle,
  color: vars.color.text,
})

globalStyle('::-webkit-scrollbar', {
  width: '6px',
})

globalStyle('::-webkit-scrollbar-track', {
  background: 'transparent',
})

globalStyle('::-webkit-scrollbar-thumb', {
  background: vars.color.surface,
  borderRadius: vars.radius.full,
})
