import { useState } from 'react'
import GnbDropdown from './GnbDropdown'
import * as s from './LanguagePanel.css'

const LANGS = [
  { code: 'KO', label: '한국어' },
  { code: 'EN', label: 'English' },
  { code: 'JP', label: '日本語' },
]

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

/** 언어 드롭다운 — GNB 언어 버튼으로 열린다. */
export default function LanguagePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selected, setSelected] = useState('KO')

  return (
    <GnbDropdown open={open} onClose={onClose} targetLabel="언어" width={220} ariaLabel="언어 선택">
      <div className={s.head}>언어</div>
      <div className={s.list}>
        {LANGS.map((l) => {
          const active = selected === l.code
          return (
            <button
              key={l.code}
              type="button"
              className={active ? `${s.item} ${s.itemActive}` : s.item}
              onClick={() => {
                setSelected(l.code)
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
