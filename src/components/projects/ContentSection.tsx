import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll, useTransform } from "framer-motion";
import { EntangledStrings } from "./EntangledStrings";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Neural Interface",
    description: "Revolutionary brain-computer interface enabling direct thought translation to digital commands.",
    videoUrl: "https://youtu.be/sQ22pm-xvrE?si=w5s95UF5EY25HOdO",
    tags: ["AI", "Hardware", "Biotech"]
  },
  {
    id: 2,
    title: "Quantum Mesh",
    description: "Distributed quantum computing network for solving complex mathematical problems at scale.",
    videoUrl: "https://youtu.be/pQpFebyALV0?si=cQ96mIn4Xq9qOh7V",
    tags: ["Quantum", "Network", "Computing"]
  },
  {
    id: 3,
    title: "Holographic Display",
    description: "True 3D holographic projection system for immersive data visualization and interaction.",
    videoUrl: "https://youtu.be/sQ22pm-xvrE?si=1tzGvgIFSnyKoasV",
    tags: ["AR", "3D", "Display"]
  },
  {
    id: 4,
    title: "Synthetic Biology",
    description: "Programmable biological systems for environmental restoration and material synthesis.",
    videoUrl: "https://youtu.be/sQ22pm-xvrE?si=w5s95UF5EY25HOdO",
    tags: ["Biology", "Environment", "Materials"]
  },
  {
    id: 5,
    title: "Space Elevator",
    description: "Carbon nanotube tether system for cost-effective orbital transportation infrastructure.",
    videoUrl: "https://youtu.be/sQ22pm-xvrE?si=1tzGvgIFSnyKoasV",
    tags: ["Space", "Materials", "Transport"]
  }
];

const paths = [
  "M300 663C445.5 663 491 666.265 569 647C626.5 630 639.5 621 697.5 566C739 531.5 755 529.5 790 523C809.664 519.348 821 503.736 838 504.236C853.591 504.236 862.429 514.739 884.66 522.749C892.042 525.408 900.2 526.237 907.356 523.019C924.755 515.195 941.446 496.324 957 496.735C973.408 496.735 993.545 519.572 1012.903 526.769C1018.727 528.934 1025.184 528.395 1030.902 525.965C1051.726 517.115 1064.085 497.106 1082 496.735C1094.831 496.47 1104.103 508.859 1122.469 518.515C1135.13 525.171 1150.214 526.815 1162.827 520.069",
  "M300 587.5C447 587.5 577 587.5 610 573.5C648 563 692.5 543.5 708 535C734 523.5 726 526.235 779 515.235C794 512.729 823 510.435 834.5 512.735C854.5 516.735 855.5 523.235 876 523.735C892 523.735 916 496.735 933 497.235C948.671 497.235 961.31 515.052 984.774 524.942C992.004 527.989 1000.2 528.738 1007.349 525.505C1024.886 517.575 1041.932 498.33 1057.5 498.742C1073.864 498.742 1091.711 520.623 1110.403 527.654",
  "M300 514C447.5 514.333 594.5 513.735 680.5 513.735C705.976 514.94 722.849 515.228 736.37 515.123C777.503 514.803 818.631 506.605 859.508 511.197C864.04 511.706 869.162 512.524 875 513.735C888 516.433 916 521.702 927.5 519.402C947.5 515.402 959 499.235 980.5 499.235C1000.5 499.235 1025 529.235 1042 528.735C1057.654 528.735 1068.77 510.583 1091.793 500.59",
  "M300 438.5C450.5 438.5 561 438.318 623.5 456.5C651 464.5 687.517 484.001 723.5 494.5C747.371 501.465 772 503.735 787 507.735C803.786 512.212 804.5 516.808 823 518.735C847 521.235 864.814 501.235 884.5 501.235C904.5 501.235 926 529.069 943 528.569C958.676 528.569 972.076 511.63 995.751 501.972",
  "M300.5 364C445.288 362.349 495 361.5 565.5 378C622 391.223 699.182 457.5 711 467.5C724.176 478.649 756.916 491.677 796.259 502.699C798.746 503.396 801.16 504.304 803.511 505.374C817.104 511.558 841.149 520.911 851.5 521.236C871.5 521.236 890 498.736 911.5 498.736C931.5 498.736 952.5 529.236 969.5 528.736"
];

