# PageHeader — Hi-Fi Migration

## AFTER — `src/hifi/PageHeader`

- **Slots**: breadcrumbs · title · subtitle · tags · actions · divider
- `<header>` 시맨틱 · `<h1>` 자동
- 반응형: 좁은 화면에서 actions 를 kebab menu 로 접기
- 상태 칩 (ACTIVE · DRAFT · ARCHIVED) slot
- back-button slot (optional)

## MIGRATION

- 기존 유무: `src/components/PageHeader` · `src/layouts/PageWrapper.tsx` 와 역할 분리 확인
- PageWrapper = 레이아웃 scaffold · PageHeader = 헤더 전용 컴포넌트
- `breadcrumbs` prop 은 `Breadcrumbs` 컴포넌트 인스턴스 대신 items 배열만 받아 내부에서 렌더
- actions slot 우측 정렬 · gap 8px
