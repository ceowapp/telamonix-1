import React, { forwardRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Briefcase, 
  Star, 
  ThumbsUp, 
  GitBranch, 
  Folder, 
  PhoneCall, 
  HelpCircle, 
  Mail,
  Layers,
  BookText,
  ListEnd 
} from 'lucide-react';

interface Section {
  id: number;
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface NavigationProps {
  activeSection: number;
  handleSectionClick: (sectionId: number) => void;
  isSticky: boolean;
  isVisible: boolean;
}

const Navigation = forwardRef<HTMLDivElement, NavigationProps>(
  ({ activeSection, handleSectionClick, isSticky, isVisible }, ref) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 1024);
      };
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const sections: Section[] = [
      { id: 1, name: 'Hero', href: '#hero', icon: <Home size={18} /> },
      { id: 2, name: 'Services', href: '#services', icon: <Briefcase size={18} /> },
      { id: 3, name: 'Techstack', href: '#techstack', icon: <Layers size={18} /> },
      { id: 4, name: 'Testimonials', href: '#testimonials', icon: <Star size={18} /> },
      { id: 5, name: 'Why Choose Us', href: '#whychooseus', icon: <ThumbsUp size={18} /> },
      { id: 6, name: 'Process', href: '#process', icon: <GitBranch size={18} /> },
      { id: 7, name: 'Portfolio', href: '#portfolio', icon: <Folder size={18} /> },
      { id: 8, name: 'Call to Action', href: '#calltoaction', icon: <PhoneCall size={18} /> },
      { id: 9, name: 'FAQ', href: '#faq', icon: <HelpCircle size={18} /> },
      { id: 10, name: 'Contact', href: '#contact', icon: <Mail size={18} /> },
      { id: 11, name: 'Blog', href: '#blog', icon: <BookText size={18} /> },
      { id: 12, name: 'Footer', href: '#footer', icon: <ListEnd size={18} /> },
    ];

    const handleNavClick = (sectionId: number) => {
      handleSectionClick(sectionId);
      setIsMenuOpen(false);
    };

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`fixed ${
              isSticky ? 'bottom-8' : 'bottom-4'
            } z-50 w-full max-w-7xl px-4 sm:px-6 lg:px-8`}
          >
            <nav className="bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-full shadow-lg overflow-hidden">
              {isMobile ? (
                <div className="flex items-center justify-between p-4">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white focus:outline-none"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                  <span className="text-white font-medium">Menu</span>
                </div>
              ) : (
                <ul className="flex justify-around items-center p-2">
                  {sections.map((section) => (
                    <NavItem
                      key={section.id}
                      section={section}
                      isActive={activeSection === section.id}
                      onClick={() => handleNavClick(section.id)}
                    />
                  ))}
                </ul>
              )}
            </nav>
            {isMobile && isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-2 bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden"
              >
                <ul className="py-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={section.href}
                        onClick={() => handleNavClick(section.id)}
                        className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                          activeSection === section.id
                            ? 'text-white bg-gray-800'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        <span className="mr-3">{section.icon}</span>
                        {section.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

const NavItem: React.FC<{
  section: Section;
  isActive: boolean;
  onClick: () => void;
}> = ({ section, isActive, onClick }) => (
  <li className="relative">
    <a
      href={section.href}
      onClick={onClick}
      className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive ? 'text-white' : 'text-gray-400 hover:text-white'
      }`}
    >
      <span className="mr-2">{section.icon}</span>
      {section.name}
    </a>
    {isActive && (
      <motion.div
        layoutId="activeIndicator"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
        initial={false}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    )}
  </li>
);

Navigation.displayName = 'Navigation';

export default Navigation;