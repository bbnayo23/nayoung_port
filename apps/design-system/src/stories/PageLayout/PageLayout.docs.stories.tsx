import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import {
  PageContent,
  PageHeaderRow,
  SectionCard,
  GridContainer,
  PaginationBar,
  SectionToolbar,
  ToolbarLeft,
  ToolbarRight,
  TotalCount,
  IconButton,
  GhostIconButton,
} from '../../components/PageLayout'
import { ExdSettingsIcon, ExdDownloadIcon } from '@port/icon-library'

const meta = {
  title: 'StyleGuide/PageLayout',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Design tokens ─────────────────────────────────────────────────────────────

const t = {
  bg: vars.color.background,
  surface: vars.color.surface,
  surfaceHover: vars.color.surfaceHover,
  border: vars.color.border,
  text: vars.color.text,
  textSecondary: vars.color.textSecondary,
  textMuted: vars.color.textMuted,
  primary: vars.color.primary,
  radius: vars.radius.md,
  radiusSm: vars.radius.sm,
} as const

// ── Layout helpers ────────────────────────────────────────────────────────────

const DocPage = ({ children }: { children: ReactNode }) => (
  <div style={{ height: '100vh', background: t.bg, overflowY: 'auto' }}>
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '48px 32px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
      }}
    >
      {children}
    </div>
  </div>
)

const Section = ({ children, gap = 16 }: { children: ReactNode; gap?: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>{children}</div>
)

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
    <span
      style={{ display: 'inline-block', width: 3, height: 16, background: t.primary, borderRadius: 2, flexShrink: 0 }}
    />
    <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: t.text, letterSpacing: 0.2 }}>{children}</h2>
  </div>
)

const Card = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div
    style={{
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: t.radius,
      padding: '20px 24px',
      ...style,
    }}
  >
    {children}
  </div>
)

const CodeBlock = ({ children }: { children: string }) => (
  <pre
    style={{
      margin: 0,
      padding: '14px 18px',
      background: '#1e2228',
      color: '#abb2bf',
      borderRadius: t.radiusSm,
      fontSize: 12,
      fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
      lineHeight: 1.7,
      overflowX: 'auto',
      whiteSpace: 'pre',
    }}
  >
    <code>{children}</code>
  </pre>
)

const InlineCode = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: 12,
      background: t.surfaceHover,
      border: `1px solid ${t.border}`,
      borderRadius: 3,
      padding: '1px 5px',
      color: t.text,
    }}
  >
    {children}
  </code>
)

const TypeBadge = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: 11,
      background: 'rgba(113,135,255,0.08)',
      color: '#5a6ee0',
      borderRadius: 3,
      padding: '2px 6px',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </code>
)

const DefaultBadge = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: 11,
      background: t.surfaceHover,
      color: t.textSecondary,
      borderRadius: 3,
      padding: '2px 6px',
    }}
  >
    {children}
  </code>
)

type PropRow = { name: string; type: string; defaultVal?: string; required?: boolean; desc: string }

