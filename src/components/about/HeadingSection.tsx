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
const FuturisticBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Base gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-cyan-900/30" />
    
    {/* Animated geometric shapes */}
    <div className="absolute inset-0">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute border border-cyan-400/20 rounded-lg animate-float-rotate"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}
    </div>

    {/* Glowing orbs */}
    <div className="absolute inset-0">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse-glow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${8 + Math.random() * 12}px`,
            height: `${8 + Math.random() * 12}px`,
            background: `radial-gradient(circle, ${['#00f5ff', '#8b5cf6', '#f59e0b', '#10b981'][Math.floor(Math.random() * 4)]}40 0%, transparent 70%)`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>

    {/* Futuristic grid tiles */}
    <div className="absolute inset-0 opacity-30">
      <div className="grid grid-cols-12 grid-rows-8 h-full w-full gap-px">
        {Array.from({ length: 96 }).map((_, i) => (
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

    {/* Corner glows */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-radial from-cyan-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
    <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-3xl animate-breath" />
  </div>
);

// Enhanced Carousel Component
const FuturisticCarousel: React.FC<{ slides: SlideData[]; currentSlide: number; onSlideChange: (index: number) => void }> = ({
  slides,
  currentSlide,
  onSlideChange
}) => {
  const getSlideStyle = (index: number) => {
    const position = index - currentSlide;
    const isActive = index === currentSlide;
    
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
          className={`absolute cursor-pointer transition-all duration-700 ease-out rounded-2xl backdrop-blur-sm border ${
            index === currentSlide 
              ? 'bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20 border-cyan-400/50 shadow-2xl shadow-cyan-500/25' 
              : 'bg-gray-800/40 border-purple-500/20'
          }`}
          style={getSlideStyle(index)}
          onClick={() => onSlideChange(index)}
        >
          <div className="relative w-full h-full overflow-hidden rounded-2xl">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {index === currentSlide && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
                <div className="absolute inset-0 animate-border-glow rounded-2xl" />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Enhanced Content Display Component
const SlideContent: React.FC<{ slide: SlideData }> = ({ slide }) => (
  <div className="absolute top-1/2 left-6 transform -translate-y-1/2 max-w-md z-20 transition-all duration-500">
    <div className="relative">
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 opacity-90 relative">
        <span className="relative z-10">{slide.title}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-lg scale-110 animate-pulse" />
      </h2>
      <div className="relative">
        <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed relative z-10">
          {slide.description}
        </p>
        <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-500 animate-pulse" />
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
}> = ({ onPrev, onNext, currentSlide, totalSlides, onDotClick }) => (
  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-20">
    <button
      onClick={onPrev}
      className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center text-white hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/25"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <div className="flex space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 relative ${
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
      className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center text-white hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/25"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  const {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay
  } = useCarousel(slides);

  return (
    <div className="relative w-full min-h-screen py-24 lg:py-0 overflow-hidden">
      {/* Enhanced Futuristic Background */}
      <FuturisticBackground />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen">
          
          {/* Enhanced Text Content */}
          <div className="relative order-1 lg:order-1 space-y-8 px-4 sm:px-6 lg:px-8 z-20">
            <div className="text-center lg:text-left">
              <div className="relative">
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 relative z-10 animate-gradient-shift">
                    {title}
                  </span>
                  <div className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400/50 via-purple-500/50 to-pink-500/50 blur-sm scale-105 animate-text-glow" />
                </h1>
              </div>
              
              <p className="text-white text-lg sm:text-xl md:text-2xl font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 opacity-90 relative">
                <span className="relative z-10">{subtitle}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 blur-lg animate-pulse" />
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/70 to-purple-500/70 animate-pulse-glow" />
              <p className="text-gray-300 text-base text-center lg:text-start sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 relative">
                <span className="relative z-10">
                  Transforming data into actionable insights through our advanced AI-powered 3D pipeline.
                </span>
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
              </p>
            </div>
          </div>

          {/* Enhanced Carousel Section */}
          <div className="relative order-2 lg:order-2 w-full h-[600px] lg:h-[700px] mt-8">
            <div 
              className="relative w-full h-full max-w-2xl mx-auto"
              onMouseEnter={pauseAutoPlay}
              onMouseLeave={resumeAutoPlay}
            >
              {/* Enhanced carousel container */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-br from-slate-800/40 via-cyan-900/20 to-purple-900/40 backdrop-blur-xl rounded-3xl border border-cyan-400/30 shadow-2xl shadow-cyan-500/20 relative overflow-hidden">
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl animate-border-flow" />
                
                {/* Inner glow */}
                <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 animate-inner-glow" />
                
                {/* Carousel */}
                <FuturisticCarousel 
                  slides={slides}
                  currentSlide={currentSlide}
                  onSlideChange={goToSlide}
                />
                
                {/* Content overlay for active slide */}
                <SlideContent slide={slides[currentSlide]} />
                
                {/*<CarouselNavigation
                  onPrev={prevSlide}
                  onNext={nextSlide}
                  currentSlide={currentSlide}
                  totalSlides={slides.length}
                  onDotClick={goToSlide}
                />*/}
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

        @media (max-width: 768px) {
          .relative.order-1.lg\\:order-2 .absolute {
            position: relative;
            top: auto;
            left: auto;
            transform: none;
            width: 100%;
            height: 400px;
            margin: 2rem 1rem;
          }
        }

        @media (max-width: 576px) {
          .relative.order-1.lg\\:order-2 .absolute {
            height: 350px;
            margin: 1rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HeadingSection;