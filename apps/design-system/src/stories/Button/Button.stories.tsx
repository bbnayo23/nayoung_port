import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { vars } from '@dc/theme/contract.css'
import { XdrPlusIcon, XdrArrowRightIcon, XdrDownloadIcon, XdrSettingIcon } from '@port/icon-library'
import { Button } from '@dc/components/Button'
import type { ButtonVariant, ButtonSize } from '@dc/components/Button'

const meta = {
  title: 'StyleGuide/Button',
  component: Button,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'] satisfies ButtonVariant[],
      description: '버튼 스타일 변형',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies ButtonSize[],
      description: '버튼 크기',
      table: { category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태',
      table: { category: 'State' },
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태 — 스피너 표시, 클릭 비활성',
      table: { category: 'State' },
    },
    fullWidth: {
      control: 'boolean',
      description: '컨테이너 너비에 맞춤',
      table: { category: 'Layout' },
    },
    children: {
      control: 'text',
      description: '버튼 레이블',
      table: { category: 'Content' },
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
} satisfies Meta<typeof Button>

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

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger']
const SIZES: ButtonSize[] = ['sm', 'md', 'lg']

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 모든 props를 실시간으로 변경할 수 있습니다. */
export const Playground: Story = {}

// ── Variants ──────────────────────────────────────────────────────────────────

/** 5가지 variant를 한눈에 비교합니다. */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {VARIANTS.map((v) => (
        <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Button variant={v}>{v}</Button>
          <Label>{v}</Label>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Sizes ─────────────────────────────────────────────────────────────────────

/** sm · md · lg 크기 비교 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
      {SIZES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Button size={s}>Button</Button>
          <Label>{`size="${s}"`}</Label>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── States ────────────────────────────────────────────────────────────────────

/** className으로 인터랙션 없이 각 상태를 정적으로 표시합니다. */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {(['primary', 'secondary', 'ghost'] as ButtonVariant[]).map((v) => (
        <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Label>{v}</Label>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Button variant={v}>Default</Button>
              <Label>default</Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Button variant={v} className="is-hover">
                Hover
              </Button>
              <Label>hover</Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Button variant={v} disabled>
                Disabled
              </Button>
              <Label>disabled</Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Button variant={v} loading>
                Loading
              </Button>
              <Label>loading</Label>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── WithIcons ─────────────────────────────────────────────────────────────────

/** leftIcon · rightIcon prop으로 아이콘을 추가합니다. */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Button leftIcon={<XdrPlusIcon />}>추가</Button>
        <Label>leftIcon</Label>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Button rightIcon={<XdrArrowRightIcon />} variant="outline">
          다음
        </Button>
        <Label>rightIcon</Label>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Button leftIcon={<XdrDownloadIcon />} variant="secondary">
          다운로드
        </Button>
        <Label>secondary + icon</Label>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Button leftIcon={<XdrSettingIcon />} variant="ghost" size="sm">
          설정
        </Button>
        <Label>ghost sm + icon</Label>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── FullWidth ──────────────────────────────────────────────────────────────────

/** fullWidth prop으로 컨테이너 너비에 꽉 채웁니다. */
export const FullWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
      {(['primary', 'secondary', 'outline', 'ghost'] as ButtonVariant[]).map((v) => (
        <Button key={v} fullWidth variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Interactive ───────────────────────────────────────────────────────────────

/** 클릭 횟수를 카운트하는 인터랙티브 예제 */
export const Interactive: Story = {
  render: () => {
    const [count, setCount] = useState(0)
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Button onClick={() => setCount((c) => c + 1)}>클릭</Button>
        <Label>{`클릭 횟수: ${count}`}</Label>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
