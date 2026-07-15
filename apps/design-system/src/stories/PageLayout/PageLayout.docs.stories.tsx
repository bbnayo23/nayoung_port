import type { Meta, StoryObj } from '@storybook/react-vite'
import * as S from './PageLayout.stories'
import { DocPage, DocHero, DocSection, Example, ApiTable, Code, Guidelines, renderExample } from '@dc/stories/_docs/DocKit'

const meta = {
  title: 'StyleGuide/PageLayout',
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
        title="PageLayout"
        subtitle="페이지 공통 레이아웃 컴포넌트 모음"
        importCode={`import {
  PageContent, PageHeaderRow, SectionCard, GridContainer,
  PaginationBar, SectionToolbar, ToolbarLeft, ToolbarCenter,
  ToolbarRight, TotalCount, IconButton, GhostIconButton,
} from '@port/design-system'`}
      />

      <DocSection
        title="개요"
        description={
          <>
            페이지 공통 레이아웃 컴포넌트 모음입니다. <Code>PageContent</Code> → <Code>SectionCard</Code> →{' '}
            <Code>SectionToolbar</Code> → <Code>GridContainer</Code> → <Code>PaginationBar</Code>의 계층 구조로
            조합하여 일관된 페이지 레이아웃을 구성합니다.
          </>
        }
      />

      <DocSection title="API — 컴포넌트 목록" description="레이아웃을 구성하는 주요 컴포넌트와 렌더 태그, props.">
        <ApiTable
          rows={[
            { name: 'PageContent', type: 'div', desc: '페이지 최상위 컨테이너. 전체 여백과 배경을 설정합니다.' },
            { name: 'PageHeaderRow', type: 'div', desc: '페이지 제목과 상단 액션 영역의 행 레이아웃입니다.' },
            {
              name: 'SectionCard',
              type: 'div',
              desc: (
                <>
                  섹션 카드. <Code>$flex</Code> prop으로 flex 레이아웃으로 전환할 수 있습니다.
                </>
              ),
            },
            { name: 'GridContainer', type: 'div', desc: '테이블/그리드가 배치되는 컨테이너입니다.' },
            { name: 'PaginationBar', type: 'div', desc: '페이지네이션 영역. SectionCard 하단에 위치합니다.' },
            { name: 'SectionToolbar', type: 'div', desc: '툴바 행. ToolbarLeft/Center/Right를 자식으로 받습니다.' },
            { name: 'ToolbarLeft', type: 'div', desc: '툴바 왼쪽 영역 (TotalCount, 필터 등).' },
            { name: 'ToolbarCenter', type: 'div', desc: '툴바 중앙 영역.' },
            { name: 'ToolbarRight', type: 'div', desc: '툴바 오른쪽 영역 (IconButton 등).' },
            { name: 'TotalCount', type: 'span', desc: '총 건수 표시 텍스트 컴포넌트입니다.' },
            { name: 'IconButton', type: 'button', desc: '툴바용 아이콘 버튼 (기본 배경 있음).' },
            { name: 'GhostIconButton', type: 'button', desc: '툴바용 고스트 아이콘 버튼 (배경 없음).' },
          ]}
        />
      </DocSection>

      <DocSection title="전체 레이아웃" description="보안 가시성 페이지 전체 레이아웃 예시입니다.">
        <Example>{renderExample(S.Playground)}</Example>
      </DocSection>

      <DocSection
        title="StatsBar"
        description={
          <>
            <Code>StatsBar</Code> · <Code>StatItem</Code> · <Code>StatCount</Code> · <Code>StatLabel</Code>의 상태 및
            인터랙션입니다.
          </>
        }
      >
        <Example>{renderExample(S.StatsBarVariants)}</Example>
      </DocSection>

      <DocSection
        title="ChipContainer · Chip"
        description={
          <>
            <Code>ChipContainer</Code>와 <Code>Chip</Code> 탭 버튼입니다.
          </>
        }
      >
        <Example>{renderExample(S.ChipTabs)}</Example>
      </DocSection>

      <DocSection
        title="ContentSection"
        description={
          <>
            <Code>ContentSection</Code> — 필터 패널 열림/닫힘 레이아웃입니다.
          </>
        }
      >
        <Example>{renderExample(S.ContentSectionVariants)}</Example>
      </DocSection>

      <DocSection
        title="SectionCard"
        description={
          <>
            <Code>SectionCard</Code> · <Code>SectionToolbar</Code> · <Code>ToolbarLeft/Center/Right</Code>{' '}
            레이아웃입니다.
          </>
        }
      >
        <Example>{renderExample(S.SectionCardVariants)}</Example>
      </DocSection>

      <DocSection
        title="PageHeaderRow"
        description={
          <>
            <Code>PageHeaderRow</Code> 안에 <Code>PageHeader</Code>를 배치하는 다양한 패턴입니다.
          </>
        }
      >
        <Example>{renderExample(S.PageHeaderRowVariants)}</Example>
      </DocSection>

      <DocSection
        title="IconButton · GhostIconButton · TotalCount"
        description={
          <>
            <Code>IconButton</Code> · <Code>GhostIconButton</Code> · <Code>TotalCount</Code>의 상태입니다.
          </>
        }
      >
        <Example>{renderExample(S.UIElements)}</Example>
      </DocSection>

      <DocSection title="사용 지침" description="레이아웃 컴포넌트를 계층에 맞게 조합하고 접근성을 지키기 위한 권장/지양 사항입니다.">
        <Guidelines
          dos={[
            "PageContent → SectionCard → SectionToolbar → GridContainer → PaginationBar 계층 순서로 조합해 일관된 페이지 구조를 만듭니다.",
            "카드 내부를 세로 flex 로 배치해야 할 때만 SectionCard 의 $flex prop 을 켭니다.",
            "툴바는 SectionToolbar 안에서 ToolbarLeft·ToolbarCenter·ToolbarRight 로 영역을 나누고, 총 건수는 ToolbarLeft 의 TotalCount 로 표시합니다.",
            "배경이 필요한 툴바 액션은 IconButton, 배경 없는 보조 액션은 GhostIconButton 으로 위계를 구분합니다.",
            "StatItem 은 선택된 필터에 $active, 전체 합계 항목에 $isTotal 을 주어 상태를 시각적으로 구분합니다.",
          ]}
          donts={[
            "테이블·그리드 영역을 ChipContainer 나 StatsBar 로 대신하지 않고 GridContainer 를 사용합니다.",
            "레이아웃 컴포넌트는 div 기반이므로 여백·배경을 인라인 style 로 덮어쓰지 않고 컴포넌트 조합으로 해결합니다.",
            "클릭 가능한 탭을 만들 때 Chip 을 div 로 다시 감싸지 않고 button 기반인 Chip 을 그대로 사용합니다.",
            "탭 그룹에서 여러 Chip 에 동시에 $active 를 주지 않고 활성 항목은 하나만 유지합니다.",
          ]}
          a11y={[
            "Chip·IconButton·GhostIconButton 은 button 요소라 키보드 포커스와 Enter·Space 활성화가 기본 지원됩니다.",
            "아이콘만 있는 IconButton·GhostIconButton 에는 aria-label 로 동작을 설명하는 대체 텍스트를 제공합니다.",
            "Chip 의 $active 상태는 aria-selected 또는 aria-pressed 로 함께 전달하고, 비동기로 갱신되는 TotalCount 는 aria-live 로 변경을 알립니다.",
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
