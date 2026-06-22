import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { vars } from '../../theme/tokens.css'
import { Table } from './Table'

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
          · <InlineCode>Table.HeaderCell</InlineCode> 의 compound 패턴으로 구성합니다. variant(줄무늬), size(밀도),
          stickyHeader(헤더 고정) 등을 지원합니다.
        </p>
        <CodeBlock>{`import { Table } from '@nayoung-port/design-system/Table'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <PropsTable
              title="Table"
              rows={[
                {
                  name: 'variant',
                  type: "'simple' | 'striped'",
                  defaultVal: "'simple'",
                  desc: "simple(기본) · striped(짝수 행에 surfaceMuted 배경색 적용)",
                },
                {
                  name: 'size',
                  type: "'sm' | 'md'",
                  defaultVal: "'md'",
                  desc: '셀 패딩 및 폰트 밀도 — sm(12px) · md(14px)',
                },
                {
                  name: 'stickyHeader',
                  type: 'boolean',
                  desc: 'thead를 스크롤 시 상단 고정. 스크롤되는 높이 제한(wrapperProps style)이 필요',
                },
                {
                  name: 'fullWidth',
                  type: 'boolean',
                  defaultVal: 'true',
                  desc: '부모 폭을 가득 채움',
                },
                {
                  name: 'wrapperProps',
                  type: 'HTMLAttributes<HTMLDivElement>',
                  desc: '가로 스크롤 래퍼 div에 전달할 속성 — 높이 제한 style 등',
                },
              ]}
            />
            <PropsTable
              title="Table.HeaderCell"
              rows={[
                {
                  name: 'align',
                  type: "'left' | 'center' | 'right'",
                  defaultVal: "'left'",
                  desc: '텍스트 정렬',
                },
              ]}
            />
            <PropsTable
              title="Table.Cell"
              rows={[
                {
                  name: 'align',
                  type: "'left' | 'center' | 'right'",
                  defaultVal: "'left'",
                  desc: '텍스트 정렬',
                },
              ]}
            />
            <PropsTable
              title="Table.Head · Table.Body · Table.Row"
              rows={[
                {
                  name: '...HTMLAttributes',
                  type: 'HTMLAttributes<HTMLTableSectionElement | HTMLTableRowElement>',
                  desc: '각 시맨틱 요소(thead / tbody / tr)의 네이티브 HTML 속성을 그대로 전달',
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      {/* 기본 사용 */}
      <Section gap={16}>
        <SectionTitle>기본 사용</SectionTitle>
        <Card>
          <CodeBlock>{`<Table>
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
            <Table>
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

      {/* variant */}
      <Section gap={16}>
        <SectionTitle>variant</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {(['simple', 'striped'] as const).map((variant) => (
              <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <InlineCode>{`variant="${variant}"`}</InlineCode>
                <Table variant={variant}>
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

      {/* size */}
      <Section gap={16}>
        <SectionTitle>size</SectionTitle>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {(['sm', 'md'] as const).map((size) => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <InlineCode>{`size="${size}"`}</InlineCode>
                <Table size={size}>
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

      {/* align */}
      <Section gap={16}>
        <SectionTitle>align (HeaderCell · Cell)</SectionTitle>
        <Card>
          <CodeBlock>{`<Table.HeaderCell align="right">탐지 시각</Table.HeaderCell>
<Table.Cell align="right">{row.time}</Table.Cell>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="left">이벤트명</Table.HeaderCell>
                  <Table.HeaderCell align="center">심각도</Table.HeaderCell>
                  <Table.HeaderCell align="right">탐지 시각</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {EVENTS.slice(0, 3).map((row) => (
                  <Table.Row key={row.id}>
                    <Table.Cell align="left">{row.name}</Table.Cell>
                    <Table.Cell align="center">{row.severity}</Table.Cell>
                    <Table.Cell align="right">{row.time}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Card>
      </Section>

      {/* stickyHeader */}
      <Section gap={16}>
        <SectionTitle>stickyHeader</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: t.textSecondary }}>
            <InlineCode>stickyHeader</InlineCode>를 켜면 thead가 상단에 고정됩니다.{' '}
            <InlineCode>wrapperProps</InlineCode>로 래퍼 높이를 제한해야 스크롤이 동작합니다.
          </p>
          <CodeBlock>{`<Table
  stickyHeader
  wrapperProps={{ style: { maxHeight: 180 } }}
>
  ...
</Table>`}</CodeBlock>
          <div style={{ marginTop: 16 }}>
            <Table stickyHeader wrapperProps={{ style: { maxHeight: 180 } }}>
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

      {/* fullWidth */}
      <Section gap={16}>
        <SectionTitle>fullWidth</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: t.textSecondary }}>
            기본값은 <InlineCode>true</InlineCode>입니다. <InlineCode>fullWidth={'{false}'}</InlineCode>로 설정하면
            테이블이 콘텐츠 너비에 맞게 줄어듭니다.
          </p>
          <Table fullWidth={false}>
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
        </Card>
      </Section>
    </DocPage>
  ),
}
