"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Page } from "@/payload-types";
import { imageFallbackUrl, newsLocaleMap } from "@/constants/data";
import { NewsListSkeleton } from "../shared/SkeletonLoader";
import SuspenseWrapper from "@/components/shared/SuspenseWrapper";
import Card from "../shared/CardComponent";
import NewsHighLightItem from "./NewsHighLightItem";
import { processNewsData } from "@/utilities/processNewsData";
import { getSlugByLanguage } from "@/utilities/getSlugByLanguage";
import { newsRoutes } from "@/constants/routes";

interface NewsHighLightSectionProps {
  data?: NonNullable<NonNullable<Page["sectionsTab"]>["sections"]>[0];
  language?: "en" | "vi" | "zh";
  loading?: boolean;
  error?: string | null;
}

const NewsHighLightSection: React.FC<NewsHighLightSectionProps> = ({
  data,
  language = "en",
  loading = false,
  error = null,
}) => {
  const localeRoute = getSlugByLanguage(newsRoutes, language);
  const router = useRouter();
  const redirectToNewsPage = (slug: string) => router.push(`/${language}/${localeRoute}/${slug}`);
  const posts = React.useMemo(
    () => (Array.isArray(data?.posts) ? data.posts.map(processNewsData) : []),
    [data?.posts]
  );
  const showLoading = loading || !!error;
  const firstItem = posts[0];
  return (
    <div className="w-full bg-white rounded-[16px] mr-2 px-4 py-4">
      <h2 className="text-title-medium-black py-4">
        {newsLocaleMap.weeklyHighlights[language]}
      </h2>
      <SuspenseWrapper fallback={<NewsListSkeleton />}>
        {firstItem && (
          <NewsHighLightItem data={firstItem} loading={showLoading} error={error} />
        )}
        {showLoading ? (
          <NewsListSkeleton />
        ) : (
          <div className="flex flex-col space-y-3 mt-4">
            {posts.slice(1).map((item, index) => (
              <Link
                key={`news-link-${item?.id}`}
                href={`/${language}/${localeRoute}/${item.slug}`}
              >
                <Card
                  variant="horizontal"
                  className="rounded-lg cursor-pointer"
                  titleClassName="text-title-regular-black mb-2"
                  dateClassName="text-label-regular-teriary"
                  imageClassName="w-full h-full w-[109px] h-[109px]"
                  imageClasses="w-[109px] h-[109px]"
                  title={item.title}
                  date={item.date}
                  image={item.imageUrl}
                />
              </Link>
            ))}
          </div>
        )}
      </SuspenseWrapper>
    </div>
  );
};

export default NewsHighLightSection;
