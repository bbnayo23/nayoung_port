import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

/**
 * 모든 패키지가 공유하는 ESLint flat config (React + TypeScript).
 * 빌드 산출물은 무시하고, .ts/.tsx 에 recommended 규칙을 적용한다.
 */
export default defineConfig([
  // dist/스토리북 산출물과 public 정적 자산(벤더 번들 등)은 린트 대상이 아니다.
  globalIgnores(['dist', 'storybook-static', 'node_modules', 'public']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // `_` 접두사 식별자는 의도적 미사용(구조분해로 restProps 에서 제외 등)으로 본다.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
])
