import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Divider.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Divider',
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
        title="Divider"
        subtitle="수평 또는 수직 방향의 구분선 컴포넌트"
        importCode={`import Divider from "@port/design-system"`}
      >
        {renderExample(S.Playground)}
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            구분선의 주요 props. 두께(<Code>size</Code>), 여백(<Code>margin</Code>), 투명도(<Code>opacity</Code>),
            색상(<Code>color</Code>)을 조절할 수 있습니다.
          </>
        }
      >
        <ApiTable
          rows={[
            {
              name: 'direction',
              type: `'horizontal' | 'vertical'`,
              default: `'horizontal'`,
              desc: '구분선 방향',
            },
            {
              name: 'size',
              type: 'number',
              default: '1',
              desc: '선 두께 (px). horizontal이면 borderTopWidth, vertical이면 borderLeftWidth에 적용',
            },
            {
              name: 'margin',
              type: 'number',
              default: '0',
              desc: '상하(horizontal) 또는 좌우(vertical) 여백 (px)',
            },
            {
              name: 'opacity',
              type: 'number',
              default: '1',
              desc: '투명도 (0–1). 미지정 시 요소의 기본 opacity 사용',
            },
            {
              name: 'color',
              type: 'string',
              desc: '선 색상 (CSS color 값). 미지정 시 토큰 색상 사용',
            },
            {
              name: 'className',
              type: 'string',
              desc: '루트 hr 요소에 추가할 CSS 클래스',
            },
            {
              name: 'style',
              type: 'CSSProperties',
              desc: '루트 hr 요소 인라인 스타일 (토큰 외 동적 값에만 사용)',
            },
          ]}
        />
      </DocSection>

      <DocSection title="방향" description="horizontal · vertical 두 방향을 나란히 비교합니다.">
        <Example>{renderExample(S.Directions)}</Example>
      </DocSection>

      <DocSection
        title="두께 (size)"
        description={
          <>
            <Code>size</Code> prop으로 선 두께를 조절합니다. horizontal이면 borderTopWidth, vertical이면
            borderLeftWidth에 적용됩니다.
          </>
        }
      >
        <Example>{renderExample(S.Thickness)}</Example>
      </DocSection>

      <DocSection
        title="투명도 (opacity)"
        description={
          <>
            <Code>opacity</Code> prop으로 선의 투명도를 조절합니다. 낮은 opacity로 서브 섹션의 위계를 표현할 수
            있습니다.
          </>
        }
      >
        <Example>{renderExample(S.Opacity)}</Example>
      </DocSection>

      <DocSection
        title="색상 (color)"
        description={
          <>
            <Code>color</Code> prop으로 선 색상을 직접 지정합니다. 미지정 시 토큰 색상을 사용합니다.
          </>
        }
      >
        <Example>{renderExample(S.CustomColor)}</Example>
      </DocSection>

      <DocSection
        title="사용 패턴"
        description={
          <>
            폼 섹션 구분, 버튼 그룹 구분 등 실제 사용 맥락의 예시입니다. 섹션 간격은 <Code>margin</Code>으로,
            강조도는 <Code>opacity</Code>로 조절합니다.
          </>
        }
      >
        <Example>{renderExample(S.InContext)}</Example>
      </DocSection>

      <DocSection title="인터랙티브" description="슬라이더로 투명도를 실시간 변경합니다.">
        <Example>{renderExample(S.WithOpacityInteractive)}</Example>
      </DocSection>
    </DocPage>
  ),
}
