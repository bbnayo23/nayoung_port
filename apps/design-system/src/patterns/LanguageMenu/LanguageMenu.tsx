import { useState } from 'react'
import GnbDropdown from '@dc/patterns/GnbDropdown'
import * as s from './LanguageMenu.css'

export interface LanguageOption {
  code: string
  label: string
}

export interface LanguageMenuProps {
  open: boolean
  onClose: () => void
  /** 앵커할 GNB 버튼 aria-label (기본 "언어") */
  targetLabel?: string
  /** 언어 옵션 (기본 KO/EN/JP) */
  languages?: LanguageOption[]
  /** 초기 선택 코드 */
  defaultValue?: string
  onChange?: (code: string) => void
}

const DEFAULT_LANGS: LanguageOption[] = [
  { code: 'KO', label: '한국어' },
  { code: 'EN', label: 'English' },
  { code: 'JP', label: '日本語' },
]

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

/** 언어 선택 드롭다운 — GNB 언어 버튼에 앵커. */
export default function LanguageMenu({
  open,
  onClose,
  targetLabel = '언어',
  languages = DEFAULT_LANGS,
  defaultValue = 'KO',
  onChange,
}: LanguageMenuProps) {
  const [selected, setSelected] = useState(defaultValue)

  return (
    <GnbDropdown open={open} onClose={onClose} targetLabel={targetLabel} width={220} ariaLabel="언어 선택">
      <div className={s.head}>언어</div>
      <div className={s.list}>
        {languages.map((l) => {
          const active = selected === l.code
          return (
            <button
              key={l.code}
              type="button"
              className={active ? `${s.item} ${s.itemActive}` : s.item}
              onClick={() => {
                setSelected(l.code)
                onChange?.(l.code)
                onClose()
              }}
            >
              <span className={s.badge}>{l.code}</span>
              <span className={s.label}>{l.label}</span>
              {active && (
                <span className={s.check}>
                  <CheckIcon />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </GnbDropdown>
  )
}
