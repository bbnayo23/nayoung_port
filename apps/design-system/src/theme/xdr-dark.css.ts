import { createGlobalTheme } from '@vanilla-extract/css'
import { vars } from './contract.css'
import { commonTokens } from './tokens'

/**
 * XDR-dark(다크) 테마 — `:root.dark` 에 적용.
 * Storybook 툴바 또는 소비 앱이 `<html class="dark">` 를 토글하면 활성화된다.
 *
 * `:root.dark` 셀렉터는 specificity (0,2,0) 로 라이트 `:root` (0,1,0) 보다 항상 우선하므로
 * import 순서와 무관하게 다크 값이 이긴다.
 *
 * 색상 외(spacing·radius·font·transition·field·size)는 테마 무관이라 commonTokens 를 그대로 쓴다.
 * 브랜드(페리윙클 인디고 #7187ff)는 유지하되, 차가운 슬레이트 배경 위에서 읽히도록
 * 표면/경계/텍스트 계조를 다크로 재구성하고 hover/active 는 (라이트와 반대로) 더 밝게 간다.
 */
createGlobalTheme(':root.dark', vars, {
  color: {
    primary: '#7187ff',
    primaryHover: '#8b9bff', // 다크에서는 hover 시 밝게
    primaryActive: '#a3b0ff',
    // 라이트와 동일한 파생식 — primary 가 동일 브랜드값이라 결과도 같다. 필요시 다크 전용으로 % 조정 가능.
    primarySoft: 'color-mix(in srgb, var(--ds-color-primary) 10%, transparent)',
    primarySoftStrong: 'color-mix(in srgb, var(--ds-color-primary) 15%, transparent)',
    focusRing: 'color-mix(in srgb, var(--ds-color-primary) 20%, transparent)',
    secondary: '#21263a', // 인디고 틴트 표면 (라이트의 #f1f3ff 대응)
    secondaryHover: '#2a3147',
    background: '#15171c', // 차가운 near-black 슬레이트
    surface: '#1d2026', // 떠 있는 표면
    surfaceHover: '#262a32',
    border: '#2e333d',
    borderHover: '#3c4250',
    text: '#e6e8eb',
    textSecondary: '#9aa1ac',
    textMuted: '#6b727d',
    textInverse: '#ffffff', // primary/컬러 위 콘텐츠용 — 다크에서도 흰색 유지
    success: '#20c997',
    warning: '#fab005',
    error: '#ff6b6b',
    info: '#7187ff',
  },
  spacing: commonTokens.spacing,
  radius: commonTokens.radius,
  font: {
    ...commonTokens.font,
    family: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  },
  shadow: {
    // 다크에서는 그림자를 더 깊게 — 표면 분리감 유지
    sm: '0 1px 3px rgba(0,0,0,0.4)',
    md: '0 4px 12px rgba(0,0,0,0.5)',
    lg: '0 8px 24px rgba(0,0,0,0.6)',
  },
  transition: commonTokens.transition,
  header: {
    ...commonTokens.header,
    background: '#1d2026',
  },
  sidebar: {
    ...commonTokens.sidebar,
    background: '#15171c',
  },
  field: commonTokens.field,
})
