import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

/**
 * 모든 패키지가 공유하는 Vite 기본 설정.
 * React + vanilla-extract 플러그인과 공통 resolve/build 옵션을 제공한다.
 */
export function createBaseConfig() {
  return defineConfig({
    plugins: [react(), vanillaExtractPlugin()],
    resolve: {
      dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    build: {
      target: 'es2023',
      sourcemap: true,
    },
  })
}
