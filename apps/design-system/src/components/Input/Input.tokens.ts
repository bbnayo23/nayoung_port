// Input component-specific CSS variable tokens
// 솔루션 × 라이트/다크별 입력 필드 전용 컬러 토큰

// ── XDR ──────────────────────────────────────────────────────────────────────

export const inputTokensXdrLight = {
  '--color-input-bg': 'var(--color-white)',
  '--color-input-border': 'var(--color-gray400)',
  '--color-input-text': 'var(--color-gray800)',
  '--color-input-disabled-bg': 'var(--color-gray200)',
  '--input-radius': 'var(--radius-md)',
} as const

export const inputTokensXdrDark = {
  '--color-input-bg': 'var(--color-gray700)',
  '--color-input-border': 'var(--color-gray700)',
  '--color-input-text': 'var(--color-white)',
  '--color-input-disabled-bg': 'var(--color-gray600)',
  '--input-radius': 'var(--radius-md)',
} as const

// ── SOAR ─────────────────────────────────────────────────────────────────────

export const inputTokensSoarLight = {
  '--color-input-bg': 'var(--color-bg-surface)',
  '--color-input-border': 'var(--color-border)',
  '--color-input-text': 'var(--color-text-primary)',
  '--color-input-disabled-bg': 'var(--color-bg-elevated)',
  '--input-radius': 'var(--radius-md)',
} as const

export const inputTokensSoarDark = {
  '--color-input-bg': 'var(--color-bg-surface)',
  '--color-input-border': 'var(--color-border)',
  '--color-input-text': 'var(--color-text-primary)',
  '--color-input-disabled-bg': 'var(--color-bg-elevated)',
  '--input-radius': 'var(--radius-md)',
} as const

// ── EXD ──────────────────────────────────────────────────────────────────────

export const inputTokensExdLight = {
  '--color-input-bg': 'var(--box-bg-001)',
  '--color-input-border': 'var(--box-border-001)',
  '--color-input-text': 'var(--text-001)',
  '--color-input-disabled-bg': 'var(--disabled-001)',
  '--input-radius': 'var(--radius-md)',
} as const

export const inputTokensExdDark = {
  '--color-input-bg': 'var(--box-bg-001)',
  '--color-input-border': 'var(--box-border-001)',
  '--color-input-text': 'var(--text-001)',
  '--color-input-disabled-bg': 'var(--disabled-001)',
  '--input-radius': 'var(--radius-md)',
} as const
