# 디자인 시스템 (@port/design-system)

## 1. 개요 & 설계 철학

`@port/design-system` 은 React + [vanilla-extract](https://vanilla-extract.style) 기반의 컴포넌트 라이브러리다. 스타일은 빌드 타임에 정적 CSS 로 추출되며, 모든 시각 값은 단일 토큰 컨트랙트(`vars`)에서만 끌어온다. 컴포넌트 API 설계는 MUI(Material UI)의 철학 — 즉 "테마(토큰)를 single source of truth 로 두고, 컴포넌트는 variant/size 같은 prop 으로 변형을 노출하며, 합성을 통해 복잡한 UI 를 구성한다" — 를 참고했다. 이 시스템은 다음 4가지 패턴을 일관되게 채택한다.

### Variant 기반 설계

각 컴포넌트는 `variant`(시각적 강조/의미)와 `size`(크기) 같은 prop 으로 미리 정의된 변형 집합을 노출한다. 실제 변형은 vanilla-extract 의 `styleVariants` 로 정의되어 키 → 클래스 매핑이 타입 안전하게 보장된다. 예를 들어 `Button.css.ts` 는 `styleVariants({ primary, secondary, outline, ghost, danger }, 'ds-button-variant')` 와 `styleVariants({ sm, md, lg }, 'ds-button-size')` 를 정의하고, `Button.tsx` 는 `cx(styles.root, styles.variants[variant], styles.sizes[size], …)` 로 합성한다. `ButtonVariant`/`ButtonSize` 타입은 `keyof typeof variants` 로 도출되므로, 토큰이 곧 타입이 된다.

이 패턴 덕분에 소비자는 임의의 색/패딩을 넘기는 대신 정해진 디자인 어휘(`variant="danger"`, `size="lg"`)만 선택하면 되고, 디자인 일관성이 컴파일 타임에 강제된다.

### Compound Pattern

복합 컴포넌트(Card, Modal, Drawer, Tabs, Select, Table)는 React Context + 서브컴포넌트 부착 방식으로 구성된다. 루트 컴포넌트가 `createContext` 로 상태/설정을 내려주고, `Object.assign(Root, { … })` 또는 `Root.Sub = Sub` 로 서브컴포넌트를 프로퍼티로 붙인다. 사용 측은 `<Card><Card.Header/><Card.Body/></Card>` 처럼 자연스럽게 조합한다.

- `Card.Header` / `Card.Body` / `Card.Footer` — `CardContext` 로 `padding` 밀도를 공유.
- `Modal.Header` / `Modal.Body` / `Modal.Footer` — `ModalContext` 로 `onClose`·`titleId` 공유 (Header 가 `titleId` 를 `<h2>` 에 부여하면 dialog 의 `aria-labelledby` 가 이를 참조).
- `Tabs.List` / `Tabs.Trigger` / `Tabs.Panel` — `TabsContext` 로 `activeValue`·`setValue`·`variant`·`baseId` 공유.
- `Select.Trigger` / `Select.Content` / `Select.Option` — `SelectContext` 로 열림 상태·선택값·옵션 레지스트리 공유. `Option` 은 마운트 시 자신의 라벨을 `registerOption` 으로 등록한다.
- 컨텍스트가 없는 곳에서 서브컴포넌트를 쓰면 `<Tabs.Trigger> 는 <Tabs> 내부에서만 사용할 수 있습니다.` 같은 명시적 에러를 던진다.

### Slot Pattern

컴포넌트의 특정 영역을 `ReactNode` prop 으로 외부 주입(slot)할 수 있게 한다.

- `Button` 의 `leftIcon` / `rightIcon` — 라벨 좌·우에 임의 노드 배치.
- `Input` 의 `leftSlot` / `rightSlot` — 필드 내부 좌·우에 아이콘 등 배치 (`aria-hidden` span 으로 감쌈).
- `Card` 의 `Card.Header`/`Body`/`Footer` 서브컴포넌트 자체가 콘텐츠 슬롯 역할.
- `Select.Option` 은 마운트 시 children 을 라벨 레지스트리에 등록해, Trigger 가 선택값 라벨을 표시하는 데 사용한다(슬롯의 변형).

### Design Token 기반 Theme

`theme/tokens.css.ts` 에서 `createGlobalTheme(':root', { … })` 로 토큰을 `:root` 의 CSS 커스텀 프로퍼티로 굽고, 동시에 타입 안전한 참조 객체 `vars` 를 반환한다. 모든 `*.css.ts` 파일은 하드코딩 값 대신 `import { vars } from '../../theme/tokens.css'` 후 `vars.color.brand[600]`, `vars.space[4]` 처럼만 참조한다. 이로써 색·간격·타이포·그림자·z-index 가 한 곳에서 관리되는 single source of truth 가 된다. (예외적으로 Button danger hover 의 `#b91c1c`, Input invalid focus 의 인라인 rgba 정도만 직접 값을 쓴다.)

---

## 2. 디자인 토큰 (Theme)

`vars` 는 `createGlobalTheme(':root', …)` 의 반환값이다. 카테고리별 전체 구조는 다음과 같다.

### color

| 그룹 | 키 | 값 |
| --- | --- | --- |
| brand (50→900) | `brand.50` … `brand.900` | `#eef2ff` `#e0e7ff` `#c7d2fe` `#a5b4fc` `#818cf8` `#6366f1` `#4f46e5` `#4338ca` `#3730a3` `#312e81` |
| gray (50→900) | `gray.50` … `gray.900` | `#f9fafb` `#f3f4f6` `#e5e7eb` `#d1d5db` `#9ca3af` `#6b7280` `#4b5563` `#374151` `#1f2937` `#111827` |
| semantic | `success` / `successSoft` | `#16a34a` / `#dcfce7` |
| semantic | `warning` / `warningSoft` | `#d97706` / `#fef3c7` |
| semantic | `danger` / `dangerSoft` | `#dc2626` / `#fee2e2` |
| semantic | `info` / `infoSoft` | `#2563eb` / `#dbeafe` |
| surface | `background` | `#ffffff` |
| surface | `surface` | `#ffffff` |
| surface | `surfaceMuted` | `#f9fafb` |
| surface | `border` | `#e5e7eb` |
| surface | `borderStrong` | `#d1d5db` |
| surface | `overlay` | `rgba(17, 24, 39, 0.5)` |
| text | `text` | `#111827` |
| text | `textSecondary` | `#6b7280` |
| text | `textDisabled` | `#9ca3af` |
| text | `textInverse` | `#ffffff` |
| focus | `focusRing` | `rgba(99, 102, 241, 0.45)` |

### space (4px 베이스)

| 키 | 값 | 키 | 값 |
| --- | --- | --- | --- |
| `0` | `0` | `5` | `1.25rem` |
| `1` | `0.25rem` | `6` | `1.5rem` |
| `2` | `0.5rem` | `8` | `2rem` |
| `3` | `0.75rem` | `10` | `2.5rem` |
| `4` | `1rem` | `12` | `3rem` |
|  |  | `16` | `4rem` |

### radius

| 키 | 값 |
| --- | --- |
| `none` | `0` |
| `sm` | `4px` |
| `md` | `8px` |
| `lg` | `12px` |
| `xl` | `16px` |
| `full` | `9999px` |

### font

| 카테고리 | 키 | 값 |
| --- | --- | --- |
| family | `sans` | `'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` |
| family | `mono` | `'SF Mono', ui-monospace, SFMono-Regular, Menlo, monospace` |
| size | `xs` / `sm` / `md` / `lg` / `xl` / `2xl` | `0.75rem` / `0.875rem` / `0.95rem` / `1.125rem` / `1.375rem` / `1.75rem` |
| weight | `regular` / `medium` / `semibold` / `bold` | `400` / `500` / `600` / `700` |
| lineHeight | `tight` / `normal` / `relaxed` | `1.25` / `1.5` / `1.75` |

### shadow

| 키 | 값 |
| --- | --- |
| `sm` | `0 1px 2px rgba(17, 24, 39, 0.06)` |
| `md` | `0 4px 12px rgba(17, 24, 39, 0.1)` |
| `lg` | `0 12px 32px rgba(17, 24, 39, 0.16)` |
| `focus` | `0 0 0 3px rgba(99, 102, 241, 0.45)` |

### zIndex (레이어 스택)

| 키 | 값 | 사용처 |
| --- | --- | --- |
| `base` | `0` | 기본 |
| `dropdown` | `1000` | Select.Content |
| `sticky` | `1100` | Table stickyHeader |
| `drawer` | `1200` | Drawer 오버레이 |
| `modal` | `1300` | Modal 오버레이 |
| `tooltip` | `1400` | Tooltip box |
| `toast` | `1500` | Toast viewport |

### duration

| 키 | 값 |
| --- | --- |
| `fast` | `0.12s` |
| `normal` | `0.2s` |
| `slow` | `0.32s` |

### 사용법

`vars` 는 **컴포넌트 스타일 파일(`*.css.ts`) 안에서 사용하는 토큰**이다. 새 스타일을 작성할 때:

```ts
// MyThing.css.ts
import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const root = style(
  {
    padding: `${vars.space[3]} ${vars.space[4]}`,
    borderRadius: vars.radius.md,
    background: vars.color.surface,
    color: vars.color.text,
    boxShadow: vars.shadow.sm,
  },
  'ds-my-thing',
)
```

`vars` 는 패키지 진입점에서도 재노출되므로(`import { vars } from '@port/design-system'`) 앱 코드에서 인라인 스타일 등에 참조할 수도 있지만, 원칙적으로 스타일은 `.css.ts` 안에서 작성한다.

### 다크 테마 확장

`vars` 는 컨트랙트(키 구조)를 정의하므로, 동일 컨트랙트를 다른 값으로 채운 테마를 `createTheme(vars, { … })` 로 만들어 특정 스코프 클래스에 적용하면 된다. 예: `export const darkTheme = createTheme(vars, { color: { background: '#0b0f19', text: '#f9fafb', … }, … })` 후 `<div className={darkTheme}>…</div>` 로 감싸면 그 하위 트리의 모든 `vars.*` 참조가 다크 값으로 재바인딩된다. 컴포넌트 코드는 전혀 수정할 필요가 없다.

---

## 3. 공통 규칙

### 3.1 Class Naming Rule

모든 스타일은 vanilla-extract 의 두 번째 인자(debug name) 규칙을 따른다: `style(styleObject, 'ds-<component>[-part]')`, `styleVariants(map, 'ds-<component>-<group>')`. 빌드된 클래스명에 이 디버그 네임이 접두로 붙어 DevTools 에서 어떤 컴포넌트/파트인지 식별할 수 있다. 실제 코드에서 확인한 네임 예시:

- 루트: `ds-button`, `ds-input`, `ds-card`, `ds-table`, `ds-badge`
- variant/size: `ds-button-variant`, `ds-button-size`, `ds-input-variant`, `ds-card-padding`, `ds-badge-tone`, `ds-modal-size`
- 파트: `ds-card-header`, `ds-modal-overlay`, `ds-modal-dialog`, `ds-select-trigger`, `ds-select-content`, `ds-select-option`, `ds-tabs-trigger`, `ds-toast-viewport`, `ds-tooltip-box`, `ds-input-field`

`cx()` 유틸로 root + variant + size + state 클래스를 합성한다:

```ts
className={cx(
  styles.root,
  styles.variants[variant],
  styles.sizes[size],
  hasError && styles.invalid,   // falsy 는 자동 제거
  className,                     // 소비자 override 는 항상 마지막
)}
```

### 3.2 Styled Components 구조 (공통 골격)

각 컴포넌트는 4-파일 폴더 구조를 가진다.

```
components/Button/
  Button.tsx          # 컴포넌트 + Props 인터페이스 (forwardRef)
  Button.css.ts       # style / styleVariants (vanilla-extract)
  Button.stories.tsx  # Storybook
  index.ts            # re-export
```

`.tsx` 의 공통 골격:

```tsx
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cx } from '../../utils/cx'
import * as styles from './Button.css'           // 스타일은 namespace import

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, ...rest },  // 기본값 + className/...rest 패스스루
  ref,
) {
  return (
    <button
      ref={ref}
      className={cx(styles.root, styles.variants[variant], styles.sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  )
})
```

`.css.ts` 의 공통 골격: base `style(…, 'ds-x')` + 변형은 `styleVariants(…, 'ds-x-variant')`, 필요 시 `keyframes`(애니메이션)·`globalStyle`(자식 셀렉터)을 추가한다. 변형 키 타입은 `export type XVariant = keyof typeof variants` 로 도출한다.

### 3.3 공통 유틸

| 유틸 | 시그니처 | 역할 |
| --- | --- | --- |
| `cx` | `cx(...values: ClassValue[]): string` | falsy(`false`/`null`/`undefined`)를 걸러내고 나머지를 공백으로 join. 조건부 클래스 합성. |
| `Portal` | `<Portal container?>{children}</Portal>` | `createPortal` 로 자식을 `document.body`(기본) 바깥으로 렌더. SSR 안전 — 마운트 전에는 `null` 을 반환하고 `useEffect` 이후에만 portal 렌더. Modal/Drawer/Tooltip/Toast 가 공유. |
| `useFocusTrap` | `useFocusTrap<T>(active, onClose?): RefObject<T>` | 컨테이너 안에 포커스를 가둔다. 활성화 시 첫 포커서블로 이동, Tab/Shift+Tab 순환, Escape → `onClose`, 비활성화 시 직전 포커스로 복귀. Modal/Drawer 가 사용. |

---

## 4. 컴포넌트

### Button

**개요** — variant·size 기반의 기본 액션 버튼. 아이콘 슬롯과 로딩 상태를 지원한다.

**Props Interface**

```ts
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 시각적 강조 단계 */
  variant?: ButtonVariant   // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  /** 크기 */
  size?: ButtonSize         // 'sm' | 'md' | 'lg'
  /** 부모 폭을 가득 채움 */
  fullWidth?: boolean
  /** 로딩 스피너 표시 + 비활성화 */
  loading?: boolean
  /** 라벨 앞 아이콘 슬롯 */
  leftIcon?: ReactNode
  /** 라벨 뒤 아이콘 슬롯 */
  rightIcon?: ReactNode
}
```

기본값: `variant='primary'`, `size='md'`, `fullWidth=false`, `loading=false`.

**Variant** — `primary`(brand[600] 배경/흰 글자), `secondary`(gray[100] 배경), `outline`(투명 배경 + borderStrong 테두리), `ghost`(투명 배경, hover 시 gray[100]), `danger`(danger 배경/흰 글자).

**Size** — `sm`(height 2rem, fontSize sm), `md`(2.5rem, md), `lg`(3rem, lg).

**State** — `:hover:not(:disabled)`(variant별 진한 색), `:focus-visible`(shadow.focus 링), `:disabled`(opacity 0.5, not-allowed). `loading` 시 `disabled` 처리 + `aria-busy` + 스피너 표시(라벨은 `visibility:hidden` 으로 폭 유지).

**Class Naming** — `ds-button`(root), `ds-button-variant`, `ds-button-size`, `ds-button-full`, `ds-button-hidden-label`, `ds-button-spinner`.

**Styled Components 구조** — `root`(style) + `variants`/`sizes`(styleVariants) + `fullWidth`/`hiddenLabel`/`spinner`(style). `spin` keyframes 로 스피너 회전.

**Usage Example**

```tsx
<Button variant="primary" size="md" leftIcon={<PlusIcon />} onClick={save}>
  저장
</Button>
<Button variant="danger" loading>삭제 중…</Button>
```

**Accessibility** — 네이티브 `<button>`. `loading` 시 `aria-busy`, 스피너는 `aria-hidden`. `:focus-visible` 포커스 링 제공. `disabled || loading` 시 실제로 disabled 처리.

**Do / Don't**
- Do: 의미에 맞는 variant 사용 — 파괴적 액션은 `danger`.
- Do: 아이콘만 있는 버튼에는 `aria-label` 을 직접 부여.
- Do: 비동기 액션 중에는 `loading` 으로 중복 제출 방지.
- Don't: `loading` 과 `disabled` 를 수동으로 동시에 관리하지 말 것(컴포넌트가 처리).
- Don't: 색을 인라인 style 로 덮어쓰지 말 것 — variant 로 표현.

---

### Input

**개요** — label/helper/error 와 좌·우 슬롯을 갖춘 텍스트 입력 필드.

**Props Interface**

```ts
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 시각적 스타일 (outline·filled) */
  variant?: InputVariant    // 'outline' | 'filled'
  /** 크기 (sm·md·lg) */
  size?: InputSize          // 'sm' | 'md' | 'lg'
  /** 필드 위에 노출되는 라벨 */
  label?: ReactNode
  /** 필드 아래 보조 설명 */
  helperText?: ReactNode
  /** 에러 메시지 — 존재하면 invalid 처럼 동작하며 helperText 보다 우선한다 */
  errorText?: ReactNode
  /** 에러(유효성 실패) 상태 강제 지정 */
  invalid?: boolean
  /** input 앞(왼쪽) 슬롯 — 아이콘 등 */
  leftSlot?: ReactNode
  /** input 뒤(오른쪽) 슬롯 — 아이콘 등 */
  rightSlot?: ReactNode
  /** 부모 폭을 가득 채움 */
  fullWidth?: boolean
}
```

기본값: `variant='outline'`, `size='md'`, `invalid=false`, `fullWidth=false`. `size` 는 네이티브 HTML `size` 와 충돌하므로 `Omit` 후 재정의.

**Variant** — `outline`(surface 배경 + borderStrong 테두리), `filled`(surfaceMuted 배경 + 투명 테두리).

**Size** — `sm`(minHeight 2rem), `md`(2.5rem), `lg`(3rem). 각각 패딩·fontSize 다름.

**State** — `:focus-within`(컨테이너에 shadow.focus 링), `invalid`(`invalid` prop 또는 `errorText` 존재 시 — danger 테두리 + danger 톤 포커스 링), `disabled`(필드 디밍 opacity 0.6 + not-allowed). 에러 메시지는 danger 색.

**Class Naming** — `ds-input`(root), `ds-input-full`, `ds-input-label`, `ds-input-field`, `ds-input-variant`, `ds-input-size`, `ds-input-invalid`, `ds-input-disabled`, `ds-input-control`, `ds-input-slot`, `ds-input-message`, `ds-input-error`.

**Styled Components 구조** — `root`(label+field+message 세로 스택) → `field`(테두리·`:focus-within` 링 담당) → 내부 `control`(투명 input) + `slot`. variant/size 는 styleVariants, invalid/disabled 는 별도 style.

**Usage Example**

```tsx
<Input
  label="이메일"
  placeholder="you@example.com"
  helperText="회사 이메일을 입력하세요"
  leftSlot={<MailIcon />}
  fullWidth
/>

<Input label="비밀번호" type="password" errorText="8자 이상 입력하세요" />
```

**Accessibility** — `label` 은 `htmlFor` 로 `<input>` 과 연결되고, `id` 미지정 시 `useId()` 로 생성. 에러(`invalid || errorText`) 시 `aria-invalid` 설정. helper/error 메시지에는 `aria-describedby` 로 연결되는 id(`${inputId}-message`)를 부여. 좌·우 슬롯은 장식이므로 `aria-hidden`.

**Do / Don't**
- Do: 모든 입력에 `label` 또는 외부 `aria-label` 부여.
- Do: 유효성 메시지는 `errorText` 로 — 자동으로 invalid 스타일 + aria 연결.
- Do: 슬롯에는 장식 아이콘만(의미는 label/helperText 로).
- Don't: `helperText` 와 `errorText` 를 동시에 노출 기대 — 에러가 우선한다.
- Don't: 컨테이너가 테두리를 담당하므로 `<input>` 에 직접 border 를 주지 말 것.

---

### Select

**개요** — Context 기반의 커스텀(비네이티브) 셀렉트 컴파운드 컴포넌트. controlled/uncontrolled 모두 지원.

**Props Interface**

```ts
export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 제어 모드 선택값 (제공 시 controlled) */
  value?: string
  /** 비제어 모드 초기 선택값 */
  defaultValue?: string
  /** 선택값 변경 콜백 */
  onValueChange?: (value: string) => void
  /** 미선택 시 표시할 placeholder */
  placeholder?: string
  /** 비활성화 */
  disabled?: boolean
  /** 크기 */
  size?: SelectSize         // 'sm' | 'md' | 'lg'
  children?: ReactNode
}

export interface SelectTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  children?: ReactNode      // 선택값 라벨이 없을 때의 fallback
}

export interface SelectContentProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode      // Select.Option 들
}

export interface SelectOptionProps extends Omit<LiHTMLAttributes<HTMLLIElement>, 'value'> {
  /** 이 옵션의 값 */
  value: string
  /** 비활성화 — 선택/하이라이트 대상에서 제외 */
  disabled?: boolean
  children?: ReactNode
}
```

서브컴포넌트: `Select.Trigger`, `Select.Content`, `Select.Option`. `size` 기본 `'md'`, `disabled` 기본 `false`.

**Variant** — N/A (시각 variant 없음).

**Size** — `sm`(height 2rem), `md`(2.5rem), `lg`(3rem) — Trigger 패딩·fontSize 결정.

**State** — Trigger: `:hover:not(:disabled)`(borderStrong), `:focus-visible`(shadow.focus + brand[500] 테두리), `:disabled`(opacity 0.5). 열림 시 chevron 180° 회전(`chevronOpen`). Option: hover/키보드 하이라이트(`optionHighlighted` — brand[50] 배경), 선택됨(`optionSelected` — semibold + 체크마크), 비활성(`[aria-disabled="true"]` — opacity 0.5).

**Class Naming** — `ds-select`(root), `ds-select-trigger`, `ds-select-trigger-size`, `ds-select-placeholder`, `ds-select-value`, `ds-select-chevron`, `ds-select-chevron-open`, `ds-select-content`, `ds-select-option`, `ds-select-option-highlighted`, `ds-select-option-selected`, `ds-select-check`.

**Styled Components 구조** — `root`(position:relative 기준) + `trigger`/`triggerSizes` + `content`(absolute, zIndex dropdown, shadow.md) + `option`/하이라이트/선택 스타일 + chevron/check. 키보드 핸들러(`useListboxKeyboard`)와 바깥 클릭 닫기는 `.tsx` 에 있음.

**Usage Example**

```tsx
<Select defaultValue="kr" onValueChange={setCountry}>
  <Select.Trigger />
  <Select.Content>
    <Select.Option value="kr">대한민국</Select.Option>
    <Select.Option value="us">United States</Select.Option>
    <Select.Option value="jp" disabled>日本 (준비중)</Select.Option>
  </Select.Content>
</Select>
```

**Accessibility** — Trigger: `role="combobox"` + `aria-haspopup="listbox"` + `aria-expanded` + `aria-controls`(listbox id). Content: `role="listbox"` + `tabIndex=-1`. Option: `role="option"` + `aria-selected`, 비활성 시 `aria-disabled`. 키보드: ArrowDown/Up(하이라이트 이동, 닫힌 상태면 열기), Home/End(처음/끝), Enter·Space(선택; 닫힌 상태면 열기), Escape(닫고 Trigger 로 포커스 복귀). 바깥 mousedown 또는 선택 시 닫힘.

**Do / Don't**
- Do: controlled 가 필요하면 `value` + `onValueChange` 쌍으로 사용.
- Do: 비활성 옵션에는 `disabled` 를 줘 키보드 내비게이션에서 제외.
- Do: `Select.Trigger` 는 보통 children 없이 두어 선택값/placeholder 자동 표시.
- Don't: `Select.Option` 을 `Select.Content` 바깥에 두지 말 것.
- Don't: 네이티브 `<select>` 의 폼 제출 동작을 기대하지 말 것(필요 시 hidden input 별도 연결).

---

### Card

**개요** — 콘텐츠를 묶는 컨테이너 카드. Header/Body/Footer 슬롯을 조합한다.

**Props Interface**

```ts
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 시각적 스타일 — elevated(그림자) · outlined(보더) · filled(연한 배경) */
  variant?: CardVariant     // 'elevated' | 'outlined' | 'filled'
  /** 내부 슬롯(Header/Body/Footer)에 적용될 기본 패딩 밀도 */
  padding?: CardPadding     // 'none' | 'sm' | 'md' | 'lg'
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>
export type CardBodyProps   = HTMLAttributes<HTMLDivElement>
export type CardFooterProps = HTMLAttributes<HTMLDivElement>
```

서브컴포넌트: `Card.Header`, `Card.Body`, `Card.Footer`. 기본값: `variant='elevated'`, `padding='md'`. `padding` 은 `CardContext` 로 슬롯에 전달된다.

**Variant** — `elevated`(shadow.md), `outlined`(1px border), `filled`(surfaceMuted 배경).

**Size** — N/A. 대신 `padding` 밀도: `none`(0), `sm`(space[3]), `md`(space[4]), `lg`(space[6]).

**State** — 인터랙션 상태 없음(정적 컨테이너).

**Class Naming** — `ds-card`(root), `ds-card-variant`, `ds-card-padding`, `ds-card-header`, `ds-card-body`, `ds-card-footer`.

**Styled Components 구조** — `root`(세로 flex, overflow hidden, radius lg) + `variants` + `paddings`(styleVariants). `header`(아래 1px 보더 + semibold), `body`(flex:1), `footer`(위 1px 보더 + 우측 정렬).

**Usage Example**

```tsx
<Card variant="outlined" padding="lg">
  <Card.Header>프로젝트 설정</Card.Header>
  <Card.Body>여기에 본문 내용을 둡니다.</Card.Body>
  <Card.Footer>
    <Button variant="ghost">취소</Button>
    <Button>저장</Button>
  </Card.Footer>
</Card>
```

**Accessibility** — 기본은 시맨틱 의미 없는 `<div>`. 그룹 의미가 필요하면 `role`/`aria-label` 을 직접 지정(`...rest` 로 패스스루).

**Do / Don't**
- Do: 패딩 일관성을 위해 children 을 `Card.Body` 안에 넣을 것.
- Do: 액션 버튼은 `Card.Footer` 에 — 자동 우측 정렬됨.
- Do: 카드 위 카드처럼 표면 대비가 필요하면 `outlined`/`filled` 선택.
- Don't: Header/Body/Footer 에 개별 padding 을 인라인으로 덮어쓰기보다 루트 `padding` 을 조정.
- Don't: 클릭 가능한 카드 전체를 만들 때 div 에 onClick 만 주지 말 것 — 키보드 접근 고려.

---

### Tabs

**개요** — Context 기반 탭 인터페이스 컴파운드 컴포넌트. roving tabindex 키보드 내비게이션을 구현한다.

**Props Interface**

```ts
export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 제어 모드 활성 value (제공 시 controlled) */
  value?: string
  /** 비제어 모드 초기 value */
  defaultValue?: string
  /** 활성 탭 변경 콜백 */
  onValueChange?: (value: string) => void
  /** 시각 variant — line(언더라인) | enclosed(박스형) */
  variant?: TabsVariant     // 'line' | 'enclosed'
  children?: ReactNode
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  'aria-label'?: string     // 스크린리더용 라벨
  children?: ReactNode
}

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 이 트리거가 활성화하는 패널의 value */
  value: string
  /** 비활성화 — 키보드 내비게이션 대상에서 제외 */
  disabled?: boolean
  children?: ReactNode
}

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** 이 패널을 활성화하는 트리거의 value */
  value: string
  children?: ReactNode
}
```

서브컴포넌트: `Tabs.List`, `Tabs.Trigger`, `Tabs.Panel`. 기본 `variant='line'`.

**Variant** — `line`(하단 언더라인 인디케이터, 활성 시 brand[600]), `enclosed`(박스형 탭, 활성 시 surface 배경 + 보더).

**Size** — N/A.

**State** — Trigger: `:hover:not(:disabled)`(text 색), `:focus-visible`(shadow.focus), `:disabled`(opacity 0.5), active(variant별 강조 + semibold). Panel: 비활성 시 `hidden`.

**Class Naming** — `ds-tabs`(root), `ds-tabs-list`, `ds-tabs-trigger`, `ds-tabs-trigger-line`, `ds-tabs-trigger-line-active`, `ds-tabs-trigger-enclosed`, `ds-tabs-trigger-enclosed-active`, `ds-tabs-panel`.

**Styled Components 구조** — `root`(세로 flex) + `list`(styleVariants: line/enclosed, 둘 다 하단 보더) + `trigger`(공통) + line/enclosed 별 트리거·active 스타일 + `panel`.

**Usage Example**

```tsx
<Tabs defaultValue="overview" variant="line">
  <Tabs.List aria-label="프로젝트 섹션">
    <Tabs.Trigger value="overview">개요</Tabs.Trigger>
    <Tabs.Trigger value="activity">활동</Tabs.Trigger>
    <Tabs.Trigger value="settings" disabled>설정</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="overview">개요 내용</Tabs.Panel>
  <Tabs.Panel value="activity">활동 내용</Tabs.Panel>
</Tabs>
```

**Accessibility** — List: `role="tablist"`. Trigger: `role="tab"` + `aria-selected` + `aria-controls`(패널 id), 활성만 `tabIndex=0` 나머지 `-1`(roving tabindex), 포커스(키보드 이동) 시 자동 활성화. Panel: `role="tabpanel"` + `aria-labelledby`(트리거 id), 비활성 시 `hidden`, 활성은 `tabIndex=0`. 키보드: ArrowLeft/Right(활성화 가능 트리거 사이 wrap 이동), Home/End(처음/끝).

**Do / Don't**
- Do: `Tabs.List` 에 `aria-label` 을 줄 것.
- Do: Trigger 와 Panel 의 `value` 를 정확히 짝지을 것.
- Do: 항상 사용 불가 탭에는 `disabled`.
- Don't: 패널을 항상 마운트해 두려 하지 말 것 — 비활성 패널은 children 을 렌더하지 않는다.
- Don't: tablist 안에 tab 이 아닌 인터랙티브 요소를 섞지 말 것.

---

### Modal

**개요** — Portal + 포커스 트랩 기반 중앙 정렬 다이얼로그 컴파운드 컴포넌트.

**Props Interface**

```ts
export interface ModalProps {
  /** 열림 여부 (제어 컴포넌트) */
  open: boolean
  /** 닫기 요청 콜백 — Escape / 오버레이 클릭 / X 버튼에서 호출 */
  onClose: () => void
  /** 다이얼로그 최대 폭 */
  size?: ModalSize          // 'sm' | 'md' | 'lg'
  /** 오버레이 클릭으로 닫기 허용 */
  closeOnOverlayClick?: boolean
  /** Modal.Header / Modal.Body / Modal.Footer */
  children: ReactNode
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> { children: ReactNode }
export interface ModalBodyProps   extends HTMLAttributes<HTMLDivElement> { children: ReactNode }
export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> { children: ReactNode }
```

서브컴포넌트: `Modal.Header`(타이틀 + X 버튼), `Modal.Body`, `Modal.Footer`. 기본값: `size='md'`, `closeOnOverlayClick=true`.

**Variant** — N/A.

**Size** — 다이얼로그 최대 폭: `sm`(360px), `md`(520px), `lg`(720px). 높이는 `maxHeight: 85vh`.

**State** — `open`(false 시 `null` 반환 — 미렌더). 오버레이 fadeIn, 다이얼로그 scaleIn 애니메이션. 열림 동안 body 스크롤 잠금.

**Class Naming** — `ds-modal-overlay`, `ds-modal-dialog`, `ds-modal-size`, `ds-modal-header`, `ds-modal-title`, `ds-modal-close`, `ds-modal-body`, `ds-modal-footer`.

**Styled Components 구조** — `overlay`(fixed inset:0, zIndex modal, flex center) + `dialog`(surface, shadow.lg, scaleIn) + `sizes` + header/title/closeButton/body/footer. `fadeIn`·`scaleIn` keyframes.

**Usage Example**

```tsx
const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>열기</Button>
<Modal open={open} onClose={() => setOpen(false)} size="md">
  <Modal.Header>삭제 확인</Modal.Header>
  <Modal.Body>정말 삭제하시겠습니까? 되돌릴 수 없습니다.</Modal.Body>
  <Modal.Footer>
    <Button variant="ghost" onClick={() => setOpen(false)}>취소</Button>
    <Button variant="danger" onClick={confirmDelete}>삭제</Button>
  </Modal.Footer>
</Modal>
```

**Accessibility** — `role="dialog"` + `aria-modal="true"` + `aria-labelledby`(Modal.Header `<h2>` 의 `titleId` 참조). `useFocusTrap` 으로 열림 동안 포커스를 다이얼로그에 가두고 닫히면 직전 포커스로 복귀. Escape 로 닫힘(`useFocusTrap` 의 onClose). 오버레이 클릭은 `closeOnOverlayClick` + target===currentTarget 일 때만. X 버튼은 `aria-label="닫기"`.

**Do / Don't**
- Do: `Modal.Header` 를 항상 포함 — aria-labelledby 가 연결된다.
- Do: `open`/`onClose` 를 부모 state 로 제어.
- Do: 위험한 확인 모달은 `closeOnOverlayClick={false}` 고려.
- Don't: 모달 안에 또 다른 모달을 중첩하지 말 것(포커스 트랩 충돌).
- Don't: 포커스 가능한 요소가 하나도 없는 모달을 만들지 말 것.

---

### Drawer

**개요** — 화면 모서리에 앵커링되는 슬라이드 패널 컴파운드 컴포넌트. Modal 과 동일한 포커스 트랩/스크롤 잠금 패턴.

**Props Interface**

```ts
export interface DrawerProps {
  /** 열림 여부 (제어 컴포넌트) */
  open: boolean
  /** 닫기 요청 콜백 — Escape / 오버레이 클릭 / X 버튼에서 호출 */
  onClose: () => void
  /** 패널이 붙는 방향 */
  side?: DrawerSide         // 'left' | 'right' | 'top' | 'bottom'
  /** 좌/우는 폭, 상/하는 높이를 제어 */
  size?: DrawerSize         // 'sm' | 'md' | 'lg'
  /** 오버레이 클릭으로 닫기 허용 */
  closeOnOverlayClick?: boolean
  /** Drawer.Header / Drawer.Body / Drawer.Footer */
  children: ReactNode
}

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> { children: ReactNode }
export interface DrawerBodyProps   extends HTMLAttributes<HTMLDivElement> { children: ReactNode }
export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> { children: ReactNode }
```

서브컴포넌트: `Drawer.Header`(타이틀 + X 버튼), `Drawer.Body`, `Drawer.Footer`. 기본값: `side='left'`, `size='md'`, `closeOnOverlayClick=true`.

**Variant** — N/A (대신 `side`).

**Size** — 좌/우(`widthSizes`): `sm`(280px), `md`(360px), `lg`(480px), 모두 maxWidth 90vw. 상/하(`heightSizes`): `sm`(200px), `md`(320px), `lg`(480px), 모두 maxHeight 90vh. `side` 가 left/right 면 width, top/bottom 이면 height 적용.

**State** — `open`(false 시 미렌더). 오버레이 fadeIn + side 별 slide-in 애니메이션(slideInLeft/Right/Top/Bottom). 열림 동안 body 스크롤 잠금.

**Class Naming** — `ds-drawer-overlay`, `ds-drawer-overlay-side`, `ds-drawer-panel`, `ds-drawer-panel-side`, `ds-drawer-width`, `ds-drawer-height`, `ds-drawer-header`, `ds-drawer-title`, `ds-drawer-close`, `ds-drawer-body`, `ds-drawer-footer`.

**Styled Components 구조** — `overlay`(fixed, zIndex drawer) + `overlaySides`(side별 정렬) + `panel` + `panelSides`(side별 풀높이/풀폭 + slide 애니메이션) + `widthSizes`/`heightSizes` + header/title/closeButton/body/footer.

**Usage Example**

```tsx
const [open, setOpen] = useState(false)

<Drawer open={open} onClose={() => setOpen(false)} side="right" size="md">
  <Drawer.Header>필터</Drawer.Header>
  <Drawer.Body>여기에 필터 폼을 둡니다.</Drawer.Body>
  <Drawer.Footer>
    <Button variant="ghost" onClick={() => setOpen(false)}>닫기</Button>
    <Button onClick={apply}>적용</Button>
  </Drawer.Footer>
</Drawer>
```

**Accessibility** — `role="dialog"` + `aria-modal="true"` + `aria-labelledby`(Drawer.Header `<h2>`). `useFocusTrap` 으로 포커스 트랩 + 직전 포커스 복귀. Escape 로 닫힘. 오버레이 클릭은 `closeOnOverlayClick` + target===currentTarget. X 버튼 `aria-label="닫기"`.

**Do / Don't**
- Do: 화면 흐름에 맞는 `side` 선택(필터·상세는 보통 `right`).
- Do: 긴 콘텐츠는 `Drawer.Body` 에 — 자동 스크롤.
- Do: `Drawer.Header` 로 제목을 주어 aria-labelledby 연결.
- Don't: Drawer 와 Modal 을 동시에 열지 말 것(포커스 트랩 중첩).
- Don't: 전체 화면을 덮어야 하는 콘텐츠에 Drawer 를 쓰지 말 것 — Modal 또는 라우트 고려.

---

### Table

**개요** — 시맨틱 `<table>` 기반 데이터 테이블. Context 로 size/variant/stickyHeader 를 셀에 전달한다.

**Props Interface**

```ts
export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** simple(기본) · striped(짝수 행 배경) */
  variant?: TableVariant    // 'simple' | 'striped'
  /** 셀 밀도 — sm · md(기본) */
  size?: TableSize          // 'sm' | 'md'
  /** thead 를 스크롤 시 상단 고정 (스크롤되는 높이 제한이 필요) */
  stickyHeader?: boolean
  /** 부모 폭을 가득 채움 (기본 true) */
  fullWidth?: boolean
  /** 가로 스크롤 래퍼에 전달할 속성 (예: 높이 제한 style) */
  wrapperProps?: HTMLAttributes<HTMLDivElement>
}

export type TableHeadProps = HTMLAttributes<HTMLTableSectionElement>
export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>
export type TableRowProps  = HTMLAttributes<HTMLTableRowElement>

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** 텍스트 정렬 */
  align?: TableAlign        // 'left' | 'center' | 'right'
}
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign
}
```

서브컴포넌트: `Table.Head`, `Table.Body`, `Table.Row`, `Table.HeaderCell`, `Table.Cell`. 기본값: `variant='simple'`, `size='md'`, `stickyHeader=false`, `fullWidth=true`, 셀 `align='left'`.

**Variant** — `simple`(기본), `striped`(tbody 짝수 행 surfaceMuted 배경 — `globalStyle` 로 `> tr:nth-of-type(even)` 타겟).

**Size** — `sm`(패딩 space[2]/[3], fontSize sm), `md`(space[3]/[4], fontSize md). 셀은 Context 에서 size 를 읽는다.

**State** — `stickyHeader` 시 헤더 셀 `position:sticky; top:0; zIndex sticky`. 행은 하단 1px 보더.

**Class Naming** — `ds-table-wrapper`, `ds-table-wrapper-sticky`, `ds-table`(root), `ds-table-full`, `ds-table-row`, `ds-table-striped`, `ds-table-cell`, `ds-table-header-cell`, `ds-table-size`, `ds-table-align`, `ds-table-sticky-header`.

**Styled Components 구조** — `wrapper`(가로 스크롤) + `root`(borderCollapse) + `row` + `stripedBody`(빈 style + `globalStyle` 짝수 행 셀렉터) + `cellBase`/`headerCell` + `sizes`/`aligns`(styleVariants) + `stickyHeaderCell`.

**Usage Example**

```tsx
<Table variant="striped" size="md" stickyHeader wrapperProps={{ style: { maxHeight: 320 } }}>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>이름</Table.HeaderCell>
      <Table.HeaderCell align="right">금액</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>박나영</Table.Cell>
      <Table.Cell align="right">₩12,000</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

**Accessibility** — 시맨틱 `<table>`/`<thead>`/`<tbody>`/`<tr>` 요소 사용. 헤더 셀은 `<th scope="col">` 로 렌더. `stickyHeader` 사용 시 `wrapperProps` 의 style 등으로 높이 제한이 필요하다.

**Do / Don't**
- Do: 헤더 행은 `Table.HeaderCell`(th)로 — scope=col 자동 부여.
- Do: 숫자/금액 컬럼은 `align="right"`.
- Do: `stickyHeader` 시 `wrapperProps` 로 높이 제한을 줄 것.
- Don't: `Table.Cell` 을 `th` 대신 헤더에 쓰지 말 것(시맨틱·접근성 손실).
- Don't: 레이아웃 목적으로 Table 을 쓰지 말 것 — 데이터 표에만.

---

### Badge

**개요** — 상태/카테고리를 나타내는 라벨 배지. variant(색) × appearance(표현) 매트릭스.

**Props Interface**

```ts
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 색상 의미 (neutral·brand·success·warning·danger·info) */
  variant?: BadgeVariant       // 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info'
  /** 시각적 표현 방식 (solid·soft·outline) */
  appearance?: BadgeAppearance // 'solid' | 'soft' | 'outline'
  /** 크기 (sm·md) */
  size?: BadgeSize             // 'sm' | 'md'
  /** 라벨 앞 상태 점 표시 */
  dot?: boolean
}
```

기본값: `variant='neutral'`, `appearance='soft'`, `size='md'`, `dot=false`. 내부적으로 `tone = ${appearance}-${variant}`(예: `'soft-success'`)로 톤 클래스를 선택한다.

**Variant** — 색 의미: `neutral`(gray), `brand`, `success`, `warning`, `danger`, `info`. 표현 방식(appearance)과 곱해져 18개 톤(`solid-*`/`soft-*`/`outline-*`)을 형성. `solid`(base 색 배경 + inverse 글자), `soft`(연한 배경 + base 글자), `outline`(투명 배경 + base 테두리/글자).

**Size** — `sm`(fontSize xs, minHeight 1.25rem), `md`(fontSize sm, minHeight 1.5rem).

**State** — 인터랙션 상태 없음. `dot` 시 currentColor 를 따르는 선행 점.

**Class Naming** — `ds-badge`(root), `ds-badge-size`, `ds-badge-tone`, `ds-badge-dot`.

**Styled Components 구조** — `root`(inline-flex, radius full) + `sizes` + `tones`(18개 styleVariants, 키 `${appearance}-${variant}`) + `dot`(currentColor 원).

**Usage Example**

```tsx
<Badge variant="success" appearance="soft" dot>활성</Badge>
<Badge variant="danger" appearance="solid">오류</Badge>
<Badge variant="brand" appearance="outline" size="sm">베타</Badge>
```

**Accessibility** — 단순 시각 라벨이므로 `<span>` 으로 렌더. `dot` 은 장식이라 `aria-hidden`. 의미는 텍스트 자식으로 전달하는 것을 권장(색만으로 의미 전달 금지).

**Do / Don't**
- Do: 의미는 항상 텍스트로 — 색/점은 보조 신호.
- Do: 동일 화면에서 appearance 를 일관되게 사용.
- Do: 강한 강조가 필요할 때만 `solid`.
- Don't: 클릭 가능한 배지로 쓰지 말 것 — 인터랙션이 필요하면 Button/링크.
- Don't: `dot` 만으로 상태를 표현(스크린리더가 못 읽음)하지 말 것.

---

### Tooltip

**개요** — 트리거에 hover/focus 하면 Portal 로 띄우는 툴팁. position:fixed 좌표 계산.

**Props Interface**

```ts
export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface TooltipProps {
  /** 툴팁에 표시할 내용 */
  content: ReactNode
  /** 트리거 기준 표시 위치 (기본 'top') */
  placement?: TooltipPlacement
  /** 표시까지의 지연 시간(ms, 기본 200) */
  delay?: number
  /** 트리거가 될 단일 엘리먼트 */
  children: ReactElement
}
```

기본값: `placement='top'`, `delay=200`.

**Variant** — N/A. 위치는 `placement` 4방향. (gap 8px)

**Size** — N/A. box maxWidth 240px.

**State** — `open`(hover/focus + delay 후 표시; mouseleave/blur/Escape 로 숨김). 표시 시 box fadeIn. 트리거의 `getBoundingClientRect()` 로 좌표 계산.

**Class Naming** — `ds-tooltip-trigger`(inline-flex 래퍼 span), `ds-tooltip-box`(Portal box, position:fixed).

**Styled Components 구조** — `trigger`(inline-flex span — 측정·핸들러 부착) + `box`(fixed, zIndex tooltip, gray[900] 배경, pointerEvents:none, fadeIn). 좌표는 인라인 style 로 주입.

**Usage Example**

```tsx
<Tooltip content="저장하지 않은 변경사항이 있습니다" placement="bottom">
  <Button variant="ghost" aria-label="정보">ⓘ</Button>
