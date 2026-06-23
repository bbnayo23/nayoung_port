import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode, CSSProperties } from 'react'
import { vars } from '../../theme/tokens.css'
import { CellBadge } from './CellBadge'
import { CellIpWithFlag } from './CellIpWithFlag'
import { CellCode } from './CellCode'
import { LogSourceLabel } from './LogSourceLabel'
import { ArrayToString } from './ArrayToString'

const meta = {
  title: 'StyleGuide/CellRenderer',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const t = {
  bg: vars.color.background,
  surface: vars.color.surface,
  surfaceHover: vars.color.surfaceMuted,
  border: vars.color.border,
  text: vars.color.text,
  textSecondary: vars.color.textSecondary,
  textMuted: vars.color.textDisabled,
  primary: vars.color.brand[600],
  success: vars.color.success,
  danger: vars.color.danger,
  info: vars.color.info,
  radius: vars.radius.md,
  radiusSm: vars.radius.sm,
} as const

const DocPage = ({ children }: { children: ReactNode }) => (
  <div style={{ height: '100vh', background: t.bg, overflowY: 'auto' }}>
    <div
      style={{
        maxWidth: 860,
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

const DocCard = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
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
      fontFamily: "'Fira Code','Consolas',monospace",
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
      wordBreak: 'break-word' as const,
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

type PropRow = { name: string; type: string; defaultVal?: string; desc: string }
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

const Demo = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <InlineCode>{label}</InlineCode>
    <div style={{ display: 'flex', alignItems: 'center', minHeight: 24 }}>{children}</div>
  </div>
)

const DocumentationView = () => (
  <DocPage>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.text }}>CellRenderer</h1>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: t.textSecondary, maxWidth: 600 }}>
        테이블/로그 그리드의 셀 안에서 값을 의미 있게 렌더링하는 프레젠테이션 컴포넌트 모음입니다. 단일 합성
        컴포넌트가 아니라 독립적으로 import 해서 쓰는 다섯 개의 셀 렌더러로 구성됩니다 — 상태 배지(CellBadge), 국가
        플래그가 붙은 IP(CellIpWithFlag), 인라인 코드(CellCode), 로그소스 라벨(LogSourceLabel), 배열 요약
        배지(ArrayToString).
      </p>
      <CodeBlock>{`import {
  CellBadge,
  CellIpWithFlag,
  CellCode,
  LogSourceLabel,
  ArrayToString,
} from '@nayoung-port/design-system/components/CellRenderer'`}</CodeBlock>
    </div>

    <Section>
      <SectionTitle>CellBadge — 상태/레벨 배지</SectionTitle>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        심각도·상태·태그 등을 작은 pill 배지로 표시합니다. <InlineCode>color</InlineCode> 로 네 가지 의미색을
        고릅니다.
      </p>
      <DocCard>
        <PropsTable
          rows={[
            {
              name: 'label',
              type: 'string',
              desc: '배지에 표시할 텍스트 (필수)',
            },
            {
              name: 'color',
              type: "'primary' | 'neutral' | 'danger' | 'success'",
              defaultVal: "'neutral'",
              desc: '배지 색상 — primary(브랜드) · neutral(보더형) · danger · success',
            },
          ]}
        />
      </DocCard>
      <CodeBlock>{`<CellBadge label="primary" color="primary" />
<CellBadge label="neutral" color="neutral" />
<CellBadge label="danger" color="danger" />
<CellBadge label="success" color="success" />`}</CodeBlock>
      <DocCard>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {(['primary', 'neutral', 'danger', 'success'] as const).map((c) => (
            <Demo key={c} label={`color="${c}"`}>
              <CellBadge label={c} color={c} />
            </Demo>
          ))}
        </div>
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>CellIpWithFlag — 국가 코드 IP</SectionTitle>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        IP 주소 앞에 ISO 3166-1 alpha-2 국가 코드 칩을 붙여 출처를 한눈에 보여줍니다.{' '}
        <InlineCode>country</InlineCode> 를 생략하면 IP 만 렌더됩니다.
      </p>
      <DocCard>
        <PropsTable
          rows={[
            {
              name: 'ip',
              type: 'string',
              desc: '표시할 IP 주소 (필수)',
            },
            {
              name: 'country',
              type: 'string',
              desc: 'ISO 3166-1 alpha-2 국가 코드(예: "US", "KR"). 앞 두 글자를 대문자로 잘라 칩으로 표시. 생략 시 칩 없음',
            },
          ]}
        />
      </DocCard>
      <CodeBlock>{`<CellIpWithFlag ip="192.168.1.10" country="KR" />
<CellIpWithFlag ip="8.8.8.8" country="US" />
<CellIpWithFlag ip="1.1.1.1" />`}</CodeBlock>
      <DocCard>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Demo label='country="KR"'>
            <CellIpWithFlag ip="192.168.1.10" country="KR" />
          </Demo>
          <Demo label='country="US"'>
            <CellIpWithFlag ip="8.8.8.8" country="US" />
          </Demo>
          <Demo label="country 생략">
            <CellIpWithFlag ip="1.1.1.1" />
          </Demo>
        </div>
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>CellCode — 인라인 코드</SectionTitle>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        요청 경로·상태 코드·헤더 등 짧은 기술 값을 monospace 코드 칩으로 강조합니다.
      </p>
      <DocCard>
        <PropsTable
          rows={[
            {
              name: 'value',
              type: 'string',
              desc: '코드 칩에 표시할 값 (필수)',
            },
          ]}
        />
      </DocCard>
      <CodeBlock>{`<CellCode value="GET /api/users" />
<CellCode value="200" />
<CellCode value="x-trace-id: abc123" />`}</CodeBlock>
      <DocCard>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Demo label="경로">
            <CellCode value="GET /api/users" />
          </Demo>
          <Demo label="상태 코드">
            <CellCode value="200" />
          </Demo>
          <Demo label="헤더">
            <CellCode value="x-trace-id: abc123" />
          </Demo>
        </div>
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>LogSourceLabel — 로그소스 라벨</SectionTitle>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        로그 출처(방화벽·WAF·IDS 등)를 색상 dot + 이름으로 표시합니다. <InlineCode>color</InlineCode> 는 dot
        배경색에만 적용되는 런타임 값이며, 생략하면 브랜드색 dot 이 기본으로 쓰입니다.
      </p>
      <DocCard>
        <PropsTable
          rows={[
            {
              name: 'name',
              type: 'string',
              desc: '로그소스 이름 (필수)',
            },
            {
              name: 'color',
              type: 'string',
              desc: 'dot 의 배경색(임의 CSS 색 문자열). 생략 시 브랜드색(vars.color.brand[600]) dot',
            },
          ]}
        />
      </DocCard>
      <CodeBlock>{`<LogSourceLabel name="firewall-01" color="#2563eb" />
<LogSourceLabel name="waf-02" color="#16a34a" />
<LogSourceLabel name="ids-03" />`}</CodeBlock>
      <DocCard>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Demo label='color="#2563eb"'>
            <LogSourceLabel name="firewall-01" color="#2563eb" />
          </Demo>
          <Demo label='color="#16a34a"'>
            <LogSourceLabel name="waf-02" color="#16a34a" />
          </Demo>
          <Demo label="color 생략 (브랜드색 기본)">
            <LogSourceLabel name="ids-03" />
          </Demo>
        </div>
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>ArrayToString — 배열 요약 배지</SectionTitle>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        문자열 배열을 neutral 배지로 나열하고, <InlineCode>max</InlineCode> 를 초과하는 항목은{' '}
        <InlineCode>+N</InlineCode> primary 배지로 접어 표시합니다. 빈 배열이면 아무것도 렌더하지 않습니다.
      </p>
      <DocCard>
        <PropsTable
          rows={[
            {
              name: 'values',
              type: 'string[]',
              desc: '표시할 값 배열 (필수). 빈 배열이면 null 을 반환해 아무것도 렌더하지 않음',
            },
            {
              name: 'max',
              type: 'number',
              defaultVal: '3',
              desc: '최대 표시 개수. 초과분은 +N primary 배지로 요약',
            },
          ]}
        />
      </DocCard>
      <CodeBlock>{`<ArrayToString values={['alpha', 'beta']} />
<ArrayToString values={['one', 'two', 'three', 'four', 'five']} />
<ArrayToString values={['compact', 'list', 'demo', 'overflow', 'x', 'y']} max={2} />`}</CodeBlock>
      <DocCard>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Demo label="max 미만 (접힘 없음)">
            <ArrayToString values={['alpha', 'beta']} />
          </Demo>
          <Demo label="기본 max=3 초과">
            <ArrayToString values={['one', 'two', 'three', 'four', 'five']} />
          </Demo>
          <Demo label="max={2}">
            <ArrayToString values={['compact', 'list', 'demo', 'overflow', 'x', 'y']} max={2} />
          </Demo>
        </div>
      </DocCard>
    </Section>

    <Section>
      <SectionTitle>Composition — 로그 행 예시</SectionTitle>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: t.textSecondary }}>
        여러 셀 렌더러를 한 행에 조합해 보안 로그 한 줄을 구성한 예시입니다.
      </p>
      <DocCard>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
            fontSize: 13,
            color: t.text,
          }}
        >
          <LogSourceLabel name="firewall-01" color={t.danger} />
          <CellIpWithFlag ip="203.0.113.7" country="CN" />
          <CellCode value="POST /login" />
          <CellBadge label="blocked" color="danger" />
          <ArrayToString values={['bruteforce', 'geo-block', 'rate-limit']} max={2} />
        </div>
      </DocCard>
    </Section>
  </DocPage>
)

export const Documentation: Story = {
  render: () => <DocumentationView />,
}
