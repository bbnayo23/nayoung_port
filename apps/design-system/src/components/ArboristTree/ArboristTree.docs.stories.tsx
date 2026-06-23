import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { ArboristTree } from './ArboristTree'
import type { TreeNodeData } from './ArboristTree'

const meta = {
  title: 'StyleGuide/ArboristTree',
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

// ─── 샘플 데이터 ──────────────────────────────────────────────────────────────

const SAMPLE_NODES: TreeNodeData[] = [
  {
    value: 1,
    label: '프론트엔드',
    name: '프론트엔드',
    dataType: 'GROUP',
    children: [
      { value: 11, label: 'React', name: 'React', dataType: 'FILE', count: 12 },
      { value: 12, label: 'TypeScript', name: 'TypeScript', dataType: 'FILE', count: 8 },
      {
        value: 13,
        label: '컴포넌트',
        name: '컴포넌트',
        dataType: 'GROUP',
        children: [
          { value: 131, label: 'Button', name: 'Button', dataType: 'FILE' },
          { value: 132, label: 'Input (disabled)', name: 'Input (disabled)', dataType: 'FILE', disabled: true },
        ],
      },
    ],
  },
  {
    value: 2,
    label: '백엔드',
    name: '백엔드',
    dataType: 'GROUP',
    children: [
      { value: 21, label: 'Node.js', name: 'Node.js', dataType: 'FILE' },
      { value: 22, label: 'PostgreSQL', name: 'PostgreSQL', dataType: 'FILE', count: 5 },
    ],
  },
  { value: 3, label: '설계 문서', name: '설계 문서', dataType: 'FILE' },
]

const withCheckbox = (list: TreeNodeData[]): TreeNodeData[] =>
  list.map((n) => ({
    ...n,
    showCheckbox: true,
    children: n.children ? withCheckbox(n.children) : undefined,
  }))

const CHECKBOX_NODES = withCheckbox(SAMPLE_NODES)

// 데모용 고정 박스 — 트리는 부모 크기에 맞춰 늘어나므로 너비/높이가 필요하다.
const Demo = ({ children, w = 320, h = 280 }: { children: ReactNode; w?: number; h?: number }) => (
  <div style={{ width: w, height: h }}>{children}</div>
)

const DocumentationView = () => {
  const [singleChecked, setSingleChecked] = useState<(string | number)[]>([])
  const [multiChecked, setMultiChecked] = useState<(string | number)[]>([11, 22])
  const [clicked, setClicked] = useState<TreeNodeData | null>(null)
  const [search, setSearch] = useState('')

  return (
    <DocPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>ArboristTree</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          react-arborist 기반 가상화 트리 뷰 컴포넌트입니다. 폴더 / 파일 계층 구조, 검색, 체크박스 선택(단일 · 다중),
          클릭 핸들링, 로딩 상태를 지원합니다. 컨테이너 크기에 맞춰 자동으로 늘어나므로 너비 · 높이가 있는 래퍼 안에서
          사용합니다.
        </p>
        <CodeBlock>{`import { ArboristTree } from '@nayoung-port/design-system/components/ArboristTree'
import type { TreeNodeData, CheckType } from '@nayoung-port/design-system/components/ArboristTree'`}</CodeBlock>
      </div>

      <Section>
        <SectionTitle>API — ArboristTree</SectionTitle>
        <DocCard>
          <PropsTable
            rows={[
              {
                name: 'nodes',
                type: 'TreeNodeData[]',
                defaultVal: '[]',
                desc: '렌더링할 트리 노드 배열. children 으로 계층을 구성한다.',
              },
              {
                name: 'checkType',
                type: "'single' | 'multi' | 'click'",
                defaultVal: "'click'",
                desc: '선택 모드 — click(행 클릭 콜백) · single(단일 선택) · multi(다중 선택)',
              },
              {
                name: 'checkedSeqList',
                type: '(string | number)[]',
                desc: '선택된 노드의 seq(없으면 value) 목록. controlled 선택 상태.',
              },
              {
                name: 'handleCheckedSeq',
                type: '(checkedSeqList, targetNode?) => void',
                desc: 'single · multi 모드에서 선택이 바뀔 때 호출. 갱신된 목록과 대상 노드를 전달한다.',
              },
              {
                name: 'handleClickedNode',
                type: '(targetNode: TreeNodeData) => void',
                desc: 'click 모드에서 행 클릭 시 호출. 클릭된 노드 데이터를 전달한다.',
              },
              {
                name: 'enableSearchArea',
                type: 'boolean',
                defaultVal: 'true',
                desc: '타이틀 영역의 검색 입력 표시 여부.',
              },
              {
                name: 'searchValue',
                type: 'string',
                desc: 'controlled 검색어. onSearchChange 와 함께 주면 내부 검색 상태를 우회한다.',
              },
              {
                name: 'onSearchChange',
                type: '(value: string) => void',
                desc: '검색어 변경 콜백.',
              },
              {
                name: 'searchPlaceholder',
                type: 'string',
                defaultVal: "'Search...'",
                desc: '검색 입력 placeholder.',
              },
              {
                name: 'isExpandAll',
                type: 'boolean',
                defaultVal: 'true',
                desc: '초기 렌더 시 모든 노드를 펼칠지 여부(openByDefault).',
              },
              {
                name: 'noBorder',
                type: 'boolean',
                defaultVal: 'false',
                desc: '트리 본문 테두리 제거.',
              },
              {
                name: 'isLoading',
                type: 'boolean',
                defaultVal: 'false',
                desc: 'true 면 트리 대신 "Loading..." 플레이스홀더를 표시한다.',
              },
              {
                name: 'hideTitleArea',
                type: 'boolean',
                defaultVal: 'false',
                desc: '타이틀 + 검색 영역 전체를 숨긴다.',
              },
              {
                name: 'title',
                type: 'string',
                desc: '타이틀 영역에 표시할 제목 텍스트.',
              },
              {
                name: 'height',
                type: 'number | string',
                desc: '고정 높이. 지정하면 flex 늘어남 대신 고정 픽셀/CSS 값으로 본문 높이를 잡는다.',
              },
              {
                name: 'className',
                type: 'string',
                desc: '루트 컨테이너에 병합되는 추가 클래스.',
              },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>타입 — TreeNodeData</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          각 노드의 형태입니다. <InlineCode>seq</InlineCode> 가 있으면 id 로 사용되고, 없으면{' '}
          <InlineCode>value</InlineCode> 를 사용합니다. <InlineCode>{'[key: string]: unknown'}</InlineCode> 인덱스
          시그니처로 임의 필드 확장이 가능합니다.
        </p>
        <DocCard>
          <PropsTable
            rows={[
              { name: 'value', type: 'string | number', desc: '노드 식별 값(필수). seq 가 없을 때 id 로 쓰인다.' },
              { name: 'label', type: 'string', desc: '노드 라벨(필수). name 이 없을 때 표시 텍스트로 쓰인다.' },
              { name: 'name', type: 'string', desc: '표시 텍스트 · 검색 대상. 우선적으로 label 보다 먼저 쓰인다.' },
              { name: 'seq', type: 'number', desc: 'id · 선택 키. 있으면 value 대신 식별자로 사용.' },
              { name: 'children', type: 'TreeNodeData[]', desc: '자식 노드. 있으면 폴더(internal) 로 취급.' },
              { name: 'dataType', type: 'string', desc: "'GROUP' 이면 폴더 아이콘, 그 외엔 파일 아이콘으로 렌더." },
              { name: 'disabled', type: 'boolean', desc: 'true 면 클릭 · 선택 비활성 + 흐린 색상.' },
              { name: 'showCheckbox', type: 'boolean', desc: 'true 면 행 앞에 체크박스를 렌더.' },
              { name: 'indeterminate', type: 'boolean', desc: '체크박스 indeterminate(부분 선택) 표시.' },
              { name: 'count', type: 'number', desc: '정의되면 행 우측에 개수 배지로 표시.' },
              { name: 'isLeaf', type: 'boolean', desc: '리프 노드 표시 힌트.' },
              { name: 'hasChildren', type: 'boolean', desc: '자식 존재 힌트.' },
              { name: 'level', type: 'number', desc: '노드 깊이 힌트.' },
              { name: 'data', type: 'unknown', desc: '원본 데이터 등 임의 페이로드.' },
            ]}
          />
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>기본 — click 모드</SectionTitle>
        <CodeBlock>{`<ArboristTree
  nodes={nodes}
  checkType="click"
  handleClickedNode={(node) => console.log(node)}
/>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Demo>
              <ArboristTree
                nodes={SAMPLE_NODES}
                checkType="click"
                title="파일 탐색기"
                handleClickedNode={(node) => setClicked(node)}
              />
            </Demo>
            <div style={{ fontSize: 13, color: t.textSecondary, paddingTop: 36 }}>
              마지막 클릭 노드:{' '}
              <strong style={{ color: t.text }}>{clicked ? (clicked.name ?? clicked.label) : '(없음)'}</strong>
              <p style={{ margin: '8px 0 0', lineHeight: 1.7 }}>
                폴더(<InlineCode>dataType: 'GROUP'</InlineCode>)는 펼침/접힘 토글, 개수가 있는 노드는 우측에 배지가
                표시됩니다. 비활성 노드(<InlineCode>disabled</InlineCode>)는 흐리게 렌더됩니다.
              </p>
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>checkType — single 선택</SectionTitle>
        <CodeBlock>{`const [checked, setChecked] = useState<(string | number)[]>([])
<ArboristTree
  nodes={checkboxNodes}      // 노드에 showCheckbox: true
  checkType="single"
  checkedSeqList={checked}
  handleCheckedSeq={(list) => setChecked(list)}
/>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Demo>
              <ArboristTree
                nodes={CHECKBOX_NODES}
                checkType="single"
                checkedSeqList={singleChecked}
                handleCheckedSeq={(list) => setSingleChecked(list)}
                title="단일 선택"
              />
            </Demo>
            <div style={{ fontSize: 13, color: t.textSecondary, paddingTop: 36 }}>
              선택됨: <strong style={{ color: t.text }}>{singleChecked.length ? singleChecked.join(', ') : '(없음)'}</strong>
              <p style={{ margin: '8px 0 0', lineHeight: 1.7 }}>
                single 모드는 항상 하나만 선택되어 선택 행이 강조(브랜드 컬러 배경)됩니다.
              </p>
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>checkType — multi 선택</SectionTitle>
        <CodeBlock>{`<ArboristTree
  nodes={checkboxNodes}
  checkType="multi"
  checkedSeqList={checked}
  handleCheckedSeq={(list) => setChecked(list)}
/>`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Demo>
              <ArboristTree
                nodes={CHECKBOX_NODES}
                checkType="multi"
                checkedSeqList={multiChecked}
                handleCheckedSeq={(list) => setMultiChecked(list)}
                title={`다중 선택 (${multiChecked.length}개)`}
              />
            </Demo>
            <div style={{ fontSize: 13, color: t.textSecondary, paddingTop: 36 }}>
              선택됨: <strong style={{ color: t.text }}>{multiChecked.length ? multiChecked.join(', ') : '(없음)'}</strong>
              <p style={{ margin: '8px 0 0', lineHeight: 1.7 }}>
                multi 모드는 여러 노드를 토글 선택합니다. 체크박스 체크 시 브랜드 컬러 체크 마크가 표시됩니다.
              </p>
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>검색 — 내부 / 컨트롤드</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          기본은 내부 검색 상태입니다. <InlineCode>searchValue</InlineCode> +{' '}
          <InlineCode>onSearchChange</InlineCode> 를 함께 주면 controlled 로 동작합니다. 검색은 노드의{' '}
          <InlineCode>name</InlineCode>(없으면 <InlineCode>label</InlineCode>) 기준 부분 일치입니다.
        </p>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Demo>
              <ArboristTree
                nodes={SAMPLE_NODES}
                checkType="click"
                title="컨트롤드 검색"
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="이름으로 검색..."
              />
            </Demo>
            <div style={{ fontSize: 13, color: t.textSecondary, paddingTop: 36 }}>
              외부 검색어: <strong style={{ color: t.text }}>{search || '(없음)'}</strong>
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>레이아웃 변형 — noBorder · hideTitleArea · enableSearchArea</SectionTitle>
        <CodeBlock>{`<ArboristTree noBorder title="테두리 없음" />
<ArboristTree hideTitleArea />
<ArboristTree enableSearchArea={false} title="검색 없음" />`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>noBorder</InlineCode>
              <Demo h={240}>
                <ArboristTree nodes={SAMPLE_NODES} noBorder title="테두리 없음" />
              </Demo>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>hideTitleArea</InlineCode>
              <Demo h={240}>
                <ArboristTree nodes={SAMPLE_NODES} hideTitleArea />
              </Demo>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>enableSearchArea={'{false}'}</InlineCode>
              <Demo h={240}>
                <ArboristTree nodes={SAMPLE_NODES} enableSearchArea={false} title="검색 없음" />
              </Demo>
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>isExpandAll — 펼침 기본값</SectionTitle>
        <CodeBlock>{`<ArboristTree isExpandAll />        {/* 기본: 모두 펼침 */}
<ArboristTree isExpandAll={false} /> {/* 모두 접힘 */}`}</CodeBlock>
        <DocCard>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>isExpandAll</InlineCode>
              <Demo h={260}>
                <ArboristTree nodes={SAMPLE_NODES} isExpandAll title="모두 펼침" />
              </Demo>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InlineCode>isExpandAll={'{false}'}</InlineCode>
              <Demo h={260}>
                <ArboristTree nodes={SAMPLE_NODES} isExpandAll={false} title="모두 접힘" />
              </Demo>
            </div>
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>height — 고정 높이</SectionTitle>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
          <InlineCode>height</InlineCode> 를 주면 부모 flex 늘어남 대신 고정 높이로 잡힙니다. 래퍼에 높이를 줄 필요 없이
          숫자(px) 또는 CSS 문자열을 전달합니다.
        </p>
        <CodeBlock>{`<ArboristTree height={200} title="고정 높이 200px" />`}</CodeBlock>
        <DocCard>
          <div style={{ width: 320 }}>
            <ArboristTree nodes={SAMPLE_NODES} height={200} title="고정 높이 200px" />
          </div>
        </DocCard>
      </Section>

      <Section>
        <SectionTitle>isLoading — 로딩 상태</SectionTitle>
        <CodeBlock>{`<ArboristTree isLoading title="데이터 로딩 중" />`}</CodeBlock>
        <DocCard>
          <Demo h={200}>
            <ArboristTree nodes={SAMPLE_NODES} isLoading title="데이터 로딩 중" />
          </Demo>
        </DocCard>
      </Section>
    </DocPage>
  )
}

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
