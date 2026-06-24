import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { vars } from '../../theme/contract.css'
import Stepper from '../../components/Stepper'

const meta = {
  title: 'StyleGuide/Stepper',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Layout helpers ────────────────────────────────────────────────────────────

const t = {
  bg: vars.color.background,
  surface: vars.color.surface,
  surfaceHover: vars.color.surfaceHover,
  border: vars.color.border,
  text: vars.color.text,
  textSecondary: vars.color.textSecondary,
  textMuted: vars.color.textMuted,
  primary: vars.color.primary,
  radius: vars.radius.md,
  radiusSm: vars.radius.sm,
} as const

const DocPage = ({ children }: { children: ReactNode }) => (
  <div style={{ height: '100vh', background: t.bg, overflowY: 'auto' }}>
    <div
      style={{
        maxWidth: 860,
        margin: '0 auto',
        padding: '48px 32px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
      }}
    >
      {children}
    </div>
  </div>
)

const Section = ({ children, gap = 16 }: { children: ReactNode; gap?: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>{children}</div>
)

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
    <span
      style={{ display: 'inline-block', width: 3, height: 16, background: t.primary, borderRadius: 2, flexShrink: 0 }}
    />
    <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: t.text, letterSpacing: 0.2 }}>{children}</h2>
  </div>
)

const Card = ({ children }: { children: ReactNode }) => (
  <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: t.radius, padding: '20px 24px' }}>
    {children}
  </div>
)

const CodeBlock = ({ children }: { children: string }) => (
  <pre
    style={{
      margin: 0,
      padding: '14px 18px',
      background: '#1e2228',
      color: '#abb2bf',
      borderRadius: t.radiusSm,
      fontSize: 12,
      fontFamily: "'Fira Code', 'Consolas', monospace",
      lineHeight: 1.7,
      overflowX: 'auto',
      whiteSpace: 'pre',
    }}
  >
    <code>{children}</code>
  </pre>
)

const InlineCode = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: 12,
      background: t.surfaceHover,
      border: `1px solid ${t.border}`,
      borderRadius: 3,
      padding: '1px 5px',
      color: t.text,
    }}
  >
    {children}
  </code>
)

const TypeBadge = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: 11,
      background: 'rgba(113,135,255,0.08)',
      color: '#5a6ee0',
      borderRadius: 3,
      padding: '2px 6px',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </code>
)

const DefaultBadge = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: 11,
      background: t.surfaceHover,
      color: t.textSecondary,
      borderRadius: 3,
      padding: '2px 6px',
    }}
  >
    {children}
  </code>
)

type PropRow = { name: string; type: string; defaultVal?: string; desc: string }

