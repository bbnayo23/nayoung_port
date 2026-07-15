import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Radio.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/Radio',
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
        title="Radio"
        subtitle="단일 선택을 위한 라디오 버튼 컴포넌트"
        importCode={`import Radio from '@port/design-system'`}
      >
        {renderExample(S.Variants)}
      </DocHero>

      <DocSection
        title="API"
        description={
          <>
            같은 <Code>name</Code>을 가진 Radio를 그룹으로 묶어 사용하며, <Code>checked</Code>·<Code>onChange</Code>로 완전
            제어(controlled) 방식으로 동작합니다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'value', type: 'string', required: true, desc: '이 라디오 버튼의 값' },
            { name: 'name', type: 'string', required: true, desc: '라디오 그룹 이름 — 같은 name끼리 단일 선택됩니다.' },
            { name: 'label', type: 'ReactNode', desc: '라벨 텍스트 또는 노드' },
            { name: 'checked', type: 'boolean', desc: '선택 상태 (controlled)' },
            { name: 'onChange', type: '(e: ChangeEvent<HTMLInputElement>) => void', desc: '변경 이벤트 핸들러' },
            { name: 'disabled', type: 'boolean', default: 'false', desc: '비활성화 상태' },
            { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, desc: '크기' },
            { name: 'variant', type: `'default' | 'primary'`, default: `'default'`, desc: '색상 variant' },
            { name: 'id', type: 'string', desc: '커스텀 ID. 미지정 시 name+value 조합으로 자동 생성.' },
          ]}
        />
      </DocSection>

      <DocSection
        title="라디오 그룹"
        description={
          <>
            같은 <Code>name</Code> prop을 공유하는 Radio 목록으로 그룹을 구성합니다. 부모 컴포넌트에서 선택 상태를
            관리하세요.
          </>
        }
      >
        <Example>{renderExample(S.RadioGroup)}</Example>
      </DocSection>

      <DocSection
        title="크기"
        description={
          <>
            <Code>size</Code> prop으로 sm · md · lg를 선택합니다.
          </>
        }
      >
        <Example>{renderExample(S.Sizes)}</Example>
      </DocSection>

      <DocSection
        title="Variant"
        description={
          <>
            <Code>variant='primary'</Code>는 브랜드 색상을 적용합니다.
          </>
        }
      >
        <Example>{renderExample(S.Variants)}</Example>
      </DocSection>

      <DocSection title="상태" description="기본 · 선택 · 비활성화 상태 비교입니다.">
        <Example>{renderExample(S.States)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="단일 선택 그룹을 명확하고 접근 가능하게 구성하기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "여러 선택지 중 하나만 고르는 경우에 사용하고, 같은 name 값을 공유해 하나의 그룹으로 묶습니다.",
            "checked 와 onChange 로 완전 제어(controlled)하고 선택 상태는 부모 컴포넌트에서 관리합니다.",
            "각 Radio 에는 label 을 제공해 클릭 가능한 영역과 의미를 명확히 합니다.",
            "한 그룹 안의 Radio 는 size 와 variant 를 통일해 위계를 흐트러뜨리지 않습니다.",
          ]}
          donts={[
            "여러 개를 동시에 선택해야 하는 경우에는 Radio 대신 Checkbox 를 사용합니다.",
            "선택지가 두 개뿐이고 상호 배타적인 on/off 라면 Radio 보다 Switch 나 Checkbox 를 고려합니다.",
            "checked 만 지정하고 onChange 를 넘기지 않아 선택이 바뀌지 않는 읽기 전용 상태로 방치하지 않습니다.",
            "같은 그룹인데 서로 다른 name 을 주어 여러 항목이 동시에 선택되게 만들지 않습니다.",
          ]}
          a11y={[
            "label 을 htmlFor 로 input 과 연결하고 id 는 name+value 로 자동 생성하므로, 커스텀 id 를 줄 때도 고유성을 유지합니다.",
            "네이티브 input type='radio' 라서 같은 name 그룹 내 방향키 이동과 Space 선택이 기본 지원됩니다.",
            "disabled 항목은 포커스와 조작이 불가하므로, 필수 선택지를 임의로 비활성화하지 않습니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
