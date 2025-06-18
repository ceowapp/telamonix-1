"use client"
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { reasons } from '@/constants/data'; 

interface Reason {
  icon: React.ElementType;
  title: string;
  description: string;
  colorClass: string; 
}

const CardItem = ({ reason }: { reason: Reason }) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerCardClass = `container-card ${reason.colorClass || 'bg-green-box'}`;
  return (
    <div
      className="card-post"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={containerCardClass}>
        <div className={`rounded-full p-4 bg-white/10 backdrop-blur-md max-w-fit ${reason.colorClass || 'bg-green-box'}`}>
          <reason.icon className="text-3xl text-white" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-200 transition-colors duration-300">
          {reason.title}
        </h3>
        <p className="text-gray-100 text-sm">{reason.description}</p>
        <div className="shine"></div>
        <div className="background">
          <div className="tiles">
            <div className="tile tile-1"></div>
            <div className="tile tile-2"></div>
            <div className="tile tile-3"></div>
            <div className="tile tile-4"></div>

            <div className="tile tile-5"></div>
            <div className="tile tile-6"></div>
            <div className="tile tile-7"></div>
            <div className="tile tile-8"></div>

            <div className="tile tile-9"></div>
            <div className="tile tile-10"></div>
          </div>

          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
        </div>
      </div>
    </div>
  );
};

const WhyChooseUsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.8,
        ease: "easeIn"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 1,
        ease: "easeIn"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <section className="py-24 relative overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#0945EB] via-[#67D1FF] to-[#0945EB] rounded-full blur-3xl"
            animate={{
              x: [50, -50, 50],
              y: [-50, 50, -50],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-[#0945EB] via-[#67D1FF] to-[#0945EB] rounded-full blur-3xl"
            animate={{
              x: [-30, 30, -30],
              y: [30, -30, 30],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10" ref={ref}>
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate={controls}
            className="text-center mb-20"
          >
            <div className="inline-block">
              <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0945EB] via-[#67D1FF] to-[#0945EB]">
                  Why Choose Us
                </span>
              </h2>
            </div>
            <p className="text-xl text-blue-100 mt-6 max-w-3xl mx-auto">
              We deliver exceptional solutions with unmatched expertise and dedication
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {reasons.map((reason, index) => (
              <motion.div key={index} variants={itemVariants}>
                <CardItem reason={reason} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUsSection;