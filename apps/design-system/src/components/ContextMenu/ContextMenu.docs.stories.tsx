import { useState } from 'react'
import type { MouseEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { ContextMenu } from './ContextMenu'
import type { ContextMenuItem } from './ContextMenu'

const meta = {
  title: 'StyleGuide/ContextMenu',
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

// 우클릭 트리거 영역 + ContextMenu 를 묶은 시연용 컴포넌트
const MenuDemo = ({ items, hint }: { items: ContextMenuItem[]; hint?: string }) => {
  const [state, setState] = useState({ open: false, x: 0, y: 0 })

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    setState({ open: true, x: e.clientX, y: e.clientY })
  }

  return (
    <>
      <div
        onContextMenu={handleContextMenu}
        style={{
          height: 120,
          border: `1px dashed ${t.border}`,
          borderRadius: t.radiusSm,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          color: t.textSecondary,
          userSelect: 'none',
          cursor: 'context-menu',
          background: t.surfaceHover,
        }}
      >
        {hint ?? '여기서 우클릭하여 메뉴 열기'}
      </div>
      <ContextMenu
        open={state.open}
        x={state.x}
        y={state.y}
        items={items}
        onClose={() => setState((s) => ({ ...s, open: false }))}
      />
    </>
  )
}

const DocumentationView = () => {
  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>ContextMenu</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          우클릭 등으로 임의 좌표에 띄우는 컨텍스트 메뉴입니다. <InlineCode>open</InlineCode> 으로 표시 여부를 제어하는
          완전 제어형(controlled) 컴포넌트이며, <InlineCode>x</InlineCode>·<InlineCode>y</InlineCode> 좌표를 뷰포트
          안으로 자동 클램프합니다. Portal 로 렌더되어 키보드 내비게이션(↑·↓·←·→·Enter·Esc), 외부 클릭 닫기, 디바이더,
          비활성 항목, 아이콘, 무한 중첩 서브메뉴를 지원합니다.
        </p>
        <CodeBlock>{`import { ContextMenu } from '@nayoung-port/design-system/components/ContextMenu'
import type { ContextMenuItem, ContextMenuProps } from '@nayoung-port/design-system/components/ContextMenu'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>기본 사용법</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          좌표(<InlineCode>x</InlineCode>/<InlineCode>y</InlineCode>)와 표시 여부(<InlineCode>open</InlineCode>)는 호출부의
          state 로 관리합니다. <InlineCode>onContextMenu</InlineCode> 에서 <InlineCode>e.clientX/clientY</InlineCode> 를
          저장해 메뉴를 엽니다.
        </p>
        <CodeBlock>{`const [state, setState] = useState({ open: false, x: 0, y: 0 })

<div onContextMenu={(e) => { e.preventDefault(); setState({ open: true, x: e.clientX, y: e.clientY }) }}>
  우클릭하세요
</div>
<ContextMenu
  open={state.open}
  x={state.x}
  y={state.y}
  items={[
    { key: 'copy', label: '복사', onSelect: () => {} },
    { key: 'paste', label: '붙여넣기', onSelect: () => {} },
    { key: 'delete', label: '삭제', onSelect: () => {} },
  ]}
  onClose={() => setState((s) => ({ ...s, open: false }))}
/>`}</CodeBlock>
        <DocCard>
          <MenuDemo
            items={[
              { key: 'copy', label: '복사', onSelect: () => {} },
              { key: 'paste', label: '붙여넣기', onSelect: () => {} },
              { key: 'delete', label: '삭제', onSelect: () => {} },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>API — ContextMenuProps</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'open',
                type: 'boolean',
                desc: '메뉴 표시 여부. false 면 아무것도 렌더하지 않는다(null 반환).',
              },
              {
                name: 'x',
                type: 'number',
                desc: '뷰포트 기준 좌측 x 좌표(px). 메뉴 너비를 고려해 화면 안으로 자동 클램프된다.',
              },
              {
                name: 'y',
                type: 'number',
                desc: '뷰포트 기준 상단 y 좌표(px). 메뉴 높이를 고려해 화면 안으로 자동 클램프된다.',
              },
              {
                name: 'items',
                type: 'ContextMenuItem[]',
                desc: '렌더할 메뉴 항목 배열. divider · disabled · icon · children(서브메뉴)을 지원한다.',
              },
              {
                name: 'onClose',
                type: '() => void',
                desc: '항목 선택, 외부 클릭, Esc 시 호출된다. 호출부에서 open 을 false 로 되돌린다.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>API — ContextMenuItem</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'key',
                type: 'string',
                desc: '항목의 고유 키. React key 로 사용된다(필수).',
              },
              {
                name: 'label',
                type: 'string',
                desc: '항목에 표시되는 텍스트. divider 항목은 빈 문자열로 둔다.',
              },
              {
                name: 'icon',
                type: 'ReactNode',
                desc: '라벨 앞에 표시되는 16×16 아이콘 슬롯.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                defaultVal: 'false',
                desc: '비활성 항목. 흐리게 표시되고 클릭·키보드 선택이 무시된다.',
              },
              {
                name: 'divider',
                type: 'boolean',
                defaultVal: 'false',
                desc: 'true 면 항목 대신 구분선(separator) 행으로 렌더된다.',
              },
              {
                name: 'onSelect',
                type: '() => void',
                desc: 'leaf 항목 선택 시 콜백. 선택 후 onClose 가 자동 호출된다. children 이 있으면 optional.',
              },
              {
                name: 'children',
                type: 'ContextMenuItem[]',
                desc: '서브메뉴 항목 배열. 있으면 우측에 chevron(▶)이 표시되고 hover/→ 키로 펼쳐진다.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Divider — 구분선</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          <InlineCode>divider: true</InlineCode> 항목은 라벨 없이 가는 구분선으로 렌더되어 항목 그룹을 시각적으로
          나눕니다.
        </p>
        <CodeBlock>{`items={[
  { key: 'copy', label: '복사', onSelect: () => {} },
  { key: 'paste', label: '붙여넣기', onSelect: () => {} },
  { key: 'd1', label: '', divider: true },
  { key: 'delete', label: '삭제', onSelect: () => {} },
]}`}</CodeBlock>
        <DocCard>
          <MenuDemo
            hint="우클릭 — 구분선 포함 메뉴"
            items={[
              { key: 'copy', label: '복사', onSelect: () => {} },
              { key: 'paste', label: '붙여넣기', onSelect: () => {} },
              { key: 'd1', label: '', divider: true },
              { key: 'delete', label: '삭제', onSelect: () => {} },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Disabled — 비활성 항목</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          <InlineCode>disabled: true</InlineCode> 항목은 흐리게(opacity 0.4) 표시되며 클릭과 키보드 내비게이션 대상에서
          모두 제외됩니다.
        </p>
        <CodeBlock>{`items={[
  { key: 'copy', label: '복사', onSelect: () => {} },
  { key: 'paste', label: '붙여넣기', onSelect: () => {}, disabled: true },
  { key: 'd1', label: '', divider: true },
  { key: 'delete', label: '삭제', onSelect: () => {} },
]}`}</CodeBlock>
        <DocCard>
          <MenuDemo
            hint="우클릭 — 비활성 항목 포함 메뉴"
            items={[
              { key: 'copy', label: '복사', onSelect: () => {} },
              { key: 'paste', label: '붙여넣기', onSelect: () => {}, disabled: true },
              { key: 'd1', label: '', divider: true },
              { key: 'delete', label: '삭제', onSelect: () => {} },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Icon — 아이콘 항목</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          <InlineCode>icon</InlineCode> 슬롯에 임의의 ReactNode 를 넣어 라벨 앞에 아이콘을 표시합니다.
        </p>
        <CodeBlock>{`items={[
  { key: 'copy', label: '복사', icon: <span>📋</span>, onSelect: () => {} },
  { key: 'edit', label: '편집', icon: <span>✏️</span>, onSelect: () => {} },
  { key: 'delete', label: '삭제', icon: <span>🗑️</span>, onSelect: () => {} },
]}`}</CodeBlock>
        <DocCard>
          <MenuDemo
            hint="우클릭 — 아이콘 메뉴"
            items={[
              { key: 'copy', label: '복사', icon: <span>📋</span>, onSelect: () => {} },
              { key: 'edit', label: '편집', icon: <span>✏️</span>, onSelect: () => {} },
              { key: 'delete', label: '삭제', icon: <span>🗑️</span>, onSelect: () => {} },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>SubMenu — 중첩 서브메뉴</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          <InlineCode>children</InlineCode> 가 있는 항목은 우측에 chevron(▶)을 표시하고 hover 또는 → 키로 서브메뉴를
          펼칩니다. 화면 우측 공간이 부족하면 서브메뉴가 왼쪽으로 자동 flip 됩니다. 서브메뉴 안에 다시{' '}
          <InlineCode>children</InlineCode> 을 두어 더 깊게 중첩할 수 있습니다.
        </p>
        <CodeBlock>{`items={[
  { key: 'copy', label: '복사', onSelect: () => {} },
  {
    key: 'condition',
    label: '조건 추가',
    children: [
      { key: 'include', label: '이 값으로 쿼리 추가', onSelect: () => {} },
      { key: 'exclude', label: '이 값 제외', onSelect: () => {} },
      { key: 'd1', label: '', divider: true },
      { key: 'detail', label: '상세 보기', onSelect: () => {} },
    ],
  },
]}`}</CodeBlock>
        <DocCard>
          <MenuDemo
            hint="우클릭 후 '조건 추가' 에 hover"
            items={[
              { key: 'copy', label: '복사', onSelect: () => {} },
              { key: 'copy-row', label: '행 복사', onSelect: () => {} },
              {
                key: 'condition',
                label: '조건 추가',
                children: [
                  { key: 'include', label: '이 값으로 쿼리 추가', onSelect: () => {} },
                  { key: 'exclude', label: '이 값 제외', onSelect: () => {} },
                  { key: 'nested', label: '중첩검색으로 추가', onSelect: () => {} },
                  { key: 'd1', label: '', divider: true },
                  { key: 'detail', label: '상세 보기', onSelect: () => {} },
                ],
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>키보드 내비게이션 & 닫기 동작</SectionTitle>
        <DocCard>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.9, color: t.textSecondary }}>
            <li>
              <InlineCode>↑</InlineCode> / <InlineCode>↓</InlineCode> — 선택 가능한 항목 간 이동(디바이더·비활성 스킵,
              끝에서 루프)
            </li>
            <li>
              <InlineCode>→</InlineCode> — children 이 있는 항목에서 서브메뉴 열기
            </li>
            <li>
              <InlineCode>←</InlineCode> — 열린 서브메뉴 닫기
            </li>
            <li>
              <InlineCode>Enter</InlineCode> — 현재 항목 선택(또는 서브메뉴 열기)
            </li>
            <li>
              <InlineCode>Esc</InlineCode> — 메뉴 닫기(<InlineCode>onClose</InlineCode> 호출)
            </li>
            <li>메뉴 바깥 클릭 시 자동으로 닫힘</li>
            <li>측정 전 첫 프레임은 visibility: hidden 으로 깜빡임을 방지하고, 위치는 뷰포트 안으로 클램프됨</li>
          </ul>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
