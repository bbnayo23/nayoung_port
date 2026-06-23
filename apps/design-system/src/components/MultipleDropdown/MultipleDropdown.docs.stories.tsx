import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { MultipleDropdown } from './MultipleDropdown'
import type { DropdownItem } from '../Dropdown/Dropdown'

const meta = {
  title: 'StyleGuide/MultipleDropdown',
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
  success: vars.color.success,
  danger: vars.color.danger,
  info: vars.color.info,
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

// ---------------------------------------------------------------------------
// 데모용 아이템
// ---------------------------------------------------------------------------

const logItems: DropdownItem[] = [
  { label: 'fw', value: 'fw' },
  { label: 'system', value: 'system' },
  { label: 'ips', value: 'ips' },
  { label: 'tms', value: 'tms' },
  { label: 'uncategorized', value: 'uncategorized' },
  { label: 'waf', value: 'waf' },
]

const itemsWithDividerAndDisabled: DropdownItem[] = [
  { label: '방화벽 (fw)', value: 'fw' },
  { label: '시스템 (system)', value: 'system' },
  { type: 'divider', key: 'd1' },
  { label: '침입방지 (ips)', value: 'ips' },
  { label: '위협관리 (tms)', value: 'tms', disabled: true },
  { label: '웹방화벽 (waf)', value: 'waf' },
]

const DocumentationView = () => {
  const [basicValues, setBasicValues] = useState<string[]>(['fw'])
  const [searchValues, setSearchValues] = useState<string[]>([])
  const [hideAllValues, setHideAllValues] = useState<string[]>(['system'])
  const [structValues, setStructValues] = useState<string[]>(['fw', 'ips'])

  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>MultipleDropdown</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          체크박스로 여러 항목을 동시에 선택하는 멀티 셀렉트 드롭다운입니다. 패널은 Portal 로 렌더되어 부모의 overflow
          에 잘리지 않고, 트리거 위치에 맞춰 자동 정렬되며 viewport 우측 넘침을 보정합니다. 선택값은{' '}
          <InlineCode>values</InlineCode> / <InlineCode>onChange</InlineCode> 로 제어되는 controlled 컴포넌트이며,
          검색(<InlineCode>searchable</InlineCode>), 전체 선택 토글, 초기화 버튼, divider · disabled 항목을 지원합니다.
        </p>
        <CodeBlock>{`import { MultipleDropdown } from '@nayoung-port/design-system/components/MultipleDropdown'
import type { DropdownItem } from '@nayoung-port/design-system/components/Dropdown'

const items: DropdownItem[] = [
  { label: 'fw', value: 'fw' },
  { label: 'system', value: 'system' },
]

<MultipleDropdown items={items} values={values} onChange={setValues} />`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — MultipleDropdown</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          제네릭 <InlineCode>{'MultipleDropdown<T = string>'}</InlineCode>. <InlineCode>value</InlineCode> 의 타입{' '}
          <InlineCode>T</InlineCode> 는 <InlineCode>items</InlineCode> 로부터 추론됩니다.
        </p>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'items',
                type: 'DropdownItem<T>[]',
                desc: '선택 후보 목록. 일반 항목 또는 divider 의 배열. (필수)',
              },
              {
                name: 'values',
                type: 'T[]',
                defaultVal: '[]',
                desc: '현재 선택된 값 배열 (controlled). 빈 배열이면 placeholder 가 표시된다.',
              },
              {
                name: 'onChange',
                type: '(values: T[]) => void',
                desc: '선택이 바뀔 때 다음 선택값 배열로 호출된다. 항목 토글 · 전체 토글 · 초기화 모두 이 콜백을 통한다.',
              },
              {
                name: 'placeholder',
                type: 'string',
                defaultVal: "'전체'",
                desc: '선택값이 없을 때 트리거에 표시되는 안내 텍스트.',
              },
              {
                name: 'searchable',
                type: 'boolean',
                defaultVal: 'false',
                desc: '패널 상단에 검색 입력을 노출한다. label 부분 일치로 필터링하며 searchFixed 항목은 항상 노출.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                defaultVal: 'false',
                desc: '트리거를 비활성화한다 (opacity 0.5, not-allowed).',
              },
              {
                name: 'width',
                type: 'number | string',
                desc: '트리거 너비 고정. 선택 항목이 늘어도 너비가 변하지 않게 한다.',
              },
              {
                name: 'maxWidth',
                type: 'number | string',
                desc: '트리거 최대 너비.',
              },
              {
                name: 'hideSelectAll',
                type: 'boolean',
                defaultVal: 'false',
                desc: '"전체" 토글을 숨긴다. 빈 배열이 곧 "전체"인 API 에서 n개를 전부 전송하는 비효율을 막는다. 이때 선택 유무와 무관하게 우측 "초기화" 버튼이 노출된다.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '트리거 button 에 cx 로 병합되는 추가 클래스.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>DropdownItem 타입</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          <InlineCode>items</InlineCode> 의 원소 타입. Dropdown 과 공유한다. 일반 항목 또는 divider 의 union.
        </p>
        <CodeBlock>{`type DropdownItem<T = string> =
  | {
      type?: 'item'
      label: string
      value: T
      disabled?: boolean
      searchFixed?: boolean   // 검색어와 무관하게 항상 노출
      description?: string    // (Dropdown 전용 부가 표시)
    }
  | { type: 'divider'; key: string }`}</CodeBlock>
        <DocCard>
          <PropsTable
            rows={[
              { name: 'type', type: "'item' | 'divider'", defaultVal: "'item'", desc: "항목 종류. 'divider' 면 구분선으로 렌더된다." },
              { name: 'label', type: 'string', desc: '항목 표시 텍스트. (item 일 때 필수)' },
              { name: 'value', type: 'T', desc: '선택 식별값. values 배열에 들어가는 값. (item 일 때 필수)' },
              { name: 'disabled', type: 'boolean', defaultVal: 'false', desc: '비활성 항목. 클릭해도 토글되지 않고 흐리게 표시된다.' },
              { name: 'searchFixed', type: 'boolean', defaultVal: 'false', desc: 'searchable 검색 중에도 필터에서 제외되지 않고 항상 노출.' },
              { name: 'key', type: 'string', desc: "divider 의 React key. (type: 'divider' 일 때 필수)" },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Basic — 선택 / placeholder</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          트리거를 클릭하면 패널이 열립니다. 선택값이 있으면 쉼표로 이어 표시되고, 없으면 placeholder 가 흐리게 보입니다.
        </p>
        <CodeBlock>{`<MultipleDropdown
  items={items}
  values={values}
  onChange={setValues}
  placeholder="로그 유형"
/>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 240 }}>
              <InlineCode>controlled</InlineCode>
              <MultipleDropdown
                items={logItems}
                values={basicValues}
                onChange={setBasicValues}
                placeholder="로그 유형"
              />
              <span style={{ fontSize: 11, color: t.textMuted }}>
                선택값: {basicValues.length > 0 ? basicValues.join(', ') : '(없음)'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 240 }}>
              <InlineCode>placeholder (빈 값)</InlineCode>
              <MultipleDropdown items={logItems} values={[]} placeholder="로그 유형을 선택하세요" />
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Searchable — 검색</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          <InlineCode>searchable</InlineCode> 를 켜면 패널 상단에 검색 입력이 생기고 label 부분 일치로 필터링됩니다.
          결과가 없으면 "검색 결과가 없습니다" 가 표시됩니다.
        </p>
        <CodeBlock>{`<MultipleDropdown items={items} values={values} onChange={setValues} searchable />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 260 }}>
            <MultipleDropdown
              items={logItems}
              values={searchValues}
              onChange={setSearchValues}
              placeholder="로그 유형"
              searchable
            />
            <span style={{ fontSize: 11, color: t.textMuted }}>
              선택값: {searchValues.length > 0 ? searchValues.join(', ') : '(없음)'}
            </span>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>hideSelectAll — 전체 토글 숨김 / 초기화</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          <InlineCode>hideSelectAll</InlineCode> 이면 "전체" 체크박스가 사라지고, 선택 유무와 무관하게 우측에 "초기화"
          버튼만 노출됩니다. 기본 모드에서는 "전체" 토글이 보이고, 선택이 있을 때만 "초기화" 가 함께 나타납니다.
        </p>
        <CodeBlock>{`// 기본: "전체" 토글 + (선택 시) 초기화
<MultipleDropdown items={items} values={values} onChange={setValues} />

// hideSelectAll: 전체 토글 숨김, 초기화만
<MultipleDropdown items={items} values={values} onChange={setValues} hideSelectAll />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 240 }}>
              <InlineCode>전체 토글 (기본)</InlineCode>
              <MultipleDropdown items={logItems} values={hideAllValues} onChange={setHideAllValues} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 240 }}>
              <InlineCode>hideSelectAll</InlineCode>
              <MultipleDropdown items={logItems} values={hideAllValues} onChange={setHideAllValues} hideSelectAll />
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Divider · Disabled 항목</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          <InlineCode>{"{ type: 'divider', key }"}</InlineCode> 로 구분선을, 항목의{' '}
          <InlineCode>disabled</InlineCode> 로 비활성 항목을 만듭니다. 비활성 항목은 클릭해도 토글되지 않습니다.
        </p>
        <CodeBlock>{`const items: DropdownItem[] = [
  { label: '방화벽 (fw)', value: 'fw' },
  { label: '시스템 (system)', value: 'system' },
  { type: 'divider', key: 'd1' },
  { label: '침입방지 (ips)', value: 'ips' },
  { label: '위협관리 (tms)', value: 'tms', disabled: true },
  { label: '웹방화벽 (waf)', value: 'waf' },
]`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 260 }}>
            <MultipleDropdown
              items={itemsWithDividerAndDisabled}
              values={structValues}
              onChange={setStructValues}
              placeholder="자산 유형"
            />
            <span style={{ fontSize: 11, color: t.textMuted }}>
              선택값: {structValues.length > 0 ? structValues.join(', ') : '(없음)'}
            </span>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Disabled — 트리거 비활성</SectionTitle>
        <CodeBlock>{`<MultipleDropdown items={items} values={['fw']} disabled />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 240 }}>
              <InlineCode>disabled (선택 있음)</InlineCode>
              <MultipleDropdown items={logItems} values={['fw', 'system']} placeholder="로그 유형" disabled />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 240 }}>
              <InlineCode>disabled (빈 값)</InlineCode>
              <MultipleDropdown items={logItems} values={[]} placeholder="로그 유형" disabled />
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Width — 너비 고정</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          <InlineCode>width</InlineCode> / <InlineCode>maxWidth</InlineCode> 로 트리거 너비를 고정하면, 선택 항목이
          늘어 라벨이 길어져도 너비가 흔들리지 않고 말줄임(…) 처리됩니다.
        </p>
        <CodeBlock>{`<MultipleDropdown items={items} values={values} width={160} />
<MultipleDropdown items={items} values={values} maxWidth={200} />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>width={'{160}'}</InlineCode>
              <MultipleDropdown items={logItems} values={['fw', 'system', 'ips', 'tms']} width={160} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>maxWidth={'{200}'}</InlineCode>
              <MultipleDropdown items={logItems} values={['fw', 'system', 'ips', 'tms', 'waf']} maxWidth={200} />
            </div>
          </div>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
