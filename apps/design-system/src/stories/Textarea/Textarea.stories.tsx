import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import Textarea from '../../components/Textarea'
import type { TextareaProps } from '../../components/Textarea'

const meta = {
  title: 'StyleGuide/Textarea',
  component: Textarea,
  parameters: { layout: 'padded' },
  argTypes: {
    resize: {
      control: 'select',
      options: ['none', 'both', 'horizontal', 'vertical'] satisfies TextareaProps['resize'][],
      description: '크기 조절 방향',
      table: { category: 'Appearance' },
    },
    height: {
      control: 'text',
      description: "높이 ('auto' 또는 px 숫자)",
      table: { category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
      table: { category: 'State' },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
      table: { category: 'Content' },
    },
    rows: {
      control: 'number',
      description: '기본 표시 행 수',
      table: { category: 'Appearance' },
    },
  },
  args: {
    placeholder: '텍스트를 입력하세요...',
    resize: 'vertical',
    disabled: false,
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 모든 props를 실시간으로 조정합니다. */
export const Playground: Story = {}

// ── Resize ────────────────────────────────────────────────────────────────────

/** none · both · horizontal · vertical 네 가지 resize 옵션 비교 */
export const Resize: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      {(['none', 'both', 'horizontal', 'vertical'] as const).map((r) => (
        <div key={r} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Label>{`resize="${r}"`}</Label>
          <Textarea resize={r} placeholder={`resize: ${r}`} />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Height ────────────────────────────────────────────────────────────────────

/** height="auto" vs 고정 높이 비교 */
export const Height: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>height="auto"</Label>
        <Textarea height="auto" placeholder="내용에 따라 높이가 자동 조절됩니다." rows={2} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>{`height={120}`}</Label>
        <Textarea height={120} placeholder="고정 높이 120px" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>{`height={200}`}</Label>
        <Textarea height={200} placeholder="고정 높이 200px — 긴 내용 입력 영역에 사용합니다." />
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── States ────────────────────────────────────────────────────────────────────

/** 기본 · 비활성화 상태 비교 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>default</Label>
        <Textarea placeholder="기본 상태" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>disabled</Label>
        <Textarea disabled placeholder="비활성화된 텍스트 영역" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>with value</Label>
        <Textarea
          defaultValue="보안 인시던트 분석 결과를 입력합니다. 위협 탐지 엔진이 이상 트래픽을 감지하였습니다."
          rows={3}
        />
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}
