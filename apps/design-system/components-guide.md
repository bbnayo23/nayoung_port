# components-guide.md — @port/design-system 컴포넌트 기여 가이드

`@port/design-system` 에 컴포넌트를 추가/수정할 때 따르는 규칙. 모노레포 전반 규칙(빌드, 포매팅, TS, 스타일 이중체계, 3D)은 루트 `CLAUDE.md` 를 따르고, 여기서는 **이 패키지의 컴포넌트 작성 디테일**만 다룬다. 원칙은 "코드를 읽으면 보이는 것"이 아니라 "정독해야 아는 관행과 함정"이다.

---

## 1. 스타일링 (vanilla-extract)

- **`recipe()` 는 쓰지 않는다.** 이 레포의 표준은 `style()` + `styleVariants()` 조합이다. 베이스 → `style(base, 'ds-…')`, variant/size 축 → `styleVariants({…}, 'ds-…-variant')`. 신규 컴포넌트도 이 패턴을 따른다.
- **디버그 네임 필수.** `style()`/`styleVariants()` 의 두 번째 인자에 `ds-{component}[-{aspect}|-{variant}]` 형식 문자열을 항상 넣는다. 전 컴포넌트가 100% 이 규칙을 지키며 빌드된 클래스에 그대로 노출된다. 예: `'ds-button'`, `'ds-button-variant'`, `'ds-button-size'`, `'ds-button-full'`, `'ds-button-spinner'`.
- **색은 `vars.*` 만 참조.** `src/theme/tokens.css.ts` 의 `vars.color.*` / `vars.space.*` / `vars.radius.*` / `vars.shadow.*` / `vars.font.*` / `vars.duration.*` 만 쓴다. `.css.ts` 안 hex 하드코딩 금지.
  - 현 예외(따라 하지 말 것): `Button.css.ts:65` 의 danger hover `#e03131`. 이건 정리 대상이며 `vars.color.danger` 파생값으로 가야 한다. 모든 테마에서 동일한 inverse 텍스트 같은 값(`ReactSelect` 의 `#ffffff`)도 부득이하면 **반드시 주석으로 근거를 남긴다**.
- **테마는 단일 라이트 컨트랙트.** `createGlobalTheme(':root', …)` 하나뿐이고 `createTheme()` 다크 테마는 없다(주석상 미래 과제). Storybook toolbar 테마 셀렉터도 없다. "다크에서 검증" 같은 워크플로를 가정하지 말 것.
- **per-component `*.tokens.ts` 파일은 없다.** 만들지 않는다. variant별 색은 `styleVariants` 안에서 `vars.*` 로 직접 분기한다.
- **pseudo-state 는 `selectors` 블록 안에서만.** hover/focus/disabled 를 호출부(stories/tsx)에서 토글하지 않고 `.css.ts` 의 `selectors` 에 정의한다. hover 는 거의 항상 `'&:hover:not(:disabled)'` 형태.
- **`:focus-visible` 은 `outline: 'none'` + 대체 스타일이 세트.** 전 컴포넌트가 `'&:focus-visible': { outline: 'none', boxShadow: vars.shadow.focus }` 패턴을 지킨다. `outline: 'none'` 단독은 금지. `Switch` 처럼 숨은 input 의 포커스를 트랙에 전가할 땐 인접 선택자(`${hiddenInput}:focus-visible + &`)를 쓴다.
- **inline `style={{}}` 는 런타임 동적값에만.** 컴포넌트 tsx 본문은 `className`(=`cx(...)`)만 사용한다. 예외는 (a) `ArboristTree` 의 row 가상화 `style={{ top, height }}` 같이 라이브러리가 런타임에 주는 값, (b) `Button` 라벨 래퍼처럼 레이아웃 정렬용 소량 inline 정도. 정적 스타일은 무조건 `.css.ts` 로.

