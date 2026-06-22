import type { SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 아이콘 컴포넌트의 기본 Props
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  title?: string;
  className?: string;
}

/**
 * 아이콘 스타일 타입
 * - outline: stroke 기반 (선형)
 * - solid: fill 기반 (채움)
 */
export type IconStyle = 'outline' | 'solid';

/**
 * 아이콘 컴포넌트 타입
 * forwardRef로 생성된 아이콘 컴포넌트
 */
export type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
