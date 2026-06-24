import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/contract.css'
import Accordion from '../../components/Accordion'

const meta = {
  title: 'StyleGuide/Accordion',
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
  <div
    style={{
      height: '100vh',
      background: t.bg,
      overflowY: 'auto',
    }}
  >
    <div
      style={{
        maxWidth: 840,
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
      style={{
        display: 'inline-block',
        width: 3,
        height: 16,
        background: t.primary,
        borderRadius: 2,
        flexShrink: 0,
      }}
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

const RequiredBadge = () => (
  <span
    style={{
      fontSize: 10,
      fontWeight: 600,
      color: vars.color.error,
      background: 'rgba(240,62,62,0.08)',
      borderRadius: 3,
      padding: '1px 5px',
      marginLeft: 4,
    }}
  >
    required
  </span>
)

// ── Props table ───────────────────────────────────────────────────────────────

type PropRow = {
  name: string
  type: string
  defaultVal?: string
  required?: boolean
  desc: string
}

const PropsTable = ({ rows }: { rows: PropRow[] }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
    <thead>
      <tr style={{ background: t.surfaceHover }}>
        {['Prop', 'Type', 'Default', '설명'].map((h) => (
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
            {row.required && <RequiredBadge />}
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

// ── Demo components ───────────────────────────────────────────────────────────

const ExclusiveDemo = () => {
  const items = [
    {
      id: 'q1',
      title: '피싱 대응 플레이북이란?',
      content: '수신된 피싱 이메일을 자동으로 탐지하고 격리·리포트하는 자동화 워크플로우입니다.',
    },
    {
      id: 'q2',
      title: 'DDoS 완화는 어떻게 작동하나요?',
      content: 'CDN을 우회하고 트래픽을 여러 서버로 분산시켜 서비스 가용성을 유지합니다.',
    },
    {
      id: 'q3',
      title: '내부 위협을 어떻게 탐지하나요?',
      content: 'UEBA 엔진이 사용자 행동 이상을 감지하면 계정을 잠금하고 관리자에게 알림을 전송합니다.',
    },
  ]
  const [openId, setOpenId] = useState<string | null>('q1')
  return (
    <Accordion>
      {items.map((item) => (
        <Accordion.Item key={item.id} active={openId === item.id} onChange={(open) => setOpenId(open ? item.id : null)}>
          <Accordion.Header>{item.title}</Accordion.Header>
          <Accordion.Content>{item.content}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

const MultipleDemo = () => {
  const items = [
    { id: 'm1', title: '일반 설정', content: '언어, 시간대, 날짜 형식을 설정합니다.' },
    { id: 'm2', title: '보안 설정', content: '2FA 인증, 세션 타임아웃, 비밀번호 정책을 관리합니다.' },
    { id: 'm3', title: '알림 설정', content: 'Slack, Email, SMS 알림 채널을 구성합니다.' },
  ]
  const [openSet, setOpenSet] = useState<Set<string>>(new Set(['m1']))
  const toggle = (id: string, open: boolean) =>
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (open) next.add(id)
      else next.delete(id)
      return next
    })
  return (
    <Accordion>
      {items.map((item) => (
        <Accordion.Item key={item.id} active={openSet.has(item.id)} onChange={(open) => toggle(item.id, open)}>
          <Accordion.Header>{item.title}</Accordion.Header>
          <Accordion.Content>{item.content}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

// ── Pattern block (code + live demo) ─────────────────────────────────────────

const Pattern = ({
  title,
  desc,
  code,
  children,
}: {
  title: string
  desc: string
  code: string
  children: ReactNode
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div>
      <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600, color: t.text }}>{title}</p>
      <p style={{ margin: 0, fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>{desc}</p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'start' }}>
      <CodeBlock>{code}</CodeBlock>
      <div>{children}</div>
    </div>
  </div>
)

// ── Story ─────────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <DocPage>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>Accordion</h1>
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
            COMPOUND
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
          논리적으로 연관된 여러 섹션을 그룹으로 묶어 관리하는 컴포넌트입니다. <InlineCode>Accordion.Item</InlineCode> ·{' '}
          <InlineCode>Accordion.Header</InlineCode> · <InlineCode>Accordion.Content</InlineCode> 컴파운드 패턴으로
          구성되며, 그룹 전체의 <InlineCode>iconDirection</InlineCode> · <InlineCode>disabled</InlineCode>를 한 번에
          제어할 수 있습니다.
        </p>
        <CodeBlock>{`import { Accordion } from '@port/design-system'`}</CodeBlock>
      </div>

      {/* API */}
      <Section gap={24}>
        <SectionTitle>API</SectionTitle>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            ACCORDION
          </p>
          <PropsTable
            rows={[
              {
                name: 'iconDirection',
                type: "'left' | 'right'",
                defaultVal: "'right'",
                desc: '모든 항목에 공통 적용되는 아이콘 방향',
              },
              {
                name: 'disabled',
                type: 'boolean',
                defaultVal: 'false',
                desc: '그룹 전체 비활성화. 개별 항목보다 우선합니다.',
              },
              { name: 'className', type: 'string', desc: '루트 요소에 추가할 CSS 클래스' },
            ]}
          />
        </Card>

        <Card>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: 0.3 }}>
            ACCORDION.ITEM
          </p>
          <PropsTable
            rows={[
              {
                name: 'active',
                type: 'boolean',
                defaultVal: 'false',
                desc: '펼침 상태. 호출자가 직접 제어합니다 (controlled).',
              },
              {
                name: 'onChange',
                type: '(open: boolean) => void',
                desc: '헤더 클릭 시 다음 열림 상태를 전달하는 콜백',
                required: true,
              },
              {
                name: 'disabled',
                type: 'boolean',
                defaultVal: 'false',
                desc: '해당 항목만 비활성화. Accordion.disabled보다 세밀합니다.',
              },
              { name: 'className', type: 'string', desc: '항목 래퍼 요소에 추가할 CSS 클래스' },
            ]}
          />
        </Card>

        <Card style={{ background: t.surfaceHover }}>
          <p style={{ margin: 0, fontSize: 12, color: t.textSecondary, lineHeight: 1.7 }}>
            <strong style={{ color: t.text }}>Accordion.Header</strong>와{' '}
            <strong style={{ color: t.text }}>Accordion.Content</strong>는 별도 props 없이{' '}
            <InlineCode>children</InlineCode>과 표준 HTML 속성(<InlineCode>className</InlineCode> 포함)을 그대로
            전달합니다.
          </p>
        </Card>
      </Section>

      {/* Usage patterns */}
      <Section gap={24}>
        <SectionTitle>사용 패턴</SectionTitle>

        <Card>
          <Pattern
            title="Exclusive (단일 열림)"
            desc="한 번에 하나만 열리는 패턴. FAQ, Q&A 목록에 적합합니다."
            code={`const [openId, setOpenId] = useState(null);

<Accordion>
  {items.map((item) => (
    <Accordion.Item
      key={item.id}
      active={openId === item.id}
      onChange={(open) =>
        setOpenId(open ? item.id : null)
      }
    >
      <Accordion.Header>{item.title}</Accordion.Header>
      <Accordion.Content>{item.content}</Accordion.Content>
    </Accordion.Item>
  ))}
</Accordion>`}
          >
            <ExclusiveDemo />
          </Pattern>
        </Card>

        <Card>
          <Pattern
            title="Multiple (다중 열림)"
            desc="여러 항목을 동시에 펼칠 수 있는 패턴. 설정 페이지의 카테고리 그룹에 사용합니다."
            code={`const [openSet, setOpenSet] = useState(new Set());
const toggle = (id, open) =>
  setOpenSet((prev) => {
    const next = new Set(prev);
    open ? next.add(id) : next.delete(id);
    return next;
  });

<Accordion>
  {items.map((item) => (
    <Accordion.Item
      key={item.id}
      active={openSet.has(item.id)}
      onChange={(open) => toggle(item.id, open)}
    >
      ...
    </Accordion.Item>
  ))}
</Accordion>`}
          >
            <MultipleDemo />
          </Pattern>
        </Card>
      </Section>

      {/* Variants */}
      <Section gap={16}>
        <SectionTitle>아이콘 방향</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {(['left', 'right'] as const).map((dir) => (
            <Card key={dir}>
              <p style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>
                {`iconDirection="${dir}"`}
              </p>
              <Accordion iconDirection={dir}>
                <Accordion.Item active onChange={() => {}}>
                  <Accordion.Header>헤더 텍스트</Accordion.Header>
                  <Accordion.Content>콘텐츠 영역입니다.</Accordion.Content>
                </Accordion.Item>
              </Accordion>
            </Card>
          ))}
        </div>
      </Section>

      <Section gap={16}>
        <SectionTitle>비활성화</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Card>
            <p style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>
              {'<Accordion.Item disabled>'}
            </p>
            <Accordion>
              <Accordion.Item active onChange={() => {}}>
                <Accordion.Header>활성화된 항목</Accordion.Header>
                <Accordion.Content>이 항목은 정상 동작합니다.</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item disabled>
                <Accordion.Header>비활성화된 항목</Accordion.Header>
                <Accordion.Content>열 수 없습니다.</Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Card>
          <Card>
            <p style={{ margin: '0 0 10px', fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>
              {'<Accordion disabled>'}
            </p>
            <Accordion disabled>
              <Accordion.Item>
                <Accordion.Header>전체 비활성화</Accordion.Header>
                <Accordion.Content>모든 항목이 잠깁니다.</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>전체 비활성화 2</Accordion.Header>
                <Accordion.Content>열 수 없습니다.</Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Card>
        </div>
      </Section>
    </DocPage>
  ),
}
