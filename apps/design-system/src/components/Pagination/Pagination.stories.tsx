import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Pagination } from './Pagination'

const PaginationDemo = ({
  totalPages,
  maxDisplay,
  showFirstLast,
  showPrevNext,
  initialPage = 1,
}: {
  totalPages: number
  maxDisplay?: number
  showFirstLast?: boolean
  showPrevNext?: boolean
  initialPage?: number
}) => {
  const [page, setPage] = useState(initialPage)
  return (
    <div style={{ padding: 24 }}>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        maxDisplay={maxDisplay}
        showFirstLast={showFirstLast}
        showPrevNext={showPrevNext}
      />
      <div style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
        현재: {page} / {totalPages}
      </div>
    </div>
  )
}

const meta = {
  title: 'Components/Pagination',
  component: PaginationDemo,
  argTypes: {
    totalPages: { control: { type: 'number', min: 1, max: 1000 } },
    maxDisplay: { control: { type: 'number', min: 1, max: 15 } },
    showFirstLast: { control: 'boolean' },
    showPrevNext: { control: 'boolean' },
    initialPage: { control: { type: 'number', min: 1 } },
  },
} satisfies Meta<typeof PaginationDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    totalPages: 20,
    maxDisplay: 5,
    showFirstLast: false,
    showPrevNext: true,
    initialPage: 1,
  },
}

export const MiddlePage: Story = {
  args: {
    totalPages: 20,
    maxDisplay: 5,
    showFirstLast: false,
    showPrevNext: true,
    initialPage: 10,
  },
}

export const LastPage: Story = {
  args: {
    totalPages: 20,
    maxDisplay: 5,
    showFirstLast: false,
    showPrevNext: true,
    initialPage: 20,
  },
}

export const WithFirstLast: Story = {
  args: {
    totalPages: 100,
    maxDisplay: 5,
    showFirstLast: true,
    showPrevNext: true,
    initialPage: 50,
  },
}

export const FewPages: Story = {
  args: {
    totalPages: 3,
    maxDisplay: 5,
    showFirstLast: false,
    showPrevNext: true,
    initialPage: 1,
  },
}

export const SinglePage: Story = {
  args: {
    totalPages: 1,
    maxDisplay: 5,
    showFirstLast: true,
    showPrevNext: true,
    initialPage: 1,
  },
}

export const LargeMaxDisplay: Story = {
  args: {
    totalPages: 50,
    maxDisplay: 9,
    showFirstLast: true,
    showPrevNext: true,
    initialPage: 25,
  },
}
