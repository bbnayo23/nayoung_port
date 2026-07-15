import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Table.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '@dc/stories/_docs/DocKit'

const meta = {
  title: 'StyleGuide/Table',
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
        title="Table"
        subtitle="데이터를 행·열로 표시하는 compound 테이블 컴포넌트"
        importCode={`import Table from '@port/design-system'`}
      />

      <DocSection
        title="개요"
        description={
          <>
            데이터를 행·열로 표시하는 테이블 컴포넌트입니다. <Code>Table.Head</Code> · <Code>Table.Body</Code> ·{' '}
            <Code>Table.Row</Code> · <Code>Table.Cell</Code> · <Code>Table.HeaderCell</Code> 의 compound 패턴으로
            구성합니다. 정렬, 행 확장, striped, hoverable 등을 지원합니다.
          </>
        }
      />

      <DocSection
        title="API — Table"
        description={<>테이블 루트의 주요 props.</>}
      >
        <ApiTable
          rows={[
            { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, desc: '행 높이 및 폰트 크기' },
            { name: 'striped', type: 'boolean', desc: '짝수 행에 배경색을 적용해 줄무늬 효과' },
            { name: 'hoverable', type: 'boolean', desc: '행 hover 시 배경 하이라이트' },
            { name: 'bordered', type: 'boolean', desc: '셀 테두리 전체 표시' },
            { name: 'toolbarExtra', type: 'ReactNode', desc: '테이블 상단 툴바 영역에 추가할 컨텐츠' },
          ]}
        />
      </DocSection>

      <DocSection title="API — Table.Row" description={<>행의 확장·활성 상태 props.</>}>
        <ApiTable
          rows={[
            { name: 'expandable', type: 'boolean', desc: '행 확장 가능 여부 — 좌측 토글 아이콘 표시' },
            { name: 'expanded', type: 'boolean', desc: '현재 확장 상태 (controlled)' },
            { name: 'onExpandToggle', type: `(expanded: boolean) => void`, desc: '확장 토글 핸들러' },
            { name: 'active', type: 'boolean', desc: '행 선택/활성 상태 강조' },
          ]}
        />
      </DocSection>

      <DocSection title="API — Table.HeaderCell" description={<>헤더 셀의 정렬·정렬방향 props.</>}>
        <ApiTable
          rows={[
            { name: 'sortable', type: 'boolean', desc: '정렬 가능 열 — 클릭 시 정렬 아이콘 표시' },
            { name: 'sortDirection', type: `'asc' | 'desc' | null`, desc: '현재 정렬 방향 (controlled)' },
            { name: 'onSort', type: `() => void`, desc: '정렬 클릭 핸들러' },
            { name: 'align', type: `'left' | 'center' | 'right'`, default: `'left'`, desc: '텍스트 정렬' },
          ]}
        />
      </DocSection>

      <DocSection title="API — Table.Cell" description={<>본문 셀의 정렬 props.</>}>
        <ApiTable
          rows={[
            { name: 'align', type: `'left' | 'center' | 'right'`, default: `'left'`, desc: '텍스트 정렬' },
          ]}
        />
      </DocSection>

      <DocSection title="Playground" description="size · striped · hoverable · bordered 를 조합한 기본 테이블입니다.">
        <Example>{renderExample(S.Playground)}</Example>
      </DocSection>

      <DocSection title="정렬 (sortable)" description="헤더를 클릭해 정렬 방향을 전환합니다. (asc → desc → 없음)">
        <Example>{renderExample(S.Sortable)}</Example>
      </DocSection>

      <DocSection title="행 확장 (expandable)" description="행 좌측의 토글 아이콘을 클릭해 상세 내용을 펼칩니다.">
        <Example>{renderExample(S.ExpandableRows)}</Example>
      </DocSection>

      <DocSection title="셀 인라인 편집" description="셀 내부에 Input 을 배치해 인라인 편집 패턴을 구현합니다.">
        <Example>{renderExample(S.CellEdit)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="테이블의 시맨틱 구조와 정렬·확장 상태를 올바르게 다루기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "Table.Head·Body·Row·Cell·HeaderCell 의 compound 조합으로만 구성해 시맨틱 table 구조를 유지합니다.",
            "sortable 헤더는 sortDirection 과 onSort 를 함께 controlled 로 연결해 asc → desc → null 순환을 외부 상태로 관리합니다.",
            "데이터가 없을 때는 Table.Body 의 emptyContent 로 빈 상태 안내를 제공합니다.",
            "행 밀도는 size 를 sm·md·lg 중 하나로 통일하고, 선택된 행은 Table.Row 의 active 로 강조합니다.",
          ]}
          donts={[
            "Table.Cell·HeaderCell 대신 raw td·th 를 섞어 align 등 공용 스타일·클래스가 빠지지 않게 합니다.",
            "expandable 행에 별도의 클릭 가능한 버튼·링크를 넣어 행 전체 onClick 과 클릭 이벤트가 충돌하지 않게 합니다.",
            "striped·hoverable·bordered 를 한꺼번에 켜서 시각적 노이즈를 만들지 않습니다.",
            "sortDirection 을 비워둔 채 정렬만 수행해 표시된 정렬 방향과 실제 데이터 순서가 어긋나지 않게 합니다.",
          ]}
          a11y={[
            "sortable 헤더에는 sortDirection 에 맞춰 aria-sort 를 Table.HeaderCell 로 전달해 스크린리더가 정렬 상태를 읽게 합니다.",
            "expandable 행에는 aria-expanded 를 expanded 값과 동기화해 전달하고, 행 전체가 클릭 영역임을 label 로 안내합니다.",
            "셀 인라인 편집 시 Input 에 aria-label 등 대체 텍스트를 제공해 어떤 열의 값인지 식별되게 합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
