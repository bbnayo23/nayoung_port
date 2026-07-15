import { create } from 'storybook/theming'

/**
 * Storybook 매니저/문서 커스텀 테마.
 * design-system 의 뉴트럴 캔버스 + 인디고 브랜드(#7187ff)에 맞춰
 * 사이드바·툴바 UI 를 트렌디하고 가독성 있게 정리한다.
 */
const theme = create({
  base: 'light',

  // 브랜드
  brandTitle: 'SPiDER · Design System',
  brandTarget: '_self',

  // 컬러
  colorPrimary: '#7187ff',
  colorSecondary: '#7187ff',

  // 앱(매니저) 표면
  appBg: '#f0f3f6',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e5e7eb',
  appBorderRadius: 10,

  // 타이포
  fontBase:
    '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',

  // 텍스트
  textColor: '#1f2430',
  textMutedColor: '#6b7280',
  textInverseColor: '#ffffff',

  // 툴바 / 상단바
  barTextColor: '#6b7280',
  barSelectedColor: '#7187ff',
  barHoverColor: '#7187ff',
  barBg: '#ffffff',

  // 인풋
  inputBg: '#ffffff',
  inputBorder: '#e5e7eb',
  inputTextColor: '#1f2430',
  inputBorderRadius: 8,
})

export default theme
