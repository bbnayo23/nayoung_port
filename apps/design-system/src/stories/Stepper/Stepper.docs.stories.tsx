import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Stepper.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Stepper',
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
        title="Stepper"
        subtitle="다단계 작업의 진행 상태를 시각화하는 컴포넌트"
        importCode={`import Stepper from '@port/design-system'`}
      />

      <DocSection
        title="Overview"
        description={
          <>
            다단계 작업의 진행 상태를 시각화하는 컴포넌트입니다. 수평·수직 방향을 지원하며 <Code>Stepper.Step</Code> ·{' '}
            <Code>Stepper.Connector</Code> · <Code>Stepper.Content</Code> · <Code>Stepper.Controls</Code> 의 compound 패턴으로
            구성합니다.
          </>
        }
      />

      <DocSection
        title="API — Stepper"
        description={<>스텝퍼 루트 컴포넌트의 props.</>}
      >
        <ApiTable
          rows={[
            { name: 'position', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, desc: '스텝 배치 방향' },
            { name: 'showNumbers', type: 'boolean', default: 'true', desc: '스텝 아이콘에 번호 표시 여부' },
            { name: 'children', type: 'ReactNode', desc: 'Stepper.Step, Stepper.Connector 등을 children으로 전달합니다.' },
          ]}
        />
      </DocSection>

      <DocSection title="API — Stepper.Step">
        <ApiTable
          rows={[
            { name: 'id', type: 'string | number', desc: '스텝 식별자' },
            { name: 'title', type: 'string', desc: '스텝 제목' },
            { name: 'description', type: 'string', desc: '스텝 부가 설명 (선택)' },
            { name: 'stepNumber', type: 'number', desc: '표시할 순서 번호 (0-based)' },
            { name: 'isActive', type: 'boolean', desc: '현재 활성 스텝' },
            { name: 'isCompleted', type: 'boolean', desc: '완료된 스텝 — 체크 아이콘 표시' },
            { name: 'isError', type: 'boolean', desc: '오류 상태 — X 아이콘 표시' },
            { name: 'isDisabled', type: 'boolean', desc: '비활성화 상태' },
            { name: 'isOptional', type: 'boolean', desc: '(Optional) 표시' },
            { name: 'isClickable', type: 'boolean', desc: '클릭 가능 여부' },
            { name: 'onClick', type: '() => void', desc: '스텝 클릭 핸들러' },
          ]}
        />
      </DocSection>

      <DocSection title="API — Stepper.Connector">
        <ApiTable
          rows={[{ name: 'isCompleted', type: 'boolean', desc: '완료된 구간 — 강조 선 표시' }]}
        />
      </DocSection>

      <DocSection title="API — Stepper.Controls">
        <ApiTable
          rows={[
            { name: 'onPrevious / onNext / onComplete', type: '() => void', desc: '이전·다음·완료 버튼 핸들러' },
            {
              name: 'previousButtonText / nextButtonText / completeButtonText',
              type: 'string',
              default: `'Previous' / 'Next' / 'Complete'`,
              desc: '버튼 레이블',
            },
            { name: 'showPrevious / showNext / showComplete', type: 'boolean', default: 'true', desc: '버튼 표시 여부' },
            {
              name: 'isPreviousDisabled / isNextDisabled / isCompleteDisabled',
              type: 'boolean',
              desc: '버튼 비활성화 여부',
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="수평 방향 (기본)"
        description="이전 · 다음 · 완료 버튼으로 스텝을 직접 탐색합니다. 완료된 스텝을 클릭하면 되돌아갈 수 있습니다."
      >
        <Example>{renderExample(S.Interactive)}</Example>
      </DocSection>

      <DocSection title="수직 방향">
        <Example>{renderExample(S.Vertical)}</Example>
      </DocSection>

      <DocSection
        title="스텝 상태"
        description="completed · active · error · disabled · optional 다섯 가지 상태를 비교합니다."
      >
        <Example>{renderExample(S.StepStates)}</Example>
      </DocSection>

      <DocSection title="showNumbers=false" description="번호 대신 완료 시 체크 아이콘만 표시합니다.">
        <Example>{renderExample(S.WithoutNumbers)}</Example>
      </DocSection>

      <DocSection title="Playground" description="position · showNumbers 조합의 기본 예시입니다.">
        <Example>{renderExample(S.Playground)}</Example>
      </DocSection>
    </DocPage>
  ),
}
