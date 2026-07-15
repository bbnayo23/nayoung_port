import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dropdown } from '@dc/components/Dropdown'
import * as S from './Dropdown.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '@dc/stories/_docs/DocKit'

/**
 * Dropdown.docs.stories.tsx — MDX 를 대체하는 "문서 스토리".
 * DocKit 으로 문서 페이지를 조립하고, 예제는 Dropdown.stories 의 스토리를
 * renderExample 로 그대로 재사용해 문서와 예제가 항상 동기화되도록 한다.
 */
const meta = {
  title: 'StyleGuide/Dropdown',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Docs: Story = {
  name: '📖 Docs',
  render: () => (
    <DocPage>
      <DocHero
        eyebrow="StyleGuide · Component"
        title="Dropdown"
        subtitle="단일/다중 선택 드롭다운 컴포넌트"
        importCode={`import { Dropdown } from '@port/design-system'
import type { DropdownOption } from '@port/design-system'`}
      >
        <Dropdown
          options={[
            { value: 'info', label: 'INFO' },
            { value: 'warn', label: 'WARN' },
            { value: 'error', label: 'ERROR' },
          ]}
          placeholder="선택하세요"
        />
      </DocHero>

      <DocSection
        title="API — Dropdown (공통)"
        description={
          <>
            단일/다중 선택 드롭다운 컴포넌트입니다. <Code>multiSelect</Code> prop으로 모드를 전환하며, 다중 선택 시{' '}
            <Code>multiDisplayMode</Code>로 count·values·tags·tags-closable 표시 방식을 선택합니다.
          </>
        }
      >
        <ApiTable
          rows={[
            { name: 'options', type: 'DropdownOption[]', required: true, desc: '선택 옵션 목록' },
            { name: 'placeholder', type: 'string', default: `'선택'`, desc: '미선택 상태 텍스트' },
            { name: 'label', type: 'string', desc: '트리거 앞에 통합 표시되는 라벨' },
            { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, desc: '드롭다운 크기' },
            { name: 'disabled', type: 'boolean', default: 'false', desc: '비활성 상태' },
            { name: 'width', type: 'number | string', desc: `드롭다운 너비 직접 지정 (예: 200, '100%')` },
            { name: 'forceOpen', type: 'boolean', default: 'false', desc: '메뉴를 강제로 열어둠 (Style Guide 전용)' },
          ]}
        />
      </DocSection>

      <DocSection title="API — Single Select (기본)">
        <ApiTable
          rows={[
            { name: 'multiSelect', type: 'false', default: 'false', desc: '단일 선택 모드 (기본값)' },
            { name: 'value', type: 'string', desc: '제어 모드 선택값' },
            { name: 'defaultValue', type: 'string', desc: '비제어 모드 초기값' },
            { name: 'onChange', type: '(value: string, option: DropdownOption) => void', desc: '값 변경 콜백' },
          ]}
        />
      </DocSection>

      <DocSection title="API — Multi Select">
        <ApiTable
          rows={[
            { name: 'multiSelect', type: 'true', required: true, desc: '다중 선택 모드 활성화' },
            {
              name: 'multiDisplayMode',
              type: `'count' | 'values' | 'tags' | 'tags-closable'`,
              default: `'count'`,
              desc: '트리거 표시 방식',
            },
            { name: 'value', type: 'string[]', desc: '제어 모드 선택값 배열' },
            { name: 'defaultValue', type: 'string[]', desc: '비제어 모드 초기값 배열' },
            { name: 'onChange', type: '(values: string[], options: DropdownOption[]) => void', desc: '값 변경 콜백' },
          ]}
        />
      </DocSection>

      <DocSection title="API — DropdownOption">
        <ApiTable
          rows={[
            { name: 'value', type: 'string', required: true, desc: '옵션 값' },
            { name: 'label', type: 'string', required: true, desc: '옵션 표시 텍스트' },
            { name: 'disabled', type: 'boolean', desc: '개별 옵션 비활성화' },
            {
              name: 'variant',
              type: 'string',
              desc: `태그 모드에서 Badge 색상 (예: 'red', 'green', 'yellow', 'orange', 'purple')`,
            },
          ]}
        />
      </DocSection>

      <DocSection title="Size" description="sm · md · lg 세 가지 크기를 비교합니다.">
        <Example>{renderExample(S.Sizes)}</Example>
      </DocSection>

      <DocSection title="State" description="기본 / 선택됨 / 비활성 / forceOpen 상태입니다.">
        <Example>{renderExample(S.States)}</Example>
      </DocSection>

      <DocSection title="With Label" description="label이 드롭다운 박스 안에 통합된 형태입니다.">
        <Example>{renderExample(S.WithLabel)}</Example>
      </DocSection>

      <DocSection title="With Disabled Options" description="일부 옵션이 비활성인 경우입니다.">
        <Example>{renderExample(S.WithDisabledOptions)}</Example>
      </DocSection>

      <DocSection
        title="Multi Select — count / values"
        description={
          <>
            <Code>multiSelect=true</Code>로 다중 선택을 활성화합니다. 기본 표시는 'N개 선택'(count)이며,{' '}
            <Code>multiDisplayMode="values"</Code>로 선택값 말줄임 표시를 사용합니다.
          </>
        }
      >
        <Example>{renderExample(S.MultiSelect)}</Example>
      </DocSection>

      <DocSection
        title="Multi Select — tags"
        description={
          <>
            <Code>multiDisplayMode="tags"</Code> 또는 <Code>"tags-closable"</Code>로 선택값을 Badge 태그로 표시합니다.
          </>
        }
      >
        <Example>{renderExample(S.MultiSelectTags)}</Example>
      </DocSection>

      <DocSection
        title="Multi Select — colored tags"
        description={
          <>
            옵션별 <Code>variant</Code>(색상)가 적용된 Badge 태그 모드입니다.
          </>
        }
      >
        <Example>{renderExample(S.MultiSelectColoredTags)}</Example>
      </DocSection>

      <DocSection
        title="With Select All"
        description={
          <>
            <Code>hideSelectAll={`{false}`}</Code>로 메뉴 상단에 전체선택 행이 표시됩니다.
          </>
        }
      >
        <Example>{renderExample(S.WithSelectAll)}</Example>
      </DocSection>

      <DocSection
        title="Searchable"
        description={
          <>
            <Code>searchable=true</Code>로 드롭다운 패널 안에 텍스트 필터 입력창이 표시됩니다.
          </>
        }
      >
        <Example>{renderExample(S.Searchable)}</Example>
      </DocSection>

      <DocSection
        title="With Divider Options"
        description={
          <>
            <Code>isDivider=true</Code> 항목이 옵션 그룹 사이에 구분선으로 렌더링됩니다.
          </>
        }
      >
        <Example>{renderExample(S.WithDividerOptions)}</Example>
      </DocSection>

      <DocSection
        title="With Reset Button"
        description={
          <>
            <Code>onReset</Code> 제공 시 선택 항목이 있을 때 "초기화" 버튼이 표시됩니다.
          </>
        }
      >
        <Example>{renderExample(S.WithResetButton)}</Example>
      </DocSection>

      <DocSection
        title="With Render Panel"
        description={
          <>
            <Code>renderPanel</Code>로 드롭다운 안에 완전히 커스텀한 콘텐츠를 렌더링합니다.
          </>
        }
      >
        <Example>{renderExample(S.WithRenderPanel)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="선택 모드와 표시 방식, 접근성을 고려한 Dropdown 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "옵션이 많아 스크롤이 길어지면 searchable=true 로 필터 입력을 켜 원하는 항목을 빠르게 찾게 합니다.",
            "다중 선택에서 선택 개수가 유동적이면 multiDisplayMode='count' 로 트리거 폭을 일정하게 유지합니다.",
            "선택 항목을 한눈에 확인하고 개별 제거해야 하면 multiDisplayMode='tags-closable' 로 태그와 닫기 버튼을 노출합니다.",
            "옵션 수가 많은 다중 선택에는 hideSelectAll={false} 와 onReset 을 함께 제공해 전체선택·초기화를 지원합니다.",
            "옵션을 논리적 그룹으로 나눌 때 isDivider=true 항목을 넣어 구분선으로 탐색을 돕습니다.",
          ]}
          donts={[
            "서로 배타적인 선택지 두세 개뿐이고 항상 노출해도 되는 경우까지 Dropdown 으로 감추지 않고 Radio 를 사용합니다.",
            "선택 불가 옵션을 목록에서 숨기는 용도로 disabled 를 쓰지 않습니다(완전 제외는 options 에서 제거합니다).",
            "variant 색상을 의미 없이 옵션마다 다르게 지정해 태그 색상이 상태를 뜻하는 것처럼 오해를 주지 않습니다.",
            "선택된 태그가 많아 트리거가 과도하게 커지는 화면에서는 tags 대신 count 모드로 폭을 억제합니다.",
          ]}
          a11y={[
            "label prop 은 시각적 라벨만 렌더링하고 트리거와 htmlFor·id 로 연결되지 않으므로, 필요하면 aria-label 로 이름을 보완합니다.",
            "react-select 기반이라 combobox role 과 방향키 이동·Enter 선택·Esc 닫기 등 키보드 조작이 기본 지원되니 별도 키 핸들러를 덧붙이지 않습니다.",
            "tags-closable 의 닫기 동작이나 forceOpen 같은 상태는 색상만으로 구분하지 말고 텍스트·아이콘으로 의미를 함께 전달합니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
