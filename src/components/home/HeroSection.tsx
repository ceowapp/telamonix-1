"use client"
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { FaArrowRight, FaCheck, FaRocket, FaCode, FaShieldAlt } from 'react-icons/fa';
import LineEffect from './LineEffect';

interface CustomButtonProps {
  text?: string;
  onClick?: () => void;
  primary?: boolean;
  icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text = 'Explore',
  onClick,
  primary = true,
  icon = <FaArrowRight />
}) => {
  return (
    <motion.button
      className={`relative w-full sm:w-[220px] tracking-wider text-white outline-none
        h-[60px] text-sm overflow-hidden group flex items-center justify-center px-6
        before:absolute before:inset-0 before:bg-gradient-to-r
        ${primary
          ? 'before:from-cyan-500 before:via-blue-500 before:to-purple-600 shadow-lg shadow-blue-500/25'
          : 'before:from-slate-600 before:via-slate-500 before:to-slate-400 shadow-lg shadow-slate-500/25'
        }
        before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100
        bg-gradient-to-r ${primary
          ? 'from-cyan-600/20 via-blue-600/20 to-purple-600/20 border-cyan-400/50'
          : 'from-slate-600/20 via-slate-500/20 to-slate-400/20 border-slate-400/50'
        }
        border-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl
        ${primary ? 'hover:shadow-cyan-500/40' : 'hover:shadow-slate-500/40'}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={onClick}
    >
      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent
        opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />

      <motion.span
        className="relative z-10 flex items-center justify-center gap-3 font-medium"
        whileHover={{ x: 3 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-base">{text}</span>
        <motion.div
          whileHover={{ x: 5, rotate: -15 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
      </motion.span>
    </motion.button>
  );
};

interface TypewriterEffectProps {
  texts: string[];
  speed?: number;
  delayBetweenTexts?: number;
}
const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  texts,
  speed = 100,
  delayBetweenTexts = 2000
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const typeText = useCallback(() => {
    const currentText = texts[currentTextIndex];
    if (!currentText) {
      return;
    }

    if (!isDeleting) {
      if (displayedText.length < currentText.length) {
        const nextText = currentText.slice(0, displayedText.length + 1);
        setDisplayedText(nextText);
      } else {
        setTimeout(() => {
          setShowGlitch(true);
          setTimeout(() => {
            setShowGlitch(false);
            setIsDeleting(true);
          }, 500); 
        }, delayBetweenTexts);
      }
    } else { 
      if (displayedText.length > 0) {
        const nextText = displayedText.slice(0, -1);
        setDisplayedText(nextText);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % texts.length;
          return nextIndex;
        });
      }
    }
  }, [texts, currentTextIndex, displayedText, isDeleting, delayBetweenTexts]);

  useEffect(() => {
    if (!showGlitch) {
      const timeout = setTimeout(typeText, isDeleting ? speed / 2 : speed);
      return () => {
        clearTimeout(timeout);
      };
    } else {
        console.log('useEffect: Glitch active, skipping timeout for typeText.');
    }
  }, [typeText, isDeleting, speed, showGlitch, displayedText]); // Added displayedText as dependency

  useEffect(() => {
    if (cursorRef.current) {
      const animation = gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
      return () => {
        animation.kill();
      };
    }
  }, []);

  return (
    <div className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400
      text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wider min-h-[60px] sm:min-h-[70px] md:min-h-[80px] font-light">
      <motion.span
        className={`${showGlitch ? 'animate-pulse' : ''}`}
        animate={showGlitch ? { x: [0, -2, 2, 0], opacity: [1, 0.8, 1, 1] } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.1, repeat: showGlitch ? 5 : 0 }}
      >
        {displayedText}
      </motion.span>
      <div
        ref={cursorRef}
        className="inline-block absolute w-[3px] sm:w-[4px] h-[24px] sm:h-[32px] md:h-[40px] ml-1
          bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"
      />
    </div>
  );
};


const RotatingText: React.FC = () => {
  const texts = ['INDIVIDUALS', 'STARTUPS', 'BUSINESSES', 'ENTERPRISES'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="relative h-16 sm:h-20 md:h-24 lg:h-28 overflow-hidden">
      <motion.div
        key={currentIndex}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold
          bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text"
      >
        {texts[currentIndex]}
      </motion.div>
    </div>
  );
};

const SlidingText: React.FC = () => {
  const texts = ['INDIVIDUALS', 'STARTUPS', 'BUSINESSES', 'ENTERPRISES'];

  return (
    <div className="relative h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden">
      <motion.div
        animate={{
          y: [0, -80, -160, -240, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
        className="flex flex-col"
      >
        {texts.map((text, index) => (
          <div
            key={index}
            className="h-20 sm:h-24 md:h-28 lg:h-32 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold
              bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text"
          >
            {text}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

interface AnimatedCounterProps {
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  label,
  prefix = '',
  suffix = '',
  icon
}) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          let start = 0;
          const duration = 2500;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * target));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          if (counterRef.current) {
            observer.unobserve(counterRef.current);
          }
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [target]);

  return (
    <motion.div
      ref={counterRef}
      whileHover={{ scale: 1.08, y: -5 }}
      className="relative text-center p-6 bg-gradient-to-br from-white/5 via-cyan-500/5 to-blue-500/5
        rounded-2xl backdrop-blur-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10
        hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

      <div className="relative z-10">
        {icon && (
          <div className="text-2xl sm:text-3xl text-cyan-400 mb-2 flex justify-center">
            {icon}
          </div>
        )}
        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent
          bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-2">
          {prefix}{count}{suffix}
        </div>
        <h4 className="text-xs sm:text-sm uppercase tracking-wider text-cyan-300/80 font-medium">
          {label}
        </h4>
      </div>
    </motion.div>
  );
};

interface HeroSectionProps {
  handleScrollTo: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ handleScrollTo }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll('.animate-in');
    gsap.fromTo(elements,
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out'
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen">
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y }}>
        <div className="absolute top-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full
          bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-purple-600/20 blur-[80px]" />
        <div className="absolute top-[10%] right-[60%] w-[30%] h-[30%] rounded-full
          bg-gradient-to-br from-purple-500/15 to-pink-500/10 blur-[80px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full
          bg-gradient-to-tr from-blue-500/20 via-cyan-500/15 to-teal-500/20 blur-[60px]" />
        <div className="absolute inset-0 opacity-[0.1]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)]
            bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0118] via-[#12033a]/80 to-transparent" />
      </motion.div>

      <div ref={lineContainerRef} className="absolute inset-0 z-0 opacity-20" />
      <LineEffect containerRef={lineContainerRef} />

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 mb-[356px] relative z-10"
        style={{ opacity }}
      >
        <div className="flex flex-col items-center justify-center text-center max-w-6xl mx-auto">
          <div className="space-y-8 animate-in">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold
                leading-tight tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r
                  from-cyan-400 via-blue-500 to-purple-600 mb-2 sm:mb-4">
                  Telamonix
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                  text-white/90 font-light tracking-wide">
                  provides solutions for
                </span>
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <RotatingText />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <TypewriterEffect
                texts={[
                  "Transforming ideas into digital reality with cutting-edge innovation.",
                  "Building the future of technology, one solution at a time.",
                  "Where visionary concepts meet flawless execution."
                ]}
                speed={60}
                delayBetweenTexts={4000}
              />
            </motion.div>
          </div>

          <motion.div
            className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 animate-in max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { text: 'Expert Development Team', icon: <FaCode className="text-cyan-400" /> },
              { text: 'Cutting-Edge Technology', icon: <FaRocket className="text-blue-400" /> },
              { text: 'Enterprise-Grade Security', icon: <FaShieldAlt className="text-purple-400" /> }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-3
                  p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm
                  border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 text-2xl sm:text-xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <span className="text-white/90 text-center sm:text-left font-medium text-sm sm:text-base">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 mt-12 sm:mt-16 animate-in"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <CustomButton
              text="Start Your Journey"
              onClick={handleScrollTo}
              primary={true}
              icon={<FaRocket />}
            />
            <CustomButton
              text="Explore Services"
              onClick={() => {}}
              primary={false}
              icon={<FaArrowRight />}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-16 sm:mt-20 animate-in max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <AnimatedCounter
              label="Projects Delivered"
              target={150}
              suffix="+"
              icon={<FaCheck />}
            />
            <AnimatedCounter
              label="Years Experience"
              target={8}
              suffix="+"
              icon={<FaRocket />}
            />
            <AnimatedCounter
              label="Client Rating"
              target={5}
              prefix="★ "
              icon={<FaShieldAlt />}
            />
          </motion.div>
        </div>
        <motion.div
          className="relative top-32 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default React.memo(HeroSection);