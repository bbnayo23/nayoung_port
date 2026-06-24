import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { vars } from '../../theme/contract.css'
import { Tree } from '../../components/Tree'
import type { TreeNode } from '../../components/Tree'

const meta = {
  title: 'StyleGuide/Tree',
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

// ── Sample data ───────────────────────────────────────────────────────────────

const BASIC_NODES: TreeNode[] = [
  {
    id: 'network',
    label: '네트워크',
    children: [
      { id: 'firewall', label: '방화벽' },
      { id: 'ids', label: 'IDS/IPS' },
      { id: 'vpn', label: 'VPN' },
    ],
  },
  {
    id: 'endpoint',
    label: '엔드포인트',
    children: [
      { id: 'windows', label: 'Windows' },
      { id: 'linux', label: 'Linux' },
    ],
  },
  { id: 'cloud', label: '클라우드' },
]

const DEEP_NODES: TreeNode[] = [
  {
    id: 'assets',
    label: '자산',
    children: [
      {
        id: 'servers',
        label: '서버',
        children: [
          {
            id: 'web',
            label: '웹 서버',
            children: [
              { id: 'nginx', label: 'nginx-01' },
              { id: 'apache', label: 'apache-02' },
            ],
          },
          { id: 'db', label: 'DB 서버' },
        ],
      },
      {
        id: 'network-devices',
        label: '네트워크 장비',
        children: [
          { id: 'switch', label: '스위치' },
          { id: 'router', label: '라우터' },
        ],
      },
    ],
  },
]

const NODES_WITH_DISABLED: TreeNode[] = [
  {
    id: 'rules',
    label: '정책',
    children: [
      { id: 'active', label: '활성 정책' },
      { id: 'inactive', label: '비활성 정책', disabled: true },
      { id: 'test', label: '테스트 정책', disabled: true },
    ],
  },
  { id: 'logs', label: '로그' },
]

// ── Interactive demo components ───────────────────────────────────────────────

const BasicTreeDemo = () => {
  const [selected, setSelected] = useState<string | undefined>()
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
      <div style={{ border: `1px solid ${t.border}`, borderRadius: t.radiusSm, padding: 12, background: t.bg }}>
        <Tree nodes={BASIC_NODES} selectedId={selected} onSelect={setSelected} />
      </div>
      <div style={{ fontSize: 13, color: t.textSecondary }}>
        선택된 항목: <InlineCode>{selected ?? '없음'}</InlineCode>
      </div>
    </div>
  )
}

