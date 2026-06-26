import { recipe } from '@vanilla-extract/recipes'
import { style, globalStyle, keyframes, createVar } from '@vanilla-extract/css'
import { vars } from '../../theme/contract.css'

export const spinnerColorVar = createVar()

// ── Keyframes ────────────────────────────────────────────────────────────────

const rotation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const bounce = keyframes({
  '0%': { transform: 'scale(0)', opacity: 1 },
  '100%': { transform: 'scale(1)', opacity: 0 },
})

const fadeinout = keyframes({
  '0%, 80%, 100%': { boxShadow: '0 2.5em 0 -1.3em' },
  '40%': { boxShadow: '0 2.5em 0 0' },
})

const spinnerRotation = keyframes({
  '100%': { transform: 'rotate(1turn)' },
})

// ── Wrapper Recipe ────────────────────────────────────────────────────────────

export const spinnerWrapperRecipe = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    overlay: {
      false: {},
      true: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `color-mix(in srgb, ${vars.color.surface} 80%, transparent)`,
        zIndex: 9999,
      },
    },
  },
  defaultVariants: { overlay: false },
})

// ── Spinner Recipe ────────────────────────────────────────────────────────────
// compound variants use only variant+size (not type) so all type+variant
// combinations work without duplicating styles.

export const spinnerRecipe = recipe({
  base: {
    display: 'inline-block',
    boxSizing: 'border-box',
    position: 'relative',
    borderRadius: '50%',
    vars: { [spinnerColorVar]: vars.color.primary },
  },
  variants: {
    type: {
      default: {},
      dots: {},
      outline: {},
    },
    variant: {
      solid: {},
      round: {},
      circle: {},
      bounce: {},
      fadeinout: {},
      outline: {},
      flow: {},
    },
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },
  defaultVariants: { type: 'default', variant: 'solid', size: 'md' },
  compoundVariants: [
    // ── solid ────────────────────────────────────────────────────────────────
    {
      variants: { variant: 'solid', size: 'sm' },
      style: {
        width: 24,
        height: 24,
        border: `3px solid ${spinnerColorVar}`,
        borderBottomColor: 'transparent',
        animation: `${rotation} 1s linear infinite`,
      },
    },
    {
      variants: { variant: 'solid', size: 'md' },
      style: {
        width: 36,
        height: 36,
        border: `5px solid ${spinnerColorVar}`,
        borderBottomColor: 'transparent',
        animation: `${rotation} 1s linear infinite`,
      },
    },
    {
      variants: { variant: 'solid', size: 'lg' },
      style: {
        width: 48,
        height: 48,
        border: `7px solid ${spinnerColorVar}`,
        borderBottomColor: 'transparent',
        animation: `${rotation} 1s linear infinite`,
      },
    },

    // ── round ────────────────────────────────────────────────────────────────
    {
      variants: { variant: 'round', size: 'sm' },
      style: {
        width: 24,
        height: 24,
        aspectRatio: '1',
        borderRadius: '50%',
        background: `radial-gradient(farthest-side, ${spinnerColorVar} 94%, transparent) top / 6px 6px no-repeat, conic-gradient(from 0deg, transparent 30%, ${spinnerColorVar})`,
        /* CSS mask에서 #000 = 완전 불투명(visible). 테마와 무관한 마스크 알파 고정값. (SKILL.md 예외 1) */
        mask: `radial-gradient(farthest-side, transparent calc(100% - 6px), #000 0)`,
        WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 6px), #000 0)`,
        animation: `${spinnerRotation} 1s infinite linear`,
      },
    },
    {
      variants: { variant: 'round', size: 'md' },
      style: {
        width: 36,
        height: 36,
        aspectRatio: '1',
        borderRadius: '50%',
        background: `radial-gradient(farthest-side, ${spinnerColorVar} 94%, transparent) top / 8px 8px no-repeat, conic-gradient(from 0deg, transparent 30%, ${spinnerColorVar})`,
        mask: `radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)`,
        WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)`,
        animation: `${spinnerRotation} 1s infinite linear`,
      },
    },
    {
      variants: { variant: 'round', size: 'lg' },
      style: {
        width: 50,
        height: 50,
        aspectRatio: '1',
        borderRadius: '50%',
        background: `radial-gradient(farthest-side, ${spinnerColorVar} 94%, transparent) top / 8px 8px no-repeat, conic-gradient(from 0deg, transparent 30%, ${spinnerColorVar})`,
        mask: `radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)`,
        WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)`,
        animation: `${spinnerRotation} 1s infinite linear`,
      },
    },

    // ── circle ───────────────────────────────────────────────────────────────
    {
      variants: { variant: 'circle', size: 'sm' },
      style: {
        width: 24,
        height: 24,
        border: `3px dotted ${spinnerColorVar}`,
        animation: `${rotation} 3s linear infinite`,
      },
    },
    {
      variants: { variant: 'circle', size: 'md' },
      style: {
        width: 36,
        height: 36,
        border: `5px dotted ${spinnerColorVar}`,
        animation: `${rotation} 3s linear infinite`,
      },
    },
    {
      variants: { variant: 'circle', size: 'lg' },
      style: {
        width: 48,
        height: 48,
        border: `7px dotted ${spinnerColorVar}`,
        animation: `${rotation} 3s linear infinite`,
      },
    },

    // ── outline ──────────────────────────────────────────────────────────────
    {
      variants: { variant: 'outline', size: 'sm' },
      style: {
        width: 24,
        height: 24,
        border: '4px solid',
        borderColor: `color-mix(in srgb, ${spinnerColorVar} 15%, transparent) color-mix(in srgb, ${spinnerColorVar} 25%, transparent) color-mix(in srgb, ${spinnerColorVar} 35%, transparent) color-mix(in srgb, ${spinnerColorVar} 50%, transparent)`,
        animation: `${rotation} 1s linear infinite`,
      },
    },
    {
      variants: { variant: 'outline', size: 'md' },
      style: {
        width: 36,
        height: 36,
        border: '6px solid',
        borderColor: `color-mix(in srgb, ${spinnerColorVar} 15%, transparent) color-mix(in srgb, ${spinnerColorVar} 25%, transparent) color-mix(in srgb, ${spinnerColorVar} 35%, transparent) color-mix(in srgb, ${spinnerColorVar} 50%, transparent)`,
        animation: `${rotation} 1s linear infinite`,
      },
    },
    {
      variants: { variant: 'outline', size: 'lg' },
      style: {
        width: 48,
        height: 48,
        border: '8px solid',
        borderColor: `color-mix(in srgb, ${spinnerColorVar} 15%, transparent) color-mix(in srgb, ${spinnerColorVar} 25%, transparent) color-mix(in srgb, ${spinnerColorVar} 35%, transparent) color-mix(in srgb, ${spinnerColorVar} 50%, transparent)`,
        animation: `${rotation} 1s linear infinite`,
      },
    },

    // ── flow ─────────────────────────────────────────────────────────────────
    {
      variants: { variant: 'flow', size: 'sm' },
      style: {
        width: 24,
        height: 24,
        border: '3px solid transparent',
        borderTopColor: spinnerColorVar,
        borderRightColor: `color-mix(in srgb, ${spinnerColorVar} 40%, transparent)`,
        borderBottomColor: `color-mix(in srgb, ${spinnerColorVar} 20%, transparent)`,
        borderLeftColor: `color-mix(in srgb, ${spinnerColorVar} 60%, transparent)`,
        animation: `${rotation} 1.2s ease-in-out infinite`,
      },
    },
    {
      variants: { variant: 'flow', size: 'md' },
      style: {
        width: 36,
        height: 36,
        border: '5px solid transparent',
        borderTopColor: spinnerColorVar,
        borderRightColor: `color-mix(in srgb, ${spinnerColorVar} 40%, transparent)`,
        borderBottomColor: `color-mix(in srgb, ${spinnerColorVar} 20%, transparent)`,
        borderLeftColor: `color-mix(in srgb, ${spinnerColorVar} 60%, transparent)`,
        animation: `${rotation} 1.2s ease-in-out infinite`,
      },
    },
    {
      variants: { variant: 'flow', size: 'lg' },
      style: {
        width: 48,
        height: 48,
        border: '7px solid transparent',
        borderTopColor: spinnerColorVar,
        borderRightColor: `color-mix(in srgb, ${spinnerColorVar} 40%, transparent)`,
        borderBottomColor: `color-mix(in srgb, ${spinnerColorVar} 20%, transparent)`,
        borderLeftColor: `color-mix(in srgb, ${spinnerColorVar} 60%, transparent)`,
        animation: `${rotation} 1.2s ease-in-out infinite`,
      },
    },
  ],
})

