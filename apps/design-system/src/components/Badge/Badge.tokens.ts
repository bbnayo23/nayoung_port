// Badge component-specific CSS variable tokens
// 뱃지 전용 시맨틱 컬러 토큰 — base color에서 파생 색상 자동 생성
//
// ⚠️  이 파일의 hex 값은 의도적으로 하드코딩됩니다.
// Badge는 카테고리·상태를 시각적으로 구분하기 위한 표시 전용(display-only) 컴포넌트입니다.
// 색상은 모든 테마에서 고정되어야 하므로 vars.color.* 시맨틱 토큰을 참조하지 않습니다.
// (SKILL.md 예외 2 — 표시 전용 컴포넌트의 브랜드 고정 팔레트)

// ── Base color 정의 (variant 1개당 1줄) ──────────────────────────────────────

const BADGE_COLORS = {
  red: { base: '#EF4444', dark: '#B91C1C', status: ['#ad0000', '#fc9dbb'], fill: '#F87171' },
  orange: { base: '#F97316', dark: '#993B00', status: ['#993b00', '#fed6c3'], fill: '#FB923C' },
  yellow: { base: '#EAB308', dark: '#935D06', status: ['#935d06', '#fee39c'], fill: '#FBBF24' },
  green: { base: '#22C55E', dark: '#0B8F70', status: ['#0b8f70', '#b4ebcb'], fill: '#34D399' },
  purple: { base: '#8B5CF6', dark: '#6D28D9', status: ['#6D28D9', 'rgba(139,92,246,0.18)'], fill: '#A78BFA' },
  blue: {
    base: '#3B82F6',
    dark: '#1e3a5f',
    status: ['#1D4ED8', 'rgba(59,130,246,0.18)'],
    fill: '#60A5FA',
    light: '#EFF6FF',
  },
  navy: { base: '#4f5eb3', dark: '#3a4785', status: ['#3a4785', 'rgba(79,94,179,0.18)'], fill: '#7181c7' },
  pink: { base: '#EC4899', dark: '#BE185D', status: ['#BE185D', 'rgba(236,72,153,0.18)'], fill: '#F472B6' },
  gray: { base: '#64748B', dark: '#475569', status: ['#475569', 'rgba(100,116,139,0.12)'], fill: '#64748B' },
} as const

// ── 자동 파생 함수 ──────────────────────────────────────────────────────────

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * Badge 컬러 토큰 생성 함수
 *
 * 기본값은 BADGE_COLORS를 사용하며, 외부 프로젝트에서
 * 일부 색상을 override 해 커스텀 토큰을 만들 수 있습니다.
 */
export const createBadgeTokens = (colors: typeof BADGE_COLORS = BADGE_COLORS): Record<string, string> => {
  const tokens: Record<string, string> = {
    '--color-badge-white': '#FFFFFF',
    '--color-badge-medium-gray': '#475569',
  }

  for (const [name, c] of Object.entries(colors)) {
    tokens[`--color-badge-${name}`] = c.base
    tokens[`--color-badge-${name}-dark`] = c.dark
    tokens[`--color-badge-${name}-subtle`] = hexToRgba(c.base, 0.08)
    tokens[`--color-badge-${name}-tag-subtle`] = hexToRgba(c.base, 0.1)
    tokens[`--color-badge-${name}-dark-subtle`] = hexToRgba(c.dark, 0.08)
    tokens[`--color-badge-detail-${name}-subtle`] = hexToRgba(c.base, 0.12)
    tokens[`--color-badge-status-${name}-text`] = c.status[0]
    tokens[`--color-badge-status-${name}-bg`] = c.status[1]
    tokens[`--color-badge-fill-${name}`] = c.fill
    if ('light' in c) {
      tokens[`--color-badge-${name}-light`] = (c as { light: string }).light
    }
  }

  // blue-dark 별칭 (fill × light-blue 에서 사용)
  tokens['--color-badge-blue-dark'] = BADGE_COLORS.blue.dark

  return tokens
}

/** 기본 뱃지 토큰 맵 — CSS 변수명 → 색상값 */
export const badgeTokens = createBadgeTokens()

/** Base color 정의 — 외부에서 커스텀 토큰 생성 시 참조용 */
export { BADGE_COLORS }
