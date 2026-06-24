import { useState, useRef, useEffect, forwardRef } from 'react'
import type { MouseEvent, CSSProperties } from 'react'
import {
  XdrNavAlertIcon,
  XdrDownloadIcon,
  XdrPropertyUserIcon,
  XdrNavAppIcon,
  XdrSunIcon,
  XdrMoonIcon,
  XdrMonitorIcon,
  XdrChevronRightIcon,
  XdrCheckIcon,
  XdrCautionIcon,
} from '@port/icon-library'
import ButtonGroup from '../ButtonGroup'
import {
  topBar,
  topBarBtn,
  topBarBtnWrap,
  topBarBtnIsOpen,
  topBarNotiBadge,
  topBarUserDropdown,
  topBarUserProfile,
  topBarUserProfileText,
  topBarUserName,
  topBarUserEmail,
  topBarUserAdminBadge,
  topBarThemeGroup,
  topBarLangSection,
  topBarLangHeader,
  topBarLangFlag,
  topBarLangLabel,
  topBarLangChevron,
  topBarLangChevronOpen,
  topBarLangPopover,
  topBarLangItem,
  topBarLangItemActive,
  topBarLangCheckMark,
  topBarUserMenuList,
  topBarUserDropdownItem,
  topBarUserDropdownItemDanger,
  topBarMenuPopover,
  topBarMenuPopoverItem,
  topBarMenuPopoverItemActive,
  topBarMenuSpider,
  topBarMenuSpiderText,
  topBarMenuSuffix,
  topBarMenuSuffixMint,
  topBarMenuUD,
  topBarMenuUDRed,
  topBarMenuUDBlack,
  topBarMenuActiveDot,
  topBarPopoverHeader,
  topBarPopoverTitle,
  topBarPopoverCountBadge,
  topBarPopoverEmpty,
  topBarReadAllBtn,
  topBarNotiPopover,
  topBarNotiList,
  topBarNotiItem,
  topBarNotiDot,
  topBarNotiDotRead,
  topBarNotiBody,
  topBarNotiItemTitle,
  topBarNotiItemTitleRead,
  topBarNotiItemMsg,
  topBarNotiItemTime,
  topBarDlPopover,
  topBarDlList,
  topBarDlItem,
  topBarDlIconWrap,
  topBarDlInfo,
  topBarDlName,
  topBarDlMeta,
  topBarDlStatusDone,
  topBarDlStatusError,
  topBarDlStatusProgress,
  topBarDlProgressWrap,
  topBarDlProgressTrack,
  topBarDlProgressFill,
} from './TopBar.css'
import type {
  TopBarProps,
  ThemeMode,
  LangCode,
  TopBarLangItem,
  TopBarProduct,
  TopBarNotiItem,
  TopBarDownloadItem,
} from './TopBar.types'

const DEFAULT_LANGS: TopBarLangItem[] = [
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
]

const DEFAULT_NOTI_ITEMS: TopBarNotiItem[] = [
  {
    id: '1',
    title: '새 위협 탐지',
    message: '비정상적인 네트워크 트래픽이 감지되었습니다. 즉시 확인이 필요합니다.',
    time: '2분 전',
    read: false,
  },
  {
    id: '2',
    title: '정책 위반 알림',
    message: '사용자 계정에서 반복적인 인증 실패가 발생했습니다.',
    time: '15분 전',
    read: false,
  },
  {
    id: '3',
    title: '시스템 업데이트 완료',
    message: '보안 패치가 성공적으로 적용되었습니다.',
    time: '1시간 전',
    read: true,
  },
]

const DEFAULT_DL_ITEMS: TopBarDownloadItem[] = [
  { id: '1', fileName: 'security_report_2025.csv', fileSize: '2.4 MB', status: 'done' },
  { id: '2', fileName: 'threat_analysis_log.xlsx', fileSize: '8.1 MB', status: 'progress', progress: 65 },
  { id: '3', fileName: 'incident_export_may.zip', fileSize: '15.3 MB', status: 'error' },
]

const formatNotiCount = (count: number) => (count >= 99 ? '99+' : String(count))

const SpiderXdrLabel = () => (
  <span className={topBarMenuSpider}>
    <span className={topBarMenuSpiderText}>Spider</span>
    <span className={`${topBarMenuSuffix} ${topBarMenuSuffixMint}`}>XDR</span>
  </span>
)

