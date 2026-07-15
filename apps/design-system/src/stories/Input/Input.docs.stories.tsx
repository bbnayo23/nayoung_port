import type { Meta, StoryObj } from '@storybook/react-vite'
import Input from '../../components/Input'
import * as S from './Input.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Input',
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
        title="Input"
        subtitle="텍스트 입력 컴포넌트"
        importCode={`import Input from '@port/design-system'`}
      >
        <div style={{ maxWidth: 320 }}>
          <Input placeholder="텍스트를 입력하세요" helperText="도움말 텍스트입니다" />
        </div>
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            입력 컴포넌트의 주요 props. 이 외 표준 <Code>InputHTMLAttributes</Code> 속성(<Code>value</Code>,{' '}
            <Code>onChange</Code>, <Code>type</Code>, <Code>readOnly</Code>, <Code>maxLength</Code> 등)을 모두 전달할 수
            있습니다. 단, HTML <Code>size</Code> 속성은 컴포넌트의 <Code>size</Code> prop이 우선합니다.
          </>
        }
      >
        <ApiTable
          rows={[
            {
              name: 'variant',
              type: `'default' | 'ghost' | 'error' | 'success' | 'warning'`,
              default: `'default'`,
              desc: '시각적 상태 변형 — 테두리 색상과 helperText 색상에 반영됨',
            },
            { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, desc: '입력 필드 높이 및 폰트 크기' },
            { name: 'fullWidth', type: 'boolean', default: 'true', desc: '컨테이너 너비 100% 사용. false이면 내용에 맞춤' },
            { name: 'prefixIcon', type: 'ReactNode', desc: '입력 왼쪽에 표시할 요소 (아이콘, 텍스트 등)' },
            { name: 'suffixIcon', type: 'ReactNode', desc: '입력 오른쪽에 표시할 요소. 지정 시 showClearButton 무시' },
            {
              name: 'showClearButton',
              type: 'boolean',
              default: 'false',
              desc: '클리어(×) 버튼 표시 여부. suffixIcon이 있으면 무시됨',
            },
            { name: 'onClear', type: '() => void', desc: '클리어 버튼 클릭 콜백. showClearButton이 true일 때 필수' },
            { name: 'helperText', type: 'string', desc: '입력 하단 도움말/오류 텍스트. variant 색상으로 표시됨' },
            { name: 'disabled', type: 'boolean', default: 'false', desc: '비활성화 상태' },
            { name: 'placeholder', type: 'string', desc: '플레이스홀더 텍스트' },
          ]}
        />
      </DocSection>

      <DocSection title="Variant" description="5가지 variant와 helperText 색상 변화를 확인합니다.">
        <Example>{renderExample(S.Variants)}</Example>
      </DocSection>

      <DocSection title="Size" description="sm · md · lg 세 가지 크기를 비교합니다.">
        <Example>{renderExample(S.Sizes)}</Example>
      </DocSection>

      <DocSection title="접두 아이콘 (prefixIcon)" description="prefixIcon으로 입력 필드 좌측에 아이콘을 배치합니다.">
        <Example>{renderExample(S.WithPrefixIcon)}</Example>
      </DocSection>

      <DocSection
        title="접미 아이콘 (suffixIcon)"
        description="suffixIcon으로 입력 필드 우측에 아이콘을 배치합니다. suffixIcon은 showClearButton보다 우선합니다."
      >
        <Example>{renderExample(S.WithSuffixIcon)}</Example>
      </DocSection>

      <DocSection title="클리어 버튼" description="값을 입력하면 X(리셋) 버튼이 나타나고, 클릭하면 초기화됩니다.">
        <Example>{renderExample(S.WithClearButton)}</Example>
      </DocSection>

      <DocSection title="도움말 텍스트 (helperText)" description="helperText는 variant에 따라 색상이 변경됩니다.">
        <Example>{renderExample(S.HelperText)}</Example>
      </DocSection>

      <DocSection title="상태" description="disabled · readOnly · fullWidth 상태를 확인합니다.">
        <Example>{renderExample(S.States)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="입력 상태 표현과 접근성을 지키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "오류를 표시할 때는 variant 를 error 로 두고 helperText 에 원인을 함께 적어 색상과 메시지를 일치시킵니다.",
            "값을 지우는 UI 가 필요하면 showClearButton 과 onClear 를 함께 지정해 클리어 동작을 실제 상태에 연결합니다.",
            "검색·금액·단위처럼 입력 맥락이 있는 필드에는 prefixIcon·suffixIcon 으로 의미를 시각적으로 보조합니다.",
            "폼에서는 fullWidth 기본값(true)을 유지하고, 컨테이너에 맞춰 좁혀야 하는 인라인 입력에만 false 로 지정합니다.",
            "size 는 함께 놓이는 버튼 등 주변 컨트롤의 높이에 맞춰 sm·md·lg 중 하나로 통일합니다.",
          ]}
          donts={[
            "showClearButton 을 true 로 두고 onClear 를 연결하지 않아, 버튼을 눌러도 값이 지워지지 않는 상태를 만들지 않습니다.",
            "suffixIcon 과 클리어 버튼을 동시에 기대하지 않습니다 — suffixIcon 이 있으면 showClearButton 은 무시됩니다.",
            "오류를 variant 색상만으로 표현하고 helperText 없이 원인 설명을 생략하지 않습니다.",
            "라벨을 두지 않고 placeholder 로 필드의 의미를 대신하지 않습니다 — 값 입력 시 사라져 맥락이 없어집니다.",
            "HTML size 속성으로 너비를 조절하려 하지 않습니다 — 컴포넌트의 size prop 이 우선해 무시됩니다.",
          ]}
          a11y={[
            "컴포넌트에 label 이 내장되어 있지 않으므로, 외부 label 에 htmlFor 와 input 의 id 를 연결하거나 aria-label 을 전달해 접근 가능한 이름을 부여합니다.",
            "variant='error' 는 테두리·텍스트 색상만 바꾸므로, 오류 상태는 aria-invalid 를 함께 전달해 스크린 리더에도 알립니다.",
            "클리어 버튼은 tabIndex=-1 이라 키보드 포커스를 받지 않으므로, 키보드 사용자가 입력에서 직접 값을 선택·삭제할 수 있는지 확인합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
