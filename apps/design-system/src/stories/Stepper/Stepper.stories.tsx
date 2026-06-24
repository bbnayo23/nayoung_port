import { Fragment, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '../../theme/contract.css'
import Stepper from '../../components/Stepper'
import type { StepperProps } from '../../components/Stepper'

const meta = {
  title: 'StyleGuide/Stepper',
  component: Stepper,
  parameters: { layout: 'padded' },
  argTypes: {
    position: {
      control: 'select',
      options: ['horizontal', 'vertical'] satisfies StepperProps['position'][],
      description: '스텝퍼 방향',
      table: { category: 'Layout' },
    },
    showNumbers: {
      control: 'boolean',
      description: '스텝 번호 표시 여부',
      table: { category: 'Content' },
    },
    children: { control: false, table: { disable: true } },
  },
  args: {
    position: 'horizontal',
    showNumbers: true,
    children: null,
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 position · showNumbers를 조정합니다. */
export const Playground: Story = {
  render: (args) => (
    <Stepper {...args}>
      <Stepper.Step id={1} stepNumber={0} title="1단계" description="시작" isCompleted />
      <Stepper.Connector isCompleted />
      <Stepper.Step id={2} stepNumber={1} title="2단계" description="진행 중" isActive />
      <Stepper.Connector />
      <Stepper.Step id={3} stepNumber={2} title="3단계" description="대기" />
    </Stepper>
  ),
}

// ── StepStates ────────────────────────────────────────────────────────────────

/** completed · active · error · disabled · optional 다섯 가지 상태 비교 */
export const StepStates: Story = {
  render: () => (
    <Stepper>
      <Stepper.Step id={1} stepNumber={0} title="완료" description="isCompleted" isCompleted />
      <Stepper.Connector isCompleted />
      <Stepper.Step id={2} stepNumber={1} title="활성" description="isActive" isActive />
      <Stepper.Connector />
      <Stepper.Step id={3} stepNumber={2} title="오류" description="isError" isError />
      <Stepper.Connector />
      <Stepper.Step id={4} stepNumber={3} title="비활성" description="isDisabled" isDisabled />
      <Stepper.Connector />
      <Stepper.Step id={5} stepNumber={4} title="선택" description="isOptional" isOptional />
    </Stepper>
  ),
  parameters: { controls: { disable: true } },
}

// ── Interactive ───────────────────────────────────────────────────────────────

/** 이전 · 다음 · 완료 버튼으로 스텝을 직접 탐색합니다. 완료된 스텝 클릭으로 되돌아갈 수 있습니다. */
export const Interactive: Story = {
  render: () => {
    const STEPS = [
      { id: 1, title: '트리거 설정', description: '알림 조건과 스케줄을 정의합니다.' },
      { id: 2, title: '응답 액션', description: '실행할 플레이북을 선택합니다.' },
      { id: 3, title: '알림 채널', description: 'Slack · Email 등 알림 수신처를 설정합니다.' },
      { id: 4, title: '검토 & 저장', description: '설정 내용을 확인하고 저장합니다.' },
    ]

    const Demo = () => {
      const [current, setCurrent] = useState(0)
      const isFirst = current === 0
      const isLast = current === STEPS.length - 1
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            padding: 24,
            border: `1px solid ${vars.color.border}`,
            borderRadius: vars.radius.md,
            background: vars.color.surface,
          }}
        >
          <Stepper>
            {STEPS.map((step, i) => (
              <Fragment key={step.id}>
                <Stepper.Step
                  id={step.id}
                  stepNumber={i}
                  title={step.title}
                  description={step.description}
                  isCompleted={i < current}
                  isActive={i === current}
                  isClickable={i < current}
                  onClick={() => {
                    if (i < current) setCurrent(i)
                  }}
                />
                {i < STEPS.length - 1 && <Stepper.Connector isCompleted={i < current} />}
              </Fragment>
            ))}
          </Stepper>

          <Stepper.Content>
            <div
              style={{
                padding: '20px 24px',
                background: vars.color.background,
                borderRadius: vars.radius.sm,
                border: `1px solid ${vars.color.border}`,
              }}
            >
              <strong style={{ fontSize: 13, color: vars.color.text }}>{STEPS[current].title}</strong>
              <p style={{ margin: '6px 0 0', fontSize: 12, color: vars.color.textSecondary }}>
                {STEPS[current].description}
              </p>
            </div>
          </Stepper.Content>

          <Stepper.Controls
            showComplete={isLast}
            showNext={!isLast}
            isPreviousDisabled={isFirst}
            onPrevious={() => setCurrent((c) => Math.max(0, c - 1))}
            onNext={() => setCurrent((c) => Math.min(STEPS.length - 1, c + 1))}
            onComplete={() => alert('완료!')}
            previousButtonText="이전"
            nextButtonText="다음"
            completeButtonText="저장"
          />
        </div>
      )
    }
    return <Demo />
  },
  parameters: { controls: { disable: true } },
}

// ── Vertical ──────────────────────────────────────────────────────────────────

/** position="vertical" 세로 방향 레이아웃 */
export const Vertical: Story = {
  render: () => (
    <Stepper position="vertical">
      <Stepper.Step id={1} stepNumber={0} title="분석" description="이벤트를 수집합니다." isCompleted />
      <Stepper.Connector isCompleted />
      <Stepper.Step id={2} stepNumber={1} title="탐지" description="위협을 탐지합니다." isActive />
      <Stepper.Connector />
      <Stepper.Step id={3} stepNumber={2} title="대응" description="플레이북을 실행합니다." />
      <Stepper.Connector />
      <Stepper.Step id={4} stepNumber={3} title="복구" description="시스템을 복원합니다." />
    </Stepper>
  ),
  parameters: { controls: { disable: true } },
}

// ── WithoutNumbers ────────────────────────────────────────────────────────────

/** showNumbers=false — 번호 대신 완료 시 체크 아이콘만 표시합니다. */
export const WithoutNumbers: Story = {
  render: () => (
    <Stepper showNumbers={false}>
      <Stepper.Step id={1} stepNumber={0} title="분석" isCompleted />
      <Stepper.Connector isCompleted />
      <Stepper.Step id={2} stepNumber={1} title="탐지" isActive />
      <Stepper.Connector />
      <Stepper.Step id={3} stepNumber={2} title="대응" />
      <Stepper.Connector />
      <Stepper.Step id={4} stepNumber={3} title="복구" />
    </Stepper>
  ),
  parameters: { controls: { disable: true } },
}
