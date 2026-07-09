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
  gnb,
  gnbBtn,
  gnbBtnWrap,
  gnbBtnIsOpen,
  gnbNotiBadge,
  gnbUserDropdown,
  gnbUserProfile,
  gnbUserProfileText,
  gnbUserName,
  gnbUserEmail,
  gnbUserAdminBadge,
  gnbThemeGroup,
  gnbLangSection,
  gnbLangHeader,
  gnbLangFlag,
  gnbLangLabel,
  gnbLangChevron,
  gnbLangChevronOpen,
  gnbLangPopover,
  gnbLangItem,
  gnbLangItemActive,
  gnbLangCheckMark,
  gnbUserMenuList,
  gnbUserDropdownItem,
  gnbUserDropdownItemDanger,
  gnbMenuPopover,
  gnbMenuPopoverItem,
  gnbMenuPopoverItemActive,
  gnbMenuSpider,
  gnbMenuSpiderText,
  gnbMenuSuffix,
  gnbMenuSuffixMint,
  gnbMenuUD,
  gnbMenuUDRed,
  gnbMenuUDBlack,
  gnbMenuActiveDot,
  gnbPopoverHeader,
  gnbPopoverTitle,
  gnbPopoverCountBadge,
  gnbPopoverEmpty,
  gnbReadAllBtn,
  gnbNotiPopover,
  gnbNotiList,
  gnbNotiItem,
  gnbNotiDot,
  gnbNotiDotRead,
  gnbNotiBody,
  gnbNotiItemTitle,
  gnbNotiItemTitleRead,
  gnbNotiItemMsg,
  gnbNotiItemTime,
  gnbDlPopover,
  gnbDlList,
  gnbDlItem,
  gnbDlIconWrap,
  gnbDlInfo,
  gnbDlName,
  gnbDlMeta,
  gnbDlStatusDone,
  gnbDlStatusError,
  gnbDlStatusProgress,
  gnbDlProgressWrap,
  gnbDlProgressTrack,
  gnbDlProgressFill,
} from './Gnb.css'
import type {
  GnbProps,
  ThemeMode,
  LangCode,
  GnbLangItem,
  GnbProduct,
  GnbNotiItem,
  GnbDownloadItem,
} from './Gnb.types'

const DEFAULT_LANGS: GnbLangItem[] = [
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
]

