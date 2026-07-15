import { recipe } from '@vanilla-extract/recipes'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@dc/theme/contract.css'
import { createBadgeTokens } from './Badge.tokens'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
globalStyle(':root', createBadgeTokens() as any)

export const badgeRecipe = recipe({
  base: {
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    fontSize: vars.font.sizeSm,
    fontWeight: vars.font.weightNormal,
  },

  variants: {
    variant: {
      dot: {
        padding: 0,
        height: 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'fit-content',
        minWidth: 'fit-content',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      },
      'dot-outline': {
        padding: '4px 8px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'fit-content',
        minWidth: 'fit-content',
        height: 28,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        borderRadius: 20,
        border: `1px solid ${vars.color.border}`,
      },
      status: {
        padding: '2px 8px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'fit-content',
        minWidth: 'fit-content',
        height: 22,
        minHeight: 22,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        borderRadius: vars.radius.sm,
        fontWeight: 500,
      },
      'status-round': {
        padding: '4px 12px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'fit-content',
        minWidth: 'fit-content',
        height: 24,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        borderRadius: 20,
        fontWeight: 500,
      },
      'status-score': {
        padding: 0,
        display: 'inline-flex',
        alignItems: 'center',
        width: 'fit-content',
        minWidth: 'fit-content',
        height: 'auto',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        gap: 6,
        fontWeight: 500,
      },
      outline: {
        borderRadius: 20,
        padding: '2px 10px',
        fontWeight: vars.font.weightNormal,
        display: 'inline-flex',
        alignItems: 'center',
        height: 24,
        minWidth: 'fit-content',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        border: `1px solid ${vars.color.primary}`,
        backgroundColor: vars.color.primarySoft,
        color: vars.color.primary,
      },
      icon: {
        borderRadius: 20,
        border: `1px solid ${vars.color.border}`,
        color: vars.color.border,
        padding: '4px 8px',
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        justifyContent: 'center',
      },
      fill: {
        color: 'var(--color-badge-white)',
        borderRadius: 20,
        padding: '4px 12px',
        minWidth: 40,
        width: 'fit-content',
        height: 28,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      },
      circle: {
        borderRadius: '50%',
        width: 28,
        height: 28,
        minWidth: 28,
        padding: 0,
        border: `1px solid ${vars.color.border}`,
        color: vars.color.textSecondary,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        lineHeight: 1,
        flexShrink: 0,
      },
      alert: {
        backgroundColor: vars.color.error,
        color: 'var(--color-badge-white)',
        borderRadius: vars.radius.md,
        padding: '0 4px',
        minWidth: 18,
        height: 18,
        width: 'fit-content',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: vars.font.weightNormal,
        lineHeight: 1,
      },
      step: {
        backgroundColor: vars.color.primarySoft,
        color: vars.color.primary,
        minWidth: 'fit-content',
        height: 24,
        borderRadius: vars.radius.md,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px 8px',
        fontWeight: 500,
      },
      tag: {
        backgroundColor: vars.color.surfaceHover,
        borderRadius: vars.radius.sm,
        borderLeft: `2px solid ${vars.color.border}`,
        padding: '2px 6px',
        color: vars.color.textSecondary,
        height: 22,
        minWidth: 'fit-content',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
      },
      'detail-tag': {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 8px',
        borderRadius: 3,
        fontSize: vars.font.sizeXs,
        fontWeight: 500,
        whiteSpace: 'nowrap',
        minWidth: 'fit-content',
        border: `1px solid ${vars.color.border}`,
        background: vars.color.surfaceHover,
        color: vars.color.text,
      },
    },

    color: {
      red: {},
      orange: {},
      yellow: {},
      green: {},
      purple: {},
      blue: {},
      navy: {},
      gray: {},
      'medium-gray': {},
      'light-blue': {},
      pink: {},
    },

    size: {
      sm: {
        fontSize: vars.font.sizeSm,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 6,
        paddingRight: 6,
        height: 20,
        minHeight: 0,
      },
      md: {},
      lg: { fontSize: vars.font.sizeLg, paddingTop: 6, paddingBottom: 6, paddingLeft: 16, paddingRight: 16 },
    },
  },

  defaultVariants: { size: 'md' },

  compoundVariants: [
    // ── dot × color (text color only) ─────────────────────────────────────
    { variants: { variant: 'dot', color: 'red' }, style: { color: 'var(--color-badge-red)' } },
    { variants: { variant: 'dot', color: 'orange' }, style: { color: 'var(--color-badge-orange)' } },
    { variants: { variant: 'dot', color: 'yellow' }, style: { color: 'var(--color-badge-yellow)' } },
    { variants: { variant: 'dot', color: 'green' }, style: { color: 'var(--color-badge-green)' } },
    { variants: { variant: 'dot', color: 'purple' }, style: { color: 'var(--color-badge-purple)' } },
    { variants: { variant: 'dot', color: 'blue' }, style: { color: 'var(--color-badge-blue)' } },
    { variants: { variant: 'dot', color: 'navy' }, style: { color: 'var(--color-badge-navy)' } },
    { variants: { variant: 'dot', color: 'gray' }, style: { color: 'var(--color-badge-gray)' } },
    { variants: { variant: 'dot', color: 'pink' }, style: { color: 'var(--color-badge-pink)' } },

    // ── dot-outline × color (text + border) ──────────────────────────────
    {
      variants: { variant: 'dot-outline', color: 'red' },
      style: { color: 'var(--color-badge-red)', borderColor: 'var(--color-badge-red)' },
    },
    {
      variants: { variant: 'dot-outline', color: 'orange' },
      style: { color: 'var(--color-badge-orange)', borderColor: 'var(--color-badge-orange)' },
    },
    {
      variants: { variant: 'dot-outline', color: 'yellow' },
      style: { color: 'var(--color-badge-yellow)', borderColor: 'var(--color-badge-yellow)' },
    },
    {
      variants: { variant: 'dot-outline', color: 'green' },
      style: { color: 'var(--color-badge-green)', borderColor: 'var(--color-badge-green)' },
    },
    {
      variants: { variant: 'dot-outline', color: 'purple' },
      style: { color: 'var(--color-badge-purple)', borderColor: 'var(--color-badge-purple)' },
    },
    {
      variants: { variant: 'dot-outline', color: 'blue' },
      style: { color: 'var(--color-badge-blue)', borderColor: 'var(--color-badge-blue)' },
    },
    {
      variants: { variant: 'dot-outline', color: 'navy' },
      style: { color: 'var(--color-badge-navy)', borderColor: 'var(--color-badge-navy)' },
    },
    {
      variants: { variant: 'dot-outline', color: 'gray' },
      style: { color: 'var(--color-badge-gray)', borderColor: 'var(--color-badge-gray)' },
    },
    {
      variants: { variant: 'dot-outline', color: 'pink' },
      style: { color: 'var(--color-badge-pink)', borderColor: 'var(--color-badge-pink)' },
    },

    // ── status × color (text + bg) ───────────────────────────────────────
    {
      variants: { variant: 'status', color: 'red' },
      style: { color: 'var(--color-badge-status-red-text)', backgroundColor: 'var(--color-badge-status-red-bg)' },
    },
    {
      variants: { variant: 'status', color: 'orange' },
      style: { color: 'var(--color-badge-status-orange-text)', backgroundColor: 'var(--color-badge-status-orange-bg)' },
    },
    {
      variants: { variant: 'status', color: 'yellow' },
      style: { color: 'var(--color-badge-status-yellow-text)', backgroundColor: 'var(--color-badge-status-yellow-bg)' },
    },
    {
      variants: { variant: 'status', color: 'green' },
      style: { color: 'var(--color-badge-status-green-text)', backgroundColor: 'var(--color-badge-status-green-bg)' },
    },
    {
      variants: { variant: 'status', color: 'purple' },
      style: { color: 'var(--color-badge-status-purple-text)', backgroundColor: 'var(--color-badge-status-purple-bg)' },
    },
    {
      variants: { variant: 'status', color: 'blue' },
      style: { color: 'var(--color-badge-status-blue-text)', backgroundColor: 'var(--color-badge-status-blue-bg)' },
    },
    {
      variants: { variant: 'status', color: 'navy' },
      style: { color: 'var(--color-badge-status-navy-text)', backgroundColor: 'var(--color-badge-status-navy-bg)' },
    },
    {
      variants: { variant: 'status', color: 'gray' },
      style: { color: 'var(--color-badge-status-gray-text)', backgroundColor: 'var(--color-badge-status-gray-bg)' },
    },
    {
      variants: { variant: 'status', color: 'pink' },
      style: { color: 'var(--color-badge-status-pink-text)', backgroundColor: 'var(--color-badge-status-pink-bg)' },
    },

    // ── status-round × color (text + bg) ─────────────────────────────────
    {
      variants: { variant: 'status-round', color: 'red' },
      style: { color: 'var(--color-badge-status-red-text)', backgroundColor: 'var(--color-badge-status-red-bg)' },
    },
    {
      variants: { variant: 'status-round', color: 'orange' },
      style: { color: 'var(--color-badge-status-orange-text)', backgroundColor: 'var(--color-badge-status-orange-bg)' },
    },
    {
      variants: { variant: 'status-round', color: 'yellow' },
      style: { color: 'var(--color-badge-status-yellow-text)', backgroundColor: 'var(--color-badge-status-yellow-bg)' },
    },
    {
      variants: { variant: 'status-round', color: 'green' },
      style: { color: 'var(--color-badge-status-green-text)', backgroundColor: 'var(--color-badge-status-green-bg)' },
    },
    {
      variants: { variant: 'status-round', color: 'purple' },
      style: { color: 'var(--color-badge-status-purple-text)', backgroundColor: 'var(--color-badge-status-purple-bg)' },
    },
    {
      variants: { variant: 'status-round', color: 'blue' },
      style: { color: 'var(--color-badge-status-blue-text)', backgroundColor: 'var(--color-badge-status-blue-bg)' },
    },
    {
      variants: { variant: 'status-round', color: 'navy' },
      style: { color: 'var(--color-badge-status-navy-text)', backgroundColor: 'var(--color-badge-status-navy-bg)' },
    },
    {
      variants: { variant: 'status-round', color: 'gray' },
      style: { color: 'var(--color-badge-status-gray-text)', backgroundColor: 'var(--color-badge-status-gray-bg)' },
    },
    {
      variants: { variant: 'status-round', color: 'pink' },
      style: { color: 'var(--color-badge-status-pink-text)', backgroundColor: 'var(--color-badge-status-pink-bg)' },
    },

    // ── status-score × color (text color) ────────────────────────────────
    { variants: { variant: 'status-score', color: 'red' }, style: { color: 'var(--color-badge-red)' } },
    { variants: { variant: 'status-score', color: 'orange' }, style: { color: 'var(--color-badge-orange)' } },
    { variants: { variant: 'status-score', color: 'yellow' }, style: { color: 'var(--color-badge-yellow)' } },
    { variants: { variant: 'status-score', color: 'green' }, style: { color: 'var(--color-badge-green)' } },
    { variants: { variant: 'status-score', color: 'purple' }, style: { color: 'var(--color-badge-purple)' } },
    { variants: { variant: 'status-score', color: 'blue' }, style: { color: 'var(--color-badge-blue)' } },
    { variants: { variant: 'status-score', color: 'navy' }, style: { color: 'var(--color-badge-navy)' } },
    { variants: { variant: 'status-score', color: 'gray' }, style: { color: 'var(--color-badge-gray)' } },
    { variants: { variant: 'status-score', color: 'pink' }, style: { color: 'var(--color-badge-pink)' } },

    // ── outline × color (borderColor + bg + color) ───────────────────────
    {
      variants: { variant: 'outline', color: 'red' },
      style: {
        borderColor: 'var(--color-badge-red)',
        backgroundColor: 'var(--color-badge-red-subtle)',
        color: 'var(--color-badge-red)',
      },
    },
    {
      variants: { variant: 'outline', color: 'orange' },
      style: {
        borderColor: 'var(--color-badge-orange)',
        backgroundColor: 'var(--color-badge-orange-subtle)',
        color: 'var(--color-badge-orange)',
      },
    },
    {
      variants: { variant: 'outline', color: 'yellow' },
      style: {
        borderColor: 'var(--color-badge-yellow)',
        backgroundColor: 'var(--color-badge-yellow-subtle)',
        color: 'var(--color-badge-yellow)',
      },
    },
    {
      variants: { variant: 'outline', color: 'green' },
      style: {
        borderColor: 'var(--color-badge-green)',
        backgroundColor: 'var(--color-badge-green-subtle)',
        color: 'var(--color-badge-green)',
      },
    },
    {
      variants: { variant: 'outline', color: 'purple' },
      style: {
        borderColor: 'var(--color-badge-purple)',
        backgroundColor: 'var(--color-badge-purple-subtle)',
        color: 'var(--color-badge-purple)',
      },
    },
    {
      variants: { variant: 'outline', color: 'blue' },
      style: {
        borderColor: 'var(--color-badge-blue)',
        backgroundColor: 'var(--color-badge-blue-subtle)',
        color: 'var(--color-badge-blue)',
      },
    },
    {
      variants: { variant: 'outline', color: 'navy' },
      style: {
        borderColor: 'var(--color-badge-navy)',
        backgroundColor: 'var(--color-badge-navy-subtle)',
        color: 'var(--color-badge-navy)',
      },
    },
    {
      variants: { variant: 'outline', color: 'gray' },
      style: {
        borderColor: 'var(--color-badge-gray)',
        backgroundColor: 'var(--color-badge-gray-subtle)',
        color: 'var(--color-badge-gray)',
      },
    },
    {
      variants: { variant: 'outline', color: 'pink' },
      style: {
        borderColor: 'var(--color-badge-pink)',
        backgroundColor: 'var(--color-badge-pink-subtle)',
        color: 'var(--color-badge-pink)',
      },
    },

    // ── fill × color (backgroundColor) ───────────────────────────────────
    { variants: { variant: 'fill', color: 'red' }, style: { backgroundColor: 'var(--color-badge-fill-red)' } },
    { variants: { variant: 'fill', color: 'orange' }, style: { backgroundColor: 'var(--color-badge-fill-orange)' } },
    { variants: { variant: 'fill', color: 'yellow' }, style: { backgroundColor: 'var(--color-badge-fill-yellow)' } },
    { variants: { variant: 'fill', color: 'green' }, style: { backgroundColor: 'var(--color-badge-fill-green)' } },
    { variants: { variant: 'fill', color: 'purple' }, style: { backgroundColor: 'var(--color-badge-fill-purple)' } },
    { variants: { variant: 'fill', color: 'blue' }, style: { backgroundColor: 'var(--color-badge-fill-blue)' } },
    { variants: { variant: 'fill', color: 'navy' }, style: { backgroundColor: 'var(--color-badge-fill-navy)' } },
    { variants: { variant: 'fill', color: 'gray' }, style: { backgroundColor: 'var(--color-badge-gray)' } },
    {
      variants: { variant: 'fill', color: 'medium-gray' },
      style: { backgroundColor: 'var(--color-badge-medium-gray)' },
    },
    {
      variants: { variant: 'fill', color: 'light-blue' },
      style: { backgroundColor: 'var(--color-badge-blue-light)', color: 'var(--color-badge-blue-dark)' },
    },
    { variants: { variant: 'fill', color: 'pink' }, style: { backgroundColor: 'var(--color-badge-fill-pink)' } },

    // ── icon × color (border + color + bg) ───────────────────────────────
    {
      variants: { variant: 'icon', color: 'red' },
      style: {
        borderColor: 'var(--color-badge-red)',
        color: 'var(--color-badge-red)',
        backgroundColor: 'var(--color-badge-red-subtle)',
      },
    },
    {
      variants: { variant: 'icon', color: 'orange' },
      style: {
        borderColor: 'var(--color-badge-orange)',
        color: 'var(--color-badge-orange)',
        backgroundColor: 'var(--color-badge-orange-subtle)',
      },
    },
    {
      variants: { variant: 'icon', color: 'yellow' },
      style: {
        borderColor: 'var(--color-badge-yellow)',
        color: 'var(--color-badge-yellow)',
        backgroundColor: 'var(--color-badge-yellow-subtle)',
      },
    },
    {
      variants: { variant: 'icon', color: 'green' },
      style: {
        borderColor: 'var(--color-badge-green)',
        color: 'var(--color-badge-green)',
        backgroundColor: 'var(--color-badge-green-subtle)',
      },
    },
    {
      variants: { variant: 'icon', color: 'purple' },
      style: {
        borderColor: 'var(--color-badge-purple)',
        color: 'var(--color-badge-purple)',
        backgroundColor: 'var(--color-badge-purple-subtle)',
      },
    },
    {
      variants: { variant: 'icon', color: 'blue' },
      style: {
        borderColor: 'var(--color-badge-blue)',
        color: 'var(--color-badge-blue)',
        backgroundColor: 'var(--color-badge-blue-subtle)',
      },
    },
    {
      variants: { variant: 'icon', color: 'navy' },
      style: {
        borderColor: 'var(--color-badge-navy)',
        color: 'var(--color-badge-navy)',
        backgroundColor: 'var(--color-badge-navy-subtle)',
      },
    },
    {
      variants: { variant: 'icon', color: 'gray' },
      style: { backgroundColor: 'transparent', color: vars.color.textMuted, borderColor: vars.color.textMuted },
    },
    {
      variants: { variant: 'icon', color: 'medium-gray' },
      style: {
        backgroundColor: 'var(--color-badge-medium-gray)',
        color: 'var(--color-badge-white)',
        borderColor: 'var(--color-badge-medium-gray)',
      },
    },
    {
      variants: { variant: 'icon', color: 'pink' },
      style: {
        borderColor: 'var(--color-badge-pink)',
        color: 'var(--color-badge-pink)',
        backgroundColor: 'var(--color-badge-pink-subtle)',
      },
    },

    // ── circle × color (border + text) ───────────────────────────────────
    {
      variants: { variant: 'circle', color: 'red' },
      style: { borderColor: 'var(--color-badge-red)', color: 'var(--color-badge-red)' },
    },
    {
      variants: { variant: 'circle', color: 'orange' },
      style: { borderColor: 'var(--color-badge-orange)', color: 'var(--color-badge-orange)' },
    },
    {
      variants: { variant: 'circle', color: 'yellow' },
      style: { borderColor: 'var(--color-badge-yellow)', color: 'var(--color-badge-yellow)' },
    },
    {
      variants: { variant: 'circle', color: 'green' },
      style: { borderColor: 'var(--color-badge-green)', color: 'var(--color-badge-green)' },
    },
    {
      variants: { variant: 'circle', color: 'purple' },
      style: { borderColor: 'var(--color-badge-purple)', color: 'var(--color-badge-purple)' },
    },
    {
      variants: { variant: 'circle', color: 'blue' },
      style: { borderColor: 'var(--color-badge-blue)', color: 'var(--color-badge-blue)' },
    },
    {
      variants: { variant: 'circle', color: 'navy' },
      style: { borderColor: 'var(--color-badge-navy)', color: 'var(--color-badge-navy)' },
    },
    {
      variants: { variant: 'circle', color: 'gray' },
      style: { borderColor: vars.color.border, color: vars.color.textSecondary },
    },
    {
      variants: { variant: 'circle', color: 'pink' },
      style: { borderColor: 'var(--color-badge-pink)', color: 'var(--color-badge-pink)' },
    },

    // ── tag × color (borderLeftColor + bg + color) ───────────────────────
    {
      variants: { variant: 'tag', color: 'red' },
      style: {
        borderLeftColor: 'var(--color-badge-red)',
        backgroundColor: 'var(--color-badge-red-subtle)',
        color: 'var(--color-badge-red)',
      },
    },
    {
      variants: { variant: 'tag', color: 'orange' },
      style: {
        borderLeftColor: 'var(--color-badge-orange)',
        backgroundColor: 'var(--color-badge-orange-subtle)',
        color: 'var(--color-badge-orange)',
      },
    },
    {
      variants: { variant: 'tag', color: 'yellow' },
      style: {
        borderLeftColor: 'var(--color-badge-yellow)',
        backgroundColor: 'var(--color-badge-yellow-subtle)',
        color: 'var(--color-badge-yellow)',
      },
    },
    {
      variants: { variant: 'tag', color: 'green' },
      style: {
        borderLeftColor: 'var(--color-badge-green)',
        backgroundColor: 'var(--color-badge-green-tag-subtle)',
        color: 'var(--color-badge-green)',
      },
    },
    {
      variants: { variant: 'tag', color: 'purple' },
      style: {
        borderLeftColor: 'var(--color-badge-purple)',
        backgroundColor: 'var(--color-badge-purple-subtle)',
        color: 'var(--color-badge-purple)',
      },
    },
    {
      variants: { variant: 'tag', color: 'blue' },
      style: {
        borderLeftColor: 'var(--color-badge-blue)',
        backgroundColor: 'var(--color-badge-blue-subtle)',
        color: 'var(--color-badge-blue)',
      },
    },
    {
      variants: { variant: 'tag', color: 'navy' },
      style: {
        borderLeftColor: 'var(--color-badge-navy)',
        backgroundColor: 'var(--color-badge-navy-subtle)',
        color: 'var(--color-badge-navy)',
      },
    },
    {
      variants: { variant: 'tag', color: 'gray' },
      style: {
        borderLeftColor: 'var(--color-badge-gray)',
        backgroundColor: 'var(--color-badge-gray-subtle)',
        color: 'var(--color-badge-gray)',
      },
    },
    {
      variants: { variant: 'tag', color: 'pink' },
      style: {
        borderLeftColor: 'var(--color-badge-pink)',
        backgroundColor: 'var(--color-badge-pink-subtle)',
        color: 'var(--color-badge-pink)',
      },
    },

    // ── detail-tag × color (bg + borderColor + color) ────────────────────
    {
      variants: { variant: 'detail-tag', color: 'red' },
      style: {
        background: 'var(--color-badge-detail-red-subtle)',
        borderColor: 'var(--color-badge-red)',
        color: 'var(--color-badge-red)',
      },
    },
    {
      variants: { variant: 'detail-tag', color: 'orange' },
      style: {
        background: 'var(--color-badge-detail-orange-subtle)',
        borderColor: 'var(--color-badge-orange)',
        color: 'var(--color-badge-orange)',
      },
    },
    {
      variants: { variant: 'detail-tag', color: 'yellow' },
      style: {
        background: 'var(--color-badge-detail-yellow-subtle)',
        borderColor: 'var(--color-badge-yellow)',
        color: 'var(--color-badge-yellow)',
      },
    },
    {
      variants: { variant: 'detail-tag', color: 'green' },
      style: {
        background: 'var(--color-badge-detail-green-subtle)',
        borderColor: 'var(--color-badge-green)',
        color: 'var(--color-badge-green)',
      },
    },
    {
      variants: { variant: 'detail-tag', color: 'purple' },
      style: {
        background: 'var(--color-badge-detail-purple-subtle)',
        borderColor: 'var(--color-badge-purple)',
        color: 'var(--color-badge-purple)',
      },
    },
    {
      variants: { variant: 'detail-tag', color: 'blue' },
      style: {
        background: 'var(--color-badge-detail-blue-subtle)',
        borderColor: 'var(--color-badge-blue)',
        color: 'var(--color-badge-blue)',
      },
    },
    {
      variants: { variant: 'detail-tag', color: 'navy' },
      style: {
        background: 'var(--color-badge-detail-navy-subtle)',
        borderColor: 'var(--color-badge-navy)',
        color: 'var(--color-badge-navy)',
      },
    },
    {
      variants: { variant: 'detail-tag', color: 'gray' },
      style: {
        background: 'var(--color-badge-detail-gray-subtle)',
        borderColor: 'var(--color-badge-gray)',
        color: 'var(--color-badge-gray)',
      },
    },

    // ── alert sm ─────────────────────────────────────────────────────────
    { variants: { variant: 'alert', size: 'sm' }, style: { fontSize: vars.font.sizeXs, minWidth: 14, height: 14 } },
  ],
})

