"use client"
import React from "react";
import Link from 'next/link';
import Card from "../shared/CardComponent";
import type { Post } from '@/payload-types'
import { newsRoutes } from '@/constants/routes';
import { NewsCardSkeleton } from '../shared/SkeletonLoader';
import { imageFallbackUrl } from "@/constants/data";
import { getSlugByLanguage } from '@/utilities/getSlugByLanguage';

interface NewsHighLightItemProps {
  data: Post;
  language?: 'en' | 'vi' | 'zh';
  loading: boolean;
  error: string | null;
}

const NewsHighLightItem: React.FC<NewsHighLightItemProps> = ({ 
  data, 
  language = 'en', 
  loading = false, 
  error = null,
}) => {
  const localeRoute = getSlugByLanguage(newsRoutes, language);
  if (!data || typeof data !== 'object' || loading) return <NewsCardSkeleton />;
  return (
    <Link 
      key={`news-link-${data?.id}`}
      href={`/${language}/${localeRoute}/${data?.slug}`} 
      className="cursor-pointer"
    >
      <Card
        variant="overlay"
        title={data?.title}
        date={data?.date}
        image={data?.imageUrl}
        overlayPosition="bottom"
        overlayGradient="linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%)"
        dateClassName="text-label-regular-white"
        titleClassName="text-title-regular-white"
        className="h-[260px] lg:h-[232px] flex items-end justify-start rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
      />
    </Link>
  );
};

export default NewsHighLightItem;
