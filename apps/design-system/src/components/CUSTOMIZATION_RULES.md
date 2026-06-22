# Style Guide Components — 커스터마이징 규칙

> **목적**: 어떤 계층을 바꿀 수 있고 어떤 계층은 건드리면 안 되는지 한 곳에서 정의한다.

---

## 한 눈에 보기

| 계층 | 위치 | 변경 가능 여부 |
|------|------|:--------------:|
| 글로벌 테마 컨트랙트 | `themes/contract.css.ts` | **금지** — 키 이름 변경·삭제 불가 |
| 공통 토큰 값 | `themes/tokens.ts` | **금지** — 디자인 합의 없이 수치 변경 불가 |
| 컴포넌트 토큰 | `{Comp}.tokens.ts` | **허용** — 유일한 색상 커스터마이징 포인트 |
| 컴포넌트 스타일·구현·API | `{Comp}.css.ts` / `.tsx` / `.types.ts` | **관리자만** |
| 파일 구조·명명·Storybook | 폴더·파일 이름, story 필수 export | **금지** |

---

## §0 수정 권한

### 화면 개발자가 할 수 있는 것

| 방법 | 예시 |
|------|------|
| `className` prop 으로 스타일 override | `<Button className={styles.wide}>` |
| 앱 내 `.css.ts` 파일 생성 | `packages/console/src/**/*.css.ts` |
| `packages/ui/src/apps/<app>/` 하위 composite 작성 | `apps/console/LogSearch/` |
| 컴포넌트 조합 및 배치 | 페이지 컴포넌트 자유 구성 |

**그 외 모든 수정은 관리자 전용.** `style-guide-components/` 하위 파일을 직접 수정해야 하는 경우 관리자에게 요청한다.

### pre-commit 보호

`*.css.ts`, `*.tokens.ts`, `themes/contract.css.ts`, `themes/tokens.ts` 는 pre-commit 훅이 보호한다.

| 변경 유형 | 비관리자 | 관리자 |
|-----------|:-------:|:------:|
| 기존 파일에 토큰 **추가만** | ✅ | ✅ |
| 기존 토큰 **수정·삭제** | ❌ | ✅ |
| 토큰 파일 **신규 생성·삭제** | ❌ | ✅ |

관리자: `scripts/token-admins.json` 에 등록된 git 이메일.

---

## §1 절대 변경 금지 — 인프라 계층

### `themes/contract.css.ts` — 키 이름 변경·삭제 금지

TypeScript 에서 참조하는 CSS 변수 키 이름은 변경하거나 삭제할 수 없다. 변경 시 전체 컴포넌트가 일괄 깨진다. 새 토큰 **추가**는 가능하다.

### `themes/tokens.ts` — 수치 변경 금지

디자인 합의 없이 수치를 바꾸면 모든 테마의 모양이 함께 바뀐다.
각 토큰의 수치와 컴포넌트 적용 기준은 `packages/ui/design.md` — `## 스타일링 규칙 > Radius` 섹션을 참조한다.

---

## §2 허용 — 컴포넌트 토큰 (`*.tokens.ts`)

**색상 커스터마이징의 유일한 경로**다. `.css.ts` 에 hex 를 직접 쓰는 대신 이 파일의 CSS 변수 값을 교체한다.

### 허용 범위

- `vars.*` 로 참조하는 값 교체
- 모든 테마에서 동일한 고정값(`"#ffffff"` 등) 직접 작성 — **주석 필수**
- 패턴을 지키는 새 CSS 변수 항목 추가 (`COMPONENT_GUIDE.md §10` 네이밍 참조)

### 금지 범위

- `vars.*` 를 우회하는 hex 직접 작성 — 색상값은 [src/themes/xdr-basic.css.ts](../themes/xdr-basic.css.ts) 참조
- `--color-{component}-{variant}-{property}` 패턴을 벗어난 변수명
- 다른 컴포넌트의 변수를 이 파일에서 정의

### Badge / Tag hex 예외

`vars.*` 에 없는 도메인 고정색(severity 색 등)은 `.tokens.ts` 에서 hex 직접 정의를 허용한다. 주석으로 근거를 명시한다.

### 레거시 패턴 — 솔루션별 분리 금지 (신규 컴포넌트)

`*XdrLight` / `*SoarLight` 등 솔루션별 객체 분리는 레거시 패턴이다.
신규 컴포넌트에서 복제 금지. 신규 컴포넌트는 `vars.*` 단일 참조로 모든 테마를 커버한다.

