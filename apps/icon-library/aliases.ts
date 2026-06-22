import { fileURLToPath, URL } from 'node:url'

// showcase 가 사용하는 모듈 별칭 — dev(vite.config.ts)와 showcase 빌드(vite.showcase.config.ts)
// 양쪽이 동일하게 참조한다. (specific-first: @igloo/@icons/@showcase 가 bare @ 보다 앞)
// 이 파일은 패키지 루트에 위치하므로 import.meta.url 이 ./src/... 로 정상 해석된다.
export const showcaseAliases = [
  { find: '@igloo/igloo-icons', replacement: fileURLToPath(new URL('./src/lib/main.ts', import.meta.url)) },
  { find: '@icons', replacement: fileURLToPath(new URL('./src/lib/icons', import.meta.url)) },
  { find: '@showcase', replacement: fileURLToPath(new URL('./src/showcase', import.meta.url)) },
  { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
]
