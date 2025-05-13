"use client";
import React, { Fragment } from "react";
import type { Post } from '@/payload-types'
import CareerContentSection from "./CareerContentSection";
import CareerRelatedSection from "./CareerRelatedSection";
import { careerLocaleMap } from '@/constants/data';

interface RenderPageProps {
  language?: string;
  data: Post;
}

export const RenderCareersContent: React.FC<RenderPageProps> = ({ data, language = "en" }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }
  return (
    <div className="relative top-[80px] w-full h-full py-4 sm:py-6 md:py-8 lg:py-12">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <p className="text-body-regular-black-1 mb-4">
          {careerLocaleMap.recommendedJobs[language]} &nbsp;/&nbsp; 
          <span className="text-body-regular-teriary">
            {data?.careerFields?.title}
          </span>
        </p>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-medium-screen mb-[80px] sm:mb-[100px] mb:mb-[120px] lg:mb-[140px] pt-6 sm:pt-12">      
            <CareerContentSection 
              data={data} 
              language={language} 
            />
          </div>
          {data.relatedPosts && Array.isArray(data.relatedPosts) && data.relatedPosts.length > 0 && (
            <CareerRelatedSection
              data={data.relatedPosts.filter((post) => typeof post === 'object')}
              language={language}
            />
          )}
        </div>
      </div>
    </div>
  );
};