const SpiderRnLabel = () => (
  <span className={topBarMenuSpider}>
    <span className={topBarMenuSpiderText}>Spider</span>
    <span className={`${topBarMenuSuffix} ${topBarMenuSuffixMint}`}>RN</span>
  </span>
)

const UDLabel = () => (
  <span className={topBarMenuUD}>
    <span className={topBarMenuUDRed}>Unified</span>
    <span className={topBarMenuUDBlack}>Defense</span>
  </span>
)

const DEFAULT_PRODUCTS: TopBarProduct[] = [
  { id: 'xdr', label: <SpiderXdrLabel /> },
  { id: 'rn', label: <SpiderRnLabel /> },
  { id: 'ud', label: <UDLabel /> },
]

const TopBar = forwardRef<HTMLDivElement, TopBarProps>(
  (
    {
      notiCount = 0,
      userName = '관리자',
      userEmail = 'admin@example.com',
      userRole = 'Admin',
      defaultTheme = 'light',
      defaultLang = 'ko',
      onThemeChange,
      onLangChange,
      onNotificationClick,
      onDownloadClick,
      onProfileClick,
      onProgramInfoClick,
      onLogoutClick,
      products,
      defaultActiveProduct = 'xdr',
      onProductChange,
      langs,
      notiItems,
      downloadItems,
      onNotiItemClick,
      onNotiReadAll,
      onDownloadItemClick,
      className,
      ...rest
    },
    ref,
  ) => {
    const [userOpen, setUserOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [notiOpen, setNotiOpen] = useState(false)
    const [dlOpen, setDlOpen] = useState(false)
    const [themeMode, setThemeMode] = useState<ThemeMode>(defaultTheme)
    const [lang, setLang] = useState<LangCode>(defaultLang)
    const [langOpen, setLangOpen] = useState(false)
    const [activeProduct, setActiveProduct] = useState<string>(defaultActiveProduct)

    const userBtnWrapRef = useRef<HTMLDivElement>(null)
    const menuBtnWrapRef = useRef<HTMLDivElement>(null)
    const notiBtnWrapRef = useRef<HTMLDivElement>(null)
    const dlBtnWrapRef = useRef<HTMLDivElement>(null)

    const resolvedLangs = langs ?? DEFAULT_LANGS
    const resolvedProducts = products ?? DEFAULT_PRODUCTS
    const resolvedNotiItems = notiItems ?? DEFAULT_NOTI_ITEMS
    const resolvedDlItems = downloadItems ?? DEFAULT_DL_ITEMS

    const closeAll = () => {
      setUserOpen(false)
      setMenuOpen(false)
      setLangOpen(false)
      setNotiOpen(false)
      setDlOpen(false)
    }

    useEffect(() => {
      if (!userOpen && !menuOpen && !notiOpen && !dlOpen) return
      const handler = (e: globalThis.MouseEvent) => {
        const target = e.target as Node
        if (notiOpen && notiBtnWrapRef.current && !notiBtnWrapRef.current.contains(target)) setNotiOpen(false)
        if (dlOpen && dlBtnWrapRef.current && !dlBtnWrapRef.current.contains(target)) setDlOpen(false)
        if (userOpen && userBtnWrapRef.current && !userBtnWrapRef.current.contains(target)) {
          setUserOpen(false)
          setLangOpen(false)
        }
        if (menuOpen && menuBtnWrapRef.current && !menuBtnWrapRef.current.contains(target)) setMenuOpen(false)
      }
      document.addEventListener('mousedown', handler)
      return () => document.removeEventListener('mousedown', handler)
    }, [userOpen, menuOpen, notiOpen, dlOpen])

    const currentLang = resolvedLangs.find((l) => l.code === lang) ?? resolvedLangs[0]
    const unreadCount = resolvedNotiItems.filter((n) => !n.read).length

    const handleThemeChange = (mode: ThemeMode) => {
      setThemeMode(mode)
      onThemeChange?.(mode)
    }

    const handleLangChange = (code: LangCode) => {
      setLang(code)
      setLangOpen(false)
      onLangChange?.(code)
    }

    const handleProductChange = (id: string) => {
      setActiveProduct(id)
      setMenuOpen(false)
      onProductChange?.(id)
    }

    const handleNotiClick = (e: MouseEvent) => {
      e.stopPropagation()
      setMenuOpen(false)
      setUserOpen(false)
      setLangOpen(false)
      setDlOpen(false)
      setNotiOpen((p) => !p)
      onNotificationClick?.()
    }

    const handleDlClick = (e: MouseEvent) => {
      e.stopPropagation()
      setMenuOpen(false)
      setUserOpen(false)
      setLangOpen(false)
      setNotiOpen(false)
      setDlOpen((p) => !p)
      onDownloadClick?.()
    }

    return (
      <div ref={ref} className={`${topBar}${className ? ` ${className}` : ''}`} {...rest}>
        <div className={topBarBtnWrap} ref={notiBtnWrapRef}>
          <button
            type="button"
            className={`${topBarBtn}${notiOpen ? ` ${topBarBtnIsOpen}` : ''}`}
            aria-label="알림"
            aria-haspopup="true"
            aria-expanded={notiOpen}
            onClick={handleNotiClick}
          >
            <XdrNavAlertIcon size={16} />
          </button>
          {notiCount > 0 && <span className={topBarNotiBadge}>{formatNotiCount(notiCount)}</span>}

          {notiOpen && (
            <div className={topBarNotiPopover} role="dialog" aria-label="알림" onClick={(e) => e.stopPropagation()}>
              <div className={topBarPopoverHeader}>
                <span className={topBarPopoverTitle}>
                  알림
                  {unreadCount > 0 && <span className={topBarPopoverCountBadge}>{unreadCount}</span>}
                </span>
                {unreadCount > 0 && (
                  <button type="button" className={topBarReadAllBtn} onClick={() => onNotiReadAll?.()}>
                    모두 읽음
                  </button>
                )}
              </div>

              {resolvedNotiItems.length === 0 ? (
                <div className={topBarPopoverEmpty}>
                  <XdrNavAlertIcon size={24} />
                  알림이 없습니다
                </div>
              ) : (
                <div className={topBarNotiList}>
                  {resolvedNotiItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={topBarNotiItem}
                      onClick={() => {
                        onNotiItemClick?.(item.id)
                      }}
                    >
                      <span className={`${topBarNotiDot}${item.read ? ` ${topBarNotiDotRead}` : ''}`} />
                      <div className={topBarNotiBody}>
                        <span className={`${topBarNotiItemTitle}${item.read ? ` ${topBarNotiItemTitleRead}` : ''}`}>
                          {item.title}
                        </span>
                        {item.message && <span className={topBarNotiItemMsg}>{item.message}</span>}
                        {item.time && <span className={topBarNotiItemTime}>{item.time}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={topBarBtnWrap} ref={dlBtnWrapRef}>
          <button
            type="button"
            className={`${topBarBtn}${dlOpen ? ` ${topBarBtnIsOpen}` : ''}`}
            aria-label="다운로드"
            aria-haspopup="true"
            aria-expanded={dlOpen}
            onClick={handleDlClick}
          >
            <XdrDownloadIcon size={16} />
          </button>

          {dlOpen && (
            <div className={topBarDlPopover} role="dialog" aria-label="다운로드" onClick={(e) => e.stopPropagation()}>
              <div className={topBarPopoverHeader}>
                <span className={topBarPopoverTitle}>다운로드</span>
              </div>

              {resolvedDlItems.length === 0 ? (
                <div className={topBarPopoverEmpty}>
                  <XdrDownloadIcon size={24} />
                  다운로드 내역이 없습니다
                </div>
              ) : (
                <div className={topBarDlList}>
                  {resolvedDlItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={topBarDlItem}
                      onClick={() => {
                        onDownloadItemClick?.(item.id)
                      }}
                    >
                      <div className={topBarDlIconWrap}>
                        <XdrDownloadIcon size={14} />
                      </div>
                      <div className={topBarDlInfo}>
                        <span className={topBarDlName}>{item.fileName}</span>
                        {item.status === 'progress' ? (
                          <div className={topBarDlProgressWrap}>
                            <div className={topBarDlProgressTrack}>
                              <div
                                className={topBarDlProgressFill}
                                style={{ '--dl-progress': `${item.progress ?? 0}%` } as CSSProperties}
                              />
                            </div>
                            <div className={topBarDlMeta}>
                              {item.fileSize && <span>{item.fileSize}</span>}
                              <span className={topBarDlStatusProgress}>{item.progress ?? 0}%</span>
                            </div>
                          </div>
                        ) : (
                          <div className={topBarDlMeta}>
                            {item.fileSize && <span>{item.fileSize}</span>}
                            {item.status === 'done' && (
                              <span className={topBarDlStatusDone}>
                                <XdrCheckIcon size={10} /> 완료
                              </span>
                            )}
                            {item.status === 'error' && (
                              <span className={topBarDlStatusError}>
                                <XdrCautionIcon size={10} /> 실패
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={topBarBtnWrap} ref={userBtnWrapRef}>
          <button
            type="button"
            className={`${topBarBtn}${userOpen ? ` ${topBarBtnIsOpen}` : ''}`}
            aria-label="사용자 메뉴"
            aria-haspopup="true"
            aria-expanded={userOpen}
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen(false)
              setNotiOpen(false)
              setDlOpen(false)
              setUserOpen((p) => !p)
            }}
          >
            <XdrPropertyUserIcon size={16} />
          </button>

          {userOpen && (
            <div className={topBarUserDropdown} role="menu" onClick={(e) => e.stopPropagation()}>
              <div className={topBarUserProfile} role="menuitem" tabIndex={0} onClick={onProfileClick}>
                <div className={topBarUserProfileText}>
                  <p className={topBarUserName}>{userName}</p>
                  <p className={topBarUserEmail}>{userEmail}</p>
                </div>
                <span className={topBarUserAdminBadge}>{userRole}</span>
              </div>

              <div className={topBarThemeGroup}>
                <ButtonGroup variant="primary">
                  <ButtonGroup.Item
                    active={themeMode === 'light'}
                    aria-label="라이트 모드"
                    onClick={() => handleThemeChange('light')}
                  >
                    <XdrSunIcon size={16} />
                  </ButtonGroup.Item>
                  <ButtonGroup.Item
                    active={themeMode === 'dark'}
                    aria-label="다크 모드"
                    onClick={() => handleThemeChange('dark')}
                  >
                    <XdrMoonIcon size={16} />
                  </ButtonGroup.Item>
                  <ButtonGroup.Item
                    active={themeMode === 'system'}
                    aria-label="시스템 모드"
                    onClick={() => handleThemeChange('system')}
                  >
                    <XdrMonitorIcon size={16} />
                  </ButtonGroup.Item>
                </ButtonGroup>
              </div>

              <div className={topBarLangSection}>
                <button
                  type="button"
                  className={topBarLangHeader}
                  aria-expanded={langOpen}
                  onClick={() => setLangOpen((p) => !p)}
                >
                  <span className={topBarLangFlag}>{currentLang?.flag}</span>
                  <span className={topBarLangLabel}>{currentLang?.label}</span>
                  <span className={`${topBarLangChevron}${langOpen ? ` ${topBarLangChevronOpen}` : ''}`}>
                    <XdrChevronRightIcon size={12} />
                  </span>
                </button>

                {langOpen && (
                  <div className={topBarLangPopover} role="menu" onClick={(e) => e.stopPropagation()}>
                    {resolvedLangs.map(({ code, label, flag }) => (
                      <button
                        key={code}
                        type="button"
                        role="menuitem"
                        className={`${topBarLangItem}${lang === code ? ` ${topBarLangItemActive}` : ''}`}
                        onClick={() => handleLangChange(code)}
                      >
                        <span className={topBarLangFlag}>{flag}</span>
                        {label}
                        {lang === code && <span className={topBarLangCheckMark} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={topBarUserMenuList}>
                <button
                  type="button"
                  role="menuitem"
                  className={topBarUserDropdownItem}
                  onClick={() => {
                    closeAll()
                    onProgramInfoClick?.()
                  }}
                >
                  프로그램 정보
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className={topBarUserDropdownItemDanger}
                  onClick={() => {
                    closeAll()
                    onLogoutClick?.()
                  }}
                >
                  로그아웃
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={topBarBtnWrap} ref={menuBtnWrapRef}>
          <button
            type="button"
            className={`${topBarBtn}${menuOpen ? ` ${topBarBtnIsOpen}` : ''}`}
            aria-label="앱 전환"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            onClick={(e) => {
              e.stopPropagation()
              setUserOpen(false)
              setLangOpen(false)
              setNotiOpen(false)
              setDlOpen(false)
              setMenuOpen((p) => !p)
            }}
          >
            <XdrNavAppIcon size={16} />
          </button>

          {menuOpen && (
            <div className={topBarMenuPopover} role="menu" onClick={(e) => e.stopPropagation()}>
              {resolvedProducts.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  role="menuitem"
                  className={`${topBarMenuPopoverItem}${activeProduct === id ? ` ${topBarMenuPopoverItemActive}` : ''}`}
                  onClick={() => handleProductChange(id)}
                >
                  {label}
                  {activeProduct === id && <span className={topBarMenuActiveDot} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)

TopBar.displayName = 'TopBar'

export default TopBar
