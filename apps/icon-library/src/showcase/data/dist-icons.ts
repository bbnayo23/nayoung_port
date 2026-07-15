/**
 * IconImportTest 페이지용 아이콘 데이터
 * 빌드된 패키지에서 직접 import합니다.
 */
import type { IconComponent } from '@il/lib/types';

export interface DistIconItem {
  name: string;
  component: IconComponent;
  solution: 'EXD' | 'SOAR' | 'XDR';
}

// 빌드된 패키지에서 모든 아이콘 import
import * as AllIcons from '@igloo/igloo-icons';

// EXD 아이콘 목록
export const exdDistIcons: DistIconItem[] = Object.entries(AllIcons)
  .filter(([key]) => key.startsWith('Exd') && key.endsWith('Icon'))
  .map(([key, component]) => ({
    name: key.replace(/Icon$/, ''),
    component: component as IconComponent,
    solution: 'EXD'
  }));

// SOAR 아이콘 목록
export const soarDistIcons: DistIconItem[] = Object.entries(AllIcons)
  .filter(([key]) => key.startsWith('Soar') && key.endsWith('Icon'))
  .map(([key, component]) => ({
    name: key.replace(/Icon$/, ''),
    component: component as IconComponent,
    solution: 'SOAR'
  }));

// XDR 아이콘 목록
export const xdrDistIcons: DistIconItem[] = Object.entries(AllIcons)
  .filter(([key]) => key.startsWith('Xdr') && key.endsWith('Icon'))
  .map(([key, component]) => ({
    name: key.replace(/Icon$/, ''),
    component: component as IconComponent,
    solution: 'XDR'
  }));

// 전체 아이콘 목록
export const allDistIcons: DistIconItem[] = [...exdDistIcons, ...soarDistIcons, ...xdrDistIcons];
