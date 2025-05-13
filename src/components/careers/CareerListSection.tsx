"use client"
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import type { Page } from '@/payload-types'
import { CareersSection } from '@/types/page';
import { careerRoutes } from '@/constants/routes';
import { careerData, baseMediaUrl, careerLocaleMap } from "@/constants/data";
import CareerCard from "./CareerCard";
import SuspenseWrapper from "@/components/shared/SuspenseWrapper";
import { GridSectionSkeleton } from "@/components/shared/SkeletonLoader";
import { findSection, isValidSection } from '@/utils/content/contentUtils';
import { processCareerData } from '@/utilities/processCareerData';
import { getSlugByLanguage } from '@/utilities/getSlugByLanguage';

const CareerBanner = dynamic(() => import("./CareerBanner"), { ssr: false });

const CareerListSection: React.FC<CareerListSectionProps> = ({
  data,
  language = 'en',
  loading = false,
  error = null
}) => {
  const router = useRouter();
  const localeRoute = getSlugByLanguage(careerRoutes, language);
  const redirect = (id: string) => router.push(`/${language}/${localeRoute}/${id}`);
  const isValidData = isValidSection(data, 'object');
  const showLoading = loading || !isValidData;
  const jobPosts = data?.posts || [];
  const processedItems = React.useMemo(() => {
    if (Array.isArray(jobPosts) && jobPosts.length > 0) {
      return jobPosts.map(processCareerData);
    } else {
      return careerData;
    }
  }, [jobPosts]);
  
  const allTags = React.useMemo(() => {
    return Array.from(
      new Set(processedItems.flatMap(job => job.tags || []))
    ).sort();
  }, [processedItems]);
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobData[]>(processedItems);
  
  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredJobs(processedItems);
    } else {
      const newFilteredJobs = processedItems.filter(job => 
        job.tags && selectedTags.some(tag => job.tags.includes(tag))
      );
      setFilteredJobs(newFilteredJobs);
    }
  }, [selectedTags, processedItems]);
  
  return (
    <section className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 sm:py-16 md:py-20 pt-[110px] sm:pt-[110px] md:pt-[120px] lg:pt-[140px]">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 lg:w-1/4 mb-2 md:mb-0">
          <CareerBanner 
            data={data} 
            language={language} 
          />
          <div className="p-0">
            <h2 className="text-title-large-black mb-4">{careerLocaleMap.filters[language]}</h2>
            <div className="space-y-3">
              {allTags.map((tag) => (
                <div key={tag} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`tag-${tag}`}
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                    className="rounded-full w-5 h-5 border-[1.5px] border-[#454545] checked:bg-[#178DDF] font-normal text-white"
                  />
                  <label htmlFor={`tag-${tag}`} className="ml-2 text-body-regular-black-1">
                    {tag}
                  </label>
                </div>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="mt-4 text-sm text-purple-600 font-medium hover:text-purple-800"
              >
                {careerLocaleMap.clearAllFilters[language]}
              </button>
            )}
          </div>
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold">
              {careerLocaleMap.recommendedJobs[language]}: <span className="text-title-regular-black px-4 py-1 rounded-full border-[1px] border-[#D1D1D1]">{filteredJobs.length}</span>
            </h1>
          </div>
          {showLoading ? (
            <GridSectionSkeleton />
          ) : (
            <SuspenseWrapper fallback={<GridSectionSkeleton />}>
              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-12 w-full">
                  {filteredJobs.map((job) => (
                    <CareerCard
                      key={job.id || `job-${Math.random()}`}
                      date={job.date}
                      title={job.title || "Job Position"}
                      tags={job.tags || []}
                      salaryRange={job.salaryRange || ""}
                      address={job.address || ""}
                      language={language}
                      insetStyle={{
                        height: '55%',
                        width: '100%',
                        background: job.background || "linear-gradient(237.73deg, #FFFFFF 0%, #67CAFF 100%)",
                        borderRadius: '20px'
                      }}
                      onClick={() => job?.id && redirect(job.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 p-6 text-center">
                  <h3 className="text-body-large-medium-black mb-2">No results found</h3>
                  <p className="text-body-regular-black-1">Try adjusting your filters to find more jobs.</p>
                </div>
              )}
            </SuspenseWrapper>
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(CareerListSection);