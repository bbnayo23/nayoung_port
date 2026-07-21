# @port/portfolio-web

메인 포트폴리오이자 **배포 산출물**. R3F(react-three-fiber) 3D 인터랙티브 포트폴리오 + 텍스트/PDF 폴백으로 구성되며, 빌드 시 `icon-library`·`design-system`·`dashboard`를 서브사이트로 흡수한다.

```bash
pnpm dev            # 루트에서 (= 메인 개발 서버)
pnpm --filter @port/portfolio-web dev
```

빌드 — 다른 앱을 먼저 빌드해 `/icons/`·`/design-system/`·`/dashboard/` 로 합성한 뒤 정적 산출물을 만든다.

```bash
pnpm --filter @port/portfolio-web build
```

- **3D 버전** — 방향키로 이동, 휠로 확대/축소하며 프로젝트(포탈)로 진입
- **텍스트 버전** — 저사양·모션 최소화 환경에서 자동 전환, PDF 이력서 저장 가능
