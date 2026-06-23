import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { ReactSelect } from './ReactSelect'
import { ReactMultiSelect } from './ReactMultiSelect'

const meta = {
  title: 'StyleGuide/ReactSelect',
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

const fruitOptions = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '체리', value: 'cherry' },
  { label: '포도', value: 'grape' },
  { label: '멜론', value: 'melon' },
]

const roleOptions = [
  { label: '기획', value: 'plan', optionData: { type: 'PM' } },
  { label: '개발', value: 'dev', optionData: { type: 'FE' } },
  { label: '디자인', value: 'design', optionData: { type: 'UX' } },
]

const DocumentationView = () => {
  const [single, setSingle] = useState<string | undefined>(undefined)
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined)
  const [sizeValues, setSizeValues] = useState<Record<string, string | undefined>>({})
  const [typeValue, setTypeValue] = useState<string | undefined>(undefined)
  const [multi, setMulti] = useState<string[]>([])
  const [multiSizes, setMultiSizes] = useState<Record<string, string[]>>({ sm: [], md: [], lg: [] })

  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>ReactSelect</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          react-select 를 디자인 토큰으로 감싼 셀렉트 컴포넌트입니다. 단일 선택용 <InlineCode>ReactSelect</InlineCode> 와
          체크박스 다중 선택용 <InlineCode>ReactMultiSelect</InlineCode> 두 가지를 제공하며, sm · md · lg 사이즈, 검색,
          비활성화, 옵션별 타입 라벨(optionData) 표기를 지원합니다.
        </p>
        <CodeBlock>{`import { ReactSelect, ReactMultiSelect } from '@nayoung-port/design-system/components/ReactSelect'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — ReactSelect</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'options',
                type: 'ReactSelectOption<T>[]',
                desc: '선택 가능한 옵션 배열. 각 옵션은 label · value · disabled? · optionData? 를 가진다.',
              },
              {
                name: 'value',
                type: 'T',
                desc: '현재 선택된 값. options 의 value 와 일치하는 옵션이 선택 상태로 표시된다.',
              },
              {
                name: 'onChange',
                type: '(value: T) => void',
                desc: '옵션 선택 시 선택된 값으로 호출된다.',
              },
              {
                name: 'placeholder',
                type: 'string',
                defaultVal: "'선택하세요'",
                desc: '선택값이 없을 때 표시되는 안내 문구.',
              },
              {
                name: 'searchable',
                type: 'boolean',
                defaultVal: 'false',
                desc: '입력으로 옵션을 필터링할 수 있게 한다.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                defaultVal: 'false',
                desc: '셀렉트 전체를 비활성화한다.',
              },
              {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                defaultVal: "'md'",
                desc: '컨트롤 높이/폰트 사이즈. sm(28px) · md(32px) · lg(36px).',
              },
              {
                name: 'typeKey',
                type: 'string',
                desc: '옵션의 optionData 에서 타입 라벨로 표시할 키. 지정 시 커스텀 Option 렌더가 활성화된다.',
              },
              {
                name: 'typePosition',
                type: "'left' | 'right'",
                defaultVal: "'right'",
                desc: '타입 라벨을 옵션 텍스트 좌/우 어디에 둘지 결정한다.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '루트 wrapper div 에 병합되는 추가 클래스.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>API — ReactMultiSelect</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'options',
                type: 'ReactSelectOption<T>[]',
                desc: '선택 가능한 옵션 배열. ReactSelect 와 동일한 옵션 형태를 사용한다.',
              },
              {
                name: 'value',
                type: 'T[]',
                desc: '현재 선택된 값들의 배열.',
              },
              {
                name: 'onChange',
                type: '(value: T[]) => void',
                desc: '선택이 바뀔 때마다 선택된 값들의 배열로 호출된다.',
              },
              {
                name: 'placeholder',
                type: 'string',
                defaultVal: "'선택하세요'",
                desc: '선택값이 없을 때 표시되는 안내 문구.',
              },
              {
                name: 'searchable',
                type: 'boolean',
                defaultVal: 'true',
                desc: '입력으로 옵션을 필터링할 수 있게 한다. (단일 ReactSelect 와 기본값이 다르다)',
              },
              {
                name: 'disabled',
                type: 'boolean',
                defaultVal: 'false',
                desc: '셀렉트 전체를 비활성화한다.',
              },
              {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                defaultVal: "'md'",
                desc: '컨트롤 최소 높이/폰트 사이즈. 선택 칩이 늘면 높이가 자동 확장된다.',
              },
              {
                name: 'typeKey',
                type: 'string',
                desc: 'optionData 에서 타입 라벨로 표시할 키. 없으면 label 의 "이름 (타입)" 패턴에서 자동 추출한다.',
              },
              {
                name: 'typePosition',
                type: "'left' | 'right'",
                defaultVal: "'right'",
                desc: '타입 라벨 위치. 체크박스 아이콘은 항상 가장 왼쪽에 표시된다.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '루트 wrapper div 에 병합되는 추가 클래스.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>옵션 타입 — ReactSelectOption</SectionTitle>
        <CodeBlock>{`type ReactSelectOption<T = string> = {
  label: string
  value: T
  disabled?: boolean
  optionData?: Record<string, unknown>
}`}</CodeBlock>
      </Section>

      <Section>
        <SectionTitle>Basic — 단일 선택</SectionTitle>
        <CodeBlock>{`const [value, setValue] = useState<string>()
<ReactSelect
  options={fruitOptions}
  value={value}
  onChange={setValue}
  placeholder="과일을 선택하세요"
/>`}</CodeBlock>
        <DocCard>
          <div style={{ maxWidth: 280 }}>
            <ReactSelect
              options={fruitOptions}
              value={single}
              onChange={setSingle}
              placeholder="과일을 선택하세요"
            />
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Size</SectionTitle>
        <CodeBlock>{`<ReactSelect size="sm" ... />
<ReactSelect size="md" ... />
<ReactSelect size="lg" ... />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 180 }}>
                <InlineCode>{`size="${size}"`}</InlineCode>
                <ReactSelect
                  size={size}
                  options={fruitOptions}
                  value={sizeValues[size]}
                  onChange={(v) => setSizeValues((prev) => ({ ...prev, [size]: v }))}
                  placeholder={`size: ${size}`}
                />
              </div>
            ))}
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Searchable</SectionTitle>
        <CodeBlock>{`<ReactSelect options={fruitOptions} searchable placeholder="검색하여 선택하세요" />`}</CodeBlock>
        <DocCard>
          <div style={{ maxWidth: 280 }}>
            <ReactSelect
              options={fruitOptions}
              value={searchValue}
              onChange={setSearchValue}
              searchable
              placeholder="검색하여 선택하세요"
            />
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Disabled — 컨트롤 / 옵션</SectionTitle>
        <CodeBlock>{`// 컨트롤 전체 비활성화
<ReactSelect options={fruitOptions} disabled placeholder="비활성화됨" />

// 특정 옵션만 비활성화
<ReactSelect options={[
  { label: '사과', value: 'apple' },
  { label: '바나나 (품절)', value: 'banana', disabled: true },
  { label: '체리', value: 'cherry' },
]} />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 200 }}>
              <InlineCode>disabled</InlineCode>
              <ReactSelect options={fruitOptions} disabled placeholder="비활성화됨" onChange={() => undefined} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 200 }}>
              <InlineCode>option.disabled</InlineCode>
              <ReactSelect
                options={[
                  { label: '사과', value: 'apple' },
                  { label: '바나나 (품절)', value: 'banana', disabled: true },
                  { label: '체리', value: 'cherry' },
                ]}
                value="apple"
                placeholder="과일"
                onChange={() => undefined}
              />
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Type label — typeKey · typePosition</SectionTitle>
        <CodeBlock>{`<ReactSelect
  options={[
    { label: '기획', value: 'plan', optionData: { type: 'PM' } },
    { label: '개발', value: 'dev', optionData: { type: 'FE' } },
    { label: '디자인', value: 'design', optionData: { type: 'UX' } },
  ]}
  typeKey="type"
  typePosition="right"
  placeholder="역할을 선택하세요"
/>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {(['right', 'left'] as const).map((pos) => (
              <div key={pos} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 220 }}>
                <InlineCode>{`typePosition="${pos}"`}</InlineCode>
                <ReactSelect
                  options={roleOptions}
                  value={pos === 'right' ? typeValue : undefined}
                  onChange={pos === 'right' ? setTypeValue : () => undefined}
                  typeKey="type"
                  typePosition={pos}
                  placeholder="역할을 선택하세요"
                />
              </div>
            ))}
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>MultiSelect — 다중 선택</SectionTitle>
        <CodeBlock>{`const [values, setValues] = useState<string[]>([])
<ReactMultiSelect
  options={fruitOptions}
  value={values}
  onChange={setValues}
  placeholder="과일을 선택하세요 (복수)"
/>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
            <ReactMultiSelect
              options={fruitOptions}
              value={multi}
              onChange={setMulti}
              placeholder="과일을 선택하세요 (복수)"
            />
            <span style={{ fontSize: 12, color: t.textMuted }}>선택된 값: {multi.join(', ') || '없음'}</span>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>MultiSelect — Size</SectionTitle>
        <CodeBlock>{`<ReactMultiSelect size="sm" ... />
<ReactMultiSelect size="md" ... />
<ReactMultiSelect size="lg" ... />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 200 }}>
                <InlineCode>{`size="${size}"`}</InlineCode>
                <ReactMultiSelect
                  size={size}
                  options={fruitOptions}
                  value={multiSizes[size]}
                  onChange={(v: string[]) => setMultiSizes((prev) => ({ ...prev, [size]: v }))}
                  placeholder={`size: ${size}`}
                />
              </div>
            ))}
          </div>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
