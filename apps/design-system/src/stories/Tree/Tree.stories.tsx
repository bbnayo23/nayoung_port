import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '@dc/theme/contract.css'
import { Tree } from '@dc/components/Tree'
import { Dropdown } from '@dc/components/Dropdown'
import type { TreeNode, TreeProps } from '@dc/components/Tree'
import type { DropdownOption } from '@dc/components/Dropdown'

const meta = {
  title: 'StyleGuide/Tree',
  component: Tree,
  parameters: { layout: 'padded' },
  argTypes: {
    selectedId: { control: 'text', description: '선택된 노드 ID' },
    expandedIds: { control: false, description: '펼쳐진 노드 ID 목록' },
    nodes: { control: false },
    onSelect: { table: { disable: true } },
    onExpandChange: { table: { disable: true } },
  },
  args: {
    nodes: [],
  },
} satisfies Meta<typeof Tree>

export default meta
type Story = StoryObj<typeof meta>

// ── Sample data ────────────────────────────────────────────────────────────────

const sampleNodes: TreeNode[] = [
  {
    id: 'security',
    label: '보안 정책',
    children: [
      {
        id: 'network',
        label: '네트워크 보안',
        children: [
          { id: 'firewall', label: '방화벽 설정' },
          { id: 'ids', label: 'IDS/IPS 정책' },
          { id: 'vpn', label: 'VPN 설정' },
        ],
      },
      {
        id: 'endpoint',
        label: '엔드포인트 보안',
        children: [
          { id: 'antivirus', label: '안티바이러스' },
          { id: 'dlp', label: 'DLP 정책', disabled: true },
        ],
      },
    ],
  },
  {
    id: 'logs',
    label: '로그 관리',
    children: [
      { id: 'syslog', label: '시스템 로그' },
      { id: 'auditlog', label: '감사 로그' },
      { id: 'accesslog', label: '접근 로그' },
    ],
  },
  {
    id: 'users',
    label: '사용자 관리',
    children: [
      { id: 'admin', label: '관리자' },
      { id: 'operator', label: '운영자' },
      { id: 'viewer', label: '조회자' },
    ],
  },
]

const deepNodes: TreeNode[] = [
  {
    id: 'root',
    label: '루트',
    children: [
      {
        id: 'l1-a',
        label: '1단계 A',
        children: [
          {
            id: 'l2-a1',
            label: '2단계 A-1',
            children: [
              { id: 'l3-a1a', label: '3단계 A-1-a' },
              { id: 'l3-a1b', label: '3단계 A-1-b' },
            ],
          },
          { id: 'l2-a2', label: '2단계 A-2' },
        ],
      },
      {
        id: 'l1-b',
        label: '1단계 B',
        children: [
          { id: 'l2-b1', label: '2단계 B-1' },
          {
            id: 'l2-b2',
            label: '2단계 B-2',
            children: [
              { id: 'l3-b2a', label: '3단계 B-2-a' },
              { id: 'l3-b2b', label: '3단계 B-2-b' },
            ],
          },
        ],
      },
    ],
  },
]

// ── Card wrapper ───────────────────────────────────────────────────────────────

const Card = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <div
    style={{
      background: vars.color.surface,
      border: `1px solid ${vars.color.border}`,
      borderRadius: vars.radius.md,
      padding: 16,
      minWidth: 240,
    }}
  >
    {title && (
      <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, color: vars.color.textMuted, letterSpacing: 0.5 }}>
        {title}
      </p>
    )}
    {children}
  </div>
)

// ── Playground ─────────────────────────────────────────────────────────────────

/** Controls 패널에서 props를 조정합니다. */
export const Playground: Story = {
  render: (args: TreeProps) => (
    <Card>
      <Tree {...args} nodes={sampleNodes} />
    </Card>
  ),
}

// ── Default ────────────────────────────────────────────────────────────────────

/** 기본 트리. 화살표 클릭으로 펼치고, 노드 클릭으로 선택합니다. */
export const Default: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string>()
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Card>
          <Tree nodes={sampleNodes} selectedId={selectedId} onSelect={setSelectedId} />
        </Card>
        {selectedId && (
          <p style={{ margin: 0, fontSize: 12, color: vars.color.textSecondary }}>
            선택: <strong style={{ color: vars.color.text }}>{selectedId}</strong>
          </p>
        )}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── DeepNesting ────────────────────────────────────────────────────────────────

/** 3단계 이상 중첩된 트리 구조입니다. */
export const DeepNesting: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string>()
    return (
      <Card>
        <Tree nodes={deepNodes} selectedId={selectedId} onSelect={setSelectedId} />
      </Card>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── DisabledNodes ──────────────────────────────────────────────────────────────

/** disabled 노드는 선택·포커스가 불가합니다. */
export const DisabledNodes: Story = {
  render: () => (
    <Card>
      <Tree nodes={sampleNodes} selectedId="firewall" expandedIds={['security', 'endpoint']} />
    </Card>
  ),
  parameters: { controls: { disable: true } },
}

// ── Controlled ────────────────────────────────────────────────────────────────

/** expandedIds를 외부에서 제어합니다. */
export const Controlled: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string>()
    const [expandedIds, setExpandedIds] = useState<string[]>(['security', 'logs'])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['security', 'logs', 'users'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() =>
                setExpandedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
              }
              style={{
                padding: '4px 12px',
                fontSize: 11,
                border: `1px solid ${vars.color.border}`,
                borderRadius: vars.radius.sm,
                background: expandedIds.includes(id) ? vars.color.primary : 'transparent',
                color: expandedIds.includes(id) ? '#fff' : vars.color.textSecondary,
                cursor: 'pointer',
              }}
            >
              {id}
            </button>
          ))}
        </div>
        <Card>
          <Tree
            nodes={sampleNodes}
            expandedIds={expandedIds}
            onExpandChange={setExpandedIds}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </Card>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── DropdownTree ───────────────────────────────────────────────────────────────

/** Dropdown 컴포넌트의 renderPanel을 사용해 Tree를 패널로 표시합니다. */
export const DropdownTree: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string>()

    const findNode = (nodes: TreeNode[], id: string): TreeNode | undefined => {
      for (const n of nodes) {
        if (n.id === id) return n
        if (n.children) {
          const found = findNode(n.children, id)
          if (found) return found
        }
      }
    }

    const selectedNode = selectedId ? findNode(sampleNodes, selectedId) : undefined
    const triggerOptions: DropdownOption[] = selectedNode
      ? [{ value: selectedId!, label: String(selectedNode.label) }]
      : []

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Dropdown
          options={triggerOptions}
          value={selectedId}
          placeholder="항목 선택"
          renderPanel={(close) => (
            <div style={{ padding: '8px 0', minWidth: 240 }}>
              <Tree
                nodes={sampleNodes}
                selectedId={selectedId}
                onSelect={(id) => {
                  setSelectedId(id)
                  close()
                }}
              />
            </div>
          )}
        />
        {selectedId && (
          <p style={{ margin: 0, fontSize: 12, color: vars.color.textSecondary }}>
            선택: <strong style={{ color: vars.color.text }}>{selectedId}</strong>
          </p>
        )}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