const DEFAULT_NOTI_ITEMS: GnbNotiItem[] = [
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

const DEFAULT_DL_ITEMS: GnbDownloadItem[] = [
  { id: '1', fileName: 'security_report_2025.csv', fileSize: '2.4 MB', status: 'done' },
  { id: '2', fileName: 'threat_analysis_log.xlsx', fileSize: '8.1 MB', status: 'progress', progress: 65 },
  { id: '3', fileName: 'incident_export_may.zip', fileSize: '15.3 MB', status: 'error' },
]

const formatNotiCount = (count: number) => (count >= 99 ? '99+' : String(count))

const SpiderXdrLabel = () => (
  <span className={gnbMenuSpider}>
    <span className={gnbMenuSpiderText}>Spider</span>
    <span className={`${gnbMenuSuffix} ${gnbMenuSuffixMint}`}>XDR</span>
  </span>
)

const SpiderRnLabel = () => (
  <span className={gnbMenuSpider}>
    <span className={gnbMenuSpiderText}>Spider</span>
    <span className={`${gnbMenuSuffix} ${gnbMenuSuffixMint}`}>RN</span>
  </span>
)

const UDLabel = () => (
  <span className={gnbMenuUD}>
    <span className={gnbMenuUDRed}>Unified</span>
    <span className={gnbMenuUDBlack}>Defense</span>
  </span>
)

const DEFAULT_PRODUCTS: GnbProduct[] = [
  { id: 'xdr', label: <SpiderXdrLabel /> },
  { id: 'rn', label: <SpiderRnLabel /> },
  { id: 'ud', label: <UDLabel /> },
]

const Gnb = forwardRef<HTMLDivElement, GnbProps>(
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
      <div ref={ref} className={`${gnb}${className ? ` ${className}` : ''}`} {...rest}>
        <div className={gnbBtnWrap} ref={notiBtnWrapRef}>
          <button
            type="button"
            className={`${gnbBtn}${notiOpen ? ` ${gnbBtnIsOpen}` : ''}`}
            aria-label="알림"
            aria-haspopup="true"
            aria-expanded={notiOpen}
            onClick={handleNotiClick}
          >
            <XdrNavAlertIcon size={16} />
          </button>
          {notiCount > 0 && <span className={gnbNotiBadge}>{formatNotiCount(notiCount)}</span>}

          {notiOpen && (
            <div className={gnbNotiPopover} role="dialog" aria-label="알림" onClick={(e) => e.stopPropagation()}>
              <div className={gnbPopoverHeader}>
                <span className={gnbPopoverTitle}>
                  알림
                  {unreadCount > 0 && <span className={gnbPopoverCountBadge}>{unreadCount}</span>}
                </span>
                {unreadCount > 0 && (
                  <button type="button" className={gnbReadAllBtn} onClick={() => onNotiReadAll?.()}>
                    모두 읽음
                  </button>
                )}
              </div>

              {resolvedNotiItems.length === 0 ? (
                <div className={gnbPopoverEmpty}>
                  <XdrNavAlertIcon size={24} />
                  알림이 없습니다
                </div>
              ) : (
                <div className={gnbNotiList}>
                  {resolvedNotiItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={gnbNotiItem}
                      onClick={() => {
                        onNotiItemClick?.(item.id)
                      }}
                    >
                      <span className={`${gnbNotiDot}${item.read ? ` ${gnbNotiDotRead}` : ''}`} />
                      <div className={gnbNotiBody}>
                        <span className={`${gnbNotiItemTitle}${item.read ? ` ${gnbNotiItemTitleRead}` : ''}`}>
                          {item.title}
                        </span>
                        {item.message && <span className={gnbNotiItemMsg}>{item.message}</span>}
                        {item.time && <span className={gnbNotiItemTime}>{item.time}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={gnbBtnWrap} ref={dlBtnWrapRef}>
          <button
            type="button"
            className={`${gnbBtn}${dlOpen ? ` ${gnbBtnIsOpen}` : ''}`}
            aria-label="다운로드"
            aria-haspopup="true"
            aria-expanded={dlOpen}
            onClick={handleDlClick}
          >
            <XdrDownloadIcon size={16} />
          </button>

          {dlOpen && (
            <div className={gnbDlPopover} role="dialog" aria-label="다운로드" onClick={(e) => e.stopPropagation()}>
              <div className={gnbPopoverHeader}>
                <span className={gnbPopoverTitle}>다운로드</span>
              </div>

              {resolvedDlItems.length === 0 ? (
                <div className={gnbPopoverEmpty}>
                  <XdrDownloadIcon size={24} />
                  다운로드 내역이 없습니다
                </div>
              ) : (
                <div className={gnbDlList}>
                  {resolvedDlItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={gnbDlItem}
                      onClick={() => {
                        onDownloadItemClick?.(item.id)
                      }}
                    >
                      <div className={gnbDlIconWrap}>
                        <XdrDownloadIcon size={14} />
                      </div>
                      <div className={gnbDlInfo}>
                        <span className={gnbDlName}>{item.fileName}</span>
                        {item.status === 'progress' ? (
                          <div className={gnbDlProgressWrap}>
                            <div className={gnbDlProgressTrack}>
                              <div
                                className={gnbDlProgressFill}
                                style={{ '--dl-progress': `${item.progress ?? 0}%` } as CSSProperties}
                              />
                            </div>
                            <div className={gnbDlMeta}>
                              {item.fileSize && <span>{item.fileSize}</span>}
                              <span className={gnbDlStatusProgress}>{item.progress ?? 0}%</span>
                            </div>
                          </div>
                        ) : (
                          <div className={gnbDlMeta}>
                            {item.fileSize && <span>{item.fileSize}</span>}
                            {item.status === 'done' && (
                              <span className={gnbDlStatusDone}>
                                <XdrCheckIcon size={10} /> 완료
                              </span>
                            )}
                            {item.status === 'error' && (
                              <span className={gnbDlStatusError}>
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

        <div className={gnbBtnWrap} ref={userBtnWrapRef}>
          <button
            type="button"
            className={`${gnbBtn}${userOpen ? ` ${gnbBtnIsOpen}` : ''}`}
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
            <div className={gnbUserDropdown} role="menu" onClick={(e) => e.stopPropagation()}>
              <div className={gnbUserProfile} role="menuitem" tabIndex={0} onClick={onProfileClick}>
                <div className={gnbUserProfileText}>
                  <p className={gnbUserName}>{userName}</p>
                  <p className={gnbUserEmail}>{userEmail}</p>
                </div>
                <span className={gnbUserAdminBadge}>{userRole}</span>
              </div>

              <div className={gnbThemeGroup}>
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

              <div className={gnbLangSection}>
                <button
                  type="button"
                  className={gnbLangHeader}
                  aria-expanded={langOpen}
                  onClick={() => setLangOpen((p) => !p)}
                >
                  <span className={gnbLangFlag}>{currentLang?.flag}</span>
                  <span className={gnbLangLabel}>{currentLang?.label}</span>
                  <span className={`${gnbLangChevron}${langOpen ? ` ${gnbLangChevronOpen}` : ''}`}>
                    <XdrChevronRightIcon size={12} />
                  </span>
                </button>

                {langOpen && (
                  <div className={gnbLangPopover} role="menu" onClick={(e) => e.stopPropagation()}>
                    {resolvedLangs.map(({ code, label, flag }) => (
                      <button
                        key={code}
                        type="button"
                        role="menuitem"
                        className={`${gnbLangItem}${lang === code ? ` ${gnbLangItemActive}` : ''}`}
                        onClick={() => handleLangChange(code)}
                      >
                        <span className={gnbLangFlag}>{flag}</span>
                        {label}
                        {lang === code && <span className={gnbLangCheckMark} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={gnbUserMenuList}>
                <button
                  type="button"
                  role="menuitem"
                  className={gnbUserDropdownItem}
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
                  className={gnbUserDropdownItemDanger}
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

        <div className={gnbBtnWrap} ref={menuBtnWrapRef}>
          <button
            type="button"
            className={`${gnbBtn}${menuOpen ? ` ${gnbBtnIsOpen}` : ''}`}
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
            <div className={gnbMenuPopover} role="menu" onClick={(e) => e.stopPropagation()}>
              {resolvedProducts.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  role="menuitem"
                  className={`${gnbMenuPopoverItem}${activeProduct === id ? ` ${gnbMenuPopoverItemActive}` : ''}`}
                  onClick={() => handleProductChange(id)}
                >
                  {label}
                  {activeProduct === id && <span className={gnbMenuActiveDot} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)

Gnb.displayName = 'Gnb'

export default Gnb
