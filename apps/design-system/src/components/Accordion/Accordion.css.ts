import { style, globalStyle, createThemeContract, createGlobalTheme } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

export const accordionVars = createThemeContract({
  bg: null,
  borderColor: null,
  disabledBg: null,
  textColor: null,
  activeColor: null,
  hoverBg: null,
})

// ── Token sets ────────────────────────────────────────────────────────────────

const tokensDefault = {
  bg: vars.color.surface,
  borderColor: vars.color.border,
  disabledBg: vars.color.surfaceHover,
  textColor: vars.color.text,
  activeColor: vars.color.primary,
  hoverBg: vars.color.surfaceHover,
}

const tokensXdr = {
  bg: vars.color.surface,
  borderColor: 'transparent',
  disabledBg: vars.color.surfaceHover,
  textColor: vars.color.text,
  activeColor: vars.color.primary,
  hoverBg: vars.color.surfaceHover,
}

// ── Theme bindings ────────────────────────────────────────────────────────────

createGlobalTheme(':root', accordionVars, tokensDefault)
createGlobalTheme("[data-theme='exd-mint-basic']", accordionVars, tokensDefault)
createGlobalTheme("[data-theme='exd-mint-dark']", accordionVars, tokensDefault)
createGlobalTheme("[data-theme='exd-blue-basic']", accordionVars, tokensDefault)
createGlobalTheme("[data-theme='exd-blue-dark']", accordionVars, tokensDefault)
createGlobalTheme("[data-theme='soar']", accordionVars, tokensDefault)
createGlobalTheme("[data-theme='xdr-basic']", accordionVars, tokensXdr)
createGlobalTheme("[data-theme='xdr-dark']", accordionVars, tokensXdr)

// ── Layout ────────────────────────────────────────────────────────────────────

export const accordionContainer = style({
  width: '100%',
})

export const accordionContainerCard = style({
  border: `1px solid ${accordionVars.borderColor}`,
  borderRadius: vars.radius.md,
  background: accordionVars.bg,
  overflow: 'hidden',
})

export const accordionItemWrapper = style({
  width: '100%',
  background: 'transparent',
  transition: `background-color ${vars.transition.fast}`,
  selectors: {
    '&.disabled': {
      pointerEvents: 'none',
      opacity: 0.4,
      background: accordionVars.disabledBg,
    },
  },
})

globalStyle(`${accordionContainerCard} ${accordionItemWrapper}`, {
  borderBottom: `1px solid ${accordionVars.borderColor}`,
})
globalStyle(`${accordionContainerCard} ${accordionItemWrapper}:last-child`, {
  borderBottom: 'none',
})

// ── Header ────────────────────────────────────────────────────────────────────

export const accordionHeader = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  fontSize: vars.font.sizeSm,
  fontWeight: 500,
  color: accordionVars.textColor,
  padding: 16,
  cursor: 'pointer',
  transition: `background-color ${vars.transition.fast}`,
  userSelect: 'none',
  selectors: {
    '&:hover, &.is-hover': {
      background: accordionVars.hoverBg,
    },
    [`${accordionItemWrapper}.active &`]: {
      fontWeight: 600,
      color: accordionVars.activeColor,
    },
  },
})

export const accordionIcon = style({
  display: 'inline-block',
  width: 16,
  height: 16,
  transition: `transform ${vars.transition.normal}`,
  transform: 'rotate(-90deg)',
  selectors: {
    [`${accordionItemWrapper}.active &`]: {
      transform: 'rotate(0deg)',
    },
  },
})

globalStyle(`${accordionIcon} svg`, {
  fill: accordionVars.textColor,
})

// ── Content ───────────────────────────────────────────────────────────────────

export const accordionContent = style({
  display: 'grid',
  gridTemplateRows: '0fr',
  transition: 'grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  selectors: {
    [`${accordionItemWrapper}.active &`]: {
      gridTemplateRows: '1fr',
    },
  },
})

export const accordionOverflowWrapper = style({
  overflow: 'hidden',
  minHeight: 0,
})

export const accordionContentInner = style({
  background: 'transparent',
  fontSize: vars.font.sizeSm,
  color: accordionVars.textColor,
  lineHeight: 1.6,
  boxSizing: 'border-box',
  padding: '0 6px 16px',
  opacity: 0,
  transition: `opacity ${vars.transition.fast}`,
  selectors: {
    [`${accordionItemWrapper}.active &`]: {
      opacity: 1,
    },
  },
})
