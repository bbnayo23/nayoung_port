# SPiDER ExD → SOC 콘솔 · 로그검색 UI/UX 개선 가이드

레거시 SPiDER ExD는 진한 브랜드 그린이 화면 전체를 지배하고, 검색조건과 전역 액션이 한 줄에 뒤섞이며, 내비게이션을 상단 드롭다운에만 의존해 정보량이 많고 위계가 흐릿한 관제 화면이었습니다. 이번 개선은 이 화면을 디자인 시스템(PageHeader·Lnb·Gnb·Badge·시맨틱 토큰 컨트랙트) 기반으로 다시 설계해, 정보를 명확한 수직 계층으로 나누고 색·내비게이션·타이틀 정렬을 표준화한 SOC 콘솔로 전환한 작업입니다. 아래는 발표 시 화면을 하나씩 짚어가며 설명할 수 있도록 5개 차원으로 정리한 가이드입니다.

## 1. 정보 위계 · 레이아웃

한 줄에 뒤섞여 있던 타이틀·전역 액션·검색조건을 [타이틀 헤더 → 조건 툴바 → AI 쿼리바 → 히스토그램 → 결과 테이블]의 명확한 수직 계층으로 재구조화하고, 카드/구분선 그룹핑과 검색 전·후 단계적 노출로 과밀한 인지부하를 낮췄습니다.

**타이틀 헤더존 확립과 전역 액션의 분리**
- Before: '검색 로그검색'이 작은 브레드크럼 텍스트로 조건 툴바 바로 위에 붙어 있고, 검색기록·템플릿·템플릿 저장·오브젝트 추가 같은 화면 전역 액션이 로그유형·로그소스 등 검색조건 드롭다운과 같은 줄에 나란히 놓여, 무엇이 페이지 액션이고 무엇이 검색조건인지 구분되지 않았습니다.
- After: '로그 검색'을 18px bold 타이틀로 독립된 헤더존에 세우고 그 아래 Divider로 본문과 경계를 그었습니다. 전역 액션은 타이틀과 같은 선상의 우측 끝으로 모아, 페이지 레벨 액션과 검색조건을 역할별로 분리했습니다.
- 어떻게: design-system의 PageHeader 컴포넌트를 사용했습니다. pageHeaderRow가 타이틀 그룹과 actions 슬롯을 한 행에 두고 pageHeaderActions에 marginLeft:'auto'로 액션을 우측 정렬하며, divider prop으로 헤더존을 닫습니다. LogSearch.tsx의 PageHeader에 title='로그 검색', divider, actions로 검색기록/템플릿/템플릿 저장/경보조건 추가 버튼을 구성했습니다.

**검색조건 툴바의 단일 책임화와 카드 그룹핑**
- Before: 조건 드롭다운(로그유형·로그소스·수집시간·정렬기준·추가정보)과 액션 버튼이 뒤섞인 채 배경 위에 평면적으로 나열돼, 조건 영역이 하나의 그룹으로 읽히지 않고 경계가 모호했습니다.
- After: 툴바에는 로그유형·로그소스·검색시간·정렬기준 드롭다운과 히스토그램 토글만 남겨 '검색조건 지정'이라는 단일 역할로 정리하고, 툴바 전체를 옅은 면·테두리·라운드를 가진 하나의 카드로 묶어 조건 그룹임을 명확히 했습니다.
- 어떻게: LogSearch.tsx의 toolbar/toolbarLeft div에 Dropdown 4개와 Toggle을 담고, LogSearch.css.ts의 toolbar 스타일에 surface 배경·1px border·radius.md·padding·gap을 주어 카드 경계를 부여했으며, 액션 버튼은 툴바에서 제거해 헤더로 이관했습니다.

