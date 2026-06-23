import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/tokens.css'

export const wrapper = style({
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

const inputBase = style({
  appearance: 'none',
  margin: 0,
  flexShrink: 0,
  border: `2px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  backgroundColor: 'transparent',
  cursor: 'inherit',
  transition: vars.duration.fast,
  position: 'relative',
  selectors: {
    '&:checked': {
      backgroundColor: vars.color.brand[600],
      borderColor: vars.color.brand[600],
    },
    '&:checked::after': {
      content: '""',
      position: 'absolute',
      display: 'block',
      borderStyle: 'solid',
      borderColor: vars.color.textInverse,
      borderWidth: '0 2px 2px 0',
      transform: 'rotate(45deg)',
    },
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.brand[600]}`,
    },
    '&:hover:not(:disabled)': {
      borderColor: vars.color.borderStrong,
    },
    '&:checked:hover:not(:disabled)': {
      backgroundColor: vars.color.brand[700],
      borderColor: vars.color.brand[700],
    },
    '&:indeterminate': {
      backgroundColor: vars.color.brand[600],
      borderColor: vars.color.brand[600],
    },
    '&:indeterminate::after': {
      content: '""',
      position: 'absolute',
      display: 'block',
      backgroundColor: vars.color.textInverse,
      borderRadius: 1,
      borderStyle: 'none',
      borderWidth: 0,
      transform: 'none',
    },
  },
})

export const inputSize = styleVariants({
  sm: [
    inputBase,
    {
      width: 14,
      height: 14,
      borderRadius: 4,
      selectors: {
        '&:checked::after': {
          top: 1,
          left: 3,
          width: 4,
          height: 7,
        },
        '&:indeterminate::after': {
          width: 6,
          height: 2,
          top: 6,
          left: 4,
        },
      },
    },
  ],
  md: [
    inputBase,
    {
      width: 16,
      height: 16,
      selectors: {
        '&:checked::after': {
          top: 2,
          left: 4,
          width: 5,
          height: 8,
        },
        '&:indeterminate::after': {
          width: 8,
          height: 2,
          top: 8,
          left: 5,
        },
      },
    },
  ],
  lg: [
    inputBase,
    {
      width: 22,
      height: 22,
      borderWidth: 2,
      selectors: {
        '&:checked::after': {
          top: 2,
          left: 6,
          width: 6,
          height: 11,
        },
        '&:indeterminate::after': {
          width: 10,
          height: 2,
          top: 10,
          left: 6,
        },
      },
    },
  ],
})

export const inputError = style({
  borderColor: vars.color.danger,
  selectors: {
    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.danger}`,
    },
  },
})

export const label = style({
  fontSize: vars.font.size.md,
  color: vars.color.text,
  lineHeight: 1,
})

export type CheckboxSize = keyof typeof inputSize
