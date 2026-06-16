import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const slideInLeft = keyframes({
  from: { transform: 'translateX(-100%)' },
  to: { transform: 'translateX(0)' },
})

const slideInRight = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
})

const slideInTop = keyframes({
  from: { transform: 'translateY(-100%)' },
  to: { transform: 'translateY(0)' },
})

const slideInBottom = keyframes({
  from: { transform: 'translateY(100%)' },
  to: { transform: 'translateY(0)' },
})

/** 화면 전체를 덮는 오버레이 — 패널은 selectors 로 각 side 에 앵커링한다. */
export const overlay = style(
  {
    position: 'fixed',
    inset: 0,
    zIndex: vars.zIndex.drawer,
    display: 'flex',
    background: vars.color.overlay,
    animation: `${fadeIn} ${vars.duration.fast} ease`,
  },
  'ds-drawer-overlay',
)

/** side 별 오버레이 정렬 (패널을 해당 모서리에 붙인다). */
export const overlaySides = styleVariants(
  {
    left: { justifyContent: 'flex-start', alignItems: 'stretch' },
    right: { justifyContent: 'flex-end', alignItems: 'stretch' },
    top: { justifyContent: 'stretch', alignItems: 'flex-start', flexDirection: 'column' },
    bottom: { justifyContent: 'stretch', alignItems: 'flex-end', flexDirection: 'column' },
  },
  'ds-drawer-overlay-side',
)

/** 패널 — 표면/그림자/세로 플렉스. */
export const panel = style(
  {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    background: vars.color.surface,
    boxShadow: vars.shadow.lg,
    overflow: 'hidden',
    selectors: {
      '&:focus-visible': {
        outline: 'none',
      },
    },
  },
  'ds-drawer-panel',
)

/** side 별 정렬: 위치/풀높이·풀폭 + 슬라이드 애니메이션. */
export const panelSides = styleVariants(
  {
    left: {
      height: '100%',
      animation: `${slideInLeft} ${vars.duration.normal} ease`,
    },
    right: {
      height: '100%',
      animation: `${slideInRight} ${vars.duration.normal} ease`,
    },
    top: {
      width: '100%',
      animation: `${slideInTop} ${vars.duration.normal} ease`,
    },
    bottom: {
      width: '100%',
      animation: `${slideInBottom} ${vars.duration.normal} ease`,
    },
  },
  'ds-drawer-panel-side',
)

/** 좌/우 드로어 폭. */
export const widthSizes = styleVariants(
  {
    sm: { width: '280px', maxWidth: '90vw' },
    md: { width: '360px', maxWidth: '90vw' },
    lg: { width: '480px', maxWidth: '90vw' },
  },
  'ds-drawer-width',
)

/** 상/하 드로어 높이. */
export const heightSizes = styleVariants(
  {
    sm: { height: '200px', maxHeight: '90vh' },
    md: { height: '320px', maxHeight: '90vh' },
    lg: { height: '480px', maxHeight: '90vh' },
  },
  'ds-drawer-height',
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
  'ds-drawer-header',
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
  'ds-drawer-title',
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
  'ds-drawer-close',
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
  'ds-drawer-body',
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
  'ds-drawer-footer',
)

export type DrawerSide = keyof typeof panelSides
export type DrawerSize = keyof typeof widthSizes
