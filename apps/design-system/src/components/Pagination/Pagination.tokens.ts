// Pagination component-specific CSS variable tokens
// 솔루션 × 라이트/다크별 페이지네이션 전용 컬러 토큰

// ── XDR ──────────────────────────────────────────────────────────────────────

export const paginationTokensXdrLight = {
  '--color-pagination-item-bg': 'var(--color-bg-surface)',
  '--color-pagination-active-bg': 'var(--color-primary)',
  '--color-pagination-hover-bg': 'var(--color-gray150)',
  '--pagination-radius': 'var(--radius-md)',
} as const

export const paginationTokensXdrDark = {
  '--color-pagination-item-bg': 'var(--color-bg-surface)',
  '--color-pagination-active-bg': 'var(--color-primary)',
  '--color-pagination-hover-bg': 'var(--color-white-30)',
  '--pagination-radius': 'var(--radius-md)',
} as const

// ── SOAR ─────────────────────────────────────────────────────────────────────

export const paginationTokensSoarLight = {
  '--color-pagination-item-bg': 'var(--color-bg-surface)',
  '--color-pagination-active-bg': 'var(--color-primary)',
  '--color-pagination-hover-bg': 'var(--color-hover-overlay)',
  '--pagination-radius': 'var(--radius-md)',
} as const

export const paginationTokensSoarDark = {
  '--color-pagination-item-bg': 'var(--color-bg-surface)',
  '--color-pagination-active-bg': 'var(--color-primary)',
  '--color-pagination-hover-bg': 'var(--color-hover-overlay)',
  '--pagination-radius': 'var(--radius-md)',
} as const

// ── EXD ──────────────────────────────────────────────────────────────────────

export const paginationTokensExdLight = {
  '--color-pagination-item-bg': 'var(--pagination-bg-01)',
  '--color-pagination-active-bg': 'var(--pagination-active-01)',
  '--color-pagination-hover-bg': 'var(--hover-001)',
  '--pagination-radius': 'var(--radius-md)',
} as const

export const paginationTokensExdDark = {
  '--color-pagination-item-bg': 'var(--pagination-bg-01)',
  '--color-pagination-active-bg': 'var(--pagination-active-01)',
  '--color-pagination-hover-bg': 'var(--hover-001)',
  '--pagination-radius': 'var(--radius-md)',
} as const
