# TopBar

XDR 테마 전용 상단 우측 고정 액션 바입니다.
알림, 다운로드, 사용자 메뉴, 앱 전환 버튼으로 구성되며, 어떤 XDR 화면이든 공통으로 표시됩니다.

## 사용처

`preview.tsx` 데코레이터에서 XDR 풀스크린 레이아웃의 `FullscreenContent` 상단에 자동 렌더링됩니다.
개별 페이지에서 직접 렌더링하지 않습니다.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| notiCount | number | 0 | 알림 배지 숫자. 0이면 배지 미표시, 99 초과 시 "99+" |
| userName | string | '관리자' | 사용자 이름 |
| userEmail | string | 'admin@example.com' | 사용자 이메일 |
| userRole | string | 'Admin' | 사용자 역할 (배지 표시) |
| defaultTheme | 'light' \| 'dark' \| 'system' | 'light' | 초기 테마 모드 |
| defaultLang | 'ko' \| 'en' \| 'ja' | 'ko' | 초기 언어 코드 |
| onThemeChange | (mode: ThemeMode) => void | - | 테마 변경 콜백 |
| onLangChange | (lang: LangCode) => void | - | 언어 변경 콜백 |
| onNotificationClick | () => void | - | 알림 버튼 클릭 콜백 |
| onDownloadClick | () => void | - | 다운로드 버튼 클릭 콜백 |
| onProfileClick | () => void | - | 프로필 영역 클릭 콜백 |
| onProgramInfoClick | () => void | - | 프로그램 정보 메뉴 클릭 콜백 |
| onLogoutClick | () => void | - | 로그아웃 메뉴 클릭 콜백 |
| products | TopBarProduct[] | DEFAULT_PRODUCTS | 앱 전환 메뉴 목록 |
| defaultActiveProduct | string | 'xdr' | 초기 활성 프로덕트 id |
| onProductChange | (id: string) => void | - | 프로덕트 변경 콜백 |
| langs | TopBarLangItem[] | DEFAULT_LANGS | 언어 목록 (기본: ko/en/ja) |
| className | string | - | 추가 CSS 클래스 |
| ...rest | HTMLAttributes\<HTMLDivElement\> | - | div 기본 속성 전달 |

## 타입

```ts
type ThemeMode = 'light' | 'dark' | 'system'
type LangCode = 'ko' | 'en' | 'ja'

interface TopBarLangItem {
  code: LangCode
  label: string
  flag: string  // 국기 이모지
}

interface TopBarProduct {
  id: string
  label: ReactNode  // 커스텀 라벨 (JSX 가능)
}
```

## 예시

```tsx
import { TopBar } from '@components/TopBar'

// 기본
<TopBar notiCount={5} />

// 커스텀 사용자 정보
<TopBar
  notiCount={3}
  userName="홍길동"
  userEmail="hong@example.com"
  userRole="Operator"
  defaultTheme="dark"
  onThemeChange={(mode) => applyTheme(mode)}
  onLangChange={(lang) => i18n.changeLanguage(lang)}
  onLogoutClick={() => logout()}
/>

// 커스텀 프로덕트 목록
<TopBar
  products={[
    { id: 'xdr', label: 'Spider XDR' },
    { id: 'rn',  label: 'Spider RN' },
  ]}
  defaultActiveProduct="xdr"
  onProductChange={(id) => navigate(`/${id}`)}
/>
```
