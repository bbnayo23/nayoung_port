# SPiDER ExD → SOC 콘솔 · 로그검색 UI/UX 개선 가이드

레거시 SPiDER ExD 로그검색 화면은 고채도 딥그린이 헤더부터 버튼·차트·태그까지 화면 전체를 덮고, 조건 컨트롤과 전역 액션이 한 줄에 뒤섞이며, 검색기록·템플릿과 12여 개 결과 컬럼이 상시 펼쳐져 정보 밀도가 과도했습니다. 또한 주 내비게이션이 상단 드롭다운 메뉴에만 의존해 전체 정보구조가 한눈에 드러나지 않았습니다. 이번 개선은 이 화면을 디자인 시스템 컴포넌트(PageHeader·Lnb·Gnb·Badge·SectionCard 등)와 시맨틱 토큰 컨트랙트 위에서 재설계하여, 정보 위계를 층위화하고 색을 위협 신호에만 쓰도록 절제하며 내비게이션을 예측 가능한 구조로 정리했습니다. 아래는 발표 시 하나씩 짚어 설명할 수 있도록 다섯 개 차원으로 정리한 가이드입니다.

---

## 1. 정보 위계 · 레이아웃

화면을 [타이틀 헤더 → 검색조건 툴바 → AI 쿼리바 → 히스토그램 → 결과]의 단일 수직 흐름으로 재구조화하고, 각 블록을 카드·구분선으로 분리하며 검색기록·템플릿을 상태에 따라 점진적으로 노출해 레거시의 과밀한 정보 밀도를 낮췄습니다.

**페이지 타이틀을 명확한 헤더 위계로 승격**
- Before: 좌상단에 '검색 로그검색'이 작은 평문으로만 놓여 최상위 타이틀과 하위 작업 영역의 경계가 구분되지 않았고, 진한 녹색 GNB 바로 아래 툴바가 붙어 타이틀이 묻혔습니다.
- After: '로그 검색'을 h1 레벨 타이틀로 제시하고 아래 구분선(Divider)으로 헤더와 작업 영역을 분리했으며, 전역 액션을 타이틀과 같은 수평 baseline 우측에 정렬해 '이 화면 = 타이틀 + 전역 액션'이라는 위계가 한눈에 읽히게 했습니다.
- 어떻게: design-system의 PageHeader 컴포넌트를 사용해 pageHeaderRow 안에서 pageHeaderTitleGroup(h1)과 pageHeaderActions를 좌우로 배치하고, divider prop으로 하단 Divider를 렌더했습니다. LogSearch.tsx에서 `<PageHeader title="로그 검색" divider actions={...} />` 형태로 호출했습니다.

**전역 액션과 검색조건의 역할 분리**
- Before: 하나의 툴바 줄에 로그유형·로그소스·수집시간·정렬기준·추가정보 드롭다운과 검색기록·템플릿·템플릿 저장·오브젝트 추가 버튼이 뒤섞여, 조회 조건 컨트롤과 화면 전역 명령이 같은 위계로 보였습니다.
- After: 전역 액션을 상단 PageHeader 우측으로 올리고, 아래 툴바는 순수 검색조건(드롭다운 4종 + 히스토그램 토글)만 담당하도록 분리해 '무엇으로 거를지'와 '화면 차원의 동작'을 서로 다른 층으로 인지하게 했습니다.
- 어떻게: PageHeader actions에 검색기록·템플릿·템플릿 저장·경보조건 추가 버튼을 배치하고, 별도 toolbar div에는 Dropdown과 Toggle만 넣었습니다. 툴바는 surface 배경 + border 테두리 + radius.md 라운드를 준 카드로 묶었습니다.

