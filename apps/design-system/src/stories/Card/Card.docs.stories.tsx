import type { Meta, StoryObj } from '@storybook/react-vite'
import Card from '../../components/Card'
import * as S from './Card.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

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
    </DocPage>
  ),
}
