import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Modal.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

/**
 * Modal.docs.stories.tsx — MDX 를 대체하는 "문서 스토리".
 * DocKit 으로 문서 페이지를 조립하고, 예제는 Modal.stories 의 스토리를
 * renderExample 로 그대로 재사용해 문서와 예제가 항상 동기화되도록 한다.
 */
const meta = {
  title: 'StyleGuide/Modal',
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
        title="Modal"
        subtitle="다이얼로그 모달과 사이드 패널을 지원하는 오버레이 컴포넌트"
        importCode={`import Modal from '@port/design-system'`}
      >
        {renderExample(S.Playground)}
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            <Code>createPortal</Code>로 DOM 최상위에 렌더링하며, <Code>Modal.Header</Code> · <Code>Modal.Body</Code> ·{' '}
            <Code>Modal.Footer</Code> 컴파운드 패턴으로 구성합니다. <Code>open</Code> · <Code>onClose</Code>로 완전
            제어(controlled)합니다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'open', type: 'boolean', required: true, desc: '모달 표시 여부. false이고 isClosing도 false이면 null 반환' },
            { name: 'onClose', type: '() => void', required: true, desc: '닫기 콜백 — 딤드 클릭, 사이드 패널 닫기 버튼 클릭 시 호출' },
            { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, desc: "모달 너비 크기 (type='modal'에만 영향)" },
            { name: 'type', type: `'modal' | 'sidepanel'`, default: `'modal'`, desc: '표시 형태 — modal은 중앙, sidepanel은 좌/우 슬라이드' },
            { name: 'position', type: `'left' | 'right'`, desc: "사이드 패널 위치 (type='sidepanel'일 때만 적용)" },
            { name: 'showDimmed', type: 'boolean', default: 'false', desc: '사이드 패널에서도 딤드 오버레이를 표시할지 여부. modal 타입은 항상 표시' },
            { name: 'showCloseButton', type: 'boolean', default: 'true', desc: '사이드 패널 우상단 × 버튼 표시 여부' },
            { name: 'isClosing', type: 'boolean', default: 'false', desc: '닫힘 애니메이션 트리거. true이면 open=false여도 마운트 유지' },
            { name: 'portalTarget', type: 'Element | (() => Element)', default: 'document.body', desc: 'Portal 렌더 대상. [data-solution] 요소가 있으면 그것이 기본값' },
            { name: 'className', type: 'string', desc: '모달 래퍼 div에 추가할 CSS 클래스' },
          ]}
        />
      </DocSection>

      <DocSection title="API — 서브 컴포넌트" description="컴파운드 패턴으로 모달 내부 영역을 구성합니다.">
        <ApiTable
          rows={[
            { name: 'Modal.Header', type: '', desc: '모달 상단 제목 영역 — 닫기 버튼이 없는 경우 제목만 표시' },
            { name: 'Modal.Body', type: '', desc: '모달 본문 스크롤 영역 — 주요 콘텐츠 배치' },
            { name: 'Modal.Footer', type: '', desc: '모달 하단 액션 버튼 영역 — 확인/취소 등 버튼 배치' },
          ]}
        />
      </DocSection>

      <DocSection title="Playground" description="버튼으로 모달을 열어 기본 다이얼로그 형태를 확인합니다.">
        <Example>{renderExample(S.Playground)}</Example>
      </DocSection>

      <DocSection title="Size" description={<>sm · md · lg 세 가지 크기를 각각 열어볼 수 있습니다. (<Code>type=&quot;modal&quot;</Code>)</>}>
        <Example>{renderExample(S.Sizes)}</Example>
      </DocSection>

      <DocSection
        title="사이드 패널"
        description={
          <>
            <Code>type=&quot;sidepanel&quot;</Code>과 <Code>position</Code>으로 좌/우측 슬라이드 패널을 표시합니다.{' '}
            <Code>showCloseButton</Code>으로 닫기 버튼을 추가합니다.
          </>
        }
      >
        <Example>{renderExample(S.SidePanel)}</Example>
      </DocSection>

      <DocSection
        title="딤드 사이드 패널"
        description={
          <>
            <Code>showDimmed=true</Code>로 설정하면 사이드 패널 뒤에도 딤드 오버레이가 표시됩니다. modal 타입은 항상 딤드가
            표시됩니다.
          </>
        }
      >
        <Example>{renderExample(S.WithDimmed)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="다이얼로그·사이드 패널의 열림/닫힘 제어와 접근성을 지키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "open · onClose 로 완전 제어(controlled)하며, 상태 변경은 항상 부모가 관리합니다.",
            "제목은 Modal.Header, 본문은 Modal.Body, 확인·취소 버튼은 Modal.Footer 로 영역을 나눠 구성합니다.",
            "type='modal' 은 sm·md·lg 로 콘텐츠 양에 맞춰 너비를 고르고, 화면 한쪽에서 여닫는 흐름에는 type='sidepanel' 과 position 을 씁니다.",
            "닫힘 애니메이션이 필요하면 isClosing 을 true 로 두어 트랜지션 동안 마운트를 유지한 뒤 언마운트합니다.",
          ]}
          donts={[
            "onClose 없이 열기만 해서 딤드 클릭·ESC·닫기 버튼으로 닫을 수 없는 상태를 만들지 않습니다.",
            "긴 본문 전체를 Modal.Body 없이 넣어 스크롤 영역과 헤더·푸터가 함께 밀려나게 하지 않습니다.",
            "실수로 닫히면 안 되는 입력 폼에서 closeOnOverlay·closeOnEsc 를 기본값(true)으로 방치하지 않고 false 로 막습니다.",
            "type='modal' 에 position 을, sidepanel 에 size 를 주는 식으로 서로 다른 타입 전용 prop 을 섞어 쓰지 않습니다.",
          ]}
          a11y={[
            "사이드 패널의 닫기 버튼은 아이콘만 있으므로 aria-label='닫기' 로 대체 텍스트가 제공됩니다.",
            "closeOnEsc 기본값(true)으로 ESC 키 닫기가 지원되며, 폼처럼 오조작을 막아야 할 때만 끕니다.",
            "role='dialog' 와 aria-modal, 초기 포커스는 자동 지정되지 않으므로, 접근성이 중요한 화면에서는 래퍼 요소에 직접 지정합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
