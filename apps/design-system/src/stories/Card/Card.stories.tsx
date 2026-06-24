import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import Card from '../../components/Card'
import type { CardProps } from '../../components/Card'

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
    <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.5 3.3 12.3l.7-4.1-3-2.9 4.2-.7z" />
  </svg>
)

const meta = {
  title: 'StyleGuide/Card',
  component: Card,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'section', 'old-exd', 'neo'] satisfies NonNullable<CardProps['variant']>[],
      description: '카드 스타일 변형',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies NonNullable<CardProps['size']>[],
      description: '카드 너비 고정 크기 (sm·md·lg)',
      table: { category: 'Appearance' },
    },
    density: {
      control: 'select',
      options: ['default', 'compact'] satisfies CardProps['density'][],
      description: '내부 밀도. compact는 패딩·폰트를 줄여 목록형 카드에 적합',
      table: { category: 'Appearance' },
    },
    isActive: {
      control: 'boolean',
      description: '활성 상태 — primary 보더 강조',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
      table: { category: 'State' },
    },
    hoverable: {
      control: 'boolean',
      description: '호버 효과. onClick이 있으면 기본값 true',
      table: { category: 'State' },
    },
    noPadding: {
      control: 'boolean',
      description: '내부 패딩 제거 — 툴바·그리드 등 자체 패딩 컨텐츠에 사용',
      table: { category: 'Appearance' },
    },
    children: { control: false, table: { disable: true } },
    onClick: { table: { disable: true } },
  },
  args: {
    variant: 'default',
    density: 'default',
    disabled: false,
    isActive: false,
    hoverable: false,
    noPadding: false,
    children: null,
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 모든 props를 실시간으로 조정합니다. */
export const Playground: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 320 }}>
      <Card.Header>카드 헤더</Card.Header>
      <Card.Body>카드 본문 내용입니다.</Card.Body>
      <Card.Footer>카드 푸터</Card.Footer>
    </Card>
  ),
}

// ── Variants ──────────────────────────────────────────────────────────────────

/** default · section · old-exd · neo 네 가지 variant를 비교합니다. */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>variant="default"</Label>
        <Card
          variant="default"
          title="Default"
          action={<span style={{ fontSize: 10, color: vars.color.textMuted }}>액션</span>}
          style={{ width: 220 }}
        >
          <Card.Body>bordered section 카드</Card.Body>
        </Card>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>variant="section"</Label>
        <Card variant="section" title="Section" style={{ width: 220 }}>
          <Card.Body>섹션형 카드</Card.Body>
        </Card>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>variant="old-exd"</Label>
        <Card
          variant="old-exd"
          title="클래식 패널"
          action={<span style={{ fontSize: 10 }}>액션</span>}
          style={{ width: 220 }}
        >
          각진 모서리 · primary 보더 · 점선 구분선
        </Card>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>variant="neo"</Label>
        <Card
          variant="neo"
          title="모던 카드"
          action={<span style={{ fontSize: 10 }}>액션</span>}
          style={{ width: 220 }}
        >
          그라데이션 액센트 · 큰 radius · hover lift
        </Card>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── States ────────────────────────────────────────────────────────────────────

