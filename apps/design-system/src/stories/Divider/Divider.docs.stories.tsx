import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Divider.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '@dc/stories/_docs/DocKit'

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

      <DocSection title="사용 지침" description="구분선의 방향·토큰·접근성을 지키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "direction='vertical' 은 alignSelf: stretch 로 늘어나므로 높이가 정해진 flex 컨테이너 안에서만 사용합니다.",
            "선 색상은 color 를 비워 두어 vars.color.border 토큰을 그대로 사용하고, 테마 전환에 자동으로 대응하게 합니다.",
            "섹션 사이 간격은 부모의 별도 마진 대신 margin prop 으로 지정해 구분선과 여백을 한 곳에서 관리합니다.",
            "서브 섹션처럼 위계가 약한 구분에는 opacity 를 낮춰 시각적 무게를 줄입니다.",
          ]}
          donts={[
            "style prop 으로 borderTop·borderLeft 를 직접 덮어쓰지 않고 size·color prop 으로 두께와 색을 조절합니다.",
            "direction='vertical' 을 flex 가 아닌 컨테이너에 넣어 높이가 0 으로 접히게 두지 않습니다.",
            "단순 여백이 필요한 곳에 구분선을 넣지 않고, 의미 있는 콘텐츠 경계에만 사용합니다.",
            "color 에 대비가 낮은 임의 색을 넣어 배경과 구분되지 않는 선을 만들지 않습니다.",
          ]}
          a11y={[
            "루트 hr 에 role='separator' 가 지정되어 보조기술이 구분선으로 인식하므로 별도 마크업이 필요 없습니다.",
            "direction='vertical' 일 때는 aria-orientation='vertical' 을 함께 전달해 세로 방향임을 정확히 전달합니다.",
            "선 색은 배경과 최소 3:1 의 비텍스트 대비를 확보해 저시력 사용자도 경계를 인지할 수 있게 합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
