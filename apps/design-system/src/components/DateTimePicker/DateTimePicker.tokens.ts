const shared = {
  '--dt-panel-bg': '#ffffff',
  '--dt-input-bg': 'var(--color-bg)',
  '--dt-preset-hover-bg': 'var(--color-bg-surface)',
  '--dt-day-today-bg': 'var(--color-bg-surface)',
  '--dt-day-range-bg': 'var(--color-primary-subtle)',
  '--dt-day-selected-bg': 'var(--color-primary)',
  '--dt-day-selected-fg': 'var(--color-white)',
} as const

export const dateTimePickerTokensSoarLight = shared
export const dateTimePickerTokensSoarDark = { ...shared, '--dt-panel-bg': '#1e2535' } as const
export const dateTimePickerTokensExdLight = shared
export const dateTimePickerTokensExdDark = { ...shared, '--dt-panel-bg': '#1e2535' } as const
export const dateTimePickerTokensXdrLight = shared
export const dateTimePickerTokensXdrDark = { ...shared, '--dt-panel-bg': '#1e2535' } as const
