import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';
import { technologies, industries, projects } from '@/constants/data';

gsap.registerPlugin(ScrollTrigger);

const TabDropdown = ({ category, items, selectedItem, setSelectedItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium flex items-center justify-between w-64 shadow-lg"
      >
        <span>{selectedItem === 'All' ? category : selectedItem}</span>
        <ChevronDown
          className={`ml-2 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-64 bg-white rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto"
          >
            {items.map((item) => (
              <motion.button
                key={item}
                whileHover={{ backgroundColor: '#EEF2FF' }}
                onClick={() => {
                  setSelectedItem(item);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  selectedItem === item ? 'bg-indigo-100 text-indigo-800' : 'text-gray-800'
                }`}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PortfolioSection = () => {
  const [selectedTechnology, setSelectedTechnology] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const containerRef = useRef(null);

  useEffect(() => {
    const filteredItems = projects.filter(project => 
      (selectedTechnology === 'All' || project.tags.includes(selectedTechnology)) &&
      (selectedIndustry === 'All' || project.tags.includes(selectedIndustry))
    );
    setFilteredProjects(filteredItems);
    setVisibleProjects(6);
  }, [selectedTechnology, selectedIndustry]);

  useEffect(() => {
    const container = containerRef.current;
    gsap.fromTo(container.querySelectorAll('.project-item'),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, [filteredProjects, visibleProjects]);

  const loadMore = () => {
    setVisibleProjects(prevVisible => Math.min(prevVisible + 6, filteredProjects.length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-extrabold text-gray-900 text-center mb-4 tracking-tight"
        >
          Our Portfolio
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto"
        >
          Explore our diverse range of cutting-edge projects across various technologies and industries
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <TabDropdown 
            category="Technologies" 
            items={['All', ...technologies]} 
            selectedItem={selectedTechnology} 
            setSelectedItem={setSelectedTechnology} 
          />
          <TabDropdown 
            category="Industries" 
            items={['All', ...industries]} 
            selectedItem={selectedIndustry} 
            setSelectedItem={setSelectedIndustry} 
          />
        </div>

        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <AnimatePresence>
            {filteredProjects.slice(0, visibleProjects).map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="project-item bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative w-full h-56 overflow-hidden group">
                  <NextImage
                    alt={project.title}
                    src={project.image}
                    className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link href={project.link} target="_blank" className="text-white text-lg font-semibold hover:underline flex items-center">
                      View Project
                      <ChevronRight className="ml-1" />
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleProjects < filteredProjects.length && (
          <div className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMore}
              className="px-8 py-3 bg-indigo-600 text-white rounded-full font-medium shadow-lg hover:bg-indigo-700 transition-colors duration-300"
            >
              Load More
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioSection;