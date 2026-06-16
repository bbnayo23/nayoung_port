import { globalStyle, style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

/** 가로 스크롤을 담당하는 래퍼 */
export const wrapper = style(
  {
    width: '100%',
    overflowX: 'auto',
  },
  'ds-table-wrapper',
)

/** stickyHeader 사용 시 헤더가 머무를 수 있도록 래퍼에 높이/스크롤 컨텍스트 부여 */
export const wrapperSticky = style(
  {
    overflowY: 'auto',
  },
  'ds-table-wrapper-sticky',
)

/** table 루트 ('ds-table' 디버그 네임) */
export const root = style(
  {
    borderCollapse: 'collapse',
    fontFamily: vars.font.family.sans,
    color: vars.color.text,
    background: vars.color.surface,
  },
  'ds-table',
)

export const fullWidth = style({ width: '100%' }, 'ds-table-full')

/** 본문 행 — 하단 보더 */
export const row = style(
  {
    borderBottom: `1px solid ${vars.color.border}`,
  },
  'ds-table-row',
)

/**
 * striped — tbody 의 짝수 번째 행 배경을 surfaceMuted 로.
 * tbody 에 부착하여 자식 tr 을 선택한다.
 */
export const stripedBody = style({}, 'ds-table-striped')

// 자식 tr 을 타겟하므로 globalStyle 로 분리 (vanilla-extract 의 style 셀렉터 제약)
globalStyle(`${stripedBody} > tr:nth-of-type(even)`, {
  background: vars.color.surfaceMuted,
})

/** 셀 공통(헤더/데이터) — 텍스트 정렬 기본값 */
export const cellBase = style(
  {
    textAlign: 'left',
    verticalAlign: 'middle',
  },
  'ds-table-cell',
)

/** 헤더 셀 — 굵은 텍스트 + 보조 색 */
export const headerCell = style(
  {
    fontWeight: vars.font.weight.semibold,
    color: vars.color.textSecondary,
    whiteSpace: 'nowrap',
  },
  'ds-table-header-cell',
)

/** size 별 셀 패딩/폰트 밀도 */
export const sizes = styleVariants(
  {
    sm: {
      padding: `${vars.space[2]} ${vars.space[3]}`,
      fontSize: vars.font.size.sm,
    },
    md: {
      padding: `${vars.space[3]} ${vars.space[4]}`,
      fontSize: vars.font.size.md,
    },
  },
  'ds-table-size',
)

/** 텍스트 정렬 맵 */
export const aligns = styleVariants(
  {
    left: { textAlign: 'left' },
    center: { textAlign: 'center' },
    right: { textAlign: 'right' },
  },
  'ds-table-align',
)

/** stickyHeader — thead th 를 상단에 고정 */
export const stickyHeaderCell = style(
  {
    position: 'sticky',
    top: 0,
    zIndex: vars.zIndex.sticky,
    background: vars.color.surface,
    borderBottom: `1px solid ${vars.color.border}`,
  },
  'ds-table-sticky-header',
)

export type TableVariant = 'simple' | 'striped'
export type TableSize = keyof typeof sizes
export type TableAlign = keyof typeof aligns
