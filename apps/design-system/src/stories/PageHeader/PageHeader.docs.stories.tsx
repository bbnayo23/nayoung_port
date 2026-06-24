import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import PageHeader from '../../components/PageHeader'

const meta = {
  title: 'StyleGuide/PageHeader',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

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
      style={{ display: 'inline-block', width: 3, height: 16, background: t.primary, borderRadius: 2, flexShrink: 0 }}
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
      color: vars.color.error,
      background: 'rgba(240,62,62,0.08)',
      borderRadius: 3,
      padding: '1px 5px',
      marginLeft: 4,
    }}
  >
    required
  </span>
)

type PropRow = { name: string; type: string; defaultVal?: string; required?: boolean; desc: string }

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

const WithBackDemo = () => {
  const [log, setLog] = useState<string[]>([])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <PageHeader
        title="이벤트 상세"
        subtitle="EVT-20240501-0042"
        onBack={() => setLog((p) => [...p, '← 뒤로가기 클릭'])}
        divider
      />
      {log.length > 0 && (
        <div
          style={{
            padding: '6px 10px',
            background: t.surfaceHover,
            borderRadius: 4,
            fontSize: 11,
            color: t.textSecondary,
          }}
        >
          {log.slice(-2).map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      )}
    </div>
  )
}

const WithActionsDemo = () => (
  <PageHeader
    title="플레이북 관리"
    breadcrumbs={[
      { key: 'home', label: 'Home', href: '#' },
      { key: 'playbook', label: 'Playbook' },
    ]}
    actions={
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          style={{
            padding: '5px 12px',
            fontSize: 12,
            border: `1px solid ${t.border}`,
            borderRadius: 4,
            background: t.surface,
            color: t.text,
            cursor: 'pointer',
          }}
        >
          내보내기
        </button>
        <button
          type="button"
          style={{
            padding: '5px 12px',
            fontSize: 12,
            border: 'none',
            borderRadius: 4,
            background: t.primary,
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          + 새 플레이북
        </button>
      </div>
    }
    divider
  />
)

const WithTagsDemo = () => (
  <PageHeader
    title="플레이북 이름"
    subtitle="피싱 대응 자동화"
    tags={
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          padding: '2px 8px',
          borderRadius: 4,
          background: 'rgba(0,183,153,0.12)',
          color: t.primary,
          letterSpacing: 0.5,
        }}
      >
        ACTIVE
      </span>
    }
    divider
  />
)

export const Documentation: Story = {
  render: () => (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>PageHeader</h1>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          페이지 최상단에 위치하는 헤더 컴포넌트입니다. <InlineCode>title</InlineCode> ·{' '}
          <InlineCode>subtitle</InlineCode> · <InlineCode>breadcrumbs</InlineCode> · <InlineCode>tags</InlineCode> ·{' '}
          <InlineCode>actions</InlineCode> 슬롯으로 구성되며, <InlineCode>onBack</InlineCode> 핸들러를 지정하면 뒤로가기
          버튼이 자동으로 렌더됩니다.
        </p>
        <CodeBlock>{`import PageHeader from '@port/design-system'`}</CodeBlock>
      </div>

      <Section gap={16}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              { name: 'title', type: 'string', required: true, desc: '페이지 타이틀 — h1 태그로 자동 렌더됩니다.' },
              { name: 'subtitle', type: 'string', desc: '타이틀 옆에 표시되는 보조 텍스트' },
              {
                name: 'breadcrumbs',
                type: 'BreadcrumbItem[]',
                desc: '브레드크럼 경로 배열. 배열 전달 시 Breadcrumbs 컴포넌트로 자동 렌더.',
              },
              {
                name: 'tags',
                type: 'ReactNode',
                desc: '타이틀 행 가운데 슬롯. 상태 칩(ACTIVE · DRAFT · ARCHIVED) 등에 사용.',
              },
              { name: 'actions', type: 'ReactNode', desc: '타이틀 행 우측 슬롯. 버튼, 드롭다운 등 액션 영역.' },
              {
                name: 'backButton',
                type: 'ReactNode',
                desc: '커스텀 뒤로가기 버튼 슬롯. 지정 시 onBack보다 우선합니다.',
              },
              { name: 'onBack', type: '() => void', desc: '지정 시 기본 뒤로가기 아이콘 버튼이 자동 렌더됩니다.' },
              { name: 'divider', type: 'boolean', defaultVal: 'false', desc: '헤더 하단 구분선 표시 여부' },
              { name: 'className', type: 'string', desc: '루트 <header> 요소에 추가할 CSS 클래스' },
            ]}
          />
        </Card>
        <Card style={{ background: t.surfaceHover }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            BREADCRUMBITEM
          </p>
          <PropsTable
            rows={[
              { name: 'key', type: 'string', required: true, desc: 'React key — 고유한 식별자' },
              { name: 'label', type: 'string', required: true, desc: '표시 텍스트' },
              { name: 'href', type: 'string', desc: '링크 URL. 지정 시 <a> 태그로 렌더.' },
              { name: 'onClick', type: '() => void', desc: '클릭 핸들러. href 없이 지정 시 <button>으로 렌더.' },
            ]}
          />
        </Card>
      </Section>

      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="뒤로가기 버튼"
            desc="onBack 핸들러를 전달하면 좌측에 화살표 아이콘 버튼이 자동 렌더됩니다."
            code={`<PageHeader
  title="이벤트 상세"
  subtitle="EVT-20240501-0042"
  onBack={() => navigate(-1)}
  divider
/>`}
          >
            <WithBackDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="액션 버튼 슬롯"
            desc="actions prop에 ReactNode를 전달하면 헤더 우측에 렌더됩니다."
            code={`<PageHeader
  title="플레이북 관리"
  breadcrumbs={[...]}
  actions={
    <div style={{ display: 'flex', gap: 8 }}>
      <Button variant="outline">내보내기</Button>
      <Button>+ 새 플레이북</Button>
    </div>
  }
  divider
/>`}
          >
            <WithActionsDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="상태 태그 슬롯"
            desc="tags prop으로 타이틀 옆에 상태 칩을 렌더합니다."
            code={`<PageHeader
  title="플레이북 이름"
  tags={<Badge color="success">ACTIVE</Badge>}
  divider
/>`}
          >
            <WithTagsDemo />
          </Pattern>
        </Card>
      </Section>
    </DocPage>
  ),
}
