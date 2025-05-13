import React, { useState, useEffect } from "react";
import Image from "next/image";
import { contactCarouselImages } from '@/constants/data';
import { ContactForm } from '../shared/Contact';
import type { Page } from '@/payload-types'
import { contactSchema } from "@/schemas/contact.schema";
import { languageData } from "@/constants/contact";

const Carousel = ({ images, autoplaySpeed = 5000, withSlideIndicator = true }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = images || [];
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1));
    }, autoplaySpeed);
    return () => clearInterval(interval);
  }, [items.length, autoplaySpeed]);
  
  const handlePrev = () => {
    setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  };

  const handleNext = () => {
    setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="relative w-full h-full rounded-[40px] overflow-hidden">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={item.src}
            alt={item.alt || "Carousel image"}
            fill
            className="z-0 object-cover w-full h-full"
          />
          <div className="z-10 absolute inset-0 flex flex-col justify-end items-start bg-transparent px-6 md:px-10 sm:px-16 py-8 mb-10">
            {item.title && (
              <h2 className="text-headline-medium-cyan text-start">{item.title}</h2>
            )}
            {item.description && (
              <p className="text-body-large-white mt-3 text-start max-w-md">{item.description}</p>
            )}
          </div>
        </div>
      ))}
      {/**
      <div className="absolute inset-x-0 top-1/2 flex justify-between items-center px-4 transform -translate-y-1/2">
        <button
          onClick={handlePrev}
          className="bg-white/70 rounded-full p-2 text-gray-800 hover:bg-white transition-colors"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="bg-white/70 rounded-full p-2 text-gray-800 hover:bg-white transition-colors"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      **/}
      {withSlideIndicator && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
          {items.map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                index === activeIndex ? "w-12 h-[7px] bg-[#7A73FF]" : "w-1 h-[7px] bg-gray-300"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ContactSectionProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  language: "en" | "zh" | "vi";
  loading?: boolean;
  error?: string | null;
}

export const ContactCard: React.FC<ContactSectionProps> = ({ texts, fields, language }) => {
 return (
   <div className="relative pt-4 pb-2 px-2 sm:pt-8 sm:pb-6 sm:px-4 lg:px-8 bg-white rounded-[40px] w-full h-full mb-4">
     <div className="relative z-10 h-full flex flex-col justify-start items-center">
        <ContactForm
          language={language}
          mapData={texts}
          contactFields={fields} 
          contactSchema={contactSchema}
          contactTitleClassName="text-display-bold-black"
          contactDescriptionClassName="text-body-regular-black-contact"
          inputClassName="text-body-regular-black-contact bg-white"
          labelClassName="text-body-regular-black-contact"
          isContactPage
        />
     </div>
   </div>
 );
};

const ContactSection: React.FC<ContactSectionProps> = ({ 
  data,
  language = 'en',
  loading = false,
  error = null 
}) => {
   const carouselItems = React.useMemo(
    () => (Array.isArray(data?.sectionjson) ? data.sectionjson : contactCarouselImages),
    [data?.sectionjson] 
  );
  const { contactData, contactFields } = React.useMemo(() => languageData[language], [language]);
 return (
   <section className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 p-16 pt-[120px] sm:pt-[140px] h-full">
     <div className="mx-auto">
       <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 sm:gap-16">
         <div className="xl:col-span-1">
            <ContactCard language={language} texts={contactData} fields={contactFields} />
         </div>
         <div className="xl:col-span-2 h-[300px] sm:h-[400px] md:h-[600px] xl:h-full bg-gray-100 rounded-xl overflow-hidden">
           <Carousel images={carouselItems} withSlideIndicator={true} />
         </div>
       </div>
     </div>
   </section>
 );
};

export default React.memo(ContactSection);


