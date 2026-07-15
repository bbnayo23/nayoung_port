import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Filter.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

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

      <DocSection title="사용 지침" description="필터 상태 제어와 접근성을 지키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "카테고리가 데이터로 정해져 있으면 groups prop 을 넘겨 데이터 주도 방식으로 쓰고, selected · onChange 를 함께 controlled 로 관리합니다.",
            "전체 선택은 직접 만들지 말고 showAll 과 allLabel 을 사용해, 부분 선택 시 indeterminate 상태가 자동으로 표시되게 합니다.",
            "접힘 상태는 collapsed 와 onCollapse 를 짝지어 controlled 로 다루고, 접힌 뒤 다시 펼칠 외부 트리거를 반드시 제공합니다.",
            "검색은 searchValue 와 onSearchChange 로 제어하고, 결과가 없을 때 보일 문구를 emptyText 로 지정합니다.",
          ]}
          donts={[
            "groups 와 children 을 동시에 넘기지 않습니다. groups 가 있으면 children 은 무시되고 내부 렌더링만 표시됩니다.",
            "selected · searchValue · expandedIds 를 controlled 로 넘기면서 onChange · onSearchChange · onExpandedChange 를 빠뜨리지 않습니다. 기본값이 no-op 이라 상태가 갱신되지 않습니다.",
            "체크 상태를 none · some · all 세 단계로 다루지 않고 boolean 으로만 취급해 부분 선택 표시를 없애지 않습니다.",
            "펼침 패널 자리를 대신할 화면 레이아웃 없이 collapsed 만 토글해 콘텐츠 영역이 갑자기 비어 보이게 하지 않습니다.",
          ]}
          a11y={[
            "Filter.Search 에 배치하는 입력과 데이터 주도 방식의 검색 입력은 placeholder 만으로는 이름이 전달되지 않으므로 aria-label 로 대체 텍스트를 제공합니다.",
            "카테고리 헤더의 그룹 체크박스는 시각적 라벨과 분리되어 있으므로 aria-label 에 그룹 이름을 넣어 스크린리더가 무엇을 선택하는지 알 수 있게 합니다.",
            "접기 버튼은 aria-label='필터 접기' 가 기본 제공되며, 부분 선택은 indeterminate 로 전달돼 all · some 상태가 보조기술에 구분되어 노출됩니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
