export const personal = {
  name: '박나영',
  nameEn: 'Nayoung Park',
  email: 'nayeong.park@igloo.co.kr',
  github: 'https://github.com/nayoung',
  location: 'Seoul, Korea',
  available: true,
  roles: ['Design System Engineer', 'Frontend Engineer', 'AI Engineer'],
  bio: 'UI 인프라와 디자인 시스템을 설계합니다.\nAI 기반 개발 도구와 코드 생성 실험을 탐구합니다.',
}

export const techStack = [
  { name: 'TypeScript', type: 'lang' },
  { name: 'React 19', type: 'framework' },
  { name: 'vanilla-extract', type: 'styling' },
  { name: 'Turborepo', type: 'tooling' },
  { name: 'Vite 8', type: 'tooling' },
  { name: 'Claude API', type: 'ai' },
  { name: 'Storybook', type: 'tooling' },
  { name: 'pnpm', type: 'tooling' },
] as const

export type CareerItem = {
  company: string
  role: string
  period: string
  description: string
  tags: string[]
  highlights: { title: string; detail: string }[]
}

export const career: CareerItem[] = [
  {
    company: 'IGLOO Corporation',
    role: 'Frontend Engineer',
    period: '2023 — Present',
    description: 'SIEM 플랫폼 프론트엔드 개발 및 내부 디자인 시스템 아키텍처 설계',
    tags: ['TypeScript', 'React', 'Design System', 'vanilla-extract'],
    highlights: [
      { title: 'SIEM Dashboard', detail: '보안 이벤트 실시간 시각화 대시보드 · Lead Frontend' },
      { title: 'AI Assistant', detail: 'Claude API 기반 사내 AI 어시스턴트 구축' },
      { title: 'Design System', detail: '컴포넌트 라이브러리 설계 · Storybook 문서화' },
    ],
  },
]

export type Project = {
  id: string
  name: string
  tagline: string
  description: string
  tags: string[]
  status: 'shipped' | 'in-progress' | 'experiment'
  category: 'product' | 'system' | 'experiment'
  link?: string
}

export const projects: Project[] = [
  {
    id: 'siem-dashboard',
    name: 'SIEM Dashboard',
    tagline: 'Security Information & Event Management',
    description:
      '대규모 보안 이벤트를 실시간으로 시각화하고 분석하는 엔터프라이즈 대시보드. WebSocket 기반 스트리밍, D3.js 커스텀 차트, 복잡한 필터링 시스템 구현.',
    tags: ['TypeScript', 'React', 'D3.js', 'WebSocket'],
    status: 'shipped',
    category: 'product',
  },
  {
    id: 'ai-assistant',
    name: 'AI Assistant',
    tagline: 'Claude API Powered Interface',
    description:
      'Claude API를 활용한 사내 AI 어시스턴트. 자연어로 보안 로그 쿼리, 이벤트 요약, 대응 가이드 제공. Server-sent events 기반 스트리밍 응답 구현.',
    tags: ['Claude API', 'React 19', 'TypeScript', 'SSE'],
    status: 'shipped',
    category: 'product',
  },
  {
    id: 'design-system',
    name: 'Design System',
    tagline: 'vanilla-extract · Storybook · Turborepo',
    description:
      '타입 세이프 CSS-in-TypeScript 기반 컴포넌트 라이브러리. 디자인 토큰부터 컴포넌트 API까지 전 계층 설계. Monorepo 구조로 다중 앱에서 공유.',
    tags: ['vanilla-extract', 'TypeScript', 'Storybook', 'Turborepo'],
    status: 'in-progress',
    category: 'system',
    link: '/design-system',
  },
  {
    id: 'claude-experiments',
    name: 'Claude Design Experiments',
    tagline: 'AI-driven UI generation',
    description:
      'Claude Code와 Claude API를 활용한 UI 자동 생성, 테마 실험, 컴포넌트 코드 생성 케이스 컬렉션.',
    tags: ['Claude API', 'Claude Code', 'React', 'vanilla-extract'],
    status: 'experiment',
    category: 'experiment',
  },
]

export const playgroundItems = [
  {
    id: 'claude-ui-gen',
    title: 'Claude UI Generation',
    description:
      'Claude API로 React 컴포넌트 코드 자동 생성 실험. vanilla-extract 스타일 포함한 완성 코드 출력.',
    tags: ['Claude API', 'Code Generation'],
    status: 'experiment' as const,
  },
  {
    id: 'theme-test',
    title: 'Theme Test Lab',
    description:
      'CSS 변수 기반 실시간 테마 전환 실험. Design Token 구조와 컴포넌트 반응성 검증.',
    tags: ['CSS Variables', 'vanilla-extract', 'Tokens'],
    status: 'in-progress' as const,
  },
  {
    id: 'ai-motion',
    title: 'AI Motion Design',
    description: 'Claude로 CSS 애니메이션 패턴 생성 및 최적화 실험. Web Vitals 영향 측정 포함.',
    tags: ['CSS Animation', 'Claude API', 'Web Vitals'],
    status: 'experiment' as const,
  },
]
