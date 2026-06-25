/**
 * SIEM 로그검색 화면용 목 데이터.
 * 실제 서비스에서는 백엔드 검색 API 응답을 이 형태로 정규화해 사용한다.
 */

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info'

export type SourceType = 'Firewall' | 'IDS/IPS' | 'EDR' | 'WAF' | 'VPN' | 'Auth'

export type LogAction = 'blocked' | 'allowed' | 'detected'

export interface LogEntry {
  id: string
  /** 발생 시각 (표시용 문자열) */
  time: string
  severity: Severity
  source: SourceType
  sourceIp: string
  destIp: string
  user: string
  eventType: string
  action: LogAction
  message: string
}

/** 심각도 → Badge color 매핑 (디자인 시스템 Badge color 토큰 기준) */
export const severityColor: Record<Severity, string> = {
  critical: 'red',
  high: 'orange',
  medium: 'yellow',
  low: 'blue',
  info: 'gray',
}

export const severityLabel: Record<Severity, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  info: 'Info',
}

export const actionColor: Record<LogAction, string> = {
  blocked: 'red',
  detected: 'orange',
  allowed: 'green',
}

export const actionLabel: Record<LogAction, string> = {
  blocked: 'Blocked',
  detected: 'Detected',
  allowed: 'Allowed',
}

