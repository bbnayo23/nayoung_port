# 3D Portfolio — Redesign Workflow

> **현행: v3 "Debug Dive" (코드 보이드 · 글리치 다이브)** — 아래 [v3 섹션](#v3--debug-dive-코드-보이드--글리치-다이브) 참조.
> v1(거실/방) → v2(코드 속 공간) → v3 는 동일 아키텍처 스켈레톤(캐릭터·카메라·컨트롤·진입·HUD·품질) 위에서
> **세계관·이동·진입 메커닉을 "코드 보이드를 헤엄치다 에러를 클릭해 블랙홀로 다이브"로 교체**한 것이다.
> 텍스트(폴백) 버전은 변경 없이 유지.

---

## v3 — Debug Dive (코드 보이드 · 글리치 다이브)

> 더 깊이 "코드 안으로" 들어온 어두운 디지털 보이드. 캐릭터는 바닥을 걷지 않고 **공간을 헤엄치듯 날아다닌다**.
> 프로젝트로 가는 길은 방문(門)이 아니라 **떠 있는 치명적 에러 코드**다 — 그 에러를 클릭하면
> **블랙홀 포탈처럼 빨려 들어가** 해당 프로젝트의 코드 차원으로 다이브해 에러를 "진압"한다.
> 화면 전체에 지지직거리는 **글리치/스캔라인** 노이즈가 깔려 코드 디멘션의 디지털 질감을 강화한다.

### 세계관 / 인터랙션 (v2 → v3 변경점)
- **이동: 보행 → 비행(헤엄)**. 캐릭터가 3D 보이드를 자유 비행(x/y/z). 빈 공간 클릭/방향키로 그 방향으로 헤엄쳐 이동(banking + 팔다리 언듈레이션). 더 이상 그리드 바닥을 걷지 않는다. **마우스 휠로 카메라 확대/축소**(`game.zoom`).
- **포탈 = 발광 게이트웨이**. 각 프로젝트는 **accent 컬러 발광 링(토러스) + 회전 육각 에너지 링 + 어두운 아퍼처**로 된 포탈이다 — 떠다니는 코드/빨간 에러 잡음과 **확연히 구분**. 공중에 **비정형·비대칭**(서로 다른 x/높이/깊이/기울기)으로 떠 있다. 진입 경로인 에러는 포탈 안 **작은 빨간 서브라벨**로 컨셉만 유지. (코드/에러 토큰은 밀도·명도를 낮춰 배경으로)
- **진입: 휠 줌 메타포**. 포탈에 다가가면(focus) 더 밝아지고, **스크롤 인(확대)/클릭/Enter** 하면 다이브한다(`WheelZoom`: focus→ENTER_ZOOM).
- **퇴장: Esc / "나가기" 버튼**. 차원 안(room)에서는 **휠 줌/줌아웃을 비활성**한다 — 3D 화면을 가리거나 의도치 않게 줌아웃되지 않도록. 카메라도 고정 프레이밍.
- **진입 연출: 블랙홀 포탈**. 다이브 시 에러 자리에 **소용돌이 블랙홀**(회전 디스크 + 어크리션 링)이 열리고 캐릭터·카메라가 그 중심으로 빨려 들어간 뒤 프로젝트 차원으로 전환. Esc/버튼으로 역재생하며 보이드로 복귀.
- **글리치 질감**. 떠다니는 코드가 더 촘촘하고 간헐적으로 점멸(지지직). 포스트프로세싱 Glitch/Noise/Scanline + HUD CSS 스캔라인 오버레이(저사양도 적용).
- **앰비언트 미세 에러**. 작은 에러 토큰들은 그대로 떠다니며 클릭해 해결 → "errors fixed" 카운터(플레이버).
- **캐릭터: 디자이너 토이풍 빅헤드**. 파스텔 핑크 **베어 후드(곰 귀) + 큰 글로시 눈(블라이드풍) + 발그레한 볼 + 금발 프린지**, 코지 크림 원지. **헤드셋**(화이트 컵 + 핑크 글로우 링) 유지, **에어맥스 스니커즈**(청키 솔 + 힐 에어버블 + 스우시) 착용. 캐릭터 전용 림 라이트 2개로 어두운 보이드에서 또렷이. 치비 비율(스케일 0.7), 비행 시 두 팔 앞으로 뻗어 젓는 헤엄 + 상하 돌고래 출렁 모션.

### 코드 팔레트 (Material/Dracula 계열)
`keyword #c792ea` · `string #c3e88d` · `func #82aaff` · `comment #546e7a` · `error #ff5370` · `bg #070b14`

### 프로젝트 ↔ 에러 게이트 ↔ 코드 차원
| 게이트(app) | errorLabel (진입 에러) | 차원 컨셉 | accent |
|---|---|---|---|
| design-system | `ERR_MODULE: '@port/ds' missing` | component layer | `#c792ea` |
| dashboard | `Uncaught: stream(siem) timeout` | data stream | `#82aaff` |
| icon-library | `ERR: ./icons export undefined` | vector space | `#c3e88d` |

### v3 구성 파일
- `store.tsx` — 3D 비행 상태(charPos/charTarget 3D, swim phase, diving 플래그)
- `scene/roomGeometry.ts` — `clampFlight(x,y,z)` 비행 경계(공중 y 범위) + 룸 경계
- `controls/Controls.tsx` — 카메라를 향하는 **빌보드 비행 평면** 클릭→3D 목표, 3D 클릭 마커
- `controls/KeyboardMove.tsx` — 방향키/WASD + 상승/하강(Space/Shift) 비행
- `controls/Controls.tsx` → `WheelZoom` — 휠 줌(game.zoom) + 스크롤 인 다이브 / 스크롤 아웃 퇴장
- `character/Character.tsx` — 디자이너 토이풍 빅헤드(베어 후드/큰 눈/헤드셋/에어맥스) 아바타 + 림 라이트 + 팔 뻗는 헤엄·상하 언듈레이션
- `scene/CodePortal.tsx` — **포탈 게이트웨이**(accent 발광 링/육각 에너지 링/아퍼처 + 이름, 공중 비대칭 배치, 클릭/스크롤-인 다이브)
- `scene/BlackHole.tsx` — 다이브용 소용돌이 포탈(회전 디스크/어크리션 링/빨려듦)
- `scene/CodeSpace.tsx` · `FloatingCode.tsx` — 더 촘촘한 코드 필드 + 글리치 점멸
- `Effects.tsx` — Bloom/Vignette + **Glitch/Noise/Scanline**
- `camera/CameraRig.tsx` — 3D 비행 팔로우 + 다이브 줌인
- `ui/Hud.tsx` · `Hud.css.ts` — 카피 갱신 + 스캔라인/글리치 오버레이
- 업데이트: `rooms.ts`(errorLabel), `World.tsx`(에러 클릭→다이브·블랙홀 배선)

### v3 단계
- [x] A. 비행 모델 — store 3D 이동(pitch/diving), `clampFlight`(공중 y), 빌보드 구(球) 클릭-투-플라이, Space/Shift 상하
- [x] B. 캐릭터 — 스케일 0.72 축소, 매끈한 슈트 + **바지**(치마 제거), 헤엄(lean/bank + 팔다리 언듈레이션) 모션
- [x] C. 에러 게이트 — CodePortal → 글리치 에러 비콘(RGB 스플릿, 클릭/Enter 다이브), rooms.ts `errorLabel`
- [x] D. 블랙홀 포탈 — `BlackHole`(어크리션 링/이벤트 호라이즌) + 카메라/캐릭터 흡입, Esc 역복귀
- [x] E. 글리치 — Effects `Glitch`/`Scanline` + 촘촘(30)/점멸 코드 + HUD CSS 스캔라인·비네트 오버레이
- [x] F. 카메라 — 3D 비행 팔로우(고도 추적) + dive 줌인 + room/focus, typecheck·build 통과

### v3 핵심 메모
- **드리프트 폰트**: drei `Text` 는 v2와 동일하게 `@fontsource/fira-code` 로컬 번들 + 개별 `<Suspense>` 격리 유지(씬 전체 블랭크 방지).
- **블랙홀 성능**: 셰이더 없이 회전 메시(디스크/링) 레이어로 구현 — 저사양도 동작, `entered` 동안에만 렌더.
- **글리치 저사양**: postprocessing `Glitch`/`Scanline` 은 high 티어에서만, HUD 스캔라인/비네트 오버레이는 CSS 라 저사양도 질감 유지.
- **다이브 흐름**: 게이트 클릭/Enter → `diving=true`(입력 잠금·11u/s 흡입)로 블랙홀 중심 흡입 → 760ms 후 차원 내부로 진입·`diving=false`. Esc 시 보이드 게이트 앞으로 헤엄쳐 복귀.
- **`Glitch` 타입 주의**: `delay/duration/strength` 는 튜플이 아니라 `THREE.Vector2` 로 전달해야 typecheck 통과.

### v3 UX 보강 — 프로젝트 상세 뷰 (HUD 2-state)
- **문제(1차)**: `room = entered ?? active` 로 패널 하나를 공유 → 락온만 해도 우측에 전체 상세(정보 과다), 진입 후 좁은 우측 패널이 읽기 불편.
- **문제(2차)**: 진입 상세를 **중앙 모달(스크림)**로 바꿨더니 3D 차원/애니메이션을 가려 "들어갔을 때의 3D가 안 보인다".
- **해결(현행)**: HUD 2-state, 진입 상세는 **하단 도크**.
  - `focus` (락온, 진입 전): 하단 중앙 **lock 칩**(`lockChip`) — 이름 + 진입 버튼만.
  - `entered` (진입): **하단 도크**(`detailDock`/`detailInner`) — 화면 상단 대부분은 3D 차원(뒷벽 홀로·드리프트 코드·라이트·캐릭터)이 부각되고, 상세는 하단에만 얹힌다. 위쪽 그라데이션 페이드로 3D 가 비치고 **투명 영역 클릭은 3D 로 통과**(`pointerEvents:none` 컨테이너). 좌측 텍스트(이름/태그라인/설명 3줄 클램프/태그) + 우측 액션(프로젝트 열기 CTA / 나가기). **스크림·중앙 모달 제거**.
  - **휠 줌아웃 퇴장 제거** — room 에서 휠 비활성, 퇴장은 Esc / "나가기" 버튼.
- 데이터/액션 콜백(onEnter/onExit/href)·API 불변 — 표현 계층만 교체. (제거된 dead CSS: `detailScrim`/`detailCard`/`closeBtn`/`panelActions`/`panelDesc`)

### v3 검증
- `typecheck` / `build` 통과 (Experience 청크 lazy 로드, 650 모듈 변환).
- 헤드리스 Chrome(`?three&low&nofx`, SwiftShader) — 코드 보이드 렌더 확인: 떠다니는 코드 필드 · **3 글리치 에러 게이트(RGB 스플릿)** · 빨간 경고 링/매트 · 스폰 글로우 링 · 바지 아바타 · HUD(에러 카운터·스캔라인 오버레이·비행/다이브 힌트). **JS 크래시 0**.
- ⚠️ 블랙홀 다이브 풀샷 + Bloom/Glitch 포스트프로세싱은 헤드리스 SwiftShader OOM 한계 → **실 GPU에서 확인 필요**(다이브 흡입·헤엄 모션·뱅킹).

---

## v2 (아카이브) — Inside the Code (코드 속 공간)

> 소프트웨어를 개발할 때 "코드 안으로 들어온" 듯한 디지털 차원.
> 코드가 둥둥 떠다니고, 빨간 **에러 코드**를 클릭해 해결하며 탐험한다.
> 각 프로젝트는 떠 있는 **코드 게이트**(`import { … }`)이고, 다가가 진입하면
> 그 프로젝트만의 **코드 차원**으로 다이브해 작업물을 보여준다.

### 세계관 / 인터랙션
- **허브 = 코드 디멘션**: 어두운 디지털 보이드 + 그리드 바닥 + 떠다니는 코드 필드.
- **에러 해결 메커닉**: 흩어진 빨간 에러 토큰을 클릭 → 초록(resolved)으로 전환 + "fixed" 카운터.
- **프로젝트 게이트**: 3개의 글로우 코드 블록. 다가가면(focus) 미리보기, Enter/클릭으로 그 차원에 진입(walk-in).
- **캐릭터**: 얼굴 디테일 없는 개발자 아바타(실루엣 + 글로우 바이저). 이동/걷기/시선만 유지.
- **카메라/키보드/품질**: v1 스켈레톤 재사용 (follow/focus/room 모드, 방향키·Enter·Esc, useQuality).

### 코드 팔레트 (Material/Dracula 계열)
`keyword #c792ea` · `string #c3e88d` · `func #82aaff` · `comment #546e7a` · `error #ff5370` · `bg #070b14`

### 프로젝트 ↔ 코드 차원
| 게이트(app) | codeLabel | 차원 컨셉 | accent |
|---|---|---|---|
| design-system | `import { DesignSystem }` | component layer | `#c792ea` |
| dashboard | `await stream(events)` | data stream | `#82aaff` |
| icon-library | `export * from './icons'` | vector space | `#c3e88d` |

### v2 구성 파일
- `scene/CodeSpace.tsx` — 허브(그리드/보이드) + `FloatingCode`
- `scene/FloatingCode.tsx` — 드리프트하는 코드 텍스트 필드(drei Text)
- `scene/ErrorTokens.tsx` — 클릭해 해결하는 에러 토큰 + 카운터 콜백
- `scene/CodePortal.tsx` — 프로젝트 코드 게이트(라벨/글로우/매트)
- `scene/ProjectSpace.tsx` — 진입 시 프로젝트 코드 차원(필요 시에만 렌더)
- `scene/codeData.ts` — 코드 스니펫/에러/컬러
- 업데이트: `rooms.ts`(codeLabel/팔레트), `Character.tsx`(얼굴 제거), `Lighting/World/Experience/Hud`, `Effects`(Bloom↑)

### v2 단계
- [x] A. 데이터/codeData (스니펫·에러·신택스 컬러)
- [x] B. CodeSpace(그리드 보이드) + FloatingCode(드리프트 코드)
- [x] C. ErrorTokens(클릭 해결) + "errors fixed" 카운터
- [x] D. CodePortal(코드 게이트) + ProjectSpace(진입 차원, 필요 시 렌더)
- [x] E. 캐릭터 얼굴 제거 + 개발자 글로우 바이저
- [x] F. Lighting/World/Experience/Hud 다크 배색 + Bloom↑ + 검증

### v2 핵심 메모
- **폰트**: drei `Text` 는 폰트 로드까지 Suspense → 단일 경계면 씬 전체가 blank.
  ⇒ Fira Code 를 **로컬 번들**(`@fontsource/fira-code`)로 import + 텍스트마다 **개별 `<Suspense>`** 격리.
  (그리드/캐릭터/게이트 프레임은 즉시, 코드 텍스트는 준비되면 팝인)
- **성능**: ProjectSpace 는 active/entered 일 때만 렌더. 저사양(useQuality=low)은 Bloom·그림자 off.

### v2 검증
- `typecheck` / `build` 통과.
- 헤드리스 Chrome(`?low&nofx`) — 코드 디멘션 허브 렌더 확인: 떠다니는 코드·빨간 에러 토큰·3 코드 게이트·글로우 매트·그리드·개발자 아바타·HUD(에러 카운터). **JS 에러 0**.
- ⚠️ 프로젝트 차원 다이브/Bloom 풀샷은 헤드리스 SwiftShader OOM 한계 → **실 GPU에서 확인 필요**(동일 Text/Suspense 패턴 + v1 검증된 카메라 다이브 스켈레톤).

---

## v1 (아카이브) — Room Portfolio

> 포트폴리오를 "나의 방"처럼 꾸민 3D 인터랙티브 공간으로 재설계한다.
> 게임처럼 캐릭터가 있고, 마우스 시선/이동에 따라 카메라가 캐릭터를 따라간다.
> 거실(허브)에서 시작해 3개의 방으로 진입하며, 각 방은 `apps/`의 서브 프로젝트다.

## 1. 컨셉 (Concept)

- **세계관**: 단발머리 작은 소녀(마녀배달부 키키 형상)가 사는 모던하고 깔끔한 집.
- **시작**: 거실(Living Room) = 허브. 3개의 문/포털이 각 방으로 연결.
- **인터랙션**:
  - 커서 이동 → 캐릭터 머리/시선이 커서를 향하고, 카메라가 부드럽게 따라감 (gaze).
  - 바닥/방 클릭 → 캐릭터가 그 지점으로 걸어가고(click-to-move), 카메라가 추적.
  - 방 입구 도달 → 카메라가 방 안으로 진입, 해당 프로젝트 정보 HUD 표시.
- **톤**: 로우폴리, 파스텔, 따뜻한 조명. 방마다 컨셉이 다름.

### 방 ↔ 프로젝트 매핑

| 방 | 프로젝트(app) | 컨셉 | 무드 |
|----|---------------|------|------|
| Room 1 | `design-system` | 아틀리에 / 작업실 | 밝은 스튜디오, 컴포넌트 진열대, 우드+화이트 |
| Room 2 | `dashboard` (SIEM) | 관제실 / 사이버 | 다크, 네온 블루, 모니터 월, 데이터 글로우 |
| Room 3 | `icon-library` | 갤러리 / 전시장 | 미니멀 화이트, 아이콘 액자, 스포트라이트 |

## 2. 기술 스택 (Tech)

- `three` — WebGL 렌더 코어
- `@react-three/fiber` (v9, React 19 호환) — 선언적 3D
- `@react-three/drei` — 카메라/헬퍼/Html 오버레이/이징
- `@react-three/postprocessing` — Bloom 등 폴리시 (선택적, 저사양 시 off)
- 캐릭터: **프로시저럴 로우폴리** (외부 애셋 0, three 프리미티브로 코드 조립)
- 스타일: 기존 vanilla-extract 토큰 재사용 (HUD/오버레이)

## 3. 아키텍처 (Architecture)

```
src/
  three/
    Experience.tsx          # <Canvas> 루트 + 씬 조립 + Suspense
    scene/
      World.tsx             # 전체 월드(거실 + 방들) 조립
      LivingRoom.tsx        # 거실 허브 (바닥/벽/가구/포털)
      Room.tsx              # 컨셉 주입형 범용 방 컴포넌트
      Floor.tsx / Walls.tsx # 공용 구조물
      Lighting.tsx          # 조명 리그
      rooms.ts              # 방 설정 데이터(컨셉 → 프로젝트)
    character/
      Character.tsx         # 로우폴리 단발 소녀 (머리/단발/몸/팔다리)
      useCharacterController.ts  # 이동/네비/걷기 상태
    camera/
      CameraRig.tsx         # 캐릭터 팔로우 + gaze 카메라
    controls/
      useClickToMove.ts     # 바닥 레이캐스트 → 목표 지점
      useCursorGaze.ts      # 커서 → 시선 벡터
    ui/
      Hud.tsx               # 2D 오버레이 (drei Html / DOM portal)
      RoomLabel.tsx         # 방 라벨/진입 안내
  pages/
    MainPage.tsx            # 3D vs 폴백 분기 (capability gate)
    FallbackPage.tsx        # 기존 스크롤형 콘텐츠 (접근성/저사양/SEO)
  hooks/
    useCanRender3D.ts       # WebGL/reduced-motion/모바일 감지
  data/index.ts             # projects + room 매핑 확장
```

### 분기 전략 (3D 기본 + 폴백)
`useCanRender3D()` 가 `false` (WebGL 미지원 · `prefers-reduced-motion` · 매우 저사양)면
기존 스크롤형 `FallbackPage` 를 렌더. 콘텐츠 데이터(`data/index.ts`)는 양쪽이 공유.

## 4. 단계 (Phases)

- [x] **P0 — 설계**: 컨셉/매핑/아키텍처 확정, 본 문서.
- [x] **P1 — 기반**: 의존성(three/R3F/drei/postprocessing), 씬 폴더, Canvas + 바닥 + 조명 + 팔로우 카메라 + 폴백 게이트(`useCanRender3D`).
- [x] **P2 — 캐릭터**: 프로시저럴 단발 소녀(머리/단발/리본/드레스/팔다리) + 걷기·호흡 모션 + 시선 추적.
- [x] **P3 — 컨트롤**: click-to-move(바닥 레이캐스트 + 클릭 펄스 마커), cursor gaze, 팔로우/포커스 카메라.
- [x] **P4 — 월드**: 거실 허브(소파/테이블/러그/화분/램프) + 3개 방 입구 포털 + 방별 컨셉 알코브(아틀리에 선반 / 관제실 모니터월 / 갤러리 액자).
- [x] **P5 — 진입/HUD**: 근접 진입 감지 → 활성 매트·라벨 하이라이트 + 카메라 포커스 + 프로젝트 정보 패널(HUD) + 프로젝트 링크.
- [x] **P6 — 폴리시**:
  - 캐릭터 디즈니풍 커트화 — 치비 비율(큰 머리), 큰 눈+하이라이트, 눈썹/미소, 깜빡임, 둥근 단발/사이드 리본.
  - **walk-in 씬 전환** — 문 앞(focus) → Enter/버튼 입장 → 캐릭터가 문 통과해 방 안으로, 카메라 room 모드로 진입([RoomInterior](../src/three/scene/RoomInterior.tsx) 아틀리에/관제실/갤러리 풀 인테리어). Esc/버튼으로 거실 복귀.
  - **Bloom + Vignette** 포스트프로세싱([Effects](../src/three/Effects.tsx)) — 관제실 네온/서버 LED 발광. (저사양 자동 off)
  - **키보드 접근성** — 방향키/WASD 이동, Enter 입장, Esc 퇴장([KeyboardMove](../src/three/controls/KeyboardMove.tsx)), HUD 버튼 focus-visible.
  - **모바일·성능** — [useQuality](../src/hooks/useQuality.ts) 가 터치/저코어/저메모리 → low 티어(그림자·Bloom off, dpr 축소). 조명 수 최소화.
  - 딥링크 `?room=<id>` / 품질 강제 `?low` `?high` / 디버그 `?nofx`.
- [ ] **P7 — 추가 폴리시(여지)**: 방마다 고유 BGM/효과음, 캐릭터 표정 변화, 방 내부 인터랙티브 오브젝트(클릭 시 디테일), 로딩 인트로 연출.

### 검증
- `typecheck` / `build` 통과 (Experience 청크 lazy 로드).
- 헤드리스 Chrome(SwiftShader) — 거실·캐릭터·3 포털·HUD·키보드 힌트 렌더 정상, **JS 콘솔 에러 0**. 방 진입 씬도 WebGL 프레임 렌더 확인(로그).
- ⚠️ 헤드리스 소프트웨어 렌더(SwiftShader)는 그림자+Bloom+근접 방 인테리어에서 OOM 한계 → 방 내부/Bloom 풀샷은 **실 GPU에서 확인 필요**. 코드/빌드는 정상.

## 5. 결정 로그 (Decisions)

- 렌더링: **실시간 WebGL 3D (R3F)** — 게임 느낌 우선.
- 캐릭터: **프로시저럴 로우폴리** — 애셋 의존 없음, 100% 커스텀/경량.
- 기존 UI: **3D 기본 / 스크롤형 폴백** — 접근성·저사양·SEO 보전.
