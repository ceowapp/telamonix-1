"use client";
import React from "react";
import Link from "next/link";
import type { Post } from '@/payload-types'
import Card from "../shared/CardComponent";
import { processNewsData } from '@/utilities/processNewsData';
import { HTMLRenderer } from '../shared/HTMLRenderer';
import { checkValidHTML } from '@/utilities/checkValidHTML';

interface NewsSectionProps {
  data?: Post[];
  language?: 'en' | 'vi' | 'zh';
  loading?: boolean;
  error?: string | null;
}

const FallbackComponent = React.memo(({  
  data, 
  language = 'en',
  loading = false, 
  error = null 
}: NewsSectionProps) => {
  const posts = React.useMemo(
    () => (Array.isArray(data?.posts) ? data.posts : []),
    [data?.posts]
  );
  return (
    <section className="w-full py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="mx-auto px-4 flex flex-col items-center">
        {data?.title && (
          <div className="w-full md:min-h-[60px] max-w-3xl mx-auto mb-8 text-center px-4">
            <h1 className="text-display-regular-gradient-1 text-center ">
              {data?.title}
            </h1>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap- w-full">
          {posts.map((item) => (
            <Card
              variant="vertical"
              key={`news-${item.id}`}
              image={item.imageUrl}
              content={item.content}
              longContentClassName="divisions-news"
              className="min-h-[300px]"
              contentClassName="relative mt-[240px]"
              imageClasses="max-h-[250px]"
            />
          ))}
        </div>
        <div className="mt-8">
          <Link href="/contact" passHref>
            <button className="text-title-regular-white px-6 py-2 bg-violet-500 rounded-full hover:bg-blue-600">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
});

const NewsSection: React.FC<NewsSectionProps> = ({ 
  data,
  language = 'en', 
  loading = false,
  error = null 
}) => {
  if (!checkValidHTML(data?.codeField)) {
    return <FallbackComponent data={data} />;
  }
  return <HTMLRenderer data={data.codeField} />;
};

export default React.memo(NewsSection);



