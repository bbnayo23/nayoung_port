import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

interface LibraryConfigOptions {
  entry: string
  name: string
  config?: UserConfig
}

export function createLibraryConfig({ entry, name, config = {} }: LibraryConfigOptions): UserConfig {
  return defineConfig({
    plugins: [react(), vanillaExtractPlugin()],
    build: {
      lib: {
        entry,
        name,
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
    ...config,
  })
}
