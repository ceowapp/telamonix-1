"use client";

import React, { Fragment, useRef, useCallback, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Page } from '@/payload-types'
import HeroSection from "./HeroSection";
import ServicesSection from './ServicesSection';
import TechnologySection from './TechnologySection';
import TestimonialsSection from "./TestimonialsSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import ProcessSection from "./ProcessSection";
import PortfolioSection from "./PortfolioSection";
import CallToActionSection from "./CallToActionSection";
import FAQSection from "./FAQSection";
import ContactSection from "./ContactSection";
import NewsSection from "./NewsSection";
import { HTMLRenderer } from '../shared/HTMLRenderer';
import AnimatedSection from '../shared/AnimatedSection';
import Navigation from "./Navigation";

const pageComponents: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  service: ServicesSection,
  technology: TechnologySection,
  testimonial: TestimonialsSection,
  whychooseus: WhyChooseUsSection,
  process: ProcessSection,
  portfolio: PortfolioSection,
  calltoaction: CallToActionSection,
  faq: FAQSection,
  contact: ContactSection,
  news: NewsSection
};

const sectionAnimations: Record<string, string> = {
  hero: "fadeIn",
  service: "slideFromLeft",
  testimonial: "scale",
  whychooseus: "slideFromBottom",
  process: "scale",
  portfolio: "fadeIn",
  calltoaction: "slideFromRight",
  faq: "slideFromTop",
  contact: "slideFromLeft",
  news: "fadeIn"
};

interface RenderPageProps {
  language?: string;
  sections: NonNullable<NonNullable<Page["sectionsTab"]>["sections"]>[];
}

export const RenderPage: React.FC<RenderPageProps> = ({ sections, language = "en" }) => {
  const [activeSection, setActiveSection] = useState(1);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  // Create refs object to store refs for each section
  const sectionRefs = useRef({});
  
  // Initialize section refs if needed
  useEffect(() => {
    sections.forEach((section) => {
      if (section?.sectionId && !sectionRefs.current[section.sectionId]) {
        sectionRefs.current[section.sectionId] = React.createRef();
      }
    });
  }, [sections]);
  
  const handleScrollToSection = useCallback((sectionId) => {
    return () => {
      const sectionIndex = sections.findIndex(s => s.sectionId === sectionId);
      if (sectionIndex !== -1) {
        setActiveSection(sectionIndex + 1);
        const ref = sectionRefs.current[sectionId];
        if (ref && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
  }, [sections]);

  const handleSectionClick = useCallback((sectionIndex) => {
    setActiveSection(sectionIndex);
    const sectionId = sections[sectionIndex - 1]?.sectionId;
    if (sectionId && sectionRefs.current[sectionId]?.current) {
      sectionRefs.current[sectionId].current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sections]);

  useEffect(() => {
    const handleScroll = () => {
      // Get all section refs that exist
      const validRefs = sections
        .filter(section => section?.sectionId && sectionRefs.current[section.sectionId]?.current)
        .map(section => ({
          id: section.sectionId,
          offsetTop: sectionRefs.current[section.sectionId].current.offsetTop
        }));
      
      if (validRefs.length === 0) return;
      
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const scrollTop = window.scrollY;
      
      // Find the first section (likely hero)
      const firstSection = validRefs[0];
      const heroSectionHeight = firstSection ? 
        sectionRefs.current[firstSection.id].current.clientHeight : 0;
      
      // Update active section based on scroll position
      for (let i = validRefs.length - 1; i >= 0; i--) {
        if (scrollPosition >= validRefs[i].offsetTop) {
          const sectionIndex = sections.findIndex(s => s.sectionId === validRefs[i].id);
          if (sectionIndex !== -1) {
            setActiveSection(sectionIndex + 1);
          }
          break;
        }
      }
      
      // Update sticky state
      if (scrollTop > heroSectionHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return null;
  }
  
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <Navigation 
          activeSection={activeSection} 
          handleSectionClick={handleSectionClick} 
          isSticky={isSticky} 
          isVisible={isVisible} 
        />
      </div>
      
      {sections.map((section, index) => {
        if (!section?.sectionId) {
          return null;
        }
        
        const Component = pageComponents[section.sectionId];
        if (!Component) {
          return null;
        }
        
        const animationType = sectionAnimations[section.sectionId] || "fadeIn";
        
        return (
          <Fragment key={index}>
            <div 
              ref={sectionRefs.current[section.sectionId] || (sectionRefs.current[section.sectionId] = React.createRef())}
              id={`section-${section.sectionId}`}
            >
              <AnimatedSection animation={animationType}>
                <Component 
                  data={section} 
                  language={language} 
                  handleScrollTo={handleScrollToSection(section.sectionId)}
                />
              </AnimatedSection>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};