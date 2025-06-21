"use client"
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Shield,
  Target,
  TrendingUp,
  ChevronRight,
  Cloud,
  Database,
  Server,
  Globe,
  Lock,
  Cpu,
  Code,
  Workflow,
  Terminal,
  Settings,
  Network,
  Layers,
  Key,
  Wifi,
  CloudLightning,
  Code2,
  Bug,
  Rocket,
} from 'lucide-react';

const HeadingSection = () => {
  const [activeTab, setActiveTab] = useState('Heading');
  const [hoveredStrength, setHoveredStrength] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY]);

  // IT Services focused strengths
  const strengths = [
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description: '99.9% uptime with scalable cloud solutions',
      color: 'from-blue-400 to-cyan-400',
      stats: '500+ deployments'
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Advanced threat protection & compliance',
      color: 'from-purple-400 to-pink-400',
      stats: 'Zero breaches'
    },
    {
      icon: Server,
      title: 'DevOps Excellence',
      description: 'Automated CI/CD & infrastructure as code',
      color: 'from-green-400 to-emerald-400',
      stats: '10x faster deployment'
    },
    {
      icon: Code,
      title: 'Custom Development',
      description: 'Tailored software solutions & integrations',
      color: 'from-orange-400 to-red-400',
      stats: '200+ projects delivered'
    }
  ];

  // Get responsive particle count
  const getParticleCount = () => {
    if (!isMounted) return 15; // Default for SSR
    return windowWidth < 768 ? 15 : 25;
  };

  // Get responsive data stream count
  const getDataStreamCount = () => {
    if (!isMounted) return 3; // Default for SSR
    return windowWidth < 768 ? 3 : 6;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Responsive Background */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'url(/images/pages/projects/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Responsive Gradient Overlays */}
      <motion.div className="absolute inset-0 overflow-hidden">
        {/* Top-right purple gradient - responsive */}
        <div className="absolute top-[-15%] right-[-10%] w-[60%] sm:w-[50%] h-[60%] sm:h-[50%] rounded-full
          bg-gradient-to-br from-purple-600/30 via-violet-500/20 to-purple-800/25 blur-[60px] sm:blur-[80px]" />
        
        {/* Purple accent - responsive */}
        <div className="absolute top-[5%] right-[5%] w-[40%] sm:w-[30%] h-[40%] sm:h-[30%] rounded-full
          bg-gradient-to-br from-purple-500/20 to-indigo-600/15 blur-[40px] sm:blur-[60px]" />

        {/* Responsive grid overlay */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)]
            bg-[size:50px_50px] sm:bg-[size:80px_80px] lg:bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0118] via-[#12033a]/60 to-transparent" />
      </motion.div>

      {/* Enhanced Responsive Border Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top border - responsive thickness */}
        <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 
          bg-gradient-to-r from-transparent via-blue-400/80 to-transparent" />
        <div className="absolute top-0 left-1/4 right-1/4 h-1 sm:h-2 
          bg-gradient-to-r from-transparent via-blue-500/60 to-transparent blur-sm" />
        
        {/* Side borders - responsive */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 sm:w-1 
          bg-gradient-to-b from-transparent via-blue-400/80 to-transparent" />
        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 sm:w-2 
          bg-gradient-to-b from-transparent via-blue-500/60 to-transparent blur-sm" />
        
        <div className="absolute right-0 top-0 bottom-0 w-0.5 sm:w-1 
          bg-gradient-to-b from-transparent via-blue-400/80 to-transparent" />
        <div className="absolute right-0 top-1/4 bottom-1/4 w-1 sm:w-2 
          bg-gradient-to-b from-transparent via-blue-500/60 to-transparent blur-sm" />
        
        {/* Bottom border - responsive */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 
          bg-gradient-to-r from-transparent via-blue-400/80 to-transparent" />
        <div className="absolute bottom-0 left-1/4 right-1/4 h-1 sm:h-2 
          bg-gradient-to-r from-transparent via-blue-500/60 to-transparent blur-sm" />
        
        {/* Responsive corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 
          bg-gradient-to-br from-blue-400/40 via-cyan-500/30 to-transparent 
          blur-sm opacity-60" />
        <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 
          bg-gradient-to-tl from-green-400/40 via-emerald-500/30 to-transparent 
          blur-sm opacity-60" />
      </div>
      
      {/* Responsive Animated Background Elements */}
      {isMounted && (
        <div className="absolute inset-0">
          {/* Floating particles - responsive count */}
          {[...Array(getParticleCount())].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-cyan-400 rounded-full opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.6, 0.2],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Data streams - responsive */}
          {[...Array(getDataStreamCount())].map((_, i) => (
            <motion.div
              key={`trail-${i}`}
              className="absolute w-12 h-0.5 sm:w-16 sm:h-0.5 lg:w-20 lg:h-0.5 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                rotate: `${Math.random() * 360}deg`,
              }}
              animate={{
                x: [0, 100, -100, 0],
                opacity: [0, 0.4, 0.2, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      )}

      {/* Mouse Follower - Hide on mobile */}
      {isMounted && (
        <motion.div
          className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference hidden sm:block"
          style={{
            left: springX,
            top: springY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <div className="w-full h-full bg-white rounded-full opacity-60" />
        </motion.div>
      )}

      {/* Main Container - Responsive padding */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section - Responsive grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mt-8 sm:mt-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Future-Ready
                <span className="block bg-gradient-to-r from-purple-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
                  IT Solutions
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-gray-300 max-w-lg leading-relaxed mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Transform your business with cutting-edge cloud infrastructure, cybersecurity, and custom development solutions.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-green-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-400/25 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Get Started</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 text-white rounded-full font-semibold hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm">
                View Portfolio
              </button>
            </motion.div>
          </motion.div>

          {/* Enhanced IT-focused Right Visual - Fully Responsive */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-50 flex justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/15 to-green-500/10 rounded-full blur-2xl sm:blur-3xl" />
            
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
              {/* Central Server Core - Responsive */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-lg z-10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 via-blue-400/40 to-green-400/50 rounded-lg blur-lg" />
                <div className="absolute inset-1 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg shadow-2xl shadow-blue-500/50" />
                <div className="absolute inset-2 bg-gradient-to-r from-purple-400 to-green-400 rounded-md animate-pulse" />
                <div className="absolute inset-3 bg-gray-900 rounded-md flex items-center justify-center">
                  <Server className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-400" />
                </div>
              </motion.div>

              {/* Data Connection Lines - Responsive */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`connection-${i}`}
                  className="absolute w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ rotate: i * 60 }}
                >
                  <div className="absolute top-1/2 left-1/2 w-16 h-0.5 sm:w-20 sm:h-0.5 lg:w-24 lg:h-0.5 bg-gradient-to-r from-cyan-400/80 to-transparent origin-left -translate-y-0.25" />
                  <div className="absolute top-1/2 left-1/2 w-20 h-0.5 sm:w-24 sm:h-0.5 lg:w-28 lg:h-0.5 bg-gradient-to-r from-green-400/60 to-transparent origin-left -translate-y-0.25" 
                       style={{ rotate: '10deg' }} />
                </motion.div>
              ))}

              {/* IT Service Nodes - Responsive */}
              {[
                { icon: Cloud, color: 'from-blue-400 to-cyan-500', label: 'Cloud' },
                { icon: Shield, color: 'from-purple-400 to-pink-500', label: 'Security' },
                { icon: Database, color: 'from-green-400 to-emerald-500', label: 'Data' },
                { icon: Code, color: 'from-orange-400 to-red-500', label: 'Dev' },
                { icon: Workflow, color: 'from-indigo-400 to-purple-500', label: 'Ops' },
                { icon: Globe, color: 'from-teal-400 to-blue-500', label: 'Web' },
                { icon: Terminal, color: 'from-gray-400 to-slate-500', label: 'CLI' },
                { icon: Settings, color: 'from-yellow-400 to-amber-500', label: 'Config' },
                { icon: Network, color: 'from-lime-400 to-green-600', label: 'Network' },
                { icon: Layers, color: 'from-rose-400 to-pink-600', label: 'Infra' },
                { icon: Key, color: 'from-stone-400 to-zinc-500', label: 'Auth' },
                { icon: Wifi, color: 'from-sky-400 to-blue-600', label: 'Connect' },
                { icon: CloudLightning, color: 'from-cyan-500 to-blue-400', label: 'Cloud+' },
                { icon: Code2, color: 'from-fuchsia-400 to-violet-500', label: 'Code+' },
                { icon: Bug, color: 'from-red-500 to-orange-400', label: 'Debug' },
                { icon: Rocket, color: 'from-emerald-500 to-teal-400', label: 'Deploy' },
                { icon: Cpu, color: 'from-slate-600 to-gray-700', label: 'Compute' },
                { icon: Lock, color: 'from-amber-600 to-yellow-500', label: 'Secure' },
                { icon: Target, color: 'from-red-600 to-pink-500', label: 'Focus' },
                { icon: TrendingUp, color: 'from-blue-600 to-indigo-500', label: 'Growth' },
                { icon: Sparkles, color: 'from-orange-500 to-yellow-400', label: 'Innovate' },
                { icon: Database, color: 'from-teal-600 to-cyan-500', label: 'Data Store' },
                { icon: Server, color: 'from-purple-600 to-blue-500', label: 'Backend' },
              ].map((node, i) => (
                <motion.div
                  key={`node-${i}`}
                  className="absolute"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 12 + i * 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    transformOrigin: `${40 + i * 20}px 0px`,
                  }}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-r ${node.color} p-1.5 sm:p-2 shadow-lg shadow-current/50 hover:scale-110 transition-transform cursor-pointer`}>
                    <node.icon className="w-full h-full text-white" />
                  </div>
                </motion.div>
              ))}

              {/* Network Rings - Responsive */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`ring-${i}`}
                  className={`absolute border-2 rounded-full ${
                    i === 0 ? 'w-40 h-40 sm:w-48 sm:h-48 lg:w-60 lg:h-60 border-purple-400/60' :
                    i === 1 ? 'w-52 h-52 sm:w-60 sm:h-60 lg:w-80 lg:h-80 border-blue-400/60' :
                    'w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 border-green-400/60'
                  }`}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 25 + i * 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    borderStyle: 'dashed',
                    borderWidth: '1px',
                  }}
                />
              ))}

              {/* Data Packets - Responsive */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`packet-${i}`}
                  className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/80 rounded-full shadow-lg shadow-white/30"
                  style={{
                    left: `${30 + (i % 4) * 15}%`,
                    top: `${30 + Math.floor(i / 4) * 15}%`,
                  }}
                  animate={{
                    y: [0, -8, 0],
                    x: [0, 4, -4, 0],
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Enhanced Glow Effects - Responsive */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-1/3 left-1/3 w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40 bg-green-400/15 rounded-full blur-xl animate-pulse" 
                     style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-14 h-14 sm:w-20 sm:h-20 lg:w-28 lg:h-28 bg-blue-400/20 rounded-full blur-lg animate-pulse" 
                     style={{ animationDelay: '2s' }} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Strengths Section - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-16 sm:mb-20 mt-16 sm:mt-20"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12 text-center">
            Why Choose Our IT Services
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {strengths.map((strength, index) => (
              <motion.div
                key={index}
                className="group relative p-4 sm:p-6 bg-black/20 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                onHoverStart={() => setHoveredStrength(index)}
                onHoverEnd={() => setHoveredStrength(null)}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${strength.color} p-2 sm:p-3 mb-3 sm:mb-4 group-hover:shadow-lg transition-all duration-300`}>
                  <strength.icon className="w-full h-full text-white" />
                </div>
                
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  {strength.title}
                </h3>
                
                <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors mb-2">
                  {strength.description}
                </p>

                <div className="text-xs text-green-400 font-semibold">
                  {strength.stats}
                </div>

                {hoveredStrength === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-green-400/10 rounded-xl sm:rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}

              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Responsive Floating Action Button */}
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <button className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 to-green-500 rounded-full shadow-lg shadow-purple-400/25 flex items-center justify-center text-white font-bold text-lg hover:scale-110 transition-transform duration-300">
          <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </motion.div>
    </div>
  );
};

export default HeadingSection;