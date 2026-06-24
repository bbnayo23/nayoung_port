import { createGlobalThemeContract } from '@vanilla-extract/css'

/**
 * 테마 컨트랙트 — 값이 아니라 CSS 커스텀 프로퍼티 "이름"만 정의한다.
 * 실제 값은 테마 파일(`xdr.css.ts` 등)이 `createGlobalTheme(selector, vars, {...})` 로 채운다.
 *
 * style-guide-components(2026-OneUI) 의 토큰 체계를 그대로 옮겨왔다 — 컴포넌트는
 * 하드코딩 값 대신 `vars.color.primary` / `vars.transition.fast` 처럼 이 컨트랙트만 참조한다.
 */
export const vars = createGlobalThemeContract(
  {
    color: {
      primary: 'color-primary',
      primaryHover: 'color-primary-hover',
      primaryActive: 'color-primary-active',
      secondary: 'color-secondary',
      secondaryHover: 'color-secondary-hover',
      background: 'color-background',
      surface: 'color-surface',
      surfaceHover: 'color-surface-hover',
      border: 'color-border',
      borderHover: 'color-border-hover',
      text: 'color-text',
      textSecondary: 'color-text-secondary',
      textMuted: 'color-text-muted',
      textInverse: 'color-text-inverse',
      success: 'color-success',
      warning: 'color-warning',
      error: 'color-error',
      info: 'color-info',
    },
    spacing: {
      xs: 'spacing-xs',
      sm: 'spacing-sm',
      md: 'spacing-md',
      lg: 'spacing-lg',
      xl: 'spacing-xl',
      xxl: 'spacing-xxl',
    },
    radius: {
      sm: 'radius-sm',
      md: 'radius-md',
      lg: 'radius-lg',
      full: 'radius-full',
    },
    font: {
      family: 'font-family',
      sizeXs: 'font-size-xs',
      sizeSm: 'font-size-sm',
      sizeMd: 'font-size-md',
      sizeLg: 'font-size-lg',
      sizeXl: 'font-size-xl',
      sizeXxl: 'font-size-xxl',
      weightNormal: 'font-weight-normal',
      weightMedium: 'font-weight-medium',
      weightBold: 'font-weight-bold',
    },
    shadow: {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    },
    transition: {
      fast: 'transition-fast',
      normal: 'transition-normal',
      slow: 'transition-slow',
    },
    header: {
      height: 'header-height',
      background: 'header-background',
    },
    sidebar: {
      width: 'sidebar-width',
      collapsedWidth: 'sidebar-collapsed-width',
      background: 'sidebar-background',
    },
    // Input / select / textarea sizing 토큰. theme-agnostic 한 값이지만 컨트랙트에 두어
    // 컴포넌트가 vars.field.* 로 참조하도록 통일.
    field: {
      heightSm: 'field-height-sm',
      heightMd: 'field-height-md',
      heightLg: 'field-height-lg',
      fontSizeSm: 'field-font-size-sm',
      fontSizeMd: 'field-font-size-md',
      fontSizeLg: 'field-font-size-lg',
      paddingX: 'field-padding-x',
      rowHeight: 'field-row-height',
      gap: 'field-gap',
    },
  },
  (value) => `ds-${value}`,
)

export type ThemeVars = typeof vars
