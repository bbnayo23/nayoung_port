export const personal = {
  name: "박나영",
  nameEn: "Nayoung Park",
  email: "monello94@naver.com",
  github: "https://github.com/bbnayo23/nayoung_port",
  location: "Seoul, Korea",
  available: true,
  roles: ["Frontend Engineer", "UI/UX Developer", "Design Engineer"],
  bio: "SIEM 보안 관제 솔루션의 UI/UX를 개선하고 웹 퍼블리싱 & 프론트엔드 개발을 담당합니다.\n디자인과 개발이 같은 기준을 쓰도록 디자인 시스템을 구축하고 운영합니다.",
};

/**
 * ny — 이름(Nayoung)이자 신념의 약자.
 * N.Y. = Next Yourself.
 */
export const brand = {
  monogram: "ny",
  expansion: "Next Yourself",
  manifesto: ["Next Yourself.", "Stay Young.", "Keep Challenging."],
} as const;

export type CareerItem = {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  highlights: { title: string; detail: string }[];
};

export const career: CareerItem[] = [
  {
    company: "IGLOO Corporation",
    role: "Frontend Engineer",
    period: "2023 — Present",
    description:
      "SIEM 보안 관제 솔루션의 UI/UX 개선과 웹 퍼블리싱, 프론트엔드 개발, 디자인 시스템 구축·운영을 담당",
    tags: [
      "React",
      "TypeScript",
      "styled-components",
      "vanilla-extract",
      "Figma",
    ],
    highlights: [
      {
        title: "Security Dashboard UI/UX",
        detail: "복잡한 보안 데이터의 정보구조 개선 · 사용성·일관성 향상",
      },
      {
        title: "Design System",
        detail: "공통 컴포넌트 표준화 · 디자인-개발 협업 체계 구축",
      },
      {
        title: "Web Publishing",
        detail: "React 기반 화면 퍼블리싱 · 재사용·유지보수 구조 설계",
      },
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  status: "shipped" | "in-progress" | "experiment";
  category: "product" | "system" | "experiment";
  link?: string;
};

export const projects: Project[] = [
  {
    id: "design-system",
    name: "Design System",
    tagline: "공통 컴포넌트 표준화 & 운영",
    description:
      "버튼·입력폼·테이블·모달·탭 등 UI 컴포넌트를 표준화한 디자인 시스템. 디자인과 개발이 동일한 기준으로 사용할 수 있는 체계를 구축해 UI 일관성을 높이고 유지보수 비용을 줄임.",
    tags: ["vanilla-extract", "TypeScript", "Storybook", "Figma"],
    status: "in-progress",
    category: "system",
    link: "/design-system/",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    tagline: "SIEM 보안 관제 대시보드",
    description:
      "디자인 시스템을 소비해 구성한 SIEM 로그검색 대시보드. 복잡한 보안 데이터를 빠르게 인지하도록 정보구조를 개선하고, 화면 흐름·사용성·시각적 일관성을 확보.",
    tags: ["React", "TypeScript", "vanilla-extract", "UI/UX"],
    status: "shipped",
    category: "product",
    link: "/dashboard/",
  },
  {
    id: "icon-library",
    name: "Icon Library",
    tagline: "SVG 아이콘 세트 · 쇼케이스",
    description:
      "일관된 그리드와 스트로크 규칙으로 설계한 SVG 아이콘 라이브러리. currentColor 기반으로 색을 제어하고, 검색·복사·프리뷰를 제공하는 쇼케이스로 배포.",
    tags: ["SVG", "React", "styled-components"],
    status: "shipped",
    category: "system",
    link: "/icons/",
  },
  {
    id: "frontend-architecture",
    name: "Frontend Architecture",
    tagline: "재사용성 · 유지보수성 · 확장성",
    description:
      "컴포넌트 재사용성과 유지보수성을 고려한 프론트엔드 구조 설계. 서비스 확장성을 염두에 두고 개발 생산성을 높이는 개발 환경을 구축해 디자인-개발 협업 효율을 개선.",
    tags: ["React", "TypeScript", "Architecture"],
    status: "in-progress",
    category: "system",
  },
];

export const playgroundItems = [
  {
    id: "design-tokens",
    title: "Design Token Lab",
    description:
      "vanilla-extract 기반 디자인 토큰 구조와 실시간 테마 전환 실험. 컬러·타이포·스페이싱 토큰 체계와 컴포넌트 반응성 검증.",
    tags: ["vanilla-extract", "Design Tokens"],
    status: "in-progress" as const,
  },
  {
    id: "component-playground",
    title: "Component Playground",
    description:
      "Storybook으로 공통 컴포넌트의 variant와 상태를 문서화하고 인터랙션을 검증하는 실험. 디자인-개발 협업 기준 정리.",
    tags: ["Storybook", "React", "TypeScript"],
    status: "in-progress" as const,
  },
  {
    id: "motion-ui",
    title: "Motion & Micro-interaction",
    description:
      "사용성을 해치지 않는 선에서 화면 전환과 마이크로 인터랙션을 다듬는 CSS 모션 실험.",
    tags: ["CSS Animation", "UI/UX"],
    status: "experiment" as const,
  },
];
