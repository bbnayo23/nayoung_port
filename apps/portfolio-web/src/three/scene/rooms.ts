export type Vec3 = [number, number, number]

export type RoomPalette = {
  /** 차원 안쪽 벽/배경 (어두운 코드 톤) */
  wall: string
  /** 차원 바닥 */
  floor: string
  /** 포인트/네온 강조색 (코드 키워드 색) */
  accent: string
  /** 차원 조명 색 */
  light: string
}

export type RoomConfig = {
  id: string
  /** 매핑되는 apps/* 서브 프로젝트 */
  app: string
  name: string
  /** 코드 차원 컨셉 한 줄 */
  concept: string
  /** 게이트에 표시되는 코드 라벨 */
  codeLabel: string
  /** 진입 경로가 되는 치명적 에러 (게이트 비콘에 표시 — 클릭해 다이브) */
  errorLabel: string
  tagline: string
  description: string
  tags: string[]
  /** 프로젝트로 이동하는 링크 (라우트/외부) */
  href?: string
  /** 포탈(에러 게이트) 중심 3D 좌표 — 공중에 비대칭으로 떠 있음 */
  doorPosition: Vec3
  palette: RoomPalette
}

/**
 * 코드 보이드에 3개의 프로젝트 **포탈**을 공중에 **비정형·비대칭**으로 띄운다.
 * 서로 다른 x/높이(y)/깊이(z) → 코드/에러 잡음과 확연히 구분되는 발광 게이트웨이.
 * 각 포탈은 apps/ 의 서브 프로젝트 차원으로 연결된다.
 */
export const rooms: RoomConfig[] = [
  {
    id: 'atelier',
    app: 'design-system',
    name: 'Design System',
    concept: 'component layer · 디자인 시스템 차원',
    codeLabel: "import { DesignSystem } from '@port/ds'",
    errorLabel: "ERR_MODULE_NOT_FOUND: '@port/ds'",
    tagline: 'vanilla-extract · Storybook · Turborepo',
    description:
      '타입 세이프 CSS-in-TypeScript 컴포넌트 라이브러리. 디자인 토큰부터 컴포넌트 API까지 전 계층을 설계하고 모노레포로 공유한다.',
    tags: ['vanilla-extract', 'Storybook', 'Turborepo'],
    href: '/design-system',
    doorPosition: [-5.6, 3.5, -5.0], // 좌측·높이 떠 있음
    palette: {
      wall: '#1a1330',
      floor: '#100b22',
      accent: '#c792ea',
      light: '#b07cf0',
    },
  },
  {
    id: 'control-room',
    app: 'dashboard',
    name: 'SIEM Dashboard',
    concept: 'data stream · 실시간 관제 차원',
    codeLabel: 'const events = await stream(siem)',
    errorLabel: 'Uncaught (in promise): stream(siem) timeout',
    tagline: 'Security Information & Event Management',
    description:
      '대규모 보안 이벤트를 실시간 시각화·분석하는 엔터프라이즈 대시보드. WebSocket 스트리밍, D3 커스텀 차트, 복합 필터링.',
    tags: ['React', 'D3.js', 'WebSocket', 'TypeScript'],
    href: '/dashboard',
    doorPosition: [1.2, 1.5, -6.0], // 중앙-우측·낮고 깊게
    palette: {
      wall: '#0c1730',
      floor: '#081024',
      accent: '#82aaff',
      light: '#5b8def',
    },
  },
  {
    id: 'gallery',
    app: 'icon-library',
    name: 'Icon Library',
    concept: 'vector space · 아이콘 전시 차원',
    codeLabel: "export * from './icons'",
    errorLabel: "TypeError: './icons' export is undefined",
    tagline: 'SVG icon set · showcase',
    description:
      '일관된 그리드와 스트로크 규칙으로 설계한 SVG 아이콘 세트. 쇼케이스에서 검색·복사·프리뷰를 제공한다.',
    tags: ['SVG', 'React', 'Design Tokens'],
    href: '/icons',
    doorPosition: [4.8, 4.4, -4.4], // 우측·가장 높고 가깝게
    palette: {
      wall: '#0d1a12',
      floor: '#091310',
      accent: '#c3e88d',
      light: '#9bd66a',
    },
  },
]
