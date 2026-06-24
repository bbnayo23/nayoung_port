# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code(및 모든 에이전트)가 따라야 하는 가이드다.
코드를 읽으면 바로 알 수 있는 내용(컴포넌트 목록, 각 컴포넌트가 하는 일 등)은 적지 않는다.
**파일을 열어봐도 알기 어려운, 패키지에 걸쳐 있는 규칙과 함정**만 기록한다.

## 모노레포 구조

pnpm workspace + Turborepo. 워크스페이스는 `apps/*` 와 `packages/config/*` 두 군데뿐이다 (`pnpm-workspace.yaml`).

| 위치                       | scope                  | 역할                                                           |
| -------------------------- | ---------------------- | -------------------------------------------------------------- |
| `apps/portfolio-web`       | `@port/portfolio-web`  | **배포 산출물.** R3F 3D 포트폴리오. 나머지를 정적으로 흡수한다 |
| `apps/design-system`       | `@port/design-system`  | 컴포넌트 라이브러리 + Storybook                                |
| `apps/icon-library`        | `@port/icon-library`   | 아이콘 라이브러리 + 쇼케이스 앱                                |
| `apps/dashboard`           | `@port/dashboard`      | design-system 소비 예시 앱                                     |
| `packages/config/eslint`  | `@port/eslint-config`  | 공유 ESLint flat config                                        |
| `packages/config/typescript` | `@port/typescript-config` | 공유 tsconfig 프리셋 (base/react/node/library)            |
| `packages/config/vite`    | `@port/vite-config`    | 공유 Vite 프리셋 (`/base` `/app` `/library`)                   |

라이브러리 패키지(`design-system`, `icon-library`)는 **소스 그대로 소비**된다 — `main`/`module`/`types` 가 모두 `./src/index.ts` 를 가리키므로 워크스페이스 내 소비자는 빌드 없이 import 한다. `pnpm build` 는 외부 배포용 산출물을 만들 때만 쓴다.

## 빌드 합성 (가장 비자명한 부분)

`portfolio-web` 이 최종 배포 단위이고, 다른 두 앱을 자기 정적 산출물 안으로 흡수한다.

`apps/portfolio-web` 의 `build` 스크립트:

```
pnpm --filter @port/icon-library build:showcase   # → portfolio-web/public/icons/
pnpm --filter @port/design-system build:embed      # → portfolio-web/public/design-system/  (storybook build)
tsc -b && vite build                               # public/** 가 dist/ 로 복사됨
```

결과적으로 배포본에서 `/icons/` 와 `/design-system/` 이 서브사이트로 서빙된다. 3D 씬의 "방"(`src/three/scene/rooms.ts`)과 데이터(`src/data/index.ts`)가 이 경로로 링크한다.

- icon-library 쇼케이스는 `base: '/icons/'` + `outDir: ../portfolio-web/public/icons` 로 빌드된다.
- design-system 은 `build:embed`(= `storybook build --output-dir ../portfolio-web/public/design-system`)로 들어간다.
- **이 경로(`/icons/`, `/design-system/`)나 outDir 을 바꾸면 빌드 합성과 3D 링크가 동시에 깨진다.**

## 스타일링 — 두 체계가 공존

- 기본은 **vanilla-extract** (`*.css.ts`). 토큰은 `@port/design-system` 의 `vars`(`src/theme/contract.css.ts` — `createGlobalThemeContract`, prefix `ds-`)에서 온다. 값은 `src/theme/xdr.css.ts` 가 `:root` 에 굽고, 테마 무관 스케일은 `src/theme/tokens.ts`(`commonTokens`)에 있다. 컴포넌트는 `vars.color.primary` / `vars.transition.fast` / `vars.font.sizeXs` 형태로 참조한다.
- design-system 컴포넌트는 **`@vanilla-extract/recipes` 의 `recipe`** 로 variant 를 구성하고, 컴포넌트별 `Comp.tokens.ts` 가 `globalStyle(':root', createXTokens())` 로 `--color-*` 커스텀 프로퍼티를 주입한다. 클래스 병합은 `cx` 가 아니라 **`classnames`(cn)** 를 쓴다.
- **예외: `icon-library` 는 `styled-components` 를 쓴다.** 두 체계를 한 패키지 안에서 섞지 말 것.
- SVG 는 `*.svg?react` 로 import 하면 svgr 이 `currentColor` 기반 React 컴포넌트로 변환한다 (fill/stroke 제거 → `color` 로 제어). 설정은 `packages/config/vite/base.js` 에 있고 모든 앱이 공유한다.

## 코드 스타일 / 포매팅

- **포매터가 설정돼 있지 않다.** 루트에 prettier 설정도, 의존성도 없다.
- 컨벤션: **작은따옴표, 세미콜론 없음, 2-space 들여쓰기, 화살표 함수 선호.** 기존 파일 스타일을 따른다.
- **`npx prettier` 를 옵션 없이 돌리지 말 것** — 기본 설정이 큰따옴표 + 세미콜론 + printWidth 80 으로 바꿔 컨벤션을 깬다. 굳이 돌려야 하면 이 저장소의 실제 컨벤션과 일치하는 옵션을 명시한다:

  ```
  npx prettier --write --single-quote --no-semi --print-width 120 <파일>
  ```

  (이 옵션은 기존 파일을 거의 그대로 재현한다 — pristine 파일에 적용 시 차이 ≈0 으로 검증됨.)
- 린트는 ESLint flat config(`@port/eslint-config`)를 모든 패키지가 공유한다: `js.recommended` + `typescript-eslint.recommended` + `react-hooks` + `react-refresh`. 따옴표/세미콜론은 강제하지 않는다.
- `design-system` 만 `react-refresh/only-export-components` 를 끈다 (Compound 컴포넌트가 hook/Context를 함께 export 하는 정상 설계이기 때문 — `apps/design-system/eslint.config.js`).

