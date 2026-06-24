import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import Divider from '../../components/Divider'
import type { DividerProps } from '../../components/Divider'

const meta = {
  title: 'StyleGuide/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'] satisfies DividerProps['direction'][],
      description: '구분선 방향',
      table: { category: 'Layout' },
    },
    size: {
      control: { type: 'number', min: 1, max: 8 },
      description: '선 두께 (px)',
      table: { category: 'Appearance' },
    },
    margin: {
      control: { type: 'number', min: 0, max: 40 },
      description: '상하(horizontal) 또는 좌우(vertical) 여백 (px)',
      table: { category: 'Spacing' },
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: '투명도 (0–1)',
      table: { category: 'Appearance' },
    },
    color: {
      control: 'color',
      description: '선 색상 (CSS color 값) — 미지정 시 토큰 색상 사용',
      table: { category: 'Appearance' },
    },
  },
  args: {
    direction: 'horizontal',
    size: 1,
    margin: 0,
    opacity: 1,
  },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 direction · size · margin · opacity · color를 조정합니다. */
export const Playground: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: vars.color.text }}>
      <span>위 콘텐츠</span>
      <Divider {...args} />
      <span>아래 콘텐츠</span>
    </div>
  ),
}

// ── Directions ────────────────────────────────────────────────────────────────

/** horizontal · vertical 두 방향을 나란히 비교합니다. */
export const Directions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 40 }}>
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 200, fontSize: 13, color: vars.color.text }}
      >
        <Label>horizontal</Label>
        <span>위</span>
        <Divider direction="horizontal" />
        <span>아래</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Label>vertical</Label>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 12, height: 32, fontSize: 13, color: vars.color.text }}
        >
          <span>왼쪽</span>
          <Divider direction="vertical" />
          <span>오른쪽</span>
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Thickness ─────────────────────────────────────────────────────────────────

/** size prop으로 선 두께를 조절합니다. */
export const Thickness: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {([1, 2, 4, 8] as const).map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Label>{`size={${s}}`}</Label>
          <Divider size={s} />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Opacity ───────────────────────────────────────────────────────────────────

/** opacity prop으로 선의 투명도를 조절합니다. */
export const Opacity: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {([1, 0.6, 0.3, 0.1] as const).map((o) => (
        <div key={o} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Label>{`opacity={${o}}`}</Label>
          <Divider opacity={o} />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── CustomColor ───────────────────────────────────────────────────────────────

/** color prop으로 선 색상을 직접 지정합니다. */
export const CustomColor: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[
        { label: '기본값 (토큰 색상)', color: undefined },
        { label: 'primary', color: vars.color.primary },
        { label: 'error', color: vars.color.error },
        { label: 'warning', color: vars.color.warning },
        { label: 'success', color: vars.color.success },
      ].map(({ label, color }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Label>{color ? `color="${label}"` : 'color 미지정'}</Label>
          <Divider color={color} size={2} />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── InContext ─────────────────────────────────────────────────────────────────

/** 폼 섹션 구분, 버튼 그룹 구분 등 실제 사용 맥락의 예시입니다. */
export const InContext: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Label>폼 섹션 구분</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: vars.color.text }}>기본 정보</div>
          <div style={{ fontSize: 12, color: vars.color.textSecondary }}>이름 · 이메일 · 전화번호</div>
          <Divider margin={4} />
          <div style={{ fontSize: 13, fontWeight: 600, color: vars.color.text }}>보안 설정</div>
          <div style={{ fontSize: 12, color: vars.color.textSecondary }}>비밀번호 · 2FA</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Label>margin 활용</Label>
        <div style={{ maxWidth: 320, fontSize: 12, color: vars.color.text }}>
          <p style={{ margin: 0 }}>첫 번째 항목</p>
          <Divider margin={12} />
          <p style={{ margin: 0 }}>두 번째 항목</p>
          <Divider margin={12} />
          <p style={{ margin: 0 }}>세 번째 항목</p>
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── WithOpacityInteractive ────────────────────────────────────────────────────

/** 슬라이더로 투명도를 실시간 변경합니다. */
export const WithOpacityInteractive: Story = {
  render: () => {
    const [opacity, setOpacity] = useState(1)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ fontSize: 12, color: vars.color.textSecondary, width: 60 }}>opacity</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <span style={{ fontSize: 12, fontFamily: 'monospace', color: vars.color.text, width: 32 }}>
            {opacity.toFixed(2)}
          </span>
        </div>
        <div style={{ padding: '8px 0', fontSize: 13, color: vars.color.text }}>
          <span>위 콘텐츠</span>
          <Divider opacity={opacity} />
          <span>아래 콘텐츠</span>
        </div>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