</Tooltip>
```

**Accessibility** — 툴팁 박스에 `role="tooltip"` + `id`. 트리거 래퍼 span 에 표시 중 `aria-describedby={id}` 연결. hover/focus 로 표시, mouseleave/blur/Escape 로 숨김(키보드 사용자도 focus 로 동일 동작). box 는 `pointer-events:none` 으로 마우스 가림 방지.

**Do / Don't**
- Do: `children` 은 포커스 가능한 단일 엘리먼트(button/a 등)로.
- Do: 짧은 보조 설명에만 — 긴 내용은 별도 UI.
- Do: 아이콘 버튼에는 `aria-label` 도 함께(툴팁은 보조).
- Don't: 필수 정보를 툴팁에만 담지 말 것(터치 기기는 hover 불가).
- Don't: `children` 으로 여러 엘리먼트/텍스트를 넘기지 말 것 — 단일 ReactElement.

---

### Toast

**개요** — 명령형 API(`useToast`)로 띄우는 토스트 알림. `ToastProvider` 가 viewport 와 큐를 관리한다.

**Props Interface**

```ts
export interface ToastOptions {
  /** 제목 (필수) */
  title: string
  /** 보조 설명 */
  description?: string
  /** 의미색 (기본 'info') */
  variant?: ToastVariant    // 'info' | 'success' | 'warning' | 'danger'
  /** 자동 사라짐 시간(ms, 기본 4000) */
  duration?: number
}