/** default · isActive · hoverable · disabled 상태를 비교합니다. */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(
        [
          { label: 'Default', props: {} },
          { label: 'isActive', props: { isActive: true } },
          { label: 'Hoverable', props: { hoverable: true } },
          { label: 'Disabled', props: { disabled: true } },
        ] as const
      ).map(({ label, props }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Label>{label}</Label>
          <Card style={{ width: 180 }} {...props}>
            <Card.Header>{label}</Card.Header>
            <Card.Body>카드 본문</Card.Body>
          </Card>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Density ───────────────────────────────────────────────────────────────────

/** default · compact 밀도를 비교합니다. */
export const Density: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['default', 'compact'] as const).map((d) => (
        <div key={d} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 240 }}>
          <Label>{`density="${d}"`}</Label>
          {['피싱 대응', 'DDoS 완화', '악성코드 격리'].map((name) => (
            <Card key={name} density={d} hoverable>
              <Card.Body>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{name}</span>
                  <span style={{ fontSize: 10, color: vars.color.success }}>활성</span>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Subcomponents ─────────────────────────────────────────────────────────────

/** Card.Header · Card.Body · Card.Image · Card.Footer 서브컴포넌트 조합 예시 */
export const Subcomponents: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Card style={{ width: 240 }}>
        <Card.Header>헤더 + 바디 + 푸터</Card.Header>
        <Card.Body>본문 영역 — 텍스트, 리스트, 폼 등 자유롭게 조합합니다.</Card.Body>
        <Card.Footer>
          <span style={{ fontSize: 11, color: vars.color.textMuted }}>2024-01-15</span>
        </Card.Footer>
      </Card>
      <Card style={{ width: 240 }}>
        <Card.Image>
          <div
            style={{
              height: 80,
              background: `linear-gradient(135deg, ${vars.color.primary}, ${vars.color.info})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: 12,
            }}
          >
            Card.Image
          </div>
        </Card.Image>
        <Card.Body>이미지 슬롯을 포함한 카드</Card.Body>
      </Card>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Clickable ─────────────────────────────────────────────────────────────────

/** onClick이 있는 카드 — 자동으로 hoverable 처리되고 클릭 시 선택 상태를 토글합니다. */
export const Clickable: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null)
    const items = ['피싱 대응', 'DDoS 완화', '악성코드 격리']
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 280 }}>
        {items.map((name) => (
          <Card key={name} isActive={selected === name} onClick={() => setSelected(selected === name ? null : name)}>
            <Card.Body>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{name}</span>
                {selected === name && (
                  <span style={{ fontSize: 10, color: vars.color.primary, fontWeight: 600 }}>선택됨</span>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── SearchConditionCard Pattern ───────────────────────────────────────────────

/** 검색기록·템플릿 카드 패턴 — Card + density="compact" + hoverable + isActive 조합 */
export const SearchConditionCardPattern: Story = {
  render: () => {
    const [selected, setSelected] = useState<number | null>(0)

    const conditions = [
      { label: '로그유형', value: '전체' },
      { label: '로그소스', value: '없음' },
      { label: '수집시간', value: '2024.01.28 ~ 2024.01.29' },
      { label: '추가정보', value: '히스토그램, 유해등급', highlight: true },
    ]
    const queryText = 'd_port:80 AND d_ip:1.1.1.1 OR s_ip: 2.2.2.2 OR s_ip: 3.3.3.3'
    const historyLabels = ['방금 전', '5분전', '1시간전']
    const templateLabels = ['템플릿명 000001', '템플릿명 000002', '템플릿명 000003']

    const ConditionBody = () => (
      <>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 12px', fontSize: 12 }}>
          {conditions.map((cond) => (
            <span key={cond.label} style={{ display: 'inline-flex', gap: 3, whiteSpace: 'nowrap', lineHeight: 1.6 }}>
              <span style={{ color: vars.color.textSecondary }}>{cond.label}:</span>
              <span
                style={{
                  color: cond.highlight ? vars.color.primary : vars.color.text,
                  fontWeight: cond.highlight ? 600 : 500,
                }}
              >
                {cond.value}
              </span>
            </span>
          ))}
        </div>
        <div
          style={{
            fontSize: 11,
            display: 'flex',
            gap: 6,
            paddingTop: 6,
            borderTop: `1px solid ${vars.color.border}`,
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: vars.color.textSecondary, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>
            검색조건:
          </span>
          <span
            style={{
              color: vars.color.text,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
            }}
          >
            {queryText}
          </span>
        </div>
      </>
    )

    return (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 300 }}>
          <Label>history — 검색기록</Label>
          {historyLabels.map((label, i) => (
            <Card
              key={i}
              density="compact"
              hoverable
              isActive={selected === i}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <Card.Header>
                <span style={{ color: vars.color.textSecondary, display: 'flex', alignItems: 'center' }}>
                  <ClockIcon />
                </span>
                <span>{label}</span>
              </Card.Header>
              <Card.Body>
                <ConditionBody />
              </Card.Body>
            </Card>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 300 }}>
          <Label>template — 저장된 템플릿</Label>
          {templateLabels.map((label, i) => (
            <Card
              key={i}
              density="compact"
              hoverable
              isActive={selected === i + 10}
              onClick={() => setSelected(selected === i + 10 ? null : i + 10)}
            >
              <Card.Header>
                <span style={{ color: vars.color.warning, display: 'flex', alignItems: 'center' }}>
                  <StarIcon />
                </span>
                <span style={{ color: vars.color.warning }}>{label}</span>
              </Card.Header>
              <Card.Body>
                <ConditionBody />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
