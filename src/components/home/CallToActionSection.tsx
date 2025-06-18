import React from 'react';
import { motion } from 'framer-motion';

const CallToActionSection = () => {
  return (
    <section className="max-w-8xl w-[calc(100%-48px)] mx-auto mt-8 -mb-8 px-6 py-16 relative z-10 bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-3xl border border-white border-opacity-10 border-t-2">
      <div className="max-w-4xl mx-auto text-center">

        {/* Badge */}
        <motion.div
          className="mb-8 inline-block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <span className="px-6 py-2 bg-[#0945EB]/20 rounded-full text-[#67D1FF] font-semibold text-sm tracking-wider uppercase">
            Elevate Your Business
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-5xl sm:text-6xl font-bold mb-6 text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0945EB] via-[#67D1FF] to-[#0945EB]">
            Transform Your Digital Presence
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-xl sm:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Join the industry leaders who have revolutionized their operations with our cutting-edge technology solutions.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full font-bold text-lg text-white shadow-lg hover:shadow-indigo-500/50 transition duration-300 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Get Started Today</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>

          <motion.button
            className="px-8 py-4 border-2 border-white border-opacity-30 rounded-full font-bold text-lg text-white hover:bg-white hover:bg-opacity-10 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Our Portfolio
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default CallToActionSection;