**검색 전·후 단계적 노출(progressive disclosure)**
- Before: 결과 화면에서 차트와 1,000건 규모의 대형 테이블이 항상 펼쳐져 있고, 초기 화면에서는 검색기록·템플릿 카드가 긴 목록으로 이어져 진입 시점부터 정보량이 과다했습니다.
- After: 검색 전에는 히스토그램·결과 테이블을 감추고 검색기록·템플릿만 좌우 2열 카드로 보여 '무엇을 검색할지'에 집중시키고, 검색을 실행하면 그 자리를 히스토그램+결과 영역이 대체하도록 화면 상태를 전환했습니다.
- 어떻게: LogSearch.tsx에서 phase(idle·running·paused·done·error) 상태와 hasResults 플래그로 조건부 렌더링합니다. 결과가 없으면 widgetsRow(auto-fit minmax(420px,1fr))로 QueryListCard 2열을, 있으면 resultArea(히스토그램+그리드)를 렌더하고, 헤더의 검색기록·템플릿 Popover도 hasResults일 때만 노출합니다.

**결과 테이블 컬럼 다이어트 + 상세행으로의 위계 이관**
- Before: 결과 테이블이 근거이벤트·경보유형·위험도·경보그룹·경보이름·지속시간·로그소스IP·출발지IP/포트·목적지IP/포트 등 12개 안팎의 컬럼을 한 화면에 펼쳐, 가로로 과밀하고 핵심 정보가 묻혔습니다.
- After: 테이블을 원본 로그(raw)·수집시간·출발지 IP·출발지 국가·도착지 포트의 핵심 5개 컬럼으로 압축하고, 나머지 이벤트 ID·로그유형·도착지 IP·사용자·메시지 등은 행을 펼쳤을 때 나타나는 상세 그리드로 내려 1차/2차 정보 위계를 나눴습니다.
- 어떻게: LogSearch.tsx의 Table.Head에 HeaderCell 5개만 정의하고, 확장 가능한 Table.Row를 펼치면 detailGrid(auto-fill minmax(220px,1fr))로 Field들을 배치합니다. 위험도는 severity Badge, 위협 IP는 threatTag로 시각 강조해 스캔 효율을 높였습니다.

**저장 항목(검색기록·템플릿) 정보 밀도 완화**
- Before: 카드마다 로그유형·로그소스·범위·정렬기준·추가조건(긴 쿼리 문자열)을 라벨과 함께 5~6줄로 나열해, 항목 간 구분이 어렵고 회색 텍스트 벽처럼 보였습니다.
- After: 각 항목을 '제목 + 요약 메타(유형·정렬) 한 줄 + 쿼리 한 줄'의 3단 구조로 압축하고, 쿼리는 구문 하이라이트로 표시해 항목을 한눈에 훑고 선택할 수 있게 했습니다.
- 어떻게: LogSearch.tsx의 toQueryItems가 SavedQuery를 QueryListItem으로 변환하며 meta를 '유형 · 정렬' 한 줄로만 구성하고 query를 별도 필드로 넘깁니다. 이를 design-system의 QueryListCard로 렌더하며, 카드 상단에는 icon·title·건수·'전체' 액션과 필터 입력을 둬 목록도 헤더/본문 위계를 갖습니다.

## 2. 색상 · 컬러 시스템

화면을 지배하던 진한 브랜드 그린을 걷어내고, 차가운 뉴트럴 배경 위에 절제된 인디고 액센트와 5단계 심각도 팔레트를 디자인 토큰으로 재정의해, 장시간 관제에 편하면서 위협 신호가 또렷하게 읽히는 컬러 시스템으로 전환했습니다.

**브랜드 그린 지배 화면 → 뉴트럴 관제 캔버스**
- Before: 상단 헤더·글로벌 네비게이션·검색 버튼은 물론 검색기록 선택 항목까지 진한 포화 그린으로 반전 처리되어 화면 전체를 강한 초록이 지배했고, 오래 응시하는 관제 화면에서 눈의 피로를 유발했습니다.
- After: 차가운 회청색 배경 위에 순백 surface를 올린 저자극 뉴트럴 캔버스로 바꾸고, 브랜드 색은 사이드바 선택 항목과 검색 버튼 등 최소 지점에만 쓰는 액센트로 물러났습니다.
- 어떻게: apps/design-system/src/theme/xdr.css.ts에서 background #f0f3f6·surface #ffffff·surfaceHover #f0f2f4·text #343a40·header.background #ffffff로 뉴트럴 계조를 정의하고, 브랜드는 페리윙클 인디고 primary #7187ff로 지정했습니다. 컴포넌트는 contract.css.ts의 시맨틱 토큰만 참조합니다.

