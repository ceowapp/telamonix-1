import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Target, 
  TrendingUp,
  ChevronRight,
  Layers,
  Database,
  Cpu,
  Globe
} from 'lucide-react';

const ProjectSection = () => {
  const [activeTab, setActiveTab] = useState('Heading');
  const [hoveredStrength, setHoveredStrength] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const tabs = ['Plates', 'Energy', 'Heading'];
  
  const strengths = [
    {
      icon: Layers,
      title: 'Remote Synthesis',
      description: 'Advanced quantum processing',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: Database,
      title: 'Quantum Caching',
      description: 'Instantaneous data retrieval',
      color: 'from-purple-400 to-pink-400'
    },
    {
      icon: Cpu,
      title: 'Neural Engine',
      description: 'AI-powered optimization',
      color: 'from-green-400 to-emerald-400'
    },
    {
      icon: Globe,
      title: 'Global Overflow',
      description: 'Worldwide connectivity',
      color: 'from-orange-400 to-red-400'
    }
  ];

  const opals = [
    { price: '$150', type: 'Standard', popular: false },
    { price: '$200', type: 'Premium', popular: true },
    { price: '$250', type: 'Enterprise', popular: false }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background with Purple to Green Gradient */}
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: 'url(/images/pages/projects/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <motion.div className="absolute inset-0 overflow-hidden">
        {/* Purple gradient at top-right */}
        <div className="absolute top-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full
          bg-gradient-to-br from-purple-600/30 via-violet-500/20 to-purple-800/25 blur-[80px]" />
        
        {/* Additional purple accent */}
        <div className="absolute top-[5%] right-[5%] w-[30%] h-[30%] rounded-full
          bg-gradient-to-br from-purple-500/20 to-indigo-600/15 blur-[60px]" />
        
        {/* Green gradient at bottom-left */}
        <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full
          bg-gradient-to-tr from-green-500/25 via-emerald-400/20 to-teal-500/25 blur-[60px]" />
        
        {/* NEW: Green blob at bottom-right corner */}
        <div className="absolute bottom-[-20%] right-[-20%] w-[40%] h-[40%] rounded-full
          bg-gradient-to-tl from-green-400/35 via-emerald-500/25 to-green-600/30 blur-[70px]" />
        
        {/* Additional green accent at bottom-left */}
        <div className="absolute bottom-[0%] left-[5%] w-[35%] h-[35%] rounded-full
          bg-gradient-to-tr from-cyan-400/15 to-green-500/20 blur-[70px]" />

        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)]
            bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0118] via-[#12033a]/60 to-transparent" />
      </motion.div>

      {/* Enhanced Border Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top border gradient - Blueish, thicker at center */}
        <div className="absolute top-0 left-0 right-0 h-1 
          bg-gradient-to-r from-transparent via-blue-400/80 to-transparent" />
        <div className="absolute top-0 left-1/4 right-1/4 h-2 
          bg-gradient-to-r from-transparent via-blue-500/60 to-transparent blur-sm" />
        
        {/* Left border gradient - Blueish, thicker at center */}
        <div className="absolute left-0 top-0 bottom-0 w-1 
          bg-gradient-to-b from-transparent via-blue-400/80 to-transparent" />
        <div className="absolute left-0 top-1/4 bottom-1/4 w-2 
          bg-gradient-to-b from-transparent via-blue-500/60 to-transparent blur-sm" />
        
        {/* Right border gradient - Blueish, thicker at center */}
        <div className="absolute right-0 top-0 bottom-0 w-1 
          bg-gradient-to-b from-transparent via-blue-400/80 to-transparent" />
        <div className="absolute right-0 top-1/4 bottom-1/4 w-2 
          bg-gradient-to-b from-transparent via-blue-500/60 to-transparent blur-sm" />
        
        {/* Bottom border gradient - Blueish, thicker at center */}
        <div className="absolute bottom-0 left-0 right-0 h-1 
          bg-gradient-to-r from-transparent via-blue-400/80 to-transparent" />
        <div className="absolute bottom-0 left-1/4 right-1/4 h-2 
          bg-gradient-to-r from-transparent via-blue-500/60 to-transparent blur-sm" />
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 
          bg-gradient-to-br from-blue-400/40 via-cyan-500/30 to-transparent 
          blur-sm opacity-60" />
        <div className="absolute bottom-0 right-0 w-32 h-32 
          bg-gradient-to-tl from-green-400/40 via-emerald-500/30 to-transparent 
          blur-sm opacity-60" />
      </div>
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-50"
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

        {/* Cosmic dust trails */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`trail-${i}`}
            className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
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

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: springX,
          top: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-full h-full bg-white rounded-full opacity-60" />
      </motion.div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Quantum
                <span className="block bg-gradient-to-r from-purple-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
                  Headline
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Experience the future of digital innovation with our advanced quantum processing technology and neural optimization systems.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-green-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-400/25 transition-all duration-300 flex items-center space-x-2">
                <span>Get Started</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 border border-white/20 text-white rounded-full font-semibold hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm">
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* Enhanced Right Visual - More Visible and Prominent */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-50"
          >
            {/* Background highlight to make it more visible */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/15 to-green-500/10 rounded-full blur-3xl" />
            
            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Central Galaxy Core - More Prominent */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-40 h-40 rounded-full z-10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 via-blue-400/40 to-green-400/50 rounded-full blur-lg" />
                <div className="absolute inset-4 bg-gradient-conic from-purple-400 via-blue-500 to-green-400 rounded-full opacity-80 animate-pulse shadow-2xl shadow-blue-500/50" />
                <div className="absolute inset-8 bg-white/95 rounded-full shadow-2xl shadow-purple-500/60" />
                <div className="absolute inset-12 bg-gradient-to-r from-purple-400 to-green-400 rounded-full animate-pulse" />
              </motion.div>

              {/* Enhanced Spiral Arms - More Visible */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`spiral-${i}`}
                  className="absolute w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 15 + i * 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ rotate: i * 90 }}
                >
                  <div className="absolute top-1/2 left-1/2 w-32 h-1.5 bg-gradient-to-r from-purple-400/80 via-blue-400/60 to-transparent origin-left -translate-y-0.75 shadow-lg shadow-purple-400/30" />
                  <div className="absolute top-1/2 left-1/2 w-40 h-1 bg-gradient-to-r from-green-400/70 via-cyan-400/50 to-transparent origin-left -translate-y-0.5 shadow-lg shadow-green-400/30" 
                       style={{ rotate: '15deg' }} />
                </motion.div>
              ))}

              {/* Enhanced Orbiting Planets - More Visible */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`planet-${i}`}
                  className={`absolute w-${3 + i} h-${3 + i} rounded-full`}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    transformOrigin: `${60 + i * 15}px 0px`,
                  }}
                >
                  <div className={`w-full h-full rounded-full ${
                    i % 3 === 0 ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
                    i % 3 === 1 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                    'bg-gradient-to-r from-green-400 to-emerald-500'
                  } shadow-lg shadow-current/50 animate-pulse`} />
                </motion.div>
              ))}

              {/* Enhanced Cosmic Rings - More Visible */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`ring-${i}`}
                  className={`absolute border-2 rounded-full ${
                    i === 0 ? 'w-60 h-60 border-purple-400/60 shadow-lg shadow-purple-400/30' :
                    i === 1 ? 'w-80 h-80 border-blue-400/60 shadow-lg shadow-blue-400/30' :
                    'w-96 h-96 border-green-400/60 shadow-lg shadow-green-400/30'
                  }`}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 20 + i * 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    borderStyle: 'dashed',
                    borderWidth: '2px',
                  }}
                />
              ))}

              {/* Enhanced Floating Asteroids */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`asteroid-${i}`}
                  className="absolute w-2 h-2 bg-white/80 rounded-full shadow-lg shadow-white/30"
                  style={{
                    left: `${30 + (i % 4) * 15}%`,
                    top: `${30 + Math.floor(i / 4) * 15}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    x: [0, 5, -5, 0],
                    rotate: [0, 180, 360],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Enhanced Nebula Effect - More Prominent */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl animate-pulse shadow-2xl shadow-purple-500/40" />
                <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-green-400/25 rounded-full blur-2xl animate-pulse shadow-2xl shadow-green-400/40" 
                     style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-blue-400/30 rounded-full blur-xl animate-pulse shadow-2xl shadow-blue-400/40" 
                     style={{ animationDelay: '2s' }} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Strengths Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Core Strengths
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengths.map((strength, index) => (
              <motion.div
                key={index}
                className="group relative p-6 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                onHoverStart={() => setHoveredStrength(index)}
                onHoverEnd={() => setHoveredStrength(null)}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${strength.color} p-3 mb-4 group-hover:shadow-lg transition-all duration-300`}>
                  <strength.icon className="w-full h-full text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">
                  {strength.title}
                </h3>
                
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  {strength.description}
                </p>

                {hoveredStrength === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-green-400/10 rounded-2xl"
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

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <button className="w-14 h-14 bg-gradient-to-r from-purple-500 to-green-500 rounded-full shadow-lg shadow-purple-400/25 flex items-center justify-center text-white font-bold text-lg hover:scale-110 transition-transform duration-300">
          <Zap className="w-6 h-6" />
        </button>
      </motion.div>
    </div>
  );
};

export default ProjectSection;