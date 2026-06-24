// SideMenuBar component-specific CSS variable tokens
// 솔루션 × 라이트/다크별 사이드 메뉴바 전용 컬러 토큰

// ── XDR ──────────────────────────────────────────────────────────────────────

export const sideMenuBarTokensXdrLight = {
  '--color-sidemenu-bg': 'var(--color-bg)',
  '--color-sidemenu-item-text': 'var(--color-gray800)',
  '--color-sidemenu-item-hover-bg': 'var(--color-hover-overlay)',
  '--color-sidemenu-item-active-text': 'var(--color-primary)',
  '--color-sidemenu-item-active-border': 'var(--color-primary)',
  '--color-sidemenu-submenu-text': 'var(--color-gray600)',
  '--color-sidemenu-border': 'var(--color-gray300)',
  '--color-sidemenu-collapse-bg': 'var(--color-bg-surface)',
  '--color-sidemenu-collapse-border': 'var(--color-border)',
  '--color-sidemenu-collapse-text': 'var(--color-text-primary)',
} as const

export const sideMenuBarTokensXdrDark = {
  '--color-sidemenu-bg': 'var(--color-gray950)',
  '--color-sidemenu-item-text': 'var(--color-white)',
  '--color-sidemenu-item-hover-bg': 'var(--color-hover-overlay)',
  '--color-sidemenu-item-active-text': 'var(--color-primary)',
  '--color-sidemenu-item-active-border': 'var(--color-primary)',
  '--color-sidemenu-submenu-text': 'var(--color-gray500)',
  '--color-sidemenu-border': 'var(--color-gray850)',
  '--color-sidemenu-collapse-bg': 'var(--color-bg-surface)',
  '--color-sidemenu-collapse-border': 'var(--color-border)',
  '--color-sidemenu-collapse-text': 'var(--color-text-primary)',
} as const

// ── SOAR ─────────────────────────────────────────────────────────────────────

export const sideMenuBarTokensSoarLight = {
  '--color-sidemenu-bg': 'var(--color-bg)',
  '--color-sidemenu-item-text': 'var(--color-text-primary)',
  '--color-sidemenu-item-hover-bg': 'var(--color-hover-overlay)',
  '--color-sidemenu-item-active-text': 'var(--color-primary)',
  '--color-sidemenu-item-active-border': 'var(--color-primary)',
  '--color-sidemenu-submenu-text': 'var(--color-text-secondary)',
  '--color-sidemenu-border': 'var(--color-border)',
  '--color-sidemenu-collapse-bg': 'var(--color-bg-surface)',
  '--color-sidemenu-collapse-border': 'var(--color-border)',
  '--color-sidemenu-collapse-text': 'var(--color-text-primary)',
} as const

export const sideMenuBarTokensSoarDark = {
  '--color-sidemenu-bg': 'var(--color-bg)',
  '--color-sidemenu-item-text': 'var(--color-text-primary)',
  '--color-sidemenu-item-hover-bg': 'var(--color-hover-overlay)',
  '--color-sidemenu-item-active-text': 'var(--color-primary)',
  '--color-sidemenu-item-active-border': 'var(--color-primary)',
  '--color-sidemenu-submenu-text': 'var(--color-text-secondary)',
  '--color-sidemenu-border': 'var(--color-border)',
  '--color-sidemenu-collapse-bg': 'var(--color-bg-surface)',
  '--color-sidemenu-collapse-border': 'var(--color-border)',
  '--color-sidemenu-collapse-text': 'var(--color-text-primary)',
} as const

// ── EXD ──────────────────────────────────────────────────────────────────────
// EXD 사이드바는 primary 컬러 배경 (브랜드 컬러 기반 다크 네비게이션)

export const sideMenuBarTokensExdLight = {
  '--color-sidemenu-bg': 'var(--primary)',
  '--color-sidemenu-item-text': '#eeeeee',
  '--color-sidemenu-item-hover-bg': 'rgba(0, 0, 0, 0.15)',
  '--color-sidemenu-item-active-text': '#ffffff',
  '--color-sidemenu-item-active-border': '#ffffff',
  '--color-sidemenu-submenu-text': '#dcdcdc',
  '--color-sidemenu-border': 'rgba(255, 255, 255, 0.15)',
  '--color-sidemenu-collapse-bg': 'rgba(0, 0, 0, 0.15)',
  '--color-sidemenu-collapse-border': 'rgba(255, 255, 255, 0.30)',
  '--color-sidemenu-collapse-text': '#ffffff',
} as const

export const sideMenuBarTokensExdDark = {
  '--color-sidemenu-bg': 'var(--primary)',
  '--color-sidemenu-item-text': '#eeeeee',
  '--color-sidemenu-item-hover-bg': 'rgba(0, 0, 0, 0.15)',
  '--color-sidemenu-item-active-text': '#ffffff',
  '--color-sidemenu-item-active-border': '#ffffff',
  '--color-sidemenu-submenu-text': '#dcdcdc',
  '--color-sidemenu-border': 'rgba(255, 255, 255, 0.15)',
  '--color-sidemenu-collapse-bg': 'rgba(0, 0, 0, 0.15)',
  '--color-sidemenu-collapse-border': 'rgba(255, 255, 255, 0.30)',
  '--color-sidemenu-collapse-text': '#ffffff',
} as const
