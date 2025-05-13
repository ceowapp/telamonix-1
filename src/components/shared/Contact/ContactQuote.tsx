import React from 'react';
import Image from "next/image";
import { Quote } from "lucide-react";
import { baseMediaUrl, contactData } from "@/constants/data";

const ContactQuote: React.FC<ContactQuoteProps> = ({ mapData }) => {
  return (
    <div className="w-full h-full flex items-center lg:col-span-7 lg:col-start-6 xl:col-span-8 xl:col-start-6 minlaptoplg:col-start-7 minlaptoplg:col-span-8 2xl:col-span-7 2xl:col-start-7 maxtabletmd1:mt-16 maxtabletmd1:mb-2">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center rounded-full 
          min-h-[400px] min-w-[400px] 
          xs:min-h-[450px] xs:min-w-[450px]
          sm:min-h-[500px] sm:min-w-[500px] 
          lg:min-h-[800px] lg:min-w-[800px] 
          xl:min-h-[866px] xl:min-w-[866px]
          "
        >
          <Image
            src={`${baseMediaUrl}/images/pages/shared/share-11.png`}
            alt="Contact Background"
            fill
            className="object-contain mix-blend-color-dodge opacity-30 transform -translate-y-[30%] lg:-translate-y-[20%] -translate-x-0 lg:-translate-x-[15%]"
            sizes="(max-width: 480px) 400px, (max-width: 640px) 450px, (max-width: 768px) 550px, (max-width: 1024px) 650px, (max-width: 1280px) 750px, (max-width: 1536px) 850px, 950px"
            quality={75}
          />
        </div>
        <div className="relative bg-[#082C8F] 
          p-5 xs:p-6 sm:p-8 lg:p-10 
          lg:top-[16%]
          transform transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="absolute -top-7 -left-3 xs:-top-6 xs:-left-6 sm:-top-8 sm:-left-3 lg:-top-8 lg:-left-8
            w-10 h-10 xs:w-12 xs:h-12 sm:w-12 sm:h-12 lg:w-12 lg:h-12 xl:w-16 xl:h-16"
          >
            <Image 
              src="/svgs/quote.svg" 
              alt="Quote Icon" 
              width={90} 
              height={200} 
              className="w-full h-full"
            />
          </div>
          <blockquote className="text-heading-white-shadow-1 font-jeju"
          >
           {mapData.quote}
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContactQuote);