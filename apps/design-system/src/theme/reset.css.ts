import { globalStyle } from '@vanilla-extract/css'
import './xdr.css'
import './xdr-dark.css'
import { vars } from './contract.css'

/**
 * 디자인 시스템 전역 베이스. 컴포넌트가 일관된 타이포·박스모델 위에서 렌더되도록
 * 최소한의 reset 을 적용한다. (Storybook preview 와 소비 앱에서 import)
 */
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
})

globalStyle('body', {
  margin: 0,
  fontFamily: vars.font.family,
  fontSize: vars.font.sizeMd,
  lineHeight: 1.5,
  color: vars.color.text,
  backgroundColor: vars.color.background,
  WebkitFontSmoothing: 'antialiased',
})
