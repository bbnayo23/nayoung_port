import type { ReactNode, HTMLAttributes } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'
export type LangCode = 'ko' | 'en' | 'ja'

export interface GnbLangItem {
  code: LangCode
  label: string
  flag: string
}

export interface GnbProduct {
  id: string
  label: ReactNode
}

export interface GnbNotiItem {
  id: string
  title: string
  message?: string
  time?: string
  read?: boolean
}

export interface GnbDownloadItem {
  id: string
  fileName: string
  fileSize?: string
  status: 'done' | 'progress' | 'error'
  progress?: number
}

export interface GnbProps extends HTMLAttributes<HTMLDivElement> {
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
  products?: GnbProduct[]
  defaultActiveProduct?: string
  onProductChange?: (id: string) => void
  langs?: GnbLangItem[]
  notiItems?: GnbNotiItem[]
  downloadItems?: GnbDownloadItem[]
  onNotiItemClick?: (id: string) => void
  onNotiReadAll?: () => void
  onDownloadItemClick?: (id: string) => void
}
