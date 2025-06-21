'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface SlideData {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonUrl?: string;
}

interface HeadingProps {
  title?: string;
  subtitle?: string;
  slides?: SlideData[];
}

const defaultSlides: SlideData[] = [
  {
    id: 1,
    image: "/images/pages/home/app-1.png",
    title: "AI Robotics",
    description: "Enter A17 Pro Game‑changing chip Groundbreaking performance"
  },
  {
    id: 2,
    image: "/images/pages/home/app-2.png",
    title: "Quantum Computing",
    description: "Revolutionary quantum processing capabilities for next-gen solutions"
  },
  {
    id: 3,
    image: "/images/pages/home/app-3.png",
    title: "Neural Networks",
    description: "Advanced neural processing with cutting-edge AI technology"
  },
  {
    id: 4,
    image: "/images/pages/home/app-4.png",
    title: "Advanced Robotics",
    description: "Next-generation robotic systems with AI integration"
  },
  {
    id: 5,
    image: "/images/pages/home/app-5.png",
    title: "Brain Interface",
    description: "Direct neural interface technology for seamless interaction"
  }
];

// Carousel Hook
const useCarousel = (slides: SlideData[], autoPlayInterval = 5000) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextSlide, autoPlayInterval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, nextSlide, autoPlayInterval]);

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    isAutoPlaying
  };
};

