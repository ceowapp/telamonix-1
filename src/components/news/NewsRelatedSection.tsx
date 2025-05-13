"use client"
import React from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Card from "../shared/CardComponent";
import type { Page } from '@/payload-types'
import { imageFallbackUrl, newsLocaleMap } from "@/constants/data";
import SuspenseWrapper from "@/components/shared/SuspenseWrapper";
import { NewsGridSkeleton } from "../shared/SkeletonLoader";
import { processNewsData } from '@/utilities/processNewsData';
import { getSlugByLanguage } from '@/utilities/getSlugByLanguage';
import { newsRoutes } from '@/constants/routes';

interface NewsRelatedSectionProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  language?: 'en' | 'vi' | 'zh';
  loading?: boolean;
  error?: string | null;
}

const NewsRelatedSection: React.FC<NewsRelatedSectionProps> = ({ 
  data, 
  language = 'en',
  loading = false,
  error = null 
}) => {
  const localeRoute = getSlugByLanguage(newsRoutes, language);
  const router = useRouter();
  const redirectToNewsPage = (slug: string) => router.push(`/${localeRoute}/${slug}`);
  const posts = React.useMemo(
    () => (Array.isArray(data) ? data.map(processNewsData) : []),
    [data]
  );
  const showLoading = loading || !!error;
  return (
    <section className="w-full px-4 sm:px-8 md:px-16 xl:px-20 pt-24">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center">
        <div className="w-full mx-auto mb-6 text-center">
          <h1 className="text-title-large-black-1 text-start">
            <h2 className="text-title-medium-black py-4">{newsLocaleMap.relatedTopic[language]}</h2>
          </h1>
        </div>
        {showLoading ? (
          <NewsGridSkeleton numOfItems={4} isFourColumns />
        ) : (
          <SuspenseWrapper fallback={<NewsGridSkeleton numOfItems={4} isFourColumns />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-start w-full">
              {posts.map((item, index) => (
                <Link
                  key={`news-link-${item?.id}`}
                  href={`/${language}/${localeRoute}/${item.slug}`}
                >
                  <Card
                    title={item.title}
                    description={item.summary}
                    image={item.imageUrl}
                    date={item.date}
                    className="h-[355px]"
                    layoutClassName="p-0 sm:p-0 space-y-4"
                    titleClassName="text-title-regular-black mb-0"
                    dateClassName="text-label-regular-teriary"
                    descriptionClassName="text-body-regular-black"
                    imageClassName="h-[170px]"
                  />
                </Link>
              ))}
            </div>
          </SuspenseWrapper>
        )}
      </div>
    </section>
  );
};

export default NewsRelatedSection;