**브랜드색과 심각도색의 충돌 제거 (Low를 그린→블루로)**
- Before: 브랜드가 그린인데 탐지경보 테이블의 심각도 LOW 배지도 초록(브랜드와 사실상 동일 계열)이라, '브랜드/정상'을 뜻하는 초록과 '위험도 낮음' 신호가 시각적으로 뒤섞였습니다.
- After: 브랜드를 인디고로 옮기고 심각도는 완전히 분리된 별도 팔레트로 배정해 Low를 파랑으로 바꿔, 심각도 색이 곧 위험도 신호로만 읽히게 했습니다.
- 어떻게: apps/dashboard/src/data/logs.ts의 severityColor 매핑에서 critical→red·high→orange·medium→yellow·low→blue·info→gray로 정의하고, 각 색은 Badge.tokens.ts의 고정 팔레트(예: blue base #3B82F6)로 해석됩니다. 브랜드 인디고(#7187ff)와 심각도 blue(#3B82F6)를 색상·채도에서 분리했습니다.

**3단계 → 5단계 심각도 위계 표준화**
- Before: 레거시 테이블은 HIGH / MEDIUM / LOW 세 단계만 제공해 최상위 긴급도(Critical)와 정보성 이벤트(Info)를 구분할 색 체계가 없었습니다.
- After: Critical / High / Medium / Low / Info 5단계 위계로 확장해 각 단계가 고유 색으로 즉시 구분되고, 검색 결과 테이블에서 Critical(적색)·Info(회색)까지 한눈에 읽힙니다.
- 어떻게: logs.ts의 Severity 타입과 severityLabel·severityColor가 5단계를 정의하고, LogSearch.tsx에서 Badge variant="status-round" color={severityColor[l.severity]}로 렌더링합니다.

**고채도 채움 배지 → 저채도 status 틴트 배지**
- Before: 배지는 HIGH 빨강·MEDIUM 주황·LOW 초록을 진한 채움(solid fill)으로 표시해, 결과 테이블에서 여러 강한 색 블록이 서로 경쟁하며 시선을 분산시켰습니다.
- After: 동일 색상군을 유지하되 연한 배경 틴트 + 진한 텍스트의 status-round 배지로 바꿔, 채도를 낮추면서 텍스트 대비로 가독성을 확보했습니다. 다수 행이 쌓여도 배경 소음이 줄어듭니다.
- 어떻게: Badge.css.ts의 status-round variant가 --color-badge-status-{color}-text/-bg를 사용하고, Badge.tokens.ts의 status 배열이 텍스트/배경 쌍을 정의합니다(예: red ['#ad0000','#fc9dbb'], yellow ['#935d06','#fee39c']). 이 표시 전용 팔레트는 테마와 무관하게 고정됩니다.

**위협 강조 전용 컬러 체계 신설**
- Before: 출발지 IP를 '***'로 마스킹만 했을 뿐, 어떤 IP가 위협 인텔리전스상 위험한지 색으로 구분하는 시각 신호가 없었습니다.
- After: 위협 IP는 적색 볼드 텍스트로 강조하고 그 옆에 적색 '위협' 태그를 붙여, 심각도 배지와는 별개의 위협 강조 레이어로 분리했습니다. 출발지 국가 열의 CN/RU 등과 함께 위험 출처가 즉시 눈에 들어옵니다.
- 어떻게: logs.ts의 threatIp 필드로 대상을 지정하고, LogSearch.css.ts의 ipThreat(color: vars.color.error, bold)와 threatTag(background: error, color: textInverse)가 위협 강조색을 시맨틱 error 토큰으로 렌더링합니다.

**하드코딩 단일 테마 → 토큰 기반 일관성 + 다크 지원**
- Before: 브랜드 그린이 화면 곳곳에 개별 지정된 형태로 라이트 단일 화면만 존재하고, 색 정의가 흩어져 일관성·확장성이 낮았습니다.
- After: 색을 시맨틱 토큰 컨트랙트로 중앙화해 컴포넌트가 값 대신 토큰만 참조하도록 하고, 동일 컨트랙트를 라이트/다크 두 테마로 채워 야간 관제용 다크 모드까지 지원합니다.
- 어떻게: contract.css.ts의 createGlobalThemeContract가 vars.color.*(primary·background·surface·error 등) 이름만 정의하고, xdr.css.ts(라이트)와 xdr-dark.css.ts(다크, :root.dark)가 각각 값을 채웁니다. 다크에서는 background #15171c·surface #1d2026·error #ff6b6b처럼 슬레이트 계조로 재구성되며, 브랜드 인디고 #7187ff는 두 테마 공통입니다.

## 3. GNB (전역 네비게이션 바)

상단바에 섞여 있던 섹션 내비게이션과 전역 기능을 분리해, GNB를 전역 기능(솔루션 전환·AI·다운로드·알림·테마·언어·사용자·홈) 전용 밴드로 재정의하고 각 기능을 라벨/아이콘 버튼과 목적별 표면(팝오버·사이드패널)으로 정리했습니다.

**상단바에서 섹션 내비게이션을 걷어내고 전역 기능 전용 밴드로 재정의**
- Before: 상단 초록 밴드는 '보안관제·검색·대시보드·인텔리전스·통계/모니터링' 5개 최상위 섹션 메뉴가 폭을 대부분 차지하고, 정작 전역 기능(테마·사용자·설정)은 우측 끝에 라벨 없는 작은 아이콘 4개로 눌려 있어 내비게이션과 전역 도구가 한 줄에 뒤섞였습니다.
- After: GNB는 좌측 브랜드와 우측 전역 액션만 담는 전용 밴드가 되었고, 섹션 내비게이션(대시보드·워크스페이스·로그검색·경보·인시던트·모니터링·위협 인텔리전스·설정)은 좌측 LNB로 완전히 이관되어 '전역 기능은 상단, 내비게이션은 좌측'으로 축이 분리되었습니다.
- 어떻게: Gnb.tsx는 gnbInner 안에 좌측 gnbBrand와 우측 gnbActions 두 영역만 렌더하며 섹션 메뉴 항목 자체가 없습니다. LogSearch.tsx가 레이아웃 셸의 gnb 슬롯에는 Gnb를, 별도 lnb 슬롯에는 menuGroup을 주입한 Lnb를 배치해 두 축을 구조적으로 분리했습니다.

**좌측 브랜드를 솔루션(앱) 전환 진입점으로 승격**
- Before: 좌상단은 SPiDER ExD 로고와 용도가 드러나지 않는 9-dot 그리드 아이콘뿐이어서, 동일 제품군 내 다른 솔루션으로 이동하는 경로가 상단바에 명시되지 않았습니다.
- After: 브랜드가 'SOC Console ▾' 형태로 셰브론과 함께 클릭 가능한 진입점이 되고, 클릭 시 spider 제품군(ExD·IUMS·SOAR·더 보기)을 타일 그리드로 보여주는 앱 전환 팝오버가 열립니다.
- 어떻게: Gnb.tsx의 gnbBrand 버튼에 showBrandDropdown일 때 gnbBrandChevron을 붙이고 onBrandClick 콜백을 노출합니다. LogSearch.tsx가 이를 SolutionSwitcher 오픈에 연결하고, SolutionSwitcher.tsx는 GnbDropdown을 align="left"·width=280으로 브랜드 버튼에 앵커해 타일 목록(현재 앱은 tileActive·aria-current)으로 렌더합니다.

**전역 액션을 균일 아이콘 버튼 그룹으로 정리하고 AI Assistant에 위계 부여**
- Before: 우측 아이콘들은 라벨·구분 없이 나열되어 크기와 간격이 제각각이고, 어떤 것이 주요 기능인지 무게중심이 구분되지 않았습니다.
- After: 우측은 라벨이 붙은 'AI Assistant' 버튼을 세로 구분선으로 앞세워 강조하고, 그 뒤 다운로드·알림·테마·언어·사용자·홈을 크기가 통일된 아이콘 버튼 묶음으로 정렬했으며 홈만 강조 박스로 차별화했습니다.
- 어떻게: Gnb.css.ts에서 gnbAiButton(스파클+라벨)과 gnbDivider(#e5e7eb)로 AI를 분리하고, gnbIconGroup(gap 8)에 gnbIconButton(28×28·radius 8·hover 배경)을 묶었습니다. 홈은 gnbHomeButton(배경 #e3edfc·네이비 아이콘)으로 강조하고, 각 버튼에 aria-label(다운로드/알림/테마/언어/사용자/홈)을 부여해 라벨 없는 아이콘의 의미를 보완했습니다.

**알림의 미확인 상태를 배지와 심각도 단계로 가시화**
- Before: 우측 아이콘 중 알림에 상태 표기가 없어 새 경보 발생 여부나 건수를 상단바에서 즉시 알 수 없었습니다.
- After: 벨 아이콘 우상단에 미확인 알림 도트가 뜨고(현재 12건 설정), 드롭다운을 열면 헤더에 'N 새 알림' 요약과 함께 각 항목이 치명/높음/중간/정상 심각도 도트로 구분되어 표시됩니다.
- 어떻게: Gnb.tsx는 notiCount>0일 때만 gnbNotiDot(흰색 테두리로 대비)을 렌더하며 LogSearch.tsx가 notiCount={12}를 전달합니다. NotificationDropdown.tsx는 critical·high 건수로 newCount를 계산하고 s.dot[n.level]로 심각도별 색 도트를, role="menuitem"으로 각 알림을 표기합니다.

**기능 성격에 맞춘 팝오버·사이드패널 표면 구분과 공통 앵커·접근성 확보**
- Before: 상단 텍스트 메뉴는 모두 동일한 아래 방향 드롭다운 하나로만 열려, 가벼운 선택과 대화형 작업이 같은 형태로 처리되었습니다.
- After: 다운로드·알림·언어·사용자처럼 가벼운 목록/선택은 버튼 아래 팝오버로, 대화가 필요한 AI Assistant는 우측 도킹 사이드 패널로 열어 상호작용 성격에 맞는 표면을 배정했습니다.
- 어떻게: 팝오버 4종은 공통 GnbDropdown.tsx을 재사용해 targetLabel(button[aria-label] 셀렉터)로 버튼 위치를 measure 후 정렬해 띄우고, role="menu"에 바깥 클릭·Esc 닫힘을 구현합니다. AiAssistantPanel.tsx는 별도 aside(role="complementary")로 Esc 닫힘·자동 스크롤·추천 칩을 갖는 채팅 패널로 분리했고, AI 스파클 hover 애니메이션은 prefers-reduced-motion 시 비활성화합니다.

## 4. LNB (좌측 네비게이션) · 솔루션 구분

상단 드롭다운에만 의존하던 레거시 내비게이션을 좌측 고정 LNB로 전환하고, 라인 아이콘·활성/호버 상태·접기 인터랙션·2depth 들여쓰기·섹션 구분 체계를 디자인 시스템 Lnb 컴포넌트로 표준화했습니다.

**좌측 고정 LNB 신설 — 상단 드롭다운 의존 탈피**
- Before: 좌측 네비게이션이 없고 상단 가로 메뉴의 드롭다운에만 의존해, 현재 어느 메뉴에 있는지·형제 메뉴가 무엇인지 파악하기 어려웠고 하위 항목은 펼쳐야만 보였습니다.
- After: 화면 좌측에 8개 메뉴(대시보드·워크스페이스·로그검색·경보·인시던트·모니터링·위협 인텔리전스·설정)를 세로로 상시 노출하는 고정 LNB를 배치해, 전체 정보 구조가 항상 보이고 각 항목을 아이콘+라벨로 쉽게 스캔하게 했습니다.
- 어떻게: apps/design-system/src/components/Lnb/Lnb.tsx의 Lnb 컴포넌트를 도입하고, LogSearch.tsx의 sideMenu 배열을 menuGroup으로 주입했습니다. 루트는 styledLnb에서 width 240px·height 100%·flex-column·background #F9FAFB·borderTopLeftRadius 16으로 본문과 면 분리된 사이드 컬럼을 형성합니다.

**라인 아이콘 + 활성/호버 상태 토큰화**
- Before: 상단 메뉴는 텍스트 위주로, 현재 위치를 알리는 뚜렷한 활성 표시나 호버 피드백이 약했습니다.
- After: 각 메뉴에 18px 라인 아이콘을 붙이고, 현재 페이지(로그검색)는 파란 배경+진한 텍스트+볼드로 강조하며 호버 시 배경/색이 바뀌는 상태를 명확히 구분했습니다.
- 어떻게: Lnb.css.ts에서 .is-active는 color #123E80·background color-mix(#2878EB 13%)·weightBold를 적용하고(isActive에 aria-current="page"), :hover는 primary 색 + surfaceHover 배경으로 정의했습니다. 아이콘은 currentColor 기반으로 wrapper color만으로 색이 전파되게 했고, 활성/호버 색은 --color-lnb-item-active-* CSS 변수로 열어 솔루션별 오버라이드가 가능합니다.

**접기·펼치기(collapse) + 상태 영속화**
- Before: 네비게이션 자체가 없어 화면 폭을 절약하거나 사용자가 내비 표시를 제어할 방법이 없었습니다.
- After: LNB 하단 컨트롤 버튼으로 폭을 240px↔56px로 접었다 펼 수 있게 하고, 접힘 상태에서는 아이콘만 남기며 라벨/화살표/배지를 부드럽게 접었습니다. 접힘 여부는 새로고침 후에도 유지됩니다.
- 어떻게: styledLnb.collapsed에서 width 56px, 텍스트/화살표/배지를 max-width 0·opacity 0으로 접고 280ms cubic-bezier 트랜지션으로 애니메이션합니다. Lnb.tsx는 하단에 접기(PanelLeft)·전체화면(Maximize2) 버튼을 두고, 접힘 상태를 localStorage(STORAGE_KEY 'igloo-lnb-collapsed')에 저장합니다. 접힘 시 tooltipText=label을 title로 넘겨 라벨을 확인할 수 있게 했습니다.

**2depth 들여쓰기 서브메뉴 구조**
- Before: 상단 드롭다운은 하위 항목 계층이 임시로 떠 있다 사라지는 구조라, 상·하위 관계가 지속적으로 드러나지 않았습니다.
- After: 메뉴에 하위 항목이 있으면 회전하는 화살표로 펼침/접힘을 표현하고, 하위 항목은 상위 라벨선에 맞춰 들여쓰기된 서브메뉴로 인라인 전개되게 했습니다.
- 어떻게: Lnb.tsx의 LnbItem은 depth를 재귀로 넘기며 children이 있으면 클릭 시 isExpanded 토글, .menu-item-arrow는 expanded 시 rotate(90deg)합니다. 서브메뉴는 paddingLeft 32로 상위 라벨선에 맞춰 들여쓰고 서브 텍스트는 textSecondary로 위계를 낮췄으며, max-height 트랜지션으로 펼침을 애니메이션합니다.

**섹션·솔루션 구분과 알림 배지 지원**
- Before: 상단 메뉴는 단일 가로줄이라 기능군을 시각적으로 묶거나 제품(솔루션)별로 구분하는 장치가 없었습니다.
- After: LNB가 섹션 그룹 라벨과 구분선으로 메뉴를 기능군으로 나누고, 솔루션 단위 테마 오버라이드와 메뉴별 알림 카운트(배지)를 표현할 수 있는 체계를 갖췄습니다.
- 어떻게: Lnb.tsx는 type:'group' 항목을 비인터랙티브 섹션 헤더(uppercase·letterSpacing 0.05em·textSecondary)로 렌더하고, showDivider마다 styledDivider로 구획합니다. 솔루션 구분은 --color-lnb-item-* 오버라이드와 [data-solution="xdr"] 헤더 변형으로 지원하고, 알림은 menu-item-badge(error 배경, 99 초과 시 '99+')로 표기합니다. 현재 대시보드 sideMenu는 8개 평면 메뉴라 그룹/구분선은 컴포넌트 레벨에서 제공되는 상태입니다.

## 5. 타이틀 영역 · 전역 액션 정렬

검색조건 툴바 우측에 섞여 있던 화면 전역 액션을 타이틀과 같은 선상(우측)의 PageHeader actions 슬롯으로 옮겨, 하단 툴바는 순수 검색조건만 담당하도록 위계를 분리하고 워크스페이스 등 다른 화면과 정렬을 통일했습니다.

**전역 액션을 검색조건 툴바에서 분리해 타이틀 행으로 이동**
- Before: 개선 전 로그검색 화면에서는 검색기록/템플릿/템플릿 저장/오브젝트 추가 버튼이 로그유형·로그소스·수집시간·정렬기준·추가정보 드롭다운과 같은 한 줄에 배치되어, 한 행 안에서 '조건 컨트롤'과 '화면 액션' 두 그룹이 좌우로 경쟁했습니다.
- After: 개선 후에는 템플릿 저장·경보조건 추가(+ 결과 시 검색기록·템플릿) 전역 액션이 '로그 검색' 타이틀과 같은 선상 우측으로 올라가고, 그 아래 툴바에는 로그유형·로그소스·검색시간·정렬기준·히스토그램 토글 등 순수 검색조건만 남았습니다.
- 어떻게: LogSearch.tsx의 PageHeader actions 슬롯에 검색기록/템플릿(Popover)·템플릿 저장·경보조건 추가 버튼을 배치하고, 조건 툴바(toolbar/toolbarLeft)에는 Dropdown들과 히스토그램 Toggle만 남겨 우측 액션 그룹을 제거했습니다. 코드 주석에도 '전역 액션은 타이틀과 같은 선상(우측), 아래 툴바는 순수 검색조건'이라는 분리 의도가 명시돼 있습니다.

**actions 슬롯의 우측 정렬을 토큰 기반 레이아웃 규칙으로 표준화**
- Before: 개선 전에는 버튼 그룹이 조건 드롭다운과 동일한 툴바 행 안에서 우측에 놓여, 타이틀과 무관하게 조건 컨트롤과 같은 위계로 읽혔습니다.
- After: 개선 후 전역 액션은 타이틀 행 안에서 항상 우측 끝으로 밀려 정렬되고 버튼 간 간격이 일정하게 유지되어, 타이틀(좌) - 액션(우)의 위계가 명확해졌습니다.
- 어떻게: PageHeader.tsx는 pageHeaderRow 안에 title 그룹과 함께 actions를 렌더하고, 우측 정렬은 pageHeaderActions의 marginLeft:'auto'로 처리합니다. 같은 규칙에서 gap: vars.spacing.sm으로 버튼 간격을, flexShrink:0으로 축소 방지를 토큰으로 고정했고, pageHeaderRow는 flex·alignItems:center·minHeight 28로 타이틀과 액션을 한 baseline에 정렬합니다.

**타이틀 위계 정리 — 카테고리 혼재 텍스트에서 단일 페이지 타이틀 + 구분선으로**
- Before: 개선 전에는 '검색 로그검색'처럼 카테고리와 화면명이 같은 영역에 붙어 페이지 타이틀의 위계가 약했고, 헤더 영역과 본문의 경계도 명확하지 않았습니다.
- After: 개선 후에는 '로그 검색'을 단일 페이지 타이틀로 굵게 노출하고, 타이틀 행 하단에 구분선을 두어 헤더 영역(타이틀+전역 액션)과 콘텐츠 영역을 시각적으로 구획했습니다.
- 어떻게: LogSearch.tsx에서 PageHeader에 title="로그 검색"과 divider를 지정했고, PageHeader.css.ts의 pageHeaderTitle이 Figma '콘텐츠 타이틀 헤더' 기준 18px·weightBold로 타이틀을 렌더합니다. divider prop은 PageHeader.tsx에서 pageHeaderDivider 래퍼와 Divider 컴포넌트로 구현됩니다.

**워크스페이스 등 다른 화면과 타이틀-액션 정렬 패턴 통일**
- Before: 개선 전에는 로그검색과 탐지경보 등 화면마다 전역 액션이 각자의 조건 툴바 우측에 흩어져 있어, 화면 간 액션 위치·정렬 기준이 제각각이었습니다.
- After: 개선 후에는 로그검색이 워크스페이스와 동일하게 PageHeader의 actions 슬롯을 통해 타이틀 우측에 액션을 두는 방식으로 통일되어, 화면을 옮겨도 전역 액션의 위치가 일관되게 유지됩니다.
- 어떻게: Workspace.tsx는 PageHeader title="워크스페이스"에 actions로 '그룹 설정' 버튼을 넣는 패턴을 쓰고, LogSearch.tsx도 같은 PageHeader 컴포넌트의 actions 슬롯을 재사용합니다. 두 화면 모두 동일한 pageHeaderActions(marginLeft:auto) 규칙을 공유하므로 정렬이 강제로 일치합니다.

**검색 전/후 상태에 따른 전역 액션 노출 정리**
- Before: 개선 전에는 검색기록·템플릿 버튼이 결과 유무와 관계없이 항상 조건 툴바 우측에 상시 노출되어, 검색 전에도 헤더 영역이 액션으로 붐볐습니다.
- After: 개선 후에는 검색 전(idle)에는 검색기록·템플릿을 본문 위젯 카드가 담당하고 헤더 액션에서는 감추며, 결과가 있을 때만 헤더 우측에 검색기록·템플릿 버튼을 노출합니다. 템플릿 저장 버튼도 결과가 없으면 비활성화됩니다.
- 어떻게: LogSearch.tsx에서 검색기록·템플릿 Popover 버튼을 hasResults 조건으로 게이팅하고, 템플릿 저장 Button은 disabled={!hasResults}로 처리했습니다. 검색 전 화면에서는 !hasResults 분기의 widgetsRow에서 QueryListCard(검색기록/템플릿)를 본문에 렌더합니다.

## 한눈에 보기

| 영역 | 개선 전 | 개선 후 |
| --- | --- | --- |
| 정보 위계 · 레이아웃 | 타이틀·액션·검색조건이 한 줄에 뒤섞이고 대형 테이블·긴 목록이 상시 노출 | 타이틀→툴바→쿼리바→히스토그램→테이블 수직 계층, 카드 그룹핑, 검색 전·후 단계적 노출 |
| 색상 · 컬러 시스템 | 진한 브랜드 그린이 화면 전체 지배, 3단계 solid 배지, 흩어진 하드코딩 색 | 뉴트럴 캔버스+인디고 액센트, 5단계 심각도·저채도 틴트 배지, 위협 강조색, 토큰 기반 라이트/다크 |
| GNB | 섹션 메뉴와 전역 기능이 상단 한 줄에 혼재, 라벨 없는 아이콘 | 좌 브랜드+우 전역 액션 전용 밴드, 솔루션 전환 팝오버, AI 강조, 알림 배지, 팝오버/사이드패널 분리 |
| LNB · 솔루션 구분 | 좌측 내비 없음, 상단 드롭다운 의존 | 8개 메뉴 고정 LNB, 활성/호버 토큰화, 접기·상태 영속화, 2depth 들여쓰기, 섹션·배지 체계 |
| 타이틀 · 전역 액션 정렬 | 카테고리 혼재 타이틀, 액션이 조건 툴바 우측에 상시 노출 | 단일 타이틀+구분선, 액션을 PageHeader 우측으로 이관, 화면 간 정렬 통일, 상태별 노출 정리 |