import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { Dropdown } from './Dropdown'
import type { DropdownItem } from './Dropdown'

const meta = {
  title: 'StyleGuide/Dropdown',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Design tokens ─────────────────────────────────────────────────────────────

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

// ── Layout helpers ────────────────────────────────────────────────────────────

const DocPage = ({ children }: { children: ReactNode }) => (
  <div style={{ height: '100vh', background: t.bg, overflowY: 'auto' }}>
    <div
      style={{
        maxWidth: 840,
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
      style={{
        display: 'inline-block',
        width: 3,
        height: 16,
        background: t.primary,
        borderRadius: 2,
        flexShrink: 0,
      }}
    />
    <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: t.text, letterSpacing: 0.2 }}>{children}</h2>
  </div>
)

const Card = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
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
      fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
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

const RequiredBadge = () => (
  <span
    style={{
      fontSize: 10,
      fontWeight: 600,
      color: vars.color.danger,
      background: 'rgba(240,62,62,0.08)',
      borderRadius: 3,
      padding: '1px 5px',
      marginLeft: 4,
    }}
  >
    required
  </span>
)

type PropRow = {
  name: string
  type: string
  defaultVal?: string
  required?: boolean
  desc: string
}

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
            {row.required && <RequiredBadge />}
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

// ── Sample data ───────────────────────────────────────────────────────────────

const sampleItems: DropdownItem[] = [
  { value: 'all', label: '전체' },
  { value: 'info', label: 'INFO' },
  { value: 'warn', label: 'WARN' },
  { value: 'error', label: 'ERROR' },
  { value: 'debug', label: 'DEBUG', disabled: true },
]

const itemsWithDesc: DropdownItem[] = [
  { value: 'get', label: 'GET /api/users', description: 'List' },
  { value: 'post', label: 'POST /api/users', description: 'Create' },
  { value: 'put', label: 'PUT /api/users/:id', description: 'Update' },
  { type: 'divider', key: 'div1' },
  { value: 'delete', label: 'DELETE /api/users/:id', description: 'Delete', disabled: true },
]

// ── Demo components ───────────────────────────────────────────────────────────

const SingleControlledDemo = () => {
  const [value, setValue] = useState<string | undefined>(undefined)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 200 }}>
      <Dropdown
        items={sampleItems}
        value={value}
        onChange={(v) => setValue(v)}
        placeholder="선택하세요"
        width={180}
      />
      <div
        style={{
          padding: '8px 12px',
          background: t.surfaceHover,
          border: `1px solid ${t.border}`,
          borderRadius: t.radiusSm,
          fontSize: 12,
          fontFamily: 'monospace',
          color: t.textSecondary,
        }}
      >
        value: {value ?? 'undefined'}
      </div>
    </div>
  )
}

const SearchableDemo = () => {
  const [value, setValue] = useState<string | undefined>(undefined)
  return (
    <div style={{ paddingBottom: 200 }}>
      <Dropdown
        items={sampleItems}
        value={value}
        onChange={setValue}
        placeholder="검색해서 선택"
        searchable
        width={200}
      />
    </div>
  )
}

const DescriptionDemo = () => {
  const [value, setValue] = useState<string | undefined>(undefined)
  return (
    <div style={{ paddingBottom: 220 }}>
      <Dropdown
        items={itemsWithDesc}
        value={value}
        onChange={setValue}
        placeholder="엔드포인트 선택"
        width={240}
      />
    </div>
  )
}

