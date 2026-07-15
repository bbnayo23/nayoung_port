import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './InputGroup.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/InputGroup',
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
        title="InputGroup"
        subtitle="입력 필드·텍스트·아이콘·버튼을 가로로 결합하는 Compound 컴포넌트"
        importCode={`import InputGroup from '@port/design-system'`}
      >
        {renderExample(S.Playground)}
      </DocHero>

      <DocSection
        title="API — InputGroup"
        description={
          <>
            입력 필드(<Code>Input</Code>)·텍스트(<Code>Text</Code>)·아이콘(<Code>Icon</Code>)·버튼(<Code>Button</Code>)을
            가로로 결합합니다. Context 기반으로 하위 컴포넌트에 <Code>size</Code>를 자동 전달합니다.
          </>
        }
      >
        <ApiTable
          rows={[
            {
              name: 'size',
              type: `'sm' | 'md' | 'lg'`,
              default: `'md'`,
              desc: '그룹 크기 — Context로 모든 하위 컴포넌트에 자동 전달',
            },
            {
              name: 'variant',
              type: `'default' | 'error' | 'success' | 'warning'`,
              default: `'default'`,
              desc: '상태 variant — 테두리 색상에 반영',
            },
            { name: 'fullWidth', type: 'boolean', default: 'false', desc: '컨테이너 너비에 맞춤' },
            { name: 'className', type: 'string', desc: '루트 div에 추가할 CSS 클래스' },
          ]}
        />
      </DocSection>

      <DocSection
        title="API — 서브 컴포넌트"
        description="Compound 패턴으로 제공되는 하위 컴포넌트들. Type 열은 각 컴포넌트의 주요 Props를 나타냅니다."
      >
        <ApiTable
          rows={[
            {
              name: 'InputGroup.Input',
              type: 'HTML input 속성 모두 지원',
              desc: '입력 필드 (flex: 1로 확장)',
            },
            {
              name: 'InputGroup.Button',
              type: `variant: 'primary' | 'secondary' | 'ghost'`,
              desc: '버튼 (기본 variant: secondary)',
            },
            { name: 'InputGroup.Text', type: '—', desc: '정적 텍스트/라벨 애드온' },
            {
              name: 'InputGroup.Icon',
              type: `position: 'left' | 'right' | 'middle'`,
              desc: '아이콘 슬롯',
            },
            { name: 'InputGroup.Label', type: 'required: boolean', desc: '폼 라벨' },
            {
              name: 'InputGroup.HelperText',
              type: `variant: 'default' | 'error' | 'success' | 'warning'`,
              desc: '도움말/오류 텍스트',
            },
            {
              name: 'InputGroup.FormField',
              type: `direction: 'vertical' | 'horizontal'`,
              desc: 'Label + InputGroup + HelperText 래퍼',
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="조합 예시"
        description="아이콘 접두, 좌우 텍스트 애드온, 접미 도메인 등 다양한 하위 컴포넌트 조합을 보여줍니다."
      >
        <Example>{renderExample(S.Compositions)}</Example>
      </DocSection>

      <DocSection title="Variant" description="상태 variant(default·error·success·warning)에 따라 테두리 색상이 바뀝니다.">
        <Example>{renderExample(S.Variants)}</Example>
      </DocSection>

      <DocSection
        title="FormField"
        description={
          <>
            <Code>InputGroup.FormField</Code>로 Label·InputGroup·HelperText를 하나의 폼 필드 단위로 구성합니다.
          </>
        }
      >
        <Example>{renderExample(S.FormField)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="InputGroup을 올바르게 조합하고 접근성을 지키기 위한 권장·지양 사항입니다.">
        <Guidelines
          dos={[
            "size 는 InputGroup 루트에 한 번만 지정해 Context 로 하위 컴포넌트에 동일 크기가 전달되게 합니다.",
            "검색·전송·초기화처럼 클릭 가능한 액션은 InputGroup.Button 으로 구성해 키보드로도 조작할 수 있게 합니다.",
            "오류·성공 상태는 variant 와 함께 InputGroup.HelperText 로 사유 텍스트를 같이 제공합니다.",
            "라벨·입력·도움말을 하나의 필드로 묶을 때는 InputGroup.FormField 로 감싸 간격과 구조를 일관되게 유지합니다.",
          ]}
          donts={[
            "InputGroup.Input 이나 Button 에 size 를 개별 지정해 그룹 크기와 어긋나게 만들지 않습니다.",
            "클릭 동작이 필요한 자리에 InputGroup.Icon 을 쓰지 않습니다 — 아이콘은 aria-hidden 처리된 장식 요소라 키보드·스크린리더로 동작하지 않습니다.",
            "상태 전달을 variant 의 테두리 색상에만 의존하지 않습니다 — 색상만으로는 색각 이상 사용자에게 전달되지 않습니다.",
            "도메인·단위 같은 정적 애드온을 InputGroup.Button 으로 만들어 클릭 가능한 것처럼 보이게 하지 않고 InputGroup.Text 를 사용합니다.",
          ]}
          a11y={[
            "InputGroup.Label 은 input 과 자동 연결되지 않으므로 htmlFor 와 InputGroup.Input 의 id 를 맞춰 연결합니다.",
            "error variant 일 때는 InputGroup.Input 에 aria-invalid 를 주고 aria-describedby 로 HelperText 와 연결해 오류 사유가 읽히게 합니다.",
            "InputGroup.Icon 은 aria-hidden 이 항상 적용되므로 의미 있는 정보는 텍스트나 대체 수단으로 별도 제공합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
