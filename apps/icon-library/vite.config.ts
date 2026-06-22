import { fileURLToPath, URL } from 'node:url'
import { createAppConfig } from '@port/vite-config/app'

// 독립 실행되는 아이콘 showcase 앱 설정 (pnpm dev / build:showcase)
// showcase 소스가 @/@icons/@showcase 와 @igloo/igloo-icons(로컬 lib) alias 를 사용한다.
export default createAppConfig({
  resolve: {
    alias: [
      { find: '@igloo/igloo-icons', replacement: fileURLToPath(new URL('./src/lib/main.ts', import.meta.url)) },
      { find: '@icons', replacement: fileURLToPath(new URL('./src/lib/icons', import.meta.url)) },
      { find: '@showcase', replacement: fileURLToPath(new URL('./src/showcase', import.meta.url)) },
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
})
