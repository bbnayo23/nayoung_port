import { createLibraryConfig } from '@port/vite-config/library'

// 외부에 배포 가능한 라이브러리 빌드 설정 (pnpm build)
// svg?react → 컴포넌트 변환(svgr)은 공유 base 설정에서 제공한다.
export default createLibraryConfig({
  entry: 'src/index.ts',
  name: 'PortIconLibrary',
})
