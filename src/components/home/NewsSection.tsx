"use client"

import React, { useState, useCallback, useMemo } from 'react';
import Card from '../shared/CardComponent';
import Link from 'next/link';
import { homeNewsHeader, homeNewsContent, imageFallbackUrl } from '@/constants/data';
import { useRouter } from "next/navigation";
import type { Page } from '@/payload-types'
import SuspenseWrapper from "@/components/shared/SuspenseWrapper";
import { NewsGridSkeleton } from "@/components/shared/SkeletonLoader";
import { processNewsData } from '@/utilities/processNewsData';
import { newsRoutes } from '@/constants/routes';
import { HTMLRenderer } from '../shared/HTMLRenderer';
import { getSlugByLanguage } from '@/utilities/getSlugByLanguage';
import { checkValidHTML } from '@/utilities/checkValidHTML';

interface NewsSectionProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  language?: 'en' | 'vi' | 'zh';
  loading?: boolean;
  error?: string | null;
}

const HeaderFallback: React.FC<HeroSectionProps> = React.memo(({  
  data, 
  language = 'en',
  loading = false, 
  error = null 
}) => {  
  return (
  <div className="w-full max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12 text-center px-4">
    <h1 className="text-display-regular-black">
      {data?.title || homeNewsHeader?.title}
    </h1>
    <p className="mt-2 sm:mt-3 text-body-regular-black max-w-2xl mx-auto">
      {data?.description || homeNewsHeader?.description}
    </p>
  </div>
 );
});

const NewsSection: React.FC<NewsSectionProps> = ({ 
  data,
  language = 'en', 
  loading = false,
  error = null 
}) => {
  const localeRoute = getSlugByLanguage(newsRoutes, language);
  const router = useRouter();
  const posts = useMemo(() => (
    data?.posts && Array.isArray(data?.posts) && data.posts.length > 0
      ? data.posts.map(processNewsData)
      : homeNewsContent
  ), [data?.posts]);
  const contentBlocks = useMemo(() => (
    Array.isArray(data?.contentBlocks) && data.contentBlocks.length > 0 
      ? data.contentBlocks 
      : []
  ), [data?.contentBlocks]);
  const headerBlock = useMemo(() => 
    contentBlocks.find(block => block.blockId === 'header'),
  [contentBlocks]);
  const showLoading = loading || !!error;
  if (showLoading) {
    return (
      <section className="w-full pt-6 pb-20 sm:pb-20 md:pb-20 lg:pb-24 xl:pb-32">
        <div className="w-full mx-auto px-4 flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <HeaderFallback data={data} />
          <NewsGridSkeleton numOfItems={4} />
        </div>
      </section>
    );
  }
  if (checkValidHTML(data?.codeField)) {
    return <HTMLRenderer data={data?.codeField} />;
  }
  return (
    <section className="w-full pt-6 pb-20 sm:pb-20 md:pb-20 lg:pb-24 xl:pb-32">
      <div className="w-full mx-auto px-4 flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {checkValidHTML(headerBlock?.codeField) ? (
          <HTMLRenderer data={headerBlock.codeField} />
        ) : (
          <HeaderFallback data={data} />
        )}
        <SuspenseWrapper fallback={<NewsGridSkeleton numOfItems={4} />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full justify-center items-center">
            {posts?.map((item, index) => (
              <Link key={`news-link-${item?.id}`} href={`/${language}/${localeRoute}/${item?.slug}`} className="cursor-pointer">
                <Card
                  title={item.title}
                  description={item.summary}
                  image={item.imageUrl}
                  contentClassName="relative max-h-fit top-[180px]"
                  imageClassName="absolute w-full h-[170px]"
                  titleClassName="text-title-regular-teriary mb-2"
                  descriptionClassName="text-body-regular-black line-clamp-5"
                  layoutClassName="h-[280px] sm:h-[350px] p-0 sm:p-0 py-3 max-w-80"
                  className="flex items-center justify-center"
                />
              </Link>
            ))}
          </div>
        </SuspenseWrapper>
      </div>
    </section>
  );
};

NewsSection.displayName = "NewsSection";

export default NewsSection;