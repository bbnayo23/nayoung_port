import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './DateTimePicker.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

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
    </DocPage>
  ),
}
