# @port/design-system

공유 UI 컴포넌트 라이브러리. 두 가지 형태로 사용된다.

1. **Storybook 쇼케이스** — 컴포넌트를 문서/플레이그라운드로 확인
   ```bash
   pnpm storybook        # http://localhost:6006
   ```
2. **소비 가능한 라이브러리** (MUI처럼) — 다른 패키지에서 import
   ```ts
   import { Button } from '@port/design-system'
   ```
   배포용 빌드:
   ```bash
   pnpm --filter @port/design-system build   # dist/ 생성 (JS + d.ts)
   ```

모노레포 내부에서는 `src`를 직접 소비하므로 별도 빌드 없이 사용된다.
스타일은 [vanilla-extract](https://vanilla-extract.style/) (`*.css.ts`)로 작성한다.
