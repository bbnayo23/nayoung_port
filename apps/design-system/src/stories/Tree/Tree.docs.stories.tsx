import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Tree.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Tree',
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
        title="Tree"
        subtitle="계층 구조 데이터를 트리 형태로 표시하는 컴포넌트"
        importCode={`import { Tree } from '@port/design-system'
import type { TreeNode } from '@port/design-system'`}
      >
        {renderExample(S.Default)}
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            계층 구조 데이터를 트리 형태로 표시합니다. 노드 선택, 펼치기/접기, 비활성화, controlled 모드를 지원하며 키보드 접근성(<Code>Enter</Code> · <Code>Arrow</Code>)이 내장되어 있습니다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'nodes', type: 'TreeNode[]', desc: '트리 노드 데이터 배열. 각 노드는 id, label, children?, disabled? 를 가집니다.' },
            { name: 'expandedIds', type: 'string[]', desc: '현재 펼쳐진 노드 id 목록 (controlled). 미전달 시 내부 상태로 관리됩니다.' },
            { name: 'onExpandChange', type: '(ids: string[]) => void', desc: '펼치기/접기 변경 핸들러' },
            { name: 'selectedId', type: 'string', desc: '현재 선택된 노드 id (controlled)' },
            { name: 'onSelect', type: '(id: string) => void', desc: '노드 선택 핸들러' },
            { name: 'className', type: 'string', desc: '루트 ul 요소에 추가할 CSS 클래스' },
          ]}
        />
      </DocSection>

      <DocSection title="API — TreeNode" description="트리를 구성하는 개별 노드의 형태.">
        <ApiTable
          rows={[
            { name: 'id', type: 'string', desc: '노드 고유 식별자' },
            { name: 'label', type: 'ReactNode', desc: '노드 표시 텍스트 또는 JSX' },
            { name: 'children', type: 'TreeNode[]', desc: '하위 노드 배열. 있으면 펼치기 아이콘 표시' },
            { name: 'disabled', type: 'boolean', desc: '비활성화 — 클릭 불가, 시각적으로 흐리게 표시' },
          ]}
        />
      </DocSection>

      <DocSection title="기본 사용" description="화살표 클릭으로 펼치고, 노드 클릭으로 선택합니다.">
        <Example>{renderExample(S.Default)}</Example>
      </DocSection>

      <DocSection title="깊은 중첩 구조" description="3단계 이상 중첩된 트리 구조입니다.">
        <Example>{renderExample(S.DeepNesting)}</Example>
      </DocSection>

      <DocSection title="비활성화 노드 (disabled)" description="disabled 노드는 선택·포커스가 불가합니다.">
        <Example>{renderExample(S.DisabledNodes)}</Example>
      </DocSection>

      <DocSection
        title="Controlled 모드"
        description={
          <>
            <Code>expandedIds</Code> + <Code>onExpandChange</Code>를 전달하면 펼치기 상태를 외부에서 제어합니다.
          </>
        }
      >
        <Example>{renderExample(S.Controlled)}</Example>
      </DocSection>

      <DocSection
        title="Dropdown 패널"
        description={
          <>
            Dropdown 컴포넌트의 <Code>renderPanel</Code>을 사용해 Tree를 패널로 표시합니다.
          </>
        }
      >
        <Example>{renderExample(S.DropdownTree)}</Example>
      </DocSection>
    </DocPage>
  ),
}
