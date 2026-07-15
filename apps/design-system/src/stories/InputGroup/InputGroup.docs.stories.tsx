import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './InputGroup.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

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
    </DocPage>
  ),
}
