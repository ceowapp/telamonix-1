"use client";

import Image from "next/image";
import { useMemo } from "react";
import { baseMediaUrl } from "@/constants/data";
import { sharedContactSchema } from "@/schemas/contact.schema";
import { languageData } from "@/constants/contact";
import { ContactForm } from "./ContactForm";
import ContactQuote from "./ContactQuote";
import type { Page } from '@/payload-types';
import React from "react";

interface ContactSectionProps {
  language: "en" | "zh" | "vi";
}

export const ContactSection: React.FC<ContactSectionProps> = React.memo(({ language = 'en' }) => {
  const { contactData = [], sharedContactFields = []} = React.useMemo(() => 
    languageData[language] || languageData["en"] || { contactData: [], sharedContactFields: [] }, 
  [language]);
  return (
    <section className="text-gray-900 relative overflow-hidden w-full">
      <div className="relative top-[70px] phonexl:top-[65px] xs:top-12 sm:top-16 lg:top-[70px] left-0 z-50 
        w-28 xs:w-32 sm:w-44 lg:w-64 xl:w-80"
      >
        <Image
          src={`${baseMediaUrl}/images/pages/shared/share-12.png`}
          alt="Skewed-Group"
          width={330}
          height={100}
          className="w-full h-auto"
          sizes="(max-width: 480px) 7rem, (max-width: 640px) 8rem, (max-width: 768px) 11rem, (max-width: 1024px) 16rem, 20rem"
          priority
        />
      </div>
      <div 
        className="relative flex justify-center items-center bg-[#0A2540] w-full 
          min-h-[450px] xs:min-h-[500px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[800px] xl:min-h-[866px]
          px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20"
        style={{
          clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
        }}
      >
        <div className="w-full h-full 
          grid grid-cols-1 lg:grid-cols-12
          gap-4 xs:gap-6 sm:gap-8 lg:gap-12
          py-24"
        >
          <ContactForm
            language={language}
            mapData={contactData}
            contactFields={sharedContactFields}
            contactSchema={sharedContactSchema}
            contactSubtitleClassName="[text-shadow:0px_4px_24px_0px_#00000040]"
          />
          <ContactQuote mapData={contactData} />
        </div>
      </div>
      <div className="relative -top-[70px] phonexl:top-[-65px] xs:-top-12 sm:-top-16 lg:top-[-70px] right-0 z-50 
        rotate-180 w-28 xs:w-32 sm:w-44 lg:w-64 xl:w-80 ml-auto"
      >
        <Image
          src={`${baseMediaUrl}/images/pages/shared/share-12.png`}
          alt="Skewed-Group"
          width={330}
          height={100}
          className="w-full h-auto"
          sizes="(max-width: 480px) 7rem, (max-width: 640px) 8rem, (max-width: 768px) 11rem, (max-width: 1024px) 16rem, 20rem"
          priority
        />
      </div>
    </section>
  );
});

