import { globalStyle } from '@vanilla-extract/css'
import { swiss } from './swiss'

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
  colorScheme: 'light',
})

globalStyle('body', {
  fontFamily: swiss.font.sans,
  fontSize: '16px',
  lineHeight: 1.6,
  color: swiss.color.ink,
  backgroundColor: swiss.color.paper,
  backgroundImage: swiss.mesh,
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat',
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
  fontWeight: 700,
  lineHeight: 1.1,
})

globalStyle(':focus-visible', {
  outline: `2px solid ${swiss.color.accent}`,
  outlineOffset: '3px',
  borderRadius: '2px',
})

globalStyle('::selection', {
  background: swiss.color.accent,
  color: swiss.color.paper,
})

globalStyle('::-webkit-scrollbar', {
  width: '10px',
})

globalStyle('::-webkit-scrollbar-track', {
  background: swiss.color.paper,
})

globalStyle('::-webkit-scrollbar-thumb', {
  background: swiss.color.paperAlt,
  border: `2px solid ${swiss.color.paper}`,
  borderRadius: '999px',
})
