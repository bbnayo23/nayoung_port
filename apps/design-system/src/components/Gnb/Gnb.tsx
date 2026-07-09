import { forwardRef } from 'react'
import cn from 'classnames'
import {
  gnb,
  gnbInner,
  gnbBrand,
  gnbLogoCircle,
  gnbTitle,
  gnbBrandChevron,
  gnbActions,
  gnbAiButton,
  gnbAiLabel,
  gnbDivider,
  gnbIconGroup,
  gnbIconButton,
  gnbNotiDot,
  gnbHomeButton,
} from './Gnb.css'
import {
  GnbLogoMark,
  GnbChevronDownIcon,
  GnbAiSparkleIcon,
  GnbDownloadIcon,
  GnbBellIcon,
  GnbPaletteIcon,
  GnbGlobeIcon,
  GnbUserIcon,
  GnbHomeIcon,
} from './Gnb.icons'
import type { GnbProps } from './Gnb.types'

/**
 * GNB — AiR Works 레이아웃 셸 상단 바.
 * 좌측 브랜드(로고+타이틀+드롭다운) + 우측 액션(AI Assistant · 다운로드 · 알림 · 테마 · 언어 · 사용자 · 홈).
 */
const Gnb = forwardRef<HTMLElement, GnbProps>((props, ref) => {
  const {
    logo,
    title = 'AiR Works',
    showBrandDropdown = true,
    onBrandClick,
    showAiAssistant = true,
    aiAssistantLabel = 'AI Assistant',
    onAiAssistantClick,
    showDownload = true,
    onDownloadClick,
    showNotification = true,
    notiCount = 0,
    onNotificationClick,
    showTheme = true,
    onThemeClick,
    showLanguage = true,
    onLanguageClick,
    showUser = true,
    onUserClick,
    showHome = true,
    onHomeClick,
    className,
    ...rest
  } = props

  return (
    <header ref={ref} className={cn(gnb, 'gnb', className)} {...rest}>
      <div className={gnbInner}>
        {/* 좌측 브랜드 */}
        <button type="button" className={gnbBrand} onClick={onBrandClick} aria-label={title}>
          <span className={gnbLogoCircle}>{logo ?? <GnbLogoMark size={24} />}</span>
          <span className={gnbTitle}>{title}</span>
          {showBrandDropdown && (
            <span className={gnbBrandChevron} aria-hidden="true">
              <GnbChevronDownIcon size={14} />
            </span>
          )}
        </button>

        {/* 우측 액션 */}
        <div className={gnbActions}>
          {showAiAssistant && (
            <button type="button" className={gnbAiButton} onClick={onAiAssistantClick}>
              <GnbAiSparkleIcon size={20} />
              <span className={gnbAiLabel}>{aiAssistantLabel}</span>
            </button>
          )}

          {showAiAssistant && <span className={gnbDivider} aria-hidden="true" />}

          <div className={gnbIconGroup}>
            {showDownload && (
              <button type="button" className={gnbIconButton} onClick={onDownloadClick} aria-label="다운로드">
                <GnbDownloadIcon size={16} />
              </button>
            )}
            {showNotification && (
              <button type="button" className={gnbIconButton} onClick={onNotificationClick} aria-label="알림">
                <GnbBellIcon size={16} />
                {notiCount > 0 && <span className={gnbNotiDot} />}
              </button>
            )}
            {showTheme && (
              <button type="button" className={gnbIconButton} onClick={onThemeClick} aria-label="테마">
                <GnbPaletteIcon size={16} />
              </button>
            )}
            {showLanguage && (
              <button type="button" className={gnbIconButton} onClick={onLanguageClick} aria-label="언어">
                <GnbGlobeIcon size={16} />
              </button>
            )}
            {showUser && (
              <button type="button" className={gnbIconButton} onClick={onUserClick} aria-label="사용자">
                <GnbUserIcon size={16} />
              </button>
            )}
            {showHome && (
              <button type="button" className={gnbHomeButton} onClick={onHomeClick} aria-label="홈">
                <GnbHomeIcon size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
})

Gnb.displayName = 'Gnb'

export default Gnb
