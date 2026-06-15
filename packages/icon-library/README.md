# @port/icon-library

SVG 아이콘 라이브러리. 두 가지 형태로 사용된다.

1. **독립 showcase 앱** — 아이콘 목록을 브라우저에서 확인
   ```bash
   pnpm --filter @port/icon-library dev
   ```
2. **소비 가능한 라이브러리** — 다른 패키지에서 import
   ```ts
   import { IconStar, IconHeart } from '@port/icon-library'
   ```
   배포용 빌드:
   ```bash
   pnpm --filter @port/icon-library build   # dist/ 생성 (JS + d.ts)
   ```

각 아이콘은 `size`와 표준 SVG props를 받는다. `fill="currentColor"`라 부모 `color`로 색을 제어한다.
