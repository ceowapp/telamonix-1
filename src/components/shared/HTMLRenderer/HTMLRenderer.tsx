import React, { useMemo } from "react";
import DOMPurify from "dompurify";
import { checkValidHTML } from '@/utilities/checkValidHTML';
import type { Page } from '@/payload-types';
import './index.scss';

interface HTMLRendererProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  language?: string;
  className?: string;
}

export const HTMLRenderer: React.FC<HTMLRendererProps> = ({ 
  data, 
  language = 'en',
  className 
}) => {
  if (!checkValidHTML(data)) {
    return <div className="html-renderer-empty">No content available</div>;
  }
  const sanitizedHTML = useMemo(() => {
   const purifyConfig = {
    ALLOWED_ATTR: [
      'href', 'target', 'class', 'id', 'style', 'src', 'alt', 'width', 'height',
      'controls', 'autoplay', 'loop', 'muted', 'playsinline', 'type', 
      'rel', 'aria-label', 'role', 'tabindex', 'download'
    ],
    ADD_ATTR: ["xmlns", "width", "height", "viewBox", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "cx", "cy", "r", "x", "y", "d", "points"],
    ADD_TAGS: ["svg", "path", "circle", "g", "rect", "line", "polyline", "polygon", "ellipse", "text", "tspan"],
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed'],
  };
    return DOMPurify.sanitize(data, purifyConfig);
  }, [data]);

  return (
    <div 
      className={`dangerous-html-renderer ${className || 'w-full h-full'}`}
      data-language={language || 'html'}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }} 
      suppressHydrationWarning
    />
  );
};
