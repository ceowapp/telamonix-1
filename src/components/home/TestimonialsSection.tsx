import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Avatar } from "@nextui-org/avatar";
import { testimonials } from '@/constants/data';

const testimonials = [
  { name: 'John Doe', role: 'CEO, Tech Corp', quote: 'Their IT solutions transformed our business operations.', rating: 5, avatar: '/images/global/avatar/john.png' },
  { name: 'Jane Smith', role: 'CTO, Innovate Inc', quote: 'Exceptional service and cutting-edge technology.', rating: 4, avatar: '/images/global/avatar/jane.png' },
  { name: 'Mike Johnson', role: 'Founder, StartUp', quote: 'They helped us scale our infrastructure seamlessly.', rating: 5, avatar: '/images/global/avatar/mike.png' },
  { name: 'Emily Brown', role: 'COO, Global Solutions', quote: 'Their team expertise is unmatched in the industry.', rating: 5, avatar: '/images/global/avatar/emily.png' },
  { name: 'Alex Lee', role: 'IT Director, Enterprise Co', quote: 'Reliable, innovative, and always ahead of the curve.', rating: 4, avatar: '/images/global/avatar/alex.png' },
  { name: 'Sarah Chen', role: 'VP of Engineering, TechGiant', quote: 'Their solutions have consistently exceeded our expectations.', rating: 5, avatar: '/images/global/avatar/sarah.png' },
  { name: 'David Wilson', role: 'CIO, MegaCorp', quote: 'Their cybersecurity measures are top-notch.', rating: 5, avatar: '/images/global/avatar/david.png' },
  { name: 'Lisa Taylor', role: 'Head of IT, Global Bank', quote: `They've revolutionized our data management systems.`, rating: 4, avatar: '/images/global/avatar/lisa.png' },
  { name: 'Robert Green', role: 'Tech Lead, E-commerce Giant', quote: 'Their cloud solutions have improved our efficiency tenfold.', rating: 5, avatar: '/images/global/avatar/robert.png' },
  { name: 'Emma Davis', role: 'Founder, AI Startup', quote: 'Their AI integration services are second to none.', rating: 5, avatar: '/images/global/avatar/emma.png' },
  { name: 'Chris Wong', role: 'CTO, FinTech Innovators', quote: `They've helped us stay ahead in a competitive market.`, rating: 4, avatar: '/images/global/avatar/chris.png' },
  { name: 'Olivia Martinez', role: 'VP of Operations, Logistics Co', quote: 'Their IoT solutions have transformed our supply chain.', rating: 5, avatar: '/images/global/avatar/olivia.png' },
];

const TestimonialCard = ({ name, role, quote, avatar, rating }) => {
  return (
    <motion.div 
      className="min-w-[340px] sm:min-w-[400px] h-64 relative mx-4 flex-shrink-0"
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl transform rotate-1 blur-sm"></div>
      <div className="absolute inset-0 bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden p-6 flex flex-col justify-between transform-style-3d">
        {/* Decorative elements */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl"></div>
        
        <div className="z-10">
          <div className="flex items-center mb-4">
            <Avatar 
              src={avatar} 
              className="border-2 border-indigo-500/30 mr-4"
              size="lg"
            />
            <div>
              <h3 className="font-bold text-lg text-white">{name}</h3>
              <p className="text-sm text-blue-300">{role}</p>
            </div>
          </div>
          <p className="text-white/80 text-base italic mb-5">"{quote}"</p>
        </div>
        <div className="flex items-center justify-between z-10">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-500'}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-neutral-400 text-sm">{rating.toFixed(1)}/5.0</span>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Auto-scroll animation
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    // Clone testimonials for infinite scroll effect
    const cloneTestimonials = () => {
      const items = scrollContainer.querySelectorAll('.testimonial-item');
      const itemWidth = items[0].offsetWidth + 16; // width + margin
      
      // When we've scrolled almost to the end, reset to the beginning
      const onScroll = () => {
        if (!isDragging) {
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          if (scrollContainer.scrollLeft > maxScroll - 100) {
            // Reset to start with no animation
            scrollContainer.scrollLeft = 0;
          }
        }
      };
      
      // Auto-scroll animation
      const autoScroll = gsap.to(scrollContainer, {
        scrollLeft: "+=" + (items.length * itemWidth),
        duration: items.length * 10,
        ease: "none",
        repeat: -1,
        repeatDelay: 0.5,
        onUpdate: onScroll
      });
      
      // Pause animation on hover or drag
      scrollContainer.addEventListener('mouseenter', () => autoScroll.pause());
      scrollContainer.addEventListener('mouseleave', () => {
        if (!isDragging) autoScroll.play();
      });
      
      return () => {
        autoScroll.kill();
        scrollContainer.removeEventListener('mouseenter', () => autoScroll.pause());
        scrollContainer.removeEventListener('mouseleave', () => autoScroll.play());
      };
    };
    
    const cleanup = cloneTestimonials();
    return cleanup;
  }, [isDragging]);
  
  // Mouse drag scroll functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  
  // Touch support for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="stars"></div>
        <div className="absolute inset-0 bg-[#0945EB]/10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 bg-[#0945EB]/30 rounded-full text-[#67D1FF] text-sm font-semibold mb-4">
            CLIENT SUCCESS
          </span>
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0945EB] via-[#67D1FF] to-[#0945EB]">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-xl text-[#E2E8F0] max-w-3xl mx-auto">
            Trusted by industry leaders worldwide for exceptional IT solutions and service
          </p>
        </motion.div>
        
        {/* Custom scrollbar styling */}
        <style jsx global>{`
          .testimonials-container::-webkit-scrollbar {
            height: 6px;
          }
          .testimonials-container::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .testimonials-container::-webkit-scrollbar-thumb {
            background: linear-gradient(to right, #0945EB, #67D1FF);
            border-radius: 10px;
          }
          .testimonials-container {
            scrollbar-width: thin;
            scrollbar-color: #0945EB rgba(255, 255, 255, 0.1);
          }
        `}</style>
        
        <div className="relative">
          {/* Fade gradient on left and right */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrollable testimonials container */}
          <div 
            ref={scrollContainerRef}
            className="testimonials-container flex overflow-x-auto px-4 pb-8 hide-scrollbar snap-x"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <div key={`original-${index}`} className="testimonial-item snap-center">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
            
            {/* Duplicated set for infinite scroll effect */}
            {testimonials.map((testimonial, index) => (
              <div key={`clone-${index}`} className="testimonial-item snap-center">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicators */}
        <div className="flex justify-center mt-8">
          <motion.div 
            className="flex space-x-2 bg-gray-800/50 p-2 rounded-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.span 
              className="flex items-center text-white/60 text-sm"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Swipe to see more
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
