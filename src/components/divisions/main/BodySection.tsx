"use client"
import React from 'react';
import Link from 'next/link';
import Card from '../../shared/CardComponent';
import { useRouter } from 'next/navigation';
import type { Page } from '@/payload-types'
import { GridSectionSkeleton } from "@/components/shared/SkeletonLoader";
import SuspenseWrapper from "@/components/shared/SuspenseWrapper";
import { divisionsHeading, divisionsList, imageFallbackUrl } from '@/constants/data';
import { divisionsRoutes } from '@/constants/routes';
import { findSection, isValidSection } from "@/utils/content/contentUtils";
import { getSlugByLanguage } from '@/utilities/getSlugByLanguage';
import { HTMLRenderer } from '../../shared/HTMLRenderer';
import { checkValidHTML } from '@/utilities/checkValidHTML';

interface BodySectionProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  language?: 'en' | 'vi' | 'zh';
  loading?: boolean;
  error?: string | null;
}

const FallbackComponent = React.memo(({  
  data, 
  language = 'en',
  loading = false, 
  error = null 
}: BodySectionProps) => {
  const localeRoute = getSlugByLanguage(divisionsRoutes, language)
  const divisions = React.useMemo(
    () => (Array.isArray(data?.sectionjson) ? data.sectionjson : divisionsList),
    [data?.sectionjson]
  );
  const showLoading = loading || !!error;
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="w-full mx-auto">
        <div className="flex items-center justify-center mb-4 sm:mb-8 px-4">
          <div className="w-full max-w-3xl mx-auto mb-8 text-center px-4">
            <h2 className="text-display-regular-gradient-1 text-center">
              {data?.title || divisionsHeading.title}
            </h2>
          </div>
        </div>
        {showLoading ? (
          <GridSectionSkeleton />
        ) : (
          <SuspenseWrapper fallback={<GridSectionSkeleton />}>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {divisions.map((item: Item) => (
                <div
                  key={item.id || `divisions-${Math.random()}`}
                  className="w-full flex justify-center sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
                >
                  <Link 
                    href={`/${language}/${localeRoute}/${item.slug}`}
                    className="w-full"
                  >
                    <Card
                      title={item.title}
                      description={item?.description}
                      image={item.imageSrc || imageFallbackUrl}
                      insetStyle={{
                        height: '180px',
                        width: '100%',
                        background: 'linear-gradient(237.73deg, #FFFFFF 0%, #67CAFF 100%)',
                        borderRadius: '24px',
                      }}
                      className="max-w-80 cursor-pointer hover:opacity-90 transition-opacity"
                      imageWidth={160}
                      imageHeight={160}
                      layoutClassName="p-0 sm:p-0"
                      contentClassName="relative max-h-fit top-[190px]"
                      imageClassName="absolute w-full h-[200px] flex justify-center items-center"
                      imageClasses="relative top-[-10px] right-[-10px]"
                      titleClassName="ml-4 mb-0 text-title-medium-black-3"
                      layoutClassName="h-[250px] p-0 sm:p-0 py-0"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </SuspenseWrapper>
        )}
      </div>
    </section>
   );
});

const BodySection: React.FC<BodySectionProps> = ({ 
  data,
  language = 'en',
  loading = false,
  error = null 
}) => {
  if (!checkValidHTML(data?.codeField)) {
    return (
      <FallbackComponent 
        data={data}
        language={language}
        loading={loading}
        error={error}
      />
    );
  }
  return <HTMLRenderer data={data.codeField} />;
};

export default React.memo(BodySection);