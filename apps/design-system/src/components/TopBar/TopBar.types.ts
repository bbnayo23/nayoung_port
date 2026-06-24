import type { ReactNode, HTMLAttributes } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'
export type LangCode = 'ko' | 'en' | 'ja'

export interface TopBarLangItem {
  code: LangCode
  label: string
  flag: string
}

export interface TopBarProduct {
  id: string
  label: ReactNode
}

export interface TopBarNotiItem {
  id: string
  title: string
  message?: string
  time?: string
  read?: boolean
}

export interface TopBarDownloadItem {
  id: string
  fileName: string
  fileSize?: string
  status: 'done' | 'progress' | 'error'
  progress?: number
}

export interface TopBarProps extends HTMLAttributes<HTMLDivElement> {
  notiCount?: number
  userName?: string
  userEmail?: string
  userRole?: string
  defaultTheme?: ThemeMode
  defaultLang?: LangCode
  onThemeChange?: (mode: ThemeMode) => void
  onLangChange?: (lang: LangCode) => void
  onNotificationClick?: () => void
  onDownloadClick?: () => void
  onProfileClick?: () => void
  onProgramInfoClick?: () => void
  onLogoutClick?: () => void
  products?: TopBarProduct[]
  defaultActiveProduct?: string
  onProductChange?: (id: string) => void
  langs?: TopBarLangItem[]
  notiItems?: TopBarNotiItem[]
  downloadItems?: TopBarDownloadItem[]
  onNotiItemClick?: (id: string) => void
  onNotiReadAll?: () => void
  onDownloadItemClick?: (id: string) => void
}
