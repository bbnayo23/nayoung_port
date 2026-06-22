# Style Guide Components — 컴포넌트 구현 가이드

**역할**: 구현 방법(How)을 담당. 시각 설계 의도·도메인 규칙(Why)은 `packages/ui/design.md` 참조.

---

## 작업 유형별 읽기 순서

| 작업 | 읽는 파일 순서 |
|------|---------------|
| **화면 구성 / HTML 재현** | `design.md` → 이 파일 → 구현 |
| **신규 컴포넌트 생성** | `design.md` → 이 파일 → `SKILL.md` (실행 절차·코드 템플릿) |
| **스타일 수정** | `CUSTOMIZATION_RULES.md` → `design.md` → 이 파일 |

신규 컴포넌트는 반드시 `style-guide-components/` 에 추가한다. 기존 컴포넌트로 구현 가능한지 먼저 확인한다.

---

## 1. 파일 구조 규칙

- 컴포넌트 폴더명: `PascalCase`
- 타입은 반드시 `{Name}.types.ts` 에. `.tsx` 인라인 정의 금지.
- `hooks.ts` 는 폴더가 아닌 **단일 파일**. 훅을 늘릴 때 파일을 쪼개지 않는다.
- `index.ts` 는 순수 re-export 만. 로직 없음.
- 스토리는 **`src/stories/{Name}/{Name}.stories.tsx`** 에 위치한다. (컴포넌트 폴더 밖, 패키지 레벨 `stories/` 폴더)
- `style-guide-components/` 전용 컨벤션. `components/`, `vendors/` 는 `packages/ui/CLAUDE.md` 따름.

---

## 2. 토큰 아키텍처

hex 를 직접 `.css.ts` 에 쓰면 테마 전환이 깨진다. → `vars.*` 참조 필수.

### 컴포넌트 토큰 (`*.tokens.ts`) 생성 판단 기준

| 상황 | 결정 |
|------|------|
| 단일 variant, `vars.color.*` 참조로 충분 | ❌ 생략 |
| 2개 이상 variant가 서로 다른 색상 필요 | ✅ 생성 |
| Badge/Tag 등 `vars.*` 에 없는 도메인 고정 팔레트 필요 | ✅ 생성 |
| 색상 외 파생 수치(아이콘 크기 등)만 필요 | ❌ 생략 — `createVar()` 사용 |

> ⚠️ pre-commit 보호 및 관리자 권한: `CUSTOMIZATION_RULES.md §0` 참조.

---

## 3. 스타일링 규칙

- 신규 컴포넌트는 `recipe()` 를 기본으로 사용한다 (복합 variant + 상태 조합에 적합).
- hover / focus / disabled 는 반드시 `selectors` 안에 정의. 최상위에 직접 쓰지 않는다.
- Storybook 에서 hover/focus/active 상태를 강제 재현하려면 `"&:hover, &.is-hover"` 패턴을 CSS pseudo 와 함께 선언한다. → Stories 에서 `className="is-hover"` 로 트리거 가능.
- `style={{ ... }}` 금지. 예외: 런타임에만 결정되는 동적 값. Storybook render wrapper 레이아웃 허용.

→ 코드 패턴 예시: `SKILL.md §파일별 구현 패턴` 참조

---

## 4. 컴포넌트 API 설계 규칙

→ **`packages/ui/CLAUDE.md` "Style Props Rule (strict)"** 참조.

핵심: `className` 과 디자인 토큰 enum(`size`, `variant`, `tone`)만 허용. Boolean style props 금지.

---

## 5. 훅 사용 규칙

→ **`packages/ui/CLAUDE.md` "Hook Consumption Rule (strict)"** 참조.

핵심: Provider/Initializer 없이 단독 호출 가능한 훅만 허용. 필요한 데이터는 props 로 주입.

---

## 6. 아이콘 사용 규칙

→ **`packages/ui/CLAUDE.md` "Icons" 섹션** 참조.