> 참고: 가이드에 흔히 보이는 `is-{state}` 클래스(Storybook 상태 재현용)는 **이 레포에 구현돼 있지 않다.** 상태는 stories 의 args control 로만 다룬다. 새 컴포넌트에 `is-hover` 류를 도입하지 말 것.

---

## 2. 컴포넌트 API

- **DOM 래퍼는 `forwardRef`.** 단일 element 를 감싸는 컴포넌트는 예외 없이 `forwardRef` 로 작성하고 `ref` 를 루트 element 에 넘긴다.
- **`className?: string` 은 항상 받고 `cx` 로 병합.** 병합기는 `../../utils/cx` 의 `cx` 하나뿐(`cn` 별칭 없음). 구현은 `filter(Boolean).join(' ')` 수준이라 객체/배열 문법은 지원 안 한다 — 조건부는 `cond && styles.x` 로 넘긴다. 표준 순서: `cx(styles.root, styles.variants[variant], styles.sizes[size], flag && styles.flag, className)`. **caller 의 `className` 은 항상 마지막**(override 가능하도록).
- **타입은 `.tsx` 안에 `export interface` 로 정의.** 별도 `.types.ts` 파일을 만들지 않는다(전 컴포넌트가 인라인 정의). `interface XxxProps extends HTMLAttributes<…>` 또는 `ButtonHTMLAttributes<…>` 등 적절한 DOM 타입을 상속하고 `...rest` 로 펼친다.
- **variant/size 의 union 타입은 `.css.ts` 에서 파생해 re-export.** `styleVariants` 키에서 `export type ButtonVariant = keyof typeof variants` 식으로 뽑는다. Props 인터페이스는 이 타입을 import 해서 쓴다. 새 variant 를 추가할 땐 `styleVariants` 객체만 늘리면 타입이 자동 확장된다.
- **`displayName` 은 compound 서브컴포넌트에만.** `Button`/`Input` 같은 단일 컴포넌트엔 안 붙인다(선택사항). compound 는 `'Card'`, `'Card.Header'` 처럼 dot 네임을 명시한다.
- **Compound 컴포넌트는 React Context + 가드 훅 패턴.** 루트가 `createContext` 로 상태(padding/open/value…)를 내려보내고, 서브컴포넌트는 `useXxxContext(part)` 래퍼로 읽되 컨텍스트가 없으면 **한국어 에러를 throw** 한다(예: `` `Modal.${part} 는 <Modal> 내부에서만 사용할 수 있습니다.` ``). 조합은 `Root as XxxComponent` 캐스팅 후 `Card.Header = …` 식으로 부착한다.
- **Hook 사용 규칙.** 컴포넌트 내부에서는 Provider 없이 단독 호출 가능한 훅만 쓴다: React 기본 훅과 `utils/useFocusTrap` 같은 자체완결 UI 훅. 컴포넌트가 **스스로 만든** Context 를 `useContext` 하는 건 허용(Modal/Card 등). 반대로 앱 전역 store/theme/auth provider 에 의존하는 훅은 내부 호출 금지 → props 로 주입하거나 composition 으로 푼다.
- **Provider 의존 훅은 격리한다.** `useToast` 처럼 Provider 가 필요한 훅은 컴포넌트가 내부에서 호출하지 않고, 사용자 코드에서 `ToastProvider` 아래서만 부르도록 강제한다(미설치 시 throw).
- **index.ts 는 순수 re-export.** 컴포넌트값 + 관련 타입을 함께 내보낸다(`export { Button }`, `export type { ButtonProps }`, `export type { ButtonVariant, ButtonSize }`). 로직 금지. 상위 `src/index.ts` barrel 이 전 컴포넌트를 재노출하므로 `@port/design-system` 단일 import 가 가능하다.
- **`hooks.ts` 는 필요할 때만 두는 flat 파일.** 폴더가 아니라 컴포넌트 폴더 안 단일 파일이고 named export 다. 대부분 컴포넌트엔 없다 — 훅이 충분히 복잡할 때만 추가한다.

