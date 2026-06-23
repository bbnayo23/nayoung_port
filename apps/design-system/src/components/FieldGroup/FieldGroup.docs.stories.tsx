import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { FieldGroup } from './FieldGroup'
import { Select } from '../Select'
import { Input } from '../Input'

const meta = {
  title: 'StyleGuide/FieldGroup',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const t = {
  bg: vars.color.background,
  surface: vars.color.surface,
  surfaceHover: vars.color.surfaceMuted,
  border: vars.color.border,
  text: vars.color.text,
  textSecondary: vars.color.textSecondary,
  textMuted: vars.color.textDisabled,
  primary: vars.color.brand[600],
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

const DocCard = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div
    style={{
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: t.radius,
      padding: '20px 24px',
      ...style,
    }}
  >
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
      fontFamily: "'Fira Code','Consolas',monospace",
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
      wordBreak: 'break-word' as const,
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
const PropsTable = ({ rows }: { rows: PropRow[] }) => (
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
)

const logTypes = [
  { label: '전체', value: 'all' },
  { label: 'INFO', value: 'info' },
  { label: 'WARN', value: 'warn' },
  { label: 'ERROR', value: 'error' },
]

const logSources = [
  { label: '전체', value: 'all' },
  { label: 'fw', value: 'fw' },
  { label: 'ips', value: 'ips' },
  { label: 'waf', value: 'waf' },
]

const DocumentationView = () => {
  const [selectValue, setSelectValue] = useState('all')
  const [labelSource, setLabelSource] = useState('all')
  const [labelType, setLabelType] = useState('all')
  const [type, setType] = useState('all')
  const [source, setSource] = useState('all')
  const [checks, setChecks] = useState<string[]>([])
  const toggleCheck = (v: string) =>
    setChecks((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))

  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>FieldGroup</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          라벨과 입력 컨트롤을 하나의 테두리 안에 가로로 묶어주는 인라인 필드 컨테이너입니다. 좌측에 라벨, 우측에
          Select · Input · 체크박스 등 임의의 컨트롤을 배치하며, 내부 컨트롤이 포커스되면 그룹 전체가 포커스 링을
          표시합니다. sm · md · lg 세 가지 size 로 라벨 패딩 밀도를 조절합니다.
        </p>
        <CodeBlock>{`import { FieldGroup } from '@port/design-system/components/FieldGroup'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — FieldGroup</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'label',
                type: 'ReactNode',
                desc: '좌측 라벨 영역. 문자열뿐 아니라 Select 같은 컨트롤을 라벨로 넣어 셀렉트형 라벨도 구성할 수 있다. (필수)',
              },
              {
                name: 'children',
                type: 'ReactNode',
                desc: '우측 컨트롤 영역. Select · Input · 체크박스 등 임의의 입력 컨트롤을 배치한다. (필수)',
              },
              {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                defaultVal: "'md'",
                desc: '라벨 영역의 패딩과 폰트 크기 밀도. 우측 컨트롤은 별도로 동일 size 를 맞춰주는 것이 권장된다.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '루트 wrapper div 에 cx 로 병합되는 추가 클래스 (override 가능).',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>기본 사용 — 라벨 + 컨트롤</SectionTitle>
        <CodeBlock>{`<FieldGroup label="로그 유형">
  <Select value={value} onValueChange={setValue} placeholder="선택">
    <Select.Trigger />
    <Select.Content>
      <Select.Option value="all">전체</Select.Option>
    </Select.Content>
  </Select>
</FieldGroup>`}</CodeBlock>
        <DocCard>
          <FieldGroup label="로그 유형">
            <Select value={selectValue} onValueChange={setSelectValue} placeholder="선택">
              <Select.Trigger />
              <Select.Content>
                {logTypes.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select.Content>
            </Select>
          </FieldGroup>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Size</SectionTitle>
        <CodeBlock>{`<FieldGroup label="Small" size="sm"><Input size="sm" /></FieldGroup>
<FieldGroup label="Medium" size="md"><Input size="md" /></FieldGroup>
<FieldGroup label="Large" size="lg"><Input size="lg" /></FieldGroup>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 32 }}>
                  <InlineCode>{s}</InlineCode>
                </span>
                <FieldGroup label="라벨" size={s}>
                  <Input size={s} placeholder={s} />
                </FieldGroup>
              </div>
            ))}
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>입력 컨트롤로 Input 사용</SectionTitle>
        <CodeBlock>{`<FieldGroup label="검색어">
  <Input placeholder="검색어를 입력하세요" />
</FieldGroup>`}</CodeBlock>
        <DocCard>
          <FieldGroup label="검색어">
            <Input placeholder="검색어를 입력하세요" />
          </FieldGroup>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>임의 컨트롤 — 체크박스 그룹</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          children 에는 어떤 ReactNode 도 올 수 있어 체크박스 묶음 같은 커스텀 컨트롤을 그대로 배치할 수 있습니다.
        </p>
        <DocCard>
          <FieldGroup label="로그소스">
            <div style={{ display: 'flex', gap: 12, padding: '0 12px', alignItems: 'center' }}>
              {logSources.map((item) => (
                <label
                  key={item.value}
                  style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: 13 }}
                >
                  <input
                    type="checkbox"
                    checked={checks.includes(item.value)}
                    onChange={() => toggleCheck(item.value)}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </FieldGroup>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>라벨에도 컨트롤 — Select-as-label</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          <InlineCode>label</InlineCode> 이 ReactNode 이므로 라벨 자리에 Select 를 넣어 양쪽 모두 셀렉트인 복합 필터를
          만들 수 있습니다.
        </p>
        <DocCard>
          <FieldGroup
            label={
              <Select value={labelSource} onValueChange={setLabelSource} placeholder="소스 선택">
                <Select.Trigger />
                <Select.Content>
                  {logSources.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select.Content>
              </Select>
            }
          >
            <Select value={labelType} onValueChange={setLabelType} placeholder="유형 선택">
              <Select.Trigger />
              <Select.Content>
                {logTypes.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select.Content>
            </Select>
          </FieldGroup>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Focus-within 상태</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          내부 컨트롤에 포커스가 들어가면 wrapper 의 <InlineCode>:focus-within</InlineCode> 규칙이 적용되어 그룹
          테두리가 brand 색으로 바뀌고 포커스 링이 표시됩니다. 아래 입력 칸을 클릭해 확인하세요.
        </p>
        <DocCard>
          <FieldGroup label="포커스 테스트">
            <Input placeholder="여기를 클릭하면 그룹에 포커스 링이 생깁니다" style={{ width: 320 }} />
          </FieldGroup>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>실전 예시 — 다중 필터 바</SectionTitle>
        <CodeBlock>{`<div style={{ display: 'flex', gap: 8 }}>
  <FieldGroup label="로그 유형">...</FieldGroup>
  <FieldGroup label="로그소스">...</FieldGroup>
</div>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <FieldGroup label="로그 유형">
              <Select value={type} onValueChange={setType} placeholder="선택">
                <Select.Trigger />
                <Select.Content>
                  {logTypes.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select.Content>
              </Select>
            </FieldGroup>
            <FieldGroup label="로그소스">
              <Select value={source} onValueChange={setSource} placeholder="선택">
                <Select.Trigger />
                <Select.Content>
                  {logSources.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select.Content>
              </Select>
            </FieldGroup>
          </div>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
