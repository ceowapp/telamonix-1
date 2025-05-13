"use client"
import React from "react";
import Image from "next/image";
import { imageFallbackUrl, baseMediaUrl, newsLocaleMap } from "@/constants/data";
import { newsRoutes } from '@/constants/routes';
import { useRouter } from "next/navigation";
import type { Page } from '@/payload-types'
import { getSlugByLanguage } from '@/utilities/getSlugByLanguage';

interface HighLightCardProps {
  title?: string;
  description?: string;
  slug?: string;
  loading?: boolean;
  buttonText?: string;
  onRedirect: (slug: string) => void;
}

const HighLightCard: React.FC<HighLightCardProps> = ({
  title,
  description,
  slug,
  loading = false,
  buttonText = "Read More",
  onRedirect
}) => {
  const handleClick = () => {
    if (slug && !loading) {
      onRedirect(slug);
    }
  };
  return (
    <div className="w-full md:w-1/2 flex flex-col justify-start items-start h-full pt-4 md:py-0">
      {loading ? (
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-3 animate-pulse"></div>
      ) : (
        <h2 className="text-headline-large mb-3">
          {title}
        </h2>
      )}
      {loading ? (
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6 animate-pulse"></div>
        </div>
      ) : (
        <p className="mb-4 text-body-regular-black">
          {description || "No description available"}
        </p>
      )}
      <button
        onClick={handleClick}
        className={`px-8 py-2 rounded-full w-fit mt-6 text-title-regular-white transition duration-300 ${
          loading || !slug ? "bg-violet-300 cursor-not-allowed" : "bg-violet-500 text-white hover:bg-violet-700"
        }`}
        disabled={loading || !slug}
      >
        {loading ? <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div> : buttonText}
      </button>
    </div>
  );
};

interface HighlightImageProps {
  imageUrl?: string;
  loading?: boolean;
}

const HighlightImage: React.FC<HighlightImageProps> = ({ imageUrl, loading = false }) => {
  return (
    <div className="w-full md:w-1/2 flex justify-center items-center py-4 md:py-0">
      {loading ? (
        <div className="relative w-full max-w-[700px] aspect-square bg-gray-300 rounded-lg animate-pulse"></div>
      ) : (
        <div className="relative w-full h-full max-w-[300px] max-h-[300px] sm:max-w-[300px] sm:max-w-[300px] md:min-w-[300px] md:min-h-[300px] lg:min-w-[400px] lg:min-h-[400px] xl:min-w-[400px] xl:min-h-[400px] 2xl:min-w-[480px] 2xl:min-h-[480px] aspect-square">
          <Image
            src={imageUrl || imageFallbackUrl}
            alt="Highlight"
            fill
            className="w-full h-full object-cover rounded-lg"
            h
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      )}
    </div>
  );
};

interface NewsHeadingSectionProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  language?: 'en' | 'vi' | 'zh';
  loading?: boolean;
  error?: string | null;
}

const NewsHeadingSection: React.FC<NewsHeadingSectionProps> = ({ 
  data, 
  language = 'en', 
  loading = false,
  error = null 
}) => {
  const localeRoute = getSlugByLanguage(newsRoutes, language);
  const router = useRouter();
  const redirectToNewsPage = (slug: string) => router.push(`/${language}/${localeRoute}/${slug}`);
  const posts = React.useMemo(
    () => (Array.isArray(data?.posts) ? data.posts : []),
    [data?.posts] 
  );
  const showLoading = loading || !!error;
  const hightlightItem = posts[0];
  return (
    <section className="w-full py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#9EF5FF] to-[#9EF5FF]/10 text-title-small-teriary px-3 py-2 w-fit mb-4 border-l-[2px] border-[#178DDF]">
          {newsLocaleMap.weeklyHighlights[language]}
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center">
          <HighLightCard
            title={hightlightItem?.title}
            description={hightlightItem?.summary}
            slug={hightlightItem?.slug}
            onRedirect={redirectToNewsPage}
            loading={showLoading}
          />
          <HighlightImage 
            imageUrl={`${baseMediaUrl}/images/pages/news/news-1.png`}
            loading={false}
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(NewsHeadingSection);