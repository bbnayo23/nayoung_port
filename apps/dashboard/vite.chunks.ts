import type { UserConfig } from 'vite'

/**
 * dashboard 전용 벤더 코드 분할.
 *
 * dashboard 는 단일 SPA 라 라우트 분할 여지가 적어, node_modules 벤더를 쪼개
 * 단일 거대 청크(>500kB 경고)를 없애고 잘 바뀌지 않는 벤더의 브라우저 캐시 효율을 높인다.
 * - react-vendor: react 코어 (react / react-dom / scheduler)
 * - vendor: 그 외 모든 node_modules
 *
 * (three.js 를 lazy 청크로 다루는 portfolio-web 등엔 맞지 않으므로 공유 base 가 아닌
 *  앱별 설정으로 둔다. rolldown 신 API `codeSplitting` 사용 — `advancedChunks` 는 deprecated.)
 */
type RollupOutput = NonNullable<
  NonNullable<UserConfig['build']>['rollupOptions']
>['output']

export const dashboardChunksOutput: RollupOutput = {
  codeSplitting: {
    groups: [
      {
        name: 'react-vendor',
        test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
        priority: 20,
      },
      { name: 'vendor', test: /[\\/]node_modules[\\/]/, priority: 10 },
    ],
  },
}