---

## 3. Props 설계 가이드 (현 코드 현실 반영)

- 허용: semantic/behaviour props(`as`, `role`, `disabled`, `loading`, `open`, `onClose`, `onSelect`)와 **bounded enum**(`variant`/`size`/`tone`/`padding` 등 `styleVariants` 키로 닫힌 집합). 슬롯형 `ReactNode` props(`leftIcon`/`rightIcon`)도 OK.
- 지양: 새로운 boolean style-toggle props(`isCompact`, `dense`, `centered`, `hideHeader`, `contentNoPadding`)와 raw CSS 값 props(`padding: string`, `margin`, `width`, `color`). 이런 건 무한 증식하므로 `className` override 나 기존 enum 분기로 해결한다.
- **현 예외(레거시, 신규 금지):** `fullWidth` boolean 이 `Button`/`Input`/`Table` 에, `noBorder` 가 `ArboristTree` 에 남아 있다. 기존 것은 유지하되 **새 컴포넌트에는 도입하지 않는다.** 폭이 필요하면 caller 가 `className` 으로 `width:100%` 를 주는 쪽이 정석이다.
- raw 값을 받지 말고 bounded enum(`padding="sm|md|lg"` 처럼)으로 닫는다 — `Card` 의 `padding` 이 그 예.

---

## 4. 아이콘

이 레포는 두 출처가 공존하며 **단일 규칙으로 강제되지 않는다.** 용도로 구분한다.

- **도메인/의미 아이콘** (Favorite 버튼의 별, 콘텐츠 아이콘 등): `@port/icon-library` 의 `IconXxx`(예: `IconStar`)를 쓴다. forwardRef 지원.
- **범용 글리프**: `PIcon`(`name` prop 으로 내부 inline-SVG path dict 접근, 24×24 viewBox / strokeWidth 1.75). icon-library 에 없는 기본 글리프는 여기에 추가한다 — 이게 이 레포의 사실상 "공유 icon registry" 다.
- **컴포넌트 기본 장식 아이콘**(`Modal` 의 X 닫기, `Drawer`, `ArboristTree` 의 Chevron/Folder, `Toast` 의 상태 아이콘)은 해당 컴포넌트 안에 **inline SVG 로 직접** 둔다. 이건 의도된 관행이다. SVG 색은 `currentColor` 로 둬서 토큰을 따르게 한다(별도 `vars` 참조 불필요).
- 유니코드 글리프 아이콘(↓ → 등 텍스트 심볼)은 쓰지 않는다. 부득이하면 `<span>` 으로 텍스트 폴백.

---

## 5. Storybook

- **두 파일, 두 title 네임스페이스(혼합 금지):**
  - `{Name}.stories.tsx` → `title: 'Components/{Name}'`. 인터랙티브 playground + args control 중심.
  - `{Name}.docs.stories.tsx` → `title: 'StyleGuide/{Name}'`. 커스텀 문서 페이지.
  - `.storybook/main.ts` 의 stories glob 이 둘 다 자동 포함한다(별도 필터 없음). addon-a11y, addon-docs 둘 다 켜져 있지만 **addon-docs 자동 문서는 쓰지 않고** 커스텀 Documentation story 를 우선한다.