---

## §3 컴포넌트 스타일 (`*.css.ts`) — 특수 허용 케이스

### Dimmed overlay — `.css.ts` 직접 작성 허용

모달 배경 오버레이(`rgba(0, 0, 0, 0.5)`)는 모든 테마에서 동일한 값이므로 `.css.ts` 직접 작성이 허용된다.

### 토큰 주입 표준 vs 레거시 fallback

**표준 (신규 컴포넌트)**: `globalStyle(":root", createXxxTokens() as any)` 로 주입 후 `var(--color-xxx)` 참조.

**레거시 허용 (기존 컴포넌트 한정)**: `var(--color-modal-bg, ${vars.color.surface})` fallback 구문.
신규 컴포넌트에서 fallback 구문 사용 금지. 기존 파일은 `globalStyle` 주입 방식으로 전환 대상이다.

---

## §4 컴포넌트 API — 경계선 케이스

### Badge raw 색상 props — 도메인 예외

`Badge` 의 `backgroundColor`, `borderColor`, `textColor` props 는 색상이 동적으로 결정되는 케이스(커스텀 태그 등)를 위한 예외다. **다른 컴포넌트에 확산하지 않는다.**

### `fullWidth` — 레거시 존재, 신규 금지

`Button` 에 `fullWidth` prop 이 남아 있으나 레거시다. 신규 컴포넌트에서 복제 금지. 너비는 호출자가 `className` 으로 결정한다.

### 기존 Props 제거 금지

이미 공개된 props 를 제거하거나 이름을 바꾸면 소비자 코드가 모두 깨진다 → MAJOR 버전 처리 필요.

---

## §5 마이그레이션 대상 (신규 컴포넌트에서 반복 금지)

| 파일 | 위반 내용 | 올바른 방향 |
|------|-----------|-------------|
| `Input/Input.tokens.ts` | 구형 CSS 변수 직접 참조 | `vars.color.*` 계약 토큰으로 교체 |
| `Pagination/Pagination.tokens.ts` | 솔루션별 토큰 객체 분리 | `vars.*` 단일 참조 방식으로 통합 |
| `DateTimePicker/DateTimePicker.tokens.ts` | 솔루션별 토큰 객체 분리 | `vars.*` 단일 참조 방식으로 통합 |
| `Badge/Badge.tsx` | raw 색상 문자열 props | 도메인 예외 허용, 확산 금지 |
| `Pagination/Pagination.css.ts` | transition 인라인 값 | `vars.transition.fast` 토큰 사용 |
| `Modal/Modal.tokens.ts` | `createModalTokens()` `:root` 주입 없음 | `globalStyle(":root", createModalTokens() as any)` 추가 |
| `Modal/Modal.css.ts` | `boxShadow` 인라인 값 | `vars.shadow.lg` 참조 |

---

## §6 커스터마이징 결정 가이드

| 하고 싶은 것 | 권한 | 방법 |
|---|---|---|
| 색상 — 테마 전반 | 관리자 | `themes/contract.css.ts` 값 변경 (디자인 합의 필수) |
| 색상 — 특정 컴포넌트만 | 관리자 | `{Comp}.tokens.ts` CSS 변수 값을 `vars.*` 로 교체 |
| 레이아웃·크기 — 호출자 화면만 | 화면 개발자 | `className` prop 으로 override |
| 레이아웃·크기 — 컴포넌트 기본값 | 관리자 | `.css.ts` recipe size variant 수치 조정 |
| 새 variant 추가 | 관리자 | `.tokens.ts` 토큰 추가 → `.css.ts` recipe 에 추가 (디자인 합의 후) |
| 새 prop 추가 | 관리자 | semantic/behaviour prop 만 허용. boolean style prop 금지. |

---

## §7 Breaking Change 기준

아래 변경은 반드시 MAJOR 버전 업과 `@deprecated` 처리가 필요하다.

- 기존 props 이름 변경·제거
- `className` / `forwardRef` 제거
- `variant` / `size` enum 에서 기존 값 제거
- `index.ts` 의 기존 named export 제거
- CSS 변수 이름 변경 (외부 override 코드가 깨짐)

---

→ 다음: [SKILL.md](../../../.claude/skills/style-guide-component/SKILL.md) — 실행 절차·파일별 코드 템플릿
