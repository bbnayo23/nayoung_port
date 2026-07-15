import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './AlertModal.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/AlertModal',
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
        title="AlertModal"
        subtitle="사용자 확인이 필요한 알림 · 경고 · 확인 다이얼로그"
        importCode={`import AlertModal from '@port/design-system'`}
      />

      <DocSection
        title="API — AlertModal"
        description={
          <>
            사용자 확인이 필요한 알림, 경고, 확인 다이얼로그를 표시하는 컴포넌트입니다. <Code>AlertModal.Header</Code> ·{' '}
            <Code>AlertModal.Body</Code> · <Code>AlertModal.Footer</Code> 컴파운드 패턴으로 구성되며, <Code>createPortal</Code>을 사용해
            DOM 트리 밖에 렌더링됩니다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'open', type: 'boolean', default: 'false', desc: '모달 열림/닫힘 상태. 호출자가 직접 제어합니다 (controlled).' },
            { name: 'onClose', type: '() => void', desc: '배경(dimmed) 클릭 또는 닫기 트리거 시 호출되는 콜백' },
            { name: 'closeOnOverlay', type: 'boolean', default: 'true', desc: '배경(dimmed) 클릭으로 모달을 닫을지 여부' },
            { name: 'children', type: 'ReactNode', desc: 'AlertModal.Header · Body · Footer 서브컴포넌트' },
            { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'sm'`, desc: '모달 크기' },
            {
              name: 'portalTarget',
              type: 'Element | DocumentFragment | () => Element | DocumentFragment',
              desc: 'portal 렌더링 대상. 기본값은 document.body',
            },
            { name: 'className', type: 'string', desc: '모달 래퍼 요소에 추가할 CSS 클래스' },
          ]}
        />
      </DocSection>

      <DocSection title="API — AlertModal.Header">
        <ApiTable
          rows={[
            { name: 'title', type: 'string', desc: '헤더에 표시할 제목 텍스트' },
            {
              name: 'icon',
              type: 'ReactNode',
              desc: '헤더 상단에 표시할 아이콘. @port/icon-library의 Xdr* 아이콘을 권장합니다.',
            },
            {
              name: 'type',
              type: `'info' | 'success' | 'warning' | 'error' | 'confirm'`,
              default: `'info'`,
              desc: '아이콘 색상 변형. 각 타입에 맞는 색상이 자동 적용됩니다.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="API — AlertModal.Body">
        <ApiTable
          rows={[
            { name: 'description', type: 'ReactNode', desc: '본문 메시지. p 태그로 감싸져 렌더링됩니다.' },
            { name: 'children', type: 'ReactNode', desc: '커스텀 본문 콘텐츠. description과 함께 사용 가능합니다.' },
          ]}
        />
      </DocSection>

      <DocSection title="API — AlertModal.Footer">
        <ApiTable
          rows={[
            { name: 'showCancelButton', type: 'boolean', default: 'false', desc: '취소 버튼 표시 여부' },
            { name: 'primaryLabel', type: 'string', default: `'OK'`, desc: '확인(주요) 버튼 텍스트' },
            {
              name: 'secondaryLabel',
              type: 'string',
              desc: '보조 버튼 텍스트. 제공 시 취소 버튼과 확인 버튼 사이에 렌더링됩니다.',
            },
            { name: 'cancelLabel', type: 'string', default: `'Cancel'`, desc: '취소 버튼 텍스트' },
            {
              name: 'confirmVariant',
              type: `'info' | 'success' | 'warning' | 'error' | 'confirm'`,
              default: `'info'`,
              desc: '확인 버튼 색상 변형. error 타입이면 danger 버튼으로 렌더링됩니다.',
            },
            { name: 'onPrimary', type: '() => void', desc: '확인(주요) 버튼 클릭 콜백' },
            { name: 'onSecondary', type: '() => void', desc: '보조 버튼 클릭 콜백' },
            { name: 'onCancel', type: '() => void', desc: '취소 버튼 클릭 콜백' },
            { name: 'children', type: 'ReactNode', desc: '커스텀 버튼 영역. 제공 시 기본 버튼을 대체합니다.' },
          ]}
        />
      </DocSection>

      <DocSection title="기본 사용법" description="open state를 관리하고 onClose · onPrimary 콜백으로 제어합니다.">
        <Example>{renderExample(S.Playground)}</Example>
      </DocSection>

      <DocSection
        title="타입"
        description="info / success / warning / error / confirm 5가지 타입을 확인할 수 있습니다. 각 타입에 맞는 아이콘 색상과 확인 버튼 색상이 적용됩니다."
      >
        <Example>{renderExample(S.AlertTypes)}</Example>
      </DocSection>

      <DocSection title="취소 버튼 패턴" description="showCancelButton으로 취소 버튼을 표시합니다. 파괴적 작업 확인에 적합합니다.">
        <Example>{renderExample(S.WithCancel)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="사용자 확인 다이얼로그로서의 용도와 접근성을 지키기 위한 권장·지양 사항입니다.">
        <Guidelines
          dos={[
            "open 을 호출자가 직접 관리하는 controlled 방식으로 두고, onClose 와 Footer 의 onPrimary·onCancel 콜백으로 열림·닫힘과 액션을 제어합니다.",
            "AlertModal.Header·Body·Footer 컴파운드 구조로 조합하고, 헤더 title 과 본문 description 으로 제목과 메시지를 분리합니다.",
            "삭제 등 파괴적 작업 확인에는 Header 의 type='error' 와 Footer 의 confirmVariant='error' 를 함께 지정해 확인 버튼이 danger 로 렌더되게 합니다.",
            "되돌릴 수 있어야 하는 확인 다이얼로그에는 showCancelButton 을 켜 취소 경로를 제공합니다.",
          ]}
          donts={[
            "사용자 응답이 필요 없는 단순 알림·성공 피드백에 AlertModal 을 쓰지 않습니다. 그런 경우 Toast 등 비차단 컴포넌트를 사용합니다.",
            "파괴적 작업에 confirmVariant 를 기본값 'info'(primary 버튼) 로 두지 않습니다. 위험을 시각적으로 구분하도록 'error' 를 지정합니다.",
            "size='lg' 에도 긴 폼이나 복잡한 인터랙션을 담지 않습니다. 복잡한 작업 흐름은 별도 모달이나 페이지로 분리합니다.",
            "closeOnOverlay 를 false 로 끈 상태에서 Footer 의 닫기·취소 버튼까지 생략해 사용자가 모달을 벗어날 수 없게 만들지 않습니다.",
          ]}
          a11y={[
            "다이얼로그의 의미를 Header 의 type 색상에만 의존하지 말고 title·description 텍스트와 primaryLabel 로 명확히 전달해 색각 이상 사용자도 구분할 수 있게 합니다.",
            "배경 클릭 닫기(closeOnOverlay)만으로는 키보드 사용자가 모달을 벗어날 수 없으므로 Footer 에 취소·확인 버튼을 항상 제공합니다.",
            "AlertModal.Header 의 title 은 h3 로 렌더되므로 제목은 icon 이 아닌 title 로 전달해 스크린 리더가 다이얼로그 제목을 읽을 수 있게 합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
