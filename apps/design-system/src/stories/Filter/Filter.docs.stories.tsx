import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Filter.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Filter',
  parameters: { layout: 'fullscreen', controls: { disable: true }, docs: { disable: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Docs: Story = {
  name: '📖 Docs',
  render: () => (
    <DocPage>
      <DocHero
        eyebrow="StyleGuide · Component"
        title="Filter"
        subtitle="카테고리별 다중 선택을 지원하는 사이드 필터 패널"
        importCode={`import Filter from '@port/design-system'`}
      />

      <DocSection
        title="개요"
        description={
          <>
            카테고리별 다중 선택을 지원하는 사이드 필터 패널입니다. <Code>Filter.Search</Code> · <Code>Filter.Content</Code> ·{' '}
            <Code>Filter.SelectAll</Code> · <Code>Filter.Categories</Code> 컴파운드 패턴으로 구성하며 접기/펼치기가 가능합니다.{' '}
            <Code>groups</Code> prop을 전달하면 내부에서 Accordion·Checkbox를 자동으로 렌더링하는 데이터 주도 방식도 지원합니다.
          </>
        }
      />

      <DocSection title="API" description="필터 패널의 주요 props.">
        <ApiTable
          rows={[
            { name: 'title', type: `string`, default: `'필터'`, desc: '필터 패널 상단 타이틀' },
            { name: 'collapsed', type: `boolean`, default: `false`, desc: '접힌 상태 여부 (controlled)' },
            { name: 'onCollapse', type: `() => void`, required: true, desc: '접기 버튼 클릭 시 호출되는 콜백' },
            { name: 'children', type: `ReactNode`, desc: <>Filter.Search · Filter.Content 등 서브 컴포넌트</> },
            { name: 'className', type: `string`, desc: '루트 래퍼에 추가할 CSS 클래스' },
          ]}
        />
      </DocSection>

      <DocSection title="API — 서브 컴포넌트" description="컴파운드 패턴을 구성하는 서브 컴포넌트.">
        <ApiTable
          rows={[
            { name: 'Filter.Search', type: `-`, desc: '검색 입력 영역 (SearchBar 등 배치)' },
            { name: 'Filter.Content', type: `-`, desc: '필터 본문 래퍼 — SelectAll · Categories를 감쌉니다' },
            { name: 'Filter.SelectAll', type: `-`, desc: '전체 선택 체크박스 영역' },
            { name: 'Filter.Categories', type: `-`, desc: '카테고리 목록 스크롤 영역' },
          ]}
        />
      </DocSection>

      <DocSection
        title="기본 사용"
        description={
          <>
            검색 · 전체 선택 · Accordion 카테고리 체크박스가 모두 연동되는 인터랙티브 예제입니다. <Code>Filter.Search</Code>에 검색
            입력을, <Code>Filter.Content &gt; Filter.SelectAll</Code>에 전체 선택 체크박스를, <Code>Filter.Categories</Code>에
            카테고리 목록을 배치합니다.
          </>
        }
      >
        <Example>{renderExample(S.Default)}</Example>
      </DocSection>

      <DocSection
        title="데이터 주도 방식"
        description={
          <>
            <Code>groups</Code> prop을 전달하면 Filter가 내부에서 Accordion·Checkbox를 자동으로 렌더링합니다. <Code>selected</Code> ·{' '}
            <Code>onChange</Code> · <Code>searchValue</Code> · <Code>expandedIds</Code> 등으로 상태를 제어합니다.
          </>
        }
      >
        <Example>{renderExample(S.DataDriven)}</Example>
      </DocSection>

      <DocSection
        title="상태 (펼침 / 접힘)"
        description={
          <>
            <Code>collapsed</Code>로 펼친 상태와 접힌 상태를 제어합니다. 접힌 상태에서는 외부 버튼으로 다시 펼칠 수 있습니다.
          </>
        }
      >
        <Example>{renderExample(S.States)}</Example>
      </DocSection>
    </DocPage>
  ),
}
