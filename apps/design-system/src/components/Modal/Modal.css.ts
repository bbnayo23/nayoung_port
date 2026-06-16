import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const scaleIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.96)' },
  to: { opacity: 1, transform: 'scale(1)' },
})

/** 화면 전체를 덮는 오버레이 — 다이얼로그를 중앙 정렬한다. */
export const overlay = style(
  {
    position: 'fixed',
    inset: 0,
    zIndex: vars.zIndex.modal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: vars.space[4],
    background: vars.color.overlay,
    animation: `${fadeIn} ${vars.duration.fast} ease`,
  },
  'ds-modal-overlay',
)

/** 다이얼로그 컨테이너 — 표면/그림자/세로 플렉스. */
export const dialog = style(
  {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxHeight: '85vh',
    background: vars.color.surface,
    borderRadius: vars.radius.lg,
    boxShadow: vars.shadow.lg,
    overflow: 'hidden',
    animation: `${scaleIn} ${vars.duration.normal} ease`,
    selectors: {
      '&:focus-visible': {
        outline: 'none',
      },
    },
  },
  'ds-modal-dialog',
)

export const sizes = styleVariants(
  {
    sm: { maxWidth: '360px' },
    md: { maxWidth: '520px' },
    lg: { maxWidth: '720px' },
  },
  'ds-modal-size',
)

/** 헤더 — 타이틀 + 닫기 버튼. */
export const header = style(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: vars.space[4],
    padding: `${vars.space[5]} ${vars.space[6]}`,
    borderBottom: `1px solid ${vars.color.border}`,
  },
  'ds-modal-header',
)

export const title = style(
  {
    margin: 0,
    fontFamily: vars.font.family.sans,
    fontSize: vars.font.size.lg,
    fontWeight: vars.font.weight.semibold,
    lineHeight: vars.font.lineHeight.tight,
    color: vars.color.text,
  },
  'ds-modal-title',
)

/** 닫기(X) 버튼. */
export const closeButton = style(
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '2rem',
    height: '2rem',
    padding: 0,
    border: '1px solid transparent',
    borderRadius: vars.radius.md,
    background: 'transparent',
    color: vars.color.textSecondary,
    cursor: 'pointer',
    transition: `background ${vars.duration.fast} ease, color ${vars.duration.fast} ease`,
    selectors: {
      '&:hover': {
        background: vars.color.gray[100],
        color: vars.color.text,
      },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: vars.shadow.focus,
      },
    },
  },
  'ds-modal-close',
)

/** 본문 — 스크롤 가능한 패딩 영역. */
export const body = style(
  {
    flex: 1,
    overflowY: 'auto',
    padding: `${vars.space[5]} ${vars.space[6]}`,
    fontFamily: vars.font.family.sans,
    fontSize: vars.font.size.md,
    lineHeight: vars.font.lineHeight.normal,
    color: vars.color.text,
  },
  'ds-modal-body',
)

/** 푸터 — 상단 보더 + 우측 정렬 액션. */
export const footer = style(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: vars.space[3],
    padding: `${vars.space[4]} ${vars.space[6]}`,
    borderTop: `1px solid ${vars.color.border}`,
  },
  'ds-modal-footer',
)

export type ModalSize = keyof typeof sizes
