import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import { Dropdown } from '../../components/Dropdown'
import type { DropdownOption, DropdownSize } from '../../components/Dropdown'

// ── Sample Data ───────────────────────────────────────────────────────────────

const sampleOptions: DropdownOption[] = [
  { value: 'all', label: '전체' },
  { value: 'info', label: 'INFO' },
  { value: 'warn', label: 'WARN' },
  { value: 'error', label: 'ERROR' },
  { value: 'debug', label: 'DEBUG', disabled: true },
]

const coloredOptions: DropdownOption[] = [
  { value: 'critical', label: 'Critical', variant: 'red' },
  { value: 'high', label: 'High', variant: 'orange' },
  { value: 'medium', label: 'Medium', variant: 'yellow' },
  { value: 'low', label: 'Low', variant: 'green' },
  { value: 'info2', label: 'Info', variant: 'purple' },
]

const severityOptions: DropdownOption[] = [
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
  { value: 'info', label: 'Info' },
]

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: 'StyleGuide/Dropdown',
  component: Dropdown,
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies DropdownSize[],
      description: '드롭다운 크기',
      table: { category: 'Appearance' },
    },
    placeholder: {
      control: 'text',
      description: '미선택 상태 플레이스홀더',
      table: { category: 'Content' },
    },
    label: {
      control: 'text',
      description: '트리거 앞에 표시되는 라벨',
      table: { category: 'Content' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태',
      table: { category: 'State' },
    },
    options: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
  args: {
    options: sampleOptions,
    placeholder: '선택하세요',
    size: 'md',
    disabled: false,
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

// ── Layout helpers ─────────────────────────────────────────────────────────

const Row = ({ children, gap = 16 }: { children: React.ReactNode; gap?: number }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap, flexWrap: 'wrap' }}>{children}</div>
)

const Item = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>{children}</div>
)

const Code = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 모든 props를 실시간으로 조정합니다. */
export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined)
    return (
      <Dropdown
        options={args.options}
        placeholder={args.placeholder}
        size={args.size}
        disabled={args.disabled}
        value={value}
        onChange={(v) => setValue(v)}
      />
    )
  },
}

// ── Sizes ─────────────────────────────────────────────────────────────────────

/** sm · md · lg 세 가지 크기를 비교합니다. */
export const Sizes: Story = {
  render: () => (
    <Row>
      {(['sm', 'md', 'lg'] as DropdownSize[]).map((s) => (
        <Item key={s}>
          <Dropdown options={sampleOptions} size={s} placeholder={`${s} 선택`} />
          <Code>{s}</Code>
          <code style={{ fontSize: 10, fontFamily: 'monospace', color: vars.color.textMuted }}>
            {s === 'sm' ? 'h-28' : s === 'md' ? 'h-32' : 'h-40'}
          </code>
        </Item>
      ))}
    </Row>
  ),
  parameters: { controls: { disable: true } },
}

// ── States ────────────────────────────────────────────────────────────────────

