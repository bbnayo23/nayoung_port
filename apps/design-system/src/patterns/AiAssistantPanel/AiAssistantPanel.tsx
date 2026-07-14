import { useEffect, useRef, useState } from 'react'
import { ExdAiAssistantLogoIcon, ExdCloseIcon } from '@port/icon-library'
import * as s from './AiAssistantPanel.css'

export interface AssistantMessage {
  role: 'ai' | 'user'
  text: string
  /** AI 메시지 하단 추천 칩 */
  chips?: string[]
}

export interface AiAssistantPanelProps {
  open: boolean
  onClose: () => void
  /** 헤더 타이틀 (기본 "AI Assistant") */
  title?: string
  /** 헤더 상태 텍스트 (기본 "온라인") */
  status?: string
  /** 초기 AI 인사 메시지 (+추천 칩) */
  greeting: AssistantMessage
  /** 사용자 입력에 대한 (데모) 응답 resolver — 도메인 로직은 소비처 담당 */
  getReply: (q: string) => string
  /** 사용자 아바타 이니셜 (기본 "ME") */
  userInitials?: string
  placeholder?: string
  disclaimer?: string
}

const PaperclipIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
)
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
)

/**
 * AiAssistantPanel — GNB "AI Assistant" 버튼으로 여는 우측 도킹 채팅 패널.
 * 대화 상태(메시지·입력)는 내부에서 관리하고, 인사말·응답 로직은 props(greeting·getReply)로
 * 주입받아 도메인에 독립적이다. (데모용 캔드 대화 · 실제 LLM 연동 없음)
 */
export default function AiAssistantPanel({
  open,
  onClose,
  title = 'AI Assistant',
  status = '온라인',
  greeting,
  getReply,
  userInitials = 'ME',
  placeholder = '메시지 입력...',
  disclaimer,
}: AiAssistantPanelProps) {
  const [messages, setMessages] = useState<AssistantMessage[]>([greeting])
  const [input, setInput] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)

  const send = (text: string) => {
    const q = text.trim()
    if (!q) return
    setMessages((m) => [...m, { role: 'user', text: q }, { role: 'ai', text: getReply(q) }])
    setInput('')
  }

  useEffect(() => {
    if (open) bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [messages, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <aside className={s.panel} role="complementary" aria-label={title}>
      <header className={s.head}>
        <span className={s.avatar}>
          <ExdAiAssistantLogoIcon size={18} />
        </span>
        <div className={s.headText}>
          <div className={s.headTitle}>{title}</div>
          <div className={s.headStatus}>
            <span className={s.dot} />
            {status}
          </div>
        </div>
        <button type="button" className={s.close} onClick={onClose} aria-label={`${title} 닫기`}>
          <ExdCloseIcon size={16} />
        </button>
      </header>

      <div className={s.body} ref={bodyRef}>
        {messages.map((m, i) =>
          m.role === 'ai' ? (
            <div key={i} className={s.aiRow}>
              <span className={s.aiAvatar}>
                <ExdAiAssistantLogoIcon size={14} />
              </span>
              <div className={s.aiBubbleWrap}>
                <div className={s.aiBubble}>{m.text}</div>
                {m.chips && (
                  <div className={s.chips}>
                    {m.chips.map((c) => (
                      <button key={c} type="button" className={s.chip} onClick={() => send(c)}>
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div key={i} className={s.userRow}>
              <div className={s.userBubble}>{m.text}</div>
              <span className={s.userAvatar}>{userInitials}</span>
            </div>
          ),
        )}
      </div>

      <footer className={s.footer}>
        <form className={s.inputRow} onSubmit={(e) => { e.preventDefault(); send(input) }}>
          <button type="button" className={s.attach} aria-label="파일 첨부">
            <PaperclipIcon />
          </button>
          <input
            className={s.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            aria-label="메시지 입력"
          />
          <button type="submit" className={s.send} aria-label="전송" disabled={!input.trim()}>
            <SendIcon />
          </button>
        </form>
        {disclaimer && <div className={s.disclaimer}>{disclaimer}</div>}
      </footer>
    </aside>
  )
}
