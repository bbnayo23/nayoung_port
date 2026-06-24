/**
 * 테마 간 공통(theme-agnostic) 토큰 값. 색상/그림자처럼 테마마다 달라지는 값은
 * 각 테마 파일이 별도로 채우고, 여기서는 모든 테마가 공유하는 스케일만 정의한다.
 */
export const commonTokens = {
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  radius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  font: {
    family: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    sizeXs: '11px',
    sizeSm: '12px',
    sizeMd: '14px',
    sizeLg: '16px',
    sizeXl: '20px',
    sizeXxl: '24px',
    weightNormal: '400',
    weightMedium: '500',
    weightBold: '700',
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.07)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
  transition: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '350ms ease',
  },
  header: {
    height: '56px',
  },
  sidebar: {
    width: '240px',
    collapsedWidth: '64px',
  },
  field: {
    heightSm: '28px',
    heightMd: '32px',
    heightLg: '36px',
    fontSizeSm: '12px',
    fontSizeMd: '13px',
    fontSizeLg: '14px',
    paddingX: '12px',
    rowHeight: '38px',
    gap: '14px',
  },
}
