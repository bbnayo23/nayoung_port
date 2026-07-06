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
  /**
   * 스토리 파일은 Storybook CSF 의 `render: () => { const [x] = useState() ... }`
   * 패턴을 쓴다. render 는 대문자 컴포넌트가 아니라서 react-hooks 규칙이 훅 호출을
   * 위반으로 잡지만, Storybook 에서는 정상 관용구이므로 데모 코드 한정으로 끈다.
   */
  {
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },
]
