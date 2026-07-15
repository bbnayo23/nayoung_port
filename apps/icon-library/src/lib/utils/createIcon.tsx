import React, { forwardRef, type SVGProps } from 'react';
import type { IconProps } from '@il/lib/types';

/**
 * 아이콘 컴포넌트 생성 함수
 * SVG 컴포넌트를 받아 IconProps를 지원하는 React 컴포넌트로 변환
 */
export const createIcon = (SvgComponent: React.FC<SVGProps<SVGSVGElement>>, displayName: string) => {
  const Icon = forwardRef<SVGSVGElement, IconProps>(({ size = 16, color = 'currentColor', title, className, style, ...props }, ref) => {
    return (
      <SvgComponent
        ref={ref}
        width={size}
        height={size}
        fill={color}
        className={className}
        style={{ color, ...style }}
        aria-hidden={title ? undefined : true}
        role={title ? 'img' : undefined}
        {...props}
      >
        {title && <title>{title}</title>}
      </SvgComponent>
    );
  });

  Icon.displayName = displayName;
  return Icon;
};
