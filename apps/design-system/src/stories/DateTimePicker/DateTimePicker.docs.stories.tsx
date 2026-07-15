import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './DateTimePicker.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '@dc/stories/_docs/DocKit'

const meta = {
  title: 'StyleGuide/DateTimePicker',
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
        title="DateTimePicker"
        subtitle="날짜·시간 범위를 선택하는 피커 컴포넌트"
        importCode={`import { DateTimePicker } from '@port/design-system'
import type { DateTimePreset, DateTimeRange } from '@port/design-system'`}
      >
        {renderExample(S.WithLabel)}
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            날짜·시간 범위를 선택하는 피커 컴포넌트의 주요 props. 프리셋 목록과 캘린더 직접 선택, 텍스트 직접 입력을 모두 지원한다.
            <Code>preset</Code> prop으로 제어 모드를, <Code>defaultPreset</Code>으로 비제어 초기값을 설정한다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'label', type: `string`, desc: '트리거 왼쪽에 표시되는 라벨' },
            { name: 'preset', type: `DateTimePreset`, desc: '제어 모드 프리셋 값' },
            { name: 'defaultPreset', type: `DateTimePreset`, default: `'today'`, desc: '비제어 모드 초기 프리셋' },
            {
              name: 'onChange',
              type: `(range: DateTimeRange, preset: DateTimePreset) => void`,
              desc: '날짜 범위 변경 콜백',
            },
            { name: 'presets', type: `PresetItem[]`, default: '기본 10개', desc: '프리셋 목록 커스터마이즈' },
            { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'sm'`, desc: '트리거 크기' },
            { name: 'disabled', type: `boolean`, default: `false`, desc: '비활성 상태' },
            { name: 'className', type: `string`, desc: '루트 요소에 추가할 CSS 클래스' },
          ]}
        />
      </DocSection>

      <DocSection title="Types" description="관련 타입 정의.">
        <Example>
          <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
            {`type DateTimePreset =
  | 'today' | 'yesterday'
  | 'last30m' | 'last1h' | 'last6h' | 'last12h'
  | 'last1d' | 'last7d' | 'last30d'
  | 'custom'

interface DateTimeRange {
  start: Date
  end: Date
}

interface PresetItem {
  value: DateTimePreset
  label: string
}`}
          </pre>
        </Example>
      </DocSection>

      <DocSection title="기본 사용법" description="label이 트리거 왼쪽에 통합된 형태입니다.">
        <Example>{renderExample(S.WithLabel)}</Example>
      </DocSection>

      <DocSection title="Size" description="sm · md · lg 세 가지 크기를 비교합니다.">
        <Example>{renderExample(S.Sizes)}</Example>
      </DocSection>

      <DocSection
        title="기본 프리셋 목록"
        description={
          <>
            기본 제공 프리셋별 동작을 확인합니다. <Code>custom</Code>은 패널을 열어 달력으로 직접 날짜를 선택하거나 텍스트
            입력으로 범위를 지정할 수 있습니다.
          </>
        }
      >
        <Example>{renderExample(S.Presets)}</Example>
      </DocSection>

      <DocSection
        title="Custom Presets"
        description={
          <>
            <Code>presets</Code> prop으로 프리셋 목록을 원하는 항목만 표시하도록 커스터마이즈합니다.
          </>
        }
      >
        <Example>{renderExample(S.CustomPresets)}</Example>
      </DocSection>

      <DocSection
        title="제어 모드 (controlled)"
        description={
          <>
            <Code>preset</Code> + <Code>onChange</Code>로 외부 상태와 동기화합니다. <Code>onChange</Code>는{' '}
            <Code>DateTimeRange</Code>와 <Code>DateTimePreset</Code>을 함께 전달합니다.
          </>
        }
      >
        <Example>{renderExample(S.Controlled)}</Example>
      </DocSection>

      <DocSection title="비활성화" description="비활성 상태입니다.">
        <Example>{renderExample(S.Disabled)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="날짜·시간 범위 피커를 명확하고 접근 가능하게 쓰기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "자주 쓰는 조회 구간이 정해져 있으면 presets prop 으로 목록을 좁혀 사용자가 custom 없이 한 번에 선택하도록 합니다.",
            "제어 모드에서는 onChange 가 range 와 preset 을 함께 전달하므로 두 인자를 모두 외부 상태에 반영합니다.",
            "좁은 툴바에는 size='sm', 독립 필터 영역에는 md·lg 를 사용해 트리거 밀도를 조절합니다.",
            "label 에는 조회 대상 기간을 알 수 있는 문구를 지정해 어떤 데이터의 범위인지 명확히 합니다.",
            "직접 입력은 'YYYY-MM-DD HH:mm:ss' 형식을 따르며, 날짜만 입력하면 시작은 00:00:00·종료는 23:59:59로 자동 보정됨을 사용자에게 안내합니다.",
          ]}
          donts={[
            "트리거 텍스트에 이미 선택된 범위가 표시되므로 옆에 동일한 범위 텍스트를 중복 노출하지 않습니다.",
            "preset 으로 제어하면서 onChange 처리를 생략해 값이 고정되게 두지 않습니다.",
            "임의 구간 입력이 필요한 화면에서 presets 에 custom 을 제외한 채로 사용하지 않습니다.",
            "종료가 시작보다 앞선 값을 강제로 넣으려 하지 않습니다. 컴포넌트가 두 날짜를 같은 날로 자동 보정합니다.",
            "단일 시점만 필요한 경우 범위 피커인 이 컴포넌트 대신 단일 날짜 입력을 사용합니다.",
          ]}
          a11y={[
            "트리거는 표준 button 요소라 Tab 포커스와 Enter·Space 로 패널 열기가 기본 지원됩니다.",
            "패널의 프리셋 항목은 li 클릭 기반이라 키보드 포커스를 받지 않으므로, 키보드 사용자를 위해 직접 입력 input 으로도 범위를 지정할 수 있음을 함께 안내합니다.",
            "시각적 label 이 트리거 button 과 for·id 로 연결되어 있지 않고 시작·종료 input 에도 라벨이 없으므로, 스크린리더 사용자를 위해 트리거와 두 입력에 aria-label 을 별도로 부여합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