export interface ToastProviderProps {
  children: ReactNode
  /** viewport 코너 위치 (기본 'top-right') */
  position?: ToastPosition  // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  /** 동시 표시 최대 개수 (기본 5, 초과 시 가장 오래된 것부터 제거) */
  max?: number
}

// useToast(): { toast: (opts: ToastOptions) => string; dismiss: (id: string) => void }
```

기본값: provider `position='top-right'`, `max=5`; toast `variant='info'`, `duration=4000`.

**Variant** — `info`(파랑), `success`(녹색), `warning`(주황), `danger`(빨강) — 각각 좌측 accent 보더 + 아이콘 색. variant별 인라인 SVG 아이콘.

**Size** — N/A. viewport width 360px(maxWidth `calc(100vw - 2rem)`).

**State** — 큐 기반: `duration > 0` 이면 `setTimeout` 후 자동 제거(`duration=0`이면 수동만), `max` 초과 시 가장 오래된 것부터 제거. 진입 애니메이션은 position 의 좌/우에 따라 `enterLeft`/`enterRight` slide.

**Class Naming** — `ds-toast-viewport`, `ds-toast-position`, `ds-toast-card`, `ds-toast-enter-right`, `ds-toast-enter-left`, `ds-toast-variant`, `ds-toast-icon`, `ds-toast-body`, `ds-toast-title`, `ds-toast-description`, `ds-toast-close`.

**Styled Components 구조** — `viewport`(fixed, zIndex toast, column, pointerEvents:none) + `positions`(코너별 + bottom 은 column-reverse) + `card`(좌측 4px accent 보더) + `variants` + enter 애니메이션 + body/title/description/closeButton.

**Usage Example**

```tsx
// 앱 루트에 한 번
<ToastProvider position="bottom-right" max={3}>
  <App />
