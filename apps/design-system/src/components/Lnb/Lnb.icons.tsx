// AiR Works LNB 하단 컨트롤 아이콘 — Figma "AW · Layout Shell" 프레임의 lucide 아이콘을 그대로 사용한다.
// (직접 그리지 않고 lucide-react 를 재노출) stroke 는 currentColor 라 CSS color 로 색을 제어한다.
export {
  PanelLeft as LnbCollapseIcon, // 접기/펼치기 토글 (rounded rect + 좌측 divider)
  Maximize2 as LnbFullscreenIcon, // 전체화면 (대각선 화살표)
} from 'lucide-react'
