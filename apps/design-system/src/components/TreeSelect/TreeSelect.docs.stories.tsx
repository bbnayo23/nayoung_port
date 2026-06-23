import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { TreeSelect } from './TreeSelect'
import type { TreeNodeData } from '../ArboristTree'

const meta = {
  title: 'StyleGuide/TreeSelect',
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

const sampleTree: TreeNodeData[] = [
  {
    value: 'frontend',
    label: '프론트엔드',
    children: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
    ],
  },
  {
    value: 'backend',
    label: '백엔드',
    children: [
      { value: 'node', label: 'Node.js' },
      {
        value: 'java',
        label: 'Java',
        children: [
          { value: 'spring', label: 'Spring Boot' },
          { value: 'quarkus', label: 'Quarkus' },
        ],
      },
    ],
  },
  {
    value: 'devops',
    label: 'DevOps',
    children: [
      { value: 'docker', label: 'Docker' },
      { value: 'k8s', label: 'Kubernetes' },
    ],
  },
]

const DocumentationView = () => {
  const [single, setSingle] = useState<string | number | null>(null)
  const [multi, setMulti] = useState<(string | number)[]>([])
  const [smVal, setSmVal] = useState<string | number | null>(null)
  const [mdVal, setMdVal] = useState<string | number | null>(null)
  const [lgVal, setLgVal] = useState<string | number | null>(null)
  const [noSearchVal, setNoSearchVal] = useState<string | number | null>(null)

  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>TreeSelect</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 620 }}>
          react-select 의 컨트롤에 트리(ArboristTree) 메뉴를 결합한 드롭다운 컴포넌트입니다. 계층형 데이터에서 단일
          노드를 클릭 선택하거나 다중 체크 선택할 수 있고, 메뉴 내부 검색 · sm/md/lg 크기 · 비활성화 상태를 지원합니다.
          메뉴는 <InlineCode>document.body</InlineCode> 로 포털 렌더되며 <InlineCode>position: fixed</InlineCode> 로
          배치됩니다.
        </p>
        <CodeBlock>{`import { TreeSelect } from '@nayoung-port/design-system/components/TreeSelect'
import type { TreeNodeData } from '@nayoung-port/design-system/components/ArboristTree'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — TreeSelect</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'treeList',
                type: 'TreeNodeData[]',
                desc: '메뉴에 렌더할 계층형 트리 데이터. 필수.',
              },
              {
                name: 'value',
                type: 'string | number | null',
                desc: '단일 선택 모드에서 현재 선택된 노드의 value. treeList 에서 라벨을 역탐색해 컨트롤에 표시한다.',
              },
              {
                name: 'onChange',
                type: '(node: TreeNodeData) => void',
                desc: '단일 선택 모드에서 노드를 클릭하면 호출된다. 선택 후 메뉴가 닫힌다.',
              },
              {
                name: 'values',
                type: '(string | number)[]',
                desc: '다중 선택 모드에서 체크된 노드 value 배열. 컨트롤에는 "N건 선택" 으로 요약 표시된다.',
              },
              {
                name: 'onMultiChange',
                type: '(seqs: (string | number)[], nodes: TreeNodeData[]) => void',
                desc: '다중 선택 모드에서 체크 상태가 바뀌거나 clear 될 때 호출된다. 선택된 value 배열과 노드 배열을 함께 넘긴다.',
              },
              {
                name: 'multiSelect',
                type: 'boolean',
                defaultVal: 'false',
                desc: 'true 면 다중 체크 선택 모드. checkType 보다 우선해 multi 로 강제하며, 선택 후에도 메뉴를 닫지 않는다.',
              },
              {
                name: 'checkType',
                type: "'single' | 'multi' | 'click'",
                defaultVal: "'click'",
                desc: '단일 모드에서의 트리 동작 타입. multiSelect=true 면 무시되고 multi 로 동작한다.',
              },
              {
                name: 'placeholder',
                type: 'string',
                defaultVal: "'선택하세요'",
                desc: '선택값이 없을 때 컨트롤에 표시되는 안내 문구.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                defaultVal: 'false',
                desc: 'true 면 컨트롤이 비활성화되어 메뉴를 열 수 없다.',
              },
              {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                defaultVal: "'md'",
                desc: '컨트롤 높이/패딩 밀도. ReactSelect 의 사이즈 클래스를 재사용한다.',
              },
              {
                name: 'searchable',
                type: 'boolean',
                defaultVal: 'true',
                desc: 'true 면 메뉴 상단에 트리 검색 영역을 노출한다. false 면 타이틀 영역까지 숨긴다.',
              },
              {
                name: 'treeHeight',
                type: 'number',
                defaultVal: '300',
                desc: '메뉴 내부 트리 영역의 높이(px).',
              },
              {
                name: 'enableVirtualization',
                type: 'boolean',
                defaultVal: 'true',
                desc: '트리 행 가상화 사용 여부. 대량 데이터에서 렌더 비용을 줄인다.',
              },
              {
                name: 'menuMinWidth',
                type: 'number',
                desc: '지정 시 메뉴 래퍼와 메뉴 컨테이너의 너비(px)를 고정한다.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '루트 래퍼 div 에 병합되는 추가 클래스.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>타입 — TreeNodeData</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              { name: 'value', type: 'string | number', desc: '노드 식별값. 선택/체크 비교 및 라벨 역탐색의 키.' },
              { name: 'label', type: 'string', desc: '노드에 표시되는 라벨 텍스트.' },
              { name: 'children', type: 'TreeNodeData[]', desc: '자식 노드. 있으면 폴더(internal) 로 취급된다.' },
              { name: 'disabled', type: 'boolean', desc: '해당 노드의 선택/체크 비활성화.' },
              { name: 'seq', type: 'number', desc: '내부 식별용 보조 키(없으면 value 로 대체).' },
            ]}
          />
          <p style={{ margin: '12px 0 0', fontSize: 12, color: t.textMuted, lineHeight: 1.7 }}>
            TreeNodeData 는 위 외에도 name · count · isLeaf 등 선택 필드와 인덱스 시그니처를 가집니다. 전체 정의는
            ArboristTree 문서를 참고하세요.
          </p>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Single Select — 단일 선택</SectionTitle>
        <CodeBlock>{`const [value, setValue] = useState<string | number | null>(null)

<TreeSelect
  treeList={treeList}
  value={value}
  onChange={(node) => setValue(node.value)}
/>`}</CodeBlock>
        <DocCard>
          <div style={{ width: 280 }}>
            <TreeSelect treeList={sampleTree} value={single} onChange={(node) => setSingle(node.value)} />
          </div>
          <p style={{ margin: '12px 0 0', fontSize: 12, color: t.textMuted }}>
            현재 선택: {single !== null ? <InlineCode>{String(single)}</InlineCode> : '없음'}
          </p>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Multi Select — 다중 선택</SectionTitle>
        <CodeBlock>{`const [values, setValues] = useState<(string | number)[]>([])

<TreeSelect
  treeList={treeList}
  multiSelect
  values={values}
  onMultiChange={(seqs) => setValues(seqs)}
/>`}</CodeBlock>
        <DocCard>
          <div style={{ width: 280 }}>
            <TreeSelect
              treeList={sampleTree}
              multiSelect
              values={multi}
              onMultiChange={(seqs) => setMulti(seqs)}
            />
          </div>
          <p style={{ margin: '12px 0 0', fontSize: 12, color: t.textMuted, lineHeight: 1.7 }}>
            다중 모드에서는 컨트롤에 <InlineCode>N건 선택</InlineCode> 요약이 표시되고, 선택 후에도 메뉴가 닫히지
            않으며 clear 버튼이 노출됩니다. 현재 {multi.length}건 선택.
          </p>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Size — 크기</SectionTitle>
        <CodeBlock>{`<TreeSelect size="sm" ... />
<TreeSelect size="md" ... />
<TreeSelect size="lg" ... />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>size=&quot;sm&quot;</InlineCode>
              <TreeSelect
                treeList={sampleTree}
                size="sm"
                value={smVal}
                onChange={(n) => setSmVal(n.value)}
                placeholder="Small"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>size=&quot;md&quot;</InlineCode>
              <TreeSelect
                treeList={sampleTree}
                size="md"
                value={mdVal}
                onChange={(n) => setMdVal(n.value)}
                placeholder="Medium"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>size=&quot;lg&quot;</InlineCode>
              <TreeSelect
                treeList={sampleTree}
                size="lg"
                value={lgVal}
                onChange={(n) => setLgVal(n.value)}
                placeholder="Large"
              />
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Searchable — 메뉴 내 검색</SectionTitle>
        <CodeBlock>{`<TreeSelect searchable />        {/* 기본값: 검색 영역 노출 */}
<TreeSelect searchable={false} /> {/* 검색·타이틀 영역 숨김 */}`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 280 }}>
              <InlineCode>searchable</InlineCode>
              <TreeSelect treeList={sampleTree} value={single} onChange={(n) => setSingle(n.value)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 280 }}>
              <InlineCode>searchable={'{false}'}</InlineCode>
              <TreeSelect
                treeList={sampleTree}
                searchable={false}
                value={noSearchVal}
                onChange={(n) => setNoSearchVal(n.value)}
              />
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>Disabled — 비활성화</SectionTitle>
        <CodeBlock>{`<TreeSelect treeList={treeList} disabled value="react" onChange={() => {}} />`}</CodeBlock>
        <DocCard>
          <div style={{ width: 280 }}>
            <TreeSelect treeList={sampleTree} disabled value="react" onChange={() => {}} />
          </div>
          <p style={{ margin: '12px 0 0', fontSize: 12, color: t.textMuted }}>
            disabled 상태에서는 컨트롤이 흐려지고 메뉴를 열 수 없습니다.
          </p>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>treeHeight · menuMinWidth — 메뉴 치수</SectionTitle>
        <CodeBlock>{`<TreeSelect treeList={treeList} treeHeight={180} menuMinWidth={360} />`}</CodeBlock>
        <DocCard>
          <div style={{ width: 280 }}>
            <TreeSelect
              treeList={sampleTree}
              treeHeight={180}
              menuMinWidth={360}
              value={mdVal}
              onChange={(n) => setMdVal(n.value)}
            />
          </div>
          <p style={{ margin: '12px 0 0', fontSize: 12, color: t.textMuted, lineHeight: 1.7 }}>
            <InlineCode>treeHeight</InlineCode> 로 메뉴 내부 트리 영역 높이를, <InlineCode>menuMinWidth</InlineCode> 로
            메뉴 너비를 고정합니다.
          </p>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
