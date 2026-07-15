import type { Meta, StoryObj } from '@storybook/react-vite'
import ButtonGroup from '../../components/ButtonGroup'
import * as S from './ButtonGroup.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

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

      <DocSection title="사용 지침" description="상호 배타적인 선택을 다루는 토글 그룹으로서 지켜야 할 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "한 그룹에서 active 는 항상 하나의 ButtonGroup.Item 에만 지정해 현재 선택을 명확히 합니다.",
            "슬라이더 위치가 3번째 항목까지만 정의되어 있으므로 primary variant 는 2~3개 항목으로 구성합니다.",
            "항목이 4개 이상이거나 경계선이 뚜렷한 토글이 필요하면 secondary variant 를 사용합니다.",
            "onClick 으로 상위 상태를 갱신하고 그 값을 active 로 다시 내려 선택이 화면에 반영되게 합니다.",
            "탭 전환이나 필터처럼 상호 배타적인 선택에 쓰고 각 Item 레이블은 짧고 병렬적인 단어로 맞춥니다.",
          ]}
          donts={[
            "한 그룹에서 여러 Item 에 active 를 동시에 주지 않습니다. primary 슬라이더 위치가 어긋납니다.",
            "primary variant 에 4개 이상의 Item 을 넣지 않습니다. slider-background 가 nth-child(3)까지만 배치됩니다.",
            "여러 항목을 동시에 켜는 다중 선택 UI 로 쓰지 않고 체크박스나 토글 스위치를 사용합니다.",
            "저장·삭제처럼 서로 무관한 액션을 묶지 않습니다. 그런 경우 Button 을 나열합니다.",
          ]}
          a11y={[
            "Item 은 표준 button 요소라 Tab 포커스와 Enter/Space 활성화가 기본 지원됩니다.",
            "active 는 is-active 클래스로 시각 표시만 하므로 role='tab'·aria-selected 또는 aria-pressed 를 Item 에 직접 전달해 선택 상태를 보조기기에 알립니다.",
            "아이콘만 있는 Item 에는 aria-label 로 대체 텍스트를 제공합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
