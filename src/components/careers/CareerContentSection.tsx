"use client";
import React, { memo, Fragment } from "react";
import { useRouter } from "next/navigation";
import RichText from "@/components/shared/RichText";
import type { Post } from '@/payload-types'
import { processCareerData } from '@/utilities/processCareerData';
import { getSlugByLanguage } from '@/utilities/getSlugByLanguage';
import { careerLocaleMap } from '@/constants/data';
import { careerRoutes } from '@/constants/routes';

interface ProcessedData {
  id: string;
  title: string;
  date: string;
  tags: string[];
  salaryRange: string;
  summary: string;
  responsibilities: { title: string; description: string }[];
  qualifications: string[];
}

interface ContentProps {
  data: ProcessedData;
  language: 'en' | 'vi' | 'zh';
  redirect: (id: string) => void;
}

const ContentDisplay = memo(({ data, language = 'en', redirect }: ContentProps ) => {
  const {
    id,
    title,
    date,
    tags,
    salaryRange,
    summary,
    responsibilities,
    qualifications,
  } = data;
  return (
    <section className="bg-white rounded-[16px] w-full h-full flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="text-headline-medium mb-1">{title}</h1>
            <p className="text-body-small-black">
              {date}
            </p>
            <div className="flex flex-wrap gap-2 md:gap-4 mt-2 ml-3">
              {tags.map((item, index) => (
                <p key={index} className="text-body-small-black">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="text-left sm:text-right mt-4 sm:mt-0 w-full sm:w-auto">
            <p className="text-title-medium-teriary mb-4">{salaryRange}</p>
            <button 
              onClick={() => redirect(id)} 
              className="mt-2 w-full sm:w-auto px-6 sm:px-20 py-2 sm:py-3 bg-buttonColor text-white text-title-regular-white rounded-full"
            >
              {careerLocaleMap.submit[language]}
            </button>
          </div>
        </div>
        <div className="my-8">
          <h3 className="text-title-medium-black mb-2">{careerLocaleMap.jobSummary[language]}:</h3>
          <p className="text-body-regular-black mb-6">{summary}</p>
        </div>
        <div className="my-4">
          <h3 className="text-title-medium-black mb-2">{careerLocaleMap.keyResponsibilities[language]}:</h3>
          <RichText data={responsibilities} className="text-body-regular-black job-responsibilities" enableGutter={false} />
        </div>
        <div className="my-4">
          <h3 className="text-title-medium-black mb-2">{careerLocaleMap.qualifications[language]}:</h3>
          <RichText data={qualifications} className="text-body-regular-black job-qualifications" enableGutter={false} />
        </div>
      </div>
    </section>
  );
});

interface CareerContentProps {
  id: string;
  data?: Post;
  language?: 'en' | 'vi' | 'zh';
}

const CareerContentSection: React.FC<CareerContentProps> = ({ data, language = 'en' }) => {
  const router = useRouter();
  const localeSegment = careerRoutes.find(item => item.lang === language)?.segment || '';
  const options = { segment : localeSegment };
  const localeRoute = getSlugByLanguage(careerRoutes, language, options);
  const redirect = (id: string) => router.push(`/${language}/${localeRoute}/${id}`);
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 rounded-lg p-4 md:p-6 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-red-700 mb-2">Job not found</h2>
          <p className="text-sm md:text-base text-red-600 mb-4">
            We couldn't load the job details you're looking for.
          </p>
          <button
            aria-label="Return back"
            onClick={() => router.push(`/${localeRoute}`)}
            className="text-white px-4 md:px-6 py-2 bg-buttonColor text-sm md:text-title-regular-white rounded-full hover:bg-purple-600 transition-colors"
          >
            Return to Careers
          </button>
        </div>
      </div>
    );
  }
  const processedData = processCareerData(data);
  return (
    <Fragment>
      <ContentDisplay data={processedData} language={language} redirect={redirect} />
    </Fragment>
  );
};

export default memo(CareerContentSection);