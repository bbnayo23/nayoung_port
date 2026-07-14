import type { DownloadItem, NotificationItem } from '@port/design-system'

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
