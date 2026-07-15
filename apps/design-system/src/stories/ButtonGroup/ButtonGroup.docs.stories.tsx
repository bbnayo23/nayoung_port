import type { Meta, StoryObj } from '@storybook/react-vite'
import ButtonGroup from '../../components/ButtonGroup'
import * as S from './ButtonGroup.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

/**
 * ButtonGroup.docs.stories.tsx — MDX 를 대체하는 "문서 스토리".
 * DocKit 으로 문서 페이지를 조립하고, 예제는 ButtonGroup.stories 의 스토리를
 * renderExample 로 그대로 재사용해 문서와 예제가 항상 동기화되도록 한다.
 */
const meta = {
  title: 'StyleGuide/ButtonGroup',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Docs: Story = {
  name: '📖 Docs',
  render: () => (
    <DocPage>
      <DocHero
        eyebrow="StyleGuide · Component"
        title="ButtonGroup"
        subtitle="여러 선택지 중 하나를 선택하는 토글 버튼 그룹 컴포넌트"
        importCode={`import ButtonGroup from '@port/design-system'`}
      >
        <ButtonGroup variant="primary">
          <ButtonGroup.Item active>옵션 A</ButtonGroup.Item>
          <ButtonGroup.Item>옵션 B</ButtonGroup.Item>
          <ButtonGroup.Item>옵션 C</ButtonGroup.Item>
        </ButtonGroup>
      </DocHero>

      <DocSection
        title="API — ButtonGroup"
        description={<><Code>primary</Code>(슬라이더 탭)와 <Code>secondary</Code>(토글 버튼) 두 가지 variant를 지원합니다.</>}
      >
        <ApiTable
          rows={[
            { name: 'variant', type: `'primary' | 'secondary'`, default: `'primary'`, desc: '버튼 그룹 스타일 — primary는 슬라이더 탭, secondary는 토글 버튼' },
            { name: 'children', type: 'ReactNode', desc: 'ButtonGroup.Item 컴포넌트들' },
            { name: 'className', type: 'string', desc: '래퍼 요소에 추가할 CSS 클래스' },
          ]}
        />
      </DocSection>

      <DocSection title="API — ButtonGroup.Item" description="그룹 내 개별 항목 컴포넌트.">
        <ApiTable
          rows={[
            { name: 'active', type: 'boolean', default: 'false', desc: '활성화 상태. 선택된 항목임을 시각적으로 표시합니다.' },
            { name: 'disabled', type: 'boolean', default: 'false', desc: '비활성화 상태 — opacity, pointer-events 비활성' },
            { name: 'onClick', type: '() => void', desc: '클릭 핸들러' },
            { name: 'children', type: 'ReactNode', desc: '버튼 레이블 또는 아이콘' },
          ]}
        />
      </DocSection>

      <DocSection title="기본 사용법" description="Controls 패널에서 variant를 변경합니다.">
        <Example>{renderExample(S.Playground)}</Example>
      </DocSection>

      <DocSection title="Variant" description="primary(슬라이더 탭 형식)와 secondary(토글 버튼 형식) 두 가지 variant를 비교합니다.">
        <Example>{renderExample(S.Variants)}</Example>
      </DocSection>

      <DocSection title="Disabled Item" description="일부 항목을 disabled 처리하는 패턴입니다.">
        <Example>{renderExample(S.WithDisabled)}</Example>
      </DocSection>
    </DocPage>
  ),
}
