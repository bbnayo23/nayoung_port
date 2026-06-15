import { createLibraryConfig } from '@port/vite-config/library'

// 외부에 배포 가능한 라이브러리 빌드 설정 (pnpm build)
export default createLibraryConfig({
  entry: 'src/index.ts',
  name: 'PortIconLibrary',
})
