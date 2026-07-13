import { createAppConfig } from '@port/vite-config/app'
import { dashboardChunksOutput } from './vite.chunks'

export default createAppConfig({
  build: {
    rollupOptions: {
      output: dashboardChunksOutput,
    },
  },
})
