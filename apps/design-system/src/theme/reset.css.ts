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

// 네이티브 UI(스크롤바·폼 컨트롤)가 테마를 따르도록 color-scheme 를 명시한다.
// 이걸 지정하면 커스텀 ::-webkit-scrollbar 가 없는 스크롤 영역과 Firefox·문서 스크롤바까지
// 다크에서 어둡게 렌더된다. (:root.dark 는 specificity 로 :root 보다 우선)
globalStyle(':root', { colorScheme: 'light' })
globalStyle(':root.dark', { colorScheme: 'dark' })

globalStyle('body', {
  margin: 0,
  fontFamily: vars.font.family,
  fontSize: vars.font.sizeSm, // 기본 12px (AiR Works)
  lineHeight: 1.5,
  color: vars.color.text,
  backgroundColor: vars.color.background,
  WebkitFontSmoothing: 'antialiased',
})

// ── 전역 스크롤바 — 테마 토큰 기반. 커스텀 스크롤 영역과 문서 스크롤바를 일관되게 다크/라이트 대응 ──
globalStyle('*::-webkit-scrollbar', { width: 10, height: 10 })
globalStyle('*::-webkit-scrollbar-track', { background: 'transparent' })
globalStyle('*::-webkit-scrollbar-thumb', {
  background: vars.color.border,
  borderRadius: vars.radius.full,
  border: '2px solid transparent',
  backgroundClip: 'padding-box',
})
globalStyle('*::-webkit-scrollbar-thumb:hover', {
  background: vars.color.borderHover,
})
// Firefox
globalStyle('*', {
  scrollbarColor: `${vars.color.border} transparent`,
  scrollbarWidth: 'thin',
})