const Pattern = ({
  title,
  desc,
  code,
  children,
}: {
  title: string
  desc: string
  code: string
  children: ReactNode
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div>
      <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600, color: t.text }}>{title}</p>
      <p style={{ margin: 0, fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>{desc}</p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'start' }}>
      <CodeBlock>{code}</CodeBlock>
      <div>{children}</div>
    </div>
  </div>
)

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Dropdown</h1>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.primary,
              background: 'rgba(0,183,153,0.1)',
              borderRadius: 4,
              padding: '2px 8px',
              letterSpacing: 0.5,
            }}
          >
            SELECT
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          단일 선택 드롭다운 컴포넌트입니다. <InlineCode>searchable</InlineCode> prop으로 검색 기능을 활성화하고,{' '}
          <InlineCode>renderPanel</InlineCode>로 완전히 커스텀한 패널을 렌더링할 수 있습니다.{' '}
          패널은 <InlineCode>Portal</InlineCode>을 통해 DOM 최상단에 렌더되어 z-index 충돌을 방지합니다.
        </p>
        <CodeBlock>{`import { Dropdown } from '@nayoung/design-system/components/Dropdown'
import type { DropdownProps, DropdownItem } from '@nayoung/design-system/components/Dropdown'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            DROPDOWNPROPS (공통)
          </p>
          <PropsTable
            rows={[
              { name: 'items', type: 'DropdownItem<T>[]', defaultVal: '[]', desc: '선택 옵션 목록. item/divider 두 가지 타입을 지원합니다.' },
              { name: 'value', type: 'T', desc: '제어 모드 선택값' },
              { name: 'onChange', type: '(value: T) => void', desc: '값 변경 콜백' },
              { name: 'placeholder', type: 'string', defaultVal: "'선택하세요'", desc: '미선택 상태 텍스트' },
              { name: 'label', type: 'string', desc: 'trigger에 고정 표시할 텍스트. value/selectedItem보다 우선합니다.' },
              { name: 'searchable', type: 'boolean', defaultVal: 'false', desc: '패널 상단에 검색 입력창을 표시합니다.' },
              { name: 'disabled', type: 'boolean', defaultVal: 'false', desc: '비활성 상태' },
              { name: 'className', type: 'string', desc: 'trigger 버튼에 추가할 CSS 클래스' },
              { name: 'width', type: 'number | string', desc: 'trigger 너비 고정 (예: 200, "100%")' },
              { name: 'placement', type: "'bottom' | 'top'", defaultVal: "'bottom'", desc: '패널이 열리는 방향' },
              { name: 'renderPanel', type: '(close: () => void) => ReactNode', desc: '완전히 커스텀한 패널 렌더링. close()로 패널을 닫습니다.' },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            DROPDOWNITEM
          </p>
          <CodeBlock>{`// 일반 항목
type DropdownItem<T = string> =
  | {
      type?: 'item'
      label: string
      value: T
      disabled?: boolean      // 개별 옵션 비활성화
      searchFixed?: boolean   // 검색 시 항상 표시 (검색어 무관)
      description?: string    // 항목 우측에 회색으로 표시할 부가 정보
    }
  | { type: 'divider'; key: string }  // 구분선`}</CodeBlock>
        </Card>
      </Section>

      {/* Usage patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="Single Select (단일 선택)"
            desc="기본 모드입니다. value + onChange로 제어 모드를 사용합니다."
            code={`const [value, setValue] = useState<string>()

<Dropdown
  items={[
    { value: 'info', label: 'INFO' },
    { value: 'warn', label: 'WARN' },
    { value: 'error', label: 'ERROR' },
  ]}
  value={value}
  onChange={(v) => setValue(v)}
  placeholder="선택하세요"
/>`}
          >
            <SingleControlledDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="Searchable (검색 가능)"
            desc="searchable=true로 패널 상단에 검색 입력창을 추가합니다. searchFixed=true인 항목은 검색어와 관계없이 항상 노출됩니다."
            code={`<Dropdown
  items={items}
  value={value}
  onChange={setValue}
  placeholder="검색해서 선택"
  searchable
/>`}
          >
            <SearchableDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="Description (부가 정보)"
            desc="각 항목에 description을 지정하면 라벨 우측에 회색으로 표시됩니다. divider 타입으로 구분선을 삽입할 수 있습니다."
            code={`<Dropdown
  items={[
    { value: 'get', label: 'GET /api/users', description: 'List' },
    { value: 'post', label: 'POST /api/users', description: 'Create' },
    { type: 'divider', key: 'div1' },
    { value: 'delete', label: 'DELETE /api/users/:id',
      description: 'Delete', disabled: true },
  ]}
  value={value}
  onChange={setValue}
  placeholder="엔드포인트 선택"
/>`}
          >
            <DescriptionDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="Custom Panel (커스텀 패널)"
            desc="renderPanel prop으로 완전히 커스텀한 패널을 렌더링할 수 있습니다. close()를 호출하면 패널이 닫힙니다."
            code={`<Dropdown
  label="필터"
  renderPanel={(close) => (
    <div style={{ padding: 16, minWidth: 200 }}>
      <p>커스텀 패널 내용</p>
      <button onClick={close}>닫기</button>
    </div>
  )}
/>`}
          >
            <div style={{ paddingBottom: 160 }}>
              <Dropdown
                label="필터"
                width={160}
                renderPanel={(close) => (
                  <div
                    style={{
                      padding: 16,
                      minWidth: 200,
                      background: t.surface,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 12, color: t.textSecondary }}>커스텀 패널 내용</p>
                    <button
                      onClick={close}
                      style={{
                        padding: '6px 12px',
                        fontSize: 12,
                        background: t.primary,
                        color: '#fff',
                        border: 'none',
                        borderRadius: t.radiusSm,
                        cursor: 'pointer',
                      }}
                    >
                      닫기
                    </button>
                  </div>
                )}
              />
            </div>
          </Pattern>
        </Card>
      </Section>

      {/* Placement */}
      <Section gap={16}>
        <SectionTitle>Placement</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {(['bottom', 'top'] as const).map((placement) => (
            <Card key={placement}>
              <p style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>
                {`placement="${placement}"`}
              </p>
              <div style={{ paddingTop: placement === 'top' ? 160 : 0, paddingBottom: placement === 'bottom' ? 160 : 0 }}>
                <Dropdown
                  items={sampleItems}
                  placeholder={`${placement} 방향`}
                  placement={placement}
                />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Disabled */}
      <Section gap={16}>
        <SectionTitle>Disabled</SectionTitle>
        <Card>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p style={{ margin: 0, fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>{'disabled (no value)'}</p>
              <Dropdown items={sampleItems} placeholder="선택하세요" disabled width={160} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p style={{ margin: 0, fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>{'disabled (with value)'}</p>
              <Dropdown items={sampleItems} value="info" disabled width={160} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p style={{ margin: 0, fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>{'item disabled'}</p>
              <Dropdown items={sampleItems} placeholder="DEBUG는 비활성" width={180} />
            </div>
          </div>
        </Card>
      </Section>
    </DocPage>
  ),
}
