import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import svgr from 'vite-plugin-svgr'

/**
 * 모든 패키지가 공유하는 Vite 기본 설정.
 * React + vanilla-extract + svgr 플러그인과 공통 resolve/build 옵션을 제공한다.
 *
 * svgr: `*.svg?react` 임포트를 currentColor 기반 React 컴포넌트로 변환한다.
 * (fill/stroke 제거 → color prop 으로 제어). icon-library 가 이 방식을 사용하며,
 * 다른 앱도 동일하게 SVG 를 컴포넌트로 가져올 수 있다.
 */
export function createBaseConfig() {
  return defineConfig({
    plugins: [
      react(),
      vanillaExtractPlugin(),
      svgr({
        include: '**/*.svg?react',
        svgrOptions: {
          exportType: 'default',
          ref: true,
          titleProp: true,
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: 'removeAttrs',
                params: { attrs: ['fill', 'stroke'], elemSeparator: ':', preserveCurrentColor: false },
              },
            ],
          },
        },
      }),
    ],
    resolve: {
      dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    build: {
      target: 'es2023',
      // 프로덕션(Vercel: NODE_ENV=production)에선 소스맵을 내보내지 않아 배포 용량을 줄인다.
      // 로컬 빌드/dev 서버에선 디버깅을 위해 유지.
      sourcemap: process.env.NODE_ENV !== 'production',
    },
  })
}
