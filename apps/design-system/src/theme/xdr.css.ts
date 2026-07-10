import { createGlobalTheme } from '@vanilla-extract/css'
import { vars } from './contract.css'
import { commonTokens } from './tokens'

/**
 * XDR-basic(라이트) 테마를 `:root` 에 적용 — 기본 테마.
 * style-guide-components(2026-OneUI) 의 xdr-basic 팔레트와 일치한다.
 * (브랜드: 페리윙클 인디고 #7187ff / 캔버스: 차가운 회청색 #f0f3f6 위 순백 surface)
 */
createGlobalTheme(':root', vars, {
  color: {
    primary: '#7187ff',
    primaryHover: '#5a6ee0',
    primaryActive: '#4a5dc0',
    // var(--ds-color-primary) 기준 파생 — 테마와 무관하게 primary 를 따라간다.
    primarySoft: 'color-mix(in srgb, var(--ds-color-primary) 10%, transparent)',
    primarySoftStrong: 'color-mix(in srgb, var(--ds-color-primary) 15%, transparent)',
    focusRing: 'color-mix(in srgb, var(--ds-color-primary) 20%, transparent)',
    secondary: '#f1f3ff',
    secondaryHover: '#e4e8ff',
    background: '#f0f3f6',
    surface: '#ffffff',
    surfaceHover: '#f0f2f4',
    border: '#dee2e6',
    borderHover: '#c8cfd8',
    text: '#343a40',
    textSecondary: '#6c757d',
    textMuted: '#b5bbc2',
    textInverse: '#ffffff',
    success: '#12b886',
    warning: '#f59f00',
    error: '#fa5252',
    info: '#7187ff',
  },
  spacing: commonTokens.spacing,
  radius: commonTokens.radius,
  font: {
    ...commonTokens.font,
    family:
      "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans KR', sans-serif",
  },
  shadow: {
    sm: '0 1px 3px rgba(113,135,255,0.08)',
    md: '0 4px 12px rgba(113,135,255,0.12)',
    lg: '0 8px 24px rgba(113,135,255,0.16)',
  },
  transition: commonTokens.transition,
  header: {
    ...commonTokens.header,
    background: '#ffffff',
  },
  sidebar: {
    ...commonTokens.sidebar,
    background: '#f0f3f6',
  },
  field: commonTokens.field,
})
