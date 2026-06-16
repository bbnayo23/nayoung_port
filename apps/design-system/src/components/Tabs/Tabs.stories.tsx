import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    variant: { control: 'inline-radio', options: ['line', 'enclosed'] },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

const panelStyle = { paddingTop: 8 }

export const Playground: Story = {
  args: { variant: 'line', defaultValue: 'account' },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List aria-label="설정">
        <Tabs.Trigger value="account">계정</Tabs.Trigger>
        <Tabs.Trigger value="password">비밀번호</Tabs.Trigger>
        <Tabs.Trigger value="notifications">알림</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="account" style={panelStyle}>
        계정 정보를 관리합니다.
      </Tabs.Panel>
      <Tabs.Panel value="password" style={panelStyle}>
        비밀번호를 변경합니다.
      </Tabs.Panel>
      <Tabs.Panel value="notifications" style={panelStyle}>
        알림 환경설정을 조정합니다.
      </Tabs.Panel>
    </Tabs>
  ),
}

export const Enclosed: Story = {
  args: { variant: 'enclosed', defaultValue: 'overview' },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List aria-label="대시보드">
        <Tabs.Trigger value="overview">개요</Tabs.Trigger>
        <Tabs.Trigger value="analytics">분석</Tabs.Trigger>
        <Tabs.Trigger value="reports">리포트</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="overview" style={panelStyle}>
        전체 개요를 표시합니다.
      </Tabs.Panel>
      <Tabs.Panel value="analytics" style={panelStyle}>
        분석 데이터를 표시합니다.
      </Tabs.Panel>
      <Tabs.Panel value="reports" style={panelStyle}>
        리포트 목록을 표시합니다.
      </Tabs.Panel>
    </Tabs>
  ),
}

function TabsControlledDemo() {
  const [value, setValue] = useState('one')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" onClick={() => setValue('one')}>
          첫째 탭으로
        </button>
        <button type="button" onClick={() => setValue('two')}>
          둘째 탭으로
        </button>
      </div>
      <Tabs value={value} onValueChange={setValue}>
        <Tabs.List aria-label="제어 예시">
          <Tabs.Trigger value="one">하나</Tabs.Trigger>
          <Tabs.Trigger value="two">둘</Tabs.Trigger>
          <Tabs.Trigger value="three">셋</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Panel value="one" style={panelStyle}>
          현재 값: one
        </Tabs.Panel>
        <Tabs.Panel value="two" style={panelStyle}>
          현재 값: two
        </Tabs.Panel>
        <Tabs.Panel value="three" style={panelStyle}>
          현재 값: three
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <TabsControlledDemo />,
}

export const WithDisabledTab: Story = {
  args: { variant: 'line', defaultValue: 'active' },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List aria-label="비활성 탭 예시">
        <Tabs.Trigger value="active">활성</Tabs.Trigger>
        <Tabs.Trigger value="disabled" disabled>
          비활성
        </Tabs.Trigger>
        <Tabs.Trigger value="another">다른 탭</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="active" style={panelStyle}>
        활성 탭 콘텐츠.
      </Tabs.Panel>
      <Tabs.Panel value="disabled" style={panelStyle}>
        도달할 수 없는 콘텐츠.
      </Tabs.Panel>
      <Tabs.Panel value="another" style={panelStyle}>
        다른 탭 콘텐츠.
      </Tabs.Panel>
    </Tabs>
  ),
}
