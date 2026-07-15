import type { Meta, StoryObj } from '@storybook/react-vite'
import Pagination from '../../components/Pagination'
import * as S from './Pagination.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

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
    </DocPage>
  ),
}
