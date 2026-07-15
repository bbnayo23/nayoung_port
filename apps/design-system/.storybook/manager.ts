import { addons } from 'storybook/manager-api'
import theme from './theme'

// 매니저(사이드바·툴바) 에 커스텀 테마 적용 + 사이드바 UX 정리
addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
})