/** 기본 / 선택됨 / 비활성 / forceOpen 상태를 정적으로 표시합니다. */
export const States: Story = {
  render: () => (
    <div style={{ paddingBottom: 180 }}>
      <Row>
        <Item>
          <Dropdown options={sampleOptions} placeholder="선택하세요" />
          <Code>default</Code>
        </Item>
        <Item>
          <Dropdown options={sampleOptions} defaultValue="info" />
          <Code>selected</Code>
        </Item>
        <Item>
          <Dropdown options={sampleOptions} disabled placeholder="비활성" />
          <Code>disabled</Code>
        </Item>
        <Item>
          <Dropdown options={sampleOptions} forceOpen placeholder="Force Open" />
          <Code>force open</Code>
        </Item>
      </Row>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── With Label ────────────────────────────────────────────────────────────────

/** label이 드롭다운 박스 안에 통합된 형태입니다. */
export const WithLabel: Story = {
  render: () => (
    <Row gap={8}>
      <Dropdown options={sampleOptions} label="로그유형" placeholder="없음" />
      <Dropdown
        options={[
          { value: 'all', label: '전체' },
          { value: 'syslog', label: 'Syslog' },
          { value: 'agent', label: 'Agent' },
        ]}
        label="로그소스"
        placeholder="없음"
      />
      <Dropdown
        options={[
          { value: 'today', label: '오늘부터' },
          { value: 'week', label: '최근 1주일' },
          { value: 'month', label: '최근 1달' },
        ]}
        label="수집시간"
        defaultValue="today"
      />
      <Dropdown options={sampleOptions} label="정렬기준" placeholder="없음" />
    </Row>
  ),
  parameters: { controls: { disable: true } },
}

// ── With Disabled Options ─────────────────────────────────────────────────────

/** 일부 옵션이 비활성인 경우입니다. 클릭해서 목록을 열어보세요. */
export const WithDisabledOptions: Story = {
  render: () => (
    <div style={{ paddingBottom: 200 }}>
      <Dropdown
        options={[
          { value: 'a', label: '옵션 A' },
          { value: 'b', label: '옵션 B (비활성)', disabled: true },
          { value: 'c', label: '옵션 C' },
          { value: 'd', label: '옵션 D (비활성)', disabled: true },
          { value: 'e', label: '옵션 E' },
        ]}
        placeholder="선택하세요"
        forceOpen
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Multi Select ──────────────────────────────────────────────────────────────

/** multiSelect 모드 — count(N개 선택) · values(선택값 말줄임) · label 조합 */
export const MultiSelect: Story = {
  render: () => {
    const [countVal, setCountVal] = useState<string[]>([])
    const [valuesVal, setValuesVal] = useState<string[]>(['info', 'warn'])
    const [labelVal, setLabelVal] = useState<string[]>([])
    const [labelValuesVal, setLabelValuesVal] = useState<string[]>(['info', 'warn', 'error'])

    return (
      <Row>
        <Item>
          <Dropdown
            multiSelect
            options={sampleOptions}
            value={countVal}
            onChange={setCountVal}
            placeholder="선택하세요"
            style={{ minWidth: 160 }}
          />
          <Code>count (기본)</Code>
        </Item>
        <Item>
          <Dropdown
            multiSelect
            multiDisplayMode="values"
            options={sampleOptions}
            value={valuesVal}
            onChange={setValuesVal}
            placeholder="선택하세요"
            style={{ minWidth: 200 }}
          />
          <Code>values — 말줄임</Code>
        </Item>
        <Item>
          <Dropdown
            multiSelect
            options={sampleOptions}
            value={labelVal}
            onChange={setLabelVal}
            label="로그유형"
            placeholder="전체"
          />
          <Code>count + label</Code>
        </Item>
        <Item>
          <Dropdown
            multiSelect
            multiDisplayMode="values"
            options={sampleOptions}
            value={labelValuesVal}
            onChange={setLabelValuesVal}
            label="로그유형"
            placeholder="전체"
            style={{ minWidth: 260 }}
          />
          <Code>values + label — 말줄임</Code>
        </Item>
      </Row>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── Multi Select Tags ─────────────────────────────────────────────────────────

/** multiSelect 태그 모드 — 선택값이 Badge 태그로 표시됩니다. */
export const MultiSelectTags: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['info', 'warn'])

    return (
      <Row>
        <Item>
          <Dropdown
            multiSelect
            multiDisplayMode="tags"
            options={sampleOptions}
            value={selected}
            onChange={setSelected}
            placeholder="선택하세요"
            style={{ minWidth: 220 }}
          />
          <Code>tags</Code>
        </Item>
        <Item>
          <Dropdown
            multiSelect
            multiDisplayMode="tags-closable"
            options={sampleOptions}
            value={selected}
            onChange={setSelected}
            placeholder="선택하세요"
            style={{ minWidth: 220 }}
          />
          <Code>tags-closable</Code>
        </Item>
      </Row>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── Multi Select Colored Tags ─────────────────────────────────────────────────

/** 옵션별 variant(색상)가 적용된 Badge 태그 모드입니다. */
export const MultiSelectColoredTags: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['critical', 'high', 'low'])

    return (
      <Row>
        <Item>
          <Dropdown
            multiSelect
            multiDisplayMode="tags"
            options={coloredOptions}
            value={selected}
            onChange={setSelected}
            placeholder="선택하세요"
            style={{ minWidth: 260 }}
          />
          <Code>tags — colored</Code>
        </Item>
        <Item>
          <Dropdown
            multiSelect
            multiDisplayMode="tags-closable"
            options={coloredOptions}
            value={selected}
            onChange={setSelected}
            placeholder="선택하세요"
            style={{ minWidth: 260 }}
          />
          <Code>tags-closable — colored</Code>
        </Item>
      </Row>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── With Select All ───────────────────────────────────────────────────────────

/** hideSelectAll=false 로 메뉴 상단에 "전체" 전체선택 행이 표시됩니다. */
export const WithSelectAll: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([])
    const [selectedValues, setSelectedValues] = useState<string[]>(['info'])

    return (
      <Row>
        <Item>
          <Dropdown
            multiSelect
            hideSelectAll={false}
            options={sampleOptions}
            value={selected}
            onChange={setSelected}
            placeholder="선택하세요"
            style={{ minWidth: 180 }}
          />
          <Code>count + select-all</Code>
        </Item>
        <Item>
          <Dropdown
            multiSelect
            hideSelectAll={false}
            multiDisplayMode="values"
            options={sampleOptions}
            value={selectedValues}
            onChange={setSelectedValues}
            placeholder="선택하세요"
            style={{ minWidth: 200 }}
          />
          <Code>values + select-all</Code>
        </Item>
        <Item>
          <Dropdown
            multiSelect
            options={sampleOptions}
            value={selected}
            onChange={setSelected}
            placeholder="선택하세요"
            style={{ minWidth: 180 }}
          />
          <Code>hideSelectAll 미설정 (기본)</Code>
        </Item>
      </Row>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── Searchable ────────────────────────────────────────────────────────────────

/** searchable=true 로 드롭다운 패널 안에 텍스트 필터 입력창이 표시됩니다. */
export const Searchable: Story = {
  render: () => {
    const [singleVal, setSingleVal] = useState<string | undefined>(undefined)
    const [multiVal, setMultiVal] = useState<string[]>([])

    return (
      <Row>
        <Item>
          <Dropdown
            options={severityOptions}
            value={singleVal}
            onChange={setSingleVal}
            placeholder="검색하세요"
            searchable
            style={{ minWidth: 180 }}
          />
          <Code>single — searchable</Code>
        </Item>
        <Item>
          <Dropdown
            multiSelect
            hideSelectAll={false}
            options={severityOptions}
            value={multiVal}
            onChange={setMultiVal}
            placeholder="검색하세요"
            searchable
            style={{ minWidth: 200 }}
          />
          <Code>multi — searchable + select-all</Code>
        </Item>
        <Item>
          <Dropdown options={sampleOptions} placeholder="검색 비활성" style={{ minWidth: 160 }} />
          <Code>searchable=false (기본)</Code>
        </Item>
      </Row>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── With Divider Options ──────────────────────────────────────────────────────

/** isDivider=true 항목이 옵션 그룹 사이에 구분선으로 렌더링됩니다. */
export const WithDividerOptions: Story = {
  render: () => {
    const [singleVal, setSingleVal] = useState<string | undefined>(undefined)
    const [multiVal, setMultiVal] = useState<string[]>([])

    const dividedOptions = [
      { value: 'critical', label: 'Critical' },
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: '__div1', label: '', isDivider: true },
      { value: 'low', label: 'Low' },
      { value: 'info', label: 'Info' },
    ]

    return (
      <div style={{ paddingBottom: 220 }}>
        <Row>
          <Item>
            <Dropdown
              options={dividedOptions}
              value={singleVal}
              onChange={setSingleVal}
              placeholder="선택하세요"
              forceOpen
              style={{ minWidth: 160 }}
            />
            <Code>single — divider</Code>
          </Item>
          <Item>
            <Dropdown
              multiSelect
              hideSelectAll={false}
              options={dividedOptions}
              value={multiVal}
              onChange={setMultiVal}
              placeholder="선택하세요"
              forceOpen
              style={{ minWidth: 180 }}
            />
            <Code>multi — divider + select-all</Code>
          </Item>
        </Row>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── With Reset Button ─────────────────────────────────────────────────────────

/** onReset 제공 시 선택 항목이 있을 때 "초기화" 버튼이 표시됩니다. */
export const WithResetButton: Story = {
  render: () => {
    const [withAll, setWithAll] = useState<string[]>(['info', 'warn'])
    const [withoutAll, setWithoutAll] = useState<string[]>(['info', 'warn'])

    return (
      <Row>
        <Item>
          <Dropdown
            multiSelect
            hideSelectAll={false}
            options={sampleOptions}
            value={withAll}
            onChange={setWithAll}
            onReset={() => setWithAll([])}
            placeholder="선택하세요"
            style={{ minWidth: 200 }}
          />
          <Code>select-all + reset</Code>
        </Item>
        <Item>
          <Dropdown
            multiSelect
            options={sampleOptions}
            value={withoutAll}
            onChange={setWithoutAll}
            onReset={() => setWithoutAll([])}
            placeholder="선택하세요"
            style={{ minWidth: 180 }}
          />
          <Code>reset (no select-all)</Code>
        </Item>
      </Row>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── Panel Menu Item helper ────────────────────────────────────────────────────

const PanelMenuItem = ({
  label,
  selected,
  disabled,
  onClick,
}: {
  label: string
  selected: boolean
  disabled?: boolean
  onClick: () => void
}) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      role="option"
      aria-selected={selected}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '7px 12px',
        fontSize: 12,
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: disabled ? vars.color.textMuted : selected ? vars.color.primary : vars.color.text,
        fontWeight: selected ? 600 : 400,
        background: !disabled && (hovered || selected) ? vars.color.surfaceHover : 'transparent',
        opacity: disabled ? 0.5 : 1,
        userSelect: 'none',
        transition: 'background 0.1s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={disabled ? undefined : onClick}
    >
      {label}
    </div>
  )
}

// ── With Render Panel ─────────────────────────────────────────────────────────

/** renderPanel 로 드롭다운 안에 완전히 커스텀한 콘텐츠를 렌더링합니다. */
export const WithRenderPanel: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null)
    return (
      <div style={{ paddingBottom: 260 }}>
        <Item>
          <Dropdown
            options={[]}
            placeholder={selected ?? '항목을 선택하세요'}
            renderPanel={(close) => (
              <div style={{ minWidth: 200, padding: '4px 0' }}>
                <div
                  style={{
                    padding: '6px 12px 5px',
                    fontSize: 11,
                    fontWeight: 600,
                    color: vars.color.textMuted,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    borderBottom: `1px solid ${vars.color.border}`,
                    marginBottom: 4,
                  }}
                >
                  커스텀 콘텐츠
                </div>
                {sampleOptions.map((opt) => (
                  <PanelMenuItem
                    key={opt.value}
                    label={opt.label}
                    selected={selected === opt.value}
                    disabled={opt.disabled}
                    onClick={() => {
                      setSelected(opt.value)
                      close()
                    }}
                  />
                ))}
              </div>
            )}
          />
          <Code>renderPanel</Code>
        </Item>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
