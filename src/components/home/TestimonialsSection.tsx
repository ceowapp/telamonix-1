import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { TextPlugin } from 'gsap/TextPlugin';
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const testimonials = [
  { name: 'John Doe', role: 'CEO, Tech Corp', quote: 'Their IT solutions transformed our business operations.', rating: 5, avatar: '/global/images/avatar/john.png' },
  { name: 'Jane Smith', role: 'CTO, Innovate Inc', quote: 'Exceptional service and cutting-edge technology.', rating: 4, avatar: '/global/images/avatar/jane.png' },
  { name: 'Mike Johnson', role: 'Founder, StartUp', quote: 'They helped us scale our infrastructure seamlessly.', rating: 5, avatar: '/global/images/avatar/mike.png' },
  { name: 'Emily Brown', role: 'COO, Global Solutions', quote: 'Their team expertise is unmatched in the industry.', rating: 5, avatar: '/global/images/avatar/emily.png' },
  { name: 'Alex Lee', role: 'IT Director, Enterprise Co', quote: 'Reliable, innovative, and always ahead of the curve.', rating: 4, avatar: '/global/images/avatar/alex.png' },
  { name: 'Sarah Chen', role: 'VP of Engineering, TechGiant', quote: 'Their solutions have consistently exceeded our expectations.', rating: 5, avatar: '/global/images/avatar/sarah.png' },
  { name: 'David Wilson', role: 'CIO, MegaCorp', quote: 'Their cybersecurity measures are top-notch.', rating: 5, avatar: '/global/images/avatar/david.png' },
  { name: 'Lisa Taylor', role: 'Head of IT, Global Bank', quote: `They've revolutionized our data management systems.`, rating: 4, avatar: '/global/images/avatar/lisa.png' },
  { name: 'Robert Green', role: 'Tech Lead, E-commerce Giant', quote: 'Their cloud solutions have improved our efficiency tenfold.', rating: 5, avatar: '/global/images/avatar/robert.png' },
  { name: 'Emma Davis', role: 'Founder, AI Startup', quote: 'Their AI integration services are second to none.', rating: 5, avatar: '/global/images/avatar/emma.png' },
  { name: 'Chris Wong', role: 'CTO, FinTech Innovators', quote: `They've helped us stay ahead in a competitive market.`, rating: 4, avatar: '/global/images/avatar/chris.png' },
  { name: 'Olivia Martinez', role: 'VP of Operations, Logistics Co', quote: 'Their IoT solutions have transformed our supply chain.', rating: 5, avatar: '/global/images/avatar/olivia.png' },
];

const testimonialGroups = [
  testimonials.slice(0, 4),
  testimonials.slice(4, 8),
  testimonials.slice(8, 12)
];

const TestimonialCard = ({ name, role, quote, avatar, rating }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    
    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      gsap.to(card, {
        rotationY: -20 * (x - 0.5),
        rotationX: 20 * (y - 0.5),
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="group w-full sm:w-80 h-auto sm:h-96 bg-neutral-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 relative perspective-1000">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 opacity-50 group-hover:opacity-20 transition-opacity duration-500"></div>
        <div className="absolute inset-0 z-50">
          <div className="bg-transparent group-hover:scale-150 -top-8 -left-8 absolute shadow-yellow-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-48 h-48"></div>
          <div className="bg-transparent group-hover:scale-150 top-1 left-1 absolute shadow-red-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-32 h-32"></div>
          <div className="bg-transparent group-hover:scale-150 top-8 left-8 absolute shadow-sky-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"></div>
          <div className="bg-transparent group-hover:scale-150 top-10 left-11 absolute shadow-red-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-6 h-6"></div>
          <div className="bg-transparent group-hover:scale-150 bottom-4 right-4 absolute shadow-green-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
          <div className="bg-transparent group-hover:scale-150 -bottom-3 -right-3 absolute shadow-sky-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-48 h-48"></div>
          <div className="bg-transparent group-hover:scale-150 bottom-10 right-10 absolute shadow-sky-500 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"></div>
        </div>
      <div className="w-full h-full shadow-xl shadow-neutral-900/50 p-6 bg-neutral-900/80 backdrop-blur-sm rounded-2xl flex flex-col justify-between z-10 relative transform-style-3d group-hover:translate-z-10 transition-transform duration-500">
        <div>
          <div className="flex items-center mb-4 z-[9999]">
            <Avatar className="mr-4" size="lg" src={avatar} />
            <div>
              <h3 className="font-bold text-xl text-neutral-50">{name}</h3>
              <p className="text-sm text-blue-300">{role}</p>
            </div>
          </div>
          <p className="text-neutral-200 text-base italic mb-6 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">"{quote}"</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${i < rating ? 'text-yellow-400' : 'text-gray-400'} fill-current transition-colors duration-300 ease-in-out`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-neutral-400 text-sm">{rating.toFixed(1)}/5.0</span>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const containerRef = useRef(null);
  const columnRefs = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const titleControls = useAnimation();
  const subtitleControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      titleControls.start('visible');
      subtitleControls.start('visible');
    } else {
      titleControls.start('hidden');
      subtitleControls.start('hidden');
    }
  }, [isInView, titleControls, subtitleControls]);

  useEffect(() => {
    const columns = columnRefs.current;
    const container = containerRef.current;

    // Scrolling animation for testimonial cards
    const scrollAnimations = columns.map((column, index) => {
      return gsap.to(column.children, {
        y: index % 2 === 0 ? '-20%' : '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.3,
        },
      });
    });

    // Parallax effect for background elements
    gsap.to('.parallax-bg', {
      y: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      scrollAnimations.forEach(anim => anim.kill());
    };
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section ref={containerRef} className="testimonial py-32 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 overflow-hidden relative">
      <div className="parallax-bg absolute inset-0 opacity-20">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
      <div className="container mx-auto px-4 relative z-[50]">
        <motion.h2 
          ref={titleRef}
          variants={titleVariants}
          initial="hidden"
          animate={titleControls}
          className="text-6xl sm:text-7xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
        >
          What Our Clients Say
        </motion.h2>
        <motion.p 
          ref={subtitleRef}
          variants={subtitleVariants}
          initial="hidden"
          animate={subtitleControls}
          className="text-2xl sm:text-3xl font-semibold text-center mb-20 mt-8 text-blue-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
        >
          <motion.span variants={wordVariants} className="inline-block px-2">Trusted by</motion.span>
          <motion.span variants={wordVariants} className="inline-block px-2">industry leaders</motion.span>
          <motion.span variants={wordVariants} className="inline-block px-2">worldwide</motion.span>
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialGroups.map((group, colIndex) => (
            <div
              key={colIndex}
              ref={(el) => (columnRefs.current[colIndex] = el)}
              className="flex flex-col space-y-8 overflow-hidden"
            >
              {group.map((testimonial, index) => (
                <TestimonialCard key={`${colIndex}-${index}`} {...testimonial} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