핵심: `@igloo/igloo-icons` 우선. 없을 때만 `src/components/icons/` 에 추가 후 re-export.

---

## 7. Storybook 요구사항

- title: `"StyleGuide/{ComponentName}"` 형식 (PascalCase, 하이픈 없음)
- 필수 export 4개: `Playground` / `Variants` / `Sizes` / `States`
- `States` 에서 `is-{state}` 클래스로 hover/focus/active 를 재현한다
- Storybook toolbar Theme 셀렉터로 테마 전환 검증

→ 스토리 코드 템플릿: `SKILL.md §파일별 구현 패턴` 참조

---

## 8. 임포트 규칙

`packages/ui/src/` 내부에서는 `@ui/` 별칭을 사용한다. `@/` 는 소비 앱의 `src/` 로 해석되므로 이 패키지 내부에서 사용 금지. 2단계 이상 상대경로 금지.

`style-guide-components/` 의 컴포넌트는 `src/index.ts` 에서 re-export 하여 `@feature-fe/ui` entry 로 노출한다.

---

## 9. 금지 사항 체크리스트

- [ ] `.css.ts` 에 하드코딩 hex 없음 — `vars.color.*` 또는 `var(--color-{comp}-*)` 사용
- [ ] JSX 에 정적 `style={{ ... }}` 없음
- [ ] boolean style prop 없음 (`noBorder`, `isCompact`, `fullWidth` 등)
- [ ] DOM 래퍼 컴포넌트에 `forwardRef` 적용됨
- [ ] `className?: string` 이 있고 `cn(recipe(...), className)` 으로 병합됨
- [ ] `displayName` 설정됨
- [ ] 모든 타입이 `{Name}.types.ts` 에 있음 (`import type` 사용)
- [ ] Provider/Store 의존 훅을 내부에서 직접 호출하지 않음
- [ ] (tokens.ts 있는 경우) `--color-{component}-{variant}-{property}` 패턴 준수
- [ ] (tokens.ts 있는 경우) `.css.ts` import 직후 `globalStyle(":root", createXxxTokens() as any)` 주입됨
- [ ] `:focus-visible` 스타일 정의됨 (`outline: none` 단독 금지)
- [ ] `@igloo/igloo-icons` 에서 아이콘 import
- [ ] `src/stories/{Name}/{Name}.stories.tsx` 있음 / title `"StyleGuide/{Name}"` / 필수 export 4개(`Playground`, `Variants`, `Sizes`, `States`)
- [ ] `src/index.ts` barrel 에 등록됨

---

## 10. 컴포넌트 토큰 스펙

### 커스텀 프로퍼티 네이밍

```
--color-{component}-{variant}-{property}[-{state}]

component:  button, input, badge …
variant:    primary, secondary, outline, ghost, danger …
property:   bg, text, border, focus …
state:      hover, active, disabled (없으면 기본 상태)
```

### 유형별 필수 토큰

모든 값은 `vars.*` 참조. 고정 `"#ffffff"` 는 전 테마 동일값일 때만 허용 — **주석 필수**.

#### 인터랙티브 컴포넌트 (Button, IconButton, Toggle 등)