**검색기록·템플릿의 상시 노출 → 상태 기반 점진적 노출**
- Before: 검색기록·템플릿이 화면 하단에 항상 펼쳐진 대형 리스트로 존재하고, 항목마다 로그유형·로그소스·수집시간·정렬기준·추가정보·추가조건 전체가 여러 줄로 반복 출력돼 검색 전부터 세로 공간을 크게 점유했습니다.
- After: 검색 전(idle)에만 두 항목을 2열 카드 위젯으로 '상대시각/이름 · 요약 meta + 하이라이트된 쿼리 한 줄'로 압축해 보여주고, 결과가 생기면 위젯은 사라지고 헤더의 Popover 버튼 안으로 접혀 결과 테이블에 세로 공간을 내줍니다.
- 어떻게: hasResults 상태로 분기해 !hasResults일 때 widgetsRow(auto-fit grid)에 QueryListCard 2개를 렌더하고, hasResults일 때는 PageHeader actions의 Popover(width 360)에 동일 카드를 넣었습니다. toQueryItems()로 title + meta + query로 요약했습니다.

**기능 블록별 카드·구분선 그룹핑으로 경계 확보**
- Before: 흰 바탕 위에 컨트롤과 리스트가 뚜렷한 컨테이너 없이 나열돼 블록 구분이 녹색 강조색과 여백에만 의존했고, 결과 화면도 차트·컨트롤·테이블·페이지네이션이 한 흐름으로 붙어 있었습니다.
- After: 툴바·히스토그램·결과를 각각 테두리 있는 surface 카드로 분리하고, 결과 카드 내부에서도 상단 메타 행과 하단 페이지네이션을 구분선으로 본문 테이블과 나눠 '조건 → 분포 → 결과'가 시각적으로 층위화됩니다.
- 어떻게: toolbar·histoCard는 surface + 1px border + radius.md 카드로, 결과 영역은 design-system SectionCard로 감쌌습니다. resultMeta에 borderBottom, paginationRow에 borderTop을 주어 본문과 분리하고, flex column + gap으로 블록 간 리듬을 유지했습니다.

**결과 테이블 컬럼 축소와 상세 접기(점진적 노출)**
- Before: 결과 테이블이 근거이벤트·경보유형·위험도·경보그룹·경보이름·지속시간·로그소스IP·출발지/목적지 IP·포트 등 12여 개 컬럼을 한 번에 펼치고 대부분 값이 마스킹돼('000.000', '***') 가독성이 떨어졌으며 '경보그룹'이 중복됐습니다.
- After: 핵심 5개 컬럼(원본 로그·수집시간·출발지 IP·출발지 국가·도착지 포트)만 기본 노출하고, 위험도는 Badge, 위협 IP는 '위협' 태그, 국가는 국기로 요약했습니다. 나머지 필드는 행을 펼치면 상세 그리드로 on-demand 노출됩니다.
- 어떻게: Table.HeaderCell을 raw·mgr_time·s_ip·s_country·d_port 5개로 한정하고, expandable Row가 열리면 detailGrid(auto-fill minmax(220px))에 Field를 배치했습니다. 위험도는 Badge variant="status-round", 위협 IP는 error 색 threatTag로 처리하고, 헤더 표시·프로파일·컬럼·피벗·CSV 컨트롤은 resultMeta 우측으로 모았습니다.

---

## 2. 색상 · 컬러 시스템

진한 그린 브랜드로 화면을 덮던 레거시를 뉴트럴 배경 + 절제된 인디고 액센트로 전환하고, 3단계 솔리드 뱃지에 그쳤던 심각도 표현을 5단계 토큰 기반 소프트 틴트 체계로 재정의해 장시간 관제에 편하고 위협이 한눈에 읽히도록 개선했습니다.

