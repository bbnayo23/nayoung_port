import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Popover.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Popover',
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
        title="Popover"
        subtitle="트리거 요소 주변에 부유하는 콘텐츠 패널"
        importCode={`import { Popover } from '@port/design-system'`}
      >
        {renderExample(S.Playground)}
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            팝오버의 주요 props. <Code>visible</Code>·<Code>onVisibleChange</Code>로 완전 제어(controlled)하며,
            Popper.js 기반 위치 계산으로 화면 경계를 자동 처리합니다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'children', type: 'ReactNode', required: true, desc: '팝오버를 여는 트리거 요소' },
            { name: 'content', type: 'ReactNode', required: true, desc: '팝오버 본문 콘텐츠' },
            { name: 'visible', type: 'boolean', required: true, desc: '팝오버 표시 여부 (controlled)' },
            { name: 'onVisibleChange', type: `(visible: boolean) => void`, desc: '표시 상태 변경 콜백' },
            {
              name: 'placement',
              type: `'top' | 'bottom' | 'left' | 'right'`,
              default: `'top'`,
              desc: '팝오버 표시 방향. 공간 부족 시 자동 반전됩니다.',
            },
            { name: 'title', type: 'ReactNode', desc: '팝오버 제목. 지정 시 본문 위에 렌더됩니다.' },
            { name: 'arrow', type: 'boolean', default: 'false', desc: '화살표 표시 여부' },
            { name: 'closeButton', type: 'boolean', default: 'false', desc: '우측 상단 닫기(×) 버튼 표시 여부' },
            { name: 'disabled', type: 'boolean', default: 'false', desc: '비활성화 — 팝오버가 렌더되지 않습니다.' },
            { name: 'offset', type: '[number, number]', default: '[0, 8]', desc: '트리거와 팝오버 사이 오프셋 [skid, distance]' },
            { name: 'portal', type: 'boolean', default: 'true', desc: 'Portal로 렌더 여부. false면 DOM 인라인 렌더.' },
            { name: 'closeOnOutsideClick', type: 'boolean', default: 'true', desc: '팝오버 외부 클릭 시 닫기' },
            { name: 'onClick', type: `() => void`, desc: '트리거 클릭 핸들러' },
          ]}
        />
      </DocSection>

      <DocSection
        title="Placement 비교"
        description="placement prop으로 top · bottom · left · right 중 선택합니다. 공간이 부족하면 Popper.js가 자동으로 반전합니다."
      >
        <Example>{renderExample(S.Placements)}</Example>
      </DocSection>

      <DocSection
        title="제목 + 닫기 버튼"
        description="title과 closeButton을 함께 사용하면 확인 다이얼로그 스타일로 활용할 수 있습니다."
      >
        <Example>{renderExample(S.WithCloseButton)}</Example>
      </DocSection>

      <DocSection title="호버 트리거" description="마우스를 올리면 팝오버가 열리고, 벗어나면 닫힙니다.">
        <Example>{renderExample(S.HoverTrigger)}</Example>
      </DocSection>

      <DocSection title="비활성화" description="비활성화 상태에서는 팝오버가 열리지 않습니다.">
        <Example>{renderExample(S.Disabled)}</Example>
      </DocSection>
    </DocPage>
  ),
}
