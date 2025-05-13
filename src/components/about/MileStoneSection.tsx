"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import { aboutMileStones, aboutMileStonesHeading } from '@/constants/data';
import SuspenseWrapper from '@/components/shared/SuspenseWrapper';
import Spinner from '../shared/Spinner';
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { HTMLRenderer } from '../shared/HTMLRenderer';

const SearchEngineTimeline = ({ 
  timelineData = [], 
  title = "Timeline", 
  itemComponent: CustomTimelineItem = null 
}) => {
  const [screenSize, setScreenSize] = useState("lg");
  const [canvasNeedsUpdate, setCanvasNeedsUpdate] = useState(true);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const resizeObserverRef = useRef(null);
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newSize;
      if (width >= 1440) newSize = "2xl";
      else if (width >= 1280) newSize = "xl";
      else if (width >= 1024) newSize = "lg";
      else if (width >= 768) newSize = "md";
      else if (width >= 640) newSize = "sm";
      else if (width >= 380) newSize = "sms";
      else newSize = "xs";
      if (newSize !== screenSize) {
        setScreenSize(newSize);
        setCanvasNeedsUpdate(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  const getItemsPerRow = useCallback((screenSize) => {
    const totalItems = timelineData.length;
    if (screenSize === "xs") return Array(totalItems).fill(1);
    switch (screenSize) {
      case "2xl":
        return createRepeatingPattern([4, 3, 4], totalItems);
      case "xl":
        return createRepeatingPattern([4, 3, 4], totalItems);
      case "lg":
        return createRepeatingPattern([3, 3, 3, 2], totalItems);
      case "md":
      case "sms":
        return createRepeatingPattern([2, 2, 2, 2, 2, 1], totalItems);
      case "sm":
        return createRepeatingPattern([2, 1, 2, 1], totalItems);
      default:
        return Array(totalItems).fill(1);
    }
  }, [timelineData.length]);

  const getReadjustedFactor = useMemo(() => {
    const baseFactor = 0.661;
    return {
      xl: baseFactor,
      lg: baseFactor,
      md: baseFactor * 1,
      sms: baseFactor * 1,
      sm: baseFactor * 1,
      xs: baseFactor * 1
    };
  }, []);

  const getRadius = useMemo(() => {
    return {
      '2xl': 100,
      xl: 80,
      lg: 60,
      md: 40,
      sm: 40,
      sms: 40,
      xs: 40
    };
  }, []);

  const createRepeatingPattern = useCallback((pattern, totalItems) => {
    const result = [];
    let itemsPlaced = 0;
    while (itemsPlaced < totalItems) {
      for (let i = 0; i < pattern.length && itemsPlaced < totalItems; i++) {
        const itemsToAdd = Math.min(pattern[i], totalItems - itemsPlaced);
        result.push(itemsToAdd);
        itemsPlaced += itemsToAdd;
      }
    }
    
    return result;
  }, []);

  const updateCanvasPosition = () => {
    if (!containerRef.current || !canvasRef.current) return;
    const firstRow = containerRef.current.querySelector('.timeline-row.first');
    const lastRow = containerRef.current.querySelector('.timeline-row.last');
    if (firstRow && lastRow) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const firstRect = firstRow.getBoundingClientRect();
      const lastRect = lastRow.getBoundingClientRect();
      const topOffset = firstRect.top - containerRect.top;
      const bottomOffset = lastRect.bottom - containerRect.top;
      canvasRef.current.style.top = `${topOffset}px`;
      canvasRef.current.style.height = `${bottomOffset - topOffset}px`;
    }
  };

  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth;
        let newSize;
        if (width >= 1440) newSize = "2xl";
        else if (width >= 1280) newSize = "xl";
        else if (width >= 1024) newSize = "lg";
        else if (width >= 768) newSize = "md";
        else if (width >= 640) newSize = "sm";
        else if (width >= 380) newSize = "sms";
        else newSize = "xs";
        if (newSize !== screenSize) {
          setScreenSize(newSize);
          setCanvasNeedsUpdate(true);
        }
      }, 100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [screenSize]);

  const timelineRows = useMemo(() => {
    if (timelineData.length === 0) return [];
    const itemsPerRow = getItemsPerRow(screenSize);
    const rows = [];
    let dataIndex = 0;
    for (let i = 0; i < itemsPerRow.length && dataIndex < timelineData.length; i++) {
      const rowCount = itemsPerRow[i];
      const rowItems = [];
      for (let j = 0; j < rowCount && dataIndex < timelineData.length; j++) {
        rowItems.push(timelineData[dataIndex]);
        dataIndex++;
      }
      rows.push(rowItems);
    }
    return rows;
  }, [screenSize, timelineData, getItemsPerRow]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !canvasNeedsUpdate) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const timeLineItemHeight = 396;
    const adjustedFactor = getReadjustedFactor[screenSize] || getReadjustedFactor.lg;
    let animationFrameId;
    const drawTimeline = () => {
      const dpr = window.devicePixelRatio || 1;
      const containerRect = container.getBoundingClientRect();
      canvas.width = containerRect.width * dpr;
      canvas.height = containerRect.height * dpr;
      canvas.style.width = `${containerRect.width}px`;
      canvas.style.height = `${containerRect.height}px`;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, containerRect.width, containerRect.height);
      if (timelineRows.length === 0) return;
      ctx.strokeStyle = '#00D4FF';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      const rowHeight = containerRect.height / timelineRows.length;
      const containerWidth = containerRect.width;
      const margin = screenSize === 'sms' ? containerWidth * 0.05 : containerWidth * 0.1; 
      const lineWidth = containerWidth - (margin * 2);
      const radius = getRadius[screenSize] || getRadius.lg; 
      const lastRowIndex = timelineRows.length - 1;
      ctx.beginPath();
      timelineRows.forEach((row, rowIndex) => {
        const isEvenRow = rowIndex % 2 === 0;
        const y = timeLineItemHeight * (rowIndex + adjustedFactor);
        const prevY = rowHeight * (rowIndex - 0.5);
        if (!isEvenRow) {
            if(rowIndex === lastRowIndex) {
              ctx.lineTo(containerWidth - margin, y - radius);
              ctx.quadraticCurveTo(
                containerWidth - margin, y, 
                containerWidth - margin - radius, y
              );
              ctx.lineTo(margin + radius, y);
            } else {
              ctx.lineTo(containerWidth - margin, y - radius);
              ctx.quadraticCurveTo(
                containerWidth - margin, y, 
                containerWidth - margin - radius, y
              );
              ctx.lineTo(margin + radius, y);
              ctx.quadraticCurveTo(
                margin, y,
                margin, y + radius
              );
            }
        } else {
          if (rowIndex === 0) {
            ctx.moveTo(0, y);
            ctx.lineTo(containerWidth - margin - radius, y);
            ctx.quadraticCurveTo(
              containerWidth - margin, y,
              containerWidth - margin, y + radius
            );
          } else if(rowIndex === lastRowIndex) {
             ctx.lineTo(margin, y - radius);
            ctx.quadraticCurveTo(
              margin, y,
              margin + radius, y
            );
            ctx.lineTo(containerWidth, y);
          } else {
            ctx.lineTo(margin, y - radius);
            ctx.quadraticCurveTo(
              margin, y,
              margin + radius, y
            );
            ctx.lineTo(containerWidth - margin - radius, y);
            ctx.quadraticCurveTo(
              containerWidth - margin, y,
              containerWidth - margin, y + radius
            );
          }
        }
      });
      ctx.stroke();
    };
    animationFrameId = requestAnimationFrame(drawTimeline);
    setCanvasNeedsUpdate(false);
    if (!resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        setCanvasNeedsUpdate(true);
      });
      resizeObserverRef.current.observe(container);
    }
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [timelineRows, canvasNeedsUpdate, screenSize, getReadjustedFactor]);

 useEffect(() => {
    return () => {
      if (resizeObserverRef.current && containerRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    setCanvasNeedsUpdate(true);
  }, [timelineRows]);

  return (
    <div ref={containerRef} className="w-full relative mx-auto">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-x-0 z-0 pointer-events-none"
      />
      <div className="w-full flex flex-col justify-center items-center px-4 sm:px-0">
        {timelineRows.map((row, rowIndex) => (
          <div 
            key={`row-${rowIndex}`} 
            className={`
              timeline-row 
              ${rowIndex === 0 ? 'first' : ''} 
              ${rowIndex === timelineRows.length - 1 ? 'last' : ''} 
              relative flex max-w-screen-xl space-x-12 justify-evenly items-start mb-24 h-[300px]
            `}
          >
            {row.map((item) => (
              CustomTimelineItem ? 
                <CustomTimelineItem key={item.id} item={item} /> : 
                <div key={item.id} className="w-full flex items-center justify-center">
                  <div className="absolute -top-16 aspect-square mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={item.imageSrc}
                      alt={title}
                      width={80}
                      height={80}
                    />
                  </div>
                  <TimelineItem key={item.id} {...item} />
                </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const TimelineItem = React.memo(function TimelineItem({ 
  year, 
  title = "Search Engine", 
  description, 
  imageUrl = "/images/pages/offer-1.png" 
}) {
  const displayDescription = description || "Building large data organization systems – high performance, distributed, high load, etc. for companies such as Vimfast and Vinhomes.";
  return (
    <div className="relative flex flex-col items-center top-[40px] max-w-[150px] sm:max-w-[200px] text-center mx-auto">
      <div
        className="
          timeline-dot
          absolute
          top-[220px]
          -translate-y-1/2
          w-10
          h-10
          bg-[#9EF5FF]
          rounded-full
          z-20
          shadow-md
        "
      />
      <div className="mb-8 w-full h-full">
        <h3 className="text-title-medium-black">{title}</h3>
        <p className="text-body-regular-black max-w-xs">
          {displayDescription}
        </p>
        <div className="text-title-small-teriary-1 mt-2">{year}</div>
      </div>
    </div>
  );
});

interface MileStoneSectionProps {
  title?: string;
  timelineData?: any[];
  itemComponent?: React.ComponentType<any> | null;
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  language?: 'en' | 'vi' | 'zh';
  loading?: boolean;
  error?: string | null;
}

const HeaderFallback = React.memo(({  
  data, 
  language = 'en',
  loading = false, 
  error = null 
}: MileStoneSectionProps) => {
  return (
    <div className="flex items-center justify-center px-4 mb-32">
      <div className="w-full sm:max-w-2xl lg:max-w-3xl">
        <div className="text-center">
          <h2 className="text-display-regular-black mb-2 sm:mb-4">
            {data?.title || aboutMileStonesHeading.title}
            <span className="text-display-regular-gradient-1 ml-2">
              {data?.subtitle || aboutMileStonesHeading.subtitle}
            </span>
          </h2>
          <p className="text-body-regular-black">
            {data?.description || aboutMileStonesHeading.description}
          </p>
        </div>
      </div>
    </div>
  );
});

const BodyFallback: React.FC<MileStoneSectionProps> = ({ 
  milestones, 
  itemComponent, 
}) => {
  return (
    <SearchEngineTimeline 
      timelineData={milestones} 
      itemComponent={itemComponent}
    />
  );
};

const MileStoneSection: React.FC<MileStoneSectionProps> = ({ 
  title = "Search Engine Timeline",
  timelineData = aboutMileStones,
  itemComponent = null,
  data,
  language = 'en',
  loading = false,
  error = null 
}) => {
  const milestones = React.useMemo(() => {
    return data?.sectionjson && Array.isArray(data.sectionjson) && data.sectionjson.length > 0
      ? data.sectionjson
      : aboutMileStones;
  }, [data?.sectionjson]);
  const contentBlocks = useMemo(() => (
    Array.isArray(data?.contentBlocks) && data.contentBlocks.length > 0 
      ? data.contentBlocks 
      : []
  ), [data?.contentBlocks]);
  const headerBlock = useMemo(() => 
    contentBlocks.find(block => block.blockId === 'header'),
  [contentBlocks]);
  const bodyBlock = useMemo(() => 
    contentBlocks.find(block => block.blockId === 'body'),
  [contentBlocks]);
  if (checkValidHTML(data?.codeField)) {
    return <HTMLRenderer data={data?.codeField} />;
  }
  return (
    <section className="w-full mx-auto pt-6 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24">
      {checkValidHTML(headerBlock?.codeField) ? (
        <HTMLRenderer data={headerBlock.codeField} />
      ) : (
        <HeaderFallback data={data} />
      )}
      <SuspenseWrapper fallback={<Spinner />}>
        {checkValidHTML(bodyBlock?.codeField) ? (
          <HTMLRenderer data={bodyBlock.codeField} />
        ) : (
          <BodyFallback 
            milestones={milestones}
            itemComponent={itemComponent}
          />
        )}
      </SuspenseWrapper>
    </section>
  );
};

export default React.memo(MileStoneSection);