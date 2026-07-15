import type { ReactNode, CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '@dc/theme/contract.css'
import Spinner from '@dc/components/Spinner'
import type { SpinnerProps } from '@dc/components/Spinner'

const meta = {
  title: 'StyleGuide/Spinner',
  component: Spinner,
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies SpinnerProps['size'][],
      description: '스피너 크기',
      table: { category: 'Size' },
    },
    type: {
      control: 'select',
      options: ['default', 'dots', 'outline'] satisfies SpinnerProps['type'][],
      description: '유형 — 솔루션에 따라 실제 variant가 달라집니다',
      table: { category: 'Appearance' },
    },
    overlay: {
      control: 'boolean',
      description: '부모 영역을 가리는 오버레이 모드',
      table: { category: 'Layout' },
    },
    color: {
      control: 'color',
      description: '스피너 색상 (CSS 색상값)',
      table: { category: 'Appearance' },
    },
  },
  args: {
    size: 'md',
    type: 'default',
    overlay: false,
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

// ── Helpers ───────────────────────────────────────────────────────────────────

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

const Code = ({ children, style }: { children: string; style?: CSSProperties }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary, ...style }}>{children}</code>
)

const SpinnerPreview = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      width: 80,
      height: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: vars.color.surface,
      border: `1px solid ${vars.color.border}`,
      borderRadius: vars.radius.md,
    }}
  >
    {children}
  </div>
)

const SpinnerOverlayContainer = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      position: 'relative',
      width: 200,
      height: 100,
      borderRadius: vars.radius.md,
      overflow: 'hidden',
      border: `1px solid ${vars.color.border}`,
      background: vars.color.surface,
    }}
  >
    {children}
  </div>
)

const SpinnerOverlayContent = ({ children }: { children: ReactNode }) => (
  <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</div>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 size · type · overlay를 조정합니다. */
export const Playground: Story = {}

// ── TypeSizeMatrix ────────────────────────────────────────────────────────────

/** 모든 type과 size의 조합을 매트릭스로 확인합니다. */
export const TypeSizeMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['default', 'dots', 'outline'] as const).map((type) => (
        <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 60, flexShrink: 0 }}>
            <Code>{type}</Code>
          </div>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <SpinnerPreview>
                <Spinner type={type} size={size} />
              </SpinnerPreview>
              <Label>{size}</Label>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── VariantMatrix ─────────────────────────────────────────────────────────────

/** 모든 variant와 size의 조합 매트릭스. variant prop으로 외형을 직접 지정합니다. */
export const VariantMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ width: 90, flexShrink: 0 }} />
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <div key={size} style={{ width: 80, textAlign: 'center' }}>
            <Code>{size}</Code>
          </div>
        ))}
      </div>
      {(['solid', 'round', 'circle', 'outline', 'flow', 'bounce', 'fadeinout'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 90, flexShrink: 0 }}>
            <Code>{variant}</Code>
          </div>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <SpinnerPreview key={size}>
              <Spinner variant={variant} size={size} />
            </SpinnerPreview>
          ))}
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Overlay ───────────────────────────────────────────────────────────────────

/** overlay=true — 부모 영역을 반투명 레이어로 덮어 로딩 상태를 표시합니다. */
export const Overlay: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Label>컨텐츠 위 오버레이</Label>
        <SpinnerOverlayContainer>
          <SpinnerOverlayContent>
            <p style={{ margin: 0, fontSize: 12, color: vars.color.textSecondary }}>로딩 중인 콘텐츠 영역</p>
            <p style={{ margin: 0, fontSize: 12, color: vars.color.textSecondary }}>이 텍스트는 스피너에 가려집니다.</p>
          </SpinnerOverlayContent>
          <Spinner overlay />
        </SpinnerOverlayContainer>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Label>lg 크기 오버레이</Label>
        <SpinnerOverlayContainer>
          <SpinnerOverlayContent>
            <p style={{ margin: 0, fontSize: 12, color: vars.color.textSecondary }}>테이블 / 그리드 로딩 패턴</p>
          </SpinnerOverlayContent>
          <Spinner overlay size="lg" />
        </SpinnerOverlayContainer>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── CustomColor ───────────────────────────────────────────────────────────────

/** color prop으로 스피너 색상을 직접 지정합니다. */
export const CustomColor: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {(['#ef4444', '#f59e0b', '#22c55e', '#8b5cf6', '#0ea5e9'] as const).map((color) => (
        <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <SpinnerPreview>
            <Spinner color={color} />
          </SpinnerPreview>
          <Code style={{ fontSize: 10 }}>{color}</Code>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── InContext ─────────────────────────────────────────────────────────────────

/** 버튼, 카드, 페이지 로딩 등 실제 사용 맥락에서의 Spinner 예시입니다. */
export const InContext: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Spinner size="sm" />
        <span style={{ fontSize: 13, color: vars.color.textSecondary }}>데이터를 불러오는 중입니다...</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          padding: 32,
          border: `1px solid ${vars.color.border}`,
          borderRadius: vars.radius.md,
          background: vars.color.surface,
        }}
      >
        <Spinner size="lg" />
        <span style={{ fontSize: 13, color: vars.color.textSecondary }}>보안 이벤트 분석 중</span>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}
