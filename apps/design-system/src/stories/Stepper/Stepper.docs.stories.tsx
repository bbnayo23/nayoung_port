import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Stepper.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample, Guidelines } from '../_docs/DocKit'

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

      <DocSection title="사용 지침" description="다단계 흐름의 진행 상태를 정확히 전달하기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "현재 진행 중인 스텝에만 isActive 를 부여하고, 지나온 스텝은 isCompleted 로 표시해 진행 위치를 명확히 합니다.",
            "스텝 간 이동은 Stepper.Controls 의 onPrevious·onNext·onComplete 로 처리하고, 마지막 스텝에서는 showNext={false} 로 두고 showComplete 로 완료 버튼을 노출합니다.",
            "인접한 두 스텝 사이에 Stepper.Connector 를 두고, 이미 지나온 구간은 isCompleted 로 연결선을 강조합니다.",
            "건너뛸 수 있는 스텝에는 isOptional 을 지정해 (Optional) 표시로 필수/선택을 구분합니다.",
            "stepNumber 는 0-based 로 순서대로 부여합니다 — 화면에는 stepNumber + 1 로 렌더되므로 실제 순서와 일치시킵니다.",
          ]}
          donts={[
            "isActive 를 여러 스텝에 동시에 부여해 현재 위치를 모호하게 만들지 않습니다.",
            "같은 스텝에 isCompleted 와 isError 를 함께 지정하지 않습니다 — 아이콘이 체크로 우선 표시되어 오류가 가려집니다.",
            "검증에 실패한 스텝을 isDisabled 로 감추지 말고 isError 로 표시해 문제 위치를 드러냅니다.",
            "Stepper.Step·Stepper.Connector 를 Stepper 바깥에서 사용하지 않습니다 — 컨텍스트가 없으면 오류가 발생합니다.",
          ]}
          a11y={[
            "완료·오류 상태는 체크·X 아이콘과 색상으로만 구분되므로, title·description 에 상태를 알 수 있는 텍스트를 함께 제공해 색상에만 의존하지 않습니다.",
            "Stepper.Step 은 onClick 을 받은 div 라 isClickable 이어도 Enter·Space 활성화가 보장되지 않으므로, 키보드 탐색은 실제 button 으로 렌더되는 Stepper.Controls 버튼을 주 이동 수단으로 제공합니다.",
            "isClickable 을 주지 않은 스텝은 tabIndex 가 -1 이라 키보드 포커스를 받지 않으므로, 진행 상황은 활성·완료 스텝의 텍스트로도 전달합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
