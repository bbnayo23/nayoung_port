import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './Radio.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

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
    </DocPage>
  ),
}
