/**
 * 글리치 / "코드 에러" 테마 토큰.
 *
 * 어두운 바탕 위에서 색수차(RGB 분리), 스캔라인, static 노이즈, 도형 심볼로
 * 무질서하고 지지직거리는 화면을 구성한다. 기존 다크 톤(tokens.css.ts)과
 * 호환되는 near-black 캔버스를 쓴다.
 */
export const glitch = {
  color: {
    bg: '#0a0a0b',
    bgDeep: '#050506',
    text: '#f4f4f5',
    textDim: 'rgba(244, 244, 245, 0.5)',
    line: 'rgba(244, 244, 245, 0.12)',
    // RGB 분리 채널 + 네온
    red: '#ff2e63',
    cyan: '#22e8ff',
    blue: '#3b6bff',
    green: '#37ff8b',
    magenta: '#ff2bd6',
  },
  font: {
    display: '"Anton", "Archivo Black", Impact, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, "Cascadia Code", monospace',
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif',
  },
  // static 노이즈 (SVG feTurbulence)
  noise:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
} as const
