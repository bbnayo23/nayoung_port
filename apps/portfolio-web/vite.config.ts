import { createAppConfig } from '@port/vite-config/app'

// dev 서버 기동 시 브라우저 새 창으로 자동 오픈
export default createAppConfig({
  server: { open: true },
})
