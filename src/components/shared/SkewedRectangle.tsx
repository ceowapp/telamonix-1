import React from 'react';
import { cn } from '@/lib/utils';

interface SkewedRectangleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
  skewDeg?: number;
  width?: number | string;
  height?: number | string;
}

const SkewedRectangle = ({
  color,
  skewDeg = -20,
  width,
  height,
  style,
  className,
  ...props
}: SkewedRectangleProps) => {
  const inlineDimensions = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
  };
  return (
    <div
      {...props}
      className={cn(
        "absolute rounded-se-full",
        !width && !height && "w-32 h-10 md:w-40 md:h-12",
        className
      )}
      style={{
        transform: `skewY(${skewDeg}deg)`,
        backgroundColor: `${color}`,
        ...inlineDimensions,
        ...style, 
      }}
    />
  );
};

export default SkewedRectangle;