// ── bounce 별도 style (pseudo-element 필요) ───────────────────────────────────

export const spinnerBounce = style({
  width: 48,
  height: 48,
  position: 'relative',
  vars: { [spinnerColorVar]: vars.color.primary },
})

export const spinnerBounceSm = style({
  width: 32,
  height: 32,
  position: 'relative',
  vars: { [spinnerColorVar]: vars.color.primary },
})

export const spinnerBounceLg = style({
  width: 64,
  height: 64,
  position: 'relative',
  vars: { [spinnerColorVar]: vars.color.primary },
})

globalStyle(`${spinnerBounce}::after, ${spinnerBounce}::before`, {
  content: '""',
  boxSizing: 'border-box',
  width: 48,
  height: 48,
  borderRadius: '50%',
  backgroundColor: spinnerColorVar,
  position: 'absolute',
  left: 0,
  top: 0,
  animation: `${bounce} 2s linear infinite`,
})
globalStyle(`${spinnerBounce}::after`, { animationDelay: '1s' })

globalStyle(`${spinnerBounceSm}::after, ${spinnerBounceSm}::before`, {
  content: '""',
  boxSizing: 'border-box',
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: spinnerColorVar,
  position: 'absolute',
  left: 0,
  top: 0,
  animation: `${bounce} 2s linear infinite`,
})
globalStyle(`${spinnerBounceSm}::after`, { animationDelay: '1s' })

