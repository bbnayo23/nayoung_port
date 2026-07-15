import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { vars } from '@dc/theme/contract.css'
import Badge from '@dc/components/Badge'
import { XdrPropertyUserIcon } from '@port/icon-library'

const meta = {
  title: 'StyleGuide/Badge',
  component: Badge,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'dot',
        'dot-outline',
        'status',
        'status-round',
        'status-score',
        'icon',
        'outline',
        'fill',
        'alert',
        'step',
        'circle',
        'tag',
        'detail-tag',
      ],
      description: '뱃지 형태',
      table: { category: 'Appearance' },
    },
    color: {
      control: 'select',
      options: [
        'red',
        'orange',
        'yellow',
        'green',
        'purple',
        'blue',
        'navy',
        'gray',
        'medium-gray',
        'light-blue',
        'pink',
      ],
      description: '색상',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '크기',
      table: { category: 'Appearance' },
    },
    closable: {
      control: 'boolean',
      description: '닫기 버튼 표시',
      table: { category: 'Behavior' },
    },
  },
  args: {
    children: 'Badge',
    variant: 'fill',
    color: 'blue',
    size: 'md',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code
    style={{
      display: 'inline-block',
      marginTop: 4,
      fontSize: 11,
      fontFamily: 'monospace',
      color: vars.color.textSecondary,
    }}
  >
    {children}
  </code>
)

const COLORS = ['red', 'orange', 'yellow', 'green', 'purple', 'blue', 'navy', 'gray', 'pink'] as const

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 variant · color · size를 조정합니다. */
export const Playground: Story = {}

// ── Fill ──────────────────────────────────────────────────────────────────────

/** 채우기 형태 — 강조 레이블, 상태 표시에 사용합니다. */
export const Fill: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {COLORS.map((v) => (
        <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Badge variant="fill" color={v}>
            {v}
          </Badge>
          <Label>{v}</Label>
        </div>
      ))}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <Badge variant="fill" color="medium-gray">
          medium-gray
        </Badge>
        <Label>medium-gray</Label>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <Badge variant="fill" color="light-blue">
          light-blue
        </Badge>
        <Label>light-blue</Label>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Outline ───────────────────────────────────────────────────────────────────

/** 테두리만 있는 형태 — 덜 강조된 상태나 보조 레이블에 사용합니다. */
export const Outline: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {COLORS.map((v) => (
        <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Badge variant="outline" color={v}>
            {v}
          </Badge>
          <Label>{v}</Label>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Status ────────────────────────────────────────────────────────────────────

/** 상태 표시용 배지 */
export const Status: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>status</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {COLORS.map((v) => (
            <Badge key={v} variant="status" color={v}>
              {v}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <Label>status-round</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {COLORS.map((v) => (
            <Badge key={v} variant="status-round" color={v}>
              {v}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Status Score ──────────────────────────────────────────────────────────────

/** 숫자 점수를 원형 테두리로 강조. 내부에 &lt;span className="score"&gt; 를 사용합니다. */
export const StatusScore: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {COLORS.map((v) => (
        <Badge key={v} variant="status-score" color={v}>
          <span className="score">77</span>
          Label
        </Badge>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Icon ──────────────────────────────────────────────────────────────────────

/** 아이콘 단독 또는 아이콘 + 텍스트 형태. SVG가 currentColor로 자동 채색됩니다. */
export const Icon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {COLORS.map((v) => (
          <Badge key={v} variant="icon" color={v}>
            <XdrPropertyUserIcon />
            Label
          </Badge>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {COLORS.map((v) => (
          <Badge key={v} variant="icon" color={v}>
            <XdrPropertyUserIcon />
          </Badge>
        ))}
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Dot ───────────────────────────────────────────────────────────────────────

/** 텍스트 앞에 컬러 점을 표시합니다 */
export const Dot: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>dot</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 8 }}>
          {COLORS.map((v) => (
            <Badge key={v} variant="dot" color={v}>
              {v}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <Label>dot-outline</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {COLORS.map((v) => (
            <Badge key={v} variant="dot-outline" color={v}>
              {v}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Tag ───────────────────────────────────────────────────────────────────────

/** 태그 형태 */
export const Tag: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>tag</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {COLORS.map((v) => (
            <Badge key={v} variant="tag" color={v}>
              {v}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <Label>detail-tag</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {(['red', 'orange', 'yellow', 'green', 'purple', 'blue', 'navy', 'gray'] as const).map((v) => (
            <Badge key={v} variant="detail-tag" color={v}>
              {v}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Sizes ─────────────────────────────────────────────────────────────────────

/** sm · md · lg 크기 비교 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Badge variant="fill" color="blue" size={s}>
            {s}
          </Badge>
          <Label>{`size="${s}"`}</Label>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Closable ──────────────────────────────────────────────────────────────────

/** onRemove prop으로 닫기 버튼이 있는 태그를 시뮬레이션합니다. */
export const Closable: Story = {
  render: () => {
    const initial = ['보안', '네트워크', '위협', '인시던트', '알림']
    const [tags, setTags] = useState<string[]>(initial)
    const remove = (label: string) => setTags((prev) => prev.filter((t) => t !== label))
    const COLORS_LIST = ['blue', 'green', 'purple', 'orange', 'red'] as const
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {tags.map((label, i) => (
            <Badge key={label} variant="tag" color={COLORS_LIST[i % COLORS_LIST.length]} onRemove={() => remove(label)}>
              {label}
            </Badge>
          ))}
        </div>
        {tags.length === 0 && (
          <p style={{ margin: 0, fontSize: 12, color: vars.color.textMuted, fontStyle: 'italic' }}>
            모든 태그가 제거되었습니다.
          </p>
        )}
        <button
          style={{
            alignSelf: 'flex-start',
            fontSize: 12,
            padding: '4px 10px',
            cursor: 'pointer',
            border: `1px solid ${vars.color.border}`,
            borderRadius: 4,
            background: vars.color.surface,
            color: vars.color.text,
          }}
          onClick={() => setTags(initial)}
        >
          초기화
        </button>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