// ── dot / dot-outline ::before 마커 ─────────────────────────────────────────

export const dotMarker = style({})

globalStyle(`${dotMarker}::before`, {
  content: '""',
  width: 10,
  height: 10,
  minWidth: 10,
  borderRadius: '50%',
  marginRight: 6,
  display: 'inline-block',
  backgroundColor: 'currentColor',
})

// ── status-score .score 내부 스타일 ──────────────────────────────────────────

export const statusScoreInner = style({})

globalStyle(`${statusScoreInner} .score`, {
  borderRadius: 20,
  padding: '3px 8px',
  border: '1px solid currentColor',
  fontWeight: vars.font.weightNormal,
  fontSize: vars.font.sizeXs,
  lineHeight: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
})

// ── icon svg ─────────────────────────────────────────────────────────────────

export const badgeIconSvg = style({})

globalStyle(`${badgeIconSvg} svg`, {
  fill: 'currentColor',
  width: 16,
})

// ── closable 닫기 버튼 ───────────────────────────────────────────────────────

export const badgeCloseBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 14,
  height: 14,
  fontSize: vars.font.sizeMd,
  lineHeight: 1,
  cursor: 'pointer',
  opacity: 0.6,
  borderRadius: '50%',
  transition: `opacity ${vars.transition.fast}, background-color ${vars.transition.fast}`,
})

globalStyle(`${badgeCloseBtn}:hover`, {
  opacity: 1,
  backgroundColor: vars.color.surfaceHover,
})

export type BadgeVariants = RecipeVariants<typeof badgeRecipe>
