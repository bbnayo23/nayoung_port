/**
 * 이전 이력(2018 — 2022) 포트폴리오.
 *
 * 구버전 포트폴리오 사이트(Bootstrap 템플릿)의 Portfolio 섹션과 상세 페이지에서
 * 내용만 추출해 데이터로 옮긴 것. 이미지는 `public/legacy/` 에서 서빙된다.
 */

export type LegacyFilter = "pub" | "front" | "web";

export type LegacyProject = {
  id: string;
  title: string;
  /** 카드에 노출되는 담당 역할 요약 */
  role: string;
  filters: LegacyFilter[];
  /** 썸네일 · 상세 이미지 (public 루트 기준 절대경로) */
  thumb: string;
  images: string[];
  client: string;
  period: string;
  /** 접속 가능한 실서비스 주소가 있을 때만 */
  url?: string;
  /** 참여도 · 담당 범위 */
  participation: string;
  points: string[];
};

export const legacyFilters: { id: LegacyFilter | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pub", label: "Publishing" },
  { id: "front", label: "Front-end" },
  { id: "web", label: "Web Design" },
];

const img = (name: string) => `/legacy/${name}.jpg`;

export const legacyProjects: LegacyProject[] = [
  {
    id: "bigdata-eng",
    title: "한국생산기술연구원 — 빅데이터 플랫폼",
    role: "Publishing & Front-end",
    filters: ["pub", "front", "web"],
    thumb: img("portfolio-1"),
    images: [
      img("portfolio-details-1-1"),
      img("portfolio-details-1-2"),
      img("portfolio-details-1-3"),
    ],
    client: "한국생산기술연구원",
    period: "2022.02 — 2022.06",
    url: "https://bigdata-eng.com",
    participation: "100% · 파견업무 수행",
    points: [
      "공공기관 웹사이트 특성을 고려해 서비스 영역 중심으로 접근성·사용성을 높인 UI 디자인 구성",
      "메인 페이지에 포탈 검색 기능·데이터 수집현황·주요 메뉴를 배치해 업무 흐름을 단축",
    ],
  },
  {
    id: "kcmf",
    title: "시청자미디어재단",
    role: "Publishing",
    filters: ["pub"],
    thumb: img("portfolio-2"),
    images: [
      img("portfolio-details-2-1"),
      img("portfolio-details-2-2"),
      img("portfolio-details-2-3"),
    ],
    client: "시청자미디어재단",
    period: "2021.01 — 2022.12",
    url: "https://kcmf.or.kr/cms/index.php",
    participation: "유지보수 담당 (퍼블리싱 영역)",
    points: [
      "웹표준·웹접근성에 맞게 수정·보완하며 유지보수 관리 진행",
      "개발자와 협업해 페이지 추가 및 기존 페이지 리뉴얼 (일반형 → 반응형)",
    ],
  },
  {
    id: "dapa-cost",
    title: "방위사업청 — 원가산정시스템",
    role: "Publishing & Web Design",
    filters: ["pub", "web"],
    thumb: img("portfolio-3"),
    images: [
      img("portfolio-details-3-1"),
      img("portfolio-details-3-2"),
      img("portfolio-details-3-3"),
    ],
    client: "방위사업청 — 원가산정시스템 고도화 사업",
    period: "2022.02 — 2022.04",
    participation: "디자인 고도화 · 내부 시스템(접속 불가)",
    points: [
      "웹스퀘어(WebSquare) 기반 웹디자인·퍼블리싱 담당 — 화면 구성 및 컬러 체계 변경",
      "웹접근성·웹표준 수정 진행 (감리 대응)",
    ],
  },
  {
    id: "secumaster",
    title: "한국정보보안원 — 시큐마스터",
    role: "Publishing & Web Design & Front-end",
    filters: ["pub", "front", "web"],
    thumb: img("portfolio-4"),
    images: [
      img("portfolio-details-4-1"),
      img("portfolio-details-4-2"),
      img("portfolio-details-4-3"),
    ],
    client: "정보보안 교육 — 시큐마스터",
    period: "2021.03 — 2021.04",
    url: "http://korsecurity.kr",
    participation: "100% · 웹기획 · 웹디자인 · 퍼블리싱",
    points: [
      "그누보드(PHP) 기반 · 관리자가 온라인 강의를 게시판 형태로 업로드·수정하도록 구성",
      "기존 정보보안 이미지를 탈피해 일러스트 중심의 친근하고 부드러운 UI 디자인 구성",
    ],
  },
  {
    id: "bootsky",
    title: "반려동물 장례식장 — 하늘소풍",
    role: "Publishing & Web Design & Front-end",
    filters: ["pub", "front", "web"],
    thumb: img("portfolio-5"),
    images: [
      img("portfolio-details-5-1"),
      img("portfolio-details-5-2"),
      img("portfolio-details-5-3"),
    ],
    client: "반려동물 장례식장 — 하늘소풍",
    period: "2022.06 — 2022.09",
    participation: "100% · 웹기획 · 웹디자인 · 퍼블리싱 · 프론트엔드",
    points: [
      "부트스트랩 기반으로 기존 홈페이지와 겹치지 않는 세련되고 깔끔한 톤으로 구성",
      "예약하기 시스템과 NTG 화면 구성 구현",
    ],
  },
  {
    id: "belleville",
    title: "한국국제크리스천스쿨 — 벨빌캠퍼스",
    role: "Publishing & Web Design",
    filters: ["pub", "web"],
    thumb: img("portfolio-6"),
    images: [
      img("portfolio-details-6-1"),
      img("portfolio-details-6-2"),
      img("portfolio-details-6-3"),
    ],
    client: "한국국제크리스천스쿨 — 벨빌캠퍼스",
    period: "2020.05 — 2020.08",
    url: "http://bellevillecs.org",
    participation: "100% · 웹기획 · 웹디자인 · 퍼블리싱 · 프론트엔드",
    points: [
      "그누보드 기반 영문 홈페이지 제작",
      "서초캠퍼스 · 미국 벨빌캠퍼스 2개 사이트 작업 진행",
    ],
  },
  {
    id: "steelocs",
    title: "스틸옥스",
    role: "Publishing & Web Design",
    filters: ["pub", "web"],
    thumb: img("portfolio-7"),
    images: [
      img("portfolio-details-7-1"),
      img("portfolio-details-7-2"),
      img("portfolio-details-7-3"),
    ],
    client: "스틸옥스",
    period: "2018.11 — 2018.12",
    url: "http://steelocs.com",
    participation: "100% · 웹기획 · 웹디자인 · 퍼블리싱 · 프론트엔드",
    points: ["기업소개 홈페이지 신규 제작"],
  },
  {
    id: "mscl",
    title: "MSCL",
    role: "Publishing & Web Design & Front-end",
    filters: ["pub", "front", "web"],
    thumb: img("portfolio-8"),
    images: [
      img("portfolio-details-8-1"),
      img("portfolio-details-8-2"),
      img("portfolio-details-8-3"),
    ],
    client: "MSCL",
    period: "2020.03 — 2020.05",
    url: "http://www.gateeye.com",
    participation: "100% · 웹디자인 · 퍼블리싱 · 프론트엔드",
    points: [
      "그누보드 기반 기존 홈페이지 리뉴얼 진행",
      "제품 소개 구성 및 상세페이지 제작",
    ],
  },
  {
    id: "maeilbolt",
    title: "매일볼트",
    role: "Publishing & Front-end",
    filters: ["pub", "front"],
    thumb: img("portfolio-9"),
    images: [
      img("portfolio-details-9-1"),
      img("portfolio-details-9-2"),
      img("portfolio-details-9-3"),
    ],
    client: "매일볼트",
    period: "2018.12 — 2019.03",
    url: "http://maeilbolt.com",
    participation: "100% · 퍼블리싱 · 프론트엔드",
    points: [
      "영카트5 쇼핑몰 빌더 기반 구축",
      "볼트 종류를 선택하는 주문 폼 구성",
    ],
  },
  {
    id: "mastersink",
    title: "마스터싱크",
    role: "Publishing & Front-end",
    filters: ["pub", "front"],
    thumb: img("portfolio-10"),
    images: [
      img("portfolio-details-10-1"),
      img("portfolio-details-10-2"),
      img("portfolio-details-10-3"),
    ],
    client: "마스터싱크",
    period: "2018.02 — 2018.04",
    url: "http://mastersink.co.kr",
    participation: "100% · 퍼블리싱 · 프론트엔드",
    points: [
      "영카트5 쇼핑몰 빌더 기반 구축",
      "제품 소개 및 관리자 페이지에서 제품 등록이 가능하도록 구현",
    ],
  },
  {
    id: "bigdata-logo",
    title: "한국생산기술연구원 — 빅데이터 플랫폼 로고",
    role: "Web Design",
    filters: ["web"],
    thumb: img("portfolio-11"),
    images: [
      img("portfolio-details-11-1"),
      img("portfolio-details-11-2"),
      img("portfolio-details-11-3"),
    ],
    client: "한국생산기술연구원 — 빅데이터 플랫폼",
    period: "2022.05 — 2022.06",
    url: "https://bigdata-eng.com",
    participation: "100% · 로고 디자인",
    points: [
      "공공기관 서비스 성격에 맞춰 접근성·사용성을 고려한 아이덴티티 구성",
      "부드러운 이미지 요청에 맞춰 빅데이터와 어울리는 형태로 설계",
    ],
  },
  {
    id: "secumaster-logo",
    title: "시큐마스터 로고",
    role: "Web Design",
    filters: ["web"],
    thumb: img("portfolio-12"),
    images: [
      img("portfolio-details-12-1"),
      img("portfolio-details-12-2"),
      img("portfolio-details-12-3"),
    ],
    client: "정보보안 교육 — 시큐마스터",
    period: "2021.03 — 2021.04",
    url: "http://korsecurity.kr",
    participation: "100% · 로고 디자인",
    points: [
      "정보보안·교육과 어울리는 이미지로 방향 설정",
      "학사모 · 방패 · 자물쇠 형태를 3D 입체로 구성해 역동적인 로고 표현",
    ],
  },
];
