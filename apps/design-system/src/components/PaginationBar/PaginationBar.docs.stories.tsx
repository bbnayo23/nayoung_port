import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { PaginationBar } from './PaginationBar'

const meta = {
  title: 'StyleGuide/PaginationBar',
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

// 제어 컴포넌트 — currentPage / pageSize 상태를 보유하는 데모 래퍼.
// hook 은 반드시 DocumentationView 내부에서 렌더되는 이 함수 컴포넌트 안에서만 호출한다.
type DemoProps = {
  totalCount: number
  initialPage?: number
  initialPageSize?: number
  pageSizeOptions?: readonly number[]
  maxDisplay?: number
  disabled?: boolean
  showRight?: boolean
}
const PaginationBarDemo = ({
  totalCount,
  initialPage = 1,
  initialPageSize = 50,
  pageSizeOptions,
  maxDisplay,
  disabled = false,
  showRight = true,
}: DemoProps) => {
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const safePage = Math.min(page, totalPages)

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setPage(1)
  }

  return (
    <PaginationBar
      currentPage={safePage}
      totalPages={totalPages}
      totalCount={totalCount}
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      onPageChange={setPage}
      onPageSizeChange={handlePageSizeChange}
      maxDisplay={maxDisplay}
      disabled={disabled}
      showRight={showRight}
    />
  )
}

const DemoFrame = ({ children }: { children: ReactNode }) => (
  <DocCard style={{ padding: 0, overflow: 'hidden' }}>{children}</DocCard>
)