## TypeScript

공유 `base.json` 기준 (`packages/config/typescript`):

- **`verbatimModuleSyntax: true`** → 타입 전용 import 는 반드시 `import type` 으로 써야 한다. 이게 코드 전반이 `import type { ... }` 를 쓰는 이유다.
- `noUnusedLocals` / `noUnusedParameters` 켜져 있음 — 안 쓰는 변수/인자는 타입체크 실패.
- `allowImportingTsExtensions`, `moduleResolution: bundler`, `strict`.
- **경로 alias 없음** (`paths` 미설정). 상대 경로 import 만 사용한다.
- 라이브러리는 타입을 별도 `tsconfig.build.json` 으로 생성한다 (`vite build` + `tsc -p tsconfig.build.json`).

## 명령어

루트에서 (Turborepo 경유):

| 명령                  | 내용                                                  |
| --------------------- | ----------------------------------------------------- |
| `pnpm dev`            | **portfolio-web 만** 띄운다 (`--filter @port/portfolio-web`) |
| `pnpm storybook`      | design-system Storybook (6006)                        |
| `pnpm dev:dashboard`  | dashboard dev                                         |
| `pnpm dev:icons`      | icon-library dev                                      |
| `pnpm dev:all`        | 전부 dev                                              |
| `pnpm build`          | 전체 빌드 (`portfolio-web` 빌드가 위의 합성을 수행)    |
| `pnpm typecheck` / `pnpm lint` | 전 패키지 turbo 실행                         |

- **Git pre-commit 훅(husky)은 `pnpm turbo typecheck` 만 돌린다** (lint·prettier 아님). 커밋하려면 타입체크가 통과해야 한다.
- Node 22 계열, pnpm 10.12.4, esbuild만 `onlyBuiltDependencies` 허용.

## portfolio-web 3D (`src/three/`)

three.js를 건드릴 때 알아야 할 비자명한 설계:

- 3D는 **조건부로만** 렌더된다. `useCanRender3D` 가 WebGL 미지원 / `prefers-reduced-motion` / 저사양(논리코어 ≤2)을 폴백 처리하고, `MainPage` 가 `Experience` 를 **lazy import** 한다 (3D 번들이 무겁다).
- 매 프레임 갱신되는 게임 상태는 React state 가 **아니라** mutable ref 객체(`src/three/store.tsx` 의 `GameState`)로 공유한다 — 리렌더 폭주 회피. 컨트롤러/카메라/캐릭터가 같은 객체를 읽고 쓴다.
- **`GameProvider` 는 반드시 `<Canvas>` 내부에 둔다** (R3F 리컨실러 경계 안에서 공유돼야 함).
- 렌더 품질 티어(`tier.value`)는 props 대신 store 경유로 읽어 Sparkles 등 무거운 효과를 게이팅한다.

## Storybook 스토리 작성 규칙 (design-system)

> 컴포넌트 작성 디테일(vanilla-extract `ds-*` 디버그 네임, `cx` 병합 순서, compound 패턴, props 설계, 아이콘 출처, 신규 컴포넌트 체크리스트 등)은 [`apps/design-system/components-guide.md`](apps/design-system/components-guide.md) 참조.

**스토리는 컴포넌트와 분리돼 `src/stories/<Comp>/` 에 둔다** (컴포넌트 구현은 `src/components/<Comp>/`). 컴포넌트마다 두 종류의 스토리가 있다:

- `*.stories.tsx` — variant/상태별 일반 스토리.
- `*.docs.stories.tsx` — 단일 `Documentation` 스토리. inline style + `vars` 토큰으로 손수 구성한 문서 페이지다. (이 문서 페이지에 한해 inline style 을 쓴다 — 일반 컴포넌트 구현은 `.css.ts` 를 쓴다.)

두 파일은 **같은 `title: 'StyleGuide/<Comp>'`** 를 써서 스토리북 사이드바에서 한 노드로 합쳐진다 (예제 스토리 + Documentation 이 함께 보인다). 소스에 docs 가 없는 컴포넌트(ContextMenu·HighlightText)는 예제 스토리만 둔다.

**함정 — `render` 콜백 안에서 hook 호출 금지.** `render: () => { const [x] = useState(...) }` 는 `react-hooks/rules-of-hooks` 위반이다 (콜백이 컴포넌트로 인식되지 않음). 상태가 필요하면 대문자 컴포넌트로 분리하고 `render: () => <DocumentationView />` 로 렌더한다.

## 컴포넌트 출처 메모

`design-system` 의 컴포넌트(43개)는 **2026-OneUI 의 `style-guide-components`**(`D:\develop\2026-OneUI\packages\ui\src\style-guide-components`)에서 포팅됐다. 동작/네이밍/토큰 체계가 그쪽 관습을 따른다. 포팅 시 `@ui/*` → 상대경로, `@igloo/igloo-icons` → `@port/icon-library`(Xdr* 아이콘) 로 재작성한다. 일부 아이콘은 미존재분을 가장 가까운 Xdr* 로 치환했다.

`src/components/{COMPONENT_GUIDE,CUSTOMIZATION_RULES}.md` 는 이 style-guide-components 패턴(recipe + `Comp.tokens.ts` + 컨트랙트)을 설명하는 원본 가이드다.

> 위치 지정 `Portal`(`src/components/Portal`, triggerRef/panelRef 기반)은 드롭다운류 내부용이라 배럴(`src/index.ts`)에 노출하지 않는다 — 공개 `Portal` 은 `src/utils` 의 단순 createPortal 래퍼다.
