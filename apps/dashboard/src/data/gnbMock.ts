import type { DownloadItem, NotificationItem, AssistantMessage } from '@port/design-system'

// GNB 다운로드/알림 드롭다운용 데모 데이터 (Figma igloo-design 329:394 · 329:237)
export const downloads: DownloadItem[] = [
  { id: 'd1', name: 'alert_export_20260508.csv', status: 'progress', loaded: 2.4, total: 3.8, unit: 'MB' },
  { id: 'd2', name: 'log_archive_20260508.zip', status: 'progress', loaded: 156, total: 480, unit: 'MB' },
  { id: 'd3', name: 'weekly_report_2026W19.pdf', status: 'done', size: '4.2 MB', time: '12:32' },
  { id: 'd4', name: 'incident_INC-2847_detail.json', status: 'done', size: '88 KB', time: '11:58' },
  { id: 'd5', name: 'audit_log_q1.xlsx', status: 'failed' },
]

export const notifications: NotificationItem[] = [
  { id: 'n1', level: 'critical', text: 'INC-2847 악성코드 감지 · web-prod-04', time: '12:47:08', status: '나에게 배정됨' },
  { id: 'n2', level: 'high', text: 'api-gateway-02 이상 외부 트래픽', time: '12:24:30', status: '미배정' },
  { id: 'n3', level: 'high', text: 'finance-db DLP 규칙 위반', time: '12:06:11', status: '결재 대기' },
  { id: 'n4', level: 'medium', text: 'PCI DSS 재스캔 완료 · 92%', time: '11:38:04', status: '8건 실패 항목' },
  { id: 'n5', level: 'ok', text: 'hr-share-02 격리 완료', time: '10:21:09', status: '자동 플레이북' },
]

// AI Assistant 데모 대화
export const aiGreeting: AssistantMessage = {
  role: 'ai',
  text: '안녕하세요, Sarah. 오늘 탐지된 366,538건의 경보 중 치명도 8건을 우선적으로 확인해보세요. 무엇을 도와드릴까요?',
  chips: ['INC-2847 요약', '오늘 경보 원인 분석', '외부 트래픽 이상 탐지'],
}

// 데모용 캔드 응답 — 실제 LLM 연동 없이 시나리오만 재현한다.
export function aiReply(q: string): string {
  if (q.includes('INC-2847')) {
    return 'INC-2847 · web-prod-04에서 감지된 명령/제어(C2) 통신입니다.\n• MITRE: T1071 (Application Layer Protocol)\n• 프로세스 자동 격리됨 (PB-MAL-001)\n• 추가 자산 확산 징후 없음\n조사 단계를 제안드릴까요?'
  }
  if (q.includes('원인')) {
    return '오늘 경보의 62%는 외부 스캔, 24%는 정책 위반, 14%는 악성코드 탐지에서 발생했습니다. 상위 원인부터 살펴볼까요?'
  }
  if (q.includes('외부 트래픽')) {
    return '최근 1시간 외부 트래픽 중 3개 대역에서 이상 급증이 감지됐습니다. 해당 IP의 평판 조회를 진행할까요?'
  }
  return '요청을 확인했습니다. 관련 로그와 경보를 함께 살펴보겠습니다. (데모 응답)'
}