const PropsTable = ({ rows }: { rows: PropRow[] }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
    <thead>
      <tr style={{ background: t.surfaceHover }}>
        {['컴포넌트', 'Type', 'Props', '설명'].map((h) => (
          <th
            key={h}
            style={{
              padding: '8px 12px',
              textAlign: 'left',
              fontWeight: 600,
              fontSize: 12,
              color: t.textSecondary,
              borderBottom: `1px solid ${t.border}`,
              letterSpacing: 0.3,
            }}
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.name} style={{ borderBottom: `1px solid ${t.border}` }}>
          <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
            <InlineCode>{row.name}</InlineCode>
          </td>
          <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
            <TypeBadge>{row.type}</TypeBadge>
          </td>
          <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
            {row.defaultVal ? (
              <DefaultBadge>{row.defaultVal}</DefaultBadge>
            ) : (
              <span style={{ color: t.textMuted }}>—</span>
            )}
          </td>
          <td style={{ padding: '10px 12px', verticalAlign: 'top', color: t.textSecondary, lineHeight: 1.6 }}>
            {row.desc}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>PageLayout</h1>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.primary,
              background: 'rgba(0,183,153,0.1)',
              borderRadius: 4,
              padding: '2px 8px',
              letterSpacing: 0.5,
            }}
          >
            LAYOUT
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 640 }}>
          페이지 공통 레이아웃 컴포넌트 모음입니다. <InlineCode>PageContent</InlineCode> →{' '}
          <InlineCode>SectionCard</InlineCode> → <InlineCode>SectionToolbar</InlineCode> →{' '}
          <InlineCode>GridContainer</InlineCode> → <InlineCode>PaginationBar</InlineCode>의 계층 구조로 조합하여 일관된
          페이지 레이아웃을 구성합니다.
        </p>
        <CodeBlock>{`import {
  PageContent, PageHeaderRow, SectionCard, GridContainer,
  PaginationBar, SectionToolbar, ToolbarLeft, ToolbarCenter,
  ToolbarRight, TotalCount, IconButton, GhostIconButton,
} from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>컴포넌트 목록</SectionTitle>
        <Card>
          <PropsTable
            rows={[
              { name: 'PageContent', type: 'div', desc: '페이지 최상위 컨테이너. 전체 여백과 배경을 설정합니다.' },
              { name: 'PageHeaderRow', type: 'div', desc: '페이지 제목과 상단 액션 영역의 행 레이아웃입니다.' },
              {
                name: 'SectionCard',
                type: 'div',
                desc: '섹션 카드. $flex prop으로 flex 레이아웃으로 전환할 수 있습니다.',
                defaultVal: '$flex?: boolean',
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
        </Card>
      </Section>

      {/* Pattern */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>
        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: t.text }}>기본 페이지 구조</p>
          <CodeBlock>{`<PageContent>
  <PageHeaderRow>
    <h1>페이지 제목</h1>
  </PageHeaderRow>

  <SectionCard>
    <SectionToolbar>
      <ToolbarLeft>
        <TotalCount>총 1,234건</TotalCount>
      </ToolbarLeft>
      <ToolbarRight>
        <GhostIconButton><ExdSettingsIcon size={16} /></GhostIconButton>
        <IconButton><ExdDownloadIcon size={16} /></IconButton>
      </ToolbarRight>
    </SectionToolbar>

    <GridContainer>
      {/* 데이터 테이블 */}
    </GridContainer>

    <PaginationBar>
      {/* 페이지네이션 */}
    </PaginationBar>
  </SectionCard>
</PageContent>`}</CodeBlock>
        </Card>
      </Section>

      {/* Live demo */}
      <Section gap={16}>
        <SectionTitle>라이브 데모</SectionTitle>
        <PageContent>
          <PageHeaderRow>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: t.text }}>보안 이벤트</h2>
          </PageHeaderRow>
          <SectionCard>
            <SectionToolbar>
              <ToolbarLeft>
                <TotalCount>총 3,702건</TotalCount>
              </ToolbarLeft>
              <ToolbarRight>
                <GhostIconButton title="설정">
                  <ExdSettingsIcon size={16} />
                </GhostIconButton>
                <IconButton title="내보내기">
                  <ExdDownloadIcon size={16} />
                </IconButton>
              </ToolbarRight>
            </SectionToolbar>
            <GridContainer>
              <div
                style={{
                  height: 160,
                  background: t.surfaceHover,
                  borderRadius: t.radiusSm,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: t.textMuted,
                  fontSize: 13,
                }}
              >
                데이터 테이블
              </div>
            </GridContainer>
            <PaginationBar>
              <span style={{ fontSize: 12, color: t.textSecondary }}>1 / 25 페이지</span>
            </PaginationBar>
          </SectionCard>
        </PageContent>
      </Section>
    </DocPage>
  ),
}
