import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { vars } from '@dc/theme/contract.css'
import Pagination from '@dc/components/Pagination'
import type { PaginationProps } from '@dc/components/Pagination'

const meta = {
  title: 'StyleGuide/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
      description: '총 페이지 수',
      table: { category: 'Data' },
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: '현재 페이지',
      table: { category: 'Data' },
    },
    maxDisplay: {
      control: { type: 'number', min: 1, max: 10 },
      description: '한 번에 보여줄 페이지 버튼 수 (기본값 5)',
      table: { category: 'Data' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies PaginationProps['size'][],
      description: '크기 variant',
      table: { category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
      table: { category: 'State' },
    },
    showFirstLast: {
      control: 'boolean',
      description: '첫/마지막 페이지 버튼 표시',
      table: { category: 'Appearance' },
    },
    showPrevNext: {
      control: 'boolean',
      description: '이전/다음 버튼 표시',
      table: { category: 'Appearance' },
    },
    showPageInfo: {
      control: 'boolean',
      description: '페이지 정보 텍스트 표시',
      table: { category: 'Features' },
    },
    showPageJump: {
      control: 'boolean',
      description: '페이지 점프 input 표시',
      table: { category: 'Features' },
    },
    showItemsPerPage: {
      control: 'boolean',
      description: '페이지당 항목 수 선택기 표시',
      table: { category: 'Features' },
    },
    onPageChange: { table: { disable: true } },
    onItemsPerPageChange: { table: { disable: true } },
  },
  args: {
    totalPages: 20,
    currentPage: 1,
    onPageChange: () => {},
    maxDisplay: 5,
    size: 'md',
    disabled: false,
    showFirstLast: false,
    showPrevNext: true,
    showPageInfo: false,
    showPageJump: false,
    showItemsPerPage: false,
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

// ── Playground ────────────────────────────────────────────────────────────────

/** Controls 패널에서 모든 props를 실시간으로 조정합니다. */
export const Playground: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage ?? 1)
    return <Pagination {...args} currentPage={currentPage} onPageChange={setCurrentPage} />
  },
}

// ── Sizes ─────────────────────────────────────────────────────────────────────

/** sm · md · lg 크기 비교 */
export const Sizes: Story = {
  render: () => {
    const [pages, setPages] = useState({ sm: 3, md: 3, lg: 3 })
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Label>{`size="${size}"`}</Label>
            <Pagination
              totalPages={20}
              currentPage={pages[size]}
              size={size}
              onPageChange={(p) => setPages((prev) => ({ ...prev, [size]: p }))}
            />
          </div>
        ))}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── WithExtras ────────────────────────────────────────────────────────────────

/** showPageInfo · showPageJump · showItemsPerPage 조합 — sm · md · lg */
export const WithExtras: Story = {
  render: () => {
    const [state, setState] = useState({
      sm: { page: 3, ipp: 50 },
      md: { page: 3, ipp: 50 },
      lg: { page: 3, ipp: 50 },
    })
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Label>{`size="${size}"`}</Label>
            <Pagination
              totalPages={20}
              currentPage={state[size].page}
              totalItems={1000}
              itemsPerPage={state[size].ipp}
              itemsPerPageOptions={[50, 100, 200]}
              showPageInfo
              showPageJump
              showItemsPerPage
              size={size}
              onPageChange={(p) => setState((prev) => ({ ...prev, [size]: { ...prev[size], page: p } }))}
              onItemsPerPageChange={(ipp) => setState((prev) => ({ ...prev, [size]: { ...prev[size], ipp } }))}
            />
          </div>
        ))}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── Disabled ──────────────────────────────────────────────────────────────────

/** 비활성화 상태 */
export const Disabled: Story = {
  render: () => <Pagination totalPages={20} currentPage={5} disabled onPageChange={() => {}} />,
  parameters: { controls: { disable: true } },
}
