import { createGlobalTheme } from '@vanilla-extract/css'

/**
 * 디자인 토큰 컨트랙트.
 *
 * `createGlobalTheme(':root', …)` 는 토큰을 CSS 커스텀 프로퍼티로 `:root` 에 굽고,
 * 동시에 타입 안전한 `vars` 참조 객체를 돌려준다. 모든 컴포넌트는 하드코딩된 값 대신
 * 이 `vars` 만 참조한다 (MUI 의 theme 와 동일한 철학 — single source of truth).
 *
 * 다크 테마 등 추가 테마가 필요하면 동일한 컨트랙트로 `createTheme(vars, {…})` 를 만들어
 * 특정 스코프(class)에 적용하면 된다.
 */
export const vars = createGlobalTheme(':root', {
  color: {
    /** 브랜드(주조색) 스케일 — 50(연함) → 900(진함) */
    brand: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
    /** 중립(회색) 스케일 */
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    /** 의미색 (status) — 각 base + 연한 배경(soft) */
    success: '#16a34a',
    successSoft: '#dcfce7',
    warning: '#d97706',
    warningSoft: '#fef3c7',
    danger: '#dc2626',
    dangerSoft: '#fee2e2',
    info: '#2563eb',
    infoSoft: '#dbeafe',
    /** 표면(surface) */
    background: '#ffffff',
    surface: '#ffffff',
    surfaceMuted: '#f9fafb',
    border: '#e5e7eb',
    borderStrong: '#d1d5db',
    overlay: 'rgba(17, 24, 39, 0.5)',
    /** 텍스트 */
    text: '#111827',
    textSecondary: '#6b7280',
    textDisabled: '#9ca3af',
    textInverse: '#ffffff',
    /** 포커스 링 */
    focusRing: 'rgba(99, 102, 241, 0.45)',
  },

  /** 간격 스케일 (4px 베이스) */
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

  /** 모서리 반경 */
  radius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  font: {
    family: {
      sans: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "'SF Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    },
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '0.95rem',
      lg: '1.125rem',
      xl: '1.375rem',
      '2xl': '1.75rem',
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

  /** 그림자 */
  shadow: {
    sm: '0 1px 2px rgba(17, 24, 39, 0.06)',
    md: '0 4px 12px rgba(17, 24, 39, 0.1)',
    lg: '0 12px 32px rgba(17, 24, 39, 0.16)',
    focus: '0 0 0 3px rgba(99, 102, 241, 0.45)',
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
    fast: '0.12s',
    normal: '0.2s',
    slow: '0.32s',
  },
})

export type ThemeVars = typeof vars
