import type { Preview, Decorator } from '@storybook/react-vite'
import '../src/theme/reset.css'

/**
 * 테마 데코레이터 — 툴바의 `theme` 글로벌에 맞춰 미리보기 iframe 의
 * <html> 에 `dark` 클래스를 토글한다. `:root.dark` 다크 토큰이 활성화되고,
 * reset.css 의 body 가 vars.color.background 를 참조하므로 캔버스 배경도 함께 바뀐다.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme === 'dark' ? 'dark' : 'light'
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }
  return Story()
}

const preview: Preview = {
  decorators: [withTheme],
  initialGlobals: {
    theme: 'light',
  },
  globalTypes: {
    theme: {
      description: '라이트/다크 테마 전환',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
