import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const wrapper = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space[2],
  cursor: 'pointer',
  fontFamily: vars.font.family.sans,
  userSelect: 'none',
})

export const wrapperDisabled = style({
  opacity: 0.5,
  cursor: 'not-allowed',
})

export const hiddenInput = style({
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
})

const trackBase = style({
  position: 'relative',
  flexShrink: 0,
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.border,
  transition: vars.duration.normal,
  selectors: {
    [`${hiddenInput}:checked + &`]: {
      backgroundColor: vars.color.brand[600],
    },
    [`${hiddenInput}:focus-visible + &`]: {
      boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.brand[600]}`,
    },
    [`${hiddenInput}:checked:hover:not(:disabled) + &`]: {
      backgroundColor: vars.color.brand[700],
    },
    [`${hiddenInput}:not(:checked):hover:not(:disabled) + &`]: {
      backgroundColor: vars.color.borderStrong,
    },
  },
})

const thumbBase = style({
  position: 'absolute',
  top: 2,
  left: 2,
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.textInverse,
  transition: vars.duration.fast,
  boxShadow: vars.shadow.sm,
})

export const trackSize = styleVariants({
  sm: [trackBase, { width: 28, height: 16 }],
  md: [trackBase, { width: 40, height: 22 }],
  lg: [trackBase, { width: 44, height: 24 }],
})

export const thumbSize = styleVariants({
  sm: [
    thumbBase,
    {
      width: 12,
      height: 12,
      selectors: {
        [`${hiddenInput}:checked ~ * > &`]: {
          transform: 'translateX(12px)',
        },
      },
    },
  ],
  md: [
    thumbBase,
    {
      width: 18,
      height: 18,
      selectors: {
        [`${hiddenInput}:checked ~ * > &`]: {
          transform: 'translateX(18px)',
        },
      },
    },
  ],
  lg: [
    thumbBase,
    {
      width: 20,
      height: 20,
      selectors: {
        [`${hiddenInput}:checked ~ * > &`]: {
          transform: 'translateX(20px)',
        },
      },
    },
  ],
})

export const label = style({
  fontSize: vars.font.size.md,
  color: vars.color.text,
  lineHeight: 1,
})

export type SwitchSize = keyof typeof trackSize
