import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import Progress from '../../components/Progress'
import type { ProgressProps } from '../../components/Progress'

const meta = {
  title: 'StyleGuide/Progress',
  component: Progress,
  parameters: { layout: 'padded' },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '0~100 사이의 진행 값 (필수)',
      table: { category: 'Data' },
    },
    color: {
      control: 'select',
      options: ['success', 'danger', 'warning', 'info'] satisfies ProgressProps['color'][],
      description: '프로그래스바 색상',
      table: { category: 'Appearance' },
    },
    shape: {
      control: 'select',
      options: ['linear', 'linear-round'] satisfies ProgressProps['shape'][],
      description: '형태 (모서리 처리)',
      table: { category: 'Appearance' },
    },
    shadow: {
      control: 'boolean',
      description: '배경 그림자 사용 여부',
      table: { category: 'Appearance' },
    },
    transition: {
      control: 'boolean',
      description: '애니메이션 설정. false=없음 / true=기본(0.4s ease) / 객체=커스텀',
      table: { category: 'Behavior' },
    },
    onComplete: { table: { disable: true } },
  },
  args: {
    value: 60,
    color: 'success',
    shape: 'linear-round',
    shadow: true,
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 모든 props를 실시간으로 조정합니다. */
export const Playground: Story = {}

// ── Colors ────────────────────────────────────────────────────────────────────

/** 색상 variant 비교 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {(['success', 'danger', 'warning', 'info'] as const).map((color) => (
        <div key={color} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Label>{`color="${color}"`}</Label>
          <Progress value={65} color={color} />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Shapes ────────────────────────────────────────────────────────────────────

/** linear vs linear-round 비교 */
export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {(['linear', 'linear-round'] as const).map((shape) => (
        <div key={shape} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Label>{`shape="${shape}"`}</Label>
          <Progress value={70} shape={shape} />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Stack ─────────────────────────────────────────────────────────────────────

/** Progress.Stack + Progress.Item 컴파운드 패턴 — 여러 항목을 하나의 바에 쌓습니다. */
export const Stack: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Label>{'Progress.Stack + Progress.Item'}</Label>
      <Progress.Stack>
        <Progress.Item value={40} color="success" />
        <Progress.Item value={25} color="warning" />
        <Progress.Item value={15} color="danger" />
      </Progress.Stack>
      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: vars.color.textSecondary }}>
        {(
          [
            { color: 'success', label: '정상 (40%)' },
            { color: 'warning', label: '경고 (25%)' },
            { color: 'danger', label: '위험 (15%)' },
          ] as const
        ).map(({ color, label }) => (
          <span key={color} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background:
                  color === 'success'
                    ? vars.color.success
                    : color === 'warning'
                      ? vars.color.warning
                      : vars.color.error,
                flexShrink: 0,
              }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── Transition ────────────────────────────────────────────────────────────────

/** transition 옵션 비교 — 버튼을 눌러 애니메이션을 확인합니다. */
export const Transition: Story = {
  render: () => {
    const [running, setRunning] = useState(false)
    const [values, setValues] = useState({ none: 0, default: 0, slow: 0, bounce: 0 })

    const start = () => {
      setValues({ none: 0, default: 0, slow: 0, bounce: 0 })
      setRunning(false)
      // 다음 틱에 목표값으로 세팅해 transition이 시작되도록
      setTimeout(() => {
        setValues({ none: 75, default: 75, slow: 75, bounce: 75 })
        setRunning(true)
      }, 50)
    }

    const items: { key: keyof typeof values; label: string; transition: ProgressProps['transition'] }[] = [
      { key: 'none', label: 'transition={false}', transition: false },
      { key: 'default', label: 'transition={true}  (0.4s ease)', transition: true },
      { key: 'slow', label: 'transition={{ duration: "1.2s" }}', transition: { duration: '1.2s' } },
      {
        key: 'bounce',
        label: 'transition={{ duration: "0.8s", easing: "cubic-bezier(0.34,1.56,0.64,1)" }}',
        transition: { duration: '0.8s', easing: 'cubic-bezier(0.34,1.56,0.64,1)' },
      },
    ]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 520 }}>
        <button
          type="button"
          onClick={start}
          style={{
            alignSelf: 'flex-start',
            padding: '6px 16px',
            fontSize: 13,
            border: `1px solid ${vars.color.border}`,
            borderRadius: 6,
            background: vars.color.surface,
            color: vars.color.text,
            cursor: 'pointer',
          }}
        >
          {running ? '다시 실행' : '애니메이션 시작'}
        </button>
        {items.map(({ key, label, transition }) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Label>{label}</Label>
            <Progress value={values[key]} color="info" transition={transition} />
          </div>
        ))}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── Interactive ───────────────────────────────────────────────────────────────

/** 실시간으로 value를 변경하는 인터랙티브 예제 */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(30)
    const [completed, setCompleted] = useState(false)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
        <Progress
          value={value}
          color={value === 100 ? 'success' : value > 60 ? 'warning' : 'info'}
          onComplete={() => setCompleted(true)}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => {
              setValue(Number(e.target.value))
              if (Number(e.target.value) < 100) setCompleted(false)
            }}
            style={{ flex: 1 }}
          />
          <span style={{ fontSize: 13, color: vars.color.text, minWidth: 36 }}>{value}%</span>
        </div>
        {completed && <p style={{ margin: 0, fontSize: 12, color: vars.color.success }}>onComplete 콜백 호출됨</p>}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
