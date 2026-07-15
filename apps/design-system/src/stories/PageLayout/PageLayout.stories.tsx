import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { vars } from '@dc/theme/contract.css'
import {
  PageContent,
  PageHeaderRow,
  SectionCard,
  GridContainer,
  PaginationBar,
  SectionToolbar,
  ToolbarLeft,
  ToolbarCenter,
  ToolbarRight,
  TotalCount,
  IconButton,
  GhostIconButton,
  StatsBar,
  StatItem,
  StatCount,
  StatLabel,
  ContentSection,
  TopologyContainer,
  ChipContainer,
  Chip,
} from '@dc/components/PageLayout'
import PageHeader from '@dc/components/PageHeader'
import {
  ExdSettingsIcon,
  ExdDownloadIcon,
  ExdSearchIcon,
  ExdFilterIcon,
  ExdRefreshIcon,
  ExdSecurityShieldIcon,
  ExdMenuListIcon,
  ExdPivotIcon,
} from '@port/icon-library'

const meta = {
  title: 'StyleGuide/PageLayout',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Layout helpers ─────────────────────────────────────────────────────────────

const Label = ({ children }: { children: string }) => (
  <code style={{ fontSize: 11, fontFamily: 'monospace', color: vars.color.textSecondary }}>{children}</code>
)

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Label>{label}</Label>
    {children}
  </div>
)

const PageFrame = ({ children, height = 480 }: { children: React.ReactNode; height?: number }) => (
  <div
    style={{
      height,
      border: `1px solid ${vars.color.border}`,
      borderRadius: vars.radius.md,
      overflow: 'hidden',
      background: vars.color.background,
    }}
  >
    {children}
  </div>
)

const Placeholder = ({ height = 200, label = '콘텐츠 영역' }: { height?: number; label?: string }) => (
  <div
    style={{
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: vars.color.textMuted,
      fontSize: 12,
      background: vars.color.surfaceHover,
      borderRadius: vars.radius.sm,
    }}
  >
    {label}
  </div>
)

// ── Mock data ──────────────────────────────────────────────────────────────────

const STATS = [
  { key: 'all', label: '전체 자산', count: 4_132, isTotal: true },
  { key: 'high', label: 'High 위험', count: 856 },
  { key: 'medium', label: 'Medium 위험', count: 1_204 },
  { key: 'low', label: 'Low 위험', count: 2_072 },
]

const TABS = [
  { value: 'cloud-asset', label: '클라우드 자산' },
  { value: 'container', label: '컨테이너' },
  { value: 'endpoint', label: '엔드포인트' },
]

const TABLE_ROWS = [
  {
    id: 'r-001',
    group: 'Production',
    name: 'web-server-01',
    grade: 'S',
    risk: 'High',
    breach: '대응',
    vuln: 'Critical',
  },
  { id: 'r-002', group: 'Production', name: 'api-gateway-02', grade: 'C', risk: 'Medium', breach: '-', vuln: 'High' },
  { id: 'r-003', group: 'Staging', name: 'db-primary-01', grade: 'O', risk: 'Low', breach: '완료', vuln: 'Medium' },
  { id: 'r-004', group: 'Staging', name: 'cache-01', grade: 'S', risk: 'High', breach: '-', vuln: 'Low' },
  {
    id: 'r-005',
    group: 'Development',
    name: 'build-agent-03',
    grade: 'C',
    risk: 'Medium',
    breach: '대응',
    vuln: 'Critical',
  },
]

const GRADE_COLOR: Record<string, string> = {
  S: vars.color.primary,
  C: vars.color.warning,
  O: vars.color.error,
}

const RISK_COLOR: Record<string, string> = {
  High: vars.color.error,
  Medium: vars.color.warning,
  Low: vars.color.success,
}

// ── Playground: 전체 SecurityVisibility 레이아웃 ─────────────────────────────

