import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import { SearchBar } from '../../components/SearchBar'
import type { SearchBarProps } from '../../components/SearchBar'

const meta = {
  title: 'StyleGuide/SearchBar',
  component: SearchBar,
  parameters: { layout: 'padded' },
  argTypes: {
    placeholder: {
      control: 'text',
      description: '입력 필드 플레이스홀더',
      table: { category: 'Content' },
    },
    searchLabel: {
      control: 'text',
      description: '검색 버튼 aria-label 및 아이콘 옆 텍스트',
      table: { category: 'Content' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies SearchBarProps['size'][],
      description: '크기 variant',
      table: { category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
      table: { category: 'State' },
    },
    hideButton: {
      control: 'boolean',
      description: '검색 버튼 숨김 여부',
      table: { category: 'Appearance' },
    },
    expandable: {
      control: 'boolean',
      description: '확장 버튼 표시 여부 (클릭 시 textarea로 전환)',
      table: { category: 'Features' },
    },
    onSearch: { table: { disable: true } },
    onClear: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onExpandChange: { table: { disable: true } },
    leftOuterActions: { table: { disable: true } },
    leftActions: { table: { disable: true } },
    prefix: { table: { disable: true } },
    suffixActions: { table: { disable: true } },
    rightActions: { table: { disable: true } },
  },
  args: {
    placeholder: '검색어를 입력하세요',
    size: 'md',
    disabled: false,
    hideButton: false,
    expandable: false,
  },
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 모든 props를 실시간으로 조정합니다. */
export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    const [lastSearch, setLastSearch] = useState<string | null>(null)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
        <SearchBar
          {...args}
          value={value}
          onChange={setValue}
          onSearch={(v) => setLastSearch(v)}
          onClear={() => setLastSearch(null)}
        />
        {lastSearch !== null && (
          <p style={{ margin: 0, fontSize: 12, color: vars.color.textSecondary }}>
            검색: <strong style={{ color: vars.color.text }}>{lastSearch || '(빈 값)'}</strong>
          </p>
        )}
      </div>
    )
  },
}

// ── Sizes ─────────────────────────────────────────────────────────────────────

/** sm · md · lg 크기 비교 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Label>{`size="${size}"`}</Label>
          <SearchBar size={size} placeholder={`${size} 검색`} />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Expandable ────────────────────────────────────────────────────────────────

/** expandable=true — 확장 버튼 클릭 시 textarea 모드로 전환 */
export const Expandable: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}>
        <Label>expandable</Label>
        <SearchBar
          value={value}
          onChange={setValue}
          expandable
          placeholder="확장 버튼을 클릭하면 textarea로 전환됩니다"
          onSearch={(v) => alert(`검색: ${v}`)}
        />
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── WithSlots ─────────────────────────────────────────────────────────────────

/** 다양한 슬롯 조합 예시 */
export const WithSlots: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Label>prefix + searchLabel</Label>
          <SearchBar
            value={value}
            onChange={setValue}
            searchLabel="검색"
            prefix={
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '1px 5px',
                  background: 'rgba(0,183,153,0.12)',
                  color: vars.color.primary,
                  borderRadius: 3,
                }}
              >
                AI
              </span>
            }
            placeholder="AI 검색어를 입력하세요"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Label>leftOuterActions</Label>
          <SearchBar value={value} onChange={setValue} leftOuterActions={<button type="button">+ 추가</button>} />
        </div>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── Disabled ──────────────────────────────────────────────────────────────────

/** 비활성화 상태 */
export const Disabled: Story = {
  render: () => <SearchBar defaultValue="검색어 예시" disabled />,
  parameters: { controls: { disable: true } },
}
