"use client";
import React, { Fragment } from "react";
import type { Post } from '@/payload-types'
import ApplicationForm from "./ApplicationForm";
import { careerLocaleMap } from '@/constants/data';

interface RenderFormProps {
  language?: string;
  data: Post;
}

export const RenderCareerForm: React.FC<RenderFormProps> = ({ data, language = "en" }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }
  return (
    <section className="relative top-[80px] w-full h-full py-4 sm:py-6 md:py-8 lg:py-12">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-16 lg:px-20">
        <p className="text-body-regular-black-1 mb-4">
          <span className="text-gray-600">{careerLocaleMap.recommendedJobs[language]}</span> &nbsp;/&nbsp; 
          <span className="text-gray-600">{data?.careerFields?.title}</span> &nbsp;/&nbsp; 
          <span className="text-body-regular-teriary">{careerLocaleMap.submitForm[language]}</span>
        </p>
        <ApplicationForm 
          data={data} 
          language={language} 
        />
      </div>
    </section>
  );
};
