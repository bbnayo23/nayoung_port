import { defineConfig, mergeConfig } from 'vite'
import { resolve } from 'node:path'
import { createBaseConfig } from './base.js'

/**
 * 외부에 배포 가능한 라이브러리(design-system, icon-library 등)를 위한 Vite 설정.
 * MUI처럼 소비 가능한 형태로 빌드한다. react/react-dom은 external 처리.
 *
 * @param {{ entry: string, name: string, external?: string[] }} options
 */
export function createLibraryConfig({ entry, name, external = [] }) {
  return mergeConfig(
    createBaseConfig(),
    defineConfig({
      build: {
        lib: {
          entry: resolve(process.cwd(), entry),
          name,
          formats: ['es'],
          fileName: () => 'index.js',
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime', ...external],
          output: {
            globals: { react: 'React', 'react-dom': 'ReactDOM' },
          },
        },
      },
    }),
  )
}
