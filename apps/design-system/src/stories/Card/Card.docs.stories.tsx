import type { Meta, StoryObj } from '@storybook/react-vite'
import Card from '@dc/components/Card'
import * as S from './Card.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '@dc/stories/_docs/DocKit'

const meta = {
  title: 'StyleGuide/Card',
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
        title="Card"
        subtitle="컨텐츠를 그룹화하는 컨테이너 컴포넌트"
        importCode={`import Card from '@port/design-system'
import { CardSkeleton } from '@port/design-system'`}
      >
        <Card title="Card" style={{ width: 240 }}>
          <Card.Body>Header · Body · Image · Footer 서브컴포넌트와 함께 사용합니다.</Card.Body>
        </Card>
      </DocHero>

      <DocSection
        title="API — Card"
        description={
          <>
            카드의 주요 props. 컨텐츠를 그룹화하며, <Code>Card.Header</Code> · <Code>Card.Body</Code> ·{' '}
            <Code>Card.Image</Code> · <Code>Card.Footer</Code> 서브컴포넌트와 함께 사용합니다.
          </>
        }
      >
        <ApiTable
          rows={[
            {
              name: 'variant',
              type: `'default' | 'section' | 'old-exd' | 'neo'`,
              default: `'default'`,
              desc: '카드 스타일 변형',
            },
            { name: 'title', type: 'ReactNode', desc: '카드 헤더 제목 — variant별 헤더 슬롯에 렌더링' },
            { name: 'action', type: 'ReactNode', desc: '헤더 우측 액션 영역 (버튼, 뱃지 등)' },
            { name: 'size', type: `'sm' | 'md' | 'lg'`, desc: '카드 너비 고정 크기 (280 · 360 · 480px)' },
            {
              name: 'density',
              type: `'default' | 'compact'`,
              default: `'default'`,
              desc: '내부 밀도. compact는 패딩·폰트를 줄여 목록형 카드에 적합',
            },
            { name: 'isActive', type: 'boolean', desc: '활성 상태 — primary 보더 강조' },
            { name: 'disabled', type: 'boolean', default: 'false', desc: '비활성화 — opacity 처리, 클릭 불가' },
            { name: 'hoverable', type: 'boolean', desc: '호버 효과. onClick이 있으면 기본값 true' },
            {
              name: 'noPadding',
              type: 'boolean',
              default: 'false',
              desc: '내부 패딩 제거 — 툴바·그리드 등 자체 패딩 컨텐츠에 사용',
            },
            {
              name: 'onClick',
              type: '(e: MouseEvent) => void',
              desc: '클릭 핸들러. 설정 시 hoverable 자동 활성화',
            },
          ]}
        />
      </DocSection>

      <DocSection title="Variant" description="default · section · old-exd · neo 네 가지 variant를 비교합니다.">
        <Example>{renderExample(S.Variants)}</Example>
      </DocSection>

      <DocSection title="State" description="default · isActive · hoverable · disabled 상태를 비교합니다.">
        <Example>{renderExample(S.States)}</Example>
      </DocSection>

      <DocSection title="Density" description="default · compact 밀도를 비교합니다.">
        <Example>{renderExample(S.Density)}</Example>
      </DocSection>

      <DocSection
        title="Subcomponents"
        description="Card.Header · Card.Body · Card.Image · Card.Footer 서브컴포넌트 조합 예시"
      >
        <Example>{renderExample(S.Subcomponents)}</Example>
      </DocSection>

      <DocSection
        title="Clickable"
        description="onClick이 있는 카드 — 자동으로 hoverable 처리되고 클릭 시 선택 상태를 토글합니다."
      >
        <Example>{renderExample(S.Clickable)}</Example>
      </DocSection>

      <DocSection
        title="SearchConditionCard Pattern"
        description={
          <>
            검색기록·템플릿 카드 패턴 — <Code>Card</Code> + <Code>density="compact"</Code> +{' '}
            <Code>hoverable</Code> + <Code>isActive</Code> 조합
          </>
        }
      >
        <Example>{renderExample(S.SearchConditionCardPattern)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="카드의 위계와 선택 상태·접근성을 지키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "onClick으로 선택형 카드를 만들 때 isActive 로 현재 선택 상태를 보더 강조로 함께 표시합니다.",
            "검색기록·목록형 카드는 density=\"compact\" 로 패딩과 폰트를 줄여 한 화면에 더 많은 항목을 담습니다.",
            "툴바·그리드처럼 자체 패딩을 가진 컨텐츠를 감쌀 때 noPadding 으로 이중 여백을 제거합니다.",
            "헤더 제목은 title, 우측 버튼·뱃지는 action prop 에 넣어 헤더 슬롯 정렬을 일관되게 유지합니다.",
          ]}
          donts={[
            "old-exd·neo variant 는 레거시·특수 화면 전용이므로 일반 카드에는 default·section 을 사용합니다.",
            "disabled 는 시각적 opacity 만 낮출 뿐 onClick 핸들러는 그대로 실행되므로, 비활성 상태에서 동작 차단이 필요하면 핸들러 안에서 직접 막습니다.",
            "size 는 sm·md·lg 고정 너비를 강제하므로 반응형 그리드 안에서는 size 대신 컨테이너 폭에 맡깁니다.",
            "onClick 없이 hoverable 만 켜서 클릭되지 않는 카드에 호버 효과를 주지 않습니다.",
          ]}
          a11y={[
            "onClick 카드는 div 기반이라 키보드 포커스와 Enter·Space 활성화가 기본 지원되지 않으므로, role=\"button\"·tabIndex·onKeyDown 을 함께 전달해 키보드 조작을 보장합니다.",
            "선택 상태 isActive 는 보더 색 강조로만 표현되므로 aria-pressed 또는 aria-current 를 함께 지정해 스크린리더에 상태를 전달합니다.",
            "old-exd 의 별 아이콘과 neo 의 액센트 바는 aria-hidden 처리된 장식이므로 의미 전달은 title 텍스트로 합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
