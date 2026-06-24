import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { vars } from '../../theme/contract.css'
import Table from '../../components/Table'

const meta = {
  title: 'StyleGuide/Table',
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
        maxWidth: 900,
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

const PropsTable = ({ title, rows }: { title: string; rows: PropRow[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>{title}</p>
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
  </div>
)

// ── Sample data ───────────────────────────────────────────────────────────────

const EVENTS = [
  { id: 1, name: 'Brute Force Attack', severity: 'Critical', source: '192.168.1.10', time: '2024-01-15 09:23:11' },
  { id: 2, name: 'Suspicious Login', severity: 'High', source: '10.0.0.55', time: '2024-01-15 09:18:44' },
  { id: 3, name: 'Port Scan Detected', severity: 'Medium', source: '172.16.0.3', time: '2024-01-15 09:10:02' },
  { id: 4, name: 'DNS Anomaly', severity: 'Low', source: '192.168.2.20', time: '2024-01-15 08:55:30' },
]

type SortDir = 'asc' | 'desc' | null

// ── Interactive table demos ───────────────────────────────────────────────────

const SortableDemo = () => {
  const [sortKey, setSortKey] = useState<keyof (typeof EVENTS)[0] | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)

  const handleSort = (key: keyof (typeof EVENTS)[0]) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc'))
      if (sortDir === 'desc') setSortKey(null)
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = [...EVENTS].sort((a, b) => {
    if (!sortKey || !sortDir) return 0
    const av = String(a[sortKey])
    const bv = String(b[sortKey])
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
  })

  return (
    <Table hoverable>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell
            sortable
            sortDirection={sortKey === 'name' ? sortDir : null}
            onSort={() => handleSort('name')}
          >
            이벤트명
          </Table.HeaderCell>
          <Table.HeaderCell
            sortable
            sortDirection={sortKey === 'severity' ? sortDir : null}
            onSort={() => handleSort('severity')}
          >
            심각도
          </Table.HeaderCell>
          <Table.HeaderCell
            sortable
            sortDirection={sortKey === 'source' ? sortDir : null}
            onSort={() => handleSort('source')}
          >
            출발지 IP
          </Table.HeaderCell>
          <Table.HeaderCell
            sortable
            sortDirection={sortKey === 'time' ? sortDir : null}
            onSort={() => handleSort('time')}
          >
            탐지 시각
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sorted.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.severity}</Table.Cell>
            <Table.Cell>{row.source}</Table.Cell>
            <Table.Cell>{row.time}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

const ExpandableDemo = () => {
  const [expanded, setExpanded] = useState<Set<number>>(new Set())

  const toggle = (id: number) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <Table hoverable>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>이벤트명</Table.HeaderCell>
          <Table.HeaderCell>심각도</Table.HeaderCell>
          <Table.HeaderCell>출발지 IP</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {EVENTS.map((row) => (
          <>
            <Table.Row key={row.id} expandable expanded={expanded.has(row.id)} onExpandToggle={() => toggle(row.id)}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.severity}</Table.Cell>
              <Table.Cell>{row.source}</Table.Cell>
            </Table.Row>
            {expanded.has(row.id) && (
              <Table.Row key={`${row.id}-detail`}>
                <Table.Cell colSpan={3}>
                  <div style={{ padding: '8px 4px', fontSize: 12, color: t.textSecondary }}>
                    탐지 시각: {row.time} · 상세 분석 정보가 여기에 표시됩니다.
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
          </>
        ))}
      </Table.Body>
    </Table>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Table</h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 640 }}>
          데이터를 행·열로 표시하는 테이블 컴포넌트입니다. <InlineCode>Table.Head</InlineCode> ·{' '}
          <InlineCode>Table.Body</InlineCode> · <InlineCode>Table.Row</InlineCode> · <InlineCode>Table.Cell</InlineCode>{' '}
          · <InlineCode>Table.HeaderCell</InlineCode> 의 compound 패턴으로 구성합니다. 정렬, 행 확장, striped, hoverable
          등을 지원합니다.
        </p>
        <CodeBlock>{`import Table from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <PropsTable
              title="Table"
              rows={[
                { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", desc: '행 높이 및 폰트 크기' },
                { name: 'striped', type: 'boolean', desc: '짝수 행에 배경색을 적용해 줄무늬 효과' },
                { name: 'hoverable', type: 'boolean', desc: '행 hover 시 배경 하이라이트' },
                { name: 'bordered', type: 'boolean', desc: '셀 테두리 전체 표시' },
                { name: 'toolbarExtra', type: 'ReactNode', desc: '테이블 상단 툴바 영역에 추가할 컨텐츠' },
              ]}
            />
            <PropsTable
              title="Table.Row"
              rows={[
                { name: 'expandable', type: 'boolean', desc: '행 확장 가능 여부 — 좌측 토글 아이콘 표시' },
                { name: 'expanded', type: 'boolean', desc: '현재 확장 상태 (controlled)' },
                { name: 'onExpandToggle', type: '(expanded: boolean) => void', desc: '확장 토글 핸들러' },
                { name: 'active', type: 'boolean', desc: '행 선택/활성 상태 강조' },
              ]}
            />
            <PropsTable
              title="Table.HeaderCell"
              rows={[
                { name: 'sortable', type: 'boolean', desc: '정렬 가능 열 — 클릭 시 정렬 아이콘 표시' },
                { name: 'sortDirection', type: "'asc' | 'desc' | null", desc: '현재 정렬 방향 (controlled)' },
                { name: 'onSort', type: '() => void', desc: '정렬 클릭 핸들러' },
                { name: 'align', type: "'left' | 'center' | 'right'", defaultVal: "'left'", desc: '텍스트 정렬' },
              ]}
            />
            <PropsTable
              title="Table.Cell"
              rows={[{ name: 'align', type: "'left' | 'center' | 'right'", defaultVal: "'left'", desc: '텍스트 정렬' }]}
            />
          </div>
        </Card>
      </Section>

      {/* 기본 사용 */}
      <Section gap={16}>
        <SectionTitle>기본 사용</SectionTitle>
        <Card>
          <CodeBlock>{`<Table hoverable>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>이벤트명</Table.HeaderCell>
      <Table.HeaderCell>심각도</Table.HeaderCell>
      <Table.HeaderCell>출발지 IP</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Brute Force Attack</Table.Cell>
      <Table.Cell>Critical</Table.Cell>
      <Table.Cell>192.168.1.10</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <Table hoverable>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>이벤트명</Table.HeaderCell>
                  <Table.HeaderCell>심각도</Table.HeaderCell>
                  <Table.HeaderCell>출발지 IP</Table.HeaderCell>
                  <Table.HeaderCell>탐지 시각</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {EVENTS.map((row) => (
                  <Table.Row key={row.id}>
                    <Table.Cell>{row.name}</Table.Cell>
                    <Table.Cell>{row.severity}</Table.Cell>
                    <Table.Cell>{row.source}</Table.Cell>
                    <Table.Cell>{row.time}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Card>
      </Section>

      {/* 스타일 변형 */}
      <Section gap={16}>
        <SectionTitle>스타일 변형</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {(['striped', 'bordered'] as const).map((prop) => (
              <div key={prop} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <InlineCode>{prop}</InlineCode>
                <Table {...{ [prop]: true }}>
                  <Table.Head>
                    <Table.Row>
                      <Table.HeaderCell>이벤트명</Table.HeaderCell>
                      <Table.HeaderCell>심각도</Table.HeaderCell>
                      <Table.HeaderCell>출발지 IP</Table.HeaderCell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {EVENTS.slice(0, 3).map((row) => (
                      <Table.Row key={row.id}>
                        <Table.Cell>{row.name}</Table.Cell>
                        <Table.Cell>{row.severity}</Table.Cell>
                        <Table.Cell>{row.source}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* 크기 */}
      <Section gap={16}>
        <SectionTitle>size</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <InlineCode>{`size="${size}"`}</InlineCode>
                <Table size={size} hoverable>
                  <Table.Head>
                    <Table.Row>
                      <Table.HeaderCell>이벤트명</Table.HeaderCell>
                      <Table.HeaderCell>심각도</Table.HeaderCell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {EVENTS.slice(0, 2).map((row) => (
                      <Table.Row key={row.id}>
                        <Table.Cell>{row.name}</Table.Cell>
                        <Table.Cell>{row.severity}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* 정렬 */}
      <Section gap={16}>
        <SectionTitle>정렬 (sortable)</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: t.textSecondary }}>
            헤더를 클릭해 정렬 방향을 전환합니다. (asc → desc → 없음)
          </p>
          <SortableDemo />
        </Card>
      </Section>

      {/* 행 확장 */}
      <Section gap={16}>
        <SectionTitle>행 확장 (expandable)</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: t.textSecondary }}>
            행 좌측의 토글 아이콘을 클릭해 상세 내용을 펼칩니다.
          </p>
          <ExpandableDemo />
        </Card>
      </Section>

      {/* 빈 상태 */}
      <Section gap={16}>
        <SectionTitle>빈 상태 (emptyContent)</SectionTitle>
        <Card>
          <CodeBlock>{`<Table.Body emptyContent={<p>검색 결과가 없습니다.</p>}>
  {/* 데이터 없음 */}
</Table.Body>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>이벤트명</Table.HeaderCell>
                  <Table.HeaderCell>심각도</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body
                emptyContent={<p style={{ margin: 0, fontSize: 13, color: t.textMuted }}>검색 결과가 없습니다.</p>}
              />
            </Table>
          </div>
        </Card>
      </Section>
    </DocPage>
  ),
}