const DocumentationView = () => (
  <DocPage>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>PaginationBar</h1>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
        테이블·리스트 하단에 배치하는 페이지네이션 바입니다. 좌측은 페이지 당 항목 수 Dropdown, 가운데는 페이지 이동
        버튼(이전·다음·번호·말줄임), 우측은 직접 페이지 입력 영역으로 구성된 <InlineCode>1fr / auto / 1fr</InlineCode> 3분할
        그리드입니다. <InlineCode>currentPage</InlineCode>·<InlineCode>pageSize</InlineCode>를 부모가 소유하는 제어
        컴포넌트입니다.
      </p>
      <CodeBlock>{`import { PaginationBar } from '@nayoung-port/design-system/components/PaginationBar'`}</CodeBlock>
    </div>

    <Section>
      <SectionTitle>API — PaginationBar</SectionTitle>
      <DocCard>
        <PropsTable
          rows={[
            {
              name: 'currentPage',
              type: 'number',
              desc: '현재 페이지(1-based). 제어 값으로, 표시 시 1..totalPages 로 clamp 된다.',
            },
            {
              name: 'totalPages',
              type: 'number',
              desc: '전체 페이지 수. 가운데 페이지 버튼과 우측 "전체 N 페이지" 라벨의 기준.',
            },
            {
              name: 'totalCount',
              type: 'number',
              desc: '전체 항목 수. 우측 영역에 toLocaleString() 으로 천단위 구분되어 표시된다.',
            },
            {
              name: 'pageSize',
              type: 'number',
              desc: '현재 선택된 페이지 당 항목 수. 좌측 Dropdown 의 선택 값.',
            },
            {
              name: 'pageSizeOptions',
              type: 'readonly number[]',
              defaultVal: '[10, 20, 50, 100]',
              desc: '좌측 Dropdown 에 노출할 페이지 사이즈 후보 목록.',
            },
            {
              name: 'onPageChange',
              type: '(page: number) => void',
              desc: '페이지 변경 콜백. 버튼 클릭·우측 입력 commit 시 clamp 된 페이지 번호로 호출된다.',
            },
            {
              name: 'onPageSizeChange',
              type: '(size: number) => void',
              desc: '페이지 사이즈 변경 콜백. 보통 함께 currentPage 를 1 로 리셋한다.',
            },
            {
              name: 'maxDisplay',
              type: 'number',
              defaultVal: '5',
              desc: '가운데에 한 번에 노출할 페이지 번호 버튼 개수. 넘치면 양쪽 말줄임(…)으로 축약.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              defaultVal: 'false',
              desc: 'fetching 중 모든 컨트롤 비활성화. 루트에 aria-busy 가 부여된다.',
            },
            {
              name: 'showRight',
              type: 'boolean',
              defaultVal: 'true',
              desc: '우측 "전체 N 페이지 중 [입력] 페이지 (M 항목)" 영역 노출 여부. false 면 빈 슬롯으로 가운데 정렬 유지.',
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
      <SectionTitle>기본 사용</SectionTitle>
      <CodeBlock>{`const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(50)
const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

<PaginationBar
  currentPage={page}
  totalPages={totalPages}
  totalCount={totalCount}
  pageSize={pageSize}
  onPageChange={setPage}
  onPageSizeChange={(size) => { setPageSize(size); setPage(1) }}
/>`}</CodeBlock>
      <DemoFrame>
        <PaginationBarDemo totalCount={1000} initialPage={1} initialPageSize={50} />
      </DemoFrame>
    </Section>

    <Section>
      <SectionTitle>페이지 위치 — 이전/다음 비활성 & 말줄임</SectionTitle>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        첫 페이지에서는 이전(‹) 버튼이, 마지막 페이지에서는 다음(›) 버튼이 자동으로 비활성화됩니다. 가운데 페이지가
        많으면 양쪽 말줄임(…)으로 축약됩니다.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <InlineCode>첫 페이지 (이전 비활성, 오른쪽 말줄임)</InlineCode>
          <DemoFrame>
            <PaginationBarDemo totalCount={1000} initialPageSize={20} initialPage={1} />
          </DemoFrame>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <InlineCode>중간 페이지 (양쪽 말줄임)</InlineCode>
          <DemoFrame>
            <PaginationBarDemo totalCount={1000} initialPageSize={20} initialPage={25} />
          </DemoFrame>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <InlineCode>마지막 페이지 (다음 비활성, 왼쪽 말줄임)</InlineCode>
          <DemoFrame>
            <PaginationBarDemo totalCount={1000} initialPageSize={20} initialPage={50} />
          </DemoFrame>
        </div>
      </div>
    </Section>

    <Section>
      <SectionTitle>maxDisplay — 노출 버튼 개수</SectionTitle>
      <CodeBlock>{`<PaginationBar maxDisplay={3} ... />
<PaginationBar maxDisplay={7} ... />`}</CodeBlock>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <InlineCode>maxDisplay=&#123;3&#125;</InlineCode>
          <DemoFrame>
            <PaginationBarDemo totalCount={1000} initialPageSize={20} initialPage={25} maxDisplay={3} />
          </DemoFrame>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <InlineCode>maxDisplay=&#123;5&#125; (기본)</InlineCode>
          <DemoFrame>
            <PaginationBarDemo totalCount={1000} initialPageSize={20} initialPage={25} maxDisplay={5} />
          </DemoFrame>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <InlineCode>maxDisplay=&#123;7&#125;</InlineCode>
          <DemoFrame>
            <PaginationBarDemo totalCount={1000} initialPageSize={20} initialPage={25} maxDisplay={7} />
          </DemoFrame>
        </div>
      </div>
    </Section>

    <Section>
      <SectionTitle>pageSizeOptions — 페이지 사이즈 후보</SectionTitle>
      <CodeBlock>{`<PaginationBar
  pageSizeOptions={[20, 50, 100, 200, 500, 1000]}
  ...
/>`}</CodeBlock>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        좌측 Dropdown 을 열어 항목 수를 바꾸면 totalPages 가 재계산되고 페이지가 1 로 리셋됩니다. (기본값은{' '}
        <InlineCode>[10, 20, 50, 100]</InlineCode>)
      </p>
      <DemoFrame>
        <PaginationBarDemo
          totalCount={10_000}
          initialPageSize={100}
          initialPage={1}
          pageSizeOptions={[20, 50, 100, 200, 500, 1000]}
        />
      </DemoFrame>
    </Section>

    <Section>
      <SectionTitle>우측 페이지 직접 입력</SectionTitle>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        우측 입력란에 번호를 적고 Enter 또는 blur 하면 해당 페이지로 이동합니다. 음수·0·비정수·NaN 입력은 현재 페이지로
        복원되고, totalPages 초과 입력은 마지막 페이지로 clamp 됩니다.
      </p>
      <DemoFrame>
        <PaginationBarDemo totalCount={10_000} initialPageSize={100} initialPage={50} />
      </DemoFrame>
    </Section>

    <Section>
      <SectionTitle>showRight — 우측 영역 토글</SectionTitle>
      <CodeBlock>{`<PaginationBar showRight={false} ... />`}</CodeBlock>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        <InlineCode>showRight=&#123;false&#125;</InlineCode> 이면 우측 영역이 빈 슬롯으로 남아 가운데 페이지네이션 정렬은
        그대로 유지됩니다. (LogSearch 등에서 사용)
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <InlineCode>showRight=&#123;true&#125; (기본)</InlineCode>
          <DemoFrame>
            <PaginationBarDemo totalCount={1000} initialPageSize={50} initialPage={3} showRight />
          </DemoFrame>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <InlineCode>showRight=&#123;false&#125;</InlineCode>
          <DemoFrame>
            <PaginationBarDemo totalCount={1000} initialPageSize={50} initialPage={3} showRight={false} />
          </DemoFrame>
        </div>
      </div>
    </Section>

    <Section>
      <SectionTitle>disabled — 로딩/페칭 상태</SectionTitle>
      <CodeBlock>{`<PaginationBar disabled ... />`}</CodeBlock>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        fetching 중에는 <InlineCode>disabled</InlineCode> 로 Dropdown·페이지 버튼·입력란이 모두 비활성화되고 루트에{' '}
        <InlineCode>aria-busy</InlineCode> 가 부여됩니다.
      </p>
      <DemoFrame>
        <PaginationBarDemo totalCount={1000} initialPageSize={50} initialPage={5} disabled />
      </DemoFrame>
    </Section>

    <Section>
      <SectionTitle>엣지 케이스 — 결과 수</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <InlineCode>결과 0건 — totalPages=1 가드</InlineCode>
          <DemoFrame>
            <PaginationBarDemo totalCount={0} initialPageSize={50} initialPage={1} />
          </DemoFrame>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <InlineCode>결과 1건 — totalPages=1</InlineCode>
          <DemoFrame>
            <PaginationBarDemo totalCount={1} initialPageSize={50} initialPage={1} />
          </DemoFrame>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <InlineCode>소수 페이지 — 50건 / pageSize=20 → 3페이지 (말줄임 없음)</InlineCode>
          <DemoFrame>
            <PaginationBarDemo totalCount={50} initialPageSize={20} initialPage={1} />
          </DemoFrame>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <InlineCode>대용량 — 10,000건 / pageSize=100 → 100페이지</InlineCode>
          <DemoFrame>
            <PaginationBarDemo totalCount={10_000} initialPageSize={100} initialPage={50} />
          </DemoFrame>
        </div>
      </div>
    </Section>
  </DocPage>
)

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
