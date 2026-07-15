import type { Meta, StoryObj } from '@storybook/react-vite'
import Progress from '../../components/Progress'
import * as S from './Progress.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample, Guidelines } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Progress',
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
        title="Progress"
        subtitle="진행률을 시각화하는 컴파운드 바 컴포넌트"
        importCode={`import Progress from '@port/design-system'`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 360 }}>
          <Progress value={72} color="success" />
        </div>
      </DocHero>

      <DocSection
        title="API — Progress"
        description={
          <>
            진행률을 시각화하는 바 컴포넌트입니다. <Code>Progress</Code> 단독 사용과 <Code>Progress.Stack</Code> +{' '}
            <Code>Progress.Item</Code> 컴파운드 패턴으로 다중 구간을 표현할 수 있습니다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'value', type: 'number', required: true, desc: '0~100 사이의 진행 값' },
            {
              name: 'color',
              type: 'UIColorType',
              default: `'success'`,
              desc: (
                <>
                  색상 — <Code>'success'</Code> | <Code>'danger'</Code> | <Code>'warning'</Code> | <Code>'info'</Code>
                </>
              ),
            },
            { name: 'shape', type: `'linear' | 'linear-round'`, default: `'linear-round'`, desc: '바 형태 (모서리 처리)' },
            { name: 'shadow', type: 'boolean', default: 'true', desc: '배경 그림자(트랙) 표시 여부' },
            {
              name: 'transition',
              type: `boolean | { duration?, easing? }`,
              default: 'true',
              desc: '애니메이션 설정. false=없음 / true=기본(0.4s ease) / 객체=커스텀',
            },
            { name: 'onComplete', type: `() => void`, desc: 'value가 100이 되면 호출되는 콜백' },
            { name: 'className', type: 'string', desc: '루트 요소에 추가할 CSS 클래스' },
          ]}
        />
      </DocSection>

      <DocSection title="API — Progress.Stack" description="여러 구간을 하나의 바에 쌓기 위한 컨테이너.">
        <ApiTable
          rows={[
            { name: 'shape', type: `'linear' | 'linear-round'`, default: `'linear-round'`, desc: 'Stack 전체 형태' },
            { name: 'shadow', type: 'boolean', default: 'true', desc: '배경 트랙 표시 여부' },
            { name: 'children', type: 'ReactNode', required: true, desc: 'Progress.Item 목록' },
          ]}
        />
      </DocSection>

      <DocSection title="API — Progress.Item" description="Stack 내부의 개별 구간.">
        <ApiTable
          rows={[
            {
              name: 'value',
              type: 'number',
              required: true,
              desc: '이 구간의 너비 (0~100). 전체 합이 100 초과 시 넘치는 구간은 숨겨집니다.',
            },
            { name: 'color', type: 'UIColorType', default: `'success'`, desc: '이 구간의 색상' },
            {
              name: 'transition',
              type: `boolean | { duration?, easing? }`,
              default: 'true',
              desc: '구간 개별 애니메이션 설정',
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="색상"
        description="color prop으로 상태를 시각화합니다. 낮음=info, 경고=warning, 완료=success 패턴을 권장합니다."
      >
        <Example>{renderExample(S.Colors)}</Example>
      </DocSection>

      <DocSection
        title="형태"
        description={
          <>
            <Code>linear</Code> 와 <Code>linear-round</Code> 두 가지 모서리 처리를 제공합니다.
          </>
        }
      >
        <Example>{renderExample(S.Shapes)}</Example>
      </DocSection>

      <DocSection
        title="Stack — 다중 구간"
        description={
          <>
            <Code>Progress.Stack</Code> 안에 <Code>Progress.Item</Code> 을 배치합니다. 각 Item의 value 합이 100을 넘으면 초과분은
            표시되지 않습니다.
          </>
        }
      >
        <Example>{renderExample(S.Stack)}</Example>
      </DocSection>

      <DocSection
        title="Transition"
        description={
          <>
            <Code>transition</Code> 옵션으로 애니메이션을 제어합니다. false=없음 / true=기본(0.4s ease) / 객체=커스텀
            duration·easing.
          </>
        }
      >
        <Example>{renderExample(S.Transition)}</Example>
      </DocSection>

      <DocSection
        title="onComplete"
        description={
          <>
            value가 100이 되는 순간 <Code>onComplete</Code> 가 호출됩니다. 슬라이더를 100으로 드래그해 보세요.
          </>
        }
      >
        <Example>{renderExample(S.Interactive)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="진행률을 정확하고 접근성 있게 전달하기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "value 는 0~100 범위의 숫자로 전달합니다 — 범위를 벗어나면 해당 구간이 렌더링되지 않아 바가 비어 보입니다.",
            "여러 항목의 비율을 한 줄에 나눠 표현할 때는 Progress 를 여러 개 겹치지 말고 Progress.Stack 과 Progress.Item 조합을 사용합니다.",
            "color(success·danger·warning·info) 로 상태를 구분할 때는 수치나 라벨 텍스트를 함께 제공해 색상 없이도 의미가 전달되게 합니다.",
            "value 가 100 에 도달한 뒤의 후속 동작은 직접 폴링하지 말고 onComplete 콜백으로 연결합니다.",
          ]}
          donts={[
            "완료율을 알 수 없는 불확정 대기 상태에 임의 value 를 넣어 Progress 로 대체하지 않고 Spinner 를 사용합니다.",
            "Progress.Stack 안 Item 들의 value 합을 100 초과로 두어 뒤쪽 구간이 잘려 사라지게 하지 않습니다.",
            "값이 자주 갱신되는 화면에서 transition duration 을 길게 잡아 바가 실제 값보다 늦게 따라오게 하지 않습니다.",
            "상태를 color 만으로 표현하고 텍스트 대체 정보를 생략하지 않습니다.",
          ]}
          a11y={[
            "루트 div 에는 기본 role 이 없으므로 role='progressbar' 와 aria-valuenow·aria-valuemin·aria-valuemax 를 전달합니다. 나머지 속성은 rest 로 루트에 그대로 전달됩니다.",
            "무엇의 진행률인지 aria-label 또는 aria-labelledby 로 명확히 연결합니다.",
            "모션에 민감한 사용자를 위해 prefers-reduced-motion 환경에서는 transition={false} 로 애니메이션을 제거합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
