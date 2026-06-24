// Tabs component-specific CSS variable tokens
// 솔루션 × 라이트/다크별 탭 전용 컬러 토큰

// ── XDR ──────────────────────────────────────────────────────────────────────

export const tabsTokensXdrLight = {
  '--color-tab-text': 'var(--color-gray700)',
  '--color-tab-text-active': 'var(--color-primary)',
  '--color-tab-text-hover': 'var(--color-primary)',
  '--color-tab-enclosed-bg': 'var(--color-gray150)',
  '--color-tab-item-active-bg': 'var(--color-white)',
} as const

export const tabsTokensXdrDark = {
  '--color-tab-text': 'var(--color-gray100)',
  '--color-tab-text-active': 'var(--color-primary)',
  '--color-tab-text-hover': 'var(--color-primary)',
  '--color-tab-enclosed-bg': 'var(--color-gray850)',
  '--color-tab-item-active-bg': 'var(--color-gray700)',
} as const

// ── SOAR ─────────────────────────────────────────────────────────────────────

export const tabsTokensSoarLight = {
  '--color-tab-text': 'var(--color-text-secondary)',
  '--color-tab-text-active': 'var(--color-primary)',
  '--color-tab-text-hover': 'var(--color-primary)',
  '--color-tab-enclosed-bg': 'var(--color-bg-elevated)',
  '--color-tab-item-active-bg': 'var(--color-bg-surface)',
} as const

export const tabsTokensSoarDark = {
  '--color-tab-text': 'var(--color-text-secondary)',
  '--color-tab-text-active': 'var(--color-primary)',
  '--color-tab-text-hover': 'var(--color-primary)',
  '--color-tab-enclosed-bg': 'var(--color-bg-elevated)',
  '--color-tab-item-active-bg': 'var(--color-bg-surface)',
} as const

// ── EXD ──────────────────────────────────────────────────────────────────────

export const tabsTokensExdLight = {
  '--color-tab-text': 'var(--tab-a-type-text-normal)',
  '--color-tab-text-active': 'var(--primary)',
  '--color-tab-text-hover': 'var(--primary)',
  '--color-tab-enclosed-bg': 'var(--tab-contents-bg-001)',
  '--color-tab-item-active-bg': 'var(--background)',
} as const

export const tabsTokensExdDark = {
  '--color-tab-text': 'var(--tab-a-type-text-normal)',
  '--color-tab-text-active': 'var(--primary)',
  '--color-tab-text-hover': 'var(--primary)',
  '--color-tab-enclosed-bg': 'var(--tab-contents-bg-001)',
  '--color-tab-item-active-bg': 'var(--background)',
} as const
