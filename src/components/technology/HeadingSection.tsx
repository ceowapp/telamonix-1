"use client"
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import type { Page } from '@/payload-types'
import { technologyHeading, technologyChips } from '@/constants/data';
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { HTMLRenderer } from '../shared/HTMLRenderer';

interface HeadingSectionProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  language?: 'en' | 'vi' | 'zh';
  loading?: boolean;
  error?: string | null;
}

const FallbackComponent = React.memo(({  
  data, 
  language = 'en',
  loading = false, 
  error = null 
}: HeadingSectionProps) => {
  const chips = React.useMemo(
    () => (Array.isArray(data?.sectionjson) ? data.sectionjson : technologyChips),
    [data?.sectionjson]
  );
  const [radius, setRadius] = useState(50);
  const updateRadius = useCallback(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= 1536) {
        setRadius(50);
      } else if (width >= 1280) {
        setRadius(48);
      } else if (width >= 1024) {
        setRadius(45);
      }
    }
  }, []);

  const calculateWidth = useMemo(() => (text, isDescription = false) => {
    const charWidth = isDescription ? 10 : 10;
    return text ? Math.min(Math.max(text.length * charWidth, 200), 450) : 200;
  }, []);

  const calculateCombinedWidth = useMemo(() => (label, description) => {
    const labelCharWidth = 10;
    const descCharWidth = 10;
    const labelWidth = label ? label.length * labelCharWidth : 0;
    const descWidth = description ? description.length * descCharWidth : 0;
    return Math.min(Math.max(labelWidth + descWidth, 250), 450);
  }, []);

  useEffect(() => {
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, [updateRadius]);

  const chipPositions = useMemo(() => {
    return chips.map((item, index) => {
      let position = {};
      let isVertical = false;
      if (index === 0) {
        position = { top: 0, left: 50, isVertical: true };
        isVertical = true;
      } else if (index >= 1 && index <= 3) {
        const leftPosition = 15 + (index - 1) * 5;
        const topOffset = 20 + (index - 1) * 30;
        position = { top: topOffset, left: leftPosition, isVertical: true };
        isVertical = true;
      } else if (index === 4) {
        position = { top: 100, left: 50, isVertical: true };
        isVertical = true;
      } else if (index >= 5 && index <= 8) {
        const rightPosition = 85;
        const topOffset = 20 + (index - 5) * 20;
        position = { top: topOffset, left: rightPosition, isVertical: false };
      } else {
        position = { top: 50, left: 50, isVertical: false };
      }
      let chipWidth;
      if (isVertical) {
        const descriptionWidth = calculateWidth(item.description, true);
        const labelWidth = calculateWidth(item.label);
        chipWidth = Math.max(descriptionWidth, labelWidth);
      } else {
        chipWidth = calculateCombinedWidth(item.label, item.description);
      }
      return {
        ...position,
        chipWidth,
        item
      };
    });
  }, [calculateWidth, calculateCombinedWidth]);
  const DesktopView = useCallback(() => (
    <div className="hidden xl:flex justify-center items-center w-full aspect-square max-w-screen-xl max-h-[600px] relative">
      <div className="absolute w-full h-full flex justify-center items-center">
        <div className="relative w-[80%] h-[80%]">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl"></div>
          <div className="relative z-10 w-full h-full rounded-full flex justify-center items-center">
            <h2 className="text-display-medium-white max-w-xs text-center">
              {data?.title || technologyHeading.title}
            </h2>
          </div>
        </div>
      </div>
      {chipPositions.map(({ top, left, isVertical, chipWidth, item }, index) => (
        <div
          key={`desktop-${index}`}
          className="absolute bg-white/25 backdrop-blur-[24px] text-white px-4 py-2 rounded-full shadow-lg border-[1px] border-white/60 transition-all transform hover:scale-105 text-center z-10"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            transform: 'translate(-50%, -50%)',
            width: `${chipWidth}px`
          }}
        >
          <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} items-center justify-center w-full`}>
            <p className={`text-body-large-white-1 !leading-tight ${!isVertical ? 'mr-2' : 'mb-1'} ${!isVertical ? 'whitespace-nowrap' : ''}`}>
              {item.label}
            </p>
            {item.description && (
              <p className={`text-body-large-white-2 !leading-tight ${!isVertical ? 'whitespace-nowrap' : ''}`}>
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  ), [chipPositions]);

  const MobileView = useCallback(() => (
    <div className="xl:hidden flex flex-col items-center justify-start w-full my-auto">
      <div className="mb-8 text-center">
        <h2 className="text-display-medium-white">
          {data?.title || technologyHeading.title}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full z-10">
        {chips.map((item, index) => (
          <div
            key={`mobile-${index}`}
            className="bg-white/25 backdrop-blur-[24px] text-white p-3 rounded-xl shadow-lg border-[1px] border-blue-500/50 transition-all transform hover:scale-105 text-center"
          >
            <div className="flex flex-col items-center justify-center w-full">
              <p className="text-body-large-white-1 mb-1 w-full overflow-hidden text-ellipsis">
                {item.label}
              </p>
              {item.description && (
                <p className="text-body-large-white-2 w-full overflow-hidden text-ellipsis">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ), []);

  return (
    <div className="relative flex justify-center items-center w-full lg:h-[850px] pt-[80px]">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full relative">
          <Image
            src="/images/pages/technology/compressed_technology-1.png"
            blurDataURL={"/images/pages/technology/low_res_technology-1.png"}
            placeholder="blur"
            alt="Background"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
      <div className="relative w-full max-w-7xl mx-auto p-6 flex flex-col items-center">
        <DesktopView />
        <MobileView />
      </div>
    </div>
  );
});

const HeadingSection: React.FC<HeadingSectionProps> = ({ 
  data,
  language = 'en', 
  loading = false,
  error = null 
}) => {
  if (!checkValidHTML(data?.codeField)) {
    return <FallbackComponent data={data} />;
  }
  return <HTMLRenderer data={data.codeField} />;
};

export default React.memo(HeadingSection);
