import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'

const dropIn = keyframes({
  from: { transform: 'translateY(-6px)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 },
})

// GNB 아이콘 버튼 아래에 앵커되는 드롭다운 셸 (다운로드·알림 등 공용)
export const shell = style({
  position: 'fixed',
  zIndex: 40,
  maxWidth: 'calc(100vw - 16px)',
  display: 'flex',
  flexDirection: 'column',
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: '0 12px 32px rgba(15, 23, 42, 0.16)',
  overflow: 'hidden',
  animation: `${dropIn} 0.16s cubic-bezier(0.22, 1, 0.36, 1)`,
})
