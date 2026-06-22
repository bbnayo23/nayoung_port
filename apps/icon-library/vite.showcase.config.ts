import { resolve } from 'node:path'
import { createAppConfig } from '@port/vite-config/app'
import { showcaseAliases } from './aliases'

// Showcase 앱을 포트폴리오 배포물 안(/icons/)에 빌드한다.
// base '/icons/' + outDir = portfolio-web/public/icons → portfolio 의 vite build 가
// public/** 를 dist/ 로 복사하므로 최종적으로 dist/icons/** 로 서빙된다.
export default createAppConfig({
  base: '/icons/',
  resolve: { alias: showcaseAliases },
  build: {
    outDir: resolve(process.cwd(), '../portfolio-web/public/icons'),
    emptyOutDir: true,
  },
})
