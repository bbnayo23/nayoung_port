import { useEffect, useRef, useState } from 'react'
import { ExdAiAssistantLogoIcon, ExdCloseIcon } from '@port/icon-library'
import * as s from './AiAssistantPanel.css'

type Msg = { role: 'ai' | 'user'; text: string; chips?: string[] }

const GREETING: Msg = {
  role: 'ai',
  text: '안녕하세요, Sarah. 오늘 탐지된 366,538건의 경보 중 치명도 8건을 우선적으로 확인해보세요. 무엇을 도와드릴까요?',
  chips: ['INC-2847 요약', '오늘 경보 원인 분석', '외부 트래픽 이상 탐지'],
}

// 데모용 캔드 응답 — 실제 LLM 연동 없이 시나리오만 재현한다.
function cannedReply(q: string): string {
  if (q.includes('INC-2847')) {
    return 'INC-2847 · web-prod-04에서 감지된 명령/제어(C2) 통신입니다.\n• MITRE: T1071 (Application Layer Protocol)\n• 프로세스 자동 격리됨 (PB-MAL-001)\n• 추가 자산 확산 징후 없음\n조사 단계를 제안드릴까요?'
  }
  if (q.includes('원인')) {
    return '오늘 경보의 62%는 외부 스캔, 24%는 정책 위반, 14%는 악성코드 탐지에서 발생했습니다. 상위 원인부터 살펴볼까요?'
  }
  if (q.includes('외부 트래픽')) {
    return '최근 1시간 외부 트래픽 중 3개 대역에서 이상 급증이 감지됐습니다. 해당 IP의 평판 조회를 진행할까요?'
  }
  return '요청을 확인했습니다. 관련 로그와 경보를 함께 살펴보겠습니다. (데모 응답)'
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
 * AI Assistant 사이드 패널 — GNB "AI Assistant" 버튼으로 열리는 우측 도킹 채팅 패널.
 * Figma igloo-design(node 318:237) 기준. 데모용 캔드 대화이며 실제 LLM 연동은 없다.
 */
export default function AiAssistantPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([GREETING])
  const [input, setInput] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)

  const send = (text: string) => {
    const q = text.trim()
    if (!q) return
    setMessages((m) => [...m, { role: 'user', text: q }, { role: 'ai', text: cannedReply(q) }])
    setInput('')
  }

  // 새 메시지 추가 시 하단으로 스크롤
  useEffect(() => {
    if (open) bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [messages, open])

  // Esc 로 닫기
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
    <aside className={s.panel} role="complementary" aria-label="AI Assistant">
      <header className={s.head}>
        <span className={s.avatar}>
          <ExdAiAssistantLogoIcon size={18} />
        </span>
        <div className={s.headText}>
          <div className={s.headTitle}>spider AI Assistant</div>
          <div className={s.headStatus}>
            <span className={s.dot} />
            온라인 · GPT-4o
          </div>
        </div>
        <button type="button" className={s.close} onClick={onClose} aria-label="AI Assistant 닫기">
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
              <span className={s.userAvatar}>SK</span>
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
            placeholder="메시지 입력..."
            aria-label="메시지 입력"
          />
          <button type="submit" className={s.send} aria-label="전송" disabled={!input.trim()}>
            <SendIcon />
          </button>
        </form>
        <div className={s.disclaimer}>AI의 응답은 부정확할 수 있습니다 · 중요 결정은 검증 후 진행하세요</div>
      </footer>
    </aside>
  )
}
