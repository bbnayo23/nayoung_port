/**
 * Swiss 에디토리얼 × 글래스모피즘 테마 토큰.
 *
 * 웜 오프화이트 베이스 + 트랜스포머티브 틸 포인트(2026 트렌드).
 * 배경에 은은한 컬러 메시를 깔고 패널을 반투명 유리로 처리해
 * "유리 위에 적은" 느낌을 낸다. 색은 중채도로 눈에 편하게.
 */
export const swiss = {
  color: {
    paper: '#f4f5f9', // 더 맑고 밝은 쿨 화이트 (탁함 제거)
    paperAlt: '#eceef6',
    ink: '#1a1c26',
    inkSoft: '#565a68',
    inkFaint: '#8f919e',
    line: 'rgba(26, 28, 38, 0.12)',
    lineSoft: 'rgba(26, 28, 38, 0.05)',
    c2: '#8b5cf6', // 바이올렛 글로우(GlassCursor)
    accent: '#4e5ad4', // 가독성용 솔리드 (라인·작은 텍스트)
    accentSoft: '#6d7cff', // 글레어·글로우
    accentDeep: '#3742a3',
  },
  // 3색 조화 그라데이션 — 포인트 요소에 사용
  gradient: 'linear-gradient(110deg, #5b6cff 0%, #8b5cf6 52%, #4d9bff 100%)',
  // 글래스 패널 — 더 투명하게(탁함↓), 블러는 적당히
  glass: {
    bg: 'rgba(255, 255, 255, 0.22)',
    tint: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.66)',
    blur: 'saturate(155%) blur(13px)',
  },
  // 배경 메시 — 3색 동일 계열(인디고·바이올렛·애저), 옅게(맑게). 하단도 같은 톤(애저)
  mesh:
    'radial-gradient(52vw 48vh at 8% 2%, rgba(91,108,255,0.18), transparent 60%), radial-gradient(46vw 44vh at 94% 12%, rgba(139,92,246,0.15), transparent 60%), radial-gradient(52vw 50vh at 68% 100%, rgba(77,155,255,0.15), transparent 62%)',
  font: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, "Cascadia Code", monospace',
  },
  ease: {
    soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
    smooth: 'cubic-bezier(0.32, 0.72, 0, 1)',
  },
} as const
