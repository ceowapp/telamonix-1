"use client"
import React, { memo } from "react";
import { useRouter } from "next/navigation";
import CareerCard from "./CareerCard";
import type { Post } from '@/payload-types'
import { imageFallbackUrl, careerLocaleMap } from "@/constants/data";
import { careerRoutes } from '@/constants/routes';
import SuspenseWrapper from "@/components/shared/SuspenseWrapper";
import { NewsGridSkeleton } from "../shared/SkeletonLoader";
import { processCareerData } from '@/utilities/processCareerData';
import { getSlugByLanguage } from '@/utilities/getSlugByLanguage';

interface CareerRelatedSectionProps {
  data?: Post[];
  language?: 'en' | 'vi' | 'zh';
  loading?: boolean;
  error?: string | null;
}

const CareerRelatedSection: React.FC<CareerRelatedSectionProps> = ({ 
  data, 
  language = 'en',
  loading = false,
  error = null 
}) => {
  const localeRoute = getSlugByLanguage(careerRoutes, language);
  const router = useRouter();
  const redirect = (id: string) => router.push(`/${language}/${localeRoute}/${id}`);
  const posts = React.useMemo(
    () => (Array.isArray(data) ? data.map(processCareerData) : []),
    [data]
  );
  const showLoading = loading || !!error;
  return (
    <section className="w-full py-8 mb-32">
      <div className="max-w-[954px] mx-auto flex flex-col items-center">
        <div className="w-full mx-auto mb-8 text-center">
          <h1 className="text-title-large-black-1 text-start">
            {careerLocaleMap?.relatedJobs[language]}
          </h1>
        </div>
        {showLoading ? (
          <NewsGridSkeleton numOfItems={4} isFourColumns />
        ) : (
          <SuspenseWrapper fallback={<NewsGridSkeleton numOfItems={4} isFourColumns />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-12 w-full">
              {posts.map((item, index) => (
                <CareerCard
                  key={item.id || `job-${Math.random()}`}
                  date={item.date}
                  title={item.title || "Job Position"}
                  tags={item.tags || []}
                  salaryRange={item.salaryRange || ""}
                  address={item.address || ""}
                  language={language}
                  insetStyle={{
                    height: '55%',
                    width: '100%',
                    background: item.background || "linear-gradient(237.73deg, #FFFFFF 0%, #67CAFF 100%)",
                    borderRadius: '20px'
                  }}
                  onClick={() => item?.id && redirect(item.id)}
                />
              ))}
            </div>
          </SuspenseWrapper>
        )}
      </div>
    </section>
  );
};

export default memo(CareerRelatedSection);