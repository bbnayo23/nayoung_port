// AiR Works GNB 아이콘 — 표준 아이콘은 lucide-react 를 그대로 import 해 사용한다.
// (직접 그리지 않고 라이브러리 아이콘을 재노출) stroke 는 currentColor 라 CSS color 로 색을 제어한다.
// 브랜드 로고 마크와 AI 스파클 그라디언트만 브랜드 고유색을 위해 별도 처리한다.
import { Sparkles } from 'lucide-react'

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

// ── AI Assistant 스파클 — lucide Sparkles 에 브랜드 그라디언트 stroke 적용 ────────
export const GnbAiSparkleIcon = ({ size = 20, className }: IconProps) => (
  <Sparkles size={size} className={className} stroke="url(#gnbAiGrad)">
    <defs>
      <linearGradient id="gnbAiGrad" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#4F9CF9" />
        <stop offset="0.5" stopColor="#7C5CFF" />
        <stop offset="1" stopColor="#B14FE6" />
      </linearGradient>
    </defs>
  </Sparkles>
)