- **`.stories.tsx` export 는 유동적.** 가이드에서 말하는 고정 4개(Playground/Variants/Sizes/States)를 그대로 따르지 않는다. 실제 표준은 `Playground` + `Variants`(또는 `Appearances`/`Colors`) + `Sizes` 에, 도메인 상태를 **개별 story** 로 분산한다(`WithError`, `Loading`, `Disabled`, `WithIcons`, `WithDot`…). `States` 라는 통합 export 는 채택하지 않는다.
- **`.docs.stories.tsx` 는 단일 `DocumentationView` export.** 로컬 헬퍼(`DocPage`/`Section`/`SectionTitle`/`Card`/`PropsTable`/`InlineCode`)를 파일 안에서 직접 구성하고, 레이아웃 inline style 은 `vars` 토큰을 참조한다(`parameters: { layout: 'fullscreen' }`). 헬퍼는 파일마다 반복되지만 이게 현재 방식이다.
- **함정 — render 안의 hook.** 문서/스토리에서 `useState` 같은 훅을 쓸 때는 `render` 로 분리된 함수 컴포넌트(예: `DocumentationView()`) **안에서** 호출한다. story 객체 본문이나 `meta` 레벨에서 훅을 부르면 안 된다(렌더 규칙 위반).
- 외부 라이브러리 래퍼(react-select / react-day-picker / react-arborist / react-highlight-words)는 `vendors/` 분리 없이 `components/` 안에 함께 둔다. 원본 props 를 축약하지 않고 거의 그대로 노출하는 thin wrapper 가 관행.

---

## 6. 접근성 (WCAG 2.1 AA 지향)

- 인터랙티브 컴포넌트는 `:focus-visible` 대체 스타일 필수(§1).
- 아이콘 전용 버튼은 `aria-label` 필수(`IconButton` 이 prop 으로 강제).
- modal/drawer/dropdown 은 포커스 트랩(`utils/useFocusTrap`)을 걸고, 닫히면 직전 포커스로 복귀하며, 열린 동안 body 스크롤을 잠근다. dialog 는 `role="dialog"` + `aria-modal="true"` + `aria-labelledby`(헤더 타이틀 연결).
- 로딩 상태는 `aria-busy` 를 함께 준다(`Button` 참고).
- 색 대비 자동 검증 워크플로는 없다. addon-a11y 가 켜져 있으니 새 컴포넌트는 Storybook a11y 패널을 한 번씩 확인한다.

---

## 7. 신규 컴포넌트 체크리스트

폴더 `src/components/{Name}/` 에 아래를 둔다:

- [ ] `{Name}.tsx` — `forwardRef`(DOM 래퍼일 때), `export interface {Name}Props extends …HTMLAttributes`, `className` 마지막에 `cx` 병합, `...rest` 펼침.
- [ ] `{Name}.css.ts` — `style()`/`styleVariants()` 에 `ds-{name}…` 디버그 네임, `vars.*` 만 참조(hex 금지), `:focus-visible` 대체 스타일, hover 는 `:hover:not(:disabled)`. variant/size union 을 `keyof typeof` 로 export.
- [ ] `{Name}.stories.tsx` — `title: 'Components/{Name}'`, `Playground` + `Variants`/`Sizes` + 도메인 상태 stories, argTypes control.
- [ ] `{Name}.docs.stories.tsx` — `title: 'StyleGuide/{Name}'`, 단일 `DocumentationView` export, `layout: 'fullscreen'`, hook 은 render 함수 안에서.
- [ ] `index.ts` — 컴포넌트 + 타입 re-export만.
- [ ] (선택) `hooks.ts` — 훅이 복잡할 때만 flat 파일로.
- [ ] compound 라면: Context + `useXxxContext` 가드 훅(한국어 에러), 서브컴포넌트 `displayName` dot 네임, `Root as XxxComponent` 부착.
- [ ] 상위 `src/index.ts` barrel 에 추가했는지 확인.
- [ ] 새 boolean style prop / raw CSS 값 prop 을 만들지 않았는지, 새 `is-{state}` 클래스나 `recipe()` 를 도입하지 않았는지 확인.
- [ ] 커밋 전 `pnpm turbo typecheck` 통과(pre-commit 이 이것만 검사한다).

> 거버넌스 메모: 이 레포는 개인 포트폴리오로 워크스페이스 내부 패키지(버전 0.0.0)다. token-admins, MAJOR 버전 정책, `@deprecated` 워크플로, pre-commit 토큰 보호 같은 거버넌스는 운영하지 않는다. 레거시 prop(`fullWidth` 등)도 별도 deprecation 마킹 없이 둔다.
