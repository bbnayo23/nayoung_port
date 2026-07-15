import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchBar } from '../../components/SearchBar'
import * as S from './SearchBar.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, renderExample } from '../_docs/DocKit'

const meta = {
  title: 'StyleGuide/SearchBar',
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
        title="SearchBar"
        subtitle="검색어 입력과 검색 실행을 담당하는 검색 입력 컴포넌트"
        importCode={`import { SearchBar } from '@port/design-system'`}
      >
        <div style={{ maxWidth: 480 }}>
          <SearchBar defaultValue="" placeholder="검색어를 입력하세요" />
        </div>
      </DocHero>

      <DocSection
        title="개요"
        description={
          <>
            검색 입력 컴포넌트입니다. 제어(controlled) · 비제어(uncontrolled) 모드를 모두 지원하며,{' '}
            <Code>prefix</Code> · <Code>leftActions</Code> · <Code>suffixActions</Code> · <Code>rightActions</Code> 등
            다양한 슬롯으로 확장 가능합니다. <Code>expandable</Code> 모드에서는 textarea로 전환됩니다.
          </>
        }
      />

      <DocSection title="API" description="SearchBar의 주요 props.">
        <ApiTable
          rows={[
            { name: 'value', type: `string`, desc: '제어 모드 값. 미지정 시 uncontrolled.' },
            { name: 'defaultValue', type: `string`, default: `''`, desc: '비제어 모드 초기값' },
            { name: 'onChange', type: `(value: string) => void`, desc: '입력 변경 콜백 — 문자열 값을 직접 전달합니다.' },
            { name: 'onSearch', type: `(value: string) => void`, desc: '검색 실행 콜백 (검색 버튼 클릭 또는 Enter)' },
            { name: 'onClear', type: `() => void`, desc: 'X 버튼 클릭 시 콜백' },
            { name: 'placeholder', type: `string`, default: `'검색어를 입력하세요'`, desc: '입력 필드 플레이스홀더' },
            { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, desc: '크기 variant' },
            { name: 'disabled', type: `boolean`, default: `false`, desc: '전체 비활성화' },
            { name: 'hideButton', type: `boolean`, default: `false`, desc: '검색 버튼 숨김 여부' },
            { name: 'searchLabel', type: `string`, desc: '검색 버튼 aria-label 및 아이콘 옆 표시 텍스트' },
            { name: 'expandable', type: `boolean`, default: `false`, desc: '확장 버튼 표시. 클릭 시 textarea 모드로 전환.' },
            { name: 'expanded', type: `boolean`, desc: '확장 상태 제어 (controlled). 미지정 시 내부 상태 사용.' },
            { name: 'onExpandChange', type: `(expanded: boolean) => void`, desc: '확장 상태 변경 콜백' },
            { name: 'prefix', type: `ReactNode`, desc: '입력 앞 슬롯 (예: AI 배지)' },
            { name: 'onPrefixClick', type: `() => void`, desc: 'prefix 클릭 콜백. 지정 시 prefix가 button으로 렌더.' },
            { name: 'leftOuterActions', type: `ReactNode`, desc: 'SearchBar 외부 왼쪽 슬롯 (예: + 추가 버튼)' },
            { name: 'leftActions', type: `ReactNode`, desc: '입력 내부 왼쪽 슬롯 (예: 검색 태그)' },
            { name: 'suffixActions', type: `ReactNode`, desc: '검색 버튼 앞 슬롯 (예: 정렬/필터 아이콘)' },
            { name: 'rightActions', type: `ReactNode`, desc: 'SearchBar 외부 오른쪽 슬롯 (예: 일시정지 버튼)' },
          ]}
        />
      </DocSection>

      <DocSection
        title="기본 검색"
        description="value · onChange · onSearch 조합으로 동작합니다. Enter 키 또는 검색 버튼 클릭 시 onSearch가 호출됩니다."
      >
        <Example>{renderExample(S.Playground)}</Example>
      </DocSection>

      <DocSection
        title="확장 모드 (Expandable)"
        description={
          <>
            <Code>expandable</Code> prop을 추가하면 확장 버튼이 나타납니다. 클릭 시 textarea로 전환되어 복잡한 쿼리를
            입력할 수 있습니다.
          </>
        }
      >
        <Example>{renderExample(S.Expandable)}</Example>
      </DocSection>

      <DocSection
        title="슬롯 조합"
        description={
          <>
            <Code>prefix</Code> · <Code>leftOuterActions</Code> · <Code>searchLabel</Code> 등의 슬롯을 조합해 풍부한 검색
            UI를 구성합니다.
          </>
        }
      >
        <Example>{renderExample(S.WithSlots)}</Example>
      </DocSection>

      <DocSection
        title="크기 비교"
        description={
          <>
            <Code>sm</Code> · <Code>md</Code> · <Code>lg</Code> 세 가지 크기를 지원합니다.
          </>
        }
      >
        <Example>{renderExample(S.Sizes)}</Example>
      </DocSection>

      <DocSection
        title="비활성화"
        description={
          <>
            <Code>disabled</Code> 를 지정하면 입력과 버튼이 모두 비활성화됩니다.
          </>
        }
      >
        <Example>{renderExample(S.Disabled)}</Example>
      </DocSection>
    </DocPage>
  ),
}
