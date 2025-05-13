import React from "react";
import Image from "next/image";
import type { Post } from '@/payload-types'
import SuspenseWrapper from "@/components/shared/SuspenseWrapper";
import { NewsContentSkeleton, NewsGridSkeleton } from "../shared/SkeletonLoader";
import NewsRelatedSection from './NewsRelatedSection';
import { processNewsData } from '@/utilities/processNewsData';
import { ContactSection } from '../shared/Contact';
import RichText from "@/components/shared/RichText";

interface RenderPageProps {
  data?: Post;
  loading?: boolean;
  error?: string | null;
  language: "en" | "zh" | "vi";
}

export const RenderNewsContent: React.FC<RenderPageProps> = ({ 
  data, 
  language = 'en',
  loading = false, 
  error = null 
}) => {
  const isValidData = data && typeof data === 'object' && Object.keys(data).length > 0;
  const processedData = isValidData ? processNewsData(data) : null;  
  
  if (loading) {
    return (
      <section className="w-full py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center pt-32">
          <NewsContentSkeleton />
        </div>
      </section>
    );
  }

  if (!isValidData || error) {
    return (
      <section className="w-full py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center pt-32">
          <NewsContentSkeleton />
        </div>
      </section>
    );
  }
  
  return (
    <div className="relative w-full flex flex-col items-center justify-center py-4 md:pb-8 lg:pb-12 pt-32">
      <SuspenseWrapper fallback={<NewsContentSkeleton />}>
        <div className="mx-auto container max-w-4xl space-y-4 sm:space-y-4 md:space-y-6 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          {processedData?.imageUrl ? (
            <div className="relative w-full aspect-[16/9] md:aspect-video rounded-lg sm:rounded-xl overflow-hidden">
              <Image
                alt={processedData.title || 'Article image'}
                src={processedData.imageUrl}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 900px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-[16/9] md:aspect-video rounded-lg sm:rounded-xl bg-gray-200" />
          )}
          <div className="space-y-4 sm:space-y-4 md:space-y-6">
            <h1 className="text-title-large-black tracking-tighter">
              {processedData?.title || 'Untitled Article'}
            </h1>
            <p className="max-w-full md:max-w-[900px] text-label-regular-teriary">
              {processedData?.date || ''}
            </p>
          </div>
          <article className="prose prose-sm sm:prose md:prose-lg lg:prose-xl prose-gray max-w-full md:max-w-[900px] text-body-regular-black">
            {processedData?.content && (
              <RichText 
                className="w-full" 
                data={processedData.content} 
                enableGutter={false} 
              />
            )}
          </article>
        </div>
      </SuspenseWrapper>
      <SuspenseWrapper fallback={<NewsGridSkeleton numOfItems={4} />}>
        {data.relatedPosts && Array.isArray(data.relatedPosts) && data.relatedPosts.length > 0 && (
          <NewsRelatedSection
            data={data.relatedPosts.filter((post) => post && typeof post === 'object')}
            language={language}
          />
        )}
      </SuspenseWrapper>
      <div className="mb-14 sm:mb-4 md:mb-6 lg:mb-6">
        <ContactSection 
          language={language} 
        />
      </div>
    </div>
  );
};
