'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

interface InterSectionCarouselItem {
  id: string | number;
  content: React.ReactNode;
}

interface InterSectionCarouselProps {
  items: InterSectionCarouselItem[];
  repetitions?: number;
  responsive?: {
    breakpoint: number;
    itemsPerView: number;
    gap: number;
  }[];
  className?: string;
  itemClassName?: string;
  navigationButtons?: {
    prev?: React.ReactNode;
    next?: React.ReactNode;
  };
  isHoverEffect?: boolean;
  withSlideIndicator?: boolean;
  containerWidth?: string;
  isInfinite?: boolean;
  setHoveredIndex?: (index: number | null) => void;
  hoveredIndex?: number | null;
  autoScrollInterval?: number;
}

interface CachedDimensions {
  itemWidth: number;
  itemsPerView: number;
  gap: number;
}

export const InterSectionCarousel: React.FC<InterSectionCarouselProps> = ({
  items,
  repetitions = 2,
  responsive = [
    { breakpoint: 360, itemsPerView: 1, gap: 0 },
    { breakpoint: 480, itemsPerView: 1, gap: 0 },
    { breakpoint: 640, itemsPerView: 1, gap: 0 },
    { breakpoint: 768, itemsPerView: 1, gap: 0 },
    { breakpoint: 1024, itemsPerView: 1, gap: 0 },
    { breakpoint: 1280, itemsPerView: 1, gap: 0 },
    { breakpoint: 1536, itemsPerView: 1, gap: 0 },
  ],
  withSlideIndicator = false,
  className = "",
  itemClassName = "",
  navigationButtons,
  isHoverEffect = false,
  isInfinite = false,
  containerWidth = "max-w-screen-xl",
  setHoveredIndex,
  hoveredIndex,
  autoScrollInterval = 3000
}) => {
  const router = useRouter();
  const InterSectionCarouselRef = useRef<HTMLDivElement>(null);
  const dimensionsCacheRef = useRef<Map<number, CachedDimensions>>(new Map());
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState(responsive[0].breakpoint);
  const [dimensions, setDimensions] = useState<CachedDimensions>({
    itemWidth: 0,
    itemsPerView: responsive[0].itemsPerView,
    gap: responsive[0].gap
  });
  const [isInitialized, setIsInitialized] = useState(false);
  
  const extendedItems = useMemo(() => {
    return Array(repetitions).fill(items).flat();
  }, [items, repetitions]);

  const getResponsiveConfig = useCallback((width: number) => {
    const sortedResponsive = [...responsive].sort((a, b) => a.breakpoint - b.breakpoint);
    return sortedResponsive.find((r, index) => {
      const nextBreakpoint = sortedResponsive[index + 1]?.breakpoint ?? Infinity;
      return width >= r.breakpoint && width < nextBreakpoint;
    }) || sortedResponsive[0];
  }, [responsive]);

  const calculateDimensionsForBreakpoint = useCallback((breakpoint: number, containerWidth: number) => {
    const config = getResponsiveConfig(breakpoint);
    const itemWidth = containerWidth - (config.gap * 2);
    const dimensions = {
      itemWidth,
      itemsPerView: config.itemsPerView,
      gap: config.gap
    };
    return dimensions;
  }, [getResponsiveConfig]);

  const updateLayout = useCallback(() => {
    if (!InterSectionCarouselRef.current) return;
    const containerWidth = InterSectionCarouselRef.current.offsetWidth;
    const screenWidth = window.innerWidth;
    const config = getResponsiveConfig(screenWidth);
    setCurrentBreakpoint(config.breakpoint);
    const newDimensions = calculateDimensionsForBreakpoint(config.breakpoint, containerWidth);
    setDimensions(newDimensions);
    if (!isInitialized) {
      if (isInfinite) {
        const totalItems = extendedItems.length;
        const middleIndex = Math.floor(totalItems / 2);
        const initialScrollPosition = middleIndex * (newDimensions.itemWidth + newDimensions.gap);
        InterSectionCarouselRef.current.scrollLeft = initialScrollPosition;
      }
      setIsInitialized(true);
    } 
  }, [getResponsiveConfig, calculateDimensionsForBreakpoint, items.length, isInfinite, isInitialized, dimensions]);

  useEffect(() => {
    updateLayout();
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateLayout, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    if (!InterSectionCarouselRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === InterSectionCarouselRef.current) {
          updateLayout();
        }
      }
    });
    resizeObserver.observe(InterSectionCarouselRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const InterSectionCarousel = InterSectionCarouselRef.current;
    if (!InterSectionCarousel) return;
    let startX: number;
    let startY: number;
    let scrollLeft: number;
    let isScrolling: boolean;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].pageX - InterSectionCarousel.offsetLeft;
      startY = e.touches[0].pageY - InterSectionCarousel.offsetTop;
      scrollLeft = InterSectionCarousel.scrollLeft;
      isScrolling = false;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].pageX - InterSectionCarousel.offsetLeft;
      const y = e.touches[0].pageY - InterSectionCarousel.offsetTop;
      const deltaX = Math.abs(x - startX);
      const deltaY = Math.abs(y - startY);
      if (deltaX > deltaY && deltaX > 10) {
        e.preventDefault();
        isScrolling = true;
        const walk = (x - startX) * 2;
        InterSectionCarousel.scrollLeft = scrollLeft - walk;
      }
    };
    
    const handleTouchEnd = () => {
      isScrolling = false;
    };
    
    InterSectionCarousel.addEventListener('touchstart', handleTouchStart, { passive: false });
    InterSectionCarousel.addEventListener('touchmove', handleTouchMove, { passive: false });
    InterSectionCarousel.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      InterSectionCarousel.removeEventListener('touchstart', handleTouchStart);
      InterSectionCarousel.removeEventListener('touchmove', handleTouchMove);
      InterSectionCarousel.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (!InterSectionCarouselRef.current || !isInitialized) return;
    const scrollLeft = InterSectionCarouselRef.current.scrollLeft;
    const containerWidth = InterSectionCarouselRef.current.offsetWidth;
    const scrollWidth = InterSectionCarouselRef.current.scrollWidth;
    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(Math.ceil(scrollLeft + containerWidth) >= scrollWidth);
  }, [dimensions, items.length, isInfinite, repetitions, isInitialized]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!InterSectionCarouselRef.current || !isInitialized) return;
    const containerWidth = InterSectionCarouselRef.current.offsetWidth;
    const itemTotalWidth = dimensions.itemWidth + dimensions.gap;
    const scrollAmount = itemTotalWidth;
    const currentScroll = InterSectionCarouselRef.current.scrollLeft;
    const scrollWidth = InterSectionCarouselRef.current.scrollWidth;
    let newScrollLeft;
    
    if (direction === 'right') {
      if (Math.ceil(currentScroll + containerWidth) >= scrollWidth) {
        newScrollLeft = 0;
      } else {
        newScrollLeft = currentScroll + scrollAmount;
      }
    } else {
      if (currentScroll <= 0) {
        newScrollLeft = scrollWidth - containerWidth;
      } else {
        newScrollLeft = currentScroll - scrollAmount;
      }
    }
    
    InterSectionCarouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  }, [dimensions, items.length, isInitialized]);

  useEffect(() => {
    if (autoScrollInterval > 0 && isInitialized) {
      const autoScrollTimer = setInterval(() => {
        scroll('right');
      }, autoScrollInterval);

      return () => clearInterval(autoScrollTimer);
    }
  }, [scroll, autoScrollInterval, isInitialized]);

  return (
    <div className="flex flex-col items-center gap-4 w-full relative">
      <motion.div className="relative flex items-center w-full">
        <div
          ref={InterSectionCarouselRef}
          className="flex scroll-smooth justify-start items-center w-full overflow-x-auto no-scrollbar"
          style={{ 
              gap: `${dimensions.gap}px`,
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              visibility: isInitialized ? 'visible' : 'hidden',
              WebkitOverflowScrolling: 'touch'
          }}
          onScroll={handleScroll}
        >
          {extendedItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className={`flex-none cursor-pointer scroll-snap-align-start ${itemClassName}`}
              style={{
                width: `${dimensions.itemWidth}px`,
                minWidth: `${dimensions.itemWidth}px`,
                opacity: isInitialized ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            >
              {item.content}
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {withSlideIndicator && isInitialized && (
        <div className="flex items-center gap-2 mt-1 overflow-x-auto no-scrollbar">
          {items.map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-300 rounded-full flex-shrink-0
                ${index === activeIndex 
                  ? 'w-8 sm:w-12 h-[7px] bg-purple-500' 
                  : 'w-1 h-[7px] bg-gray-300'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(InterSectionCarousel);