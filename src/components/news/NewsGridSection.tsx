"use client"
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Page } from '@/payload-types'
import { imageFallbackUrl } from "@/constants/data";
import SuspenseWrapper from "@/components/shared/SuspenseWrapper";
import Card from "../shared/CardComponent";
import { newsRoutes } from '@/constants/routes';
import { NewsGridSkeleton } from "../shared/SkeletonLoader";
import { processNewsData } from '@/utilities/processNewsData';
import { getSlugByLanguage } from '@/utilities/getSlugByLanguage';

interface NewsGridSectionProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  language?: 'en' | 'vi' | 'zh';
  loading?: boolean;
  error?: string | null;
}

const NewsGridSection: React.FC<NewsGridSectionProps> = ({ 
  data,
  language = 'en', 
  loading = false,
  error = null 
}) => {
  const localeRoute = getSlugByLanguage(newsRoutes, language);
  const router = useRouter();
  const redirectToNewsPage = (slug: string) => router.push(`/${localeRoute}/${slug}`);
  const posts = React.useMemo(
    () => (Array.isArray(data?.posts) ? data?.posts.map(processNewsData) : []),
    [data?.posts]
  );
  const showLoading = loading || !!error;
  return (
    <div className="w-full py-6">
      {showLoading ? (
        <NewsGridSkeleton numOfItems={6} />
      ) : (
        <SuspenseWrapper fallback={<NewsGridSkeleton numOfItems={6} />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {posts.map((item, index) => (
              <Link
                key={`news-link-${item?.id}`}
                href={`/${language}/${localeRoute}/${item.slug}`}
              >
                <Card
                  title={item.title}
                  date={item?.date}
                  description={item?.summary}
                  className="h-full p-0"
                  layoutClassName="h-full p-0"
                  titleClassName="text-title-regular-black mb-2"
                  descriptionClassName="text-body-regular-black"
                  dateClassName="text-label-regular-teriary"
                />
              </Link>
            ))}
          </div>
        </SuspenseWrapper>
      )}
    </div>
  );
};

export default NewsGridSection;