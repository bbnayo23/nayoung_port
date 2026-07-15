import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '@dc/theme/contract.css'
import Skeleton from '@dc/components/Skeleton'
import type { SkeletonProps } from '@dc/components/Skeleton'
import { CardSkeleton } from '@dc/components/Card'

const meta = {
  title: 'StyleGuide/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['rectangular', 'rounded', 'circle'] satisfies SkeletonProps['variant'][],
      description: '모서리 둥글기 변형',
      table: { category: 'Appearance' },
    },
    width: {
      control: 'text',
      description: '너비 (px 숫자 또는 CSS 문자열)',
      table: { category: 'Appearance' },
    },
    height: {
      control: 'text',
      description: '높이 (px 숫자 또는 CSS 문자열)',
      table: { category: 'Appearance' },
    },
  },
  args: {
    variant: 'rounded',
    width: '100%',
    height: '16px',
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 variant · width · height를 실시간으로 조정합니다. */
export const Playground: Story = {}

// ── Variants ─────────────────────────────────────────────────────────────────

/** rectangular · rounded · circle 세 가지 variant 비교 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['rectangular', 'rounded', 'circle'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Label>{`variant="${variant}"`}</Label>
          <Skeleton
            variant={variant}
            width={variant === 'circle' ? 48 : '100%'}
            height={variant === 'circle' ? 48 : 16}
          />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── CardSkeleton ──────────────────────────────────────────────────────────────

/** CardSkeleton 컴포넌트 — Card 로딩 상태 placeholder */
export const CardSkeletonStory: Story = {
  name: 'CardSkeleton',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 240 }}>
        <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>skeletonCount=2</code>
        <CardSkeleton skeletonCount={2} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 240 }}>
        <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>
          timeDiff + skeletonCount=3
        </code>
        <CardSkeleton timeDiff skeletonCount={3} />
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── TextLines ─────────────────────────────────────────────────────────────────

/** 텍스트 단락을 모방한 여러 줄 스켈레톤 */
export const TextLines: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}>
      <Skeleton variant="rounded" width="50%" height={20} />
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Skeleton variant="rounded" width="100%" height={13} />
        <Skeleton variant="rounded" width="95%" height={13} />
        <Skeleton variant="rounded" width="80%" height={13} />
        <Skeleton variant="rounded" width="70%" height={13} />
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── DashboardPlaceholder ──────────────────────────────────────────────────────

/** 대시보드 KPI 카드 형태의 skeleton */
export const DashboardPlaceholder: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            flex: '1 1 160px',
            padding: 16,
            border: `1px solid ${vars.color.border}`,
            borderRadius: vars.radius.md,
            background: vars.color.surface,
          }}
        >
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
            <Skeleton variant="circle" width={24} height={24} />
            <Skeleton variant="rounded" width="60%" height={11} />
          </div>
          <Skeleton variant="rounded" width="50%" height={28} />
          <div style={{ marginTop: 8 }}>
            <Skeleton variant="rounded" width="80%" height={10} />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}