const ControlledTreeDemo = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>(['network'])
  const [selected, setSelected] = useState<string | undefined>()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => setExpandedIds(['network', 'endpoint'])}
          style={{
            padding: '4px 12px',
            fontSize: 12,
            border: `1px solid ${t.border}`,
            borderRadius: t.radiusSm,
            background: t.surface,
            cursor: 'pointer',
            color: t.text,
          }}
        >
          모두 펼치기
        </button>
        <button
          onClick={() => setExpandedIds([])}
          style={{
            padding: '4px 12px',
            fontSize: 12,
            border: `1px solid ${t.border}`,
            borderRadius: t.radiusSm,
            background: t.surface,
            cursor: 'pointer',
            color: t.text,
          }}
        >
          모두 접기
        </button>
      </div>
      <div style={{ border: `1px solid ${t.border}`, borderRadius: t.radiusSm, padding: 12, background: t.bg }}>
        <Tree
          nodes={BASIC_NODES}
          expandedIds={expandedIds}
          onExpandChange={setExpandedIds}
          selectedId={selected}
          onSelect={setSelected}
        />
      </div>
    </div>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Tree</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          계층 구조 데이터를 트리 형태로 표시하는 컴포넌트입니다. 노드 선택, 펼치기/접기, 비활성화, controlled 모드를
          지원합니다. 키보드 접근성(<InlineCode>Enter</InlineCode> · <InlineCode>Arrow</InlineCode>)이 내장되어
          있습니다.
        </p>
        <CodeBlock>{`import { Tree } from '@port/design-system'
import type { TreeNode } from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={16}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <PropsTable
              rows={[
                {
                  name: 'nodes',
                  type: 'TreeNode[]',
                  desc: '트리 노드 데이터 배열. 각 노드는 id, label, children?, disabled? 를 가집니다.',
                },
                {
                  name: 'expandedIds',
                  type: 'string[]',
                  desc: '현재 펼쳐진 노드 id 목록 (controlled). 미전달 시 내부 상태로 관리됩니다.',
                },
                { name: 'onExpandChange', type: '(ids: string[]) => void', desc: '펼치기/접기 변경 핸들러' },
                { name: 'selectedId', type: 'string', desc: '현재 선택된 노드 id (controlled)' },
                { name: 'onSelect', type: '(id: string) => void', desc: '노드 선택 핸들러' },
                { name: 'className', type: 'string', desc: '루트 ul 요소에 추가할 CSS 클래스' },
              ]}
            />
            <div>
              <p
                style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}
              >
                TreeNode
              </p>
              <PropsTable
                rows={[
                  { name: 'id', type: 'string', desc: '노드 고유 식별자' },
                  { name: 'label', type: 'ReactNode', desc: '노드 표시 텍스트 또는 JSX' },
                  { name: 'children', type: 'TreeNode[]', desc: '하위 노드 배열. 있으면 펼치기 아이콘 표시' },
                  { name: 'disabled', type: 'boolean', desc: '비활성화 — 클릭 불가, 시각적으로 흐리게 표시' },
                ]}
              />
            </div>
          </div>
        </Card>
      </Section>

      {/* 기본 사용 */}
      <Section gap={16}>
        <SectionTitle>기본 사용</SectionTitle>
        <Card>
          <CodeBlock>{`const nodes: TreeNode[] = [
  {
    id: "network",
    label: "네트워크",
    children: [
      { id: "firewall", label: "방화벽" },
      { id: "ids", label: "IDS/IPS" },
    ],
  },
  { id: "cloud", label: "클라우드" },
];

const [selected, setSelected] = useState<string | undefined>();

<Tree nodes={nodes} selectedId={selected} onSelect={setSelected} />`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <BasicTreeDemo />
          </div>
        </Card>
      </Section>

      {/* 깊은 중첩 */}
      <Section gap={16}>
        <SectionTitle>깊은 중첩 구조</SectionTitle>
        <Card>
          <div
            style={{
              border: `1px solid ${t.border}`,
              borderRadius: t.radiusSm,
              padding: 12,
              background: t.bg,
              maxWidth: 300,
            }}
          >
            <Tree nodes={DEEP_NODES} />
          </div>
        </Card>
      </Section>

      {/* 비활성화 */}
      <Section gap={16}>
        <SectionTitle>비활성화 노드 (disabled)</SectionTitle>
        <Card>
          <CodeBlock>{`const nodes: TreeNode[] = [
  {
    id: "rules",
    label: "정책",
    children: [
      { id: "active", label: "활성 정책" },
      { id: "inactive", label: "비활성 정책", disabled: true },
    ],
  },
];`}</CodeBlock>
          <div
            style={{
              marginTop: 16,
              border: `1px solid ${t.border}`,
              borderRadius: t.radiusSm,
              padding: 12,
              background: t.bg,
              maxWidth: 240,
            }}
          >
            <Tree nodes={NODES_WITH_DISABLED} />
          </div>
        </Card>
      </Section>

      {/* Controlled */}
      <Section gap={16}>
        <SectionTitle>Controlled 모드</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: t.textSecondary, lineHeight: 1.6 }}>
            <InlineCode>expandedIds</InlineCode> + <InlineCode>onExpandChange</InlineCode>를 전달하면 펼치기 상태를
            외부에서 제어합니다.
          </p>
          <CodeBlock>{`const [expandedIds, setExpandedIds] = useState<string[]>(["network"]);

<Tree
  nodes={nodes}
  expandedIds={expandedIds}
  onExpandChange={setExpandedIds}
  selectedId={selected}
  onSelect={setSelected}
/>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <ControlledTreeDemo />
          </div>
        </Card>
      </Section>
    </DocPage>
  ),
}