globalStyle(`${spinnerBounceLg}::after, ${spinnerBounceLg}::before`, {
  content: '""',
  boxSizing: 'border-box',
  width: 64,
  height: 64,
  borderRadius: '50%',
  backgroundColor: spinnerColorVar,
  position: 'absolute',
  left: 0,
  top: 0,
  animation: `${bounce} 2s linear infinite`,
})
globalStyle(`${spinnerBounceLg}::after`, { animationDelay: '1s' })

// ── fadeinout 별도 style (pseudo-element 필요) ────────────────────────────────

export const spinnerFadeinout = style({
  width: 16,
  height: 16,
  borderRadius: '50%',
  animationFillMode: 'both',
  animation: `${fadeinout} 1.8s infinite ease-in-out`,
  position: 'relative',
  color: spinnerColorVar,
  fontSize: 7,
  textIndent: '-9999em',
  transform: 'translateZ(0)',
  animationDelay: '-0.16s',
  vars: { [spinnerColorVar]: vars.color.primary },
})

export const spinnerFadeinoutSm = style({
  width: 12,
  height: 12,
  borderRadius: '50%',
  animationFillMode: 'both',
  animation: `${fadeinout} 1.8s infinite ease-in-out`,
  position: 'relative',
  color: spinnerColorVar,
  fontSize: 7,
  textIndent: '-9999em',
  transform: 'translateZ(0)',
  animationDelay: '-0.16s',
  vars: { [spinnerColorVar]: vars.color.primary },
})

export const spinnerFadeinoutLg = style({
  width: 18,
  height: 18,
  borderRadius: '50%',
  animationFillMode: 'both',
  animation: `${fadeinout} 1.8s infinite ease-in-out`,
  position: 'relative',
  color: spinnerColorVar,
  fontSize: 7,
  textIndent: '-9999em',
  transform: 'translateZ(0)',
  animationDelay: '-0.16s',
  vars: { [spinnerColorVar]: vars.color.primary },
})

globalStyle(`${spinnerFadeinout}::before, ${spinnerFadeinout}::after`, {
  width: 16,
  height: 16,
  borderRadius: '50%',
  animationFillMode: 'both',
  animation: `${fadeinout} 1.8s infinite ease-in-out`,
  content: '""',
  position: 'absolute',
  top: 0,
})
globalStyle(`${spinnerFadeinout}::before`, { left: -23, animationDelay: '-0.32s' })
globalStyle(`${spinnerFadeinout}::after`, { left: 23 })

globalStyle(`${spinnerFadeinoutSm}::before, ${spinnerFadeinoutSm}::after`, {
  width: 12,
  height: 12,
  borderRadius: '50%',
  animationFillMode: 'both',
  animation: `${fadeinout} 1.8s infinite ease-in-out`,
  content: '""',
  position: 'absolute',
  top: 0,
})
globalStyle(`${spinnerFadeinoutSm}::before`, { left: -17, animationDelay: '-0.32s' })
globalStyle(`${spinnerFadeinoutSm}::after`, { left: 17 })

globalStyle(`${spinnerFadeinoutLg}::before, ${spinnerFadeinoutLg}::after`, {
  width: 18,
  height: 18,
  borderRadius: '50%',
  animationFillMode: 'both',
  animation: `${fadeinout} 1.8s infinite ease-in-out`,
  content: '""',
  position: 'absolute',
  top: 0,
})
globalStyle(`${spinnerFadeinoutLg}::before`, { left: -25, animationDelay: '-0.32s' })
globalStyle(`${spinnerFadeinoutLg}::after`, { left: 25 })
