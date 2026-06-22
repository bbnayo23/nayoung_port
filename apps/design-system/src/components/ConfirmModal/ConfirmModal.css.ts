import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

/** 화면 전체를 덮는 반투명 오버레이 */
export const overlay = style(
  {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: vars.zIndex.modal,
  },
  'ds-confirm-modal-overlay',
)

/** 다이얼로그 표면 */
export const surface = style(
  {
    maxWidth: 400,
    width: '90%',
    padding: vars.space[5],
    borderRadius: vars.radius.lg,
    boxShadow: vars.shadow.lg,
    background: vars.color.surface,
    fontFamily: vars.font.family.sans,
  },
  'ds-confirm-modal-surface',
)

/** 모달 제목 */
export const title = style(
  {
    fontWeight: vars.font.weight.bold,
    fontSize: vars.font.size.md,
    color: vars.color.text,
    marginBottom: vars.space[2],
  },
  'ds-confirm-modal-title',
)

/** 본문 메시지 */
export const message = style(
  {
    fontSize: vars.font.size.sm,
    color: vars.color.gray[700],
    marginBottom: vars.space[5],
    lineHeight: vars.font.lineHeight.normal,
  },
  'ds-confirm-modal-message',
)

/** 버튼 행 — 우측 정렬 */
export const buttonRow = style(
  {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: vars.space[2],
  },
  'ds-confirm-modal-button-row',
)
