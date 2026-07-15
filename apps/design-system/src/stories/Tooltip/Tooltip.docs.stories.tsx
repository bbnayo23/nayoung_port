import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Tooltip.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Tooltip',
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
        title="Tooltip"
        subtitle="react-popper 기반의 12방향 placement 툴팁 컴포넌트"
        importCode={`import { Tooltip } from '@port/design-system'`}
      />

      <DocSection
        title="API"
        description={
          <>
            <Code>react-popper</Code> 기반의 툴팁 컴포넌트입니다. 8방향 <Code>placement</Code>와 controlled 모드,
            portal 렌더링을 지원합니다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'content', type: 'ReactNode', required: true, desc: '툴팁에 표시할 내용 (필수)' },
            { name: 'children', type: 'ReactNode', required: true, desc: '툴팁 트리거가 될 요소 (필수)' },
            {
              name: 'placement',
              type: 'Placement',
              default: `'top'`,
              desc: '툴팁 위치 — top · bottom · left · right 및 -start · -end 변형 포함 (총 12방향)',
            },
            { name: 'open', type: 'boolean', desc: 'Controlled 모드 — 툴팁 표시 여부를 외부에서 제어합니다.' },
            { name: 'onOpen', type: '() => void', desc: 'Controlled 모드에서 마우스 진입 시 호출' },
            { name: 'onClose', type: '() => void', desc: 'Controlled 모드에서 마우스 이탈 시 호출' },
            {
              name: 'portal',
              type: 'boolean',
              default: 'false',
              desc: 'true면 document.body에 포털 렌더링 — overflow:hidden 부모에서도 잘리지 않습니다.',
            },
            {
              name: 'portalTarget',
              type: `HTMLElement | () => HTMLElement`,
              desc: 'portal=true 시 렌더링 대상 엘리먼트. 미지정 시 document.body',
            },
            { name: 'popperOptions', type: 'Partial<Options>', desc: 'usePopper에 전달할 추가 옵션' },
          ]}
        />
      </DocSection>

      <DocSection title="ReactNode content" description="content에 ReactNode를 전달해 리치 컨텐츠를 구성할 수 있습니다.">
        <Example>{renderExample(S.ContentTypes)}</Example>
      </DocSection>

      <DocSection title="Controlled 모드" description="open prop으로 표시 여부를 외부에서 완전히 제어합니다.">
        <Example>{renderExample(S.Controlled)}</Example>
      </DocSection>

      <DocSection
        title="Portal 렌더링"
        description="portal=true로 document.body에 렌더링하면 overflow:hidden 부모 안에서도 잘리지 않습니다."
      >
        <Example>{renderExample(S.Portal)}</Example>
      </DocSection>

      <DocSection
        title="Placement"
        description="@popperjs/core의 전체 Placement 타입을 지원합니다. 마우스를 올려 위치를 확인하세요."
      >
        <Example>{renderExample(S.Placements)}</Example>
      </DocSection>
    </DocPage>
  ),
}
