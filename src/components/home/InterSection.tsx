'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { homeServices } from '@/constants/data';
import InterSectionCarousel from './InterSectionCarousel';
import Link from 'next/link';
import Image from 'next/image';
import type { Page } from '@/payload-types'
import { processImageUrl } from '@/utilities/processImageUrl';

interface Service {
  title: string;
  link: string;
  imageSrc?: string;
}

interface IntersectionProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  loading?: boolean;
  error?: string | null;
}

const BackgroundTilesCanvas = ({ containerRef }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(0);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [containerRect, setContainerRect] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationTime = 0;
    const animationDuration = 3000; // 3 seconds to match CSS animation

    // Function to update canvas size
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const offset = 100;
      const width = rect.width + offset * 2;
      const height = rect.height + offset * 2;
      
      setCanvasSize({ width, height });
      setContainerRect(rect);

      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    // Function to get the current border position based on animation progress
    const getBorderPoint = (progress, rect) => {
      if (!rect) return { x: 0, y: 0 };
      
      const borderRadius = 44;
      const width = rect.width;
      const height = rect.height;
      const offsetX = 100; // Canvas offset
      const offsetY = 100; // Canvas offset
      
      // Calculate the perimeter of rounded rectangle
      const straightWidth = width - 2 * borderRadius;
      const straightHeight = height - 2 * borderRadius;
      const cornerArc = (Math.PI * borderRadius) / 2; // Quarter circle
      
      const totalPerimeter = 
        2 * straightWidth + // top and bottom straight edges
        2 * straightHeight + // left and right straight edges  
        4 * cornerArc; // four quarter circles
      
      const currentDistance = progress * totalPerimeter;
      let remainingDistance = currentDistance;
      
      // Top edge (left to right)
      if (remainingDistance <= straightWidth) {
        return {
          x: offsetX + borderRadius + remainingDistance,
          y: offsetY
        };
      }
      remainingDistance -= straightWidth;
      
      // Top-right corner
      if (remainingDistance <= cornerArc) {
        const angle = (remainingDistance / cornerArc) * (Math.PI / 2);
        return {
          x: offsetX + width - borderRadius + borderRadius * Math.sin(angle),
          y: offsetY + borderRadius - borderRadius * Math.cos(angle)
        };
      }
      remainingDistance -= cornerArc;
      
      // Right edge (top to bottom)
      if (remainingDistance <= straightHeight) {
        return {
          x: offsetX + width,
          y: offsetY + borderRadius + remainingDistance
        };
      }
      remainingDistance -= straightHeight;
      
      // Bottom-right corner
      if (remainingDistance <= cornerArc) {
        const angle = (remainingDistance / cornerArc) * (Math.PI / 2);
        return {
          x: offsetX + width - borderRadius + borderRadius * Math.cos(angle),
          y: offsetY + height - borderRadius + borderRadius * Math.sin(angle)
        };
      }
      remainingDistance -= cornerArc;
      
      // Bottom edge (right to left)
      if (remainingDistance <= straightWidth) {
        return {
          x: offsetX + width - borderRadius - remainingDistance,
          y: offsetY + height
        };
      }
      remainingDistance -= straightWidth;
      
      // Bottom-left corner
      if (remainingDistance <= cornerArc) {
        const angle = (remainingDistance / cornerArc) * (Math.PI / 2);
        return {
          x: offsetX + borderRadius - borderRadius * Math.sin(angle),
          y: offsetY + height - borderRadius + borderRadius * Math.cos(angle)
        };
      }
      remainingDistance -= cornerArc;
      
      // Left edge (bottom to top)
      if (remainingDistance <= straightHeight) {
        return {
          x: offsetX,
          y: offsetY + height - borderRadius - remainingDistance
        };
      }
      remainingDistance -= straightHeight;
      
      // Top-left corner
      const angle = (remainingDistance / cornerArc) * (Math.PI / 2);
      return {
        x: offsetX + borderRadius - borderRadius * Math.cos(angle),
        y: offsetY + borderRadius - borderRadius * Math.sin(angle)
      };
    };

    // Function to get border intensity based on animation progress
    const getBorderIntensity = (progress) => {
      const keyframes = [
        { progress: 0, intensity: 0.9, width: 4 },
        { progress: 0.125, intensity: 1.1, width: 5 },
        { progress: 0.25, intensity: 1.0, width: 4.5 },
        { progress: 0.375, intensity: 1.2, width: 6 },
        { progress: 0.5, intensity: 0.8, width: 4 },
        { progress: 0.625, intensity: 1.3, width: 6.5 },
        { progress: 0.75, intensity: 1.0, width: 5 },
        { progress: 0.875, intensity: 1.1, width: 5.5 },
        { progress: 1, intensity: 0.9, width: 4 }
      ];

      // Find the two keyframes to interpolate between
      let startFrame = keyframes[0];
      let endFrame = keyframes[1];
      
      for (let i = 0; i < keyframes.length - 1; i++) {
        if (progress >= keyframes[i].progress && progress <= keyframes[i + 1].progress) {
          startFrame = keyframes[i];
          endFrame = keyframes[i + 1];
          break;
        }
      }

      // Interpolate between keyframes
      const frameProgress = (progress - startFrame.progress) / (endFrame.progress - startFrame.progress);
      return {
        intensity: startFrame.intensity + (endFrame.intensity - startFrame.intensity) * frameProgress,
        width: startFrame.width + (endFrame.width - startFrame.width) * frameProgress
      };
    };

    // Main drawing function
    const drawTiles = () => {
      if (!containerRect) return;

      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      const spacing = 5;
      const cols = Math.ceil(canvasSize.width / spacing);
      const rows = Math.ceil(canvasSize.height / spacing);

      const progress = (animationTime % animationDuration) / animationDuration;
      const { intensity, width } = getBorderIntensity(progress);

      // --- MODIFICATIONS FOR LONGER GLOW ALONG THE BORDER ---
      // This controls the "length" of the glowing segment along the perimeter (0 to 1)
      const glowPerimeterLength = 0.1; // Adjusted for a more visible segment (you can fine-tune)
      
      // These control the "thickness" of the glow perpendicular to the border line
      const maxRadialSpread = width * 8; // Adjusted for a slightly thinner glow
      const fadeRadialSpread = width * 3; // Adjusted proportionally

      // --- CRUCIAL CHANGE: INCREASE NUM SAMPLES SIGNIFICANTLY ---
      const numSamples = 70; // Increased for a smoother continuous line

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing;
          const y = row * spacing;

          const isOutsideContainer = (
            x < 80 || 
            x >= containerRect.width + 80 || 
            y < 80 ||
            y >= containerRect.height + 80 
          );

          if (!isOutsideContainer) continue; // Only draw tiles outside the main container

          let minRadialDistanceToSegment = Infinity;
          let maxCombinedInfluence = 0; // Renamed to reflect combined influence

          const halfGlowPerimeterLength = glowPerimeterLength / 2;

          for (let i = 0; i <= numSamples; i++) {
            // Calculate sample progress offset: from -halfGlowPerimeterLength to +halfGlowPerimeterLength
            let sampleProgressOffset = (i / numSamples) * glowPerimeterLength - halfGlowPerimeterLength;
            // Ensure sampleProgress wraps around the perimeter (0-1)
            let sampleProgress = (progress + sampleProgressOffset + 1) % 1;

            const sampledBorderPoint = getBorderPoint(sampleProgress, containerRect);
            const currentTileToSampledPointDistance = Math.sqrt((x - sampledBorderPoint.x) ** 2 + (y - sampledBorderPoint.y) ** 2);

            minRadialDistanceToSegment = Math.min(minRadialDistanceToSegment, currentTileToSampledPointDistance);
            
            // Calculate radial influence (how far from the border line)
            const radialInfluence = Math.max(0, 1 - (currentTileToSampledPointDistance / maxRadialSpread));

            // --- NEW: Calculate longitudinal influence (how far from the center of the glowing segment) ---
            // normalized distance from center of segment (0 at center, 1 at ends of glowPerimeterLength)
            const normalizedLongitudinalDistance = Math.abs(sampleProgressOffset) / halfGlowPerimeterLength;
            
            // Apply a fading function (e.g., cosine for smooth fade, or power for sharper fade)
            // Math.cos(x * PI/2) goes from 1 (x=0) to 0 (x=1) smoothly
            const longitudinalInfluence = Math.cos(Math.min(1, normalizedLongitudinalDistance) * Math.PI / 2); 

            // Combine radial and longitudinal influences
            const combinedInfluence = radialInfluence * longitudinalInfluence;

            // Keep track of the highest *combined* influence found from any point in the segment
            maxCombinedInfluence = Math.max(maxCombinedInfluence, combinedInfluence);
          }

          // Use maxCombinedInfluence for drawing properties
          if (minRadialDistanceToSegment < maxRadialSpread) { // Still check radial spread for initial filter
            ctx.save();

            // tileOpacity now directly uses maxCombinedInfluence
            const tileOpacity = intensity * maxCombinedInfluence * 0.7; // Base opacity 0.7

            // If the combined influence is too low, skip drawing to avoid very faint pixels
            if (tileOpacity < 0.01) { // Threshold to prevent drawing almost invisible tiles
                ctx.restore();
                continue;
            }
            
            const baseHue = 220;
            const hueVariation = Math.sin(progress * Math.PI * 2) * 15;
            const finalHue = baseHue + hueVariation;
            
            const saturation = 60;
            const lightness = 55;
            
            const color = `hsla(${finalHue}, ${saturation}%, ${lightness}%, ${tileOpacity})`;

            ctx.strokeStyle = color;
            // ctx.lineWidth also uses maxCombinedInfluence
            ctx.lineWidth = Math.max(0.3, width * maxCombinedInfluence * 0.2); // Base line width 0.2
            ctx.strokeRect(x, y, spacing, spacing);

            // Subtle fill for closer tiles only, based on min radial distance and combined influence
            if (minRadialDistanceToSegment < fadeRadialSpread) {
              const fillOpacity = tileOpacity * 0.4; // Fill opacity 0.4 relative to tileOpacity
              ctx.fillStyle = `hsla(${finalHue}, ${saturation}%, ${lightness}%, ${fillOpacity})`;
              ctx.fillRect(x, y, spacing, spacing);
            }

            ctx.restore();
          }
        }
      }
    };
    // Animation loop
    const animate = (timestamp) => {
      animationTime = timestamp;
      drawTiles();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    updateCanvasSize();
    animationRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [containerRef, canvasSize.width, canvasSize.height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute pointer-events-none"
      style={{ 
        top: '-100px',
        left: '-100px',
        zIndex: 1,
      }}
    />
  );
};

