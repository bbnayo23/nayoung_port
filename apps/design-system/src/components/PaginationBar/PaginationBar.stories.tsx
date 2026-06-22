import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PaginationBar } from './PaginationBar'

const LOG_SEARCH_OPTIONS = [20, 50, 100, 200, 500, 1000] as const

interface DemoArgs {
  totalCount: number
  initialPageSize: number
  initialPage: number
  pageSizeOptions: readonly number[]
  disabled: boolean
  showRight: boolean
}

const PaginationBarDemo = ({
  totalCount,
  initialPageSize,
  initialPage,
  pageSizeOptions,
  disabled,
  showRight,
}: DemoArgs) => {
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
      disabled={disabled}
      showRight={showRight}
    />
  )
}

const meta = {
  title: 'Components/PaginationBar',
  component: PaginationBarDemo,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    totalCount: { control: { type: 'number', min: 0, max: 1_000_000 } },
    initialPageSize: { control: { type: 'number', min: 1 } },
    initialPage: { control: { type: 'number', min: 1 } },
    disabled: { control: 'boolean' },
    showRight: { control: 'boolean' },
  },
} satisfies Meta<typeof PaginationBarDemo>

export default meta
type Story = StoryObj<typeof meta>

const defaultArgs: DemoArgs = {
  totalCount: 1000,
  initialPageSize: 50,
  initialPage: 1,
  pageSizeOptions: LOG_SEARCH_OPTIONS,
  disabled: false,
  showRight: true,
}

export const Default: Story = { args: defaultArgs }

/** 결과 0건 — totalPages=1 가드, currentPage=1 표시 */
export const ZeroResults: Story = {
  args: { ...defaultArgs, totalCount: 0 },
}

/** 1건 — totalPages=1 */
export const SingleResult: Story = {
  args: { ...defaultArgs, totalCount: 1 },
}

/** 50건 / pageSize=20 → totalPages=3 (모든 페이지 버튼 표시) */
export const FewPages: Story = {
  args: { ...defaultArgs, totalCount: 50, initialPageSize: 20 },
}

/** 첫 페이지 — 이전 버튼 비활성 */
export const FirstPage: Story = {
  args: {
    ...defaultArgs,
    totalCount: 1000,
    initialPageSize: 20,
    initialPage: 1,
  },
}

/** 중간 페이지 — 양쪽 ellipsis */
export const MiddlePage: Story = {
  args: {
    ...defaultArgs,
    totalCount: 1000,
    initialPageSize: 20,
    initialPage: 25,
  },
}

/** 마지막 페이지 — 다음 버튼 비활성 */
export const LastPage: Story = {
  args: {
    ...defaultArgs,
    totalCount: 1000,
    initialPageSize: 20,
    initialPage: 50,
  },
}

/** 10,000건 / pageSize=100 → totalPages=100 */
export const LargeDataset: Story = {
  args: {
    ...defaultArgs,
    totalCount: 10_000,
    initialPageSize: 100,
    initialPage: 50,
  },
}

/** pageSize=1000 — 큰 페이지 사이즈 */
export const LargePageSize: Story = {
  args: {
    ...defaultArgs,
    totalCount: 10_000,
    initialPageSize: 1000,
    initialPage: 1,
  },
}

/** fetching 중 — 모든 컨트롤 disabled */
export const Loading: Story = {
  args: {
    ...defaultArgs,
    totalCount: 1000,
    initialPageSize: 50,
    initialPage: 5,
    disabled: true,
  },
}

/** 우측 영역 미노출 — LogSearch 등에서 사용 (가운데 정렬은 grid 1fr/auto/1fr 로 유지) */
export const WithoutRight: Story = {
  args: {
    ...defaultArgs,
    totalCount: 1000,
    initialPageSize: 50,
    initialPage: 3,
    showRight: false,
  },
}