| variant | 필수 토큰 | 기본값 |
|---|---|---|
| **primary** | `--color-{comp}-primary-bg` | `vars.color.primary` |
| | `--color-{comp}-primary-bg-hover` | `vars.color.primaryHover` |
| | `--color-{comp}-primary-text` | `"#ffffff"` |
| | `--color-{comp}-primary-focus` | `vars.color.primary` |
| **secondary** | `--color-{comp}-secondary-bg` | `vars.color.surface` |
| | `--color-{comp}-secondary-bg-hover` | `color-mix(in srgb, {primary} 12%, transparent)` |
| | `--color-{comp}-secondary-text` | `vars.color.text` |
| | `--color-{comp}-secondary-text-hover` | `vars.color.primary` |
| | `--color-{comp}-secondary-border` | `vars.color.border` |
| | `--color-{comp}-secondary-border-hover` | `vars.color.primary` |
| **outline** | `--color-{comp}-outline-text` | `vars.color.primary` |
| | `--color-{comp}-outline-border` | `vars.color.primary` |
| | `--color-{comp}-outline-bg-hover` | `vars.color.primary` |
| | `--color-{comp}-outline-text-hover` | `"#ffffff"` |
| | `--color-{comp}-outline-focus` | `vars.color.primary` |
| **ghost** | `--color-{comp}-ghost-text` | `vars.color.text` |
| | `--color-{comp}-ghost-bg-hover` | `vars.color.surfaceHover` |
| | `--color-{comp}-ghost-text-hover` | `vars.color.primary` |
| | `--color-{comp}-ghost-focus` | `vars.color.primary` |
| **danger** | `--color-{comp}-danger-bg` | `vars.color.error` |
| | `--color-{comp}-danger-text` | `"#ffffff"` |
| | `--color-{comp}-danger-focus` | `vars.color.error` |

#### 입력 필드 (Input, Textarea, Select 등)

| 토큰 | 기본값 |
|---|---|
| `--color-{comp}-bg` | `vars.color.surface` |
| `--color-{comp}-border` | `vars.color.border` |
| `--color-{comp}-text` | `vars.color.text` |
| `--color-{comp}-placeholder` | `vars.color.textMuted` |
| `--color-{comp}-border-hover` | `vars.color.borderHover` |
| `--color-{comp}-border-focus` | `vars.color.primary` |
| `--color-{comp}-disabled-bg` | `vars.color.surfaceHover` |
| `--color-{comp}-disabled-text` | `vars.color.textMuted` |
| `--color-{comp}-error-border` | `vars.color.error` |
| `--color-{comp}-error-text` | `vars.color.error` |

#### 컨테이너 / 오버레이 (Modal, Popover, Dropdown, Tooltip 등)

| 토큰 | 기본값 |
|---|---|
| `--color-{comp}-bg` | `vars.color.surface` |
| `--color-{comp}-border` | `vars.color.border` |
| `--color-{comp}-text` | `vars.color.textSecondary` |
| `--color-{comp}-title-text` | `vars.color.text` |

#### 네비게이션 (Tabs, SideMenuBar, Pagination 등)

| 토큰 | 기본값 |
|---|---|
| `--color-{comp}-text` | `vars.color.textSecondary` |
| `--color-{comp}-text-hover` | `vars.color.primary` |
| `--color-{comp}-text-active` | `vars.color.primary` |
| `--color-{comp}-bg-active` | `vars.color.secondary` |
| `--color-{comp}-indicator` | `vars.color.primary` |

#### 표시 전용 (Badge, Tag, Chip 등)

색상 variant 하나당 3종 세트: `--color-{comp}-{color}` / `--color-{comp}-{color}-subtle` (`rgba(base, 0.08)`) / `--color-{comp}-{color}-text`

---

## 11. 접근성

> **기준**: WCAG 2.1 Level AA

- **색상 대비**: 일반 텍스트 4.5:1 이상 / 대형 텍스트(18px+) 3:1 이상 / 포커스 인디케이터 3:1 이상
- **키보드**: 모든 인터랙티브 요소 키보드 접근 가능. 모달/드롭다운 포커스 트랩 구현.
- **스크린 리더**: 아이콘만 있는 버튼 `aria-label` 필수. 모달 `role="dialog" aria-modal="true" aria-labelledby` 필수.
- **포커스 스타일**: `outline: none` 단독 금지. `is-focus` 클래스 함께 선언해 Storybook 재현.

---

→ 다음: [CUSTOMIZATION_RULES.md](CUSTOMIZATION_RULES.md) — 변경 권한·허용/금지 범위·마이그레이션
