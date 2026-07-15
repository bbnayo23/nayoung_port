import type { Meta, StoryObj } from '@storybook/react-vite'
import Pagination from '@dc/components/Pagination'
import * as S from './Pagination.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample, Guidelines } from '@dc/stories/_docs/DocKit'

const meta = {
  title: 'StyleGuide/Pagination',
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
        title="Pagination"
        subtitle="테이블·목록 하단에 위치하는 페이지 탐색 컴포넌트"
        importCode={`import Pagination from '@port/design-system'`}
      >
        <Pagination totalPages={20} currentPage={1} onPageChange={() => {}} />
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            <Code>totalPages</Code>·<Code>currentPage</Code>·<Code>onPageChange</Code> 세 props만으로 기본 동작하며,{' '}
            <Code>showPageInfo</Code>·<Code>showPageJump</Code>·<Code>showItemsPerPage</Code> 옵션으로 확장할 수 있습니다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'totalPages', type: 'number', required: true, desc: '총 페이지 수' },
            { name: 'currentPage', type: 'number', required: true, desc: '현재 활성 페이지 번호' },
            { name: 'onPageChange', type: '(page: number) => void', required: true, desc: '페이지 변경 콜백' },
            { name: 'maxDisplay', type: 'number', default: '5', desc: '한 번에 표시할 페이지 버튼 수' },
            { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, desc: '크기 variant' },
            { name: 'disabled', type: 'boolean', default: 'false', desc: '전체 비활성화' },
            { name: 'showFirstLast', type: 'boolean', default: 'false', desc: '첫/마지막 페이지 이동 버튼 표시' },
            { name: 'showPrevNext', type: 'boolean', default: 'true', desc: '이전/다음 버튼 표시' },
            { name: 'showPageInfo', type: 'boolean', default: 'false', desc: '현재 페이지 / 전체 페이지 정보 텍스트 표시' },
            { name: 'showPageJump', type: 'boolean', default: 'false', desc: '페이지 직접 입력 input 표시' },
            { name: 'showItemsPerPage', type: 'boolean', default: 'false', desc: '페이지당 항목 수 드롭다운 표시' },
            { name: 'totalItems', type: 'number', desc: '전체 항목 수 — showPageInfo와 함께 사용' },
            { name: 'itemsPerPage', type: 'number', desc: '현재 페이지당 항목 수' },
            { name: 'itemsPerPageOptions', type: 'number[]', desc: '페이지당 항목 수 선택 목록 (예: [50, 100, 200])' },
            { name: 'onItemsPerPageChange', type: '(n: number) => void', desc: '페이지당 항목 수 변경 콜백' },
          ]}
        />
      </DocSection>

      <DocSection
        title="크기 비교"
        description={
          <>
            <Code>size</Code> prop으로 sm · md · lg를 선택합니다.
          </>
        }
      >
        <Example>{renderExample(S.Sizes)}</Example>
      </DocSection>

      <DocSection
        title="확장 기능"
        description={
          <>
            <Code>showPageInfo</Code> · <Code>showPageJump</Code> · <Code>showItemsPerPage</Code>를 함께 사용해 풀 기능
            페이지네이션 바를 구성합니다.
          </>
        }
      >
        <Example>{renderExample(S.WithExtras)}</Example>
      </DocSection>

      <DocSection
        title="비활성화"
        description={
          <>
            <Code>disabled</Code> prop으로 전체 페이지네이션을 비활성화합니다.
          </>
        }
      >
        <Example>{renderExample(S.Disabled)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="목록 탐색 맥락을 명확히 하고 좁은 폭에서도 안정적으로 동작시키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "maxDisplay 로 한 번에 보이는 페이지 버튼 수를 제한하고, 벗어난 구간은 ... 축약으로 접어 좁은 폭에서도 레이아웃을 유지합니다.",
            "항목이 많은 목록에서는 showItemsPerPage 와 itemsPerPageOptions 를 함께 제공해 사용자가 페이지당 항목 수를 조절하게 합니다.",
            "페이지 수가 많으면 showFirstLast 를 켜서 첫/마지막 페이지로 한 번에 이동하도록 돕습니다.",
            "showPageInfo 로 '전체 N페이지 중 현재 페이지'와 totalItems 를 노출해 사용자가 현재 위치를 파악하게 합니다.",
            "currentPage 와 onPageChange 를 상위 상태에 연결한 controlled 방식으로 운용하고, 데이터 로딩과 페이지 상태를 동기화합니다.",
          ]}
          donts={[
            "maxDisplay 를 과도하게 크게 잡아 모든 페이지 버튼을 한 줄에 나열하지 않고 ... 축약을 활용합니다.",
            "showItemsPerPage 를 켜면서 itemsPerPageOptions 를 비워 두지 않습니다 — 옵션이 없으면 항목 수 드롭다운이 렌더링되지 않습니다.",
            "로딩 중 조작을 막을 때 onPageChange 를 임시로 무력화하는 대신 disabled prop 으로 전체를 비활성화합니다.",
            "totalPages 가 1 이하인 목록에는 페이지네이션을 노출하지 않습니다.",
          ]}
          a11y={[
            "아이콘만 있는 이전/다음(showPrevNext) 버튼은 화살표만 보이므로, showPageInfo 를 함께 노출해 현재/전체 페이지 맥락을 텍스트로 제공합니다.",
            "현재 페이지는 active 상태로 강조되므로 색 대비만으로 구분되지 않도록 배경/글자 대비를 충분히 유지합니다.",
            "showPageJump 입력은 별도 레이블이 없으므로, placeholder 의 현재 페이지 번호와 인접한 '/ 전체' 텍스트로 입력 맥락을 제공합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
