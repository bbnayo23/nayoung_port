# Tabs — Hi-Fi Migration

## BEFORE — `src/components/Tabs`

파일: `Tabs.tsx` · `Tabs.css.ts` · `Tabs.types.ts` · `index.ts`

(조회 기반) 예상 특징:
- 단일 variant (대부분 underline) · roving tabindex 미구현 가능성
- 키보드 네비게이션 (← → Home End) 커버리지 제한적
- `aria-selected`, `aria-controls` 수동 wiring — 구현 편차

## AFTER — `src/hifi/Tabs`

- **4 variants**: `underline` · `outline` · `enclosed` · `fill`
- **WAI-ARIA Tabs pattern 완전 준수**
  - `role="tablist"` · `role="tab"` · `role="tabpanel"`
  - `aria-selected` · `aria-controls` · `aria-labelledby`
  - **Roving tabindex** — 선택된 탭만 `tabindex=0`
- **키보드**: ← → ↑ ↓ · Home · End
- **Activation mode**: `automatic` (즉시) vs `manual` (Enter/Space)
- **Orientation**: horizontal · vertical
- **Badge** slot · `disabled` 지원 (skip 이동)
- prefers-reduced-motion 대응 transition

## MIGRATION

### 1. 파일 치환

```bash
# 경로 공식화 전략 A — src/hifi/Tabs 를 그대로 정식 경로로 사용
# src/components/Tabs/index.ts 에서 hifi/Tabs 를 re-export (호환 레이어)
```

`src/components/Tabs/index.ts`:
```ts
// Legacy compat — 내부 구현은 hifi 로 교체
export { Tabs } from '@/hifi/Tabs/Tabs'
export type { TabsProps, TabItem } from '@/hifi/Tabs/Tabs.types'
```

### 2. API Breaking Changes

| 기존 | 신규 | 마이그레이션 |
|---|---|---|
| `tabs={[...]}` (가정) | `items={[...]}` | props rename |
| `onTabChange` | `onChange` | props rename |
| string id | `value` 필수 | id → value |

### 3. Storybook

- `Components/Tabs` 유지 (레거시 예제)
- `HiFi/Tabs` 신규 추가 — 3 variants · keyboard demo · vertical

### 4. 체크리스트

- [ ] hifi/Tabs 전체 복사 → src/components2/Tabs (또는 정식 경로)
- [ ] src/components/Tabs/index.ts re-export 레이어
- [ ] 소비처 grep: `from '@/components/Tabs'` — 변경 없음 (호환)
- [ ] 소비처 grep: `onTabChange` · `tabs=` — 신규 API 로 교체
- [ ] WCAG.md a11y 검증
- [ ] Unified HiFi Preview 에서 시각 확인