// Animated Background Component
const FuturisticBackground: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-cyan-900/30" />

      {/* Animated geometric shapes - responsive count */}
      <div className="absolute inset-0">
        {Array.from({ length: windowWidth < 768 ? 6 : 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute border border-cyan-400/20 rounded-lg animate-float-rotate"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${15 + Math.random() * (windowWidth < 768 ? 25 : 40)}px`,
              height: `${15 + Math.random() * (windowWidth < 768 ? 25 : 40)}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>

      {/* Glowing orbs - responsive count */}
      <div className="absolute inset-0">
        {Array.from({ length: windowWidth < 768 ? 4 : 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${6 + Math.random() * (windowWidth < 768 ? 8 : 12)}px`,
              height: `${6 + Math.random() * (windowWidth < 768 ? 8 : 12)}px`,
              background: `radial-gradient(circle, ${['#00f5ff', '#8b5cf6', '#f59e0b', '#10b981'][Math.floor(Math.random() * 4)]}40 0%, transparent 70%)`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Futuristic grid tiles - responsive grid */}
      <div className="absolute inset-0 opacity-20 sm:opacity-30">
        <div className="grid grid-cols-8 grid-rows-6 sm:grid-cols-12 sm:grid-rows-8 h-full w-full gap-px">
          {Array.from({ length: windowWidth < 640 ? 48 : 96 }).map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-400/10 animate-tile-glow"
              style={{
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${4 + Math.random() * 6}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Scanning lines */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-scan-horizontal" />
        <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-400/60 to-transparent animate-scan-vertical" />
      </div>

      {/* Corner glows - responsive sizing */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-radial from-cyan-500/20 to-transparent rounded-full blur-2xl sm:blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-2xl sm:blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-2xl sm:blur-3xl animate-breath" />
    </div>
  );
};

// Enhanced Carousel Component
const FuturisticCarousel: React.FC<{
  slides: SlideData[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  isMobile: boolean;
}> = ({ slides, currentSlide, onSlideChange, isMobile }) => {

  const getSlideStyle = (index: number) => {
    const position = index - currentSlide;
    const isActive = index === currentSlide;

    if (isMobile) {
      // Mobile: Simple stack layout
      if (isActive) {
        return {
          transform: 'translateX(0%) translateY(0%) scale(1)',
          zIndex: 10,
          opacity: 1,
          left: '50%',
          top: '50%',
          marginLeft: '-45%',
          marginTop: '-40%',
          width: '90%',
          height: '80%'
        };
      } else {
        return {
          transform: 'translateX(0%) translateY(0%) scale(0.8)',
          zIndex: 1,
          opacity: 0,
          left: '50%',
          top: '50%',
          marginLeft: '-45%',
          marginTop: '-40%',
          width: '90%',
          height: '80%'
        };
      }
    }

    // Desktop: 3D carousel effect
    if (isActive) {
      return {
        transform: 'translateX(0%) translateY(0%) scale(1)',
        zIndex: 10,
        opacity: 1,
        right: '0%',
        top: '0%',
        width: '100%',
        height: '100%'
      };
    }

    const baseRight = 200 + (position * 225);
    const isVisible = Math.abs(position) <= 3;

    return {
      transform: `translateX(-50%) translateY(-50%) scale(${isVisible ? (Math.abs(position) > 2 ? 0.6 : 0.8) : 0.4})`,
      right: `${baseRight}px`,
      top: '50%',
      opacity: isVisible ? (Math.abs(position) > 2 ? 0.4 : 0.8) : 0,
      zIndex: isVisible ? 5 - Math.abs(position) : 0,
      width: isVisible ? (Math.abs(position) > 2 ? '140px' : '180px') : '120px',
      height: isVisible ? (Math.abs(position) > 2 ? '200px' : '300px') : '180px'
    };
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute cursor-pointer transition-all duration-700 ease-out rounded-xl sm:rounded-2xl backdrop-blur-sm border ${
            index === currentSlide
              ? 'bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20 border-cyan-400/50 shadow-xl sm:shadow-2xl shadow-cyan-500/25'
              : 'bg-gray-800/40 border-purple-500/20'
          }`}
          style={getSlideStyle(index)}
          onClick={() => onSlideChange(index)}
        >
          <div className="relative w-full h-full overflow-hidden rounded-xl sm:rounded-2xl">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {index === currentSlide && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
                <div className="absolute inset-0 animate-border-glow rounded-xl sm:rounded-2xl" />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Enhanced Content Display Component
const SlideContent: React.FC<{ slide: SlideData; isMobile: boolean }> = ({ slide, isMobile }) => (
  <div className={`absolute z-20 transition-all duration-500 ${
    isMobile
      ? 'bottom-4 left-4 right-4 text-center'
      : 'top-1/2 left-4 sm:left-6 transform -translate-y-1/2 max-w-xs sm:max-w-md'
  }`}>
    <div className="relative">
      <h2 className={`text-white font-bold mb-2 sm:mb-4 opacity-90 relative ${
        isMobile ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl md:text-3xl'
      }`}>
        <span className="relative z-10">{slide.title}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-lg scale-110 animate-pulse" />
      </h2>
      <div className="relative">
        <p className={`text-gray-300 leading-relaxed relative z-10 ${
          isMobile ? 'text-xs sm:text-sm mb-2' : 'text-sm md:text-base mb-4 sm:mb-6'
        }`}>
          {slide.description}
        </p>
        {!isMobile && (
          <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-500 animate-pulse" />
        )}
      </div>
    </div>
  </div>
);

// Navigation Component
const CarouselNavigation: React.FC<{
  onPrev: () => void;
  onNext: () => void;
  currentSlide: number;
  totalSlides: number;
  onDotClick: (index: number) => void;
  isMobile: boolean;
}> = ({ onPrev, onNext, currentSlide, totalSlides, onDotClick, isMobile }) => (
  <div className={`absolute z-20 flex items-center space-x-2 sm:space-x-4 ${
    isMobile
      ? 'bottom-2 left-1/2 transform -translate-x-1/2'
      : 'bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2'
  }`}>
    <button
      onClick={onPrev}
      className={`rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center text-white hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/25 ${
        isMobile ? 'w-8 h-8' : 'w-10 h-10 sm:w-12 sm:h-12'
      }`}
    >
      <svg className={isMobile ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <div className="flex space-x-1 sm:space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`rounded-full transition-all duration-300 relative ${
            isMobile ? 'w-2 h-2' : 'w-2.5 h-2.5 sm:w-3 sm:h-3'
          } ${
            index === currentSlide
              ? 'bg-gradient-to-r from-cyan-400 to-purple-500 scale-125 shadow-lg shadow-cyan-400/50'
              : 'bg-white/30 hover:bg-white/50'
          }`}
        >
          {index === currentSlide && (
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-ping" />
          )}
        </button>
      ))}
    </div>

    <button
      onClick={onNext}
      className={`rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center text-white hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/25 ${
        isMobile ? 'w-8 h-8' : 'w-10 h-10 sm:w-12 sm:h-12'
      }`}
    >
      <svg className={isMobile ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
);

// Main Component
const HeadingSection: React.FC<HeadingProps> = ({
  title = "Telamonix",
  subtitle = "provides comprehensive solutions",
  slides = defaultSlides
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay
  } = useCarousel(slides);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({ width, height });
      setIsMobile(width < 768);
    };

    // Initial setup
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Enhanced Futuristic Background */}
      <FuturisticBackground />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-4 sm:gap-6 lg:gap-8 items-center min-h-screen ${
          isMobile ? 'grid-cols-1 pt-16 pb-8' : 'grid-cols-1 lg:grid-cols-2 py-12 lg:py-0'
        }`}>

          {/* Enhanced Text Content */}
          <div className={`relative space-y-4 sm:space-y-6 lg:space-y-8 z-20 ${
            isMobile ? 'order-1 text-center px-2' : 'order-1 lg:order-1 text-center lg:text-left'
          }`}>
            <div>
              <div className="relative">
                <h1 className={`font-bold mb-4 sm:mb-6 relative ${
                  isMobile
                    ? 'text-3xl sm:text-4xl'
                    : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                }`}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 relative z-10 animate-gradient-shift">
                    {title}
                  </span>
                  <div className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400/50 via-purple-500/50 to-pink-500/50 blur-sm scale-105 animate-text-glow" />
                </h1>
              </div>

              <p className={`text-white font-medium leading-relaxed opacity-90 relative ${
                isMobile
                  ? 'text-base sm:text-lg max-w-sm mx-auto'
                  : 'text-lg sm:text-xl md:text-2xl max-w-lg mx-auto lg:mx-0'
              }`}>
                <span className="relative z-10">{subtitle}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 blur-lg animate-pulse" />
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/70 to-purple-500/70 animate-pulse-glow" />
              <p className={`text-gray-300 leading-relaxed relative ${
                isMobile
                  ? 'text-sm max-w-xs mx-auto'
                  : 'text-base sm:text-lg max-w-lg mx-auto lg:mx-0'
              }`}>
                <span className="relative z-10">
                  Transforming data into actionable insights through our advanced AI-powered 3D pipeline.
                </span>
                {!isMobile && (
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                )}
              </p>
            </div>
          </div>

          {/* Enhanced Carousel Section */}
          <div className={`relative w-full ${
            isMobile
              ? 'order-2 h-80 sm:h-96 mt-4'
              : 'order-2 lg:order-2 h-[500px] sm:h-[600px] lg:h-[700px] mt-8'
          }`}>
            <div
              className={`relative w-full h-full ${isMobile ? '' : 'max-w-2xl mx-auto'}`}
              onMouseEnter={pauseAutoPlay}
              onMouseLeave={resumeAutoPlay}
            >
              {/* Enhanced carousel container */}
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-slate-800/40 via-cyan-900/20 to-purple-900/40 backdrop-blur-xl border border-cyan-400/30 shadow-xl sm:shadow-2xl shadow-cyan-500/20 relative overflow-hidden ${
                isMobile
                  ? 'w-[95%] h-[90%] rounded-2xl'
                  : 'w-full h-[450px] sm:h-[500px] rounded-3xl'
              }`}>

                {/* Animated border */}
                <div className={`absolute inset-0 animate-border-flow ${
                  isMobile ? 'rounded-2xl' : 'rounded-3xl'
                }`} />

                {/* Inner glow */}
                <div className={`absolute inset-1 sm:inset-2 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 animate-inner-glow ${
                  isMobile ? 'rounded-xl' : 'rounded-2xl'
                }`} />

                {/* Carousel */}
                <FuturisticCarousel
                  slides={slides}
                  currentSlide={currentSlide}
                  onSlideChange={goToSlide}
                  isMobile={isMobile}
                />

                {/* Content overlay for active slide */}
                <SlideContent slide={slides[currentSlide]} isMobile={isMobile} />

                {/* Navigation 
                <CarouselNavigation
                  onPrev={prevSlide}
                  onNext={nextSlide}
                  currentSlide={currentSlide}
                  totalSlides={slides.length}
                  onDotClick={goToSlide}
                  isMobile={isMobile} 
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-rotate {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-10px) rotate(90deg); opacity: 0.6; }
          50% { transform: translateY(-5px) rotate(180deg); opacity: 0.4; }
          75% { transform: translateY(-15px) rotate(270deg); opacity: 0.7; }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        @keyframes tile-glow {
          0%, 100% { background: linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(147, 51, 234, 0.05)); }
          50% { background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(147, 51, 234, 0.15)); }
        }

        @keyframes scan-horizontal {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        @keyframes scan-vertical {
          0% { left: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes breath {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.2; }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes text-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes border-glow {
          0%, 100% { box-shadow: inset 0 0 20px rgba(6, 182, 212, 0.3); }
          50% { box-shadow: inset 0 0 30px rgba(147, 51, 234, 0.5); }
        }

        @keyframes border-flow {
          0% { background: conic-gradient(from 0deg, transparent, rgba(6, 182, 212, 0.3), transparent, rgba(147, 51, 234, 0.3), transparent); }
          100% { background: conic-gradient(from 360deg, transparent, rgba(6, 182, 212, 0.3), transparent, rgba(147, 51, 234, 0.3), transparent); }
        }

        @keyframes inner-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .animate-float-rotate {
          animation: float-rotate linear infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow ease-in-out infinite;
        }

        .animate-tile-glow {
          animation: tile-glow ease-in-out infinite;
        }

        .animate-scan-horizontal {
          animation: scan-horizontal 8s linear infinite;
        }

        .animate-scan-vertical {
          animation: scan-vertical 6s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-breath {
          animation: breath 6s ease-in-out infinite;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        .animate-text-glow {
          animation: text-glow 2s ease-in-out infinite;
        }

        .animate-border-glow {
          animation: border-glow 2s ease-in-out infinite;
        }

        .animate-border-flow {
          animation: border-flow 4s linear infinite;
        }

        .animate-inner-glow {
          animation: inner-glow 3s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        /* Mobile-specific optimizations */
        @media (max-width: 767px) {
          .animate-float-rotate {
            animation-duration: 12s;
          }

          .animate-pulse-glow {
            animation-duration: 4s;
          }

          .animate-tile-glow {
            animation-duration: 8s;
          }
        }

        /* Tablet optimizations */
        @media (min-width: 768px) and (max-width: 1023px) {
          .relative.order-2 {
            margin-top: 2rem;
          }
        }

        /* Large screen optimizations */
        @media (min-width: 1200px) {
          .relative.order-2 .absolute {
            max-width: 800px;
          }
        }

        /* Ultra-wide screen optimizations */
        @media (min-width: 1600px) {
          .max-w-7xl {
            max-width: 96rem;
          }
        }

        /* High-DPI screen optimizations */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .backdrop-blur-sm {
            backdrop-filter: blur(8px);
          }

          .backdrop-blur-xl {
            backdrop-filter: blur(32px);
          }
        }

        /* Touch device optimizations */
       @media (hover: none) and (pointer: coarse) {
          .hover\\:scale-110:hover {
            transform: scale(1.05);
          }

          .hover\\:from-cyan-500\\/30:hover {
            background-image: linear-gradient(to right, rgba(6, 182, 212, 0.25), rgba(147, 51, 234, 0.25));
          }

          .cursor-pointer {
            cursor: default;
          }
        }

        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .animate-float-rotate,
          .animate-pulse-glow,
          .animate-tile-glow,
          .animate-scan-horizontal,
          .animate-scan-vertical,
          .animate-pulse-slow,
          .animate-breath,
          .animate-gradient-shift,
          .animate-text-glow,
          .animate-border-glow,
          .animate-border-flow,
          .animate-inner-glow,
          .animate-ping {
            animation: none;
          }

          .transition-all,
          .transition-transform {
            transition: none;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .bg-gray-800\\/40 {
            background-color: rgba(31, 41, 55, 0.5);
          }
        }

        /* Print styles */
        @media print {
          .absolute,
          .animate-float-rotate,
          .animate-pulse-glow,
          .animate-tile-glow,
          .animate-scan-horizontal,
          .animate-scan-vertical,
          .animate-pulse-slow,
          .animate-breath,
          .animate-gradient-shift,
          .animate-text-glow,
          .animate-border-glow,
          .animate-border-flow,
          .animate-inner-glow {
            display: none;
          }

          .relative {
            position: static;
          }

          .text-transparent {
            color: #000;
          }
        }

        /* Landscape orientation on mobile */
        @media (max-width: 767px) and (orientation: landscape) {
          .min-h-screen {
            min-height: 100vh;
          }

          .pt-16 {
            padding-top: 2rem;
          }

          .pb-8 {
            padding-bottom: 2rem;
          }

          .h-80 {
            height: 16rem;
          }

          .text-3xl {
            font-size: 1.5rem;
            line-height: 2rem;
          }
        }

        /* Very small screens (iPhone SE, etc.) */
        @media (max-width: 374px) {
          .text-3xl {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }

          .text-base {
            font-size: 0.875rem;
            line-height: 1.25rem;
          }

          .space-y-4 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 0.75rem;
          }

          .px-2 {
            padding-left: 0.25rem;
            padding-right: 0.25rem;
          }

          .h-80 {
            height: 14rem;
          }
        }

        /* Large tablets and small desktops */
        @media (min-width: 768px) and (max-width: 1279px) {
          .lg\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .lg\\:text-left {
            text-align: left;
          }

          .lg\\:mx-0 {
            margin-left: 0;
            margin-right: 0;
          }
        }

        /* Extra large screens */
        @media (min-width: 1536px) {
          .text-4xl {
            font-size: 3rem;
            line-height: 1;
          }

          .xl\\:text-8xl {
            font-size: 7rem;
            line-height: 1;
          }

          .max-w-7xl {
            max-width: 88rem;
          }
        }

        /* Container queries for modern browsers */
        @container (max-width: 767px) {
          .container-mobile {
            padding: 1rem;
          }
        }

        /* Focus styles for accessibility */
        .focus\\:outline-none:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
        }

        .focus\\:ring-2:focus {
          --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
          --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
          box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
        }

        .focus\\:ring-cyan-400:focus {
          --tw-ring-color: rgb(34 211 238);
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .border-cyan-400\\/30 {
            border-color: rgb(34 211 238);
          }

          .text-gray-300 {
            color: rgb(229 231 235);
          }

          .bg-gradient-to-r {
            background: linear-gradient(to right, rgb(34 211 238), rgb(147 51 234));
          }
        }

        /* Forced colors mode (Windows High Contrast) */
        @media (forced-colors: active) {
          .bg-gradient-to-br,
          .bg-gradient-to-r,
          .text-transparent {
            background: ButtonText;
            color: ButtonText;
          }

          .border-cyan-400\\/30,
          .border-purple-500\\/20 {
            border-color: ButtonBorder;
          }

          .bg-gray-800\\/40 {
            background-color: ButtonFace;
          }
        }
      `}</style>
    </div>
  );
};

export default HeadingSection;