/** 보안 가시성 페이지 전체 레이아웃 예시 */
export const Playground: Story = {
  render: () => {
    const [tab, setTab] = useState('cloud-asset')
    const [view, setView] = useState<'list' | 'topology'>('list')
    const [filterOpen, setFilterOpen] = useState(false)
    const [activeStat, setActiveStat] = useState<string | null>(null)

    return (
      <PageFrame height={640}>
        <PageContent style={{ gap: 8, padding: '0 0 16px' }}>
          {/* 헤더 + 탭 */}
          <PageHeaderRow style={{ padding: '20px 20px 8px', gap: 24 }}>
            <PageHeader title="보안 가시성" />
            <ChipContainer>
              {TABS.map((t) => (
                <Chip key={t.value} $active={tab === t.value} onClick={() => setTab(t.value)}>
                  {t.label}
                </Chip>
              ))}
            </ChipContainer>
          </PageHeaderRow>

          {/* Stats Bar */}
          <SectionCard style={{ margin: '0 16px' }}>
            <StatsBar>
              {STATS.map((s) => (
                <StatItem
                  key={s.key}
                  $isTotal={s.isTotal}
                  $active={activeStat === s.key}
                  onClick={() => setActiveStat((prev) => (prev === s.key ? null : s.key))}
                >
                  <div className="stat-info">
                    <span className="stat-icon">
                      <ExdSecurityShieldIcon size={18} />
                    </span>
                    <StatLabel>{s.label}</StatLabel>
                  </div>
                  <StatCount $isTotal={s.isTotal}>{s.count.toLocaleString()}</StatCount>
                </StatItem>
              ))}
            </StatsBar>
          </SectionCard>

          {/* 뷰 모드 툴바 */}
          <SectionCard style={{ margin: '0 16px' }}>
            <SectionToolbar>
              <ToolbarLeft>
                <div
                  style={{
                    display: 'flex',
                    border: `1px solid ${vars.color.border}`,
                    borderRadius: vars.radius.sm,
                    overflow: 'hidden',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setView('topology')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      border: 'none',
                      cursor: 'pointer',
                      background: view === 'topology' ? vars.color.primary : 'transparent',
                      color: view === 'topology' ? '#fff' : vars.color.textSecondary,
                    }}
                    title="토폴로지 뷰"
                  >
                    <ExdPivotIcon size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setView('list')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      border: 'none',
                      cursor: 'pointer',
                      background: view === 'list' ? vars.color.primary : 'transparent',
                      color: view === 'list' ? '#fff' : vars.color.textSecondary,
                    }}
                    title="목록 뷰"
                  >
                    <ExdMenuListIcon size={14} />
                  </button>
                </div>
              </ToolbarLeft>
              <ToolbarCenter>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 32,
                    border: `1px solid ${vars.color.border}`,
                    borderRadius: vars.radius.sm,
                    padding: '0 10px',
                    gap: 6,
                    flex: 1,
                    maxWidth: 360,
                    background: vars.color.surface,
                  }}
                >
                  <ExdSearchIcon size={14} style={{ color: vars.color.textMuted }} />
                  <span style={{ fontSize: 12, color: vars.color.textMuted }}>검색</span>
                </div>
              </ToolbarCenter>
            </SectionToolbar>
          </SectionCard>

          {/* 콘텐츠 섹션 */}
          <ContentSection style={{ margin: '0 16px' }}>
            <SectionToolbar>
              <ToolbarLeft>
                <IconButton
                  title="필터"
                  style={filterOpen ? { borderColor: vars.color.primary, color: vars.color.primary } : undefined}
                  onClick={() => setFilterOpen((v) => !v)}
                >
                  <ExdFilterIcon size={14} />
                </IconButton>
                <TotalCount>
                  총 <strong>4,132</strong>건
                </TotalCount>
                <GhostIconButton title="새로고침">
                  <ExdRefreshIcon size={14} />
                </GhostIconButton>
              </ToolbarLeft>
              <ToolbarRight>
                <div
                  style={{
                    height: 32,
                    border: `1px solid ${vars.color.border}`,
                    borderRadius: vars.radius.sm,
                    padding: '0 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    color: vars.color.text,
                    background: vars.color.surface,
                    cursor: 'pointer',
                  }}
                >
                  프로파일: 기본
                </div>
                <IconButton
                  title="다운로드"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '0 10px',
                    width: 'auto',
                    fontSize: 12,
                  }}
                >
                  <ExdDownloadIcon size={14} />
                  다운로드
                </IconButton>
              </ToolbarRight>
            </SectionToolbar>

            {view === 'list' ? (
              <GridContainer>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${vars.color.border}` }}>
                      {['자산 그룹', '리소스명', '보안 등급', '경보 위험도', '침해 대응', '취약점'].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: '8px 12px',
                            textAlign: 'left',
                            fontWeight: 600,
                            color: vars.color.textSecondary,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS.map((row) => (
                      <tr key={row.id} style={{ borderBottom: `1px solid ${vars.color.border}` }}>
                        <td style={{ padding: '8px 12px', color: vars.color.textSecondary }}>{row.group}</td>
                        <td style={{ padding: '8px 12px', fontWeight: 500 }}>{row.name}</td>
                        <td style={{ padding: '8px 12px' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 22,
                              height: 22,
                              borderRadius: '50%',
                              fontSize: 10,
                              fontWeight: 700,
                              background: GRADE_COLOR[row.grade],
                              color: '#fff',
                            }}
                          >
                            {row.grade}
                          </span>
                        </td>
                        <td style={{ padding: '8px 12px' }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: RISK_COLOR[row.risk] }}>{row.risk}</span>
                        </td>
                        <td style={{ padding: '8px 12px', color: vars.color.textSecondary }}>{row.breach}</td>
                        <td style={{ padding: '8px 12px' }}>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 500,
                              color: RISK_COLOR[row.risk] ?? vars.color.textSecondary,
                            }}
                          >
                            {row.vuln}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </GridContainer>
            ) : (
              <TopologyContainer>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: vars.color.textMuted,
                    fontSize: 13,
                  }}
                >
                  토폴로지 뷰 영역 (React Flow)
                </div>
              </TopologyContainer>
            )}

            <PaginationBar>
              <span style={{ fontSize: 12, color: vars.color.textSecondary }}>1 / 208 페이지</span>
            </PaginationBar>
          </ContentSection>
        </PageContent>
      </PageFrame>
    )
  },
}

// ── StatsBar ──────────────────────────────────────────────────────────────────

/** StatsBar · StatItem · StatCount · StatLabel 상태 및 인터랙션 */
export const StatsBarVariants: Story = {
  name: 'StatsBar',
  render: () => {
    const [active, setActive] = useState<string | null>(null)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Section label="기본 StatsBar (클릭 시 active)">
          <SectionCard>
            <StatsBar>
              {STATS.map((s) => (
                <StatItem
                  key={s.key}
                  $isTotal={s.isTotal}
                  $active={active === s.key}
                  onClick={() => setActive((p) => (p === s.key ? null : s.key))}
                >
                  <div className="stat-info">
                    <span className="stat-icon">
                      <ExdSecurityShieldIcon size={18} />
                    </span>
                    <StatLabel>{s.label}</StatLabel>
                  </div>
                  <StatCount $isTotal={s.isTotal}>{s.count.toLocaleString()}</StatCount>
                </StatItem>
              ))}
            </StatsBar>
          </SectionCard>
        </Section>

        <Section label="아이콘 없는 심플 버전">
          <SectionCard>
            <StatsBar>
              {STATS.map((s) => (
                <StatItem key={s.key} $isTotal={s.isTotal}>
                  <div className="stat-info">
                    <StatLabel>{s.label}</StatLabel>
                  </div>
                  <StatCount $isTotal={s.isTotal}>{s.count.toLocaleString()}</StatCount>
                </StatItem>
              ))}
            </StatsBar>
          </SectionCard>
        </Section>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── ChipContainer + Chip ──────────────────────────────────────────────────────

/** ChipContainer와 Chip 탭 버튼 */
export const ChipTabs: Story = {
  name: 'ChipContainer · Chip',
  render: () => {
    const [tab, setTab] = useState('cloud-asset')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Section label="Chip 탭 (active 상태 포함)">
          <ChipContainer>
            {TABS.map((t) => (
              <Chip key={t.value} $active={tab === t.value} onClick={() => setTab(t.value)}>
                {t.label}
              </Chip>
            ))}
          </ChipContainer>
        </Section>

        <Section label="PageHeaderRow + ChipContainer 조합">
          <PageHeaderRow
            style={{
              padding: '16px 16px 8px',
              gap: 24,
              background: vars.color.surface,
              borderRadius: vars.radius.md,
              border: `1px solid ${vars.color.border}`,
            }}
          >
            <PageHeader title="보안 가시성" />
            <ChipContainer>
              {TABS.map((t) => (
                <Chip key={t.value} $active={tab === t.value} onClick={() => setTab(t.value)}>
                  {t.label}
                </Chip>
              ))}
            </ChipContainer>
          </PageHeaderRow>
        </Section>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── ContentSection ────────────────────────────────────────────────────────────

/** ContentSection — 필터 패널 열림/닫힘 레이아웃 */
export const ContentSectionVariants: Story = {
  name: 'ContentSection',
  render: () => {
    const [filterOpen, setFilterOpen] = useState(false)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Section label="<ContentSection> — SectionToolbar + GridContainer + PaginationBar">
          <ContentSection style={{ height: 320 }}>
            <SectionToolbar>
              <ToolbarLeft>
                <IconButton
                  title="필터"
                  style={filterOpen ? { borderColor: vars.color.primary, color: vars.color.primary } : undefined}
                  onClick={() => setFilterOpen((v) => !v)}
                >
                  <ExdFilterIcon size={14} />
                </IconButton>
                <TotalCount>
                  총 <strong>4,132</strong>건
                </TotalCount>
                <GhostIconButton title="새로고침">
                  <ExdRefreshIcon size={14} />
                </GhostIconButton>
              </ToolbarLeft>
              <ToolbarRight>
                <GhostIconButton title="설정">
                  <ExdSettingsIcon size={14} />
                </GhostIconButton>
                <IconButton title="다운로드">
                  <ExdDownloadIcon size={14} />
                </IconButton>
              </ToolbarRight>
            </SectionToolbar>
            <GridContainer style={{ padding: '0 16px' }}>
              <Placeholder height={180} label="데이터 테이블 / 토폴로지 영역" />
            </GridContainer>
            <PaginationBar>
              <span style={{ fontSize: 12, color: vars.color.textSecondary }}>1 / 208 페이지</span>
            </PaginationBar>
          </ContentSection>
        </Section>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ── SectionCard 변형 ──────────────────────────────────────────────────────────

/** SectionCard · SectionToolbar · ToolbarLeft/Center/Right 레이아웃 */
export const SectionCardVariants: Story = {
  name: 'SectionCard',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Section label="left + right">
        <SectionCard>
          <SectionToolbar>
            <ToolbarLeft>
              <TotalCount>
                총 <strong>567</strong>건
              </TotalCount>
            </ToolbarLeft>
            <ToolbarRight>
              <GhostIconButton title="검색">
                <ExdSearchIcon size={16} />
              </GhostIconButton>
              <GhostIconButton title="설정">
                <ExdSettingsIcon size={16} />
              </GhostIconButton>
              <IconButton title="내보내기">
                <ExdDownloadIcon size={16} />
              </IconButton>
            </ToolbarRight>
          </SectionToolbar>
        </SectionCard>
      </Section>

      <Section label="left + center + right">
        <SectionCard>
          <SectionToolbar>
            <ToolbarLeft>
              <TotalCount>
                총 <strong>1,024</strong>건
              </TotalCount>
            </ToolbarLeft>
            <ToolbarCenter>
              <span style={{ fontSize: 12, color: vars.color.textMuted }}>검색 · 필터 영역 (ToolbarCenter)</span>
            </ToolbarCenter>
            <ToolbarRight>
              <GhostIconButton title="필터">
                <ExdFilterIcon size={16} />
              </GhostIconButton>
              <IconButton title="설정">
                <ExdSettingsIcon size={16} />
              </IconButton>
            </ToolbarRight>
          </SectionToolbar>
        </SectionCard>
      </Section>

      <Section label="<SectionCard $flex> — 나란히 통계 카드">
        <div style={{ display: 'flex', height: 100, gap: 12 }}>
          {[
            { label: '탐지 이벤트', value: '1,234', color: vars.color.primary },
            { label: '차단 이벤트', value: '856', color: vars.color.error },
            { label: '조사 중', value: '42', color: vars.color.warning },
          ].map(({ label, value, color }) => (
            <SectionCard key={label} $flex>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}
              >
                <strong style={{ fontSize: 22, fontWeight: 700, color }}>{value}</strong>
                <span style={{ fontSize: 11, color: vars.color.textSecondary }}>{label}</span>
              </div>
            </SectionCard>
          ))}
        </div>
      </Section>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── PageHeaderRow 변형 ────────────────────────────────────────────────────────

/** PageHeaderRow 안에 PageHeader를 배치하는 다양한 패턴 */
export const PageHeaderRowVariants: Story = {
  name: 'PageHeaderRow',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section label="title only">
        <PageHeaderRow>
          <PageHeader title="이벤트 관리" />
        </PageHeaderRow>
      </Section>

      <Section label="title + subtitle + actions">
        <PageHeaderRow>
          <PageHeader
            title="위협 인텔리전스"
            subtitle="IoC 데이터 관리"
            actions={
              <>
                <GhostIconButton title="설정">
                  <ExdSettingsIcon size={16} />
                </GhostIconButton>
                <IconButton title="내보내기">
                  <ExdDownloadIcon size={16} />
                </IconButton>
              </>
            }
          />
        </PageHeaderRow>
      </Section>

      <Section label="title + ChipContainer (보안 가시성 패턴)">
        <PageHeaderRow style={{ gap: 24 }}>
          <PageHeader title="보안 가시성" />
          <ChipContainer>
            {TABS.map((t, i) => (
              <Chip key={t.value} $active={i === 0}>
                {t.label}
              </Chip>
            ))}
          </ChipContainer>
        </PageHeaderRow>
      </Section>

      <Section label="onBack + breadcrumbs + actions">
        <PageHeaderRow>
          <PageHeader
            title="이벤트 상세"
            subtitle="EVT-20240501-0042"
            breadcrumbs={[
              { key: 'home', label: 'Home', href: '#' },
              { key: 'events', label: '이벤트 관리', href: '#' },
              { key: 'detail', label: '상세' },
            ]}
            onBack={() => {}}
            actions={
              <IconButton title="내보내기">
                <ExdDownloadIcon size={16} />
              </IconButton>
            }
          />
        </PageHeaderRow>
      </Section>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ── IconButton · GhostIconButton · TotalCount ─────────────────────────────────

/** IconButton · GhostIconButton · TotalCount 상태 */
export const UIElements: Story = {
  name: 'IconButton · GhostIconButton · TotalCount',
  render: () => (
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Section label="IconButton">
        <div style={{ display: 'flex', gap: 8 }}>
          <IconButton title="기본">
            <ExdSettingsIcon size={16} />
          </IconButton>
          <IconButton title="활성" data-active="true">
            <ExdDownloadIcon size={16} />
          </IconButton>
          <IconButton title="필터 활성" style={{ borderColor: vars.color.primary, color: vars.color.primary }}>
            <ExdFilterIcon size={16} />
          </IconButton>
        </div>
        <Label>default / data-active / filter-active</Label>
      </Section>

      <Section label="GhostIconButton">
        <div style={{ display: 'flex', gap: 8 }}>
          <GhostIconButton title="검색">
            <ExdSearchIcon size={16} />
          </GhostIconButton>
          <GhostIconButton title="필터">
            <ExdFilterIcon size={16} />
          </GhostIconButton>
          <GhostIconButton title="설정">
            <ExdSettingsIcon size={16} />
          </GhostIconButton>
        </div>
      </Section>

      <Section label="TotalCount">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <TotalCount>총 1,234건</TotalCount>
          <TotalCount>
            총 <strong>1,234</strong>건
          </TotalCount>
        </div>
      </Section>
    </div>
  ),
  parameters: { controls: { disable: true } },
}
