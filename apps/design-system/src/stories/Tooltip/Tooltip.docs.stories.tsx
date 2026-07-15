import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Tooltip.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '@dc/stories/_docs/DocKit'

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

      <DocSection title="사용 지침" description="hover 기반 툴팁의 접근성 한계와 placement·portal 사용을 고려한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "content 에는 label·단축키·아이콘 의미 같은 짧은 보조 설명만 넣어 hover 순간에 바로 읽히게 합니다.",
            "overflow:hidden 이나 transform 이 걸린 부모 안에서 잘린다면 portal 을 true 로 켜 document.body 로 렌더링합니다.",
            "트리거 근처에 공간이 부족하면 placement 의 -start·-end 변형까지 활용해 화면 밖으로 넘치지 않게 배치합니다.",
            "메뉴·가이드 투어처럼 표시 시점을 직접 제어해야 할 때는 open 과 onOpen·onClose 로 controlled 모드를 씁니다.",
          ]}
          donts={[
            "클릭해야 할 버튼·링크 등 필수 조작 요소를 content 안에만 두지 않습니다. hover 로만 열려 터치·키보드 사용자가 닿지 못합니다.",
            "content 에 긴 문단이나 복잡한 폼을 넣지 않습니다. 그런 콘텐츠는 Popover 나 Dialog 로 대체합니다.",
            "controlled(open 지정) 상태에서 onOpen·onClose 를 연결하지 않아 열고 닫히지 않는 상태로 두지 않습니다.",
            "OPEN_DELAY·CLOSE_DELAY 를 감안하지 않고 즉시 사라짐을 기대해 짧게 스쳐도 떠야 하는 정보를 담지 않습니다.",
          ]}
          a11y={[
            "이 컴포넌트는 mouseenter·mouseleave 로만 열려 키보드 포커스·터치로는 뜨지 않으므로, 핵심 정보는 aria-label 등 트리거 자체에 함께 제공합니다.",
            "role='tooltip' 이나 aria-describedby 연결이 자동으로 걸리지 않으므로, 필요한 경우 children 트리거에 직접 aria 속성을 부여합니다.",
            "content 텍스트와 tooltipBox 배경 사이 명도 대비를 WCAG AA(4.5:1) 이상으로 확보합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
