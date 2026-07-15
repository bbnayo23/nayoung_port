import { useState, Fragment } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '@dc/theme/contract.css'
import Table from '@dc/components/Table'
import type { TableProps } from '@dc/components/Table'
import Badge from '@dc/components/Badge'
import Input from '@dc/components/Input'

const meta = {
  title: 'StyleGuide/Table',
  component: Table,
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies TableProps['size'][],
      description: '테이블 행 높이 크기',
      table: { category: 'Appearance' },
    },
    striped: {
      control: 'boolean',
      description: '홀수/짝수 행 교번 배경',
      table: { category: 'Appearance' },
    },
    hoverable: {
      control: 'boolean',
      description: '행 hover 강조',
      table: { category: 'Appearance' },
    },
    bordered: {
      control: 'boolean',
      description: '셀 테두리 표시',
      table: { category: 'Appearance' },
    },
    children: { control: false, table: { disable: true } },
  },
  args: {
    size: 'md',
    striped: false,
    hoverable: true,
    bordered: false,
    children: null,
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const sampleData = [
  { id: 1, name: '이벤트 로그 수집', color: 'green' as const, statusText: '정상', count: 1240, date: '2025-03-20' },
  { id: 2, name: '트래픽 분석', color: 'orange' as const, statusText: '경고', count: 892, date: '2025-03-20' },
  { id: 3, name: '보안 위협 탐지', color: 'red' as const, statusText: '위험', count: 56, date: '2025-03-19' },
  { id: 4, name: '시스템 모니터링', color: 'green' as const, statusText: '정상', count: 3420, date: '2025-03-19' },
  { id: 5, name: '로그 백업', color: 'gray' as const, statusText: '비활성', count: 0, date: '2025-03-18' },
]

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 size · striped · hoverable · bordered를 조정합니다. */
export const Playground: Story = {
  render: (args) => (
    <Table {...args}>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>이름</Table.HeaderCell>
          <Table.HeaderCell>상태</Table.HeaderCell>
          <Table.HeaderCell align="right">건수</Table.HeaderCell>
          <Table.HeaderCell>날짜</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sampleData.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.id}</Table.Cell>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>
              <Badge variant="status-round" color={row.color} size="sm">
                {row.statusText}
              </Badge>
            </Table.Cell>
            <Table.Cell align="right">{row.count.toLocaleString()}</Table.Cell>
            <Table.Cell>{row.date}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
}

// ── Sortable ──────────────────────────────────────────────────────────────────

/** HeaderCell의 sortable · sortDirection · onSort props로 클라이언트 정렬을 구현합니다. */
export const Sortable: Story = {
  render: (args) => {
    type SortKey = 'name' | 'count' | 'date'
    type SortDir = 'asc' | 'desc' | null

    const Demo = () => {
      const [sortKey, setSortKey] = useState<SortKey | null>(null)
      const [sortDir, setSortDir] = useState<SortDir>(null)

      const handleSort = (key: SortKey) => () => {
        if (sortKey === key) {
          setSortDir(sortDir === 'asc' ? 'desc' : sortDir === 'desc' ? null : 'asc')
          if (sortDir === 'desc') setSortKey(null)
        } else {
          setSortKey(key)
          setSortDir('asc')
        }
      }

      const sorted = [...sampleData].sort((a, b) => {
        if (!sortKey || !sortDir) return 0
        const av = a[sortKey]
        const bv = b[sortKey]
        const cmp = typeof av === 'number' ? av - (bv as number) : String(av).localeCompare(String(bv))
        return sortDir === 'asc' ? cmp : -cmp
      })

      return (
        <Table {...args}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell
                sortable
                sortDirection={sortKey === 'name' ? sortDir : null}
                onSort={handleSort('name')}
              >
                이름
              </Table.HeaderCell>
              <Table.HeaderCell>상태</Table.HeaderCell>
              <Table.HeaderCell
                sortable
                sortDirection={sortKey === 'count' ? sortDir : null}
                onSort={handleSort('count')}
                align="right"
              >
                건수
              </Table.HeaderCell>
              <Table.HeaderCell
                sortable
                sortDirection={sortKey === 'date' ? sortDir : null}
                onSort={handleSort('date')}
              >
                날짜
              </Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {sorted.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>{row.id}</Table.Cell>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>
                  <Badge variant="status-round" color={row.color} size="sm">
                    {row.statusText}
                  </Badge>
                </Table.Cell>
                <Table.Cell align="right">{row.count.toLocaleString()}</Table.Cell>
                <Table.Cell>{row.date}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )
    }
    return <Demo />
  },
  parameters: { controls: { disable: true } },
}

// ── ExpandableRows ────────────────────────────────────────────────────────────

/** Table.Row의 expandable prop으로 행 확장 패턴을 구현합니다. */
export const ExpandableRows: Story = {
  render: (args) => {
    const Demo = () => {
      const [expanded, setExpanded] = useState<Set<number>>(new Set())
      const toggle = (id: number) =>
        setExpanded((prev) => {
          const next = new Set(prev)
          if (next.has(id)) next.delete(id)
          else next.add(id)
          return next
        })

      return (
        <Table {...args}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell style={{ width: 28 }} />
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>이름</Table.HeaderCell>
              <Table.HeaderCell>상태</Table.HeaderCell>
              <Table.HeaderCell align="right">건수</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {sampleData.map((row) => (
              <Fragment key={row.id}>
                <Table.Row expandable expanded={expanded.has(row.id)} onExpandToggle={() => toggle(row.id)}>
                  <Table.Cell>{row.id}</Table.Cell>
                  <Table.Cell>{row.name}</Table.Cell>
                  <Table.Cell>
                    <Badge variant="status-round" color={row.color} size="sm">
                      {row.statusText}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell align="right">{row.count.toLocaleString()}</Table.Cell>
                </Table.Row>
                {expanded.has(row.id) && (
                  <Table.Row>
                    <Table.Cell colSpan={5}>
                      <div
                        style={{
                          padding: '10px 16px',
                          background: vars.color.surfaceHover,
                          borderRadius: vars.radius.sm,
                          fontSize: 12,
                          color: vars.color.textSecondary,
                        }}
                      >
                        상세 정보: {row.name} — 마지막 수집일 {row.date}, 총 {row.count.toLocaleString()}건 처리됨
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Fragment>
            ))}
          </Table.Body>
        </Table>
      )
    }
    return <Demo />
  },
  parameters: { controls: { disable: true } },
}

// ── CellEdit ──────────────────────────────────────────────────────────────────

/** 셀 내 Input으로 인라인 편집 패턴을 구현합니다. */
export const CellEdit: Story = {
  render: () => {
    const initialData = [
      { id: 1, name: '이벤트 로그 수집', host: '192.168.1.10', port: 514, protocol: 'TCP' },
      { id: 2, name: '트래픽 분석', host: '192.168.1.20', port: 8080, protocol: 'UDP' },
      { id: 3, name: '보안 위협 탐지', host: '10.0.0.5', port: 443, protocol: 'TCP' },
      { id: 4, name: '시스템 모니터링', host: '172.16.0.1', port: 9090, protocol: 'HTTP' },
    ]

    const Demo = () => {
      const [rows, setRows] = useState(initialData)

      const updateCell = (id: number, field: string, value: string) => {
        setRows((prev) =>
          prev.map((r) => (r.id === id ? { ...r, [field]: field === 'port' ? Number(value) || 0 : value } : r)),
        )
      }

      return (
        <Table size="sm">
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>이름</Table.HeaderCell>
              <Table.HeaderCell>호스트</Table.HeaderCell>
              <Table.HeaderCell>포트</Table.HeaderCell>
              <Table.HeaderCell>프로토콜</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>{row.id}</Table.Cell>
                <Table.Cell>
                  <Input
                    variant="ghost"
                    size="sm"
                    value={row.name}
                    onChange={(e) => updateCell(row.id, 'name', e.target.value)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Input
                    variant="ghost"
                    size="sm"
                    value={row.host}
                    onChange={(e) => updateCell(row.id, 'host', e.target.value)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Input
                    variant="ghost"
                    size="sm"
                    value={String(row.port)}
                    onChange={(e) => updateCell(row.id, 'port', e.target.value)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Input
                    variant="ghost"
                    size="sm"
                    value={row.protocol}
                    onChange={(e) => updateCell(row.id, 'protocol', e.target.value)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )
    }
    return <Demo />
  },
  parameters: { controls: { disable: true } },
}
