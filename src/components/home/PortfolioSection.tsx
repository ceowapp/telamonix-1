import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const categories = ['Technologies', 'Industries'];

const technologies = [
  "Web", "Mobile", "Application", "Data Science", "AI", "Cloud Services", 
  "Blockchain", "Computer Vision", "AR/VR", "IoT", "Cybersecurity", 
  "DevOps", "UI/UX", "3D Modeling", "Game Development"
];

const industries = [
  "IT", "Construction", "Hospitality", "E-commerce", "SaaS", "Healthcare", 
  "Finance", "Education", "Manufacturing", "Retail", "Entertainment", 
  "Real Estate", "Automotive", "Energy", "Agriculture"
];

const projects = [
  { title: 'WApp Platform', image: '/global/images/portfolio/product-1.png', link: 'https://wapp-pi.vercel.app', tags: ['Web', 'SaaS', 'UI/UX', 'Fullstack'] },
  { title: 'Doc2Product', image: '/global/images/portfolio/product-shopify-1.png', link: 'https://youtu.be/sLqAy2-sGfY?si=-YDeN5f0cUBvWwja', tags: ['Shopify', 'SaaS', 'UI/UX', 'Fullstack', 'AI', 'SEO'] },
  { title: 'Optiwrite', image: '/global/images/portfolio/product-shopify-2.png', link: 'https://youtu.be/T30vhzfHLRA?si=ye0Hs3CPP1tybWW3', tags: ['Shopify', 'SaaS', 'UI/UX', 'Fullstack', 'AI', 'SEO'] },
  { title: 'Jewelry Try-on', image: '/global/images/portfolio/product-2.png', link: 'http://54.253.104.12:8000/index-ai.html/', tags: ['Web', 'Application', 'IT', 'AI', 'AR/VR', 'Retail'] },
  { title: '3D Generator', image: '/global/images/portfolio/product-3.png', link: 'http://54.253.104.12:8000/index-3d.html/', tags: ['Mobile', 'IT', 'AI', '3D Modeling'] },
  { title: 'Face Animation', image: '/global/images/portfolio/product-4.png', link: 'http://54.253.104.12:8000/faceAnimation.html/', tags: ['Web', 'IT', 'Computer Vision', 'Entertainment'] },
  { title: 'ARVR Application', image: '/global/images/portfolio/product-5.png', link: 'http://54.253.104.12:8000/index-txt.html/', tags: ['AR/VR', 'IT', 'Mobile'] },
  { title: 'Stereo VR', image: '/global/images/portfolio/product-6.png', link: 'http://54.253.104.12:8000/stereo-vr.html/', tags: ['AR/VR', 'IT', 'Entertainment'] },
  { title: 'Immersive VR', image: '/global/images/portfolio/product-7.png', link: 'http://54.253.104.12:8000/immersive-vr.html/', tags: ['AR/VR', 'IT', 'Education'] },
  { title: 'iOS Helper', image: '/global/images/portfolio/product-8.png', link: 'http://54.253.104.12:8000/iosApp.html/', tags: ['Mobile', 'IT', 'iOS'] },
  { title: 'Medical Diagnosis App', image: '/global/images/portfolio/product-9.png', link: 'http://54.253.104.12:8000/index-med.html/', tags: ['Cloud Services', 'IT', 'Healthcare', 'AI'] },
  { title: 'QR Application', image: '/global/images/portfolio/product-10.png', link: 'http://54.253.104.12:8000/index-qr.html/', tags: ['AI', 'Data Science', 'IT', 'Mobile'] },
  { title: 'Game Concept', image: '/global/images/portfolio/product-11.png', link: 'http://54.253.104.12:8000/gallery.html/', tags: ['Game Development', 'Entertainment', '3D Modeling'] },
  { title: 'Construction Showcase', image: '/global/images/portfolio/product-12.png', link: 'http://54.253.104.12:8000/verge3d.html/', tags: ['3D Modeling', 'Construction', 'AR/VR'] },
  { title: 'ThreeJS Showcase', image: '/global/images/portfolio/product-13.png', link: 'http://54.253.104.12:8000/display3d.html/', tags: ['Web', '3D Modeling', 'UI/UX'] },
  { title: 'Text Animation', image: '/global/images/portfolio/product-14.png', link: 'http://54.253.104.12:8000/textEffect.html/', tags: ['Web', 'UI/UX', 'Entertainment'] },
  { title: 'Lego 3D', image: '/global/images/portfolio/product-15.png', link: 'http://54.253.104.12:8000/displayLego.html/', tags: ['3D Modeling', 'Game Development', 'Entertainment'] },
  { title: 'Android Helper', image: '/global/images/portfolio/product-16.png', link: 'http://54.253.104.12:8000/androidApp.html/', tags: ['Mobile', 'IT', 'Android'] },
  { title: 'Robotics Simulator', image: '/global/images/portfolio/product-17.png', link: 'http://54.253.104.12:8000/robotics.html/', tags: ['AI', 'IoT', 'Manufacturing'] },
  { title: 'Construction Management', image: '/global/images/portfolio/product-18.png', link: 'https://youtu.be/MQCPO48Wkak?si=EHsmTUvJ7F8TOsOF/', tags: ['Construction', 'Cloud Services', 'Mobile'] },
  { title: 'Data Visualization', image: '/global/images/portfolio/product-19.png', link: 'https://youtu.be/KOwu8sML2dQ?si=RmUw585frciWMlxk', tags: ['Data Science', 'UI/UX', 'Finance'] },
];

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