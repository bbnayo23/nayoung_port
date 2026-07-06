import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import { createBaseConfig } from '@port/vite-config/base'

// 테스트도 앱과 동일한 트랜스폼 파이프라인(react + vanilla-extract + svgr)을 써야
// .css.ts 토큰과 @port/icon-library 의 `*.svg?react` 임포트가 그대로 동작한다.
export default mergeConfig(
  createBaseConfig(),
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: true,
      include: ['src/**/*.test.{ts,tsx}'],
    },
  }),
)
