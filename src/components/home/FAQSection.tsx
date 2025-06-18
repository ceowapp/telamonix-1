import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { faqs } from '@/constants/data';

const faqColumns = [
  faqs.slice(0, Math.ceil(faqs.length / 2)),
  faqs.slice(Math.ceil(faqs.length / 2))
];

const FAQItem = ({ faq, index, isActive, onToggle }) => {
  const itemRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: index * 0.1 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={itemVariants}
      className="mb-5"
    >
      <div 
        ref={itemRef}
        className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
          isActive ? 'ring-2 ring-indigo-500/50 shadow-lg shadow-indigo-500/20' : 'shadow-md'
        }`}
      >
        {/* Gold gradient accent line */}
        <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-300 transform transition-transform duration-500 ${isActive ? 'scale-y-100' : 'scale-y-0'}`}></div>
        
        <button
          className={`w-full flex justify-between items-center p-5 text-left bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ${
            isActive ? 'text-white' : 'text-gray-100'
          } hover:text-white transition-colors duration-300`}
          onClick={onToggle}
        >
          <span className="font-medium text-lg flex items-center">
            <span className={`inline-block w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
              isActive ? 'bg-amber-400 scale-125' : 'bg-indigo-400'
            }`}></span>
            {faq.question}
          </span>
          <motion.span
            animate={{ rotate: isActive ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-light text-indigo-300"
          >
            +
          </motion.span>
        </button>
        
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-5 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-gray-300 border-t border-gray-700">
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const handleToggle = (columnIndex, itemIndex) => {
    const globalIndex = columnIndex === 0 
      ? itemIndex 
      : itemIndex + faqColumns[0].length;
      
    setActiveIndex(activeIndex === globalIndex ? null : globalIndex);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      
      {/* Background animated patterns */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
        
        {/* Animated grid lines */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Gold accent lines */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scaleY: [1, 1.5, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scaleY: [1, 1.5, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0945EB] via-[#67D1FF] to-[#0945EB]">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-blue-200 mt-5 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our services and solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {faqColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              {column.map((faq, itemIndex) => {
                const globalIndex = columnIndex === 0 
                  ? itemIndex 
                  : itemIndex + faqColumns[0].length;
                
                return (
                  <FAQItem
                    key={`faq-${columnIndex}-${itemIndex}`}
                    faq={faq}
                    index={globalIndex}
                    isActive={activeIndex === globalIndex}
                    onToggle={() => handleToggle(columnIndex, itemIndex)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(FAQSection);