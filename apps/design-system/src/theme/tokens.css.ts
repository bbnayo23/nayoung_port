import { createGlobalTheme } from '@vanilla-extract/css'

/**
 * 디자인 토큰 컨트랙트 — XDR(xdr-basic) 테마 기준.
 *
 * `createGlobalTheme(':root', …)` 는 토큰을 CSS 커스텀 프로퍼티로 `:root` 에 굽고,
 * 동시에 타입 안전한 `vars` 참조 객체를 돌려준다. 모든 컴포넌트는 하드코딩된 값 대신
 * 이 `vars` 만 참조한다 (MUI 의 theme 와 동일한 철학 — single source of truth).
 *
 * 색상값은 @feature-fe/ui 의 XDR 라이트 테마(`themes/xdr-basic.css.ts`)와 일치한다.
 * - 브랜드(주조색): 페리윙클 인디고 #7187ff
 * - 캔버스: 차가운 회청색 배경(#f0f3f6) 위 순백 surface(#ffffff)
 * - 그림자: primary 를 낮은 불투명도로 틴팅한 자주빛
 * 다크 테마가 필요하면 동일 컨트랙트로 `createTheme(vars, {…})` 를 만들어 스코프에 적용한다.
 */
export const vars = createGlobalTheme(':root', {
  color: {
    /** 브랜드(주조색) 스케일 — XDR primary(#7187ff) 앵커. 600=primary / 700=hover / 800=active */
    brand: {
      50: '#f1f3ff',
      100: '#e4e8ff',
      200: '#c4ccff',
      300: '#a6b3ff',
      400: '#8a9bff',
      500: '#7d91ff',
      600: '#7187ff',
      700: '#5a6ee0',
      800: '#4a5dc0',
      900: '#3a4aa0',
    },
    /** 중립(회청색) 스케일 — XDR neutral 계열 */
    gray: {
      50: '#f8f9fa',
      100: '#f1f3ff',
      200: '#e4e8ff',
      300: '#dee2e6',
      400: '#c8cfd8',
      500: '#b5bbc2',
      600: '#6c757d',
      700: '#495057',
      800: '#343a40',
      900: '#212529',
    },
    /** 의미색 (status) — XDR base + 연한 배경(soft) */
    success: '#12b886',
    successSoft: '#e6f7f1',
    warning: '#f59f00',
    warningSoft: '#fff4e0',
    danger: '#fa5252',
    dangerSoft: '#ffe9e9',
    info: '#7187ff',
    infoSoft: '#eef1ff',
    /** 표면(surface) — 회청색 캔버스 위 순백 카드 */
    background: '#f0f3f6',
    surface: '#ffffff',
    surfaceMuted: '#f0f2f4',
    border: '#dee2e6',
    borderStrong: '#c8cfd8',
    overlay: 'rgba(0, 0, 0, 0.5)',
    /** 텍스트 */
    text: '#343a40',
    textSecondary: '#6c757d',
    textDisabled: '#b5bbc2',
    textInverse: '#ffffff',
    /** 포커스 링 — XDR primary 기반 */
    focusRing: 'rgba(113, 135, 255, 0.45)',
  },

  /** 간격 스케일 (4px 베이스) — XDR spacing 과 동일 (xs4/sm8/md16/lg24/xl32/xxl48) */
  space: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
  },

  /** 모서리 반경 — XDR radius (sm 6px / md 8px / lg 12px) */
  radius: {
    none: '0',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  font: {
    family: {
      /** XDR UI 텍스트 — Noto Sans */
      sans: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      /** 코드/로그 뷰어 전용 — JetBrains Mono */
      mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
    },
    /** 폰트 사이즈 (px) — OneUI XDR 스케일과 일치. 기본 size=md → 14px */
    size: {
      xs: '11px',
      sm: '12px',
      md: '14px',
      lg: '16px',
      xl: '20px',
      '2xl': '24px',
    },
    weight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  /** 그림자 — XDR 자주빛 틴팅 (primary 저불투명도) */
  shadow: {
    sm: '0 1px 3px rgba(113, 135, 255, 0.08)',
    md: '0 4px 12px rgba(113, 135, 255, 0.12)',
    lg: '0 8px 24px rgba(113, 135, 255, 0.16)',
    focus: '0 0 0 3px rgba(113, 135, 255, 0.45)',
  },

  /** z-index 스택 — 레이어 컴포넌트가 공유 */
  zIndex: {
    base: '0',
    dropdown: '1000',
    sticky: '1100',
    drawer: '1200',
    modal: '1300',
    tooltip: '1400',
    toast: '1500',
  },

  /** 트랜지션 duration */
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
  },
})

export type ThemeVars = typeof vars