export const logs: LogEntry[] = [
  { id: 'EVT-24817', time: '2026-06-26 14:32:07', severity: 'critical', source: 'EDR', sourceIp: '203.0.113.45', destIp: '10.10.4.21', user: 'svc_backup', eventType: 'Ransomware Behavior', action: 'blocked', message: '대량 파일 암호화 패턴 탐지 — 프로세스 강제 종료' },
  { id: 'EVT-24816', time: '2026-06-26 14:30:55', severity: 'high', source: 'Firewall', sourceIp: '198.51.100.23', destIp: '10.10.1.8', user: '-', eventType: 'Port Scan', action: 'blocked', message: 'TCP SYN 스캔 — 1,024개 포트 5초 내 접근' },
  { id: 'EVT-24815', time: '2026-06-26 14:29:13', severity: 'high', source: 'WAF', sourceIp: '203.0.113.91', destIp: '10.10.2.40', user: 'anonymous', eventType: 'SQL Injection', action: 'blocked', message: "UNION SELECT 구문 포함 요청 차단 (/api/login)" },
  { id: 'EVT-24814', time: '2026-06-26 14:27:48', severity: 'medium', source: 'Auth', sourceIp: '10.20.5.12', destIp: '10.10.0.3', user: 'j.kim', eventType: 'Brute Force', action: 'detected', message: '5분간 로그인 실패 18회 — 계정 임시 잠금' },
  { id: 'EVT-24813', time: '2026-06-26 14:25:31', severity: 'critical', source: 'IDS/IPS', sourceIp: '203.0.113.77', destIp: '10.10.4.55', user: '-', eventType: 'C2 Communication', action: 'blocked', message: '알려진 C2 도메인으로의 비콘 트래픽 탐지' },
  { id: 'EVT-24812', time: '2026-06-26 14:24:02', severity: 'low', source: 'VPN', sourceIp: '172.16.8.30', destIp: '10.10.0.1', user: 's.park', eventType: 'Geo Anomaly', action: 'allowed', message: '평소와 다른 국가(SG)에서 VPN 접속' },
  { id: 'EVT-24811', time: '2026-06-26 14:22:39', severity: 'high', source: 'EDR', sourceIp: '10.10.4.21', destIp: '203.0.113.12', user: 'svc_backup', eventType: 'Privilege Escalation', action: 'detected', message: 'LSASS 메모리 접근 시도 — credential dumping 의심' },
  { id: 'EVT-24810', time: '2026-06-26 14:20:14', severity: 'medium', source: 'Firewall', sourceIp: '198.51.100.88', destIp: '10.10.1.8', user: '-', eventType: 'Policy Violation', action: 'blocked', message: '허용되지 않은 아웃바운드 포트(4444) 연결 시도' },
  { id: 'EVT-24809', time: '2026-06-26 14:18:50', severity: 'info', source: 'Auth', sourceIp: '10.20.5.40', destIp: '10.10.0.3', user: 'admin', eventType: 'Login Success', action: 'allowed', message: '관리자 콘솔 로그인 성공 (MFA 인증)' },
  { id: 'EVT-24808', time: '2026-06-26 14:16:22', severity: 'high', source: 'WAF', sourceIp: '203.0.113.150', destIp: '10.10.2.40', user: 'anonymous', eventType: 'XSS Attempt', action: 'blocked', message: '<script> 페이로드 포함 폼 전송 차단' },
  { id: 'EVT-24807', time: '2026-06-26 14:14:09', severity: 'low', source: 'IDS/IPS', sourceIp: '10.10.3.18', destIp: '10.10.4.2', user: '-', eventType: 'Suspicious DNS', action: 'detected', message: 'DGA 패턴 의심 도메인 질의 다수 발생' },
  { id: 'EVT-24806', time: '2026-06-26 14:12:47', severity: 'critical', source: 'EDR', sourceIp: '10.10.4.33', destIp: '203.0.113.45', user: 'h.lee', eventType: 'Data Exfiltration', action: 'blocked', message: '외부로 1.2GB 압축 파일 업로드 시도 차단' },
  { id: 'EVT-24805', time: '2026-06-26 14:10:31', severity: 'medium', source: 'VPN', sourceIp: '172.16.8.55', destIp: '10.10.0.1', user: 'm.choi', eventType: 'Concurrent Session', action: 'detected', message: '동일 계정 2개 지역 동시 세션 탐지' },
  { id: 'EVT-24804', time: '2026-06-26 14:08:18', severity: 'high', source: 'Firewall', sourceIp: '203.0.113.201', destIp: '10.10.1.8', user: '-', eventType: 'DDoS', action: 'blocked', message: 'UDP flood — 초당 4.2만 패킷 유입 차단' },
  { id: 'EVT-24803', time: '2026-06-26 14:06:05', severity: 'info', source: 'Auth', sourceIp: '10.20.5.12', destIp: '10.10.0.3', user: 'j.kim', eventType: 'Password Change', action: 'allowed', message: '사용자 비밀번호 정상 변경' },
  { id: 'EVT-24802', time: '2026-06-26 14:03:52', severity: 'low', source: 'EDR', sourceIp: '10.10.4.21', destIp: '-', user: 'svc_backup', eventType: 'New Service', action: 'detected', message: '신규 Windows 서비스 등록 — 검토 필요' },
  { id: 'EVT-24801', time: '2026-06-26 14:01:40', severity: 'medium', source: 'WAF', sourceIp: '203.0.113.66', destIp: '10.10.2.40', user: 'anonymous', eventType: 'Path Traversal', action: 'blocked', message: '../../etc/passwd 접근 시도 차단' },
  { id: 'EVT-24800', time: '2026-06-26 13:59:27', severity: 'high', source: 'IDS/IPS', sourceIp: '198.51.100.5', destIp: '10.10.4.55', user: '-', eventType: 'Exploit Attempt', action: 'detected', message: 'CVE-2026-1337 익스플로잇 시그니처 매칭' },
  { id: 'EVT-24799', time: '2026-06-26 13:57:14', severity: 'info', source: 'VPN', sourceIp: '172.16.8.30', destIp: '10.10.0.1', user: 's.park', eventType: 'Session End', action: 'allowed', message: 'VPN 세션 정상 종료 (1h 24m)' },
  { id: 'EVT-24798', time: '2026-06-26 13:55:01', severity: 'critical', source: 'Auth', sourceIp: '203.0.113.45', destIp: '10.10.0.3', user: 'root', eventType: 'Account Takeover', action: 'blocked', message: '비정상 위치에서 root 계정 인증 성공 후 즉시 차단' },
  { id: 'EVT-24797', time: '2026-06-26 13:52:48', severity: 'low', source: 'Firewall', sourceIp: '10.10.3.18', destIp: '198.51.100.10', user: '-', eventType: 'Geo Block', action: 'blocked', message: '차단 국가 대역 아웃바운드 연결 차단' },
  { id: 'EVT-24796', time: '2026-06-26 13:50:35', severity: 'medium', source: 'EDR', sourceIp: '10.10.4.40', destIp: '-', user: 'y.jung', eventType: 'Macro Execution', action: 'detected', message: 'Office 문서에서 매크로 실행 — 외부 다운로드 시도' },
  { id: 'EVT-24795', time: '2026-06-26 13:48:22', severity: 'high', source: 'WAF', sourceIp: '203.0.113.99', destIp: '10.10.2.40', user: 'anonymous', eventType: 'Credential Stuffing', action: 'blocked', message: '유출 계정 목록 기반 대량 로그인 시도 차단' },
  { id: 'EVT-24794', time: '2026-06-26 13:46:09', severity: 'info', source: 'IDS/IPS', sourceIp: '10.10.3.5', destIp: '10.10.4.2', user: '-', eventType: 'Signature Update', action: 'allowed', message: '탐지 시그니처 DB 자동 업데이트 완료' },
]
