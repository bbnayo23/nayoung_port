import config from '@port/eslint-config'

/**
 * 디자인 시스템(라이브러리) 전용 오버라이드.
 *
 * `react-refresh/only-export-components` 는 Vite HMR(앱)을 위한 규칙이다.
 * 이 패키지는 컴포넌트 라이브러리라 Compound 컴포넌트가 Context·hook(useToast 등)을
 * 컴포넌트와 함께 export 하는 것이 정상 설계이므로 이 패키지에서는 끈다.
 */
export default [
  ...config,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
]