const PropsTable = ({ title, rows }: { title: string; rows: PropRow[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>{title}</p>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr style={{ background: t.surfaceHover }}>
          {['Prop', 'Type', 'Default', '설명'].map((h) => (
            <th
              key={h}
              style={{
                padding: '8px 12px',
                textAlign: 'left',
                fontWeight: 600,
                fontSize: 12,
                color: t.textSecondary,
                borderBottom: `1px solid ${t.border}`,
                letterSpacing: 0.3,
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name} style={{ borderBottom: `1px solid ${t.border}` }}>
            <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
              <InlineCode>{row.name}</InlineCode>
            </td>
            <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
              <TypeBadge>{row.type}</TypeBadge>
            </td>
            <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
              {row.defaultVal ? (
                <DefaultBadge>{row.defaultVal}</DefaultBadge>
              ) : (
                <span style={{ color: t.textMuted }}>—</span>
              )}
            </td>
            <td style={{ padding: '10px 12px', verticalAlign: 'top', color: t.textSecondary, lineHeight: 1.6 }}>
              {row.desc}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// ── Interactive demo components ───────────────────────────────────────────────

const STEPS = ['기본 정보', '설정', '검토', '완료']

const InteractiveHorizontal = () => {
  const [active, setActive] = useState(1)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Stepper position="horizontal" showNumbers>
        {STEPS.map((title, i) => (
          <>
            <Stepper.Step
              key={title}
              id={i}
              title={title}
              stepNumber={i}
              isActive={active === i}
              isCompleted={active > i}
              isClickable={active > i}
              onClick={() => setActive(i)}
            />
            {i < STEPS.length - 1 && <Stepper.Connector key={`c-${i}`} isCompleted={active > i} />}
          </>
        ))}
      </Stepper>
      <Stepper.Content>
        <p style={{ margin: 0, fontSize: 13, color: t.textSecondary }}>
          현재 단계: <strong style={{ color: t.text }}>{STEPS[active]}</strong>
        </p>
      </Stepper.Content>
      <Stepper.Controls
        showPrevious={active > 0}
        showNext={active < STEPS.length - 1}
        showComplete={active === STEPS.length - 1}
        isPreviousDisabled={active === 0}
        onPrevious={() => setActive((v) => Math.max(0, v - 1))}
        onNext={() => setActive((v) => Math.min(STEPS.length - 1, v + 1))}
        onComplete={() => alert('완료!')}
        previousButtonText="이전"
        nextButtonText="다음"
        completeButtonText="완료"
      />
    </div>
  )
}

const InteractiveVertical = () => {
  const [active, setActive] = useState(0)

  return (
    <Stepper position="vertical" showNumbers>
      {STEPS.map((title, i) => (
        <>
          <Stepper.Step
            key={title}
            id={i}
            title={title}
            description={i === active ? '현재 진행 중인 단계입니다.' : undefined}
            stepNumber={i}
            isActive={active === i}
            isCompleted={active > i}
            isClickable={active > i}
            onClick={() => setActive(i)}
          />
          {i < STEPS.length - 1 && <Stepper.Connector key={`c-${i}`} isCompleted={active > i} />}
        </>
      ))}
    </Stepper>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Stepper</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          다단계 작업의 진행 상태를 시각화하는 컴포넌트입니다. 수평·수직 방향을 지원하며{' '}
          <InlineCode>Stepper.Step</InlineCode> · <InlineCode>Stepper.Connector</InlineCode> ·{' '}
          <InlineCode>Stepper.Content</InlineCode> · <InlineCode>Stepper.Controls</InlineCode> 의 compound 패턴으로
          구성합니다.
        </p>
        <CodeBlock>{`import Stepper from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <PropsTable
              title="Stepper"
              rows={[
                {
                  name: 'position',
                  type: "'horizontal' | 'vertical'",
                  defaultVal: "'horizontal'",
                  desc: '스텝 배치 방향',
                },
                { name: 'showNumbers', type: 'boolean', defaultVal: 'true', desc: '스텝 아이콘에 번호 표시 여부' },
                {
                  name: 'children',
                  type: 'ReactNode',
                  desc: 'Stepper.Step, Stepper.Connector 등을 children으로 전달합니다.',
                },
              ]}
            />
            <PropsTable
              title="Stepper.Step"
              rows={[
                { name: 'id', type: 'string | number', desc: '스텝 식별자' },
                { name: 'title', type: 'string', desc: '스텝 제목' },
                { name: 'description', type: 'string', desc: '스텝 부가 설명 (선택)' },
                { name: 'stepNumber', type: 'number', desc: '표시할 순서 번호 (0-based)' },
                { name: 'isActive', type: 'boolean', desc: '현재 활성 스텝' },
                { name: 'isCompleted', type: 'boolean', desc: '완료된 스텝 — 체크 아이콘 표시' },
                { name: 'isError', type: 'boolean', desc: '오류 상태 — X 아이콘 표시' },
                { name: 'isDisabled', type: 'boolean', desc: '비활성화 상태' },
                { name: 'isOptional', type: 'boolean', desc: '(Optional) 표시' },
                { name: 'isClickable', type: 'boolean', desc: '클릭 가능 여부' },
                { name: 'onClick', type: '() => void', desc: '스텝 클릭 핸들러' },
              ]}
            />
            <PropsTable
              title="Stepper.Connector"
              rows={[{ name: 'isCompleted', type: 'boolean', desc: '완료된 구간 — 강조 선 표시' }]}
            />
            <PropsTable
              title="Stepper.Controls"
              rows={[
                { name: 'onPrevious / onNext / onComplete', type: '() => void', desc: '이전·다음·완료 버튼 핸들러' },
                {
                  name: 'previousButtonText / nextButtonText / completeButtonText',
                  type: 'string',
                  defaultVal: "'Previous' / 'Next' / 'Complete'",
                  desc: '버튼 레이블',
                },
                {
                  name: 'showPrevious / showNext / showComplete',
                  type: 'boolean',
                  defaultVal: 'true',
                  desc: '버튼 표시 여부',
                },
                {
                  name: 'isPreviousDisabled / isNextDisabled / isCompleteDisabled',
                  type: 'boolean',
                  desc: '버튼 비활성화 여부',
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      {/* 수평 인터랙티브 */}
      <Section gap={16}>
        <SectionTitle>수평 방향 (기본)</SectionTitle>
        <Card>
          <CodeBlock>{`const [active, setActive] = useState(0);

<Stepper position="horizontal" showNumbers>
  {steps.map((title, i) => (
    <>
      <Stepper.Step
        key={title}
        id={i}
        title={title}
        stepNumber={i}
        isActive={active === i}
        isCompleted={active > i}
        isClickable={active > i}
        onClick={() => setActive(i)}
      />
      {i < steps.length - 1 && (
        <Stepper.Connector key={\`c-\${i}\`} isCompleted={active > i} />
      )}
    </>
  ))}
</Stepper>
<Stepper.Controls
  onPrevious={() => setActive(v => v - 1)}
  onNext={() => setActive(v => v + 1)}
  previousButtonText="이전"
  nextButtonText="다음"
/>`}</CodeBlock>
          <div style={{ marginTop: 20 }}>
            <InteractiveHorizontal />
          </div>
        </Card>
      </Section>

      {/* 수직 방향 */}
      <Section gap={16}>
        <SectionTitle>수직 방향</SectionTitle>
        <Card>
          <CodeBlock>{`<Stepper position="vertical" showNumbers>
  <Stepper.Step id={0} title="기본 정보" stepNumber={0} isCompleted />
  <Stepper.Connector isCompleted />
  <Stepper.Step id={1} title="설정" stepNumber={1} isActive description="현재 진행 중인 단계입니다." />
  <Stepper.Connector />
  <Stepper.Step id={2} title="검토" stepNumber={2} />
</Stepper>`}</CodeBlock>
          <div style={{ marginTop: 20 }}>
            <InteractiveVertical />
          </div>
        </Card>
      </Section>

      {/* 스텝 상태 */}
      <Section gap={16}>
        <SectionTitle>스텝 상태</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {(
              [
                { label: 'isCompleted', props: { isCompleted: true } },
                { label: 'isActive', props: { isActive: true } },
                { label: 'isError', props: { isError: true } },
                { label: 'isDisabled', props: { isDisabled: true } },
                { label: 'isOptional', props: { isOptional: true } },
              ] as const
            ).map(({ label, props }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 100, flexShrink: 0 }}>
                  <InlineCode>{label}</InlineCode>
                </div>
                <Stepper position="horizontal" showNumbers>
                  <Stepper.Step id={0} title="완료 단계" stepNumber={0} isCompleted />
                  <Stepper.Connector isCompleted />
                  <Stepper.Step id={1} title="현재 단계" stepNumber={1} {...props} />
                  <Stepper.Connector />
                  <Stepper.Step id={2} title="다음 단계" stepNumber={2} />
                </Stepper>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* 번호 숨김 */}
      <Section gap={16}>
        <SectionTitle>showNumbers=false</SectionTitle>
        <Card>
          <CodeBlock>{`<Stepper position="horizontal" showNumbers={false}>
  <Stepper.Step id={0} title="기본 정보" stepNumber={0} isCompleted />
  <Stepper.Connector isCompleted />
  <Stepper.Step id={1} title="설정" stepNumber={1} isActive />
  <Stepper.Connector />
  <Stepper.Step id={2} title="완료" stepNumber={2} />
</Stepper>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <Stepper position="horizontal" showNumbers={false}>
              <Stepper.Step id={0} title="기본 정보" stepNumber={0} isCompleted />
              <Stepper.Connector isCompleted />
              <Stepper.Step id={1} title="설정" stepNumber={1} isActive />
              <Stepper.Connector />
              <Stepper.Step id={2} title="완료" stepNumber={2} />
            </Stepper>
          </div>
        </Card>
      </Section>
    </DocPage>
  ),
}
