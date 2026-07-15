import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Tree.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

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

      <DocSection title="사용 지침" description="계층 데이터를 정확히 제어하고 접근성 있게 표시하기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "각 노드에 렌더마다 바뀌지 않는 고유한 id 를 부여해 selectedId·expandedIds 로 특정 노드를 정확히 제어합니다.",
            "하위 항목이 있는 노드는 children 배열을 채워 펼치기 셰브론이 자동으로 노출되도록 합니다.",
            "펼침 상태를 다른 UI와 동기화해야 하면 expandedIds 와 onExpandChange 로 controlled 모드를 사용합니다.",
            "선택 상태를 화면에 반영하려면 selectedId 와 onSelect 를 함께 전달합니다.",
          ]}
          donts={[
            "onSelect 없이 selectedId 만 전달해 클릭해도 선택이 반영되지 않는 상태로 두지 않습니다.",
            "controlled 모드에서 onExpandChange 결과로 expandedIds 를 갱신하지 않아 셰브론을 눌러도 펼쳐지지 않게 만들지 않습니다.",
            "클릭을 막을 노드를 nodes 에서 통째로 제거하기보다 disabled: true 로 표시해 계층 구조의 맥락을 유지합니다.",
            "계층이 없는 단순 나열에는 Tree 대신 단층 목록 컴포넌트를 사용합니다.",
          ]}
          a11y={[
            "루트는 role='tree', 하위 묶음은 role='group', 각 노드는 role='treeitem' 으로 계층이 스크린리더에 전달되므로 label 은 의미가 분명한 값으로 채웁니다.",
            "label 에 아이콘 등 비텍스트만 넣지 말고 텍스트 대체를 함께 제공해 스크린리더가 노드를 식별할 수 있게 합니다.",
            "disabled 노드는 tabIndex -1 로 포커스에서 제외되고 활성 노드는 Enter·Space 로 선택, ArrowRight·ArrowLeft 로 펼치기/접기가 지원되므로 마우스 없이도 조작할 수 있게 유지합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
