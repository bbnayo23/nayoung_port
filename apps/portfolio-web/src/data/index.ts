export const personal = {
  name: "박나영",
  nameEn: "Nayoung Park",
  email: "monello94@naver.com",
  github: "https://github.com/bbnayo23/nayoung_port",
  location: "Seoul, Korea",
  available: true,
  roles: ["Frontend Engineer", "UI/UX Developer", "Design Engineer"],
  bio: "SIEM 보안 관제 솔루션의 UI/UX를 개선하고 웹 퍼블리싱 & 프론트엔드 개발을 담당합니다.\n디자인과 개발이 같은 기준을 쓰도록 디자인 시스템을 구축하고 운영합니다.",
  // 포트폴리오 PDF — public/ 에 동일 파일명으로 배치하면 사이트 루트에서 서빙된다.
  resume: "/Nayoung-Park-Portfolio.pdf",
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

export type ProjectMedia = {
  kind: "before" | "after";
  caption: string;
  href?: string; // 클릭 시 열리는 링크 (라이브 화면 등)
  src?: string; // 스크린샷 경로 (있으면 이미지로 렌더, 없으면 링크 카드)
};

/** 케이스 스터디 — 결과물이 아니라 "무엇을 왜 어떻게 풀어 무엇이 바뀌었나"를 담는다. */
export type CaseStudy = {
  role?: string;
  problem: string[]; // Before · 문제
  process: string[]; // 설계·의사결정 과정
  outcome: string[]; // 성과
  media?: ProjectMedia[];
  links?: { label: string; href: string }[];
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  status: "shipped" | "in-progress" | "experiment";
  category: "product" | "system" | "experiment";
  link?: string;
  caseStudy?: CaseStudy;
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
    caseStudy: {
      problem: [
        "디자인 시스템이 없어 화면 단위로 디자인이 생성됐고, 스타일 코드와 개발 코드가 분리되지 않아 재사용이 어려웠다.",
        "어떤 컴포넌트가 존재하는지 파악할 방법이 없었다.",
        "디자이너 작업이 개발에 반영되지 않거나, 개발·수정 내용이 디자이너에게 공유되지 않아 디자인↔개발 간극이 컸다.",
        "솔루션마다 테마 수가 4개·2개·1개로 제각각이라(예: EXD는 mint/blue × basic/dark 4테마) UI가 파편화돼 있었다.",
      ],
      process: [
        "이전에 만든 common-ui 자산을 토대로 컴포넌트 44개·아이콘 376개를 표준화하고 Storybook 문서 40개로 가시화했다.",
        "색·타이포·스페이싱을 토큰 컨트랙트(contract)로 두고 솔루션별 테마를 주입 — 솔루션×테마를 자유롭게 전환하도록 설계해 파편화된 테마 체계를 하나로 흡수했다.",
        "AI(Claude)를 도구로 활용해 초기 시스템을 1개월 만에 구축하고, 리뷰를 받아 개선사항을 반영했다.",
      ],
      outcome: [
        "UI가 전면 정리되고, 어떤 컴포넌트가 있는지·무엇이 부족하고 개선해야 하는지 한눈에 파악 가능해졌다.",
        "컴포넌트를 미리 만들어 두고 각자 개발하다 배포 일정이 정해지면 완성본을 즉시 통합·확인 — 제품 적용 속도가 빨라졌다.",
        "스타일과 기능 개발을 병행할 수 있게 됐다.",
        "실제 4개 제품(ExD·XDR·SOAR·AirWorks)에 우선 적용하기로 결정, 현재 ONE UI 파일럿 진행 중 — 내년 컨퍼런스에서 신제품으로 공개 예정.",
      ],
      media: [
        {
          kind: "after",
          caption: "표준 컴포넌트로 구성한 대시보드",
          href: "/dashboard/",
        },
      ],
      links: [{ label: "Storybook 열기", href: "/design-system/" }],
    },
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
    caseStudy: {
      role: "UI/UX 기획 단계에서 개선사항 제안 · 퍼블리싱 100% · 컴포넌트 개발 · 부분 기능 개발 참여",
      problem: [
        "보안 관제 분석가는 대량의 로그를 빠르게 인지·판단해야 하지만, 복잡한 데이터가 화면에 과밀하게 노출되면 원하는 로그를 찾고 해석하기까지 인지 부하가 커진다.",
        "검색 조건 설정부터 결과 확인까지의 흐름을 더 매끄럽게 만들 필요가 있었다.",
      ],
      process: [
        "디자인 시스템 컴포넌트 20여 개를 소비해 화면을 구성 — 일관된 UI로 퍼블리싱하고 부족한 컴포넌트는 직접 개발했다.",
        "화면설계서(ExD_logsearch) 기반으로 검색 전 위젯 / 검색 후 결과 영역의 정보구조와 화면 흐름을 설계했다.",
        "AI 쿼리바(AND/OR/IN·필드 검색 파싱), 스트리밍 검색(실행·일시정지·완료 + 경과 타이머), 드래그 선택 히스토그램, 로그 상세 확장, 키워드 하이라이트, 컬럼 자동 맞춤, 검색 이력·템플릿을 구현했다.",
      ],
      outcome: [
        "정보구조·화면 흐름·시각적 일관성을 확보해 로그를 인지·조회하는 흐름을 개선했다.",
        "디자인 시스템이 실제 제품 화면에서 동작함을 입증하는 소비 예시가 됐다.",
      ],
      media: [
        {
          kind: "after",
          caption: "SIEM 로그검색 대시보드 (라이브)",
          href: "/dashboard/",
        },
      ],
      links: [{ label: "라이브 열기", href: "/dashboard/" }],
    },
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
