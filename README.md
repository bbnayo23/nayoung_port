<div align="center">

# 🪐 Nayoung Park — Portfolio

**3D 인터랙티브 포트폴리오 + 직접 만든 디자인 시스템 · 아이콘 · 대시보드를 한 곳에 담은 모노레포**

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?logo=three.js&logoColor=white)
![vanilla-extract](https://img.shields.io/badge/vanilla--extract-CSS--in--TS-FF4785)
![Turborepo](https://img.shields.io/badge/Turborepo-monorepo-EF4444?logo=turborepo&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-workspace-F69220?logo=pnpm&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

</div>

---

## ✨ 소개

이 저장소는 **하나의 포트폴리오 사이트** 안에 제가 만든 결과물들을 그대로 담은 **pnpm + Turborepo 모노레포**입니다.

> 메인은 R3F(react-three-fiber)로 만든 **3D 인터랙티브 포트폴리오**이고,
> 그 안에서 **디자인 시스템 · 아이콘 라이브러리 · 대시보드**를 실제로 열어볼 수 있도록 하나의 배포물로 합쳐집니다.

- 🌌 **3D 공간**을 헤엄치며 프로젝트로 진입하는 경험
- 📄 저사양·접근성 환경을 위한 **텍스트(읽기) 버전** + **PDF 이력서** 화면
- 🧩 직접 설계·운영하는 **디자인 시스템**과 이를 소비하는 **대시보드** 예시

---

## 🌌 컨셉 — 코드 속 세계의 수리공

> **Next Yourself** — _어제보다 더 발전한 나._

이 포트폴리오는 **「코드 속」이라는 미지의 세계**를 무대로 합니다.

주인공은 **망치와 공구를 든 코드 수리공**, 그리고 그 캐릭터는 곧 **나** 입니다.
세계를 헤엄치듯 누비며 **잘못된 코드를 하나씩 고쳐** 나갑니다.

세계 곳곳에는 다른 차원으로 통하는 **포탈**이 있고,
그 안으로 들어가면 제가 만든 **프로젝트**와 마주합니다.
캐릭터는 포탈 안에서도 멈추지 않고 **계속 코드를 손봅니다** —
이는 **완성된 프로젝트에 안주하지 않고, 끊임없이 리팩토링하며 더 나은 결과물로 다듬어 가는 저의 태도**를 형상화한 것입니다.

| 장면 | 의미 |
| --- | --- |
| 🔨 망치·공구로 코드를 고치는 캐릭터 | 문제를 찾아 개선하는 개발자로서의 나 |
| 🌀 다른 세계로 통하는 포탈 | 내가 만든 각 프로젝트 |
| ♻️ 포탈 안에서도 멈추지 않는 수정 | 완성 이후에도 이어지는 리팩토링·발전 |

> 🔨 고치고 · 🌀 들어가고 · ✨ 더 낫게 — **멈추지 않는 개선의 여정.**

---

## 🗂 구조

| 워크스페이스 | 역할 |
| --- | --- |
| 🚀 **`apps/portfolio-web`** | **배포 산출물.** R3F 3D 포트폴리오 + 텍스트/PDF 폴백. 나머지를 정적으로 흡수 |
| 🧩 **`apps/design-system`** | 컴포넌트 라이브러리(vanilla-extract) + Storybook 문서 |
| 🎨 **`apps/icon-library`** | SVG 아이콘 라이브러리 + 검색·프리뷰 쇼케이스 |
| 📊 **`apps/dashboard`** | 디자인 시스템 소비 예시 — **SIEM 로그검색 대시보드** |
| ⚙️ **`packages/config/*`** | 공유 ESLint · TypeScript · Vite 프리셋 |

```
nayoung_port/
├── apps/
│   ├── portfolio-web    ← 메인(3D) · 배포 단위
│   ├── design-system    ← 컴포넌트 + Storybook
│   ├── icon-library     ← 아이콘 + 쇼케이스
│   └── dashboard        ← SIEM 대시보드 예시
└── packages/config/
    ├── eslint  ·  typescript  ·  vite   ← 공유 프리셋
```

---

## 🧩 빌드 합성 — "사이트 안의 사이트"

가장 특징적인 부분입니다. `portfolio-web` 을 빌드하면 다른 앱들을 **서브사이트로 흡수**합니다.

```text
icon-library  ──build──▶  /icons/
design-system ──build──▶  /design-system/
dashboard     ──build──▶  /dashboard/
                              ▼
                    portfolio-web (dist)
```

결과적으로 **한 번의 배포**로 3D 포트폴리오와 그 안의 결과물들이 모두 서빙되고,
3D 씬의 각 "방"과 텍스트 버전의 프로젝트 카드가 위 경로로 연결됩니다.

---

## 🎨 기술 스택

| 영역 | 사용 기술 |
| --- | --- |
| **Core** | React 19 · TypeScript(strict) · Vite |
| **3D** | Three.js · @react-three/fiber · drei · postprocessing |
| **스타일** | vanilla-extract (기본) · styled-components (icon-library) |
| **디자인 시스템** | Storybook · 디자인 토큰 컨트랙트 · 라이트/다크 테마 |
| **인프라** | Turborepo · pnpm workspace · ESLint(flat) · Husky |

---

## 🚀 시작하기

```bash
pnpm install      # 의존성 설치 (Node 22 · pnpm 10)
pnpm dev          # 메인 포트폴리오(3D) 개발 서버
```

| 명령 | 설명 |
| --- | --- |
| `pnpm dev` | 🚀 portfolio-web (메인) |
| `pnpm storybook` | 🧩 design-system Storybook |
| `pnpm dev:dashboard` | 📊 dashboard |
| `pnpm dev:icons` | 🎨 icon-library |
| `pnpm dev:all` | 전체 동시 실행 |
| `pnpm build` | 전체 빌드 (위 합성 수행) |
| `pnpm typecheck` · `pnpm lint` | 전 패키지 검사 |

---

## 🧱 개발 컨벤션

**Import 경로** — 부모 상대경로(`../../`) 대신 alias 를 사용합니다.

- `@/*` → **자기 패키지**의 `src/*` (앱 내부 import)
- `@dc/*` → **design-system** 의 `src/*` (절대경로). 디자인 시스템 컴포넌트·토큰은 어디서든 `@dc/` 로 import 합니다 — design-system 내부에서도, dashboard·portfolio-web 에서도 동일하게.

```ts
// 디자인 시스템 컴포넌트·토큰 (어디서든 @dc/)
import { Button } from '@dc/components/Button'
import { vars } from '@dc/theme/contract.css'

// 앱 자기 코드
import { logs } from '@/data/logs'
```

- `@dc` 는 **절대경로 alias**라 design-system 이 "소스로 소비"돼도 소비 앱 번들러가 항상 `design-system/src` 로 정확히 해석합니다. (제네릭 `@/` 는 소비 앱에서 자기 `src` 로 오해석되므로, design-system 의 소비 대상 코드(`components`·`theme`·`patterns`)에는 `@/` 대신 `@dc/` 를 씁니다.)
- 같은 디렉터리는 `./x` 를 그대로 씁니다(부모 경로만 alias 로 대체).
- 설정: 각 앱 `tsconfig` 의 `paths` + 공유 `packages/config/vite/base.js` 의 `resolve.alias`. Storybook 도 base 설정을 머지하므로 동일 동작합니다.

---

## 🧭 보는 방법

- **3D 버전** — 방향키로 헤엄치고, 마우스 휠로 확대/축소하며 프로젝트에 진입
- **텍스트 버전** — 우측 상단 *텍스트 버전* 버튼 (저사양·모션 최소화 환경은 자동 전환)
- **PDF 이력서** — 텍스트 버전에서 PDF 문서 형태로 저장 가능

<div align="center">
<br/>

**© 2026 — Nayoung Park** · _Next Yourself._

</div>
