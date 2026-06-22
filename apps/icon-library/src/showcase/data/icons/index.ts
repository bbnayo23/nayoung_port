import { exdIcons } from './exd';
import { soarIcons } from './soar';
import { xdrIcons } from './xdr';

// Types 재 export
export type { IconItem, Solution, Menus } from './types';
export { menus } from './types';

// 솔루션별 아이콘 export
export { exdIcons } from './exd';
export { soarIcons } from './soar';
export { xdrIcons } from './xdr';

// 통합 아이콘 목록
export const allIcons = [...exdIcons, ...soarIcons, ...xdrIcons];

// Solution별 아이콘 맵
export const iconsBySolution = {
  EXD: exdIcons,
  SOAR: soarIcons,
  XDR: xdrIcons
} as const;
