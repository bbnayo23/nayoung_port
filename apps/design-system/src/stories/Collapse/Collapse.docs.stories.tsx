import type { Meta, StoryObj } from '@storybook/react-vite'
import { Collapse } from '../../components/Collapse'
import * as S from './Collapse.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample, Guidelines } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Collapse',
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
        title="Collapse"
        subtitle="단일 콘텐츠를 접고 펼치는 컴포넌트"
        importCode={`import { Collapse } from '@port/design-system'`}
      >
        <div style={{ maxWidth: 420 }}>
          <Collapse variant="card" header="Collapse 헤더" defaultOpen>
            펼쳐지는 콘텐츠 영역입니다.
          </Collapse>
        </div>
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            <Code>Collapse</Code>의 주요 props. card · row · more · horizontal 4가지 variant와 uncontrolled /
            controlled 두 가지 제어 방식을 지원합니다.
          </>
        }
      >
        <ApiTable
          rows={[
            {
              name: 'variant',
              type: `'card' | 'row' | 'more' | 'horizontal'`,
              default: `'card'`,
              desc: '스타일 변형',
            },
            { name: 'header', type: 'ReactNode', desc: '헤더 영역 (클릭 시 토글). 생략하면 외부 open 제어만 가능' },
            { name: 'defaultOpen', type: 'boolean', default: 'false', desc: '초기 열림 상태 (uncontrolled)' },
            { name: 'open', type: 'boolean', desc: '제어 모드 열림 상태. onOpenChange와 함께 사용' },
            { name: 'onOpenChange', type: '(open: boolean) => void', desc: '열림 상태 변경 콜백' },
            { name: 'children', type: 'ReactNode', desc: '펼쳐지는 콘텐츠 영역' },
          ]}
        />
      </DocSection>

      <DocSection title="Variants" description="card · row · more 세 가지 variant를 비교합니다.">
        <Example>{renderExample(S.Variants)}</Example>
      </DocSection>

      <DocSection title="ShowMore" description='variant="more" — 목록 일부를 먼저 보여주고 클릭 시 나머지를 펼칩니다.'>
        <Example>{renderExample(S.ShowMore)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="여닫기 상태 제어와 헤더 접근성을 지키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "간단한 단일 콘텐츠 토글에는 header 만 넘겨 uncontrolled(defaultOpen) 로 두고 내부 상태에 맡깁니다.",
            "여러 Collapse 를 하나만 열리게 하는 등 외부 로직이 필요할 때만 open 과 onOpenChange 로 controlled 로 전환합니다.",
            "목록 일부만 먼저 보여주고 나머지를 펼치는 더보기에는 variant=\"more\" 를 사용합니다.",
            "카드형 강조가 필요하면 variant=\"card\", 리스트 행 안에서는 variant=\"row\" 로 맥락에 맞는 변형을 고릅니다.",
          ]}
          donts={[
            "open 만 넘기고 onOpenChange 를 생략해 헤더를 눌러도 열리지 않는 죽은 상태를 만들지 않습니다.",
            "controlled 로 쓰면서 defaultOpen 을 함께 넘겨 초기 상태가 무시되는 혼란을 주지 않습니다.",
            "header 를 생략한 채 토글 UI 없이 두고 사용자가 콘텐츠를 열 방법이 없게 만들지 않습니다.",
            "펼침 애니메이션에 의존해 꼭 필요한 핵심 콘텐츠를 접힌 채 숨기지 않습니다.",
          ]}
          a11y={[
            "헤더는 실제 button 요소로 렌더링되어 aria-expanded 로 열림 상태가 노출되고 키보드 포커스·Enter/Space 활성화가 기본 지원됩니다.",
            "header 에는 텍스트 라벨을 함께 제공해 회전하는 chevron 아이콘만으로 상태를 전달하지 않도록 합니다.",
            "children 안에 링크·버튼 등 초점 대상이 있다면 접힌 상태에서 포커스가 숨은 콘텐츠로 들어가지 않게 관리합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
