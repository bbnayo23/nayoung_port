import { resolve } from 'node:path'
import { createAppConfig } from '@port/vite-config/app'

// dashboard 를 포트폴리오 배포물 안(/dashboard/)에 빌드한다.
// base '/dashboard/' + outDir = portfolio-web/public/dashboard → portfolio 의 vite build 가
// public/** 를 dist/ 로 복사하므로 최종적으로 dist/dashboard/** 로 서빙된다.
// (icon-library 쇼케이스(/icons/) · design-system(/design-system/) 와 동일한 합성 방식)
export default createAppConfig({
  base: '/dashboard/',
  build: {
    outDir: resolve(process.cwd(), '../portfolio-web/public/dashboard'),
    emptyOutDir: true,
  },
})