const filterPaths = paths;
const colors = ["#06b6d4", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"];

const ProjectShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const projectsListRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const projectInfoRef = useRef<HTMLDivElement>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  // Fixed ScrollTrigger setup
  useEffect(() => {
    if (!containerRef.current || !projectsListRef.current || !scrollContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate grid lines
      gsap.to('.grid-line', {
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.1
      });

      // Clear existing ScrollTriggers
      scrollTriggersRef.current.forEach(st => st.kill());
      scrollTriggersRef.current = [];

      const projectElements = projectsListRef.current?.children;
      if (!projectElements) return;

      // Create scroll triggers with proper spacing
      Array.from(projectElements).forEach((element, index) => {
        const trigger = ScrollTrigger.create({
          trigger: element,
          start: "top 70%", // Start earlier to prevent flickering
          end: "bottom 30%", // End later to prevent flickering
          scroller: scrollContainerRef.current,
          onEnter: () => {
            console.log(`Entering project ${index}`);
            setCurrentProject(index);
          },
          onEnterBack: () => {
            console.log(`Entering back project ${index}`);
            setCurrentProject(index);
          },
          // Remove onLeaveBack to prevent conflicts
        });
        
        scrollTriggersRef.current.push(trigger);
      });
    }, containerRef);

    return () => {
      ctx.revert();
      scrollTriggersRef.current.forEach(st => st.kill());
      scrollTriggersRef.current = [];
    };
  }, []); // Remove currentProject from dependency array

  // Separate effect for animations when currentProject changes
  useEffect(() => {
    animateProjectChange(currentProject);
  }, [currentProject]);

  const animateProjectChange = (index: number) => {
    if (videoRef.current) {
      gsap.fromTo(videoRef.current,
        { scale: 0.8, opacity: 0, rotationY: -15 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 0.8, ease: 'back.out(1.2)' }
      );
    }

    if (projectInfoRef.current) {
      gsap.fromTo(projectInfoRef.current,
        { scale: 0.95, opacity: 0, x: 30 },
        { scale: 1, opacity: 1, x: 0, duration: 0.8, ease: 'back.out(1.2)' }
      );
    }
  };

  // Gradient tiles background component
  const GradientTiles = () => (
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-50">
        {/* Vertical lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`v-tile-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-400/60 to-transparent animate-pulse"
            style={{
              left: `${12.5 * i}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '3s'
            }}
          />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`h-tile-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent animate-pulse"
            style={{
              top: `${16.66 * i}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Glowing intersection points */}
      <div className="absolute inset-0 opacity-40">
        {Array.from({ length: 8 }).map((_, x) =>
          Array.from({ length: 6 }).map((_, y) => (
            <div
              key={`intersection-${x}-${y}`}
              className="absolute w-1 h-1 bg-gradient-to-br from-purple-400 via-violet-400 to-purple-600 rounded-full blur-sm animate-pulse"
              style={{
                left: `${12.5 * x}%`,
                top: `${16.66 * y}%`,
                animationDelay: `${(x + y) * 0.1}s`,
                animationDuration: '4s'
              }}
            />
          ))
        )}
      </div>

      {/* Additional glowing effects */}
      <div className="absolute inset-0 opacity-20">
        {/* Corner accent tiles */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-500/40 to-transparent blur-xl animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-violet-500/40 to-transparent blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/40 to-transparent blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-violet-500/40 to-transparent blur-xl animate-pulse" style={{ animationDelay: '3s' }} />

        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-radial from-purple-400/30 via-violet-400/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-violet-900/10" />
    </div>
  );

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-black">
      {/* Futuristic Background */}
      <div className="absolute inset-0 z-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="grid-line absolute h-full w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
              style={{ left: `${i * 5}%` }}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="grid-line absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{ top: `${i * 8.33}%` }}
            />
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10" />
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-900/5 via-transparent to-blue-900/5" />
      </div>

      {/* EntangledStrings Background Connection */}
      <div className="absolute inset-0 pt-32 md:pt-64 z-5 pointer-events-none">
        <EntangledStrings
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
          paths={paths}
          filterPaths={filterPaths}
          colors={colors}
          className="opacity-40 -ml-32 md:-ml-64"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="mx-8 xl:mx-16 h-screen flex items-center justify-between">

            {/* Left Side - Video (Fixed) */}
            <div className="w-1/2 flex justify-start items-center">
              <div className="relative">
                {/* Multiple glowing backdrops for depth */}
                <div className="absolute -inset-8 bg-gradient-to-r from-cyan-400/30 to-purple-600/30 rounded-3xl blur-3xl animate-pulse" />
                <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-3xl blur-2xl" />
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 rounded-2xl blur-xl" />

                {/* Video container */}
                <div className="relative">
                  <video
                    ref={videoRef}
                    className="w-[420px] xl:w-[520px] h-[280px] xl:h-[360px] object-cover rounded-2xl border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/30"
                    autoPlay
                    muted
                    loop
                    key={currentProject}
                  >
                    <source src={projects[currentProject]?.videoUrl} type="video/mp4" />
                  </video>

                  {/* Video overlay effects */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-transparent to-cyan-400/10" />
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-cyan-400 rounded-full animate-ping" />

                  {/* Video info overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-cyan-400/30">
                    <div className="text-white font-mono text-sm">
                      Project {String(currentProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Project Info (Scrollable) */}
            <div className="w-1/2 h-full flex items-center justify-end">
              <div
                ref={scrollContainerRef}
                className="h-[80vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-400/30 hover:scrollbar-thumb-cyan-400/50"
              >
                <div ref={projectsListRef} className="space-y-[100vh]">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="min-h-screen flex items-center"
                    >
                      <div
                        ref={index === currentProject ? projectInfoRef : null}
                        className="relative max-w-lg"
                      >
                        {/* Gradient Tiles Background */}
                        <GradientTiles />

                        <div className="relative z-10 p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-cyan-400/10">
                          {/* Project Number */}
                          <div className="flex items-center mb-6">
                            <div className="w-12 h-12 rounded-full border-2 border-cyan-400 flex items-center justify-center text-cyan-400 font-mono text-lg mr-6 shadow-lg shadow-cyan-400/30 bg-cyan-400/10">
                              {String(index + 1).padStart(2, '0')}
                            </div>
                            <div className="h-px bg-gradient-to-r from-cyan-400 via-purple-400 to-transparent flex-1" />
                          </div>

                          {/* Project Title */}
                          <h2 className="text-3xl xl:text-4xl font-bold bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6 font-mono tracking-tight leading-tight">
                            {project.title}
                          </h2>

                          {/* Project Description */}
                          <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                            {project.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-3 mb-8">
                            {project.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-4 py-2 text-sm font-mono bg-cyan-400/10 border border-cyan-400/30 rounded-full text-cyan-400 hover:bg-cyan-400/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/20"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* CTA Button */}
                          <button className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/25">
                            <span className="relative z-10 flex items-center">
                              Explore Project
                              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </button>

                          {/* Project Stats */}
                          <div className="mt-8 flex space-x-8 text-sm text-gray-400">
                            <div>
                              <span className="text-cyan-400 font-mono">STATUS:</span> Active
                            </div>
                            <div>
                              <span className="text-cyan-400 font-mono">YEAR:</span> {2024 - index}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="block lg:hidden">
          <div className="px-4 sm:px-6 md:px-8 py-8">
            {projects.map((project, index) => (
              <div key={project.id} className="mb-16 last:mb-0">
                {/* Video Section */}
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    {/* Glowing backdrop */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-2xl blur-xl" />

                    {/* Video container */}
                    <div className="relative">
                      <video
                        className="w-full max-w-md h-48 sm:h-64 md:h-80 object-cover rounded-xl border-2 border-cyan-400/50 shadow-xl shadow-cyan-400/20"
                        autoPlay
                        muted
                        loop
                      >
                        <source src={project.videoUrl} type="video/mp4" />
                      </video>

                      {/* Video info overlay */}
                      <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg p-2 border border-cyan-400/30">
                        <div className="text-white font-mono text-xs sm:text-sm">
                          Project {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Info Section */}
                <div className="relative max-w-2xl mx-auto">
                  {/* Gradient Tiles Background */}
                  <GradientTiles />

                  <div className="relative z-10 p-6 sm:p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-cyan-400/10">
                    {/* Project Number */}
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-cyan-400 flex items-center justify-center text-cyan-400 font-mono text-sm sm:text-lg mr-4 sm:mr-6 shadow-lg shadow-cyan-400/30 bg-cyan-400/10">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="h-px bg-gradient-to-r from-cyan-400 via-purple-400 to-transparent flex-1" />
                    </div>

                    {/* Project Title */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6 font-mono tracking-tight leading-tight">
                      {project.title}
                    </h2>

                    {/* Project Description */}
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 font-light">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-mono bg-cyan-400/10 border border-cyan-400/30 rounded-full text-cyan-400 hover:bg-cyan-400/20 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/25">
                      <span className="relative z-10 flex items-center justify-center">
                        Explore Project
                        <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    {/* Project Stats */}
                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
                      <div>
                        <span className="text-cyan-400 font-mono">STATUS:</span> Active
                      </div>
                      <div>
                        <span className="text-cyan-400 font-mono">YEAR:</span> {2024 - index}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Desktop Only */}
      <div className="hidden lg:block fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex flex-col items-center text-cyan-400/60 text-sm font-mono">
          <div className="w-px h-12 bg-gradient-to-b from-cyan-400/60 to-transparent" />
          <span>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;