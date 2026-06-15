import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export function createAppConfig(config: UserConfig = {}): UserConfig {
  return defineConfig({
    plugins: [react(), vanillaExtractPlugin()],
    ...config,
  })
}
