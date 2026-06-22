import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { createAppConfig } from '@port/vite-config/app'

// Showcase 앱을 포트폴리오 배포물 안(/icons/)에 빌드한다.
// base '/icons/' + outDir = portfolio-web/public/icons → portfolio 의 vite build 가
// public/** 를 dist/ 로 복사하므로 최종적으로 dist/icons/** 로 서빙된다.
// alias 는 dev(vite.config.ts)와 동일하게 유지한다.
export default createAppConfig({
  base: '/icons/',
  resolve: {
    alias: [
      { find: '@igloo/igloo-icons', replacement: fileURLToPath(new URL('./src/lib/main.ts', import.meta.url)) },
      { find: '@icons', replacement: fileURLToPath(new URL('./src/lib/icons', import.meta.url)) },
      { find: '@showcase', replacement: fileURLToPath(new URL('./src/showcase', import.meta.url)) },
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
  build: {
    outDir: resolve(process.cwd(), '../portfolio-web/public/icons'),
    emptyOutDir: true,
  },
})
