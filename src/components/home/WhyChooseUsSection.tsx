import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaUsers, FaLightbulb, FaShieldAlt, FaClock, FaChartLine, FaHandshake, FaGlobe } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const reasons = [
  { icon: FaRocket, title: 'Innovative Solutions', description: 'Cutting-edge technology to keep you ahead', color: 'from-blue-400 to-indigo-600' },
  { icon: FaUsers, title: 'Expert Team', description: 'Skilled professionals with years of experience', color: 'from-green-400 to-teal-600' },
  { icon: FaLightbulb, title: 'Customized Approach', description: 'Tailored solutions to fit your unique needs', color: 'from-yellow-400 to-orange-600' },
  { icon: FaShieldAlt, title: 'Reliable Security', description: 'Top-notch security measures to protect your data', color: 'from-red-400 to-pink-600' },
  { icon: FaClock, title: 'Timely Delivery', description: 'Efficient processes ensuring on-time project completion', color: 'from-purple-400 to-indigo-600' },
  { icon: FaChartLine, title: 'Scalable Solutions', description: 'Grow your business with our adaptable technologies', color: 'from-cyan-400 to-blue-600' },
  { icon: FaHandshake, title: 'Dedicated Support', description: '24/7 customer service and technical assistance', color: 'from-amber-400 to-orange-600' },
  { icon: FaGlobe, title: 'Global Reach', description: 'Serving clients worldwide with localized expertise', color: 'from-emerald-400 to-green-600' },
];

const WhyChooseUsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="why-choose-us" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2 
          className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Why Choose Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${reason.color} rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className="relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-xl overflow-hidden h-full flex flex-col justify-between">
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  initial={false}
                  animate={hoveredIndex === index ? { scale: 1.5 } : { scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <div>
                  <reason.icon className="text-4xl text-white mb-4 mx-auto" />
                  <h3 className="text-xl font-bold mb-2 text-white">{reason.title}</h3>
                  <p className="text-gray-200 text-sm">{reason.description}</p>
                </div>
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      className="mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-sm hover:bg-opacity-90 transition-colors duration-300">
                        Learn More
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;