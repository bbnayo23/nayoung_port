import type { IconProps } from '@il/lib/types';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

// 솔루션 타입
export type Solution = 'EXD' | 'SOAR' | 'XDR';

// 메뉴 타입 (전체 포함)
export type Menus = '전체' | Solution;

// 메뉴 배열
export const menus: Menus[] = ['전체', 'EXD', 'SOAR', 'XDR'];

export interface IconItem {
  name: string;
  component: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  solution: Solution;
}