</ToastProvider>

// 컴포넌트 안에서
function SaveButton() {
  const { toast } = useToast()
  return (
    <Button
      onClick={() =>
        toast({ title: '저장 완료', description: '변경사항이 반영되었습니다', variant: 'success' })
      }
    >
      저장
    </Button>
  )
}
```

**Accessibility** — info/success/warning 토스트는 `role="status"` + `aria-live="polite"`, danger 는 `role="alert"` + `aria-live="assertive"`. 아이콘은 `aria-hidden`. 닫기 버튼은 `aria-label="닫기"`. viewport 는 `pointer-events:none`(카드만 `auto`)로 하부 클릭을 막지 않음.

**Do / Don't**
- Do: `ToastProvider` 를 앱 루트에 한 번만 마운트.
- Do: 중요한 오류는 `variant="danger"`(assertive alert).
- Do: 사용자가 액션해야 하면 `duration: 0` 으로 자동 닫힘 비활성화 고려.
- Don't: 같은 메시지를 연달아 spam 하지 말 것(`max` 로 잘려도 UX 저하).
- Don't: 폼 유효성 같은 인라인 피드백을 토스트로 대체하지 말 것 — Input `errorText` 사용.

---

## 5. 설치 & 사용

이 패키지는 monorepo 내부에서 소스를 직접 소비한다.

```tsx
// 컴포넌트 import (배럴: src/index.ts)
import { Button, Card, Modal, Tabs, useToast, vars } from '@port/design-system'
```

- `src/index.ts` 가 진입점에서 `reset.css` 를 부수효과로 import 하고, `vars`/유틸/모든 컴포넌트를 re-export 한다.
- **Storybook 실행**: `pnpm storybook` (각 컴포넌트의 `*.stories.tsx` 확인).
- **빌드**: `pnpm --filter @port/design-system build`.
