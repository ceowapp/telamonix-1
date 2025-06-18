import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SectionTransition: React.FC = () => {
  const transitionRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!transitionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the transition elements on scroll
      gsap.fromTo('.transition-line', 
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 2,
          stagger: 0.2,
          scrollTrigger: {
            trigger: transitionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          }
        }
      );

      // Animate particles
      gsap.to('.particle', {
        y: -100,
        opacity: 0,
        duration: 3,
        repeat: -1,
        stagger: 0.5,
        ease: "power2.out"
      });

      // Animate the portal effect
      gsap.to('.portal-ring', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      gsap.to('.portal-inner', {
        rotation: -360,
        duration: 15,
        repeat: -1,
        ease: "none"
      });

    }, transitionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={transitionRef} className="relative h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Background gradient that matches both sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
      
      {/* Animated grid that connects both sections */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`transition-v-${i}`}
            className="transition-line absolute h-full w-px bg-gradient-to-b from-purple-400 via-cyan-400 to-purple-400 origin-center"
            style={{ left: `${i * 8.33}%` }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`transition-h-${i}`}
            className="transition-line absolute w-full h-px bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 origin-center"
            style={{ top: `${i * 12.5}%` }}
          />
        ))}
      </div>

      {/* Central portal/transition effect */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="portal-ring absolute w-96 h-96 border-2 border-purple-400/30 rounded-full">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-400 rounded-full blur-sm" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full blur-sm" />
          <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-400 rounded-full blur-sm" />
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full blur-sm" />
        </div>

        {/* Inner rotating ring */}
        <div className="portal-inner absolute w-64 h-64 border border-cyan-400/50 rounded-full">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full" />
        </div>

        {/* Center content */}
        <div className="relative z-20 text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-full backdrop-blur-sm border border-white/10 flex items-center justify-center mb-8">
            <div className="text-4xl text-white/80">⚡</div>
          </div>
          
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 font-mono">
            QUANTUM BRIDGE
          </h3>
          
          <p className="text-gray-400 text-sm font-mono max-w-md">
            Transitioning from vision to reality through advanced quantum tunneling protocols
          </p>
        </div>
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="particle absolute w-1 h-1 bg-purple-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Connecting lines to both sections */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-purple-400/50" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-32 bg-gradient-to-t from-transparent to-cyan-400/50" />
      
      {/* Side connectors */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent to-purple-400/30" />
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-px bg-gradient-to-l from-transparent to-cyan-400/30" />
    </div>
  );
};

export default SectionTransition;