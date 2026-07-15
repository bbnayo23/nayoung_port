import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './AlertModal.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

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
    </DocPage>
  ),
}
