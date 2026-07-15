import type { Meta, StoryObj } from '@storybook/react-vite'
import Accordion from '../../components/Accordion'
import * as S from './Accordion.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Accordion',
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
        title="Accordion"
        subtitle="논리적으로 연관된 여러 섹션을 그룹으로 묶어 관리하는 컴파운드 컴포넌트"
        importCode={`import { Accordion } from '@port/design-system'`}
      >
        <Accordion iconDirection="right">
          <Accordion.Item active onChange={() => {}}>
            <Accordion.Header>아코디언 헤더</Accordion.Header>
            <Accordion.Content>펼쳐진 콘텐츠 영역입니다.</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </DocHero>

      <DocSection
        title="API — Accordion"
        description={
          <>
            논리적으로 연관된 여러 섹션을 그룹으로 묶어 관리합니다. <Code>Accordion.Item</Code> ·{' '}
            <Code>Accordion.Header</Code> · <Code>Accordion.Content</Code> 컴파운드 패턴으로 구성됩니다. 단일 섹션
            토글이 필요할 때는 Collapse를 사용하세요.
          </>
        }
      >
        <ApiTable
          rows={[
            {
              name: 'iconDirection',
              type: `'left' | 'right'`,
              default: `'right'`,
              desc: '모든 항목에 공통 적용되는 아이콘 방향',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              desc: '그룹 전체 비활성화. 개별 항목보다 우선합니다.',
            },
            { name: 'className', type: 'string', desc: '루트 요소에 추가할 CSS 클래스' },
          ]}
        />
      </DocSection>

      <DocSection
        title="API — Accordion.Item"
        description={
          <>
            <Code>Accordion.Header</Code>와 <Code>Accordion.Content</Code>는 별도 props 없이 <Code>children</Code>과
            표준 HTML 속성(<Code>className</Code> 포함)을 그대로 전달합니다.
          </>
        }
      >
        <ApiTable
          rows={[
            {
              name: 'active',
              type: 'boolean',
              default: 'false',
              desc: '펼침 상태. 호출자가 직접 제어합니다 (controlled).',
            },
            {
              name: 'onChange',
              type: '(open: boolean) => void',
              required: true,
              desc: '헤더 클릭 시 다음 열림 상태를 전달하는 콜백',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              desc: '해당 항목만 비활성화. Accordion.disabled보다 세밀합니다.',
            },
            { name: 'className', type: 'string', desc: '항목 래퍼 요소에 추가할 CSS 클래스' },
          ]}
        />
      </DocSection>

      <DocSection title="Playground" description="Accordion.Item을 조합한 기본 사용 형태.">
        <Example>{renderExample(S.Playground)}</Example>
      </DocSection>

      <DocSection
        title="Exclusive (단일 열림)"
        description="한 번에 하나만 열리는 패턴. 다른 항목 클릭 시 기존 항목이 닫힙니다. FAQ, Q&A 목록에 사용합니다."
      >
        <Example>{renderExample(S.Exclusive)}</Example>
      </DocSection>

      <DocSection
        title="Multiple (다중 열림)"
        description="여러 항목을 동시에 펼칠 수 있는 패턴. 설정 페이지의 카테고리 그룹에 사용합니다."
      >
        <Example>{renderExample(S.Multiple)}</Example>
      </DocSection>

      <DocSection
        title="아이콘 방향"
        description={
          <>
            <Code>iconDirection</Code> <Code>left</Code> · <Code>right</Code> 비교. 그룹 전체에 한 번에 적용됩니다.
          </>
        }
      >
        <Example>{renderExample(S.IconDirection)}</Example>
      </DocSection>

      <DocSection title="비활성화" description="항목 개별 비활성화 vs 그룹 전체 비활성화.">
        <Example>{renderExample(S.Disabled)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="컴파운드 구조와 controlled 상태를 올바르게 다루기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "Accordion.Item · Accordion.Header · Accordion.Content 세 요소를 한 항목 안에 모두 갖춰 컴파운드 구조를 지킵니다.",
            "active 는 호출자가 상태로 보관하고 onChange(nextActive) 콜백으로 갱신하는 controlled 방식으로 제어합니다.",
            "한 번에 하나만 열려야 하는 FAQ 목록은 onChange 에서 다른 항목의 active 를 false 로 닫아 Exclusive 패턴을 구현합니다.",
            "iconDirection 은 Accordion 루트에 한 번만 지정해 그룹 내 모든 헤더의 아이콘 방향을 일관되게 맞춥니다.",
            "단일 섹션만 여닫으면 되는 경우에는 Accordion 대신 Collapse 를 사용합니다.",
          ]}
          donts={[
            "active 를 초기값으로만 넘기고 onChange 를 연결하지 않아 헤더를 눌러도 열리지 않는 상태로 두지 않습니다.",
            "iconDirection 을 항목마다 다르게 기대하지 않습니다. left · right 는 그룹 전체에 공통 적용됩니다.",
            "그룹 전체를 막을 때 각 항목에 disabled 를 반복 지정하지 않고 Accordion 의 disabled 하나로 처리합니다.",
            "Accordion.Content 안에 또 다른 스크롤 영역이나 과도하게 긴 콘텐츠를 넣어 열림 높이 전환을 방해하지 않습니다.",
          ]}
          a11y={[
            "Accordion.Header 는 실제 button 요소로 렌더링되어 키보드 포커스와 Enter · Space 활성화가 기본 지원됩니다.",
            "헤더에는 현재 펼침 상태를 나타내는 aria-expanded 가 active 값과 함께 자동으로 부여됩니다.",
            "disabled 항목은 클릭 토글이 차단되므로, 사용자가 활성 항목과 구분할 수 있도록 헤더 텍스트 대비를 충분히 유지합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
