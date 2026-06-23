import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

/** 트리거를 감싸는 inline-flex 래퍼 (mouse/focus 핸들러 + 측정 대상) */
export const trigger = style(
  {
    display: 'inline-flex',
  },
  'ds-tooltip-trigger',
)

/** Portal 로 렌더되는 툴팁 박스 — position: fixed 로 viewport 좌표에 고정 */
export const box = style(
  {
    position: 'fixed',
    zIndex: vars.zIndex.tooltip,
    maxWidth: '240px',
    padding: '8px 12px',
    borderRadius: vars.radius.sm,
    background: vars.color.text,
    color: vars.color.textInverse,
    fontFamily: vars.font.family.sans,
    fontSize: vars.font.size.xs,
    lineHeight: vars.font.lineHeight.normal,
    boxShadow: vars.shadow.md,
    pointerEvents: 'none',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    animation: `${fadeIn} ${vars.duration.fast} ease`,
  },
  'ds-tooltip-box',
)