const Intersection: React.FC<IntersectionProps> = ({ 
  data,
  loading = false,
  error = null 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const services =
    Array.isArray(data?.sectionjson) && data.sectionjson.length > 0
      ? data.sectionjson
      : homeServices;

  const serviceItems = services?.map(service => ({
    id: `${service.title}-${Math.random()}`,
    content: (
      <Link href={service.link} className="w-full">
        <div 
          className="group relative rounded-2xl overflow-hidden"
          style={{ minHeight: '500px', height: '100%' }}
        >
          <div className="relative w-full h-full min-h-[500px]">
            <Image 
              src={processImageUrl(service)}
              alt={service?.title}
              fill
              className={`object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
      </Link>
    ),
  }));

  return (
    <section className="w-full relative -mt-64 mb-16">
      <div className="w-full">
        <div className="relative w-full flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div ref={containerRef} className="w-full relative z-20">
            <BackgroundTilesCanvas containerRef={containerRef} />
            <div className="rainbow-border-card rounded-3xl sm:rounded-[34px] lg:rounded-[44px] relative">
              <div className="bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-cyan-50/30 backdrop-blur-2xl rounded-3xl sm:rounded-[34px] lg:rounded-[44px] px-3 lg:px-4 py-3 md:py-6 lg:py-8 relative border border-white/20">
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-40 bg-gradient-to-r from-pink-500/10 via-purple-500/20 to-cyan-500/10 blur-3xl rounded-full animate-pulse" />
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-4/5 h-24 bg-gradient-to-r from-pink-400/20 via-purple-400/30 to-cyan-400/20 blur-2xl rounded-full" />
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3/5 h-12 bg-gradient-to-r from-pink-300/30 via-purple-300/40 to-cyan-300/30 blur-xl rounded-full" />
                <div className="relative z-10">
                  <InterSectionCarousel items={serviceItems} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Intersection);