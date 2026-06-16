import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table } from './Table'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  args: { variant: 'simple', size: 'md', stickyHeader: false, fullWidth: true },
  argTypes: {
    variant: { control: 'inline-radio', options: ['simple', 'striped'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    stickyHeader: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Table>

type Person = { name: string; role: string; commits: number }

const people: Person[] = [
  { name: '박나영', role: 'Frontend', commits: 128 },
  { name: '김철수', role: 'Backend', commits: 92 },
  { name: '이영희', role: 'Design', commits: 47 },
  { name: '정민수', role: 'DevOps', commits: 65 },
]

export const Playground: Story = {
  render: (args) => (
    <Table {...args}>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>이름</Table.HeaderCell>
          <Table.HeaderCell>역할</Table.HeaderCell>
          <Table.HeaderCell align="right">커밋</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {people.map((p) => (
          <Table.Row key={p.name}>
            <Table.Cell>{p.name}</Table.Cell>
            <Table.Cell>{p.role}</Table.Cell>
            <Table.Cell align="right">{p.commits}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
}

export const Striped: Story = {
  args: { variant: 'striped' },
  render: Playground.render,
}

export const StickyHeader: Story = {
  args: { stickyHeader: true },
  render: (args) => (
    <Table {...args} wrapperProps={{ style: { maxHeight: 200 } }}>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>이름</Table.HeaderCell>
          <Table.HeaderCell>역할</Table.HeaderCell>
          <Table.HeaderCell align="right">커밋</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {[...people, ...people, ...people].map((p, i) => (
          <Table.Row key={`${p.name}-${i}`}>
            <Table.Cell>{p.name}</Table.Cell>
            <Table.Cell>{p.role}</Table.Cell>
            <Table.Cell align="right">{p.commits}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['sm', 'md'] as const).map((s) => (
        <Table {...args} key={s} size={s}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>size="{s}"</Table.HeaderCell>
              <Table.HeaderCell>역할</Table.HeaderCell>
              <Table.HeaderCell align="right">커밋</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {people.slice(0, 2).map((p) => (
              <Table.Row key={p.name}>
                <Table.Cell>{p.name}</Table.Cell>
                <Table.Cell>{p.role}</Table.Cell>
                <Table.Cell align="right">{p.commits}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ))}
    </div>
  ),
}
