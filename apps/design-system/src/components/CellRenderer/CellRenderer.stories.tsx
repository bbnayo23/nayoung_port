import type { Meta, StoryObj } from '@storybook/react-vite'
import { CellBadge } from './CellBadge'
import { CellIpWithFlag } from './CellIpWithFlag'
import { CellCode } from './CellCode'
import { LogSourceLabel } from './LogSourceLabel'
import { ArrayToString } from './ArrayToString'

const meta = {
  title: 'Components/CellRenderer',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** 상태/레벨 배지 */
export const Badge: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <CellBadge label="primary" color="primary" />
      <CellBadge label="neutral" color="neutral" />
      <CellBadge label="danger" color="danger" />
      <CellBadge label="success" color="success" />
    </div>
  ),
}

/** 국가 코드 칩이 붙은 IP */
export const IpWithFlag: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <CellIpWithFlag ip="192.168.1.10" country="KR" />
      <CellIpWithFlag ip="8.8.8.8" country="US" />
      <CellIpWithFlag ip="1.1.1.1" />
    </div>
  ),
}

/** 인라인 monospace 코드 셀 */
export const CodeCell: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <CellCode value="GET /api/users" />
      <CellCode value="200" />
      <CellCode value="x-trace-id: abc123" />
    </div>
  ),
}

/** 로그소스 라벨 (색상 dot + 이름) */
export const LogSourceLabelStory: Story = {
  name: 'LogSourceLabel',
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <LogSourceLabel name="firewall-01" color="#2563eb" />
      <LogSourceLabel name="waf-02" color="#16a34a" />
      <LogSourceLabel name="ids-03" />
    </div>
  ),
}

/** 배열 값 배지 리스트 */
export const ArrayToStringStory: Story = {
  name: 'ArrayToString',
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <ArrayToString values={['alpha', 'beta']} />
      <ArrayToString values={['one', 'two', 'three', 'four', 'five']} />
      <ArrayToString values={['compact', 'list', 'demo', 'overflow', 'x', 'y']} max={2} />
    </div>
  ),
}
