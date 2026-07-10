// AiR Works GNB 아이콘 — 표준 아이콘은 lucide-react 를 그대로 import 해 사용한다.
// (직접 그리지 않고 라이브러리 아이콘을 재노출) stroke 는 currentColor 라 CSS color 로 색을 제어한다.
// 브랜드 로고 마크와 AI 스파클 그라디언트만 브랜드 고유색을 위해 별도 처리한다.

interface IconProps {
  size?: number
  className?: string
}

// ── 표준 lucide 아이콘 재노출 (호출부 호환을 위해 Gnb* 별칭 유지) ────────────────
export {
  ChevronDown as GnbChevronDownIcon,
  Download as GnbDownloadIcon,
  Bell as GnbBellIcon,
  Palette as GnbPaletteIcon,
  Globe as GnbGlobeIcon,
  User as GnbUserIcon,
  Home as GnbHomeIcon,
} from 'lucide-react'

// ── 브랜드 로고 마크 (24×24 픽셀 그리드 다이아몬드) ────────────────────────────
// 7×7 그리드: 다크(#2C302E) 바탕에 틸(#00A98E) 다이아몬드 패턴. (브랜드 고유 마크 — lucide 대체 없음)
const LOGO_CELL = 1.686
const LOGO_STEP = 2.386
const LOGO_START = 4
const LOGO_TEAL = new Set([
  '1-3',
  '2-2', '2-3', '2-4',
  '3-0', '3-1', '3-2', '3-3', '3-4', '3-5', '3-6',
  '4-2', '4-3', '4-4',
  '5-3',
])

export const GnbLogoMark = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {Array.from({ length: 7 }).flatMap((_, r) =>
      Array.from({ length: 7 }).map((_, c) => (
        <rect
          key={`${r}-${c}`}
          x={LOGO_START + c * LOGO_STEP}
          y={LOGO_START + r * LOGO_STEP}
          width={LOGO_CELL}
          height={LOGO_CELL}
          rx={0.4}
          fill={LOGO_TEAL.has(`${r}-${c}`) ? '#00A98E' : '#2C302E'}
        />
      )),
    )}
  </svg>
)

// ── AI Assistant 스파클 (20×20, 채워진 그라디언트) — 큰 스파클 + 우상단 작은 스파클 ──
export const GnbAiSparkleIcon = ({ size = 20, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M10 2.28125C11.5938 6.9375 13.0625 8.40625 17.7188 10C13.0625 11.5938 11.5938 13.0625 10 17.7188C8.40625 13.0625 6.9375 11.5938 2.28125 10C6.9375 8.40625 8.40625 6.9375 10 2.28125Z"
      fill="url(#gnbAiGrad0)"
    />
    <path
      d="M15.625 1.875C16.0625 4.125 16.5 4.5625 18.75 5C16.5 5.4375 16.0625 5.875 15.625 8.125C15.1875 5.875 14.75 5.4375 12.5 5C14.75 4.5625 15.1875 4.125 15.625 1.875Z"
      fill="url(#gnbAiGrad1)"
    />
    <defs>
      <linearGradient id="gnbAiGrad0" x1="3.75" y1="4.375" x2="16.25" y2="16.875" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4F9CF9" />
        <stop offset="0.5" stopColor="#7C5CFF" />
        <stop offset="1" stopColor="#B14FE6" />
      </linearGradient>
      <linearGradient id="gnbAiGrad1" x1="13.75" y1="1.875" x2="18.75" y2="6.875" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5BC8FF" />
        <stop offset="1" stopColor="#9A6CFF" />
      </linearGradient>
    </defs>
  </svg>
)