**진한 그린 브랜드 → 뉴트럴 캔버스 + 절제된 인디고 액센트**
- Before: 상단 헤더·검색 버튼·선택된 검색기록 카드·히스토그램 막대·SQL 태그·활성 메뉴까지 고채도 딥그린으로 뒤덮여, 위협 정보가 아닌 브랜드 색이 가장 강하게 튀고 장시간 모니터링 시 눈이 쉽게 피로했습니다.
- After: 차가운 회청색 캔버스(#f0f3f6) 위 순백 surface로 배경을 중립화하고 헤더도 흰색으로 비웠으며, 브랜드 인디고(#7187ff)는 활성 사이드바 항목·링크·상호작용 요소에만 얹어 색이 곧 '주목해야 할 지점'을 뜻하게 했습니다.
- 어떻게: xdr.css.ts에서 background '#f0f3f6' / surface '#ffffff' / header.background '#ffffff'로 배경을 뉴트럴화하고 primary를 '#7187ff' 단일 값으로 절제했습니다. 이 값은 contract.css.ts의 vars.color 시맨틱 컨트랙트를 통해서만 주입돼 전역에서 일관 적용됩니다.

**3단계 솔리드 심각도 → 5단계 토큰 매핑 체계**
- Before: 위험도 컬럼이 HIGH(빨강)·MEDIUM(노랑)·LOW(초록) 3단계뿐이고 값이 코드에 직접 박혀, Critical과 Info 구간이 없어 최상위 위협과 단순 정보 로그를 색으로 분리하지 못했습니다.
- After: Critical·High·Medium·Low·Info 5단계를 red·orange·yellow·blue·gray로 매핑해, 결과 테이블에서 Critical(적)과 Info(회색)가 명확히 갈리고 위험도 서열이 색만으로 읽힙니다.
- 어떻게: logs.ts의 Severity 타입과 severityColor 매핑을 근거로, LogSearch.tsx가 이 매핑을 `<Badge color={severityColor[l.severity]}>`에 그대로 전달해 심각도→색 결정을 데이터 계층에서 단일 관리합니다.

**고채도 솔리드 뱃지 → 소프트 틴트(status-round) 뱃지**
- Before: 위험도 뱃지가 빨강/노랑/초록 배경을 꽉 채운 고채도 솔리드 필이라, 경보가 쌓이면 원색 블록들이 경쟁하며 시선을 분산시키고 소란스러웠습니다.
- After: 옅은 배경 틴트 위에 진한 텍스트를 얹은 라운드형(status-round)으로 바꿔 색 구분은 유지하되 채도를 낮춰 색 노이즈를 줄이고, 위협 IP의 적색 강조가 상대적으로 도드라지게 했습니다.
- 어떻게: `<Badge variant="status-round">`와 Badge.tokens.ts의 createBadgeTokens가 근거입니다. bg는 rgba 저알파(예: blue rgba(59,130,246,0.18)), text는 진한 dark 값(예: '#1D4ED8')으로 자동 생성돼 틴트 배경 + 고대비 텍스트 조합을 일관되게 만듭니다.

**LOW=그린 브랜드 충돌 해소 → Low를 블루로 분리**
- Before: 최하위 위험도 LOW가 브랜드 그린과 사실상 같은 초록 계열이라, '초록'이 안전을 뜻하는지 브랜드를 뜻하는지 의미가 모호했습니다.
- After: Low를 블루로 재배정하고 그린을 심각도 스케일에서 빼, 위험도 램프(적→주황→노랑→파랑→회색)가 브랜드 인디고와 겹치지 않는 독립 축으로 정리됐습니다.
- 어떻게: logs.ts의 severityColor에서 low를 'blue'로 지정했습니다. green은 Badge.tokens.ts에 남아 있으나 심각도에는 쓰지 않고 actionColor(allowed:green)처럼 '허용/정상' 의미로만 별도 사용해 색의 의미 축을 분리했습니다.

**위협 강조색을 시맨틱 error 토큰으로 예약**
- Before: 출발지 IP가 위협 IP와 내부/정상 IP 모두 동일한 검정 텍스트로 표시돼, 어떤 IP가 위협 인텔리전스상 악성인지 셀 단위로 즉시 구분되지 않았습니다.
- After: 위협 IP는 적색 볼드 텍스트에 '위협' 태그를 붙여(예: 203.0.113.45 위협) 국가 뱃지(CN·RU 등)와 함께 악성 출처 로그가 스캔 한 번에 잡힙니다.
- 어떻게: l.threatIp인 셀에 ipThreat 클래스를 부여하고, 해당 스타일이 color: vars.color.error / weightBold를 씁니다. 적색을 임의 hex가 아니라 vars.color.error 토큰(라이트 '#fa5252', 다크 '#ff6b6b')에 묶어 위협=error 색 의미를 테마 간 일관되게 유지합니다.

**라이트/다크 공통 컨트랙트로 색 일관성 확보**
- Before: 화면 요소마다 그린 계열 색이 개별적으로 칠해져, 관제실 조도나 야간 근무에 맞춘 다크 모드 대응이나 색의 중앙 관리가 어려웠습니다.
- After: 동일한 시맨틱 토큰 이름 체계로 라이트(뉴트럴 회청 배경)와 다크(차가운 near-black 슬레이트 #15171c) 두 테마를 지원해, 장시간·야간 관제에서도 같은 의미 색 체계를 유지합니다.
- 어떻게: contract.css.ts의 createGlobalThemeContract가 색 '이름'만 정의하고 실제 값은 xdr.css.ts(:root)와 xdr-dark.css.ts(:root.dark)가 각각 채웁니다. background·surface·border·text·error는 테마별 다른 hex로, 브랜드 primary(#7187ff)는 양쪽 공통으로 두어 의미가 어긋나지 않게 했습니다.

---

## 3. GNB (전역 네비게이션 바)

주 내비게이션을 LNB로 내리고 상단 바를 전역 유틸 전용으로 비운 뒤, 라벨 없는 저대비 아이콘 뭉치를 접근성을 갖춘 액션 그룹 + 드롭다운/사이드패널 체계로 재구성해 GNB를 예측 가능한 전역 컨트롤 레이어로 정리했습니다.

**주 내비게이션과 전역 기능의 역할 분리**
- Before: 상단 초록 밴드에 보안관제·검색·대시보드·인텔리전스·통계/모니터링 같은 주 메뉴(텍스트+셰브론)와 우측 유틸 아이콘이 한 줄에 섞여, 화면 이동 내비게이션과 전역 기능이 구분되지 않았습니다.
- After: 주 메뉴는 좌측 LNB로 내리고, GNB에는 브랜드와 전역 기능(AI Assistant·다운로드·알림·테마·언어·사용자·홈)만 남겨 두 계층의 책임을 분리했습니다.
- 어떻게: Gnb.tsx는 gnbInner를 좌측 gnbBrand와 우측 gnbActions 두 영역(space-between)으로만 구성하고 페이지 이동 메뉴를 렌더하지 않습니다. LogSearch.tsx에서 셸의 gnb 슬롯에 Gnb, lnb 슬롯에 Lnb를 각각 주입해 전역 바와 주 내비를 물리적으로 분리했습니다.

**라벨 없는 저대비 아이콘 뭉치 → 접근성을 갖춘 균일 액션 그룹**
- Before: 우측 상단에 라벨 없는 작은 아이콘들(팔레트·원형·사용자·톱니·햄버거)이 채도 높은 초록 배경 위에 붙어 식별과 조준(히트영역 구분)이 어려웠습니다.
- After: 다운로드·알림·테마·언어·사용자·홈이 균일한 28×28 버튼으로 8px 간격 그룹에 정렬되고, 각 버튼에 한국어 aria-label과 hover 배경이 붙어 명확해졌습니다. 밴드도 저채도 라이트 그라디언트로 바뀌어 회색 아이콘 대비가 확보됩니다.
- 어떻게: 각 버튼에 aria-label("다운로드"/"알림"/"테마"/"언어"/"사용자"/"홈")을 지정하고, gnbIconButton(28×28, radius 8, hover iconHoverBg)과 gnbIconGroup(gap 8)으로 히트영역·간격을 통일했습니다. 밴드는 BAND_BG, 아이콘 stroke는 gray-600(#4b5563)입니다.

**텍스트 셰브론 메뉴 → 정보 밀도 있는 드롭다운/사이드패널 체계**
- Before: 상단 항목이 클릭 시 단순 텍스트 하위 메뉴를 펼치는 수준으로, 알림·다운로드 같은 상태성 기능을 담을 구조가 없었습니다.
- After: 각 아이콘이 목적에 맞는 팝오버/패널을 엽니다. NotificationDropdown(심각도 도트+새 알림 수), DownloadDropdown(진행률·완료·실패 재시도), LanguageMenu, UserMenu, SolutionSwitcher(앱 타일 그리드)로 구성됩니다.
- 어떻게: 모든 팝오버는 공통 patterns/GnbDropdown을 씁니다. 대상 버튼을 aria-label 셀렉터로 찾아 앵커링하고 바깥 클릭·Esc로 닫히며 role="menu"를 부여합니다. Gnb는 콜백만 노출하고 열림 상태는 소비처(LogSearch.tsx의 useState)가 관리해 표현과 상태를 분리했습니다.

**알림 상태 가시화**
- Before: 읽지 않은 경보가 있는지 여부를 상단에서 확인할 수 없었습니다(아이콘만 존재).
- After: 벨 아이콘에 미확인 알림이 있으면 빨간 도트가 뜨고(notiCount 12 주입), 드롭다운 헤더에 "N 새 알림", 항목마다 심각도(치명/높음/중간/정상) 도트가 붙어 상태를 한눈에 파악합니다.
- 어떻게: notiCount>0일 때 gnbNotiDot(notiDot #dc2626, 흰색 2px 테두리)을 렌더하고, NotificationDropdown이 critical/high 개수로 newCount를 계산해 헤더에 표시하며 항목별 dot[level]로 심각도 색을 구분합니다.

**AI Assistant를 1급 전역 기능으로 승격**
- Before: 레거시 상단 메뉴에는 AI 보조 기능 진입점이 없었습니다.
- After: GNB 우측 액션 맨 앞에 스파클 아이콘 + 'AI Assistant' 라벨 버튼을 두고 세로 구분선으로 나머지와 분리했으며, 클릭 시 우측 도킹 채팅 패널이 열립니다.
- 어떻게: Gnb.tsx가 showAiAssistant 시 gnbAiButton과 gnbDivider를 렌더합니다. hover 시 sparkleTwinkle 키프레임과 prefers-reduced-motion 대응을 포함하고, 실제 패널은 patterns/AiAssistantPanel.tsx(aside role="complementary", Esc로 닫힘, 추천 칩·인사말 props 주입)로 도메인에 독립적입니다.

**단순 로고 → 브랜드 로킹업 + 솔루션 스위처**
- Before: 좌측은 'SPiDER ExD' 로고 이미지만 있어 제품(솔루션) 간 전환 진입점이 없었습니다.
- After: 좌측 브랜드가 로고 원형 + 'SOC Console' 타이틀 + 셰브론의 클릭 가능한 로킹업이 되고, 누르면 SolutionSwitcher(제품군 앱 타일 그리드, 현재 앱 활성 표시)가 좌측 정렬로 열립니다.
- 어떻게: gnbBrand 버튼이 gnbLogoCircle·gnbTitle·gnbBrandChevron으로 구성되고 onBrandClick 콜백을 노출합니다. SolutionSwitcher.tsx는 GnbDropdown을 align="left", targetLabel="SOC Console"로 앵커링하고 DEFAULT_APPS(ExD active·IUMS·SOAR·더보기)를 타일 그리드로 렌더하며 active 타일에 aria-current를 부여합니다.

---

## 4. LNB (좌측 네비게이션) · 솔루션 구분

상단 드롭다운 메뉴에만 의존하던 레거시 구조를, 항시 노출되는 좌측 LNB에 8개 핵심 메뉴를 라인 아이콘·활성/호버 상태·접기 펼치기·2depth 들여쓰기로 체계화하고, 헤더 솔루션 스위처로 제품 구분까지 담아낸 디자인 시스템 컴포넌트로 재설계했습니다.

**좌측 상시 네비게이션 신설 (상단 드롭다운 → 고정 LNB)**
- Before: 좌측 네비게이션이 부재했고 '보안관제/검색/대시보드/인텔리전스/통계·모니터링' 상단 드롭다운으로만 이동할 수 있어, 전체 기능 구조가 한눈에 드러나지 않고 매번 펼쳐야 하위 항목을 확인할 수 있었습니다.
- After: 좌측에 대시보드·워크스페이스·로그검색·경보·인시던트·모니터링·위협 인텔리전스·설정 8개 메뉴가 상시 노출돼, 클릭 없이 정보구조가 드러나고 현재 위치(로그검색)를 즉시 파악합니다.
- 어떻게: Lnb 컴포넌트를 도입하고 styledLnb에 width 240·height 100%·flexDirection column·flexShrink 0으로 세로 고정 사이드바를 정의했습니다. 메뉴는 LogSearch.tsx의 sideMenu 배열(8개 MenuItem)로 주입되어 menuGroup prop으로 렌더됩니다.

**활성/호버 상태의 명시적 시각화**
- Before: 상단 텍스트 메뉴는 선택 상태 표현이 약해 사용자가 자신의 위치를 색·굵기로 확인하기 어려웠습니다.
- After: 현재 메뉴(로그검색)가 파란 배경·진한 파란 텍스트·굵은 글자로 강조되고, 나머지는 호버 시 배경·색이 바뀌어 상호작용 영역이 명확해졌습니다.
- 어떻게: .menu-item-wrapper.is-active에 background color-mix(#2878EB 13%,#fff), color #123E80, weightBold를 지정하고 :hover에 surfaceHover 배경과 primary 색을 적용했습니다. 활성 여부는 LnbContext의 activeKey와 aria-current='page'로 접근성까지 처리합니다.

**접기·펼치기(collapse) 도입**
- Before: 네비게이션 접기/펼치기 개념 자체가 없어, 작업 공간 확보와 네비게이션 노출을 사용자가 조절할 수 없었습니다.
- After: 하단 컨트롤로 LNB를 아이콘 전용(56px)으로 접거나 라벨 포함(240px)으로 펼칠 수 있고, 접힘 시 텍스트·화살표·배지가 부드럽게 사라지며 접힘 상태가 재방문 시에도 유지됩니다.
- 어떻게: styledLnb.collapsed에서 width 56로 축소하고 텍스트·화살표·배지를 maxWidth 0·opacity 0으로 페이드 아웃하며, 전 구간에 DURATION 280ms·cubic-bezier(0.22,1,0.36,1) 트랜지션을 적용했습니다. 토글은 LnbCollapseIcon 버튼이며 상태는 STORAGE_KEY 'igloo-lnb-collapsed'로 localStorage에 영속화됩니다.

**라인 아이콘 + 라벨의 일관된 항목 포맷**
- Before: 상단 메뉴는 텍스트 위주에 기능 아이콘이 별도 영역에 흩어져, 메뉴마다 아이콘·라벨의 시각 규칙이 통일되지 않았습니다.
- After: 모든 LNB 항목이 '아이콘 + 라벨(+ 알림 배지/화살표)'의 동일 포맷으로 정렬돼 스캔 가능성이 높아졌고, 접힘 시에는 아이콘만 중앙 정렬돼 의미를 유지합니다.
- 어떻게: 각 MenuItem에 @port/icon-library의 XdrNav* 아이콘을 지정하고 .menu-item-icon svg를 14px로 규격화했습니다. 아이콘 색은 wrapper의 currentColor로만 제어해 활성/호버 색과 자동 동기화되고, 접힘 시 wrapper를 justifyContent center·gap 0으로 전환해 아이콘 중심 정렬을 만듭니다.

**2depth 들여쓰기·서브메뉴 및 솔루션 구분 구조**
- Before: 상단 드롭다운은 하위 위계가 펼침 순간에만 잠깐 보였고, 상단 SPiDER ExD 브랜드 고정이라는 단일 제품 구분만 존재했습니다.
- After: 부모 항목 클릭 시 화살표가 회전하며 하위 메뉴가 들여쓰기로 펼쳐지고, LNB 헤더의 솔루션 스위처(SOC Console ▾)로 제품/솔루션을 전환하는 구조가 마련됐습니다.
- 어떻게: styledSubMenuItem에서 하위 wrapper를 paddingLeft 32로 들여쓰고 .menu-item-arrow.expanded를 rotate(90deg)로 처리했습니다. 솔루션 구분은 헤더 로고 슬롯(full/mini)과 data-solution='xdr' 테마 훅, 섹션 구분용 styledLnbGroupLabel·styledDivider로 지원합니다.

---

## 5. 타이틀 영역 · 전역 액션 정렬

검색조건 툴바 우측에 섞여 있던 화면 전역 액션을 PageHeader 타이틀과 같은 선상(우측)으로 옮겨, 조건 컨트롤과 화면 액션의 위계를 분리하고 워크스페이스 화면과 정렬을 통일했습니다.

**전역 액션을 조건 툴바에서 타이틀 선상으로 이동해 위계 분리**
- Before: 검색기록·템플릿·템플릿 저장·오브젝트 추가 같은 화면 전역 액션이 로그유형·로그소스·수집시간·정렬기준·추가정보 드롭다운과 같은 한 줄 우측에 붙어, '조건 컨트롤'과 '화면 액션' 두 성격이 한 행에서 경쟁했습니다.
- After: 전역 액션(검색기록·템플릿·템플릿 저장·경보조건 추가)을 PageHeader actions 슬롯으로 올려 타이틀 '로그 검색'과 같은 선상 우측에 배치하고, 아래 툴바는 조건만 남겨 두 그룹의 역할을 시각적으로 분리했습니다.
- 어떻게: LogSearch.tsx에서 PageHeader에 actions={검색기록/템플릿 Popover + 템플릿 저장 Popover + 경보조건 추가 Button}을 전달했습니다. 해당 액션은 PageHeader.tsx의 pageHeaderRow 안에서 title과 같은 flex 행에 렌더되며, 주석에 '전역 액션은 타이틀과 같은 선상, 아래 툴바는 순수 검색조건만 담당'이라는 의도가 명시돼 있습니다.

**actions 슬롯 우측 정렬 규칙(marginLeft:auto)로 타이틀-액션 양끝 배치**
- Before: 액션이 조건 툴바 우측에 임의로 붙는 형태라, 타이틀 영역과 액션이 별개 행에 흩어져 '제목-액션'의 좌우 대칭 관계가 성립하지 않았습니다.
- After: 타이틀은 왼쪽, 액션 그룹은 오른쪽 끝에 정렬돼 헤더 한 줄 안에서 좌우 양끝 배치가 일관되게 성립합니다.
- 어떻게: PageHeader.css.ts의 pageHeaderActions가 marginLeft:'auto'로 남는 가로 공간을 흡수해 우측 정렬하고, flexShrink 0으로 찌그러짐을 막으며 gap은 vars.spacing.sm으로 통일합니다. 액션 버튼은 모두 Button variant="ghost" size="sm"으로 통일했습니다.

**타이틀 자체의 위계 강화(작은 브레드크럼형 텍스트 → 18px Bold 타이틀 + 구분선)**
- Before: 타이틀이 좌상단에 '검색 로그검색'처럼 작은 텍스트로만 표기되고 본문과의 구분선이 없어 페이지 제목으로서의 위계가 약했습니다.
- After: '로그 검색'을 18px Bold 타이틀로 키우고 아래에 Divider를 두어 헤더와 콘텐츠 영역이 명확히 구분되고 제목 위계가 강화됐습니다.
- 어떻게: PageHeader.css.ts의 pageHeaderTitle이 fontSize 18(Figma '콘텐츠 타이틀 헤더' 기준)·weightBold로 정의되고, pageHeaderDivider가 marginTop 12로 Divider를 배치합니다. LogSearch.tsx에서 `title="로그 검색" divider`로 적용했습니다.

**워크스페이스 등 다른 화면과 헤더 정렬 패턴 통일**
- Before: 화면마다 액션을 조건 툴바 우측에 임의 배치해(로그검색은 오브젝트 추가, 탐지경보는 경보목록 보기 등) 화면 간 헤더 정렬 기준이 제각각이었습니다.
- After: 로그검색과 워크스페이스가 동일하게 PageHeader 우측 actions 슬롯으로 화면 액션을 배치해, 화면을 이동해도 타이틀-액션 위치가 일관되게 유지됩니다.
- 어떻게: Workspace.tsx가 `PageHeader title="워크스페이스" divider actions={그룹 설정 Button}` 패턴을 쓰고, LogSearch.tsx도 같은 @port/design-system PageHeader와 actions 슬롯을 공유하며 정렬·간격은 두 화면 모두 동일한 pageHeaderActions 규칙을 따릅니다.

**검색 상태에 따른 액션 노출 규칙 정리**
- Before: 검색기록·템플릿 버튼이 검색 여부와 무관하게 조건 툴바 우측에 항상 노출돼, 검색 전에도 결과 대상 액션이 함께 떠 있었습니다.
- After: 검색 전(idle)에는 헤더에 템플릿 저장·경보조건 추가만 두고 검색기록·템플릿은 본문 위젯 카드가 담당하며, 결과가 생기면 헤더 우측에 검색기록·템플릿 버튼이 나타나 상태별로 액션이 정돈됩니다.
- 어떻게: hasResults 조건으로 검색기록·템플릿 Popover를 감싸 결과가 있을 때만 헤더에 노출하고, 템플릿 저장 버튼은 disabled={!hasResults}로 검색 전 비활성 처리합니다. 검색 전에는 QueryListCard 위젯이 본문에서 같은 역할을 맡습니다.

---

## 한눈에 보기

| 영역 | 개선 전 | 개선 후 |
| --- | --- | --- |
| 정보 위계·레이아웃 | 컨테이너 없이 과밀 나열, 검색기록·결과 12여 컬럼 상시 노출 | 단일 수직 흐름 + 카드·구분선 분리, 상태 기반 점진적 노출, 핵심 5컬럼 + 상세 접기 |
| 페이지 타이틀 | '검색 로그검색' 작은 평문, 구분선 없음 | 18px Bold h1 '로그 검색' + Divider로 헤더/본문 분리 |
| 색상 시스템 | 고채도 딥그린이 화면 전체 지배 | 뉴트럴 회청 캔버스 + 절제된 인디고 액센트(#7187ff) |
| 심각도 표현 | 3단계 솔리드 뱃지, 코드 하드코딩, LOW=그린 충돌 | 5단계 토큰 매핑(red·orange·yellow·blue·gray) 소프트 틴트 뱃지 |
| 위협 IP | 정상/위협 IP 동일 검정 텍스트 | error 토큰 적색 볼드 + '위협' 태그 + 국가 뱃지 |
| 테마 | 다크 모드·중앙 관리 미흡 | 시맨틱 컨트랙트로 라이트/다크 공통 지원 |
| GNB | 초록 밴드에 주 메뉴 + 라벨 없는 유틸 아이콘 혼재 | 브랜드 + 전역 기능 전용, 균일 액션 그룹 + 드롭다운/패널 |
| 알림 상태 | 상단에서 미확인 여부 확인 불가 | 벨 도트 + '새 알림 N' + 항목별 심각도 도트 |
| AI Assistant | 진입점 없음 | GNB 1급 액션 승격, 우측 도킹 채팅 패널 |
| LNB | 부재(상단 드롭다운 의존) | 좌측 상시 8개 메뉴, 활성/호버·접기·2depth·솔루션 스위처 |
| 전역 액션 정렬 | 조건 툴바 우측에 임의 혼재 | PageHeader actions 우측 정렬, 화면 간 통일, 상태별 노출 규칙 |