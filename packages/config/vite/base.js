import path from 'node:path'
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import svgr from 'vite-plugin-svgr'

/**
 * 워크스페이스 내부에서 "소스 그대로" 소비되는 @port 런타임 패키지.
 * package.json 의 exports 가 dist 가 아닌 ./src 를 가리키므로, 소비 앱(dashboard 등)은
 * 이 패키지들을 소스로 임포트한다. Vite dep-optimizer 가 이들을 사전 번들(pre-bundle)하면
 * 소스 수정이 HMR 로 즉시 반영되지 않으므로(캐시된 번들을 서빙), 반드시 optimize 대상에서 제외한다.
 * → design-system 컴포넌트/페이지를 고치면 dashboard 에 곧바로 반영된다.
 */
const PORT_SOURCE_PACKAGES = ['@port/design-system', '@port/icon-library']

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
      // 경로 alias
      // - '@'  : 실행 패키지의 자기 src (@/x → <실행 패키지>/src/x). 앱 내부 import 용.
      //          process.cwd() 는 vite 가 실행되는 패키지 루트라 각 앱·Storybook 이 각자 src 로 해석.
      // - '@dc': design-system 의 src (절대경로). 디자인 시스템 컴포넌트를 어디서든 동일하게 참조한다
      //          (design-system 내부·dashboard·portfolio-web 모두 @dc/components/Button 형태).
      // - '@il': icon-library 의 src (절대경로). 아이콘 라이브러리를 어디서든 동일하게 참조한다.
      //          @dc·@il 모두 절대경로라 "소스로 소비"돼도 소비 앱 번들러가 항상 해당 패키지 src 로 정확히 해석한다.
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
        '@dc': path.resolve(searchForWorkspaceRoot(process.cwd()), 'apps/design-system/src'),
        '@il': path.resolve(searchForWorkspaceRoot(process.cwd()), 'apps/icon-library/src'),
      },
    },
    // @port 소스 패키지를 사전 번들에서 제외 → 소스 수정이 즉시 HMR 로 반영된다.
    optimizeDeps: {
      exclude: PORT_SOURCE_PACKAGES,
    },
    server: {
      fs: {
        // 심링크된 워크스페이스 패키지 소스를 dev 서버가 서빙할 수 있도록 모노레포 루트를 허용.
        // (pnpm 심링크는 apps/*/src 실제 경로로 해석되므로 Vite 가 그 경로를 그대로 watch → HMR 동작)
        allow: [searchForWorkspaceRoot(process.cwd())],
      },
    },
    build: {
      target: 'es2023',
      // 프로덕션(Vercel: NODE_ENV=production)에선 소스맵을 내보내지 않아 배포 용량을 줄인다.
      // 로컬 빌드/dev 서버에선 디버깅을 위해 유지.
      sourcemap: process.env.NODE_ENV !== 'production',
    },
  })
}
